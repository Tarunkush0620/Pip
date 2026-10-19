// Dynamic Sky Cycle (Dawn ☀️ / Twilight 🌅 / Midnight 🌌) Controller
// Controls ambient sky gradients, lantern illumination colors, starry density,
// and synchronized updates to Three.js CelestialScene and AtmosphericEngine.

import { nurseryAudio } from '../audio/soundEffects.js';
import { triggerShootingStar } from './atmosphericEngine.js';

const STORAGE_KEY = 'pip_sky_cycle_phase';

export const SKY_PHASES = {
  dawn: {
    id: 'dawn',
    index: 0,
    label: 'Dawn',
    icon: '☀️',
    timeStr: '06:30 AM',
    subtitle: 'Golden Morning Light',
    starDensity: '15% · Faint Dawn Stardust',
    lanternColor: '#F9A825',
    lanternGlow: 'radial-gradient(circle at 50% 52%, rgba(255, 214, 120, 0.95), rgba(244, 215, 123, 0.4) 40%, transparent 70%)',
    chime: 'A5'
  },
  twilight: {
    id: 'twilight',
    index: 1,
    label: 'Twilight',
    icon: '🌅',
    timeStr: '07:45 PM',
    subtitle: 'Dusk Rose & Lavender',
    starDensity: '55% · Emerging Starlight',
    lanternColor: '#FF75A0',
    lanternGlow: 'radial-gradient(circle at 50% 52%, rgba(255, 140, 180, 0.95), rgba(242, 109, 153, 0.45) 40%, transparent 70%)',
    chime: 'E5'
  },
  midnight: {
    id: 'midnight',
    index: 2,
    label: 'Midnight',
    icon: '🌌',
    timeStr: '11:45 PM',
    subtitle: 'Cosmic Velveteen Sky',
    starDensity: '100% · Brilliant Starfield',
    lanternColor: '#FCE183',
    lanternGlow: 'radial-gradient(circle at 50% 52%, rgba(252, 225, 131, 0.95), rgba(205, 184, 227, 0.4) 40%, transparent 70%)',
    chime: 'D4'
  }
};

const PHASE_ORDER = ['dawn', 'twilight', 'midnight'];

class SkyCycleController {
  constructor() {
    this.currentPhase = localStorage.getItem(STORAGE_KEY) || 'midnight';
    if (!SKY_PHASES[this.currentPhase]) {
      this.currentPhase = 'midnight';
    }

    this.refreshElements();
    this.init();
  }

  refreshElements() {
    this.toggleBtn = document.getElementById('night-mode-toggle');
    this.hudPanel = document.getElementById('sky-atmosphere-hud');
    this.hudToggleBtn = document.getElementById('sky-hud-open-btn');
    this.hudCloseBtn = document.getElementById('sky-hud-close-btn');
    this.timeSlider = document.getElementById('sky-time-slider');
    this.summonStarBtn = document.getElementById('summon-shooting-star-btn');
    this.densityText = document.getElementById('sky-star-density-text');
    this.lanternColorDot = document.getElementById('sky-lantern-color-dot');
    this.lanternCardGlow = document.getElementById('lantern-glow-effect');
  }

  refresh() {
    this.refreshElements();
    this.bindEvents();
    this.applyPhase(this.currentPhase, false);
  }

  init() {
    this.bindEvents();
    this.applyPhase(this.currentPhase, false);
  }

  bindEvents() {
    // Navbar Quick Toggle Button (cycles through Dawn -> Twilight -> Midnight -> Dawn)
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', (e) => {
        // Prevent trigger if clicking on hud opener
        if (e.target.closest('#sky-hud-open-btn')) return;
        this.cycleNextPhase();
      });
    }

    // Atmospheric HUD Open/Close
    if (this.hudToggleBtn) {
      this.hudToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.toggleHUD();
      });
    }

    if (this.hudCloseBtn) {
      this.hudCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeHUD();
      });
    }

    // Time Slider
    if (this.timeSlider) {
      this.timeSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        const phaseName = PHASE_ORDER[val] || 'dawn';
        this.setPhase(phaseName);
      });
    }

    // Quick Phase Preset Buttons inside HUD
    document.querySelectorAll('[data-sky-preset]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const phase = btn.dataset.skyPreset;
        if (SKY_PHASES[phase]) {
          this.setPhase(phase);
        }
      });
    });

    // Summon Shooting Star Button
    if (this.summonStarBtn) {
      this.summonStarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerShootingStar();
        if (window.spawnStardustBurst) {
          const rect = this.summonStarBtn.getBoundingClientRect();
          window.spawnStardustBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 10);
        }
      });
    }

    // Close HUD on outside click or Escape
    document.addEventListener('click', (e) => {
      if (this.hudPanel && !this.hudPanel.classList.contains('hidden')) {
        if (!this.hudPanel.contains(e.target) && !e.target.closest('#night-mode-toggle') && !e.target.closest('#sky-hud-open-btn')) {
          this.closeHUD();
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.target.matches('input, textarea, select')) return;

      if (e.key === 'Escape' && this.hudPanel && !this.hudPanel.classList.contains('hidden')) {
        this.closeHUD();
      }
      // '1' = Dawn, '2' = Twilight, '3' = Midnight
      if (e.key === '1') {
        this.setPhase('dawn');
      } else if (e.key === '2') {
        this.setPhase('twilight');
      } else if (e.key === '3') {
        this.setPhase('midnight');
      }
      // 'H' toggles HUD
      if (e.key === 'h' || e.key === 'H') {
        this.toggleHUD();
      }
      // 'S' key summons a shooting star
      if (e.key === 's' || e.key === 'S') {
        triggerShootingStar();
      }
    });

    // Expose helpers on window for direct access
    window.setSkyPhase = (phase) => this.setPhase(phase);
    window.toggleSkyHUD = () => this.toggleHUD();
    window.triggerShootingStar = triggerShootingStar;

    // Card 2 Lantern Integration
    this.bindLanternCard();

    // Pause videos when document is hidden to save battery & GPU
    document.addEventListener('visibilitychange', () => {
      const videoDawn = document.getElementById('bg-video-dawn');
      const videoMidnight = document.getElementById('bg-video-midnight');
      if (document.hidden) {
        if (videoDawn) videoDawn.pause();
        if (videoMidnight) videoMidnight.pause();
      } else {
        this.applyPhase(this.currentPhase, false);
      }
    });
  }

  bindLanternCard() {
    const lanternCard = document.getElementById('p2');
    const lanternBtn = document.getElementById('lt');

    if (lanternBtn && lanternCard) {
      let isLit = false;
      lanternBtn.addEventListener('click', () => {
        isLit = !isLit;
        nurseryAudio.playChime(isLit ? 'A5' : 'D4');

        lanternCard.classList.toggle('lit', isLit);
        lanternBtn.setAttribute('aria-pressed', isLit.toString());
        lanternBtn.textContent = isLit ? 'Blow out lantern' : 'Light the lantern';

        if (this.lanternCardGlow) {
          this.lanternCardGlow.style.opacity = isLit ? '1' : '0';
        }

        const lanternStatus = document.getElementById('lantern-status');
        const lumensEl = document.getElementById('lantern-lumens');
        if (lanternStatus) {
          lanternStatus.textContent = isLit ? 'Status: Glowing brightly ★ Monster ward active' : 'Status: Extinguished (Ready to spark)';
        }
        if (lumensEl) {
          lumensEl.textContent = isLit ? '● 100% Lumens Active' : 'Off · Ready';
          lumensEl.style.color = isLit ? '#10B981' : '#FBBF24';
        }
      });
    }

    // Manual color picker swatches in Card 2
    document.querySelectorAll('.lantern-color-pick').forEach((btn) => {
      btn.addEventListener('click', () => {
        const color = btn.dataset.color || 'gold';
        nurseryAudio.playChime('C5');
        if (this.lanternCardGlow) {
          if (color === 'gold') {
            this.lanternCardGlow.style.background = SKY_PHASES.dawn.lanternGlow;
          } else if (color === 'lavender') {
            this.lanternCardGlow.style.background = SKY_PHASES.midnight.lanternGlow;
          } else if (color === 'rose') {
            this.lanternCardGlow.style.background = SKY_PHASES.twilight.lanternGlow;
          } else if (color === 'mint') {
            this.lanternCardGlow.style.background = 'radial-gradient(circle at 50% 52%, rgba(180, 240, 215, 0.95), rgba(100, 210, 175, 0.4) 40%, transparent 70%)';
          }
        }
      });
    });
  }

  toggleHUD() {
    if (!this.hudPanel) return;
    const isHidden = this.hudPanel.classList.contains('hidden');
    if (isHidden) {
      this.openHUD();
    } else {
      this.closeHUD();
    }
  }

  openHUD() {
    if (!this.hudPanel) return;
    this.hudPanel.classList.remove('hidden');
    this.hudPanel.classList.add('flex');
    nurseryAudio.playChime('E5');
  }

  closeHUD() {
    if (!this.hudPanel) return;
    this.hudPanel.classList.add('hidden');
    this.hudPanel.classList.remove('flex');
  }

  cycleNextPhase() {
    const currentIdx = PHASE_ORDER.indexOf(this.currentPhase);
    const nextIdx = (currentIdx + 1) % PHASE_ORDER.length;
    this.setPhase(PHASE_ORDER[nextIdx]);
  }

  setPhase(phaseName) {
    if (!SKY_PHASES[phaseName]) return;
    this.currentPhase = phaseName;
    localStorage.setItem(STORAGE_KEY, phaseName);
    this.applyPhase(phaseName, true);
  }

  applyPhase(phaseName, playSound = true) {
    const phase = SKY_PHASES[phaseName];
    if (!phase) return;

    if (playSound) {
      nurseryAudio.playChime(phase.chime);
    }

    // 0. Update Dual Background Videos (Dawn.mp4 & midnight.mp4)
    const videoDawn = document.getElementById('bg-video-dawn');
    const videoMidnight = document.getElementById('bg-video-midnight');

    if (videoDawn && videoMidnight) {
      if (phaseName === 'dawn') {
        videoDawn.style.opacity = '1';
        videoMidnight.style.opacity = '0';
        if (videoDawn.paused) videoDawn.play().catch(() => {});
        videoMidnight.pause();
      } else if (phaseName === 'twilight') {
        videoDawn.style.opacity = '0.35';
        videoMidnight.style.opacity = '0.85';
        if (videoDawn.paused) videoDawn.play().catch(() => {});
        if (videoMidnight.paused) videoMidnight.play().catch(() => {});
      } else if (phaseName === 'midnight') {
        videoDawn.style.opacity = '0';
        videoMidnight.style.opacity = '1';
        videoDawn.pause();
        if (videoMidnight.paused) videoMidnight.play().catch(() => {});
      }
    }

    // 1. Update HTML document body classes
    document.body.classList.remove('sky-dawn', 'sky-twilight', 'sky-midnight', 'midnight-mode');

    if (phaseName === 'dawn') {
      document.body.classList.add('sky-dawn');
    } else if (phaseName === 'twilight') {
      document.body.classList.add('sky-twilight', 'midnight-mode');
    } else if (phaseName === 'midnight') {
      document.body.classList.add('sky-midnight', 'midnight-mode');
    }

    // 2. Update Navbar Toggle Button UI
    const toggleBtn = document.getElementById('night-mode-toggle');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-label', `Current Sky: ${phase.label}. Tap to cycle.`);
      const iconEl = toggleBtn.querySelector('#sky-cycle-icon');
      const labelEl = toggleBtn.querySelector('#sky-cycle-label');
      if (iconEl) iconEl.textContent = phase.icon;
      if (labelEl) labelEl.textContent = phase.label;

      // Update active pip indicators
      toggleBtn.querySelectorAll('.sky-pip').forEach((pip, idx) => {
        pip.classList.toggle('bg-white', idx === phase.index);
        pip.classList.toggle('bg-white/40', idx !== phase.index);
      });
    }

    // 3. Update HUD Slider & Presets
    const timeSlider = document.getElementById('sky-time-slider');
    if (timeSlider) {
      timeSlider.value = phase.index;
    }

    const timeValEl = document.getElementById('sky-hud-time-val');
    if (timeValEl) {
      timeValEl.textContent = `${phase.label} · ${phase.timeStr}`;
    }

    document.querySelectorAll('[data-sky-preset]').forEach((btn) => {
      const isCurrent = btn.dataset.skyPreset === phaseName;
      btn.classList.toggle('is-active', isCurrent);
      btn.classList.toggle('border-berry', isCurrent);
      btn.classList.toggle('bg-berry/20', isCurrent);
    });

    const densityText = document.getElementById('sky-star-density-text');
    if (densityText) {
      densityText.textContent = phase.starDensity;
    }

    const lanternColorDot = document.getElementById('sky-lantern-color-dot');
    if (lanternColorDot) {
      lanternColorDot.style.backgroundColor = phase.lanternColor;
    }

    // 4. Update Card 2 Lantern Glow if active
    const lanternCardGlow = document.getElementById('lantern-glow-effect');
    if (lanternCardGlow) {
      lanternCardGlow.style.background = phase.lanternGlow;
    }

    // 5. Update Three.js CelestialScene (Star density & Lighting)
    if (window.celestialScene && typeof window.celestialScene.setSkyPhase === 'function') {
      window.celestialScene.setSkyPhase(phaseName);
    }

    // 6. Update AtmosphericEngine (Aurora Borealis & Meteors)
    if (window.atmosphericEngine && typeof window.atmosphericEngine.setSkyPhase === 'function') {
      window.atmosphericEngine.setSkyPhase(phaseName);
    }

    // 7. Update Celestial Starfield (#stars) Opacity
    const starsEl = document.getElementById('stars');
    if (starsEl) {
      if (phaseName === 'dawn') {
        starsEl.style.opacity = '0.4';
      } else if (phaseName === 'twilight') {
        starsEl.style.opacity = '0.75';
      } else {
        starsEl.style.opacity = '0.95';
      }
    }
  }
}

let skyControllerInstance = null;

export function initSkyCycle() {
  if (!skyControllerInstance) {
    skyControllerInstance = new SkyCycleController();
  } else {
    skyControllerInstance.refresh();
  }
  window.skyCycleController = skyControllerInstance;
  return skyControllerInstance;
}
