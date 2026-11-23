import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCw, Sparkles, Sliders, Check, Shirt, Layers, Box, ZoomIn } from 'lucide-react';

const GARMENT_MODELS = [
  {
    id: 'hoodie',
    name: 'Heavyweight Pullover Hoodie (380 GSM)',
    file: '/models/hoodie.glb',
    scaleMultiplier: 1.0,
    yOffset: 0
  },
  {
    id: 'shirt',
    name: 'Collegiate Athletic Tee (240 GSM)',
    file: '/models/shirt_baked.glb',
    scaleMultiplier: 1.0,
    yOffset: 0
  }
];

const COLOR_SWATCHES = [
  { name: 'MerchX Forest Green', hex: '#00644E', textOnDark: true },
  { name: 'Heather Cream / Ivory', hex: '#EBE5D8', textOnDark: false },
  { name: 'Midnight Charcoal', hex: '#181818', textOnDark: true },
  { name: 'Collegiate Navy', hex: '#0F2537', textOnDark: true },
  { name: 'Varsity Crimson', hex: '#801424', textOnDark: true }
];

export function ThreeCustomizerMockup() {
  const mountRef = useRef(null);
  const [activeGarment, setActiveGarment] = useState(GARMENT_MODELS[0]);
  const [selectedColor, setSelectedColor] = useState(COLOR_SWATCHES[0]);
  const [institutionName, setInstitutionName] = useState('JAMIA');
  const [subText, setSubText] = useState('MILLIA ISLAMIA');
  const [estYear, setEstYear] = useState('EST. 1920');
  const [autoRotate, setAutoRotate] = useState(true);
  const [loadingModel, setLoadingModel] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // References for Three.js
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const currentModelRef = useRef(null);
  const chestDecalRef = useRef(null);
  const modelCacheRef = useRef({});

  // Generate dynamic canvas texture for the chest print
  const createChestTexture = (color, name, sub, year) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isDark = color.textOnDark;
    const textColor = isDark ? '#FFFFFF' : '#004636';
    const accentColor = isDark ? '#D4AF37' : '#00644E';
    const outlineColor = isDark ? '#00644E' : '#FFFFFF';

    const centerX = 512;
    const centerY = 500;

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Arched Collegiate Top Text
    const textToArch = (name || 'MERCHX').toUpperCase();
    const archRadius = 380;
    const totalAngle = Math.min(Math.PI * 0.45, (textToArch.length * Math.PI) / 26);
    const startAngle = -Math.PI / 2 - totalAngle / 2;
    const angleStep = textToArch.length > 1 ? totalAngle / (textToArch.length - 1) : 0;

    ctx.font = '900 94px "Barlow Condensed", sans-serif';

    for (let i = 0; i < textToArch.length; i++) {
      const char = textToArch[i];
      const angle = textToArch.length === 1 ? -Math.PI / 2 : startAngle + i * angleStep;

      ctx.save();
      ctx.translate(centerX, centerY + 80);
      ctx.rotate(angle + Math.PI / 2);
      ctx.translate(0, -archRadius);

      ctx.strokeStyle = outlineColor;
      ctx.lineWidth = 14;
      ctx.strokeText(char, 0, 0);

      ctx.fillStyle = textColor;
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }

    // Subtitle
    if (sub) {
      ctx.font = '800 48px "Barlow Condensed", sans-serif';
      ctx.fillStyle = textColor;
      ctx.fillText(sub.toUpperCase(), centerX, centerY + 65);
    }

    // Est. Year
    if (year) {
      ctx.font = '700 28px "Inter", sans-serif';
      ctx.fillStyle = accentColor;
      ctx.fillText(`— ${year.toUpperCase()} —`, centerX, centerY + 115);
    }

    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  };

  // Apply color to all meshes of the model
  const applyColorToModel = (model, hexColor) => {
    if (!model) return;
    const threeColor = new THREE.Color(hexColor);

    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.name === 'chestDecal') return; // skip decal

        if (child.material) {
          // Clone material to avoid modifying cached instances
          if (!child.userData.originalMaterialCloned) {
            child.material = child.material.clone();
            child.userData.originalMaterialCloned = true;
          }
          child.material.color.copy(threeColor);
          child.material.roughness = 0.75;
          child.material.metalness = 0.05;
          child.material.needsUpdate = true;
        }
      }
    });
  };

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 3.2);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 1.8;
    controls.maxDistance = 5.5;
    controls.maxPolarAngle = Math.PI / 1.8;
    controls.minPolarAngle = Math.PI / 4;
    controlsRef.current = controls;

    // 5. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa5c4b5, 1.2);
    fillLight.position.set(-5, 0, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // Soft Studio Shadow Ground
    const shadowGeo = new THREE.CircleGeometry(1.6, 64);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.3
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.25;
    scene.add(shadowMesh);

    // 6. Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate && controlsRef.current && !controlsRef.current.state === -1) {
        if (currentModelRef.current) {
          currentModelRef.current.rotation.y += 0.007;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 7. Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Load 3D GLB Model
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    setLoadingModel(true);
    setLoadError(false);

    // Remove existing model if present
    if (currentModelRef.current) {
      scene.remove(currentModelRef.current);
      currentModelRef.current = null;
    }

    const loader = new GLTFLoader();

    loader.load(
      activeGarment.file,
      (gltf) => {
        const model = gltf.scene;

        // Auto-fit & Center the Model in view
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Center pivot
        model.position.x = -center.x;
        model.position.y = -center.y + (activeGarment.yOffset || 0);
        model.position.z = -center.z;

        // Normalize scale to fit 2.2 units
        const maxAxis = Math.max(size.x, size.y, size.z);
        const targetSize = 2.15 * activeGarment.scaleMultiplier;
        const scale = targetSize / maxAxis;

        const modelWrapper = new THREE.Group();
        modelWrapper.scale.set(scale, scale, scale);
        modelWrapper.add(model);
        modelWrapper.position.y = 0;

        // Add Chest Decal Plane
        const decalTexture = createChestTexture(selectedColor, institutionName, subText, estYear);
        const decalMat = new THREE.MeshBasicMaterial({
          map: decalTexture,
          transparent: true,
          depthWrite: false,
          polygonOffset: true,
          polygonOffsetFactor: -3
        });
        const decalGeo = new THREE.PlaneGeometry(0.85, 0.85);
        const decalMesh = new THREE.Mesh(decalGeo, decalMat);
        decalMesh.name = 'chestDecal';

        // Position on chest
        decalMesh.position.set(0, 0.22, 0.42);
        decalMesh.rotation.x = -0.05;
        modelWrapper.add(decalMesh);
        chestDecalRef.current = decalMesh;

        // Apply selected colorway
        applyColorToModel(model, selectedColor.hex);

        scene.add(modelWrapper);
        currentModelRef.current = modelWrapper;
        setLoadingModel(false);
      },
      undefined,
      (err) => {
        console.error('Failed to load 3D GLB model:', err);
        setLoadError(true);
        setLoadingModel(false);
      }
    );
  }, [activeGarment]);

  // Update color when swatch changes
  useEffect(() => {
    if (currentModelRef.current) {
      applyColorToModel(currentModelRef.current, selectedColor.hex);
    }
    updateDecal();
  }, [selectedColor]);

  // Update Decal Texture when text inputs change
  const updateDecal = () => {
    if (!chestDecalRef.current) return;
    const newTex = createChestTexture(selectedColor, institutionName, subText, estYear);
    if (chestDecalRef.current.material.map) {
      chestDecalRef.current.material.map.dispose();
    }
    chestDecalRef.current.material.map = newTex;
    chestDecalRef.current.material.needsUpdate = true;
  };

  useEffect(() => {
    updateDecal();
  }, [institutionName, subText, estYear]);

  // Camera presets
  const handleSetView = (angle) => {
    setAutoRotate(false);
    if (!controlsRef.current || !currentModelRef.current) return;

    if (angle === 'front') {
      currentModelRef.current.rotation.y = 0;
      controlsRef.current.reset();
      cameraRef.current.position.set(0, 0.15, 3.2);
    } else if (angle === 'angle') {
      currentModelRef.current.rotation.y = Math.PI / 4;
    } else if (angle === 'back') {
      currentModelRef.current.rotation.y = Math.PI;
    }
  };

  return (
    <div className="bg-charcoal text-white rounded-xs border border-neutral-800 overflow-hidden shadow-2xl">
      {/* Top Header Bar */}
      <div className="bg-neutral-900/90 px-6 py-4 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-green-primary animate-pulse" />
          <span className="font-heading text-lg font-bold uppercase tracking-wider text-white">
            Digital Apparel Customisation Studio
          </span>
          <span className="px-2 py-0.5 rounded-xs bg-green-primary/20 text-green-primary text-[10px] font-extrabold uppercase tracking-widest border border-green-primary/40">
            True 3D GLB Simulation · Concept
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Box className="w-4 h-4 text-green-primary" />
          <span>Real-time Mesh & Fabric Engine</span>
        </div>
      </div>

      {/* Main Studio Viewport & Customizer Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left: 3D Three.js Viewport (7 cols) */}
        <div className="lg:col-span-7 relative bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 flex flex-col justify-between overflow-hidden">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,100,78,0.18),transparent_70%)] pointer-events-none" />

          {/* Loading Indicator */}
          {loadingModel && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-neutral-950/80 backdrop-blur-sm space-y-3">
              <div className="w-10 h-10 border-4 border-green-primary border-t-transparent rounded-full animate-spin" />
              <p className="font-heading text-sm uppercase tracking-wider font-bold text-white">
                Loading 3D {activeGarment.name.split(' ')[1]} Model...
              </p>
            </div>
          )}

          {/* Three.js Canvas Container */}
          <div
            ref={mountRef}
            className="w-full h-[440px] lg:h-[640px] cursor-grab active:cursor-grabbing"
            title="Click and drag to orbit in 3D. Scroll to zoom."
          />

          {/* Viewport Floating Top Controls */}
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <button
              type="button"
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-3 py-1.5 rounded-xs text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md ${
                autoRotate
                  ? 'bg-green-primary text-white'
                  : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
              <span>Auto-Rotate {autoRotate ? 'On' : 'Off'}</span>
            </button>
          </div>

          {/* Bottom Camera Angles & Orbit Guidance */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-400 z-10 pointer-events-none">
            <span className="hidden sm:inline bg-neutral-900/90 px-3 py-1.5 rounded-xs backdrop-blur-sm border border-neutral-800 text-[11px]">
              Orbit: Drag · Zoom: Scroll wheel · True 3D GLTF Mesh
            </span>
            <div className="flex items-center gap-1 pointer-events-auto bg-neutral-900/90 p-1 rounded-xs border border-neutral-800 shadow-xl">
              <button
                type="button"
                onClick={() => handleSetView('front')}
                className="px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider hover:text-white hover:bg-neutral-800 rounded-xs transition-colors"
              >
                Front
              </button>
              <button
                type="button"
                onClick={() => handleSetView('angle')}
                className="px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider hover:text-white hover:bg-neutral-800 rounded-xs transition-colors"
              >
                3D Angle
              </button>
              <button
                type="button"
                onClick={() => handleSetView('back')}
                className="px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider hover:text-white hover:bg-neutral-800 rounded-xs transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Right: Customization Controls Panel (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-neutral-900 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-neutral-800">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-primary mb-1">
                <Sliders className="w-4 h-4" />
                <span>3D Parametric Studio</span>
              </div>
              <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-white">
                Customize 3D Apparel
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Interactive real-time 3D simulation powered by Three.js & WebGL.
              </p>
            </div>

            {/* 1. Select 3D Model Silhouette */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                1. Select 3D Garment Mesh
              </label>
              <div className="grid grid-cols-2 gap-2">
                {GARMENT_MODELS.map((garment) => (
                  <button
                    key={garment.id}
                    type="button"
                    onClick={() => setActiveGarment(garment)}
                    className={`p-3 rounded-xs border text-left flex items-center gap-2.5 transition-all ${
                      activeGarment.id === garment.id
                        ? 'bg-neutral-800 border-green-primary ring-1 ring-green-primary text-white'
                        : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <Shirt className={`w-5 h-5 shrink-0 ${activeGarment.id === garment.id ? 'text-green-primary' : 'text-neutral-500'}`} />
                    <div className="truncate">
                      <p className="font-heading text-xs font-bold uppercase tracking-wider truncate">
                        {garment.id === 'hoodie' ? 'Pullover Hoodie' : 'Athletic Tee'}
                      </p>
                      <p className="text-[10px] text-neutral-500 truncate">
                        {garment.id === 'hoodie' ? '380 GSM Fleece' : '240 GSM Cotton'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Color Swatches */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                2. Fabric Color: <span className="text-green-primary">{selectedColor.name}</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {COLOR_SWATCHES.map((color) => (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full border-2 transition-transform ${
                      selectedColor.hex === color.hex
                        ? 'border-white scale-110 shadow-lg ring-2 ring-green-primary'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={`Select color ${color.name}`}
                  >
                    {selectedColor.hex === color.hex && (
                      <Check className={`w-4 h-4 mx-auto ${color.textOnDark ? 'text-white' : 'text-charcoal'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Real-Time Typography Customization */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  3. Collegiate Arched Name
                </label>
                <input
                  type="text"
                  maxLength={14}
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  placeholder="e.g. JAMIA, STANFORD, IIT DELHI"
                  className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-3.5 py-2.5 text-sm uppercase font-heading font-bold tracking-wider rounded-xs text-white placeholder-neutral-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    maxLength={16}
                    value={subText}
                    onChange={(e) => setSubText(e.target.value)}
                    placeholder="e.g. MILLIA ISLAMIA"
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-3 py-2 text-xs uppercase font-heading font-bold tracking-wider rounded-xs text-white placeholder-neutral-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Year / Tag
                  </label>
                  <input
                    type="text"
                    maxLength={12}
                    value={estYear}
                    onChange={(e) => setEstYear(e.target.value)}
                    placeholder="e.g. EST. 1920"
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-3 py-2 text-xs uppercase font-heading font-bold tracking-wider rounded-xs text-white placeholder-neutral-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Caption & Disclaimer (Brief Rule 3) */}
          <div className="mt-6 pt-4 border-t border-neutral-800">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-semibold text-neutral-300">
                Garment Silhouette: {activeGarment.name}
              </span>
              <span className="text-[11px] font-bold text-green-primary uppercase">
                Phase 3 Vision
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 italic mt-1 leading-snug">
              Captioned Concept — Coming Soon · Proprietary MerchX 3D Fashion-Tech Preview.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
