// High-Performance Stardust Cursor & Tap Trail Engine
// Features: Ethereal golden star specks (4-point rotating glimmers) and pastel iridescent bubbles
// that float, dissolve smoothly, and burst on click/tap across both mouse and touch interfaces.

export function initStardustTrail() {
  const canvas = document.getElementById('stardust-cursor-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Custom Cursor DOM elements for desktop
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  let dot = null;
  let trailRing = null;

  if (!isTouchDevice) {
    dot = document.createElement('div');
    dot.className = 'cursor-dot';
    trailRing = document.createElement('div');
    trailRing.className = 'cursor-trail';
    document.body.appendChild(dot);
    document.body.appendChild(trailRing);
  }

  let mouseX = -200;
  let mouseY = -200;
  let trailX = -200;
  let trailY = -200;
  let lastMoveTime = 0;
  let isPointerActive = false;
  let animId = null;

  // Particle System
  const particles = [];
  const MAX_PARTICLES = 85;

  const GOLDEN_STARS = ['#F4D77B', '#FFEAA7', '#FFF5C0', '#FDE082'];
  const PASTEL_BUBBLES = ['rgb(255, 179, 198)', 'rgb(205, 184, 227)', 'rgb(124, 229, 223)', 'rgb(253, 226, 210)'];

  function addParticle(x, y, isBurst = false, burstAngle = 0, burstSpeed = 1) {
    if (particles.length >= MAX_PARTICLES) {
      particles.shift();
    }

    const isStar = Math.random() > 0.45;
    const speed = isBurst ? burstSpeed : Math.random() * 1.4 + 0.4;
    const angle = isBurst ? burstAngle : Math.random() * Math.PI * 2;

    if (isStar) {
      particles.push({
        type: 'star',
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + (isBurst ? 0 : 0.2), // slight downward gravity for stardust
        r: isBurst ? Math.random() * 5 + 3.5 : Math.random() * 4 + 2.5,
        innerR: 1.2,
        rot: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.12,
        color: GOLDEN_STARS[Math.floor(Math.random() * GOLDEN_STARS.length)],
        alpha: 1,
        maxLife: isBurst ? 45 : 32,
        life: 0,
        decay: Math.random() * 0.02 + 0.024
      });
    } else {
      particles.push({
        type: 'bubble',
        x,
        y,
        vx: Math.cos(angle) * (speed * 0.7),
        vy: Math.sin(angle) * (speed * 0.7) - 0.6, // gentle upward buoyancy
        r: isBurst ? Math.random() * 7 + 4 : Math.random() * 5 + 3,
        swaySpeed: Math.random() * 0.05 + 0.02,
        swayOffset: Math.random() * Math.PI * 2,
        color: PASTEL_BUBBLES[Math.floor(Math.random() * PASTEL_BUBBLES.length)],
        alpha: 0.9,
        maxLife: isBurst ? 50 : 36,
        life: 0,
        decay: Math.random() * 0.018 + 0.02
      });
    }

    startLoopIfNeeded();
  }

  function spawnBurst(x, y, count = 10) {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 3.2 + 1.2;
      addParticle(x, y, true, angle, speed);
    }
  }

  function drawStar(p) {
    const r = p.r * (1 - p.life / p.maxLife * 0.4);
    const innerR = r * 0.32;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const radius = i % 2 === 0 ? r : innerR;
      const a = (i * Math.PI) / 4;
      const px = Math.cos(a) * radius;
      const py = Math.sin(a) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 8;
    ctx.globalAlpha = Math.max(0, p.alpha);
    ctx.fill();
    ctx.restore();
  }

  function drawBubble(p) {
    const r = p.r * (1 + (p.life / p.maxLife) * 0.18);
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.alpha);

    // Iridescent radial gradient body
    const grad = ctx.createRadialGradient(p.x - r * 0.32, p.y - r * 0.32, r * 0.1, p.x, p.y, r);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
    grad.addColorStop(0.45, p.color.replace('rgb', 'rgba').replace(')', ', 0.4)'));
    grad.addColorStop(1, p.color.replace('rgb', 'rgba').replace(')', ', 0.12)'));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fill();

    // Subtle pearlescent rim
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Specular star glint
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(p.x - r * 0.35, p.y - r * 0.35, Math.max(1, r * 0.22), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function updateAndDraw() {
    ctx.clearRect(0, 0, width, height);

    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life++;
      p.alpha -= p.decay;

      if (p.type === 'star') {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.rot += p.rotSpeed;
        drawStar(p);
      } else {
        p.x += p.vx + Math.sin(p.life * p.swaySpeed + p.swayOffset) * 0.45;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy -= 0.02; // floating upward
        drawBubble(p);
      }

      if (p.alpha <= 0 || p.life >= p.maxLife) {
        particles.splice(i, 1);
      }
    }

    // Update Desktop Cursor elements
    if (dot && trailRing) {
      trailX += (mouseX - trailX) * 0.32;
      trailY += (mouseY - trailY) * 0.32;
      dot.style.transform = `translate3d(${mouseX - 6}px, ${mouseY - 6}px, 0)`;
      trailRing.style.transform = `translate3d(${trailX - 14}px, ${trailY - 14}px, 0)`;
    }

    if (particles.length > 0 || isPointerActive) {
      animId = requestAnimationFrame(updateAndDraw);
    } else {
      animId = null;
    }
  }

  function startLoopIfNeeded() {
    if (!animId) {
      animId = requestAnimationFrame(updateAndDraw);
    }
  }

  // Pointer Move Listener (Mouse & Touch)
  function handlePointerMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isPointerActive = true;

    const now = performance.now();
    if (now - lastMoveTime > 30) {
      lastMoveTime = now;
      addParticle(mouseX, mouseY);
    }
    startLoopIfNeeded();
  }

  window.addEventListener('pointermove', handlePointerMove, { passive: true });

  // Pointer Down / Click / Tap Burst
  window.addEventListener('pointerdown', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    spawnBurst(mouseX, mouseY, 9);
  }, { passive: true });

  window.addEventListener('pointerup', () => {
    setTimeout(() => {
      isPointerActive = false;
    }, 400);
  }, { passive: true });

  // Hover detection for interactive elements
  const interactiveSelector = 'a, button, input, select, textarea, .interactive-hover, .blk, .trait-chip, .map-hotspot-zone, .landmark-chip, .storybook-tab-chip';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.add('cursor-hover');
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.remove('cursor-hover');
    }
  }, { passive: true });

  // Expose global particle trigger for actions like buttons
  window.spawnStardustBurst = spawnBurst;
}
