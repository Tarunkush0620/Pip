import * as THREE from 'three';

class CelestialScene {
  constructor(containerId = 'three-canvas-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.scrollProgress = 0;
    this.isPlaying = true;
    this.currentPhase = 'midnight';

    this.init();
    this.createStars();
    // Celestial Moon and 3D Clouds disabled - using high-resolution video background (Dawn.mp4 & midnight.mp4)
    this.setupEvents();
    this.animate();
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 80;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.container.appendChild(this.renderer.domElement);

    // Ambient & Directional Lighting
    this.ambientLight = new THREE.AmbientLight(0x2a1245, 1.4);
    this.scene.add(this.ambientLight);

    this.dirLight = new THREE.DirectionalLight(0xf4d77b, 1.6);
    this.dirLight.position.set(-20, 45, 40);
    this.scene.add(this.dirLight);

    this.pointLight = new THREE.PointLight(0xa23a62, 2.0, 160);
    this.pointLight.position.set(30, -20, 40);
    this.scene.add(this.pointLight);
  }

  createStars() {
    const starCount = 950;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const starPalette = [
      new THREE.Color('#FCE183'), // Moon gold
      new THREE.Color('#FFB3C6'), // Blush pink
      new THREE.Color('#CDB8E3'), // Lavender
      new THREE.Color('#FFFFFF'), // Pure starlight
      new THREE.Color('#7CE5DF'), // Mint sparkle
      new THREE.Color('#FF75A0')  // Berry twinkle
    ];

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 320;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 260;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 180;

      const col = starPalette[Math.floor(Math.random() * starPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom star sprite with high-intensity stardust flare
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(252, 225, 131, 0.95)');
    grad.addColorStop(0.55, 'rgba(205, 184, 227, 0.6)');
    grad.addColorStop(0.85, 'rgba(255, 179, 198, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const starTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 6.0,
      vertexColors: true,
      map: starTexture,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.stars = new THREE.Points(geometry, material);
    this.scene.add(this.stars);
  }

  createCelestialMoon() {
    this.moonGroup = new THREE.Group();

    // Stylized glowing sphere
    const moonGeo = new THREE.SphereGeometry(9.5, 32, 32);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0xFFF3C4,
      emissive: 0xF4D77B,
      emissiveIntensity: 0.75,
      roughness: 0.3,
      metalness: 0.1,
    });

    this.moonMesh = new THREE.Mesh(moonGeo, moonMat);
    this.moonGroup.add(this.moonMesh);

    // Glowing atmosphere halo ring
    const ringGeo = new THREE.RingGeometry(11.5, 17.5, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xFFEAA7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    this.moonHalo = new THREE.Mesh(ringGeo, ringMat);
    this.moonHalo.rotation.x = Math.PI / 3.2;
    this.moonGroup.add(this.moonHalo);

    // Position the moon in the open upper-left sky above the title
    this.moonGroup.position.set(-36, 28, -15);
    this.scene.add(this.moonGroup);
  }

  createDreamClouds() {
    this.cloudsGroup = new THREE.Group();
    this.clouds = [];

    const cloudCount = 10;
    const cloudColors = [0xFFE4F0, 0xEBD8FC, 0xFFF1D6, 0xDCF3FD];

    for (let c = 0; c < cloudCount; c++) {
      const singleCloud = new THREE.Group();
      const puffCount = 5;
      const baseColor = cloudColors[c % cloudColors.length];

      const cloudMat = new THREE.MeshStandardMaterial({
        color: baseColor,
        roughness: 0.75,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
      });

      for (let p = 0; p < puffCount; p++) {
        const radius = Math.random() * 4.5 + 4.0;
        const puffGeo = new THREE.SphereGeometry(radius, 16, 16);
        const puffMesh = new THREE.Mesh(puffGeo, cloudMat);
        puffMesh.position.set(
          (p - puffCount / 2) * 4.5 + (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3
        );
        singleCloud.add(puffMesh);
      }

      // Initial distributed placement across screen depth
      singleCloud.position.set(
        (Math.random() - 0.5) * 240,
        (Math.random() - 0.5) * 140 + 10,
        -Math.random() * 50 - 30
      );

      singleCloud.userData = {
        speed: (Math.random() * 0.04 + 0.02) * (Math.random() > 0.5 ? 1 : -1),
        bobSpeed: Math.random() * 0.001 + 0.0006,
        bobPhase: Math.random() * Math.PI * 2,
        baseY: singleCloud.position.y
      };

      this.clouds.push(singleCloud);
      this.cloudsGroup.add(singleCloud);
    }

    this.scene.add(this.cloudsGroup);
  }

  setupEvents() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }, { passive: true });

    window.addEventListener('pointermove', (e) => {
      this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    window.addEventListener('scroll', () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      this.isPlaying = !document.hidden;
      if (this.isPlaying) this.animate();
    });
  }

  animate() {
    if (!this.isPlaying) return;

    requestAnimationFrame(() => this.animate());

    const time = Date.now();

    // Smooth lerp mouse tracking
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    // Gentle starfield drift & pulsation
    if (this.stars) {
      this.stars.rotation.y += 0.0004;
      this.stars.rotation.x = this.mouseY * 0.08 + this.scrollProgress * 0.15;
      this.stars.position.x = -this.mouseX * 3;
      this.stars.position.y = this.mouseY * 3;
    }

    // Celestial Moon gentle floating in upper-left sky
    if (this.moonGroup) {
      this.moonGroup.rotation.y += 0.003;
      this.moonGroup.position.y = 28 + Math.sin(time * 0.001) * 2;
      this.moonGroup.position.x = -36 + Math.cos(time * 0.0008) * 1.5 - this.mouseX * 3;
      if (this.moonHalo) {
        this.moonHalo.rotation.z += 0.0015;
      }
    }

    // Floating Dream Clouds slow drift
    if (this.clouds) {
      this.clouds.forEach((cloud) => {
        cloud.position.x += cloud.userData.speed;
        // Wrap around horizontally
        if (cloud.position.x > 160) cloud.position.x = -160;
        if (cloud.position.x < -160) cloud.position.x = 160;

        cloud.position.y = cloud.userData.baseY + Math.sin(time * cloud.userData.bobSpeed + cloud.userData.bobPhase) * 2;
      });
    }

    this.renderer.render(this.scene, this.camera);
  }

  setSkyPhase(phase) {
    this.currentPhase = phase;
    if (phase === 'dawn') {
      if (this.stars) this.stars.material.opacity = 0.6;
      if (this.ambientLight) {
        this.ambientLight.color.setHex(0xFFE5D2);
        this.ambientLight.intensity = 1.4;
      }
      if (this.dirLight) {
        this.dirLight.color.setHex(0xFFA726);
        this.dirLight.intensity = 1.5;
      }
      if (this.moonGroup) {
        this.moonGroup.visible = true;
        if (this.moonMesh) this.moonMesh.material.emissiveIntensity = 0.45;
      }
    } else if (phase === 'twilight') {
      if (this.stars) this.stars.material.opacity = 0.85;
      if (this.ambientLight) {
        this.ambientLight.color.setHex(0x9E4B75);
        this.ambientLight.intensity = 1.15;
      }
      if (this.dirLight) {
        this.dirLight.color.setHex(0xFF75A0);
        this.dirLight.intensity = 1.3;
      }
      if (this.moonGroup) {
        this.moonGroup.visible = true;
        if (this.moonMesh) this.moonMesh.material.emissiveIntensity = 0.65;
      }
    } else if (phase === 'midnight') {
      if (this.stars) this.stars.material.opacity = 1.0;
      if (this.ambientLight) {
        this.ambientLight.color.setHex(0x2A1245);
        this.ambientLight.intensity = 0.95;
      }
      if (this.dirLight) {
        this.dirLight.color.setHex(0xF4D77B);
        this.dirLight.intensity = 1.5;
      }
      if (this.moonGroup) {
        this.moonGroup.visible = true;
        if (this.moonMesh) this.moonMesh.material.emissiveIntensity = 0.85;
      }
    }
  }
}

let sceneInstance = null;

export function initCelestialScene() {
  if (!sceneInstance) {
    sceneInstance = new CelestialScene('three-canvas-container');
    window.celestialScene = sceneInstance;
  }
  return sceneInstance;
}
