// Ultra-Optimized Lightweight Living Dreamworld Engine
// Zero-lag 60/120 FPS continuous animations:
// train steam, chimney smoke, water ripples, floating Zzz bubbles, and twinkling stars.
// Completely free of expensive shadowBlur, layout reflows, and 3D matrix transforms.

export class LivingArtEngine {
  constructor() {
    this.instances = new Map();
  }

  init(containerEl, worldId) {
    if (!containerEl) return;
    this.destroy(worldId);

    const canvas = containerEl.querySelector('.world-particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = containerEl.clientWidth);
    let height = (canvas.height = containerEl.clientHeight);

    const resizeObserver = new ResizeObserver(() => {
      width = canvas.width = containerEl.clientWidth;
      height = canvas.height = containerEl.clientHeight;
    });
    resizeObserver.observe(containerEl);

    // Particle state
    const steamPuffs = [];
    const chimneyPuffs = [];
    const zzzBubbles = [];
    const waterRipples = [];
    const shootingStars = [];

    // Background sky stars (fixed count, cached colors)
    const starCount = 30;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.65,
      radius: 0.8 + Math.random() * 1.8,
      baseAlpha: 0.25 + Math.random() * 0.6,
      speed: 0.02 + Math.random() * 0.025,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.4 ? '#FFF5BE' : '#FFDDF0',
    }));

    // Floating fireflies (small count for maximum speed)
    const fireflyCount = 10;
    const fireflies = Array.from({ length: fireflyCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 1.5 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.2 - Math.random() * 0.3,
      pulseSpeed: 0.025 + Math.random() * 0.02,
      phase: Math.random() * Math.PI * 2,
    }));

    let frameCount = 0;
    let nextShootingStar = 160 + Math.random() * 200;
    let animId = null;
    let isRunning = true;

    // Fast 60/120 FPS Loop without layout thrashing
    const render = () => {
      if (!isRunning) return;

      const panel = containerEl.closest('.world-content-panel');
      if (panel && !panel.classList.contains('hidden')) {
        ctx.clearRect(0, 0, width, height);
        frameCount++;

        // 1. Sky stars (fast pure draw, zero shadowBlur)
        for (let i = 0; i < starCount; i++) {
          const s = stars[i];
          const alpha = s.baseAlpha + Math.sin(frameCount * s.speed + s.phase) * 0.35;
          ctx.globalAlpha = alpha > 0.1 ? (alpha < 1 ? alpha : 1) : 0.1;
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // 2. Continuous Steam from The Drowsy Express (Somnia)
        if (worldId === 'somnia') {
          if (frameCount % 20 === 0 && steamPuffs.length < 7) {
            steamPuffs.push({
              x: width * 0.67,
              y: height * 0.49,
              vx: -0.7 - Math.random() * 0.3,
              vy: -0.5 - Math.random() * 0.25,
              radius: 4,
              growth: 0.25,
              maxRadius: 24,
              alpha: 0.65,
              decay: 0.012,
            });
          }
        }

        // Draw steam puffs
        for (let i = steamPuffs.length - 1; i >= 0; i--) {
          const p = steamPuffs[i];
          p.x += p.vx;
          p.y += p.vy;
          p.radius += p.growth;
          p.alpha -= p.decay;

          if (p.alpha <= 0 || p.radius >= p.maxRadius) {
            steamPuffs.splice(i, 1);
            continue;
          }

          ctx.fillStyle = '#FFF7FB';
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // 3. Continuous Chimney Smoke (Neighborhood & Town)
        if (worldId === 'neighborhood' || worldId === 'town') {
          const chimneyX = worldId === 'neighborhood' ? width * 0.16 : width * 0.28;
          const chimneyY = worldId === 'neighborhood' ? height * 0.33 : height * 0.29;

          if (frameCount % 30 === 0 && chimneyPuffs.length < 5) {
            chimneyPuffs.push({
              x: chimneyX,
              y: chimneyY,
              vx: (Math.random() - 0.5) * 0.2 - 0.15,
              vy: -0.4 - Math.random() * 0.2,
              radius: 3.5,
              growth: 0.18,
              alpha: 0.55,
              decay: 0.01,
            });
          }
        }

        // Draw chimney smoke
        for (let i = chimneyPuffs.length - 1; i >= 0; i--) {
          const cp = chimneyPuffs[i];
          cp.x += cp.vx;
          cp.y += cp.vy;
          cp.radius += cp.growth;
          cp.alpha -= cp.decay;

          if (cp.alpha <= 0 || cp.radius >= 20) {
            chimneyPuffs.splice(i, 1);
            continue;
          }

          ctx.fillStyle = '#FFF8FC';
          ctx.globalAlpha = cp.alpha;
          ctx.beginPath();
          ctx.arc(cp.x, cp.y, cp.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // 4. Floating Zzz Slumber Bubbles
        if (worldId === 'neighborhood' || worldId === 'somnia') {
          const sleepX = worldId === 'neighborhood' ? width * 0.48 : width * 0.81;
          const sleepY = worldId === 'neighborhood' ? height * 0.69 : height * 0.78;

          if (frameCount % 55 === 0 && zzzBubbles.length < 4) {
            zzzBubbles.push({
              x: sleepX + (Math.random() - 0.5) * 6,
              y: sleepY,
              vx: (Math.random() - 0.5) * 0.25,
              vy: -0.45,
              text: ['z', 'Z', '💤'][Math.floor(Math.random() * 3)],
              size: 11,
              alpha: 0.8,
              decay: 0.011,
            });
          }
        }

        // Draw Zzz bubbles
        for (let i = zzzBubbles.length - 1; i >= 0; i--) {
          const zb = zzzBubbles[i];
          zb.x += zb.vx;
          zb.y += zb.vy;
          zb.alpha -= zb.decay;

          if (zb.alpha <= 0) {
            zzzBubbles.splice(i, 1);
            continue;
          }

          ctx.fillStyle = '#FCE183';
          ctx.globalAlpha = zb.alpha;
          ctx.font = `bold ${zb.size}px sans-serif`;
          ctx.fillText(zb.text, zb.x, zb.y);
        }

        // 5. Water Ripples on Wishpond & Fountains
        const pondX = worldId === 'somnia' ? width * 0.34 : (worldId === 'town' ? width * 0.52 : width * 0.30);
        const pondY = worldId === 'somnia' ? height * 0.63 : (worldId === 'town' ? height * 0.36 : height * 0.77);

        if (frameCount % 45 === 0 && waterRipples.length < 4) {
          waterRipples.push({
            x: pondX + (Math.random() - 0.5) * 16,
            y: pondY + (Math.random() - 0.5) * 8,
            radius: 2,
            maxRadius: 26,
            alpha: 0.65,
            speed: 0.4,
          });
        }

        // Draw water ripples
        for (let i = waterRipples.length - 1; i >= 0; i--) {
          const wr = waterRipples[i];
          wr.radius += wr.speed;
          wr.alpha = 0.65 * (1 - wr.radius / wr.maxRadius);

          if (wr.radius >= wr.maxRadius || wr.alpha <= 0) {
            waterRipples.splice(i, 1);
            continue;
          }

          ctx.strokeStyle = '#FCE183';
          ctx.lineWidth = 1;
          ctx.globalAlpha = wr.alpha;
          ctx.beginPath();
          ctx.ellipse(wr.x, wr.y, wr.radius, wr.radius * 0.45, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

        // 6. Occasional Shooting Star
        if (frameCount >= nextShootingStar && shootingStars.length < 2) {
          shootingStars.push({
            x: Math.random() * width * 0.7 + width * 0.1,
            y: Math.random() * height * 0.25 + 10,
            length: 50,
            speed: 8,
            angle: Math.PI / 4,
            alpha: 0.85,
            decay: 0.024,
          });
          nextShootingStar = frameCount + 220 + Math.random() * 260;
        }

        // Draw shooting stars
        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const ss = shootingStars[i];
          ss.x += Math.cos(ss.angle) * ss.speed;
          ss.y += Math.sin(ss.angle) * ss.speed;
          ss.alpha -= ss.decay;

          if (ss.alpha <= 0 || ss.x > width + 50 || ss.y > height) {
            shootingStars.splice(i, 1);
            continue;
          }

          const tailX = ss.x - Math.cos(ss.angle) * ss.length;
          const tailY = ss.y - Math.sin(ss.angle) * ss.length;

          const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
          grad.addColorStop(0, 'rgba(255, 244, 184, 0)');
          grad.addColorStop(1, `rgba(255, 255, 255, ${ss.alpha})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(ss.x, ss.y);
          ctx.stroke();
        }

        // 7. Drifting fireflies
        for (let i = 0; i < fireflyCount; i++) {
          const f = fireflies[i];
          f.x += f.vx;
          f.y += f.vy;

          if (f.y < -10) f.y = height + 10;
          if (f.x < -10) f.x = width + 10;
          if (f.x > width + 10) f.x = -10;

          const glow = 0.35 + Math.sin(frameCount * f.pulseSpeed + f.phase) * 0.35;
          ctx.fillStyle = '#FFE699';
          ctx.globalAlpha = glow > 0 ? (glow < 1 ? glow : 1) : 0;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    this.instances.set(worldId, {
      destroy: () => {
        isRunning = false;
        if (animId) cancelAnimationFrame(animId);
        resizeObserver.disconnect();
      },
    });
  }

  destroy(worldId) {
    if (this.instances.has(worldId)) {
      this.instances.get(worldId).destroy();
      this.instances.delete(worldId);
    }
  }

  destroyAll() {
    this.instances.forEach((inst) => inst.destroy());
    this.instances.clear();
  }
}

export const livingArtEngine = new LivingArtEngine();
