import { nurseryAudio } from '../audio/soundEffects.js';

export function initIntroController() {
  const overlay = document.getElementById('pip-intro-overlay');
  const video = document.getElementById('pip-intro-video');
  const skipBtn = document.getElementById('skip-intro-btn');
  const skipBtnTop = document.getElementById('skip-intro-btn-top');
  const topHud = document.getElementById('intro-top-hud');
  const bottomHud = document.getElementById('intro-bottom-hud');

  if (!overlay || !video) return;

  // Lock scrolling while intro is active
  document.documentElement.classList.add('intro-active');
  document.body.classList.add('intro-active');

  let isIntroFinished = false;
  let hudTimeout = null;

  function showHud() {
    if (topHud) topHud.style.opacity = '1';
    if (bottomHud) bottomHud.style.opacity = '1';
    clearTimeout(hudTimeout);
    hudTimeout = setTimeout(() => {
      if (!video.paused && !isIntroFinished) {
        if (topHud) topHud.style.opacity = '0';
        if (bottomHud) bottomHud.style.opacity = '0';
      }
    }, 3200);
  }

  overlay.addEventListener('pointermove', showHud);
  overlay.addEventListener('touchstart', showHud, { passive: true });

  function finishIntro() {
    if (isIntroFinished) return;
    isIntroFinished = true;
    clearTimeout(hudTimeout);

    // Play a gentle welcome chime entering the dream world
    try {
      nurseryAudio.playChime('C5');
    } catch (e) { }

    overlay.style.opacity = '0';
    overlay.style.filter = 'blur(24px)';
    overlay.style.transform = 'scale(1.08)';
    overlay.style.pointerEvents = 'none';

    setTimeout(() => {
      try {
        video.pause();
      } catch (e) { }
      overlay.style.display = 'none';
      document.documentElement.classList.remove('intro-active');
      document.body.classList.remove('intro-active');

      // Resume or trigger background sky videos
      const vDawn = document.getElementById('bg-video-dawn');
      const vMidnight = document.getElementById('bg-video-midnight');
      if (vDawn && vDawn.paused) vDawn.play().catch(() => { });
      if (vMidnight && vMidnight.paused) vMidnight.play().catch(() => { });
    }, 1100);
  }

  // Attempt Autoplay with Sound
  video.muted = false;
  video.volume = 0.95;

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      showHud();
    }).catch(() => {
      // Browser blocked unmuted autoplay -> immediately play muted without any prompt
      video.muted = true;
      video.play().then(() => {
        showHud();
      }).catch(() => { });

      // Unmute seamlessly on the user's first click or touch anywhere
      const unmuteOnFirstTouch = () => {
        if (video) {
          video.muted = false;
          video.volume = 0.95;
        }
      };
      window.addEventListener('pointerdown', unmuteOnFirstTouch, { once: true, passive: true });
      window.addEventListener('keydown', unmuteOnFirstTouch, { once: true, passive: true });
    });
  }

  // Click on edge-to-edge video toggles playback
  video.addEventListener('click', () => {
    if (video.muted) {
      video.muted = false;
      video.volume = 0.95;
    }
    showHud();
    if (video.paused) {
      video.play().catch(() => { });
    } else {
      video.pause();
    }
  });


  // Auto-transition when video completes
  video.addEventListener('ended', () => {
    finishIntro();
  });

  // Skip and Enter Buttons
  if (skipBtn) skipBtn.addEventListener('click', finishIntro);
  if (skipBtnTop) skipBtnTop.addEventListener('click', finishIntro);

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (isIntroFinished) return;
    showHud();
    if (e.key === 'Escape') {
      finishIntro();
    } else if (e.key === ' ' || e.key === 'k') {
      e.preventDefault();
      if (video.paused) {
        video.play().catch(() => { });
      } else {
        video.pause();
      }
    } else if (e.key === 'm' || e.key === 'M') {
      video.muted = !video.muted;
    }
  });

  // Global Replay Method (Can be triggered anytime from Navbar / menu)
  window.replayPipIntro = function () {
    isIntroFinished = false;
    document.documentElement.classList.add('intro-active');
    document.body.classList.add('intro-active');
    overlay.style.display = 'block';
    overlay.style.pointerEvents = 'auto';
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      overlay.style.filter = 'blur(0px)';
      overlay.style.transform = 'scale(1)';
    });
    video.currentTime = 0;
    video.muted = false;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => { });
    });
    showHud();
  };
}
