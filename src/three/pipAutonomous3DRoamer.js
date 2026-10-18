import * as THREE from 'three';

export class PipAutonomous3DRoamer {
  constructor() {
    this.canvas = null;
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.pip = null;
    this.speechEl = null;
    this.clock = null;
    this.isMounted = true;
    this.animFrameId = null;

    // 3D World Boundaries (Projected from screen)
    this.worldWidth = 10;
    this.worldHeight = 6;

    // 3D Position & Dynamics
    this.pos = new THREE.Vector3(3.6, -1.8, 0);
    this.target = new THREE.Vector3(3.6, -1.8, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.speed = 0.038;
    this.currentRotationY = 0;
    this.targetRotationY = 0;
    this.bankAngle = 0;

    // Autonomous State Machine (Completely automatic, zero sound effects)
    this.mode = 'roam';
    this.stateTimer = 0;
    this.stateDuration = 7; // seconds per autonomous state
    this.stateIndex = 0;
    this.statesOrder = ['roam', 'wave', 'dance', 'run', 'sleep'];

    // Quotes for automatic states (delicate and concise)
    this.quotes = {
      roam: [
        'Floating across the stars... ☁️',
        'Exploring Moonberry Hollow 🌙',
        'Watching over dreamers 🧸',
        'Collecting starry night dust ⭐',
        'Gentle cloud breeze... ✦'
      ],
      wave: [
        'Hello dreamer! ☻✨',
        'Pip says hi! 💖',
        'Sweet dreams to you! ✦',
        'Waving from my cloud! 🌟'
      ],
      dance: [
        'Twinkle toes jig! ♫✨',
        'Music box dancing! 🎠♬',
        'Bouncing on the clouds! 💖',
        'Little dream hop! ♩'
      ],
      run: [
        'Star sprint! 🚀',
        'Dream delivery! ⚡',
        'Wheeeee! 💨',
        'Fast cloud rush! 🌟'
      ],
      sleep: [
        'Zzz... snug as a cloud bug 💤',
        'Cozy nap time... 🧸',
        'Warm nightlight glow 🌙',
        'Sweet slumber... 💤'
      ]
    };
  }

  init() {
    if (document.getElementById('pip-3d-roamer-canvas')) return;

    this.createCanvas();
    this.initThree();
    this.buildPip();
    this.createSpeechBubble();
    this.bindEvents();
    this.startAutonomousLoop();

    // Initial greeting quote
    setTimeout(() => {
      this.speak('✦ Pip is here with you! ✨', 3500);
    }, 1200);
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'pip-3d-roamer-canvas';
    this.canvas.className = 'fixed inset-0 w-full h-full pointer-events-none select-none';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0px';
    this.canvas.style.left = '0px';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.zIndex = '5';
    this.canvas.style.outline = 'none';

    document.body.appendChild(this.canvas);
  }

  initThree() {
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    const w = window.innerWidth;
    const h = window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    this.camera.position.set(0, 0, 11);
    this.camera.lookAt(0, 0, 0);

    this.updateWorldBounds();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    // Rich Lighting
    const hemi = new THREE.HemisphereLight('#fff7eb', '#bda2be', 2.2);
    this.scene.add(hemi);

    const keyLight = new THREE.DirectionalLight('#fff2d8', 2.8);
    keyLight.position.set(-4, 7, 6);
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#f0d7ff', 1.8);
    rimLight.position.set(5, 3, -4);
    this.scene.add(rimLight);
  }

  updateWorldBounds() {
    const vFOV = THREE.MathUtils.degToRad(this.camera.fov);
    const visibleHeight = 2 * Math.tan(vFOV / 2) * this.camera.position.z;
    const visibleWidth = visibleHeight * this.camera.aspect;

    this.worldWidth = visibleWidth;
    this.worldHeight = visibleHeight;
  }

  // Procedural Canon Textures
  createEyeTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Deep shiny obsidian base
    ctx.fillStyle = '#180B09';
    ctx.beginPath();
    ctx.ellipse(128, 128, 120, 120, 0, 0, Math.PI * 2);
    ctx.fill();

    // Warm glowing amber lantern iris
    const grad = ctx.createRadialGradient(128, 130, 8, 128, 130, 95);
    grad.addColorStop(0, '#FFF59D');
    grad.addColorStop(0.2, '#FFCA28');
    grad.addColorStop(0.5, '#F57C00');
    grad.addColorStop(0.85, '#D84315');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(128, 130, 95, 0, Math.PI * 2);
    ctx.fill();

    // Central bright lantern flame core
    ctx.fillStyle = '#FFFDE7';
    ctx.beginPath();
    ctx.arc(128, 130, 24, 0, Math.PI * 2);
    ctx.fill();

    // Glossy reflection spot (top right)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.ellipse(170, 85, 15, 22, 0.35, 0, Math.PI * 2);
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  createPajamaTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Warm cream blush background
    ctx.fillStyle = '#FDF1EF';
    ctx.fillRect(0, 0, 512, 512);

    // Scattered candy pink hearts
    ctx.fillStyle = '#F4A6BA';
    const drawHeart = (cx, cy, s) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s, s);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-10, -12, -20, 4, 0, 20);
      ctx.bezierCurveTo(20, 4, 10, -12, 0, 0);
      ctx.fill();
      ctx.restore();
    };

    for (let y = 30; y < 512; y += 65) {
      for (let x = 30; x < 512; x += 65) {
        const offsetX = (y % 130 === 0) ? 32 : 0;
        drawHeart(x + offsetX, y, 0.65);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  createHatTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Soft warm cream
    ctx.fillStyle = '#FFF3DE';
    ctx.fillRect(0, 0, 512, 512);

    // Golden stars
    const drawStar = (cx, cy, r) => {
      ctx.save();
      ctx.fillStyle = '#DCA342';
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    for (let y = 35; y < 512; y += 60) {
      for (let x = 35; x < 512; x += 60) {
        const offsetX = (y % 120 === 0) ? 30 : 0;
        drawStar(x + offsetX, y, 13);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  createCloudTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#FFF8F4';
    ctx.fillRect(0, 0, 512, 256);

    // Subtle soft pink ambient shading
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, 'rgba(255, 248, 244, 0)');
    grad.addColorStop(1, 'rgba(248, 204, 218, 0.45)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    // "♥ Pip ♥" inscription
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 50px ui-rounded, "Trebuchet MS", sans-serif';
    ctx.fillStyle = '#8E6252';
    ctx.fillText('♥ Pip ♥', 256, 135);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  createFootTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#D6B4E0';
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = '#B488C4';
    ctx.beginPath();
    ctx.arc(64, 64, 45, 0, Math.PI * 2);
    ctx.fill();
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  buildPip() {
    const eyeTex = this.createEyeTexture();
    const pajamaTex = this.createPajamaTexture();
    const hatTex = this.createHatTexture();
    const cloudTex = this.createCloudTexture();
    const footTex = this.createFootTexture();

    const mat = (color, roughness = 0.65, extra = {}) =>
      new THREE.MeshStandardMaterial({ color, roughness, ...extra });

    const M = {
      skin: mat('#fff3e0', 0.52),
      hat: new THREE.MeshStandardMaterial({ map: hatTex, roughness: 0.82 }),
      hatTrim: mat('#fff1dc', 0.85),
      pomPom: mat('#fffaf2', 0.95),
      pinkBow: mat('#f492ac', 0.65),
      pinkKnot: mat('#d96f91', 0.65),
      pajama: new THREE.MeshStandardMaterial({ map: pajamaTex, roughness: 0.78 }),
      pajamaCollar: mat('#d9c4ed', 0.75),
      footPad: new THREE.MeshStandardMaterial({ map: footTex, roughness: 0.8 }),
      cloud: mat('#fff5ee', 0.95),
      cloudFront: new THREE.MeshStandardMaterial({ map: cloudTex, roughness: 0.95 }),
      eyeMat: new THREE.MeshStandardMaterial({ map: eyeTex, roughness: 0.18, metalness: 0.05 }),
      blush: new THREE.MeshStandardMaterial({ color: '#f79bad', transparent: true, opacity: 0.65, roughness: 1 }),
      gold: mat('#ebb853', 0.35, { metalness: 0.35 }),
      lanternGlass: new THREE.MeshStandardMaterial({
        color: '#ffecaf',
        emissive: '#ffca54',
        emissiveIntensity: 0.9,
        transparent: true,
        opacity: 0.75,
        roughness: 0.2,
      }),
      lavender: mat('#d9c4ed', 0.75),
      pinkRim: mat('#f39cb8', 0.65),
      white: mat('#fffaf0', 0.55),
      unicornPink: mat('#ed9bc0', 0.55),
      star: mat('#e8b54f', 0.6),
      darkLine: mat('#5c3a2f', 0.6),
    };

    const mesh = (geo, material, parent, name = '') => {
      const m = new THREE.Mesh(geo, material);
      m.name = name;
      parent.add(m);
      return m;
    };

    const sphere = (parent, material, pos, scale, name = '') => {
      const m = mesh(new THREE.SphereGeometry(1, 28, 24), material, parent, name);
      m.position.set(...pos);
      m.scale.set(...scale);
      return m;
    };

    const group = (parent, pos = [0, 0, 0], name = '') => {
      const g = new THREE.Group();
      g.name = name;
      g.position.set(...pos);
      parent.add(g);
      return g;
    };

    const capsule = (parent, material, a, b, radius, name = '') => {
      const A = new THREE.Vector3(...a);
      const B = new THREE.Vector3(...b);
      const d = B.clone().sub(A);
      const g = new THREE.CapsuleGeometry(radius, Math.max(0.001, d.length() - radius * 2), 6, 12);
      const m = mesh(g, material, parent, name);
      m.position.copy(A.add(B).multiplyScalar(0.5));
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
      return m;
    };

    const line = (parent, points, material, radius = 0.018) => {
      const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
      return mesh(new THREE.TubeGeometry(curve, 20, radius, 8, false), material, parent);
    };

    // Root Character Group - Scaled small, cute, and compact!
    const root = group(this.scene, [this.pos.x, this.pos.y, this.pos.z], 'PipRoot');
    root.scale.setScalar(0.46); // Small, delicate companion size!

    // Torso / Body in Heart Pajamas
    const torso = group(root, [0, -0.35, 0], 'torso');
    sphere(torso, M.pajama, [0, 0, 0], [0.55, 0.64, 0.44], 'body');
    // Collar & Buttons
    line(torso, [[-0.22, 0.42, 0.34], [0, 0.28, 0.43], [0.22, 0.42, 0.34]], M.pajamaCollar, 0.055);
    for (const y of [0.15, -0.12, -0.36]) {
      sphere(torso, M.pinkKnot, [0.04, y, 0.445], [0.045, 0.045, 0.02]);
    }

    // Oversized Cream Head
    const head = group(root, [0, 0.67, 0], 'head');
    sphere(head, M.skin, [0, 0, 0], [0.96, 0.88, 0.82], 'bigRoundHead');
    // Ear nubs
    sphere(head, M.skin, [-0.94, -0.16, -0.04], [0.14, 0.2, 0.18]);
    sphere(head, M.skin, [0.94, -0.16, -0.04], [0.14, 0.2, 0.18]);

    // Cheeks Blush
    sphere(head, M.blush, [-0.55, -0.28, 0.64], [0.22, 0.13, 0.04], 'blushL');
    sphere(head, M.blush, [0.55, -0.28, 0.64], [0.22, 0.13, 0.04], 'blushR');

    // Big Glossy Lantern Eyes
    const eyeGeo = new THREE.SphereGeometry(0.32, 24, 20);
    for (const side of [-1, 1]) {
      const eyeMesh = mesh(eyeGeo, M.eyeMat, head, `eye_${side}`);
      eyeMesh.position.set(side * 0.42, 0.02, 0.68);
      eyeMesh.scale.set(0.85, 1.05, 0.32);
      eyeMesh.rotation.y = side * 0.22;
      eyeMesh.rotation.z = side * -0.06;
    }

    // Tiny button nose and sweet smile
    sphere(head, M.darkLine, [0, -0.18, 0.76], [0.038, 0.03, 0.02], 'nose');
    line(head, [[-0.14, -0.29, 0.74], [-0.06, -0.34, 0.76], [0, -0.35, 0.77], [0.08, -0.32, 0.76], [0.14, -0.27, 0.74]], M.darkLine, 0.018);

    // Canon Nightcap with Drooping Cone, Pom-pom & Bow
    const hat = group(head, [0, 0.58, 0], 'nightcap');
    // Forehead folded rim band
    const rim = mesh(new THREE.TorusGeometry(0.82, 0.13, 16, 32), M.hatTrim, hat, 'hatRim');
    rim.rotation.x = Math.PI / 2 + 0.15;
    rim.position.set(0, 0.04, 0.05);

    // Nightcap main body
    sphere(hat, M.hat, [0, 0.24, -0.02], [0.86, 0.52, 0.78]);

    // Drooping sleeping cone to the left
    const droop = group(hat, [-0.48, 0.18, 0.02], 'hatDroop');
    capsule(droop, M.hat, [0, 0.1, 0], [-0.42, -0.28, 0], 0.26);
    // Soft fluffy pom-pom hanging near left cheek
    sphere(droop, M.pomPom, [-0.52, -0.34, 0.02], [0.26, 0.26, 0.26], 'pomPom');

    // Candy pink ribbon bow on the front brim
    const bow = group(hat, [-0.48, 0.04, 0.72], 'pinkBow');
    bow.rotation.z = 0.25;
    sphere(bow, M.pinkBow, [-0.16, 0, 0], [0.22, 0.15, 0.07]).rotation.z = 0.4;
    sphere(bow, M.pinkBow, [0.16, 0, 0], [0.22, 0.15, 0.07]).rotation.z = -0.4;
    sphere(bow, M.pinkKnot, [0, 0, 0.02], [0.075, 0.08, 0.07]);

    // Chubby Arms
    const armL = group(torso, [-0.42, 0.26, 0], 'armL');
    capsule(armL, M.pajama, [0, 0, 0], [-0.14, -0.26, 0.18], 0.16);
    sphere(armL, M.skin, [-0.14, -0.28, 0.2], [0.15, 0.14, 0.13], 'handL');

    const armR = group(torso, [0.42, 0.26, 0], 'armR');
    capsule(armR, M.pajama, [0, 0, 0], [0.14, -0.26, 0.18], 0.16);
    sphere(armR, M.skin, [0.14, -0.28, 0.2], [0.15, 0.14, 0.13], 'handR');

    // Seated Chubby Legs with Lavender Soles
    const legL = group(root, [-0.28, -0.78, 0.12], 'legL');
    legL.rotation.x = -0.45;
    capsule(legL, M.pajama, [0, 0, 0], [0, -0.32, 0.08], 0.2);
    const footL = sphere(legL, M.footPad, [0, -0.36, 0.14], [0.22, 0.17, 0.26], 'footL');
    footL.rotation.x = Math.PI / 2;

    const legR = group(root, [0.28, -0.78, 0.12], 'legR');
    legR.rotation.x = -0.45;
    capsule(legR, M.pajama, [0, 0, 0], [0, -0.32, 0.08], 0.2);
    const footR = sphere(legR, M.footPad, [0, -0.36, 0.14], [0.22, 0.17, 0.26], 'footR');
    footR.rotation.x = Math.PI / 2;

    // Cloud Seat with "♥ Pip ♥" Front Puff
    const cloud = group(root, [0, -1.25, 0], 'cloudSeat');
    const puffs = [
      [-0.7, 0, 0, 0.55, 0.4, 0.45],
      [-0.35, 0.16, 0.06, 0.55, 0.48, 0.48],
      [0.15, 0.13, 0.02, 0.62, 0.5, 0.5],
      [0.62, 0.03, 0, 0.55, 0.4, 0.47],
      [0.35, -0.12, 0.2, 0.55, 0.36, 0.42],
      [-0.25, -0.15, 0.2, 0.65, 0.35, 0.43],
      [0, -0.23, -0.1, 0.7, 0.32, 0.45],
    ];
    for (const [x, y, z, sx, sy, sz] of puffs) {
      sphere(cloud, M.cloud, [x, y, z], [sx, sy, sz]);
    }
    // Front center puff with "♥ Pip ♥"
    const frontPuff = sphere(cloud, M.cloudFront, [0, -0.06, 0.42], [0.65, 0.38, 0.42], 'frontCloudPuff');
    frontPuff.rotation.x = -0.12;

    // Golden Lantern in Right Hand
    const lantern = group(torso, [-0.46, -0.32, 0.38], 'lantern');
    lantern.scale.setScalar(0.78);
    mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.36, 16, 1, true), M.lanternGlass, lantern);
    const top = mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.1, 16), M.gold, lantern);
    top.position.y = 0.22;
    const base = mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.07, 16), M.gold, lantern);
    base.position.y = -0.2;
    const cap = mesh(new THREE.ConeGeometry(0.18, 0.12, 16), M.gold, lantern);
    cap.position.y = 0.29;
    // Circular brass handle
    mesh(new THREE.TorusGeometry(0.13, 0.025, 8, 20), M.gold, lantern).position.set(0, 0.42, 0);

    const lanternLight = new THREE.PointLight('#ffd56b', 1.8, 4.0);
    lanternLight.position.set(0, 0, 0.15);
    lantern.add(lanternLight);

    // Unicorn Music Box in Left Hand
    const box = group(torso, [0.48, -0.32, 0.36], 'musicBox');
    box.scale.setScalar(0.78);
    mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.25, 20), M.lavender, box);
    const boxRim = mesh(new THREE.CylinderGeometry(0.245, 0.245, 0.045, 20), M.pinkRim, box);
    boxRim.position.y = 0.145;
    // Miniature toy unicorn on the lid
    sphere(box, M.white, [0, 0.35, 0], [0.13, 0.12, 0.2]);
    sphere(box, M.white, [0, 0.47, 0.11], [0.105, 0.105, 0.11]);
    capsule(box, M.white, [-0.07, 0.32, 0.02], [-0.11, 0.2, 0.02], 0.045);
    capsule(box, M.white, [0.07, 0.32, 0.02], [0.1, 0.2, 0.02], 0.045);
    const horn = mesh(new THREE.ConeGeometry(0.035, 0.12, 10), M.gold, box);
    horn.position.set(0, 0.59, 0.11);
    horn.rotation.z = -0.22;

    this.pip = {
      root,
      torso,
      head,
      armL,
      armR,
      legL,
      legR,
      cloud,
      lantern,
      lanternLight,
      box,
    };
  }

  createSpeechBubble() {
    this.speechEl = document.createElement('div');
    this.speechEl.id = 'pip-3d-speech-bubble';
    this.speechEl.className = 'pip-speech-bubble fixed pointer-events-none z-50';
    this.speechEl.style.position = 'fixed';
    this.speechEl.style.zIndex = '60';
    this.speechEl.style.fontSize = '11px';
    this.speechEl.style.padding = '5px 12px';
    this.speechEl.style.maxWidth = '210px';
    this.speechEl.innerHTML = `
      <span class="pip-speech-text font-bold text-xs">✦ Pip</span>
      <div class="pip-speech-arrow"></div>
    `;
    document.body.appendChild(this.speechEl);
  }

  setMode(newMode) {
    this.mode = newMode;

    const badge = document.getElementById('pip-3d-auto-badge');
    if (badge) {
      badge.textContent = `Auto · ${this.mode.toUpperCase()}`;
    }

    document.querySelectorAll('[data-auto-mode]').forEach((b) => {
      b.classList.toggle('active', b.dataset.autoMode === this.mode);
    });

    // Quote trigger (ZERO sound effects - peaceful and quiet)
    const quoteList = this.quotes[this.mode] || this.quotes.roam;
    const quote = quoteList[Math.floor(Math.random() * quoteList.length)];
    this.speak(quote, 2800);

    if (this.mode === 'run') {
      this.pickSprintTarget();
    } else if (this.mode === 'roam') {
      this.pickRoamTarget();
    }
  }

  pickRoamTarget() {
    const workSection = document.getElementById('work');
    const isInWork = workSection && (() => {
      const rect = workSection.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
    })();

    if (isInWork) {
      // Float gracefully in upper sky so invention cards and controls remain 100% visible
      const side = Math.random() > 0.5 ? 1 : -1;
      this.target.x = side * (this.worldWidth * 0.33);
      this.target.y = this.worldHeight * 0.26;
      return;
    }

    // Keep Pip gracefully along sides and bottom so he never obscures reading text
    const side = Math.random() > 0.4 ? 1 : -1;
    this.target.x = side * (this.worldWidth * (0.32 + Math.random() * 0.08));
    this.target.y = -this.worldHeight * (0.18 + Math.random() * 0.12);
  }

  pickSprintTarget() {
    this.target.x = this.pos.x > 0 ? -this.worldWidth * 0.30 : this.worldWidth * 0.30;
    this.target.y = (Math.random() - 0.5) * this.worldHeight * 0.25;
  }

  speak(text, duration = 2800) {
    if (!this.speechEl) return;
    const textSpan = this.speechEl.querySelector('.pip-speech-text');
    if (textSpan) textSpan.textContent = text;
    this.speechEl.classList.add('is-visible');

    clearTimeout(this.speechTimer);
    this.speechTimer = setTimeout(() => {
      if (this.speechEl) this.speechEl.classList.remove('is-visible');
    }, duration);
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      if (!this.renderer || !this.camera) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
      this.updateWorldBounds();
    });

    // Raycast click: Tapping Pip triggers a cute 360° celebratory spin (silently)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener('click', (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, this.camera);

      if (this.pip && this.pip.root) {
        const hits = raycaster.intersectObjects(this.pip.root.children, true);
        if (hits.length > 0) {
          this.handlePipClick();
        }
      }
    });
  }

  handlePipClick() {
    this.speak('Yay! Pip loves you! 💖', 2500);

    // 3D spin
    if (this.pip && this.pip.root) {
      let spinProgress = 0;
      const startRot = this.pip.root.rotation.y;
      const spin = () => {
        spinProgress += 0.2;
        this.pip.root.rotation.y = startRot + spinProgress * Math.PI * 2;
        if (spinProgress < 1) requestAnimationFrame(spin);
      };
      spin();
    }
  }

  startAutonomousLoop() {
    const animate = () => {
      if (!this.isMounted) return;
      this.animFrameId = requestAnimationFrame(animate);

      const delta = this.clock.getDelta();
      const t = this.clock.getElapsedTime();

      // 1. Autonomous Behavior Timer
      this.stateTimer += delta;
      if (this.stateTimer >= this.stateDuration) {
        this.stateTimer = 0;
        this.stateIndex = (this.stateIndex + 1) % this.statesOrder.length;
        const nextMode = this.statesOrder[this.stateIndex];
        this.setMode(nextMode);
      }

      // 2. Physics & Autonomous Navigation across Viewport
      this.updateMovement(delta);

      // 3. 3D Body & Limb Animations by State
      this.animateBodyParts(t);

      // 4. Update 3D Speech Bubble screen projection
      this.updateSpeechPosition();

      // 5. Render Scene
      this.renderer.render(this.scene, this.camera);
    };

    this.animFrameId = requestAnimationFrame(animate);
  }

  updateMovement(delta) {
    const dx = this.target.x - this.pos.x;
    const dy = this.target.y - this.pos.y;
    const dist = Math.hypot(dx, dy);

    let targetSpeed = 0.034;
    if (this.mode === 'run') targetSpeed = 0.10;
    else if (this.mode === 'dance') targetSpeed = 0.012;
    else if (this.mode === 'sleep') targetSpeed = 0.005;
    else if (this.mode === 'wave') targetSpeed = 0.007;

    if (dist > 0.15) {
      this.velocity.x += (dx * 0.04 - this.velocity.x) * 0.08;
      this.velocity.y += (dy * 0.04 - this.velocity.y) * 0.08;

      const curSpeed = this.velocity.length();
      if (curSpeed > targetSpeed) {
        this.velocity.multiplyScalar(targetSpeed / curSpeed);
      }

      this.pos.add(this.velocity);

      // 3D Bank and Face Direction
      this.targetRotationY = this.velocity.x > 0 ? 0.32 : -0.32;
      this.bankAngle = THREE.MathUtils.clamp(-this.velocity.x * 2.2, -0.25, 0.25);
    } else {
      if (this.mode === 'roam') {
        this.pickRoamTarget();
      } else if (this.mode === 'run') {
        this.pickSprintTarget();
      }
      this.targetRotationY = 0;
      this.bankAngle = 0;
    }

    this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.06;

    if (this.pip && this.pip.root) {
      this.pip.root.position.copy(this.pos);
      this.pip.root.rotation.y = this.currentRotationY;
      this.pip.root.rotation.z = this.bankAngle;
    }
  }

  animateBodyParts(t) {
    if (!this.pip) return;
    const { root, torso, head, armL, armR, legL, legR, cloud, lantern, lanternLight, box } = this.pip;

    torso.rotation.set(0, 0, 0);
    head.rotation.set(0, 0, 0);
    armL.rotation.set(0, 0, 0);
    armR.rotation.set(0, 0, 0);
    cloud.visible = true;

    // Cloud natural floating bob
    const bob = Math.sin(t * 2.2) * 0.05;
    cloud.position.y = -1.25 + bob;

    switch (this.mode) {
      case 'wave':
        root.rotation.y = Math.sin(t * 1.5) * 0.08;
        armR.rotation.z = -2.3 + Math.sin(t * 7) * 0.28;
        armR.rotation.x = -0.35;
        armL.rotation.z = 0.18;
        head.rotation.z = 0.08 + Math.sin(t * 2) * 0.03;
        lanternLight.intensity = 2.0;
        break;

      case 'dance':
        root.position.y += Math.abs(Math.sin(t * 5)) * 0.12;
        torso.rotation.z = Math.sin(t * 5) * 0.16;
        head.rotation.z = Math.sin(t * 5) * 0.14;
        armL.rotation.z = -0.7 + Math.sin(t * 5) * 0.5;
        armR.rotation.z = 0.7 - Math.sin(t * 5) * 0.5;
        box.rotation.y = t * 2.2;
        lantern.rotation.z = Math.sin(t * 5) * 0.12;
        lanternLight.intensity = 2.2;
        break;

      case 'run':
        cloud.visible = false;
        root.rotation.x = 0.25;
        root.position.y += Math.abs(Math.sin(t * 10)) * 0.12;
        legL.rotation.x = Math.sin(t * 10) * 0.8;
        legR.rotation.x = Math.sin(t * 10 + Math.PI) * 0.8;
        armL.rotation.z = Math.sin(t * 10 + Math.PI) * 0.65 - 0.2;
        armR.rotation.z = Math.sin(t * 10) * 0.65 + 0.2;
        head.rotation.x = -0.06 + Math.abs(Math.sin(t * 10)) * 0.03;
        lantern.rotation.z = Math.sin(t * 10) * 0.16;
        lanternLight.intensity = 2.4;
        break;

      case 'sleep':
        root.position.y -= 0.08;
        head.rotation.z = 0.22 + Math.sin(t * 1.0) * 0.02;
        head.rotation.x = 0.12;
        armL.rotation.z = -0.15;
        armR.rotation.z = 0.15;
        lanternLight.intensity = 0.9 + Math.sin(t * 1.5) * 0.2;
        break;

      default:
        // Roam
        root.position.y += Math.sin(t * 2.0) * 0.025;
        head.rotation.z = Math.sin(t * 1.2) * 0.02;
        lantern.rotation.z = Math.sin(t * 1.8) * 0.035;
        lanternLight.intensity = 1.8;
        break;
    }
  }

  updateSpeechPosition() {
    if (!this.speechEl || !this.pip || !this.pip.head) return;

    const headWorldPos = new THREE.Vector3();
    this.pip.head.getWorldPosition(headWorldPos);
    headWorldPos.y += 0.55;

    const projected = headWorldPos.clone().project(this.camera);

    const screenX = Math.max(120, Math.min(window.innerWidth - 120, (projected.x * 0.5 + 0.5) * window.innerWidth));
    const screenY = Math.max(70, Math.min(window.innerHeight - 70, (-(projected.y * 0.5) + 0.5) * window.innerHeight));

    this.speechEl.style.left = `${screenX}px`;
    this.speechEl.style.top = `${screenY}px`;
    this.speechEl.style.transform = 'translate(-50%, -100%)';
  }

  destroy() {
    this.isMounted = false;
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    if (this.canvas) this.canvas.remove();
    if (this.speechEl) this.speechEl.remove();
    const hud = document.getElementById('pip-3d-roam-hud');
    if (hud) hud.remove();
    if (this.renderer) this.renderer.dispose();
  }
}

let active3DRoamer = null;

export function initPipAutonomous3DRoamer() {
  if (active3DRoamer) return active3DRoamer;
  active3DRoamer = new PipAutonomous3DRoamer();
  active3DRoamer.init();
  window.activePip3DRoamer = active3DRoamer;
  return active3DRoamer;
}
