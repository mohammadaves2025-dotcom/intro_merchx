import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import jamiaHoodieImg from '@/assets/placeholder/jamia-hoodies.jpg';
import hoodieBlackImg from '@/assets/products/hoodie-black.jpg';
import hoodieCreamImg from '@/assets/products/hoodie-cream.jpg';
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
  Palette,
  Smartphone,
  Monitor,
  Zap,
  Sun,
  Moon,
  Contrast
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
    frontWidth: 0.62,
    frontHeight: 0.52,
    backCenterY: -0.16,
    backWidth: 0.62,
    backHeight: 0.62
  },
  {
    id: 'shirt',
    name: 'Collegiate Athletic Tee (240 GSM)',
    shortName: 'Athletic Tee',
    fabric: '240 GSM Combed Ring-Spun Cotton',
    file: '/models/shirt_baked.glb',
    scaleMultiplier: 1.0,
    frontCenterY: 0.05,
    frontWidth: 0.54,
    frontHeight: 0.48,
    backCenterY: 0.08,
    backWidth: 0.54,
    backHeight: 0.54
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

  // Studio Backdrop Mode: 'studio' (Balanced Neutral Grey) | 'light' (Clean White/Bone) | 'dark' (Onyx)
  const [backdropMode, setBackdropMode] = useState('studio');

  // Mobile detection: screen width < 1024px
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Auto-switch away from dark backdrop when black or dark garments are selected
  const handleSelectColor = (color) => {
    setSelectedColor(color);
    if ((color.id === 'black' || color.id === 'navy' || color.id === 'crimson') && backdropMode === 'dark') {
      setBackdropMode('studio');
    }
  };

  // 1. Generate High-Resolution Front Chest Canvas Texture
  // Massive, bold, 100% enlarged collegiate tackle-twill typography
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
    const centerY = 850;

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Massive Arched Collegiate Top Text (Colossal 420px - 480px font)
    const textToArch = (name || 'JAMIA').toUpperCase().trim();
    if (textToArch.length > 0) {
      const archRadius = 620;
      // Tight, continuous athletic arch so letters hug closely together
      const maxSpread = Math.PI * 0.60;
      const minSpread = Math.PI * 0.42;
      const totalAngle = Math.min(maxSpread, Math.max(minSpread, (textToArch.length * 0.052) * Math.PI));
      const startAngle = -Math.PI / 2 - totalAngle / 2;
      const angleStep = textToArch.length > 1 ? totalAngle / (textToArch.length - 1) : 0;

      // True 100% enlarged font size: 360px - 460px
      const fontSize = textToArch.length > 10 ? 340 : textToArch.length > 6 ? 400 : 460;
      ctx.font = `900 ${fontSize}px "Barlow Condensed", "Impact", -apple-system, sans-serif`;

      for (let i = 0; i < textToArch.length; i++) {
        const char = textToArch[i];
        const angle = textToArch.length === 1 ? -Math.PI / 2 : startAngle + i * angleStep;

        ctx.save();
        ctx.translate(centerX, centerY + 200);
        ctx.rotate(angle + Math.PI / 2);
        ctx.translate(0, -archRadius);

        // Heavy athletic drop/outline border
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = 42;
        ctx.lineJoin = 'miter';
        ctx.miterLimit = 2;
        ctx.strokeText(char, 0, 0);

        // Inner solid fill
        ctx.fillStyle = textColor;
        ctx.fillText(char, 0, 0);
        ctx.restore();
      }
    }

    // Subtitle Text (Colossal 180px - 210px font)
    if (sub && sub.trim().length > 0) {
      const subString = sub.toUpperCase().trim();
      const subFontSize = subString.length > 14 ? 160 : 190;
      ctx.font = `900 ${subFontSize}px "Barlow Condensed", -apple-system, sans-serif`;

      ctx.strokeStyle = outlineColor;
      ctx.lineWidth = 26;
      ctx.strokeText(subString, centerX, 1020);

      ctx.fillStyle = textColor;
      ctx.fillText(subString, centerX, 1020);
    }

    // Established Year or Tag (Colossal 96px font)
    if (year && year.trim().length > 0) {
      const yearString = year.toUpperCase().trim();
      ctx.font = '800 96px "Inter", -apple-system, sans-serif';

      ctx.strokeStyle = outlineColor;
      ctx.lineWidth = 14;
      ctx.strokeText(`★  ${yearString}  ★`, centerX, 1220);

      ctx.fillStyle = accentColor;
      ctx.fillText(`★  ${yearString}  ★`, centerX, 1220);
    }

    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    texture.needsUpdate = true;
    return texture;
  };

  // 2. Generate High-Resolution Back Varsity Canvas Texture
  // Massive 950px tall athletic numbers and 360px player arch
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

    // Top Player/Institution Arch on upper back (Massive 340px - 380px font)
    const nameString = (name || 'JAMIA').toUpperCase().trim();
    if (nameString.length > 0) {
      const archRadius = 720;
      const maxSpread = Math.PI * 0.54;
      const minSpread = Math.PI * 0.38;
      const totalAngle = Math.min(maxSpread, Math.max(minSpread, (nameString.length * 0.050) * Math.PI));
      const startAngle = -Math.PI / 2 - totalAngle / 2;
      const angleStep = nameString.length > 1 ? totalAngle / (nameString.length - 1) : 0;

      const nameFontSize = nameString.length > 10 ? 300 : 360;
      ctx.font = `900 ${nameFontSize}px "Barlow Condensed", "Impact", -apple-system, sans-serif`;

      for (let i = 0; i < nameString.length; i++) {
        const char = nameString[i];
        const angle = nameString.length === 1 ? -Math.PI / 2 : startAngle + i * angleStep;

        ctx.save();
        ctx.translate(centerX, centerY - 280);
        ctx.rotate(angle + Math.PI / 2);
        ctx.translate(0, -archRadius);

        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = 36;
        ctx.strokeText(char, 0, 0);

        ctx.fillStyle = textColor;
        ctx.fillText(char, 0, 0);
        ctx.restore();
      }
    }

    // Colossal Collegiate Varsity Back Number (Massive 950px height!)
    if (number && number.trim().length > 0) {
      const numString = number.trim();
      ctx.font = '900 950px "Barlow Condensed", "Impact", -apple-system, sans-serif';

      // Heavy 2-Tone Varsity Outline
      ctx.strokeStyle = outlineColor;
      ctx.lineWidth = 64;
      ctx.strokeText(numString, centerX, 1100);

      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 30;
      ctx.strokeText(numString, centerX, 1100);

      ctx.fillStyle = textColor;
      ctx.fillText(numString, centerX, 1100);
    }

    // Bottom Subtitle (Colossal 130px font)
    if (sub && sub.trim().length > 0) {
      const subString = sub.toUpperCase().trim();
      ctx.font = '800 130px "Barlow Condensed", -apple-system, sans-serif';

      ctx.strokeStyle = outlineColor;
      ctx.lineWidth = 20;
      ctx.strokeText(subString, centerX, 1680);

      ctx.fillStyle = accentColor;
      ctx.fillText(subString, centerX, 1680);
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

  // 4. Build Surface-Conforming Decal Mesh via Raycasting (Desktop only)
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

    // Normal offset in model-local units
    const normalOffset = (isFront ? 0.0035 : -0.0035) / (scale || 1.0);

    for (let i = 0; i < posAttr.count; i++) {
      const lx = isFront ? posAttr.getX(i) : -posAttr.getX(i);
      const ly = posAttr.getY(i);

      const wx = lx;
      const wy = centerY + ly;
      origin.set(wx, wy, isFront ? 1.5 : -1.5);
      raycaster.set(origin, dir);

      const intersects = raycaster.intersectObjects(targetMeshes, false);
      if (intersects.length > 0) {
        const hit = intersects[0];
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

  // 5. Initialize Three.js Scene with Studio Lighting & Delineating Rim Lights
  useEffect(() => {
    if (isMobile) return;
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
    renderer.toneMappingExposure = 1.18;
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

    // High-Definition Studio Lighting Rig with Silhouette Separation Rim Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(3.5, 5.5, 4.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd2e3db, 1.4);
    fillLight.position.set(-4.5, 1.5, 3.5);
    scene.add(fillLight);

    // Back & Side Rim Lights: Crucial for making black and dark grey garments pop with razor-sharp silhouette edges!
    const backRimLight = new THREE.DirectionalLight(0xffffff, 3.4);
    backRimLight.position.set(0, 5, -5);
    scene.add(backRimLight);

    const leftRimLight = new THREE.DirectionalLight(0xffffff, 2.2);
    leftRimLight.position.set(-5, 2, -3);
    scene.add(leftRimLight);

    const rightRimLight = new THREE.DirectionalLight(0xffffff, 2.2);
    rightRimLight.position.set(5, 2, -3);
    scene.add(rightRimLight);

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
  }, [isMobile]);

  // 6. Load 3D Garment Model (Desktop only — 0 MB download on mobile)
  useEffect(() => {
    if (isMobile) return;
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
  }, [activeGarment, isMobile]);

  // 7. Update Fabric Color (Desktop only)
  useEffect(() => {
    if (isMobile) return;
    if (currentModelRef.current) {
      applyColorToModel(currentModelRef.current, selectedColor.hex);
    }
    updateFrontDecalTexture();
    updateBackDecalTexture();
  }, [selectedColor, isMobile]);

  // 8. Update Front Decal Texture (Desktop only)
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
    if (isMobile) return;
    updateFrontDecalTexture();
  }, [institutionName, subText, estYear, isMobile]);

  // 9. Update Back Decal Texture & Visibility (Desktop only)
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
    if (isMobile) return;
    updateBackDecalTexture();
  }, [enableBackPrint, backName, backNumber, backSub, isMobile]);

  // 10. Camera / Orientation Preset Buttons
  const handleSetView = (view) => {
    setAutoRotate(false);
    setCurrentView(view);
    if (controlsRef.current) {
      cameraRef.current.position.set(0, 0.08, 3.25);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
    if (view === 'front') {
      targetRotationYRef.current = 0;
    } else if (view === 'back') {
      targetRotationYRef.current = Math.PI;
    } else if (view === 'angle') {
      targetRotationYRef.current = Math.PI / 4;
    }
  };

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'front') {
      handleSetView('front');
    } else if (tab === 'back') {
      handleSetView('back');
    }
  };

  // Helper for mobile garment static preview
  const getMobileGarmentImage = () => {
    if (selectedColor.id === 'white') return hoodieCreamImg;
    if (selectedColor.id === 'black' || selectedColor.id === 'navy' || selectedColor.id === 'crimson')
      return hoodieBlackImg;
    return jamiaHoodieImg;
  };

  // Dynamic Background classes & spotlight styles based on backdropMode
  const getBackdropStyles = () => {
    if (backdropMode === 'light') {
      return {
        containerClass: 'bg-gradient-to-b from-[#ECE8DF] via-[#DFDAD0] to-[#CFCA stand-c]',
        spotlight: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,0.95) 0%, rgba(220,215,205,0.6) 50%, rgba(195,190,180,0.9) 100%)',
        textColor: 'text-neutral-800'
      };
    }
    if (backdropMode === 'dark') {
      return {
        containerClass: 'bg-gradient-to-b from-[#1A1F24] via-[#101316] to-[#0A0D0E]',
        spotlight: 'radial-gradient(circle at 50% 45%, rgba(0,100,78,0.35) 0%, rgba(0,100,78,0.08) 55%, transparent 80%)',
        textColor: 'text-white'
      };
    }
    // Default 'studio' - High-contrast photographic studio grey (perfect separation for black & all colors)
    return {
      containerClass: 'bg-gradient-to-b from-[#384148] via-[#252B31] to-[#181D21]',
      spotlight: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.08) 50%, transparent 80%)',
      textColor: 'text-white'
    };
  };

  const backdrop = getBackdropStyles();

  return (
    <div className="bg-charcoal text-white rounded-xs border border-neutral-800 overflow-hidden shadow-2xl">
      {/* Top Header Bar */}
      <div className="bg-neutral-900/90 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-green-primary animate-pulse shrink-0" />
          <span className="font-heading text-base sm:text-lg font-bold uppercase tracking-wider text-white truncate">
            {isMobile ? 'Collegiate Apparel Customizer' : '3D Collegiate Customizer Studio'}
          </span>
          <span className="inline-block px-2 py-0.5 rounded-xs bg-green-primary/20 text-green-primary text-[10px] font-extrabold uppercase tracking-widest border border-green-primary/40 shrink-0">
            {isMobile ? '⚡ Mobile-Optimized Preview' : 'Surface Conformed · Front & Back Print'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-neutral-400 shrink-0">
          {isMobile ? (
            <div className="flex items-center gap-1 text-[11px] text-green-primary font-medium">
              <Zap className="w-3.5 h-3.5 text-green-primary" />
              <span>Lightweight Mode</span>
            </div>
          ) : (
            <>
              <Box className="w-4 h-4 text-green-primary" />
              <span className="hidden xs:inline">Three.js PBR Studio</span>
            </>
          )}
        </div>
      </div>

      {/* MOBILE-ONLY LIGHTWEIGHT PREVIEW (Screen < 1024px) */}
      {isMobile ? (
        <div className="p-4 sm:p-6 bg-neutral-950 space-y-5">
          {/* Static Garment Card with High-Contrast Studio Backdrop */}
          <div className="relative rounded-xs overflow-hidden border border-neutral-800 bg-[#252B31] shadow-xl">
            {/* Center Studio Spotlight for crisp separation */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.06) 55%, transparent 85%)'
              }}
            />

            {/* Top View Toggle Buttons */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-1 bg-neutral-950/90 p-1 rounded-xs border border-neutral-800 shadow-md">
                <button
                  type="button"
                  onClick={() => setCurrentView('front')}
                  className={`px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-colors ${
                    currentView === 'front'
                      ? 'bg-green-primary text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Front
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView('back')}
                  className={`px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-colors ${
                    currentView === 'back'
                      ? 'bg-green-primary text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Back
                </button>
              </div>

              <span className="px-2.5 py-1 bg-neutral-950/90 text-[10px] font-mono uppercase tracking-widest text-neutral-300 rounded-xs border border-neutral-800">
                {selectedColor.name}
              </span>
            </div>

            {/* Garment Image Showcase */}
            <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden flex items-center justify-center">
              <img
                src={getMobileGarmentImage()}
                alt="MerchX Collegiate Garment Preview"
                className="w-full h-full object-contain p-4 transition-all duration-300"
              />

              {/* Massive Dynamic Live Typography Overlay Card */}
              <div className="absolute inset-x-6 bottom-4 p-3.5 bg-neutral-950/95 backdrop-blur-md rounded-xs border border-neutral-800 shadow-2xl text-center">
                {currentView === 'front' ? (
                  <div className="space-y-1">
                    <p
                      className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-wider truncate"
                      style={{ color: selectedColor.textOnDark ? '#FFFFFF' : '#00644E' }}
                    >
                      {institutionName || 'JAMIA'}
                    </p>
                    <p className="text-xs sm:text-sm font-black uppercase tracking-widest text-neutral-200 truncate">
                      {subText || 'MILLIA ISLAMIA'}
                    </p>
                    <p
                      className="text-[11px] font-mono tracking-widest font-bold"
                      style={{ color: selectedColor.accentText }}
                    >
                      ★ {estYear || 'EST. 1920'} ★
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="font-heading text-base font-black uppercase tracking-widest text-neutral-200 truncate">
                      {backName || 'JAMIA'}
                    </p>
                    <p
                      className="font-heading text-4xl sm:text-5xl font-black tracking-tight"
                      style={{ color: selectedColor.textOnDark ? '#FFFFFF' : '#00644E' }}
                    >
                      {backNumber || '20'}
                    </p>
                    <p
                      className="text-[11px] font-mono uppercase tracking-widest font-bold"
                      style={{ color: selectedColor.accentText }}
                    >
                      {backSub || 'NEW DELHI'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Customization Controls (Tabs & Inputs) */}
          <div className="bg-neutral-900 rounded-xs border border-neutral-800 p-4 space-y-4">
            <div className="grid grid-cols-3 gap-1 p-1 bg-neutral-950 rounded-xs border border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('front');
                  setCurrentView('front');
                }}
                className={`py-2 text-center font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'front'
                    ? 'bg-green-primary text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>Front</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('back');
                  setCurrentView('back');
                }}
                className={`py-2 text-center font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'back'
                    ? 'bg-green-primary text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Hash className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('fabric')}
                className={`py-2 text-center font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'fabric'
                    ? 'bg-green-primary text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Color</span>
              </button>
            </div>

            {/* Tab 1: Front Inputs */}
            {activeTab === 'front' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    University Name
                  </label>
                  <input
                    type="text"
                    maxLength={14}
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder="e.g. JAMIA, STANFORD, IIT"
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-3 py-2 text-xs uppercase font-heading font-bold tracking-wider rounded-xs text-white placeholder-neutral-600 focus:outline-none min-h-[42px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      maxLength={18}
                      value={subText}
                      onChange={(e) => setSubText(e.target.value)}
                      placeholder="e.g. MILLIA ISLAMIA"
                      className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-2.5 py-2 text-xs uppercase font-heading font-bold tracking-wider rounded-xs text-white placeholder-neutral-600 focus:outline-none min-h-[42px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      Year
                    </label>
                    <input
                      type="text"
                      maxLength={12}
                      value={estYear}
                      onChange={(e) => setEstYear(e.target.value)}
                      placeholder="e.g. EST. 1920"
                      className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-2.5 py-2 text-xs uppercase font-heading font-bold tracking-wider rounded-xs text-white placeholder-neutral-600 focus:outline-none min-h-[42px]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Back Inputs */}
            {activeTab === 'back' && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      Player / Alumni Name
                    </label>
                    <input
                      type="text"
                      maxLength={12}
                      value={backName}
                      onChange={(e) => setBackName(e.target.value)}
                      placeholder="e.g. JAMIA, VARIS"
                      className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-3 py-2 text-xs uppercase font-heading font-bold tracking-wider rounded-xs text-white placeholder-neutral-600 focus:outline-none min-h-[42px]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      Number
                    </label>
                    <input
                      type="text"
                      maxLength={2}
                      value={backNumber}
                      onChange={(e) => setBackNumber(e.target.value)}
                      placeholder="e.g. 20"
                      className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-3 py-2 text-xs uppercase font-heading font-black tracking-widest text-center rounded-xs text-white placeholder-neutral-600 focus:outline-none min-h-[42px]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    City / Department
                  </label>
                  <input
                    type="text"
                    maxLength={18}
                    value={backSub}
                    onChange={(e) => setBackSub(e.target.value)}
                    placeholder="e.g. NEW DELHI"
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-3 py-2 text-xs uppercase font-heading font-bold tracking-wider rounded-xs text-white placeholder-neutral-600 focus:outline-none min-h-[42px]"
                  />
                </div>
              </div>
            )}

            {/* Tab 3: Color Swatches */}
            {activeTab === 'fabric' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  Choose Colorway: <span className="text-green-primary">{selectedColor.name}</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {COLOR_SWATCHES.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => handleSelectColor(color)}
                      className={`p-2 rounded-xs border flex flex-col items-center justify-center gap-1.5 transition-all ${
                        selectedColor.id === color.id
                          ? 'bg-neutral-800 border-white ring-2 ring-green-primary'
                          : 'bg-neutral-950 border-neutral-800'
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
                      <p className="font-heading text-[10px] font-bold uppercase truncate">
                        {color.badge}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Colorway Switcher (always accessible) */}
            {activeTab !== 'fabric' && (
              <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Quick Color:
                </span>
                <div className="flex items-center gap-1.5">
                  {COLOR_SWATCHES.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => handleSelectColor(color)}
                      className={`w-7 h-7 rounded-full border transition-transform ${
                        selectedColor.id === color.id
                          ? 'border-white scale-110 shadow-lg ring-1 ring-green-primary'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor.id === color.id && (
                        <Check
                          className={`w-3 h-3 mx-auto ${
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

          {/* Desktop 3D Mode Callout Banner on Mobile */}
          <div className="p-3.5 bg-neutral-900/90 rounded-xs border border-neutral-800 flex items-start gap-3">
            <Monitor className="w-5 h-5 text-green-primary shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                Full 3D Studio on Desktop
              </p>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Open this studio on a desktop or laptop to explore the real-time 360° Three.js 3D parametric customizer.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* DESKTOP-ONLY FULL 3D ENGINE (Screen >= 1024px) */
        <div className="grid grid-cols-12 min-h-[660px]">
          {/* Left: 3D Three.js Viewport (7 cols) with High-Contrast Studio Backdrop */}
          <div className={`col-span-7 relative ${backdrop.containerClass} flex flex-col justify-between overflow-hidden transition-colors duration-300`}>
            {/* Soft Studio Radial Spotlight (Delineates Black/Dark Garments with extreme clarity!) */}
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-300"
              style={{ background: backdrop.spotlight }}
            />

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

            {/* Three.js Canvas Container */}
            <div
              ref={mountRef}
              className="w-full h-[660px] cursor-grab active:cursor-grabbing"
              title="Click and drag to orbit in 360°. Scroll to zoom."
            />

            {/* Viewport Floating Top Controls: Auto Rotate, View Tag & Studio Backdrop Switcher */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  type="button"
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-3 py-1.5 rounded-xs text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md ${
                    autoRotate
                      ? 'bg-green-primary text-white'
                      : 'bg-neutral-900/90 text-neutral-300 hover:bg-neutral-800 border border-neutral-700/80'
                  }`}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
                  <span>Auto-Rotate {autoRotate ? 'On' : 'Off'}</span>
                </button>

                <span className="inline-flex items-center px-2.5 py-1.5 rounded-xs bg-neutral-900/90 text-neutral-300 text-[10px] font-mono uppercase tracking-widest border border-neutral-700/80 shadow-md">
                  View: {currentView.toUpperCase()}
                </span>
              </div>

              {/* Studio Backdrop Mode Switcher (Ensures Black, Grey & All Colors Have Perfect Contrast!) */}
              <div className="flex items-center gap-1 bg-neutral-900/90 p-1 rounded-xs border border-neutral-700/80 shadow-xl pointer-events-auto">
                <span className="text-[10px] uppercase font-bold text-neutral-400 px-2 tracking-wider hidden xl:inline">
                  Backdrop:
                </span>
                <button
                  type="button"
                  onClick={() => setBackdropMode('studio')}
                  className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-xs transition-colors ${
                    backdropMode === 'studio'
                      ? 'bg-green-primary text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Studio Stage (Balanced Grey Cyclorama - High Visibility for Black Garments)"
                >
                  Studio Grey
                </button>
                <button
                  type="button"
                  onClick={() => setBackdropMode('light')}
                  className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-xs transition-colors ${
                    backdropMode === 'light'
                      ? 'bg-green-primary text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Light Gallery Stage (Maximum Contrast for Dark Garments)"
                >
                  Light Bone
                </button>
                <button
                  type="button"
                  onClick={() => setBackdropMode('dark')}
                  className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-xs transition-colors ${
                    backdropMode === 'dark'
                      ? 'bg-green-primary text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Onyx Dark Stage"
                >
                  Onyx Dark
                </button>
              </div>
            </div>

            {/* Bottom Camera Angles & Orbit Guidance */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-400 z-10 pointer-events-none">
              <span className="bg-neutral-900/90 px-3 py-1.5 rounded-xs backdrop-blur-sm border border-neutral-700/80 text-[11px] text-neutral-300">
                Drag to Orbit 360° · Scroll to Zoom
              </span>
              <div className="flex items-center gap-1 pointer-events-auto bg-neutral-900/95 p-1 rounded-xs border border-neutral-700/80 shadow-xl ml-auto">
                <button
                  type="button"
                  onClick={() => handleSetView('front')}
                  className={`px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-colors ${
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
                  className={`px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-colors ${
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
                  className={`px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-colors ${
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
          <div className="col-span-5 p-7 bg-neutral-900 flex flex-col justify-between border-l border-neutral-800 overflow-y-auto max-h-[660px]">
            <div className="space-y-5">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-primary mb-1">
                  <Sliders className="w-4 h-4" />
                  <span>Parametric Customizer</span>
                </div>
                <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-white">
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

                  <div className="grid grid-cols-2 gap-3">
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
                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
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
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Garment Silhouette
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

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                        Fabric Colorway
                      </label>
                      <span className="text-xs font-bold text-green-primary">{selectedColor.name}</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {COLOR_SWATCHES.map((color) => (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => handleSelectColor(color)}
                          className={`p-2.5 rounded-xs border flex flex-col items-center justify-center gap-2 transition-all ${
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
                          <div className="text-center min-w-0">
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

              {/* Quick Colorway Switcher (always visible at bottom of tab) */}
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
                        onClick={() => handleSelectColor(color)}
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
      )}
    </div>
  );
}
