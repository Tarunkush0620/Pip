import { nurseryAudio } from '../audio/soundEffects.js';

export class PipRoamerEngine {
  constructor() {
    this.container = null;
    this.characterEl = null;
    this.speechEl = null;
    this.auraEl = null;
    this.hudEl = null;

    // Position & Physics
    this.x = 80;
    this.y = 160;
    this.targetX = this.x;
    this.targetY = this.y;
    this.vx = 0;
    this.vy = 0;
    this.speed = 2.4;
    this.facingRight = false;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.hasMovedDrag = false;

    // States
    this.mode = 'roam'; // 'roam' | 'run' | 'dance' | 'sleep' | 'follow'
    this.nextTargetTimer = null;
    this.particleTimer = null;
    this.speechTimer = null;
    this.danceLoopTimer = null;
    this.animFrameId = null;
    this.soundEnabled = true;

    // Follow cursor tracking
    this.mouseX = this.x;
    this.mouseY = this.y;
    this.hasMouse = false;

    // Quotes by mode
    this.quotes = {
      roam: [
        'Floating on my dream cloud! ☁️✨',
        'Exploring Moonberry Hollow... 🌙',
        'Checking on all the bedtime dreamers 🧸',
        'Collecting fallen stardust! ⭐',
        'Have you made a wish at the Wishpond today? 💫',
        'My nightcap is full of sweet thoughts ✦'
      ],
      run: [
        'Zooming across the stars! 🚀',
        'Fast dream delivery in progress! ⚡',
        'Wheeeee! Through the clouds! 💨',
        'Hold on to your nightcap! 🌟',
        'Express dispatch to Somnia! 🌙'
      ],
      dance: [
        'Look at my twinkle toes! ♫✨',
        'Winding the unicorn music box! 🎠♬',
        'Dance with me under the moonlight! 💖',
        'Lullaby beats make me bounce! ♩',
        'Pip’s celestial dream hop! 🌟'
      ],
      sleep: [
        'Zzz... snug as a cloud bug 💤',
        'Tucking in for cozy dreams... 🧸',
        'Shhh, the moon is glowing softly 🌙',
        'Dreaming of marshmallow valleys... ✨',
        'Bedtime lullabies in my heart 💖'
      ],
      follow: [
        'Following you everywhere, friend! 🐾',
        'Where are we heading next? 🌟',
        'I’ve got my lantern to light the way! 🏮',
        'Right beside you! ✨'
      ]
    };
  }

  init() {
    if (document.getElementById('pip-roamer-container')) return;

    this.createDOM();
    this.bindEvents();
    this.setMode('roam');
    this.startLoop();
    this.scheduleNextRoamTarget();
    this.startParticleLoop();

    // Initial greeting quote
    setTimeout(() => {
      this.speak('Hi friend! I’m Pip! Watch me roam, dance, run, and sleep across your website! ✦', 4500);
      if (this.soundEnabled) nurseryAudio.playPipGiggle();
    }, 1200);
  }

  createDOM() {
    // 1. Root floating companion container
    this.container = document.createElement('div');
    this.container.id = 'pip-roamer-container';
    this.container.className = 'pip-roamer-root pointer-events-none select-none';
    this.container.style.position = 'fixed';
    this.container.style.top = '0px';
    this.container.style.left = '0px';
    this.container.style.zIndex = '99999';
    this.container.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;

    this.container.innerHTML = `
      <!-- Dynamic Lantern Light Aura -->
      <div id="pip-lantern-aura" class="pip-lantern-aura" aria-hidden="true"></div>

      <!-- Cloud Drop Shadow -->
      <div class="pip-cloud-shadow" aria-hidden="true"></div>

      <!-- Speech / Reaction Bubble -->
      <div id="pip-speech-bubble" class="pip-speech-bubble" role="status" aria-live="polite">
        <span class="pip-speech-text">✦ Sweet dreams!</span>
        <div class="pip-speech-arrow"></div>
      </div>

      <!-- Interactive Character Shell -->
      <div id="pip-character-body" class="pip-character-body pointer-events-auto cursor-grab active:cursor-grabbing" title="Pip! Drag me anywhere or click to interact ✨">
        <!-- Exact Character High-Res Transparent Render -->
        <img 
          src="/assets/images/pip_roaming_character.png" 
          alt="Pip the dream engineer" 
          class="pip-character-img"
          draggable="false"
        />

        <!-- Interactive Glow Halo on Lantern -->
        <div class="pip-lantern-core-glow" aria-hidden="true"></div>
      </div>
    `;

    document.body.appendChild(this.container);

    this.characterEl = this.container.querySelector('#pip-character-body');
    this.speechEl = this.container.querySelector('#pip-speech-bubble');
    this.auraEl = this.container.querySelector('#pip-lantern-aura');

    // 2. Floating Companion Remote HUD
    this.createHUD();
  }

  createHUD() {
    this.hudEl = document.createElement('aside');
    this.hudEl.id = 'pip-companion-hud';
    this.hudEl.className = 'fixed bottom-5 right-5 z-40 select-none';
    this.hudEl.setAttribute('aria-label', 'Pip Companion Controls');

    this.hudEl.innerHTML = `
      <div class="pip-hud-card glass-panel p-2.5 rounded-2xl border border-white/80 shadow-2xl shadow-berry/15 flex flex-col gap-2 bg-white/90 dark:bg-[#1E0D27]/90 backdrop-blur-xl transition-all duration-300">
        
        <!-- Header status & minimize -->
        <div class="flex items-center justify-between gap-3 px-1">
          <div class="flex items-center gap-1.5 text-xs font-bold text-berry">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span class="font-display tracking-tight text-plum dark:text-moon font-extrabold text-sm">Pip Companion</span>
          </div>

          <div class="flex items-center gap-1">
            <button id="pip-hud-whistle-btn" class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-moon/50 hover:bg-moon text-ink dark:text-plum transition-all" title="Call Pip to your screen center">
              Call Pip 📢
            </button>
            <button id="pip-hud-minimize-btn" class="w-6 h-6 rounded-full bg-berry/10 hover:bg-berry text-berry hover:text-white flex items-center justify-center text-xs font-bold transition-all" title="Toggle HUD size">
              −
            </button>
          </div>
        </div>

        <!-- Mode Buttons Bar -->
        <div id="pip-hud-modes" class="flex items-center gap-1.5 flex-wrap">
          <button class="pip-hud-btn active" data-roam-mode="roam" title="Pip wanders freely around the screen">
            <span>🐾</span> <span>Roam</span>
          </button>
          <button class="pip-hud-btn" data-roam-mode="run" title="Pip zooms fast across the screen!">
            <span>⚡</span> <span>Run</span>
          </button>
          <button class="pip-hud-btn" data-roam-mode="dance" title="Pip dances and hops to bedtime rhythms!">
            <span>♫</span> <span>Dance</span>
          </button>
          <button class="pip-hud-btn" data-roam-mode="sleep" title="Pip curls up for a cozy slumber with Zzz!">
            <span>💤</span> <span>Sleep</span>
          </button>
          <button class="pip-hud-btn" data-roam-mode="follow" title="Pip follows your cursor wherever you go!">
            <span>🪄</span> <span>Follow</span>
          </button>
        </div>

        <!-- Section Jump Shortcuts -->
        <div class="pt-1.5 border-t border-berry/10 dark:border-white/10 flex items-center justify-between text-[11px] text-ink/70 dark:text-cream/70 px-1">
          <span class="font-bold text-berry">Explore:</span>
          <div class="flex items-center gap-1">
            <button class="pip-jump-chip hover:text-berry" data-jump="#about">Story</button>
            <span>·</span>
            <button class="pip-jump-chip hover:text-berry" data-jump="#world">World</button>
            <span>·</span>
            <button class="pip-jump-chip hover:text-berry" data-jump="#work">Inventions</button>
            <span>·</span>
            <button class="pip-jump-chip hover:text-berry" data-jump="#dream-weaver">Dream Lab</button>
          </div>
        </div>

      </div>
    `;

    document.body.appendChild(this.hudEl);

    // Bind HUD events
    this.hudEl.querySelectorAll('[data-roam-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextMode = btn.dataset.roamMode;
        this.setMode(nextMode);
      });
    });

    const whistleBtn = document.getElementById('pip-hud-whistle-btn');
    if (whistleBtn) {
      whistleBtn.addEventListener('click', () => {
        this.callPipToCenter();
      });
    }

    const minimizeBtn = document.getElementById('pip-hud-minimize-btn');
    if (minimizeBtn) {
      let isMin = false;
      minimizeBtn.addEventListener('click', () => {
        isMin = !isMin;
        const modes = document.getElementById('pip-hud-modes');
        const jump = this.hudEl.querySelector('.border-t');
        if (modes) modes.style.display = isMin ? 'none' : 'flex';
        if (jump) jump.style.display = isMin ? 'none' : 'flex';
        minimizeBtn.textContent = isMin ? '+' : '−';
      });
    }

    this.hudEl.querySelectorAll('.pip-jump-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const targetId = chip.dataset.jump;
        const el = document.querySelector(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const rect = el.getBoundingClientRect();
          this.targetX = Math.max(40, Math.min(window.innerWidth - 220, rect.left + rect.width / 2 - 80));
          this.targetY = Math.max(100, Math.min(window.innerHeight - 240, rect.top + 80));
          this.speak(`Visiting ${chip.textContent}! 🌟`, 2500);
          if (this.soundEnabled) nurseryAudio.playChime('C6');
        }
      });
    });
  }

  bindEvents() {
    // Mouse tracking for follow mode
    window.addEventListener('pointermove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.hasMouse = true;
    }, { passive: true });

    // Drag Pip anywhere on screen
    this.characterEl.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.isDragging = true;
      this.hasMovedDrag = false;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;
      this.dragOffsetX = e.clientX - this.x;
      this.dragOffsetY = e.clientY - this.y;
      this.characterEl.setPointerCapture(e.pointerId);
      this.characterEl.classList.add('is-dragged');
    });

    window.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return;
      const dx = Math.abs(e.clientX - this.dragStartX);
      const dy = Math.abs(e.clientY - this.dragStartY);
      if (dx > 4 || dy > 4) {
        this.hasMovedDrag = true;
      }
      this.x = e.clientX - this.dragOffsetX;
      this.y = e.clientY - this.dragOffsetY;
      this.targetX = this.x;
      this.targetY = this.y;
      this.facingRight = (e.clientX - this.dragStartX) > 0;
    });

    const endDrag = (e) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.characterEl.classList.remove('is-dragged');
      
      // If tapped without dragging -> click reaction!
      if (!this.hasMovedDrag) {
        this.handlePipTap();
      } else {
        this.speak('Wheee! Cozy new perch! ☁️✨', 2200);
        if (this.soundEnabled) nurseryAudio.playWishSparkle();
      }
    };

    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);

    // Keep Pip inside screen on window resize
    window.addEventListener('resize', () => {
      this.clampToBounds();
    }, { passive: true });
  }

  handlePipTap() {
    const randomQuotes = [
      'Giggle! That tickles! 🧸💖',
      'Off to craft sweet dreams! ✦',
      'The unicorn music box is wound up! 🎠',
      'May all your bedtime wishes come true! ⭐',
      'Pip says: You are magical! 🌟'
    ];
    const quote = randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
    this.speak(quote, 2800);

    if (this.soundEnabled) {
      nurseryAudio.playPipGiggle();
      setTimeout(() => nurseryAudio.playWishSparkle(), 300);
    }

    // Happy bounce animation trigger
    this.characterEl.classList.add('pip-bounce-pop');
    setTimeout(() => this.characterEl.classList.remove('pip-bounce-pop'), 600);

    // Burst heart/star sparkles from Pip
    this.burstSparkles(this.x + 90, this.y + 110, 8);
  }

  setMode(newMode) {
    this.mode = newMode;

    // Update HUD buttons
    if (this.hudEl) {
      this.hudEl.querySelectorAll('[data-roam-mode]').forEach((b) => {
        b.classList.toggle('active', b.dataset.roamMode === this.mode);
      });
    }

    // Reset container classes
    this.container.classList.remove('mode-roam', 'mode-run', 'mode-dance', 'mode-sleep', 'mode-follow');
    this.container.classList.add(`mode-${this.mode}`);

    // Mode-specific configuration
    if (this.mode === 'run') {
      this.speed = 6.8;
      this.speak('Hold on! Turbo dream sprint! ⚡', 2400);
      if (this.soundEnabled) nurseryAudio.playChime('C6');
      this.pickSprintTarget();
    } else if (this.mode === 'dance') {
      this.speed = 1.8;
      this.speak('Twinkle toes! Let’s dance! ♫✨', 3000);
      if (this.soundEnabled) {
        nurseryAudio.playWishSparkle();
        nurseryAudio.playMusicBox();
      }
    } else if (this.mode === 'sleep') {
      this.speed = 0.5;
      this.speak('Zzz... Sleepy time in Moonberry Hollow... 💤', 3500);
      if (this.soundEnabled) nurseryAudio.playChime('E4');
    } else if (this.mode === 'follow') {
      this.speed = 4.2;
      this.speak('I’m right behind you, leader! 🪄', 2200);
      if (this.soundEnabled) nurseryAudio.playPipGiggle();
    } else {
      // Default Roam
      this.speed = 2.4;
      this.speak('Roaming across the dream world... 🌙', 2400);
      if (this.soundEnabled) nurseryAudio.playChime('G5');
      this.scheduleNextRoamTarget();
    }
  }

  scheduleNextRoamTarget() {
    clearTimeout(this.nextTargetTimer);
    if (this.mode !== 'roam') return;

    const delay = 3500 + Math.random() * 4500;
    this.nextTargetTimer = setTimeout(() => {
      if (this.mode === 'roam' && !this.isDragging) {
        this.pickRoamTarget();
        // Occasionally show a cute thought
        if (Math.random() > 0.45) {
          const list = this.quotes.roam;
          this.speak(list[Math.floor(Math.random() * list.length)], 3200);
        }
      }
      this.scheduleNextRoamTarget();
    }, delay);
  }

  pickRoamTarget() {
    const padX = 70;
    const padY = 90;
    const maxW = window.innerWidth - 240;
    const maxH = window.innerHeight - 270;

    this.targetX = padX + Math.random() * Math.max(80, maxW - padX);
    this.targetY = padY + Math.random() * Math.max(80, maxH - padY);

    this.facingRight = this.targetX > this.x;
  }

  pickSprintTarget() {
    // Sprint across to the opposite side of the screen!
    if (this.x < window.innerWidth / 2) {
      this.targetX = window.innerWidth - 230;
      this.facingRight = true;
    } else {
      this.targetX = 60;
      this.facingRight = false;
    }
    this.targetY = 120 + Math.random() * (window.innerHeight - 300);
  }

  callPipToCenter() {
    this.targetX = window.innerWidth / 2 - 95;
    this.targetY = window.innerHeight / 2 - 120;
    this.speak('You called? Here I am! ✦', 2600);
    if (this.soundEnabled) {
      nurseryAudio.playPipGiggle();
      nurseryAudio.playWishSparkle();
    }
    this.burstSparkles(this.targetX + 90, this.targetY + 110, 10);
  }

  speak(text, duration = 3000) {
    if (!this.speechEl) return;
    const textSpan = this.speechEl.querySelector('.pip-speech-text');
    if (textSpan) textSpan.textContent = text;

    this.speechEl.classList.add('is-visible');
    clearTimeout(this.speechTimer);
    this.speechTimer = setTimeout(() => {
      this.speechEl.classList.remove('is-visible');
    }, duration);
  }

  burstSparkles(originX, originY, count = 6) {
    const symbols = ['✦', '✧', '★', '⭐', '✨', '💖'];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'pip-floating-particle';
      p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      p.style.left = `${originX}px`;
      p.style.top = `${originY}px`;
      p.style.color = Math.random() > 0.5 ? '#F4D77B' : '#FF75A0';
      document.body.appendChild(p);

      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 80;
      requestAnimationFrame(() => {
        p.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist - 30}px) scale(0)`;
        p.style.opacity = '0';
      });

      setTimeout(() => p.remove(), 1100);
    }
  }

  startParticleLoop() {
    setInterval(() => {
      if (!this.container) return;

      const originX = this.x + 95;
      const originY = this.y + 115;

      if (this.mode === 'dance') {
        const notes = ['♫', '♬', '♩', '♪', '💖', '✨'];
        const p = document.createElement('span');
        p.className = 'pip-floating-particle';
        p.textContent = notes[Math.floor(Math.random() * notes.length)];
        p.style.left = `${originX + (Math.random() - 0.5) * 50}px`;
        p.style.top = `${originY - 20}px`;
        p.style.color = '#B45B7B';
        document.body.appendChild(p);

        requestAnimationFrame(() => {
          p.style.transform = `translate(${(Math.random() - 0.5) * 60}px, -${60 + Math.random() * 50}px) scale(1.4)`;
          p.style.opacity = '0';
        });
        setTimeout(() => p.remove(), 1200);

      } else if (this.mode === 'sleep') {
        const p = document.createElement('span');
        p.className = 'pip-floating-particle pip-zzz-particle';
        p.textContent = ['Z', 'z', '💤'][Math.floor(Math.random() * 3)];
        p.style.left = `${originX + 25}px`;
        p.style.top = `${originY - 45}px`;
        p.style.color = '#D9C4ED';
        document.body.appendChild(p);

        requestAnimationFrame(() => {
          p.style.transform = `translate(${20 + Math.random() * 30}px, -${50 + Math.random() * 40}px) scale(1.3)`;
          p.style.opacity = '0';
        });
        setTimeout(() => p.remove(), 1600);

      } else if (this.mode === 'run') {
        const p = document.createElement('span');
        p.className = 'pip-floating-particle';
        p.textContent = ['💨', '✦', '⭐'][Math.floor(Math.random() * 3)];
        p.style.left = `${originX + (this.facingRight ? -40 : 40)}px`;
        p.style.top = `${originY + 20}px`;
        p.style.color = '#FFD77B';
        document.body.appendChild(p);

        requestAnimationFrame(() => {
          p.style.transform = `translate(${this.facingRight ? -60 : 60}px, ${(Math.random() - 0.5) * 20}px) scale(0.4)`;
          p.style.opacity = '0';
        });
        setTimeout(() => p.remove(), 700);
      }
    }, 450);
  }

  clampToBounds() {
    const maxX = window.innerWidth - 210;
    const maxY = window.innerHeight - 240;
    this.x = Math.max(20, Math.min(maxX, this.x));
    this.y = Math.max(60, Math.min(maxY, this.y));
  }

  startLoop() {
    const update = (timestamp) => {
      this.animFrameId = requestAnimationFrame(update);

      if (this.isDragging) {
        this.clampToBounds();
        this.renderPosition(timestamp);
        return;
      }

      // Target update logic
      if (this.mode === 'follow' && this.hasMouse) {
        this.targetX = this.mouseX - 90;
        this.targetY = this.mouseY - 110;
        this.facingRight = this.targetX > this.x;
      }

      // Physics Interpolation
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 2) {
        const factor = this.mode === 'run' ? 0.08 : (this.mode === 'follow' ? 0.06 : 0.035);
        this.vx = dx * factor;
        this.vy = dy * factor;

        // Cap speed
        const currentSpeed = Math.hypot(this.vx, this.vy);
        if (currentSpeed > this.speed) {
          this.vx = (this.vx / currentSpeed) * this.speed;
          this.vy = (this.vy / currentSpeed) * this.speed;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (Math.abs(this.vx) > 0.4) {
          this.facingRight = this.vx > 0;
        }
      } else {
        if (this.mode === 'run') {
          // Re-pick another sprint target!
          this.pickSprintTarget();
        }
      }

      this.clampToBounds();
      this.renderPosition(timestamp);
    };

    this.animFrameId = requestAnimationFrame(update);
  }

  renderPosition(timestamp) {
    if (!this.container) return;

    // Harmonic bobbing oscillation for natural cloud float
    const t = timestamp * 0.003;
    let bobY = 0;
    let tiltDeg = 0;
    // Use realistic 3D perspective orientation instead of 2D mirror flip
    let turnY = this.facingRight ? 16 : -16;

    if (this.mode === 'dance') {
      bobY = Math.abs(Math.sin(t * 3.5)) * -18;
      tiltDeg = Math.sin(t * 3.5) * 8;
    } else if (this.mode === 'run') {
      bobY = Math.abs(Math.sin(t * 7)) * -14;
      tiltDeg = (this.facingRight ? 10 : -10);
    } else if (this.mode === 'sleep') {
      bobY = Math.sin(t * 1.2) * 5;
      tiltDeg = Math.sin(t * 0.8) * 3;
    } else {
      // Roam / Follow
      bobY = Math.sin(t * 2) * 8;
      tiltDeg = Math.sin(t * 1.5) * 4;
    }

    const currentX = this.x;
    const currentY = this.y + bobY;

    this.container.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

    if (this.characterEl) {
      this.characterEl.style.transform = `perspective(700px) rotateY(${turnY}deg) rotate(${tiltDeg}deg)`;
    }
  }

  destroy() {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    clearTimeout(this.nextTargetTimer);
    clearTimeout(this.particleTimer);
    clearTimeout(this.speechTimer);
    if (this.container) this.container.remove();
    if (this.hudEl) this.hudEl.remove();
  }
}

let activeRoamer = null;

export function initPipRoamer() {
  if (activeRoamer) return activeRoamer;
  activeRoamer = new PipRoamerEngine();
  activeRoamer.init();
  window.activePipRoamer = activeRoamer;
  return activeRoamer;
}
