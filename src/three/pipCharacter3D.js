import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { nurseryAudio } from '../audio/soundEffects.js';

export function initPip3DCharacter(containerId = 'pip-3d-scene-host') {
  const container = document.getElementById(containerId);
  if (!container) return null;

  let renderer, scene, camera, controls, parts, clock;
  let mode = 'idle';
  let isMounted = true;

  // Materials dictionary
  function mat(color, roughness = 0.65, extra = {}) {
    return new THREE.MeshStandardMaterial({ color, roughness, ...extra });
  }

  const M = {
    skin: mat('#fff0d7', 0.52),
    skinShadow: mat('#e8c7a8', 0.65),
    pajama: mat('#f8d9d8', 0.8),
    pajama2: mat('#f3c6d0', 0.8),
    lavender: mat('#d9c4ed', 0.75),
    hat: mat('#ffedcf', 0.85),
    hatGold: mat('#dca64c', 0.45, { metalness: 0.15 }),
    pink: mat('#f39cb8', 0.65),
    pinkDark: mat('#d96f91', 0.65),
    eye: mat('#21120f', 0.18, { metalness: 0.05 }),
    eyeGlow: new THREE.MeshStandardMaterial({
      color: '#fff1c0',
      emissive: '#ffb72c',
      emissiveIntensity: 2.3,
      roughness: 0.25,
    }),
    gold: mat('#e9b64f', 0.35, { metalness: 0.35 }),
    glass: new THREE.MeshStandardMaterial({
      color: '#ffeeb2',
      emissive: '#ffc94c',
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.6,
      roughness: 0.2,
    }),
    white: mat('#fff8e8', 0.55),
    unicornPink: mat('#ed9bc0', 0.55),
    cloud: mat('#fff0e8', 0.95),
    blush: new THREE.MeshStandardMaterial({
      color: '#f6a2ad',
      transparent: true,
      opacity: 0.65,
      roughness: 1,
    }),
    star: mat('#e8b54f', 0.6),
    darkLine: mat('#4d3027', 0.6),
  };

  function mesh(geo, material, parent, name = '') {
    const m = new THREE.Mesh(geo, material);
    m.name = name;
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  }

  function sphere(parent, material, pos, scale, name = '') {
    const m = mesh(new THREE.SphereGeometry(1, 32, 24), material, parent, name);
    m.position.set(...pos);
    m.scale.set(...scale);
    return m;
  }

  function group(parent, pos = [0, 0, 0], name = '') {
    const g = new THREE.Group();
    g.name = name;
    g.position.set(...pos);
    parent.add(g);
    return g;
  }

  function capsule(parent, material, a, b, radius, name = '') {
    const A = new THREE.Vector3(...a);
    const B = new THREE.Vector3(...b);
    const d = B.clone().sub(A);
    const g = new THREE.CapsuleGeometry(radius, Math.max(0.001, d.length() - radius * 2), 6, 12);
    const m = mesh(g, material, parent, name);
    m.position.copy(A.add(B).multiplyScalar(0.5));
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
    return m;
  }

  function line(parent, points, material, radius = 0.018) {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
    return mesh(new THREE.TubeGeometry(curve, 24, radius, 8, false), material, parent);
  }

  function makeStar(parent, pos, scale, material = M.star) {
    const shape = new THREE.Shape();
    const outer = 1;
    const inner = 0.46;
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const a = Math.PI / 2 + (i * Math.PI) / 5;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.06,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.02,
    });
    const m = mesh(geo, material, parent, 'star');
    m.position.set(...pos);
    m.scale.setScalar(scale);
    return m;
  }

  function makeCloud(parent) {
    const cloud = group(parent, [0, -1.28, 0], 'cloudSeat');
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
    return cloud;
  }

  function makeHat(head) {
    const h = group(head, [0, 0.61, 0], 'nightcap');
    sphere(h, M.hat, [0, 0.22, -0.015], [0.88, 0.42, 0.78]);
    const droop = group(h, [-0.52, 0.18, 0.02], 'hatDroop');
    capsule(droop, M.hat, [0, 0.1, 0], [-0.37, -0.18, 0], 0.25);
    sphere(droop, M.hat, [-0.42, -0.2, 0], [0.25, 0.25, 0.25]);
    sphere(droop, M.white, [-0.42, -0.2, 0.02], [0.22, 0.22, 0.22]);

    for (const [x, y] of [
      [-0.45, 0.28],
      [-0.15, 0.42],
      [0.18, 0.42],
      [0.47, 0.28],
      [0.05, 0.18],
    ]) {
      const s = makeStar(h, [x, y, 0.7], 0.085, M.hatGold);
      s.rotation.z = x * 0.5;
    }

    const bow = group(h, [-0.49, 0.08, 0.69], 'pinkBow');
    sphere(bow, M.pink, [-0.16, 0, 0], [0.22, 0.15, 0.07]).rotation.z = 0.4;
    sphere(bow, M.pink, [0.16, 0, 0], [0.22, 0.15, 0.07]).rotation.z = -0.4;
    sphere(bow, M.pinkDark, [0, 0, 0.02], [0.075, 0.08, 0.07]);
    return h;
  }

  function makeLantern(parent) {
    const l = group(parent, [0, 0, 0], 'lantern');
    mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.36, 20, 1, true), M.glass, l);
    const top = mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.1, 20), M.gold, l);
    top.position.y = 0.22;
    const base = mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.07, 20), M.gold, l);
    base.position.y = -0.2;
    const cap = mesh(new THREE.ConeGeometry(0.18, 0.12, 20), M.gold, l);
    cap.position.y = 0.29;
    const ring = mesh(new THREE.TorusGeometry(0.13, 0.025, 8, 20), M.gold, l);
    ring.position.y = 0.42;
    ring.rotation.x = Math.PI / 2;
    makeStar(l, [0, 0.02, 0.19], 0.09, M.star);

    const light = new THREE.PointLight('#ffcb5a', 1.8, 2.5);
    light.position.set(0, 0, 0.15);
    l.add(light);
    l.userData.light = light;
    return l;
  }

  function makeMusicBox(parent) {
    const b = group(parent, [0, 0, 0], 'musicBox');
    mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.25, 32), M.lavender, b);
    const rim = mesh(new THREE.CylinderGeometry(0.245, 0.245, 0.045, 32), M.pink, b);
    rim.position.y = 0.145;
    for (let x of [-0.11, 0.11]) makeStar(b, [x, -0.01, 0.22], 0.065, M.star);
    const top = mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.045, 32), M.pink, b);
    top.position.y = 0.17;

    // Tiny toy unicorn
    sphere(b, M.white, [0, 0.35, 0], [0.13, 0.12, 0.2]);
    sphere(b, M.white, [0, 0.47, 0.11], [0.105, 0.105, 0.11]);
    capsule(b, M.white, [-0.07, 0.32, 0.02], [-0.11, 0.2, 0.02], 0.045);
    capsule(b, M.white, [0.07, 0.32, 0.02], [0.1, 0.2, 0.02], 0.045);
    capsule(b, M.white, [-0.05, 0.28, -0.08], [-0.05, 0.17, -0.08], 0.04);
    capsule(b, M.white, [0.06, 0.28, -0.08], [0.06, 0.17, -0.08], 0.04);
    capsule(b, M.unicornPink, [0.01, 0.52, 0.12], [0.07, 0.62, 0.12], 0.025);
    sphere(b, M.unicornPink, [0.08, 0.4, -0.02], [0.07, 0.045, 0.08]);
    const horn = mesh(new THREE.ConeGeometry(0.035, 0.12, 12), M.gold, b);
    horn.position.set(0, 0.59, 0.11);
    horn.rotation.z = -0.22;
    sphere(b, M.eye, [0.045, 0.47, 0.205], [0.012, 0.018, 0.008]);
    const tail = group(b, [0.12, 0.35, -0.15]);
    line(tail, [[0, 0, 0], [0.1, 0.02, 0], [0.14, 0.1, 0]], M.unicornPink, 0.025);
    return b;
  }

  function makePip(sceneTarget) {
    const root = group(sceneTarget, [0, 0, 0], 'PipRoot');
    const torso = group(root, [0, -0.35, 0], 'torso');
    sphere(torso, M.pajama, [0, 0, 0], [0.55, 0.66, 0.43], 'body');
    sphere(torso, M.pajama2, [0, 0.03, 0.414], [0.28, 0.48, 0.025], 'pajamaPanel');
    line(torso, [[-0.23, 0.42, 0.34], [0, 0.28, 0.43], [0.23, 0.42, 0.34]], M.lavender, 0.055);
    for (const y of [0.15, -0.12, -0.38]) sphere(torso, M.pink, [0.04, y, 0.447], [0.045, 0.045, 0.018]);
    for (const [x, y] of [
      [-0.34, 0.1],
      [0.29, 0.2],
      [-0.28, -0.3],
      [0.32, -0.4],
    ]) {
      makeStar(torso, [x, y, 0.405], 0.055, M.star);
    }

    const head = group(root, [0, 0.67, 0], 'head');
    sphere(head, M.skin, [0, 0, 0], [0.91, 0.84, 0.73], 'bigRoundHead');

    for (const side of [-1, 1]) {
      sphere(head, M.blush, [side * 0.57, -0.28, 0.6], [0.22, 0.14, 0.035], 'blush');
      sphere(head, M.eye, [side * 0.39, 0.02, 0.662], [0.235, 0.29, 0.12], 'bigGlossyEye');
      sphere(head, M.eyeGlow, [side * 0.39, 0.025, 0.778], [0.055, 0.06, 0.025], 'eyeSpark');
      sphere(head, M.white, [side * 0.39 + 0.065, 0.105, 0.777], [0.022, 0.025, 0.012]);
    }
    sphere(head, M.darkLine, [0, -0.18, 0.71], [0.045, 0.035, 0.025], 'tinyNose');
    line(
      head,
      [[-0.16, -0.28, 0.695], [-0.07, -0.34, 0.72], [0, -0.35, 0.73], [0.1, -0.32, 0.72], [0.16, -0.25, 0.69]],
      M.darkLine,
      0.018
    );
    makeHat(head);

    const armL = group(torso, [-0.43, 0.28, 0], 'armL');
    capsule(armL, M.pajama, [0, 0, 0], [-0.16, -0.27, 0.18], 0.17);
    sphere(armL, M.skin, [-0.16, -0.29, 0.2], [0.16, 0.15, 0.14], 'handL');

    const armR = group(torso, [0.43, 0.28, 0], 'armR');
    capsule(armR, M.pajama, [0, 0, 0], [0.16, -0.27, 0.18], 0.17);
    sphere(armR, M.skin, [0.16, -0.29, 0.2], [0.16, 0.15, 0.14], 'handR');

    const legL = group(root, [-0.28, -0.82, 0.06], 'legL');
    capsule(legL, M.pajama, [0, 0, 0], [-0.02, -0.42, 0.04], 0.22);
    sphere(legL, M.lavender, [0, -0.45, 0.13], [0.22, 0.17, 0.25], 'footL');

    const legR = group(root, [0.28, -0.82, 0.06], 'legR');
    capsule(legR, M.pajama, [0, 0, 0], [0.02, -0.42, 0.04], 0.22);
    sphere(legR, M.lavender, [0, -0.45, 0.13], [0.22, 0.17, 0.25], 'footR');

    const cloud = makeCloud(root);
    const lantern = makeLantern(torso);
    lantern.position.set(-0.48, -0.35, 0.38);
    lantern.scale.setScalar(0.8);

    const box = makeMusicBox(torso);
    box.position.set(0.5, -0.34, 0.36);
    box.scale.setScalar(0.82);

    const playStar = group(root, [0, 1.45, 0.15], 'playStar');
    const star = makeStar(playStar, [0, 0, 0], 0.22, M.star);
    star.rotation.z = 0.12;
    const glow = new THREE.PointLight('#ffd568', 0.8, 2);
    playStar.add(glow);

    sphere(head, M.skin, [-0.78, -0.18, -0.04], [0.15, 0.22, 0.2]);
    sphere(head, M.skin, [0.78, -0.18, -0.04], [0.15, 0.22, 0.2]);

    return { root, torso, head, armL, armR, legL, legR, cloud, lantern, box, playStar };
  }

  // Setup scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color('#fbf1e3');
  scene.fog = new THREE.Fog('#fbf1e3', 9, 22);

  const width = container.clientWidth || 800;
  const height = container.clientHeight || 550;

  camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
  camera.position.set(0, 1.4, 7.8);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Lighting
  scene.add(new THREE.HemisphereLight('#fff4df', '#c8a6bd', 2.0));
  const key = new THREE.DirectionalLight('#fff0d2', 3.0);
  key.position.set(-3, 6, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  scene.add(key);

  const rim = new THREE.DirectionalLight('#d9c6ff', 1.6);
  rim.position.set(4, 3, -4);
  scene.add(rim);

  const floor = mesh(new THREE.CircleGeometry(30, 80), mat('#fbf1e3', 1), scene, 'floor');
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -2.65;
  floor.receiveShadow = true;

  // Floating background stars
  for (let i = 0; i < 40; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 3 + Math.random() * 5;
    const y = -0.1 + Math.random() * 4.8;
    const s = makeStar(scene, [Math.cos(a) * r, y, Math.sin(a) * r - 1], 0.035 + Math.random() * 0.07, i % 3 === 0 ? M.pink : M.star);
    s.rotation.z = Math.random() * Math.PI;
    s.userData.floatPhase = Math.random() * Math.PI * 2;
  }

  // Construct Pip
  parts = makePip(scene);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.target.set(0, 0, 0);
  controls.minDistance = 4.2;
  controls.maxDistance = 12;
  controls.maxPolarAngle = Math.PI * 0.78;
  controls.minPolarAngle = 0.15;

  clock = new THREE.Clock();

  function onResize() {
    if (!renderer || !container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  }

  window.addEventListener('resize', onResize);

  function setMode(nextMode) {
    mode = nextMode;
    const statusEl = document.getElementById('pip-3d-status');
    const labels = {
      idle: 'Idle · Breathing softly',
      stand: 'Standing · Looking around Moonberry Hollow',
      play: 'Playing · Catching a fallen star',
      run: 'Running · Happy little steps',
      wave: 'Waving · Hello dreamer!',
      dance: 'Dancing · Twinkle toes jig',
    };
    if (statusEl) {
      statusEl.textContent = labels[mode] || 'Idle';
    }

    // Audio cue
    if (mode === 'wave') nurseryAudio.playPipGiggle();
    else if (mode === 'dance') nurseryAudio.playWishSparkle();
    else if (mode === 'play') nurseryAudio.playChime('C6');
    else if (mode === 'stand') nurseryAudio.playChime('G5');
    else nurseryAudio.playChime('E5');

    // Update active button state
    document.querySelectorAll('[data-pip3d-mode]').forEach((b) => {
      b.classList.toggle('active', b.dataset.pip3dMode === mode);
    });
  }

  // Animation Loop
  function animate() {
    if (!isMounted) return;
    requestAnimationFrame(animate);
    if (document.hidden) return;

    const t = clock.getElapsedTime();
    const p = parts;
    if (!p) return;

    const { root, torso, head, armL, armR, legL, legR, cloud, lantern, box, playStar } = p;

    root.position.x = 0;
    root.position.y = 0;
    root.rotation.y = 0;
    torso.rotation.set(0, 0, 0);
    head.rotation.set(0, 0, 0);
    armL.rotation.set(0, 0, 0);
    armR.rotation.set(0, 0, 0);
    legL.rotation.set(0, 0, 0);
    legR.rotation.set(0, 0, 0);
    lantern.rotation.set(0, 0, 0);
    box.rotation.set(0, 0, 0);

    cloud.visible = mode !== 'stand' && mode !== 'run';
    playStar.visible = mode === 'play' || mode === 'dance';

    // Idle breathing & floating
    root.position.y += Math.sin(t * 2.2) * 0.025;
    head.rotation.z = Math.sin(t * 1.1) * 0.018;
    lantern.rotation.z = Math.sin(t * 1.7) * 0.035;
    box.rotation.z = -Math.sin(t * 1.6) * 0.025;

    switch (mode) {
      case 'stand':
        root.position.y = -0.08;
        legL.rotation.x = -0.45;
        legR.rotation.x = -0.45;
        legL.rotation.z = -0.12;
        legR.rotation.z = 0.12;
        torso.position.y = -0.12;
        armL.rotation.z = -0.55;
        armR.rotation.z = 0.55;
        head.rotation.x = -0.03 + Math.sin(t * 1.2) * 0.035;
        break;

      case 'play':
        armL.rotation.z = -0.2 + Math.sin(t * 3) * 0.13;
        armR.rotation.z = 0.25 + Math.sin(t * 2.7 + 1) * 0.12;
        playStar.position.set(0.8 + Math.sin(t * 1.5) * 0.45, 1.3 + Math.sin(t * 2.3) * 0.25, 0.3);
        playStar.rotation.z = t * 1.3;
        head.rotation.z = Math.sin(t * 1.6) * 0.055;
        box.rotation.z = Math.sin(t * 3) * 0.06;
        break;

      case 'run':
        cloud.visible = false;
        root.position.y = -0.14 + Math.abs(Math.sin(t * 8)) * 0.16;
        root.position.x = Math.sin(t * 1.8) * 0.14;
        root.rotation.y = Math.sin(t * 8) * 0.1;
        torso.rotation.z = Math.sin(t * 8) * 0.05;
        legL.rotation.x = Math.sin(t * 8) * 0.8;
        legR.rotation.x = Math.sin(t * 8 + Math.PI) * 0.8;
        armL.rotation.z = Math.sin(t * 8 + Math.PI) * 0.75 - 0.2;
        armR.rotation.z = Math.sin(t * 8) * 0.75 + 0.2;
        head.rotation.x = -0.04 + Math.abs(Math.sin(t * 8)) * 0.035;
        lantern.rotation.z = Math.sin(t * 8) * 0.12;
        box.rotation.z = -Math.sin(t * 8) * 0.12;
        break;

      case 'wave':
        armR.rotation.z = -2.25 + Math.sin(t * 6) * 0.23;
        armR.rotation.x = -0.35;
        armL.rotation.z = 0.15;
        head.rotation.z = 0.09 + Math.sin(t * 2) * 0.025;
        break;

      case 'dance':
        root.rotation.y = Math.sin(t * 2.8) * 0.25;
        root.position.y = Math.abs(Math.sin(t * 5)) * 0.13;
        torso.rotation.z = Math.sin(t * 5) * 0.16;
        head.rotation.z = Math.sin(t * 5) * 0.15;
        armL.rotation.z = -0.8 + Math.sin(t * 5) * 0.5;
        armR.rotation.z = 0.8 - Math.sin(t * 5) * 0.5;
        legL.rotation.x = Math.max(0, Math.sin(t * 5)) * 0.55;
        legR.rotation.x = Math.max(0, Math.sin(t * 5 + Math.PI)) * 0.55;
        playStar.position.set(Math.sin(t * 3) * 0.9, 1.5 + Math.cos(t * 4) * 0.2, 0.2);
        playStar.rotation.z = t * 2;
        lantern.rotation.z = Math.sin(t * 5) * 0.13;
        box.rotation.z = -Math.sin(t * 5) * 0.13;
        break;
    }

    // Gentle star float
    scene.traverse((o) => {
      if (o.userData.floatPhase !== undefined) {
        o.userData.baseY ??= o.position.y;
        o.position.y = o.userData.baseY + Math.sin(t * 1.3 + o.userData.floatPhase) * 0.035;
      }
    });

    controls.update();
    renderer.render(scene, camera);
  }

  // Hook UI buttons
  document.querySelectorAll('[data-pip3d-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setMode(btn.dataset.pip3dMode);
    });
  });

  const resetBtn = document.getElementById('pip3d-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      controls.reset();
      setMode('idle');
    });
  }

  animate();

  return {
    setMode,
    resetCamera: () => controls && controls.reset(),
    destroy: () => {
      isMounted = false;
      window.removeEventListener('resize', onResize);
      if (renderer) renderer.dispose();
    },
  };
}
