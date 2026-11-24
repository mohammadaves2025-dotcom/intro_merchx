import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  RotateCw,
  Sliders,
  Check,
  Shirt,
  Box,
  Move,
  Eye,
  Type,
  Hash,
  Sparkles,
  Layers,
  Palette
} from 'lucide-react';

const GARMENT_MODELS = [
  {
    id: 'hoodie',
    name: 'Heavyweight Pullover Hoodie (380 GSM)',
    shortName: 'Pullover Hoodie',
    fabric: '380 GSM Organic Cotton Fleece',
    file: '/models/hoodie.glb',
    scaleMultiplier: 1.0,
    frontCenterY: -0.17,
    frontWidth: 0.58,
    frontHeight: 0.48,
    backCenterY: -0.16,
    backWidth: 0.58,
    backHeight: 0.58
  },
  {
    id: 'shirt',
    name: 'Collegiate Athletic Tee (240 GSM)',
    shortName: 'Athletic Tee',
    fabric: '240 GSM Combed Ring-Spun Cotton',
    file: '/models/shirt_baked.glb',
    scaleMultiplier: 1.0,
    frontCenterY: 0.05,
    frontWidth: 0.52,
    frontHeight: 0.46,
    backCenterY: 0.08,
    backWidth: 0.52,
    backHeight: 0.52
  }
];

const COLOR_SWATCHES = [
  {
    id: 'green',
    name: 'MerchX Heritage Green',
    hex: '#00644E',
    badge: 'Signature',
    textOnDark: true,
    primaryText: '#FFFFFF',
    accentText: '#E6C364',
    outlineText: '#003328'
  },
  {
    id: 'white',
    name: 'Pristine Chalk White',
    hex: '#FAF8F5',
    badge: 'Classic',
    textOnDark: false,
    primaryText: '#00644E',
    accentText: '#B8860B',
    outlineText: '#E8E3D7'
  },
  {
    id: 'black',
    name: 'Midnight Pitch Black',
    hex: '#141414',
    badge: 'Stealth',
    textOnDark: true,
    primaryText: '#FFFFFF',
    accentText: '#00B388',
    outlineText: '#262626'
  },
  {
    id: 'navy',
    name: 'Collegiate Navy',
    hex: '#0B1B2B',
    badge: 'Varsity',
    textOnDark: true,
    primaryText: '#FFFFFF',
    accentText: '#E5A823',
    outlineText: '#050E18'
  },
  {
    id: 'crimson',
    name: 'Varsity Crimson',
    hex: '#5E0E1B',
    badge: 'Heritage',
    textOnDark: true,
    primaryText: '#FFFFFF',
    accentText: '#D4AF37',
    outlineText: '#36060E'
  }
];

export function ThreeCustomizerMockup() {
  const mountRef = useRef(null);
  const [activeGarment, setActiveGarment] = useState(GARMENT_MODELS[0]);
  const [selectedColor, setSelectedColor] = useState(COLOR_SWATCHES[0]);

  // Front customization state
  const [institutionName, setInstitutionName] = useState('JAMIA');
  const [subText, setSubText] = useState('MILLIA ISLAMIA');
  const [estYear, setEstYear] = useState('EST. 1920');

  // Back customization state
  const [enableBackPrint, setEnableBackPrint] = useState(true);
  const [backName, setBackName] = useState('JAMIA');
  const [backNumber, setBackNumber] = useState('20');
  const [backSub, setBackSub] = useState('NEW DELHI');

  // Active control tab: 'front' | 'back' | 'fabric'
  const [activeTab, setActiveTab] = useState('front');

  // Viewer controls state
  const [autoRotate, setAutoRotate] = useState(false);
  const [loadingModel, setLoadingModel] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [currentView, setCurrentView] = useState('front');

  // Three.js instances refs
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const currentModelRef = useRef(null);
  const frontDecalMeshRef = useRef(null);
  const backDecalMeshRef = useRef(null);
  const targetRotationYRef = useRef(0);
  const autoRotateRef = useRef(false);

  // Sync autoRotateRef
  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  // 1. Generate High-Resolution Front Chest Canvas Texture (2048 x 2048 for doubled typography size)
  const createFrontTexture = (color, name, sub, year) => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const textColor = color.primaryText;
    const accentColor = color.accentText;
    const outlineColor = color.outlineText;

    const centerX = 1024;
    const centerY = 1024;

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Bold Arched Collegiate Top Text (up by 100% in font size & span)
    const textToArch = (name || 'JAMIA').toUpperCase().trim();
    if (textToArch.length > 0) {
      const archRadius = 880;
      const maxSpread = Math.PI * 0.52;
      const minSpread = Math.PI * 0.38;
      const totalAngle = Math.min(maxSpread, Math.max(minSpread, (textToArch.length * 0.048) * Math.PI));
      const startAngle = -Math.PI / 2 - totalAngle / 2;
      const angleStep = textToArch.length > 1 ? totalAngle / (textToArch.length - 1) : 0;

      // Font size up by 100%: 180px - 250px
      const fontSize = textToArch.length > 10 ? 180 : textToArch.length > 6 ? 210 : 250;
      ctx.font = `900 ${fontSize}px "Barlow Condensed", "Impact", -apple-system, sans-serif`;

      for (let i = 0; i < textToArch.length; i++) {
        const char = textToArch[i];
        const angle = textToArch.length === 1 ? -Math.PI / 2 : startAngle + i * angleStep;

        ctx.save();
        ctx.translate(centerX, centerY + 320);
        ctx.rotate(angle + Math.PI / 2);
        ctx.translate(0, -archRadius);

        // Deep drop/outline shadow
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = 28;
        ctx.lineJoin = 'miter';
        ctx.miterLimit = 2;
        ctx.strokeText(char, 0, 0);

        // Main fill
        ctx.fillStyle = textColor;
        ctx.fillText(char, 0, 0);
        ctx.restore();
      }
    }

    // Subtitle Text (up by 100%: 100px - 125px)
    if (sub && sub.trim().length > 0) {
      const subString = sub.toUpperCase().trim();
      const subFontSize = subString.length > 14 ? 100 : 120;
      ctx.font = `800 ${subFontSize}px "Barlow Condensed", -apple-system, sans-serif`;

      ctx.strokeStyle = outlineColor;
      ctx.lineWidth = 18;
      ctx.strokeText(subString, centerX, centerY + 180);

      ctx.fillStyle = textColor;
      ctx.fillText(subString, centerX, centerY + 180);
    }

    // Established Year or Tag (up by 100%: 64px)
    if (year && year.trim().length > 0) {
      const yearString = year.toUpperCase().trim();
      ctx.font = '700 64px "Inter", -apple-system, sans-serif';

      ctx.strokeStyle = outlineColor;
      ctx.lineWidth = 10;
      ctx.strokeText(`★  ${yearString}  ★`, centerX, centerY + 300);

      ctx.fillStyle = accentColor;
      ctx.fillText(`★  ${yearString}  ★`, centerX, centerY + 300);
    }

    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    texture.needsUpdate = true;
    return texture;
  };

  // 2. Generate High-Resolution Back Varsity Canvas Texture (2048 x 2048, up by 100% in size)
  const createBackTexture = (color, name, number, sub) => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const textColor = color.primaryText;
    const accentColor = color.accentText;
    const outlineColor = color.outlineText;

    const centerX = 1024;
    const centerY = 1024;

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Top Player/Institution Arch on upper back (up by 100%: 170px - 210px)
    const nameString = (name || 'JAMIA').toUpperCase().trim();
    if (nameString.length > 0) {
      const archRadius = 920;
      const maxSpread = Math.PI * 0.48;
      const minSpread = Math.PI * 0.36;
      const totalAngle = Math.min(maxSpread, Math.max(minSpread, (nameString.length * 0.046) * Math.PI));
      const startAngle = -Math.PI / 2 - totalAngle / 2;
      const angleStep = nameString.length > 1 ? totalAngle / (nameString.length - 1) : 0;

      const nameFontSize = nameString.length > 10 ? 170 : 210;
      ctx.font = `900 ${nameFontSize}px "Barlow Condensed", "Impact", -apple-system, sans-serif`;

      for (let i = 0; i < nameString.length; i++) {
        const char = nameString[i];
        const angle = nameString.length === 1 ? -Math.PI / 2 : startAngle + i * angleStep;

        ctx.save();
        ctx.translate(centerX, centerY - 140);
        ctx.rotate(angle + Math.PI / 2);
        ctx.translate(0, -archRadius);

        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = 28;
        ctx.strokeText(char, 0, 0);

        ctx.fillStyle = textColor;
        ctx.fillText(char, 0, 0);
        ctx.restore();
      }
    }

    // Giant Collegiate Varsity Back Number (up by 100%: 660px height!)
    if (number && number.trim().length > 0) {
      const numString = number.trim();
      ctx.font = '900 660px "Barlow Condensed", "Impact", -apple-system, sans-serif';

      // Heavy 2-Tone Varsity Outline
      ctx.strokeStyle = outlineColor;
      ctx.lineWidth = 48;
      ctx.strokeText(numString, centerX, centerY + 80);

      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 24;
      ctx.strokeText(numString, centerX, centerY + 80);

      ctx.fillStyle = textColor;
      ctx.fillText(numString, centerX, centerY + 80);
    }

    // Bottom Subtitle (up by 100%: 88px)
    if (sub && sub.trim().length > 0) {
      const subString = sub.toUpperCase().trim();
      ctx.font = '800 88px "Barlow Condensed", -apple-system, sans-serif';

      ctx.strokeStyle = outlineColor;
      ctx.lineWidth = 16;
      ctx.strokeText(subString, centerX, centerY + 520);

      ctx.fillStyle = accentColor;
      ctx.fillText(subString, centerX, centerY + 520);
    }

    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    texture.needsUpdate = true;
    return texture;
  };

  // 3. Apply Realistic PBR Fleece Fabric Properties
  const applyColorToModel = (model, hexColor) => {
    if (!model) return;
    const threeColor = new THREE.Color(hexColor);

    model.traverse((child) => {
      if (child.isMesh) {
        if (child.name === 'frontDecalMesh' || child.name === 'backDecalMesh') return;

        // Keep metallic zipper hardware chrome/silver
        // In hoodie.glb: garment cloth meshes start with 'Cloth', hardware starts with '_mesh' or is inside Slider_1
        const isHardware =
          !child.name.startsWith('Cloth') &&
          (child.name.startsWith('_mesh') || child.parent?.name === 'Slider_1');

        if (isHardware && child.material) {
          child.material.metalness = 0.9;
          child.material.roughness = 0.25;
          child.material.color.setHex(0xd4d4d4);
          child.material.needsUpdate = true;
          return;
        }

        if (child.material) {
          if (!child.userData.originalMaterialCloned) {
            child.material = child.material.clone();
            child.userData.originalMaterialCloned = true;
          }
          child.material.color.copy(threeColor);
          // High-grade fleece matte finish (anti-shine)
          child.material.roughness = 0.88;
          child.material.metalness = 0.02;
          child.material.needsUpdate = true;
        }
      }
    });
  };

  // 4. Build Surface-Conforming Decal Mesh via Raycasting
  // This projects each grid vertex directly onto the garment's 3D mesh surface,
  // following fabric folds and curves with ZERO floating and ZERO clipping.
  const createConformingDecal = (garment, modelWrapper, targetMeshes, isFront, texture, scale) => {
    const width = isFront ? garment.frontWidth : garment.backWidth;
    const height = isFront ? garment.frontHeight : garment.backHeight;
    const centerY = isFront ? garment.frontCenterY : garment.backCenterY;
    const segs = 28;

    const geo = new THREE.PlaneGeometry(width, height, segs, segs);
    const posAttr = geo.attributes.position;
    const raycaster = new THREE.Raycaster();
    const origin = new THREE.Vector3();
    const dir = new THREE.Vector3(0, 0, isFront ? -1 : 1);

    // Normal offset in model-local units (approx 3.5mm above fabric in world units)
    const normalOffset = (isFront ? 0.0035 : -0.0035) / (scale || 1.0);

    for (let i = 0; i < posAttr.count; i++) {
      // For back print, flip horizontal lookup so text is not mirrored when facing back
      const lx = isFront ? posAttr.getX(i) : -posAttr.getX(i);
      const ly = posAttr.getY(i);

      const wx = lx;
      const wy = centerY + ly;
      origin.set(wx, wy, isFront ? 1.5 : -1.5);
      raycaster.set(origin, dir);

      const intersects = raycaster.intersectObjects(targetMeshes, false);
      if (intersects.length > 0) {
        const hit = intersects[0];
        // Convert world hit point into modelWrapper's local space
        const localPt = modelWrapper.worldToLocal(hit.point.clone());
        posAttr.setXYZ(i, localPt.x, localPt.y, localPt.z + normalOffset);
      }
    }

    geo.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      polygonOffsetUnits: -4,
      roughness: 0.75,
      metalness: 0.02,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = isFront ? 'frontDecalMesh' : 'backDecalMesh';
    mesh.renderOrder = isFront ? 10 : 11;
    return mesh;
  };

  // 5. Initialize Three.js Scene, Camera, Lights, and Orbit Controls
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.08, 3.25);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.enablePan = false;
    controls.minDistance = 1.7;
    controls.maxDistance = 5.2;
    controls.maxPolarAngle = Math.PI / 1.75;
    controls.minPolarAngle = Math.PI / 4.2;
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN
    };
    controlsRef.current = controls;

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.45);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3.5, 5.5, 4.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xb0d4c8, 1.25);
    fillLight.position.set(-4.5, 1.5, 3.5);
    scene.add(fillLight);

    const backRimLight = new THREE.DirectionalLight(0xffffff, 2.0);
    backRimLight.position.set(0, 4.5, -4.5);
    scene.add(backRimLight);

    // Soft Studio Ground Shadow
    const shadowGeo = new THREE.CircleGeometry(1.65, 64);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.35
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.22;
    scene.add(shadowMesh);

    // Animation & Smooth Rotation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (currentModelRef.current) {
        if (autoRotateRef.current) {
          currentModelRef.current.rotation.y += 0.007;
          targetRotationYRef.current = currentModelRef.current.rotation.y;
        } else {
          // Smoothly lerp towards target orientation when user flips views
          const diff = targetRotationYRef.current - currentModelRef.current.rotation.y;
          if (Math.abs(diff) > 0.002) {
            currentModelRef.current.rotation.y += diff * 0.09;
          }
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const handlePointerDown = () => {
      if (currentModelRef.current) {
        targetRotationYRef.current = currentModelRef.current.rotation.y;
      }
    };
    container.addEventListener('pointerdown', handlePointerDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', handlePointerDown);
      controls.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // 6. Load 3D Garment Model & Attach Conforming Prints
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    setLoadingModel(true);
    setLoadError(false);

    if (currentModelRef.current) {
      scene.remove(currentModelRef.current);
      currentModelRef.current = null;
    }
    frontDecalMeshRef.current = null;
    backDecalMeshRef.current = null;

    const loader = new GLTFLoader();

    loader.load(
      activeGarment.file,
      (gltf) => {
        const model = gltf.scene;

        // Auto-center and normalize size
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        model.position.x = -center.x;
        model.position.y = -center.y;
        model.position.z = -center.z;

        const maxAxis = Math.max(size.x, size.y, size.z);
        const targetSize = 2.15 * activeGarment.scaleMultiplier;
        const scale = targetSize / maxAxis;

        const modelWrapper = new THREE.Group();
        modelWrapper.scale.set(scale, scale, scale);
        modelWrapper.add(model);
        modelWrapper.position.y = 0;
        modelWrapper.updateMatrixWorld(true);

        // Gather fabric meshes for surface raycast
        const clothMeshes = [];
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            clothMeshes.push(child);
          }
        });

        // 1. Front Conforming Decal
        const frontTex = createFrontTexture(selectedColor, institutionName, subText, estYear);
        const frontMesh = createConformingDecal(activeGarment, modelWrapper, clothMeshes, true, frontTex, scale);
        modelWrapper.add(frontMesh);
        frontDecalMeshRef.current = frontMesh;

        // 2. Back Conforming Decal
        const backTex = createBackTexture(selectedColor, backName, backNumber, backSub);
        const backMesh = createConformingDecal(activeGarment, modelWrapper, clothMeshes, false, backTex, scale);
        backMesh.visible = enableBackPrint;
        modelWrapper.add(backMesh);
        backDecalMeshRef.current = backMesh;

        // Apply realistic dyed fleece color
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

  // 7. Update Fabric Color
  useEffect(() => {
    if (currentModelRef.current) {
      applyColorToModel(currentModelRef.current, selectedColor.hex);
    }
    updateFrontDecalTexture();
    updateBackDecalTexture();
  }, [selectedColor]);

  // 8. Update Front Decal Texture
  const updateFrontDecalTexture = () => {
    if (!frontDecalMeshRef.current) return;
    const newTex = createFrontTexture(selectedColor, institutionName, subText, estYear);
    if (frontDecalMeshRef.current.material.map) {
      frontDecalMeshRef.current.material.map.dispose();
    }
    frontDecalMeshRef.current.material.map = newTex;
    frontDecalMeshRef.current.material.needsUpdate = true;
  };

  useEffect(() => {
    updateFrontDecalTexture();
  }, [institutionName, subText, estYear]);

  // 9. Update Back Decal Texture & Visibility
  const updateBackDecalTexture = () => {
    if (!backDecalMeshRef.current) return;
    backDecalMeshRef.current.visible = enableBackPrint;
    const newTex = createBackTexture(selectedColor, backName, backNumber, backSub);
    if (backDecalMeshRef.current.material.map) {
      backDecalMeshRef.current.material.map.dispose();
    }
    backDecalMeshRef.current.material.map = newTex;
    backDecalMeshRef.current.material.needsUpdate = true;
  };

  useEffect(() => {
    updateBackDecalTexture();
  }, [enableBackPrint, backName, backNumber, backSub]);

  // 10. Camera / Orientation Preset Buttons
  const handleSetView = (view) => {
    setAutoRotate(false);
    setCurrentView(view);
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    if (view === 'front') {
      targetRotationYRef.current = 0;
    } else if (view === 'back') {
      targetRotationYRef.current = Math.PI;
    } else if (view === 'angle') {
      targetRotationYRef.current = Math.PI / 4;
    }
  };

  // Switch tab and auto-orient model to relevant side
  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'front') {
      handleSetView('front');
    } else if (tab === 'back') {
      handleSetView('back');
    }
  };

  return (
    <div className="bg-charcoal text-white rounded-xs border border-neutral-800 overflow-hidden shadow-2xl">
      {/* Top Header Bar */}
      <div className="bg-neutral-900/90 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-green-primary animate-pulse shrink-0" />
          <span className="font-heading text-base sm:text-lg font-bold uppercase tracking-wider text-white truncate">
            3D Collegiate Customizer Studio
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-xs bg-green-primary/20 text-green-primary text-[10px] font-extrabold uppercase tracking-widest border border-green-primary/40 shrink-0">
            Surface Conformed · Front & Back Print
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-neutral-400 shrink-0">
          <Box className="w-4 h-4 text-green-primary" />
          <span className="hidden xs:inline">Three.js PBR Engine</span>
        </div>
      </div>

      {/* Main Studio Viewport & Customizer Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[660px]">
        {/* Left: 3D Three.js Viewport (7 cols) */}
        <div className="lg:col-span-7 relative bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 flex flex-col justify-between overflow-hidden">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,100,78,0.22),transparent_70%)] pointer-events-none" />

          {/* Loading Indicator */}
          {loadingModel && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-neutral-950/85 backdrop-blur-sm space-y-3 p-4 text-center">
              <div className="w-10 h-10 border-4 border-green-primary border-t-transparent rounded-full animate-spin" />
              <p className="font-heading text-sm uppercase tracking-wider font-bold text-white">
                Preparing High-Res 3D {activeGarment.shortName}...
              </p>
              <p className="text-[11px] text-neutral-400">Projecting surface-conformed prints...</p>
            </div>
          )}

          {/* Load Error Fallback */}
          {loadError && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-neutral-950/90 p-6 text-center space-y-3">
              <p className="font-heading text-base uppercase font-bold text-red-400">
                Failed to load 3D model
              </p>
              <p className="text-xs text-neutral-400 max-w-sm">
                Please ensure WebGL is enabled in your browser or refresh the page.
              </p>
            </div>
          )}

          {/* Three.js Canvas Container - Responsive Height */}
          <div
            ref={mountRef}
            className="w-full h-[360px] sm:h-[460px] lg:h-[660px] cursor-grab active:cursor-grabbing"
            title="Click and drag to orbit in 360°. Scroll to zoom."
          />

          {/* Viewport Floating Top Controls: Auto Rotate & Current Angle Tag */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2 z-10">
            <button
              type="button"
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xs text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md ${
                autoRotate
                  ? 'bg-green-primary text-white'
                  : 'bg-neutral-800/90 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              <RotateCw className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
              <span>Auto-Rotate {autoRotate ? 'On' : 'Off'}</span>
            </button>

            <span className="hidden sm:inline-flex items-center px-2 py-1 rounded-xs bg-neutral-900/80 text-neutral-400 text-[10px] font-mono uppercase tracking-widest border border-neutral-800">
              View: {currentView.toUpperCase()}
            </span>
          </div>

          {/* Mobile Gestures Guidance Chip */}
          <div className="absolute top-3 right-3 sm:hidden z-10 pointer-events-none">
            <span className="bg-neutral-950/80 text-[10px] text-neutral-300 px-2 py-1 rounded-xs border border-neutral-800 flex items-center gap-1">
              <Move className="w-3 h-3 text-green-primary" />
              <span>1-Finger Orbit</span>
            </span>
          </div>

          {/* Bottom Camera Angles & Orbit Guidance */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-xs text-neutral-400 z-10 pointer-events-none">
            <span className="hidden sm:inline bg-neutral-900/90 px-3 py-1.5 rounded-xs backdrop-blur-sm border border-neutral-800 text-[11px]">
              Drag to Orbit 360° · Scroll to Zoom
            </span>
            <div className="flex items-center gap-1 pointer-events-auto bg-neutral-900/95 p-1 rounded-xs border border-neutral-800 shadow-xl ml-auto">
              <button
                type="button"
                onClick={() => handleSetView('front')}
                className={`px-2.5 sm:px-3 py-1 font-heading text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-xs transition-colors ${
                  currentView === 'front'
                    ? 'bg-green-primary text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                Front View
              </button>
              <button
                type="button"
                onClick={() => handleSetView('angle')}
                className={`px-2.5 sm:px-3 py-1 font-heading text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-xs transition-colors ${
                  currentView === 'angle'
                    ? 'bg-green-primary text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                3/4 Angle
              </button>
              <button
                type="button"
                onClick={() => handleSetView('back')}
                className={`px-2.5 sm:px-3 py-1 font-heading text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-xs transition-colors ${
                  currentView === 'back'
                    ? 'bg-green-primary text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                Back View
              </button>
            </div>
          </div>
        </div>

        {/* Right: Customization Controls Panel (5 cols) */}
        <div className="lg:col-span-5 p-4 sm:p-6 lg:p-7 bg-neutral-900 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-neutral-800 overflow-y-auto max-h-[660px]">
          <div className="space-y-5">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-primary mb-1">
                <Sliders className="w-4 h-4" />
                <span>Parametric Customizer</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                Customize 3D Garment
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Real-time graphics mapped directly to the garment surface. No floating text.
              </p>
            </div>

            {/* Customizer Tabs: Front Chest / Back Print / Fabric & Color */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-neutral-950 rounded-xs border border-neutral-800">
              <button
                type="button"
                onClick={() => handleSelectTab('front')}
                className={`py-2 px-1 text-center font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'front'
                    ? 'bg-green-primary text-white shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>Front</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectTab('back')}
                className={`py-2 px-1 text-center font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'back'
                    ? 'bg-green-primary text-white shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Hash className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('fabric')}
                className={`py-2 px-1 text-center font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'fabric'
                    ? 'bg-green-primary text-white shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Fabric</span>
              </button>
            </div>

            {/* TAB CONTENT 1: FRONT CHEST PRINT */}
            {activeTab === 'front' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                      Collegiate Arched Name
                    </label>
                    <span className="text-[10px] text-neutral-500 font-mono">Max 14 chars</span>
                  </div>
                  <input
                    type="text"
                    maxLength={14}
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder="e.g. JAMIA, STANFORD, IIT"
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-3.5 py-2.5 text-sm uppercase font-heading font-bold tracking-wider rounded-xs text-white placeholder-neutral-600 focus:outline-none min-h-[44px]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Subtitle Banner
                    </label>
                    <input
                      type="text"
                      maxLength={18}
                      value={subText}
                      onChange={(e) => setSubText(e.target.value)}
                      placeholder="e.g. MILLIA ISLAMIA"
                      className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-3 py-2 text-xs uppercase font-heading font-bold tracking-wider rounded-xs text-white placeholder-neutral-600 focus:outline-none min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Year / Tagline
                    </label>
                    <input
                      type="text"
                      maxLength={12}
                      value={estYear}
                      onChange={(e) => setEstYear(e.target.value)}
                      placeholder="e.g. EST. 1920"
                      className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-3 py-2 text-xs uppercase font-heading font-bold tracking-wider rounded-xs text-white placeholder-neutral-600 focus:outline-none min-h-[44px]"
                    />
                  </div>
                </div>

                {/* Quick Presets for Front */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
                    Quick University Presets:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: 'JAMIA', sub: 'MILLIA ISLAMIA', year: 'EST. 1920' },
                      { name: 'ENGINEERING', sub: 'FACULTY OF ENGG', year: 'CLASS OF 2025' },
                      { name: 'MERCHX', sub: 'ATHLETIC HERITAGE', year: 'NEW DELHI' }
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setInstitutionName(preset.name);
                          setSubText(preset.sub);
                          setEstYear(preset.year);
                        }}
                        className="text-[11px] px-2.5 py-1 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-xs transition-colors"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: BACK VARSITY PRINT */}
            {activeTab === 'back' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Enable / Disable Back Print Toggle */}
                <div className="flex items-center justify-between p-3 bg-neutral-950 rounded-xs border border-neutral-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                      Enable Back Print
                    </span>
                    <span className="text-[10px] text-green-primary font-mono uppercase bg-green-primary/10 px-1.5 py-0.5 rounded-xs border border-green-primary/30">
                      Varsity Style
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEnableBackPrint(!enableBackPrint)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      enableBackPrint ? 'bg-green-primary' : 'bg-neutral-800'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        enableBackPrint ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {enableBackPrint && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                          Player / Alumni Name
                        </label>
                        <input
                          type="text"
                          maxLength={12}
                          value={backName}
                          onChange={(e) => setBackName(e.target.value)}
                          placeholder="e.g. JAMIA, VARIS, SENIOR"
                          className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-3 py-2 text-xs uppercase font-heading font-bold tracking-wider rounded-xs text-white placeholder-neutral-600 focus:outline-none min-h-[44px]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                          Varsity No.
                        </label>
                        <input
                          type="text"
                          maxLength={2}
                          value={backNumber}
                          onChange={(e) => setBackNumber(e.target.value)}
                          placeholder="e.g. 20, 07"
                          className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-3 py-2 text-xs uppercase font-heading font-black tracking-widest text-center rounded-xs text-white placeholder-neutral-600 focus:outline-none min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Back Subtitle / City
                      </label>
                      <input
                        type="text"
                        maxLength={18}
                        value={backSub}
                        onChange={(e) => setBackSub(e.target.value)}
                        placeholder="e.g. NEW DELHI, VARSITY 25"
                        className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-3.5 py-2.5 text-xs uppercase font-heading font-bold tracking-wider rounded-xs text-white placeholder-neutral-600 focus:outline-none min-h-[44px]"
                      />
                    </div>

                    {/* Quick Presets for Back */}
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
                        Popular Back Number Presets:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { name: 'JAMIA', num: '20', sub: 'EST. 1920' },
                          { name: 'SENIOR', num: '25', sub: 'ENGINEERING' },
                          { name: 'CAPTAIN', num: '07', sub: 'NEW DELHI' },
                          { name: 'ALUMNI', num: '99', sub: 'VARSITY CLUB' }
                        ].map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setBackName(preset.name);
                              setBackNumber(preset.num);
                              setBackSub(preset.sub);
                            }}
                            className="text-[11px] px-2.5 py-1 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-xs transition-colors"
                          >
                            #{preset.num} {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* TAB CONTENT 3: FABRIC COLOR & GARMENT MESH */}
            {activeTab === 'fabric' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                {/* 1. Select 3D Garment Silhouette */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Garment Silhouette
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {GARMENT_MODELS.map((garment) => (
                      <button
                        key={garment.id}
                        type="button"
                        onClick={() => setActiveGarment(garment)}
                        className={`p-2.5 sm:p-3 rounded-xs border text-left flex items-center gap-2.5 transition-all ${
                          activeGarment.id === garment.id
                            ? 'bg-neutral-800 border-green-primary ring-1 ring-green-primary text-white'
                            : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <Shirt
                          className={`w-5 h-5 shrink-0 ${
                            activeGarment.id === garment.id ? 'text-green-primary' : 'text-neutral-500'
                          }`}
                        />
                        <div className="truncate">
                          <p className="font-heading text-xs font-bold uppercase tracking-wider truncate">
                            {garment.shortName}
                          </p>
                          <p className="text-[10px] text-neutral-500 truncate">{garment.fabric}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Color Swatches (Green, White, Black prioritized) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                      Fabric Colorway
                    </label>
                    <span className="text-xs font-bold text-green-primary">{selectedColor.name}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    {COLOR_SWATCHES.map((color) => (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`p-2.5 rounded-xs border flex sm:flex-col items-center justify-between sm:justify-center gap-2 transition-all ${
                          selectedColor.id === color.id
                            ? 'bg-neutral-800 border-white ring-2 ring-green-primary'
                            : 'bg-neutral-950/80 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <div
                          className="w-7 h-7 rounded-full border border-neutral-600 shadow-md flex items-center justify-center shrink-0"
                          style={{ backgroundColor: color.hex }}
                        >
                          {selectedColor.id === color.id && (
                            <Check
                              className={`w-3.5 h-3.5 ${
                                color.textOnDark ? 'text-white' : 'text-charcoal'
                              }`}
                            />
                          )}
                        </div>
                        <div className="text-left sm:text-center min-w-0">
                          <p className="font-heading text-[11px] font-bold uppercase truncate">
                            {color.badge}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Colorway Switcher (always visible at bottom of tab for convenience) */}
            {activeTab !== 'fabric' && (
              <div className="pt-2 border-t border-neutral-800/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Quick Colorway:
                  </span>
                  <span className="text-[11px] text-green-primary font-semibold">
                    {selectedColor.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {COLOR_SWATCHES.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform ${
                        selectedColor.id === color.id
                          ? 'border-white scale-110 shadow-lg ring-2 ring-green-primary'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      aria-label={`Select color ${color.name}`}
                    >
                      {selectedColor.id === color.id && (
                        <Check
                          className={`w-3.5 h-3.5 mx-auto ${
                            color.textOnDark ? 'text-white' : 'text-charcoal'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Caption & Disclaimer (Brief Rule 3) */}
          <div className="mt-6 pt-4 border-t border-neutral-800">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-semibold text-neutral-300 truncate max-w-[220px]">
                {activeGarment.name.split('(')[0]}
              </span>
              <span className="text-[10px] font-bold text-green-primary uppercase shrink-0">
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
