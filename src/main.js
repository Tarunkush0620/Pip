import './styles/main.css';

// Components
import { renderIntro } from './components/Intro.js';
import { renderNavbar } from './components/Navbar.js';
import { renderHero } from './components/Hero.js';
import { renderMarquee } from './components/Marquee.js';
import { renderAbout } from './components/About.js';
import { renderWorldLore } from './components/WorldLore.js';
import { renderShowcase } from './components/Showcase.js';
import { renderDreamWeaver } from './components/DreamWeaver.js';
import { renderGrowthChart } from './components/GrowthChart.js';
import { renderGuestbook } from './components/Guestbook.js';
import { renderFooter } from './components/Footer.js';

// Interactive Scripts & Three.js
import { initIntroController } from './scripts/introController.js';
import { initCelestialScene } from './three/scene.js';
import { initPipAutonomous3DRoamer } from './three/pipAutonomous3DRoamer.js';
import { nurseryAudio } from './audio/soundEffects.js';
import { initCustomCursor } from './scripts/customCursor.js';
import { initWorldLore } from './scripts/worldLoreController.js';
import { initHorizontalScroll } from './scripts/horizontalScroll.js';
import { initBlocksGame } from './scripts/blocksGame.js';
import { initDreamGenerator } from './scripts/dreamGenerator.js';
import { initGuestbook } from './scripts/guestbook.js';
import { initLanternToggle } from './scripts/lanternToggle.js';
import { initDeliveryMap } from './scripts/deliveryMap.js';
import { initStatsAndGrowth } from './scripts/statsCounter.js';
import { initStorybookController } from './scripts/storybookController.js';
import { initAtmosphericEngine } from './scripts/atmosphericEngine.js';
import { initStardustTrail } from './scripts/stardustTrail.js';
import { initSkyCycle } from './scripts/skyCycleController.js';

function assembleApp() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <!-- Fullscreen Cinematic Intro Video Overlay -->
    ${renderIntro()}

    <!-- Pip's Dynamic Dual Sky Video Background (Dawn ☀️ & Midnight 🌌) -->
    <div id="video-sky-container" class="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <video 
        id="bg-video-dawn"
        src="/assets/videos/Dawn.mp4"
        autoplay 
        loop 
        muted 
        playsinline 
        preload="auto"
        class="bg-video-layer absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src="/assets/videos/Dawn.mp4" type="video/mp4">
        <source src="/Dawn.mp4" type="video/mp4">
      </video>

      <video 
        id="bg-video-midnight"
        src="/assets/videos/midnight.mp4"
        autoplay 
        loop 
        muted 
        playsinline 
        preload="auto"
        class="bg-video-layer absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src="/assets/videos/midnight.mp4" type="video/mp4">
        <source src="/midnight.mp4" type="video/mp4">
      </video>
      <div id="video-sky-overlay" class="absolute inset-0"></div>
    </div>

    <!-- Three.js 3D Celestial Background Container -->
    <div id="three-canvas-container" aria-hidden="true"></div>

    <!-- Atmospheric Sky: Aurora Borealis & Shooting Stars Canvas -->
    <div id="atmospheric-sky-container" class="fixed inset-0 pointer-events-none z-[2] overflow-hidden" aria-hidden="true">
      <div id="aurora-borealis" class="aurora-layer"></div>
      <canvas id="shooting-stars-canvas" class="w-full h-full"></canvas>
    </div>

    <!-- Celestial Twinkling Starfield -->
    <div id="stars" aria-hidden="true"></div>

    <!-- Interactive Stardust Cursor & Tap Trail Canvas -->
    <canvas id="stardust-cursor-canvas" class="fixed inset-0 pointer-events-none z-[9998]"></canvas>

    <!-- Navigation Header -->
    ${renderNavbar()}

    <!-- Main Content -->
    <main class="relative z-10">
      ${renderHero()}
      ${renderMarquee()}
      ${renderAbout()}
      ${renderWorldLore()}
      ${renderShowcase()}
      ${renderDreamWeaver()}
      ${renderGrowthChart()}
      ${renderGuestbook()}
    </main>

    <!-- Elevated Bedtime Footer -->
    ${renderFooter()}
  `;
}

function initInteractions() {
  // 0. Initialize Cinematic Video Intro
  initIntroController();

  // 1. Initialize 3D Three.js Sky Canvas
  initCelestialScene();

  // 1b. Initialize True 3D Three.js Autonomous Pip Roamer (Roams across the whole website)
  initPipAutonomous3DRoamer();

  // 1c. Atmospheric Visuals (Aurora Borealis & Shooting Stars)
  initAtmosphericEngine();

  // 1d. Celestial Starfield Generator & Ambient Mouse Spotlight (Original Pip's Portfolio)
  const starsContainer = document.getElementById('stars');
  if (starsContainer && starsContainer.children.length === 0) {
    for (let i = 0; i < 46; i++) {
      const star = document.createElement('i');
      star.style.cssText = `left:${(Math.random() * 100).toFixed(2)}%;top:${(Math.random() * 100).toFixed(2)}%;animation-delay:${(Math.random() * 3).toFixed(2)}s;transform:scale(${(0.6 + Math.random() * 1.2).toFixed(2)})`;
      starsContainer.appendChild(star);
    }
  }

  // Pointermove interactive spotlight coordinates (--mx, --my)
  window.addEventListener('pointermove', (e) => {
    document.documentElement.style.setProperty('--mx', ((e.clientX / window.innerWidth - 0.5)).toFixed(3));
    document.documentElement.style.setProperty('--my', ((e.clientY / window.innerHeight - 0.5)).toFixed(3));
  }, { passive: true });

  // 2. Custom Stardust Cursor & Tap Trail
  initStardustTrail();

  // 2b. Dynamic Sky Cycle (Dawn ☀️ / Twilight 🌅 / Midnight 🌌)
  initSkyCycle();

  // 3. World Lore Tabs & Lightbox
  initWorldLore();

  // 4. Showcase sticky horizontal scroll slider
  initHorizontalScroll();

  // 4. Toy blocks stacking game
  initBlocksGame();

  // 5. Dream Weaver Laboratory
  initDreamGenerator();

  // 6. Bedtime Whispers Guestbook
  initGuestbook();

  // 7. Lantern lighting & Midnight Nursery mode
  initLanternToggle();

  // 8. Rooftop Delivery Map
  initDeliveryMap();

  // 9. Stats counter & Growth Wall
  initStatsAndGrowth();

  // 9b. Bedtime Storybook Reader & Library
  initStorybookController();

  // 10. Music Box Lullaby & Indian Rhyme Interactive Controls
  const musicBoxBtn = document.getElementById('mb');
  const musicBoxCard = document.getElementById('p1');
  const musicBoxStatus = document.getElementById('music-box-status');
  const trackBtns = document.querySelectorAll('.lullaby-track-btn');
  const currentBadge = document.getElementById('current-song-badge');
  const vizLabel = document.getElementById('viz-label');

  let activeTrack = {
    id: 'lakdi',
    src: '/assets/audio/lakdi_ki_kathi.mp3',
    title: '🪵 Lakdi Ki Kathi (लकड़ी की काठी)',
    badge: 'Classic Rhyme'
  };
  let isMusicPlaying = false;
  let bubbleInterval = null;

  function triggerNoteBubble() {
    const notes = document.querySelectorAll('.note-bubble');
    if (!notes.length) return;
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    if (randomNote) {
      randomNote.style.opacity = '1';
      randomNote.style.transform = `translate(${(Math.random() - 0.5) * 40}px, -${25 + Math.random() * 30}px) scale(${1 + Math.random() * 0.35})`;
      setTimeout(() => {
        randomNote.style.opacity = '0';
        randomNote.style.transform = 'translate(0, 0) scale(1)';
      }, 550);
    }
  }

  function setPlaybackVisuals(playing, trackTitle) {
    isMusicPlaying = playing;
    if (musicBoxBtn) {
      musicBoxBtn.setAttribute('aria-pressed', playing.toString());
      musicBoxBtn.innerHTML = playing
        ? '<span>⏸️</span> <span>Pause music box</span>'
        : '<span>🎵</span> <span>Wind the music box</span>';
    }
    if (musicBoxCard) {
      musicBoxCard.classList.toggle('playing', playing);
    }
    const aura = document.getElementById('music-box-aura');
    const vizBars = document.querySelectorAll('#audio-viz-bars .viz-bar');
    if (aura) aura.classList.toggle('music-box-aura-active', playing);
    vizBars.forEach(bar => bar.classList.toggle('viz-bar-active', playing));

    if (musicBoxStatus) {
      musicBoxStatus.textContent = playing
        ? `Playing: ${trackTitle || activeTrack.title}`
        : `Ready: ${trackTitle || activeTrack.title}`;
    }

    if (playing) {
      if (!bubbleInterval) {
        bubbleInterval = setInterval(triggerNoteBubble, 450);
      }
    } else {
      if (bubbleInterval) {
        clearInterval(bubbleInterval);
        bubbleInterval = null;
      }
    }
  }

  function startActiveTrack() {
    if (activeTrack.src === 'synth') {
      nurseryAudio.stopTrack();
      nurseryAudio.playMusicBoxLoop((note, idx) => {
        triggerNoteBubble();
      });
      setPlaybackVisuals(true, activeTrack.title);
    } else {
      nurseryAudio.stopMusicBox();
      nurseryAudio.playTrack(activeTrack.src, () => {
        setPlaybackVisuals(false, activeTrack.title);
      }).then(() => {
        setPlaybackVisuals(true, activeTrack.title);
      }).catch(() => {
        setPlaybackVisuals(false, activeTrack.title);
      });
    }
  }

  function pauseActiveTrack() {
    if (activeTrack.src === 'synth') {
      nurseryAudio.stopMusicBox();
    } else {
      nurseryAudio.pauseTrack();
    }
    setPlaybackVisuals(false, activeTrack.title);
  }

  // Handle Song Track Selection from Playlist
  trackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      nurseryAudio.playChime('E5');
      trackBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const id = btn.getAttribute('data-id');
      const src = btn.getAttribute('data-src');
      const title = btn.getAttribute('data-title') || btn.querySelector('.track-name')?.textContent || 'Lullaby';
      const badge = btn.getAttribute('data-badge') || 'Playing';

      activeTrack = { id, src, title, badge };
      if (currentBadge) currentBadge.textContent = badge;
      if (vizLabel) vizLabel.textContent = id === 'brahms' ? 'Chime Waves' : 'Rhyme Waves';

      if (isMusicPlaying) {
        startActiveTrack();
      } else {
        if (musicBoxStatus) {
          musicBoxStatus.textContent = `Ready: ${title}`;
        }
      }
    });
  });

  if (musicBoxBtn && musicBoxCard) {
    musicBoxBtn.addEventListener('click', () => {
      if (isMusicPlaying) {
        pauseActiveTrack();
      } else {
        startActiveTrack();
      }
    });
  }

  // 11. Ambient sound waves toggle in Navbar
  const ambientToggle = document.getElementById('ambient-sound-toggle');
  const soundLabel = document.getElementById('sound-label');
  if (ambientToggle) {
    let ambientActive = false;
    ambientToggle.addEventListener('click', () => {
      ambientActive = !ambientActive;
      const isNowPlaying = nurseryAudio.toggleAmbient(ambientActive);
      ambientToggle.setAttribute('aria-pressed', isNowPlaying.toString());
      ambientToggle.classList.toggle('bg-berry', isNowPlaying);
      ambientToggle.classList.toggle('text-white', isNowPlaying);
      if (soundLabel) {
        soundLabel.textContent = isNowPlaying ? 'Night Breeze On' : 'Lullaby Waves';
      }
    });
  }

  // 11b. Mobile Navigation Drawer Toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileMenuIcon = document.getElementById('mobile-menu-icon');
  if (mobileMenuToggle && mobileMenuDrawer) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = mobileMenuDrawer.classList.contains('hidden');
      if (isHidden) {
        mobileMenuDrawer.classList.remove('hidden');
        mobileMenuDrawer.classList.add('flex');
        if (mobileMenuIcon) mobileMenuIcon.textContent = '✕';
      } else {
        mobileMenuDrawer.classList.add('hidden');
        mobileMenuDrawer.classList.remove('flex');
        if (mobileMenuIcon) mobileMenuIcon.textContent = '☰';
      }
    });

    mobileMenuDrawer.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenuDrawer.classList.add('hidden');
        mobileMenuDrawer.classList.remove('flex');
        if (mobileMenuIcon) mobileMenuIcon.textContent = '☰';
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenuDrawer.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenuDrawer.classList.add('hidden');
        mobileMenuDrawer.classList.remove('flex');
        if (mobileMenuIcon) mobileMenuIcon.textContent = '☰';
      }
    });
  }

  // 12. Sprinkle Stardust summon button in Hero
  const stardustBtn = document.getElementById('summon-stardust-btn');
  if (stardustBtn) {
    stardustBtn.addEventListener('click', () => {
      nurseryAudio.playChime('C5');
      const rect = stardustBtn.getBoundingClientRect();
      for (let i = 0; i < 18; i++) {
        const star = document.createElement('span');
        star.textContent = ['✦', '✧', '★', '⭐', '✨'][Math.floor(Math.random() * 5)];
        star.className = 'fixed pointer-events-none text-2xl z-50 select-none';
        star.style.left = `${rect.left + rect.width / 2}px`;
        star.style.top = `${rect.top + rect.height / 2}px`;
        star.style.color = Math.random() > 0.5 ? '#F4D77B' : '#FBDCE6';
        star.style.transition = 'all 1s cubic-bezier(0.2, 0.9, 0.3, 1)';
        document.body.appendChild(star);

        const angle = Math.random() * Math.PI * 2;
        const dist = 60 + Math.random() * 120;
        requestAnimationFrame(() => {
          star.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
          star.style.opacity = '0';
        });

        setTimeout(() => star.remove(), 1000);
      }
    });
  }

  // 12b. Global Background Dream Sky Video Playback & Pip Authentic Voice
  // 12b. Global Background Dual Dream Sky Video Playback (Dawn.mp4 & midnight.mp4)
  const videoDawn = document.getElementById('bg-video-dawn');
  const videoMidnight = document.getElementById('bg-video-midnight');

  const setupBgVideo = (v) => {
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.loop = true;
    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const playOnFirstTouch = () => {
          v.play().catch(() => { });
        };
        window.addEventListener('pointerdown', playOnFirstTouch, { once: true, passive: true });
        window.addEventListener('touchstart', playOnFirstTouch, { once: true, passive: true });
      });
    }
  };

  setupBgVideo(videoDawn);
  setupBgVideo(videoMidnight);

  // Pip Voice Greeting Trigger (Plays the authentic voice greeting from the uploaded video)
  const pipVoiceBtn = document.getElementById('pip-voice-btn');
  const pipAvatarTrigger = document.getElementById('pip-hero-avatar-trigger');
  const pipHeroTitle = document.getElementById('hero-title');
  const speechBubble = document.getElementById('pip-speech-bubble');
  let pipVoiceAudio = null;

  function triggerPipVoiceGreeting() {
    if (!pipVoiceAudio) {
      pipVoiceAudio = new Audio('/assets/videos/pip_dream_backdrop.mp4');
    }
    pipVoiceAudio.currentTime = 0;
    pipVoiceAudio.volume = 0.95;
    pipVoiceAudio.play().catch(() => { });

    if (speechBubble) {
      speechBubble.style.opacity = '1';
      speechBubble.style.transform = 'translate(-50%, -10px) scale(1)';
      setTimeout(() => {
        speechBubble.style.opacity = '0';
        speechBubble.style.transform = 'translate(-50%, 0) scale(0.9)';
      }, 5500);
    }

    const voiceIcon = document.getElementById('pip-voice-icon');
    const voiceText = document.getElementById('pip-voice-text');
    if (voiceIcon && voiceText) {
      voiceIcon.textContent = '💖';
      voiceText.textContent = 'Pip is speaking!';
      setTimeout(() => {
        voiceIcon.textContent = '🔊';
        voiceText.textContent = 'Hear Pip’s Voice';
      }, 5500);
    }
  }

  if (pipVoiceBtn) pipVoiceBtn.addEventListener('click', triggerPipVoiceGreeting);
  if (pipAvatarTrigger) pipAvatarTrigger.addEventListener('click', triggerPipVoiceGreeting);
  if (pipHeroTitle) pipHeroTitle.addEventListener('click', triggerPipVoiceGreeting);
  const polaroid = document.getElementById('card');
  if (polaroid) {
    polaroid.addEventListener('pointermove', (e) => {
      const rect = polaroid.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      polaroid.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.02)`;
    });
    polaroid.addEventListener('pointerleave', () => {
      polaroid.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
    });
    polaroid.addEventListener('click', triggerPipVoiceGreeting);
  }

  // 13.5 Character Dossier, Toolbelt & Bedtime Story Interactivity
  const traitChips = document.querySelectorAll('.trait-chip');
  traitChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const soundKey = chip.getAttribute('data-sound') || 'E5';
      const freq = nurseryAudio.NOTES[soundKey] || 523.25;
      nurseryAudio.playBell(freq, null, 0.85);

      const rect = chip.getBoundingClientRect();
      const spark = document.createElement('span');
      spark.textContent = '✨';
      spark.className = 'fixed pointer-events-none text-sm z-50 select-none';
      spark.style.left = `${rect.left + rect.width / 2}px`;
      spark.style.top = `${rect.top}px`;
      spark.style.transition = 'all 0.6s cubic-bezier(0.2, 0.9, 0.3, 1)';
      document.body.appendChild(spark);
      requestAnimationFrame(() => {
        spark.style.transform = `translate(${(Math.random() - 0.5) * 30}px, -35px) scale(1.4)`;
        spark.style.opacity = '0';
      });
      setTimeout(() => spark.remove(), 600);
    });
  });

  const toolbeltCards = document.querySelectorAll('.toolbelt-card');
  toolbeltCards.forEach((card) => {
    card.addEventListener('click', () => {
      const soundKey = card.getAttribute('data-sound') || 'C5';
      const freq = nurseryAudio.NOTES[soundKey] || 523.25;
      nurseryAudio.playBell(freq, null, 0.9);
      setTimeout(() => {
        nurseryAudio.playBell(freq * 1.5, null, 0.45);
      }, 140);
    });
  });

  // Story Narration with Speech Synthesis
  const storyNarrateBtn = document.getElementById('story-narrate-btn');
  const storyNarrateIcon = document.getElementById('story-narrate-icon');
  const storyNarrateText = document.getElementById('story-narrate-text');
  let isStoryNarrating = false;

  if (storyNarrateBtn) {
    storyNarrateBtn.addEventListener('click', () => {
      if (!('speechSynthesis' in window)) {
        nurseryAudio.playPipGiggle();
        alert('Pip says: Speech synthesis is not supported in this browser, but the lullaby bells are playing for you! ✨');
        return;
      }

      if (isStoryNarrating) {
        window.speechSynthesis.cancel();
        isStoryNarrating = false;
        if (storyNarrateIcon) storyNarrateIcon.textContent = '🔊';
        if (storyNarrateText) storyNarrateText.textContent = 'Read Story Aloud';
        storyNarrateBtn.classList.remove('ring-2', 'ring-pink-500', 'animate-pulse');
        return;
      }

      window.speechSynthesis.cancel();
      nurseryAudio.playBell(nurseryAudio.NOTES.C5, null, 0.85);
      setTimeout(() => nurseryAudio.playBell(nurseryAudio.NOTES.E5, null, 0.85), 180);

      const storyText =
        'Why Did Pip Build This Nursery? ' +
        'One twilight in Somnia, Pip peered through his starlight telescope down at Earth. ' +
        'In the quiet nurseries below, little babies were crying in the dark. The silence felt too loud, the shadows seemed scary, and exhausted parents were pacing the floor at two in the morning. ' +
        'Pip hated silence and could not bear to see anyone cry. So he rolled up his nightgown sleeves and engineered this enchanted haven to turn bedtime into a peaceful, giggle-filled adventure for both babies and parents. ' +
        'Pip reminds us: No baby should ever be afraid of the quiet, and no tired parent should have to walk the hallway alone!';

      const utterance = new SpeechSynthesisUtterance(storyText);
      utterance.pitch = 1.15;
      utterance.rate = 0.88;

      const voices = window.speechSynthesis.getVoices();
      const friendlyVoice = voices.find(
        (v) =>
          (v.name.includes('Natural') ||
            v.name.includes('Google') ||
            v.name.includes('Samantha') ||
            v.lang.startsWith('en')) &&
          !v.name.includes('David')
      );
      if (friendlyVoice) utterance.voice = friendlyVoice;

      utterance.onstart = () => {
        isStoryNarrating = true;
        if (storyNarrateIcon) storyNarrateIcon.textContent = '⏸️';
        if (storyNarrateText) storyNarrateText.textContent = 'Pause Reading';
        storyNarrateBtn.classList.add('ring-2', 'ring-pink-500', 'animate-pulse');
      };

      utterance.onend = () => {
        isStoryNarrating = false;
        if (storyNarrateIcon) storyNarrateIcon.textContent = '🔊';
        if (storyNarrateText) storyNarrateText.textContent = 'Read Story Aloud';
        storyNarrateBtn.classList.remove('ring-2', 'ring-pink-500', 'animate-pulse');
        nurseryAudio.playPipGiggle();
      };

      utterance.onerror = () => {
        isStoryNarrating = false;
        if (storyNarrateIcon) storyNarrateIcon.textContent = '🔊';
        if (storyNarrateText) storyNarrateText.textContent = 'Read Story Aloud';
        storyNarrateBtn.classList.remove('ring-2', 'ring-pink-500', 'animate-pulse');
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  // Baby Sleep Chime Demo Button
  const babyChimeBtn = document.getElementById('btn-demo-baby-chime');
  if (babyChimeBtn) {
    babyChimeBtn.addEventListener('click', () => {
      const notes = ['C4', 'E4', 'G4', 'C5'];
      notes.forEach((note, i) => {
        setTimeout(() => {
          nurseryAudio.playBell(nurseryAudio.NOTES[note], null, 0.9);
        }, i * 220);
      });

      const rect = babyChimeBtn.getBoundingClientRect();
      for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        star.textContent = ['👶', '✨', '🍼', '💖', '⭐'][i];
        star.className = 'fixed pointer-events-none text-lg z-50 select-none';
        star.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 50}px`;
        star.style.top = `${rect.top}px`;
        star.style.transition = 'all 0.8s cubic-bezier(0.2, 0.9, 0.3, 1)';
        document.body.appendChild(star);

        requestAnimationFrame(() => {
          star.style.transform = `translate(${(Math.random() - 0.5) * 50}px, -${40 + Math.random() * 30}px) scale(1.3)`;
          star.style.opacity = '0';
        });

        setTimeout(() => star.remove(), 800);
      }
    });
  }

  // Parent Calming Rain Demo Button
  const parentRainBtn = document.getElementById('btn-demo-parent-rain');
  const parentRainLabel = document.getElementById('parent-rain-btn-label');
  let isParentRainPlaying = false;
  if (parentRainBtn) {
    parentRainBtn.addEventListener('click', () => {
      isParentRainPlaying = !isParentRainPlaying;
      nurseryAudio.toggleRain(isParentRainPlaying);
      if (parentRainLabel) {
        parentRainLabel.textContent = isParentRainPlaying ? 'Stop Calming Rain 🌧️' : 'Sample Calming Rain';
      }
      parentRainBtn.classList.toggle('ring-2', isParentRainPlaying);
      parentRainBtn.classList.toggle('ring-amber-500', isParentRainPlaying);
      parentRainBtn.classList.toggle('bg-amber-500', isParentRainPlaying);
      parentRainBtn.classList.toggle('text-white', isParentRainPlaying);
    });
  }

  // Sprinkle Dream Dust Button
  const aboutStardustBtn = document.getElementById('about-stardust-btn');
  if (aboutStardustBtn) {
    aboutStardustBtn.addEventListener('click', () => {
      nurseryAudio.playPipGiggle();
      const storyCard = document.getElementById('story-behind-card') || aboutStardustBtn;
      const rect = storyCard.getBoundingClientRect();
      for (let i = 0; i < 16; i++) {
        const star = document.createElement('span');
        star.textContent = ['✨', '⭐', '🌟', '🌙', '💫', '💖'][Math.floor(Math.random() * 6)];
        star.className = 'fixed pointer-events-none text-base z-50 select-none';
        star.style.left = `${rect.left + Math.random() * rect.width}px`;
        star.style.top = `${rect.top + Math.random() * rect.height}px`;
        star.style.transition = 'all 1.2s cubic-bezier(0.2, 0.9, 0.3, 1)';
        document.body.appendChild(star);

        requestAnimationFrame(() => {
          star.style.transform = `translate(${(Math.random() - 0.5) * 100}px, -${50 + Math.random() * 60}px) scale(${1 + Math.random() * 0.8})`;
          star.style.opacity = '0';
        });

        setTimeout(() => star.remove(), 1200);
      }
    });
  }

  // 14. Illuminated Statement Scroll Reader
  const stmt = document.getElementById('stmt');
  if (stmt) {
    const words = stmt.querySelectorAll('.statement-word');
    function checkWords() {
      const rect = stmt.getBoundingClientRect();
      const triggerY = window.innerHeight * 0.75;
      const progress = Math.max(0, Math.min(1, (triggerY - rect.top) / (rect.height + window.innerHeight * 0.3)));
      const count = Math.floor(progress * words.length);
      words.forEach((w, idx) => {
        w.classList.toggle('is-active', idx <= count);
      });
    }
    window.addEventListener('scroll', checkWords, { passive: true });
    checkWords();
  }

  // 15. Sleeping Pip Bedtime Vignette Interaction
  const sleepingPip = document.getElementById('sleeping-pip-card');
  const pipStatus = document.getElementById('sleeping-pip-status');
  if (sleepingPip) {
    sleepingPip.addEventListener('click', () => {
      nurseryAudio.playPipGiggle();
      if (pipStatus) {
        pipStatus.textContent = 'Pip giggled in his sleep and cuddled his teddy! 🧸✨';
        setTimeout(() => {
          pipStatus.textContent = 'Tap Pip gently to tuck him in under the cloud quilt ✨';
        }, 3500);
      }
      const rect = sleepingPip.getBoundingClientRect();
      for (let i = 0; i < 6; i++) {
        const heart = document.createElement('span');
        heart.textContent = ['💤', '✨', '💖', '🧸', '⭐'][Math.floor(Math.random() * 5)];
        heart.className = 'fixed pointer-events-none text-xl z-50 select-none';
        heart.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 60}px`;
        heart.style.top = `${rect.top + 20}px`;
        heart.style.transition = 'all 0.9s cubic-bezier(0.2, 0.9, 0.3, 1)';
        document.body.appendChild(heart);

        requestAnimationFrame(() => {
          heart.style.transform = `translate(${(Math.random() - 0.5) * 60}px, -${50 + Math.random() * 40}px) scale(1.3)`;
          heart.style.opacity = '0';
        });

        setTimeout(() => heart.remove(), 900);
      }
    });
  }

  // 16. Footer Bedtime Soundboard
  const setupSoundBtn = (btnId, toggleFn) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    let active = false;
    btn.addEventListener('click', () => {
      active = !active;
      const isPlaying = toggleFn(active);
      btn.classList.toggle('is-active', isPlaying);
      btn.classList.toggle('is-playing', isPlaying);
      btn.classList.toggle('bg-moon', isPlaying);
      btn.classList.toggle('text-plum', isPlaying);
      btn.classList.toggle('border-moon', isPlaying);
      btn.setAttribute('aria-pressed', isPlaying.toString());
      const statusText = btn.querySelector('.status-text');
      if (statusText) statusText.textContent = isPlaying ? 'Playing' : 'Off';
    });
  };

  setupSoundBtn('sound-btn-lullaby', (act) => {
    if (act) {
      startActiveTrack();
      return true;
    } else {
      pauseActiveTrack();
      return false;
    }
  });
  setupSoundBtn('sound-btn-rain', (act) => nurseryAudio.toggleRain(act));
  setupSoundBtn('sound-btn-crickets', (act) => nurseryAudio.toggleCrickets(act));
  setupSoundBtn('sound-btn-breeze', (act) => nurseryAudio.toggleAmbient(act));

  // 17. Live Countdown Ticker for Dream Dispatch
  const countdownEl = document.getElementById('dream-countdown');
  if (countdownEl) {
    let secondsLeft = 6135;
    setInterval(() => {
      secondsLeft = secondsLeft > 0 ? secondsLeft - 1 : 7200;
      const h = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
      const m = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
      const s = String(secondsLeft % 60).padStart(2, '0');
      countdownEl.textContent = `${h}:${m}:${s}`;
    }, 1000);
  }
}

// Launch application on DOM ready with strict single-execution guard
let appStarted = false;
function startPipApp() {
  if (appStarted) return;
  appStarted = true;
  assembleApp();
  initInteractions();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startPipApp);
} else {
  startPipApp();
}
