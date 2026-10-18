// Atmospheric Visuals & Particle FX Engine
// Features: Shooting Stars (Meteors with incandescent stardust trails),
// Undulating Aurora Borealis ribbons, and Cosmic Dust Particles.

import { nurseryAudio } from '../audio/soundEffects.js';

class AtmosphericEngine {
  constructor() {
    this.container = document.getElementById('atmospheric-sky-container');
    this.canvas = document.getElementById('shooting-stars-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.skyPhase = 'dawn'; // 'dawn', 'twilight', 'midnight'
    this.meteors = [];
    this.sparks = [];
    this.cosmicDust = [];
    this.auroraTime = 0;
    this.nextMeteorTimer = null;
    this.animId = null;

    this.initCanvas();
    this.initCosmicDust();
    this.scheduleNextMeteor();
    this.animate();

    window.addEventListener('resize', () => this.resize(), { passive: true });
  }

  initCanvas() {
    this.resize();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(this.dpr, this.dpr);
  }

  initCosmicDust() {
    const dustCount = 35;
    this.cosmicDust = [];
    for (let i = 0; i < dustCount; i++) {
      this.cosmicDust.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height * 0.75,
        r: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.015,
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.1 - 0.05,
        color: Math.random() > 0.4 ? '#F4D77B' : '#CDB8E3'
      });
    }
  }

  setSkyPhase(phase) {
    this.skyPhase = phase;
    const auroraEl = document.getElementById('aurora-borealis');
    if (auroraEl) {
      if (phase === 'dawn') {
        auroraEl.style.opacity = '0.2';
      } else if (phase === 'twilight') {
        auroraEl.style.opacity = '0.55';
      } else if (phase === 'midnight') {
        auroraEl.style.opacity = '0.92';
      }
    }
  }

  scheduleNextMeteor() {
    clearTimeout(this.nextMeteorTimer);
    // Interval between 7s and 12s in Midnight, 10s-16s in Twilight, 14s-22s in Dawn
    const delay = this.skyPhase === 'midnight'
      ? Math.random() * 5000 + 7000
      : this.skyPhase === 'twilight'
      ? Math.random() * 6000 + 10000
      : Math.random() * 8000 + 14000;

    this.nextMeteorTimer = setTimeout(() => {
      this.spawnMeteor();
      this.scheduleNextMeteor();
    }, delay);
  }

  spawnMeteor(customStartX = null, customStartY = null) {
    const startX = customStartX !== null ? customStartX : Math.random() * this.width * 0.8 + this.width * 0.1;
    const startY = customStartY !== null ? customStartY : Math.random() * (this.height * 0.35);

    const angle = (Math.PI / 180) * (Math.random() * 14 + 32); // 32 to 46 degrees descent
    const speed = Math.random() * 9 + 14;
    const length = Math.random() * 100 + 160;

    const meteor = {
      x: startX,
      y: startY,
      startX,
      startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      length,
      progress: 0,
      totalDistance: Math.random() * 450 + 400,
      alpha: 1,
      headRadius: Math.random() * 1.5 + 2.2,
      colorHead: '#FFFFFF',
      colorTail: Math.random() > 0.4 ? '#F4D77B' : '#CDB8E3'
    };

    this.meteors.push(meteor);

    // Subtle ethereal sound chime
    if (this.skyPhase !== 'dawn') {
      try {
        nurseryAudio.playChime('C6');
      } catch (e) {}
    }
  }

  addSpark(x, y, color) {
    this.sparks.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2 - 0.2,
      r: Math.random() * 1.8 + 0.8,
      alpha: 0.85,
      decay: Math.random() * 0.03 + 0.025,
      color
    });
  }

  drawAurora() {
    // Render dynamic aurora ribbons on canvas for seamless GPU acceleration
    const ctx = this.ctx;
    this.auroraTime += 0.008;

    const opacity = this.skyPhase === 'midnight' ? 0.85 : this.skyPhase === 'twilight' ? 0.45 : 0.2;
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.globalCompositeOperation = 'screen';

    const bands = [
      { color1: 'rgba(78, 237, 178, 0.24)', color2: 'rgba(30, 200, 160, 0)', yBase: 70, amp: 38, freq: 0.003, speed: 0.9 },
      { color1: 'rgba(85, 227, 245, 0.22)', color2: 'rgba(60, 160, 240, 0)', yBase: 95, amp: 45, freq: 0.0025, speed: 0.65 },
      { color1: 'rgba(195, 166, 227, 0.20)', color2: 'rgba(140, 80, 200, 0)', yBase: 120, amp: 52, freq: 0.002, speed: 0.45 }
    ];

    bands.forEach((band) => {
      ctx.beginPath();
      ctx.moveTo(0, 0);

      for (let x = 0; x <= this.width; x += 30) {
        const wave1 = Math.sin(x * band.freq + this.auroraTime * band.speed) * band.amp;
        const wave2 = Math.cos(x * band.freq * 1.8 - this.auroraTime * band.speed * 0.8) * (band.amp * 0.4);
        const y = band.yBase + wave1 + wave2;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(this.width, 0);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, 0, 0, band.yBase + band.amp * 1.8);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      grad.addColorStop(0.35, band.color1);
      grad.addColorStop(1, band.color2);

      ctx.fillStyle = grad;
      ctx.fill();
    });

    ctx.restore();
  }

  drawCosmicDust() {
    const ctx = this.ctx;
    const opacityMultiplier = this.skyPhase === 'midnight' ? 1 : this.skyPhase === 'twilight' ? 0.7 : 0.45;

    ctx.save();
    this.cosmicDust.forEach((dust) => {
      dust.x += dust.vx;
      dust.y += dust.vy;

      if (dust.x < 0) dust.x = this.width;
      if (dust.x > this.width) dust.x = 0;
      if (dust.y < 0) dust.y = this.height * 0.75;
      if (dust.y > this.height * 0.75) dust.y = 0;

      dust.twinklePhase += dust.twinkleSpeed;
      const currentAlpha = (dust.alpha + Math.sin(dust.twinklePhase) * 0.3) * opacityMultiplier;

      ctx.beginPath();
      ctx.arc(dust.x, dust.y, dust.r, 0, Math.PI * 2);
      ctx.fillStyle = dust.color;
      ctx.shadowColor = dust.color;
      ctx.shadowBlur = 4;
      ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));
      ctx.fill();
    });
    ctx.restore();
  }

  drawMeteors() {
    const ctx = this.ctx;

    // Update and draw shooting stars
    for (let i = this.meteors.length - 1; i >= 0; i--) {
      const m = this.meteors[i];

      m.x += m.vx;
      m.y += m.vy;
      m.progress += Math.hypot(m.vx, m.vy);

      // Tail trailing coordinates
      const tailAngle = Math.atan2(m.vy, m.vx);
      const tailLength = Math.min(m.length, m.progress);
      const tailX = m.x - Math.cos(tailAngle) * tailLength;
      const tailY = m.y - Math.sin(tailAngle) * tailLength;

      // Shed sparks along the trail
      if (Math.random() > 0.3) {
        const sparkOffset = Math.random() * tailLength * 0.7;
        const sx = m.x - Math.cos(tailAngle) * sparkOffset + (Math.random() - 0.5) * 4;
        const sy = m.y - Math.sin(tailAngle) * sparkOffset + (Math.random() - 0.5) * 4;
        this.addSpark(sx, sy, m.colorTail);
      }

      // Draw incandescent starlight tail
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(m.x, m.y);

      const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.5, m.colorTail);
      grad.addColorStop(1, '#FFFFFF');

      ctx.strokeStyle = grad;
      ctx.lineWidth = m.headRadius * 1.6;
      ctx.lineCap = 'round';
      ctx.shadowColor = m.colorTail;
      ctx.shadowBlur = 12;
      ctx.globalAlpha = m.alpha;
      ctx.stroke();

      // Draw brilliant head flare
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.headRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#FFFFFF';
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.restore();

      // Fade out near end of distance
      if (m.progress > m.totalDistance * 0.7) {
        m.alpha -= 0.05;
      }

      if (m.alpha <= 0 || m.x > this.width + 100 || m.y > this.height + 100) {
        this.meteors.splice(i, 1);
      }
    }

    // Update and draw lingering sparks
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const s = this.sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.alpha -= s.decay;

      ctx.save();
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 6;
      ctx.globalAlpha = Math.max(0, s.alpha);
      ctx.fill();
      ctx.restore();

      if (s.alpha <= 0) {
        this.sparks.splice(i, 1);
      }
    }
  }

  animate() {
    this.animId = requestAnimationFrame(() => this.animate());

    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawAurora();
    this.drawCosmicDust();
    this.drawMeteors();
  }
}

let atmosphericInstance = null;

export function initAtmosphericEngine() {
  if (!atmosphericInstance) {
    atmosphericInstance = new AtmosphericEngine();
    window.atmosphericEngine = atmosphericInstance;
  }
  return atmosphericInstance;
}

export function triggerShootingStar(x = null, y = null) {
  if (atmosphericInstance) {
    atmosphericInstance.spawnMeteor(x, y);
  }
}
