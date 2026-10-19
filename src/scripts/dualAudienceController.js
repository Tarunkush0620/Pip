// Controller for DualAudienceHub (Baby Sensory Mode & Parent Sanctuary Mode)
import { nurseryAudio } from '../audio/soundEffects.js';

export function initDualAudienceController() {
  // Mode Buttons
  const babyBtn = document.getElementById('hub-btn-baby-mode');
  const parentBtn = document.getElementById('hub-btn-parent-mode');
  const babyPanel = document.getElementById('panel-baby-sensory');
  const parentPanel = document.getElementById('panel-parent-sanctuary');

  if (!babyBtn || !parentBtn || !babyPanel || !parentPanel) return;

  function switchMode(mode, playSound = true) {
    if (mode === 'baby') {
      babyBtn.classList.add('is-active', 'bg-berry', 'text-white');
      babyBtn.classList.remove('text-ink', 'dark:text-cream');
      parentBtn.classList.remove('is-active', 'bg-berry', 'text-white');
      parentBtn.classList.add('text-ink', 'dark:text-cream');

      babyPanel.classList.remove('hidden');
      babyPanel.classList.add('block', 'animate-fadeIn');
      parentPanel.classList.add('hidden');
      parentPanel.classList.remove('block');

      document.body.classList.add('baby-mode-active');
      document.body.classList.remove('parent-mode-active');

      if (playSound && nurseryAudio) nurseryAudio.playPipGiggle();
    } else {
      parentBtn.classList.add('is-active', 'bg-berry', 'text-white');
      parentBtn.classList.remove('text-ink', 'dark:text-cream');
      babyBtn.classList.remove('is-active', 'bg-berry', 'text-white');
      babyBtn.classList.add('text-ink', 'dark:text-cream');

      parentPanel.classList.remove('hidden');
      parentPanel.classList.add('block', 'animate-fadeIn');
      babyPanel.classList.add('hidden');
      babyPanel.classList.remove('block');

      document.body.classList.add('parent-mode-active');
      document.body.classList.remove('baby-mode-active');

      if (playSound && nurseryAudio) nurseryAudio.playChime('C5');
    }
  }

  babyBtn.addEventListener('click', () => switchMode('baby', true));
  parentBtn.addEventListener('click', () => switchMode('parent', true));

  // Expose global switcher for header pill
  window.setPipAudienceMode = (mode) => switchMode(mode, true);

  // --------------------------------------------------------------------------
  // 1. BABY SENSORY MODE INTERACTIONS
  // --------------------------------------------------------------------------
  const rattle = document.getElementById('interactive-baby-rattle');
  const rattleIcon = document.getElementById('rattle-toy-icon');
  const rattleFeedback = document.getElementById('rattle-feedback-text');

  if (rattle) {
    let shakeCount = 0;
    rattle.addEventListener('click', () => {
      shakeCount++;
      if (nurseryAudio) nurseryAudio.playRattle();

      // Shake animation
      rattle.classList.remove('animate-shake-toy');
      void rattle.offsetWidth; // trigger reflow
      rattle.classList.add('animate-shake-toy');

      if (rattleFeedback) {
        const giggles = ['✨ Jing-a-ling! ✨', '🧸 Rattlin’ joy! 🧸', '🍼 Pip giggles with you!', '🌸 Soothing chimes!'];
        rattleFeedback.textContent = giggles[shakeCount % giggles.length];
      }

      if (shakeCount % 3 === 0 && nurseryAudio) {
        setTimeout(() => nurseryAudio.playPipGiggle(), 250);
      }
    });
  }

  const squeakBtn = document.getElementById('baby-toy-squeak-btn');
  if (squeakBtn) {
    squeakBtn.addEventListener('click', () => {
      if (nurseryAudio) nurseryAudio.playSqueakToy();
      squeakBtn.classList.add('scale-110');
      setTimeout(() => squeakBtn.classList.remove('scale-110'), 180);
    });
  }

  const giggleBtn = document.getElementById('baby-giggle-btn');
  if (giggleBtn) {
    giggleBtn.addEventListener('click', () => {
      if (nurseryAudio) nurseryAudio.playPipGiggle();
      giggleBtn.classList.add('scale-110');
      setTimeout(() => giggleBtn.classList.remove('scale-110'), 180);
    });
  }

  // High-Contrast Infant Filter
  const infantFilterBtn = document.getElementById('toggle-high-contrast-infant');
  if (infantFilterBtn) {
    let highContrast = false;
    infantFilterBtn.addEventListener('click', () => {
      highContrast = !highContrast;
      document.body.classList.toggle('infant-high-contrast', highContrast);
      infantFilterBtn.textContent = highContrast ? '✓ Filter Active' : 'Toggle Filter';
      if (nurseryAudio) nurseryAudio.playChime('E5');
    });
  }

  // Bubble Garden Playground
  const bubbleStage = document.getElementById('bubble-interactive-stage');
  const bubblesPoppedEl = document.getElementById('bubbles-popped-counter');
  const swarmBtn = document.getElementById('spawn-bubble-swarm-btn');
  let poppedCount = 0;

  function spawnBubble(xRatio, yRatio) {
    if (!bubbleStage) return;
    const bubble = document.createElement('div');
    const size = 38 + Math.random() * 38;
    const x = xRatio !== undefined ? xRatio * 100 : 10 + Math.random() * 80;
    const y = yRatio !== undefined ? yRatio * 100 : 80 + Math.random() * 15;
    const duration = 5 + Math.random() * 4;

    bubble.className = 'stardust-bubble absolute rounded-full cursor-pointer select-none';
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${x}%`;
    bubble.style.top = `${y}%`;
    bubble.style.animation = `bubbleFloat ${duration}s linear infinite, bubbleWobble 2s ease-in-out infinite`;
    bubble.style.background = 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.95), rgba(255, 182, 193, 0.6) 40%, rgba(186, 104, 200, 0.4) 80%, rgba(255, 255, 255, 0.2))';
    bubble.style.border = '1.5px solid rgba(255, 255, 255, 0.8)';
    bubble.style.boxShadow = 'inset 0 0 10px rgba(255, 255, 255, 0.8), 0 4px 15px rgba(230, 42, 107, 0.25)';
    bubble.style.zIndex = '10';

    const pop = (e) => {
      if (e) e.stopPropagation();
      poppedCount++;
      if (bubblesPoppedEl) {
        bubblesPoppedEl.textContent = `${poppedCount} Bubbles Popped! 🫧`;
      }
      if (nurseryAudio) nurseryAudio.playBubblePop();

      // Confetti Sparkle Burst
      createStardustPopSparkle(bubble);
      bubble.remove();

      // Spawn replacement bubble after gentle delay
      setTimeout(() => spawnBubble(), 1200 + Math.random() * 1500);
    };

    bubble.addEventListener('click', pop);
    bubble.addEventListener('touchstart', pop, { passive: true });
    bubbleStage.appendChild(bubble);

    // Auto remove after animation completes
    setTimeout(() => {
      if (bubble.parentNode) {
        bubble.remove();
        spawnBubble();
      }
    }, duration * 1000);
  }

  function createStardustPopSparkle(targetEl) {
    if (!bubbleStage) return;
    const rect = targetEl.getBoundingClientRect();
    const stageRect = bubbleStage.getBoundingClientRect();
    const cx = rect.left - stageRect.left + rect.width / 2;
    const cy = rect.top - stageRect.top + rect.height / 2;

    for (let i = 0; i < 7; i++) {
      const p = document.createElement('span');
      p.textContent = ['✨', '🌸', '✦', '⭐', '🫧'][Math.floor(Math.random() * 5)];
      p.className = 'absolute text-xs pointer-events-none transition-all duration-500';
      p.style.left = `${cx}px`;
      p.style.top = `${cy}px`;
      p.style.zIndex = '20';
      bubbleStage.appendChild(p);

      const angle = (Math.PI * 2 / 7) * i;
      const dist = 25 + Math.random() * 25;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;

      requestAnimationFrame(() => {
        p.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
        p.style.opacity = '0';
      });

      setTimeout(() => p.remove(), 550);
    }
  }

  // Populate initial garden bubbles
  if (bubbleStage) {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => spawnBubble(0.15 + (i * 0.14), 0.2 + (i * 0.12)), i * 200);
    }

    bubbleStage.addEventListener('click', (e) => {
      const rect = bubbleStage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      spawnBubble(x, y);
      if (nurseryAudio) nurseryAudio.playBell(783.99, null, 0.3);
    });
  }

  if (swarmBtn) {
    swarmBtn.addEventListener('click', () => {
      for (let i = 0; i < 10; i++) {
        setTimeout(() => spawnBubble(), i * 120);
      }
      if (nurseryAudio) nurseryAudio.playChime('C6');
    });
  }

  // --------------------------------------------------------------------------
  // 2. PARENT SANCTUARY MODE INTERACTIONS
  // --------------------------------------------------------------------------
  let timerInterval = null;
  let remainingSeconds = 0;
  const timerDisplay = document.getElementById('parent-timer-display');
  const timerStatus = document.getElementById('parent-timer-status');
  const stopTimerBtn = document.getElementById('parent-timer-stop-btn');
  const timerPresetBtns = document.querySelectorAll('.parent-timer-btn');

  function updateTimerText() {
    if (!timerDisplay) return;
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function startTimer(minutes) {
    if (timerInterval) clearInterval(timerInterval);
    remainingSeconds = minutes * 60;
    updateTimerText();

    if (timerStatus) {
      timerStatus.textContent = `🌙 Bedtime wind-down active (${minutes} min). Screen will dim softly.`;
    }

    timerPresetBtns.forEach(b => {
      if (parseInt(b.getAttribute('data-minutes'), 10) === minutes) {
        b.classList.add('bg-amber-300', 'text-amber-950', 'font-black');
      } else {
        b.classList.remove('bg-amber-300', 'text-amber-950', 'font-black');
      }
    });

    if (nurseryAudio) {
      nurseryAudio.playChime('G4');
      nurseryAudio.toggleAmbient(true); // activate peaceful pink noise
    }

    timerInterval = setInterval(() => {
      remainingSeconds--;
      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        remainingSeconds = 0;
        updateTimerText();
        if (timerStatus) {
          timerStatus.textContent = '💤 Sleep time reached! Shhh... sweet dreams.';
        }
        if (nurseryAudio) {
          nurseryAudio.toggleAmbient(false);
          nurseryAudio.playBell(523.25, null, 0.2);
        }
      } else {
        updateTimerText();
      }
    }, 1000);
  }

  timerPresetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mins = parseInt(btn.getAttribute('data-minutes') || '10', 10);
      startTimer(mins);
    });
  });

  if (stopTimerBtn) {
    stopTimerBtn.addEventListener('click', () => {
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = null;
      remainingSeconds = 0;
      updateTimerText();
      if (timerStatus) timerStatus.textContent = 'Timer reset. Tap any preset to begin.';
      timerPresetBtns.forEach(b => b.classList.remove('bg-amber-300', 'text-amber-950', 'font-black'));
      if (nurseryAudio) nurseryAudio.playChime('C4');
    });
  }

  // Fullscreen Screen Lamp Nightlight
  const openNightlightBtn = document.getElementById('parent-nightlight-screen-btn');
  const nightlightModal = document.getElementById('fullscreen-nightlight-modal');
  const closeNightlightBtn = document.getElementById('close-fullscreen-nightlight');
  const amberColorBtn = document.getElementById('nightlight-color-amber');
  const lavenderColorBtn = document.getElementById('nightlight-color-lavender');

  if (openNightlightBtn && nightlightModal) {
    openNightlightBtn.addEventListener('click', () => {
      nightlightModal.classList.remove('hidden');
      nightlightModal.classList.add('flex');
      if (nurseryAudio) nurseryAudio.playChime('E5');
    });
  }

  if (closeNightlightBtn && nightlightModal) {
    closeNightlightBtn.addEventListener('click', () => {
      nightlightModal.classList.add('hidden');
      nightlightModal.classList.remove('flex');
    });
  }

  if (amberColorBtn && nightlightModal) {
    amberColorBtn.addEventListener('click', () => {
      nightlightModal.style.backgroundColor = '#FFECB3';
    });
  }

  if (lavenderColorBtn && nightlightModal) {
    lavenderColorBtn.addEventListener('click', () => {
      nightlightModal.style.backgroundColor = '#EDE7F6';
    });
  }

  // Lyrics Accordion
  const lyricsBtns = document.querySelectorAll('.lyrics-toggle-btn');
  lyricsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentCard = btn.closest('.lyrics-card');
      if (!parentCard) return;
      const drawer = parentCard.querySelector('.lyrics-drawer');
      const chevron = parentCard.querySelector('.lyrics-chevron');

      const isHidden = drawer.classList.contains('hidden');
      document.querySelectorAll('.lyrics-drawer').forEach(d => d.classList.add('hidden'));
      document.querySelectorAll('.lyrics-chevron').forEach(c => c.style.transform = 'rotate(0deg)');

      if (isHidden) {
        drawer.classList.remove('hidden');
        drawer.classList.add('flex');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
        if (nurseryAudio) nurseryAudio.playChime('D5');
      }
    });
  });
}
