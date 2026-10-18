import { nurseryAudio } from '../audio/soundEffects.js';
import { WORLD_LORE_DATA } from '../data/worldData.js';
import { livingArtEngine } from './livingArtEngine.js';

export function initWorldLore() {
  const tabButtons = document.querySelectorAll('.world-tab-btn');
  const panels = {
    somnia: document.getElementById('panel-somnia'),
    town: document.getElementById('panel-town'),
    neighborhood: document.getElementById('panel-neighborhood'),
  };

  const lightbox = document.getElementById('world-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('close-lightbox-btn');
  const viewers = document.querySelectorAll('.world-image-viewer');
  const landmarkChips = document.querySelectorAll('.landmark-chip');
  const hotspotZones = document.querySelectorAll('.map-hotspot-zone');
  const toggleGuideButtons = document.querySelectorAll('.toggle-guides-btn');

  // Teleport lightbox to body so it displays above header without stacking context clipping
  if (lightbox && lightbox.parentNode !== document.body) {
    document.body.appendChild(lightbox);
  }

  // Active world tracker
  let currentActiveWorld = 'somnia';

  // 1. Tab Switching Functionality
  function switchTab(target) {
    if (!target || !panels[target]) return;
    currentActiveWorld = target;
    nurseryAudio.playChime('C5');

    // Update button styles
    tabButtons.forEach((b) => {
      const isActive = b.dataset.tab === target;
      b.classList.toggle('active', isActive);
      b.classList.toggle('btn-berry', isActive);
      b.classList.toggle('text-white', isActive);
      b.classList.toggle('shadow-md', isActive);
      b.classList.toggle('text-ink', !isActive);
    });

    // Update panel visibility
    Object.keys(panels).forEach((key) => {
      const p = panels[key];
      if (p) {
        if (key === target) {
          p.classList.remove('hidden');
          requestAnimationFrame(() => {
            p.classList.add('opacity-100');
            p.classList.remove('opacity-0');
          });
        } else {
          p.classList.add('hidden', 'opacity-0');
          p.classList.remove('opacity-100');
        }
      }
    });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Activate default tab
  const defaultTab = document.querySelector('.world-tab-btn[data-tab="somnia"]');
  if (defaultTab) {
    defaultTab.classList.add('btn-berry', 'text-white', 'shadow-md');
  }

  // 2. Sound Player by Category
  function playSoundForCategory(soundType) {
    switch (soundType) {
      case 'train':
        nurseryAudio.playTrainWhistle();
        break;
      case 'water':
        nurseryAudio.playWaterDrop();
        break;
      case 'pastry':
        nurseryAudio.playPastryDing();
        break;
      case 'wish':
        nurseryAudio.playWishSparkle();
        break;
      case 'telescope':
        nurseryAudio.playTelescopeClick();
        break;
      case 'knock':
        nurseryAudio.playKnock();
        break;
      case 'lullaby':
        nurseryAudio.playBell(523.25, null, 0.85);
        break;
      case 'giggle':
        nurseryAudio.playPipGiggle();
        break;
      case 'bell':
        nurseryAudio.playBell(659.25, null, 0.75);
        break;
      case 'chime':
      default:
        nurseryAudio.playChime('E5');
        break;
    }
  }

  // 3. Stardust Burst Particle Spawner on Picture Click
  function spawnClickBurst(container, xPercent, yPercent, symbolChar = '✨') {
    if (!container) return;
    const burstCount = 14;
    const symbols = [symbolChar, '✦', '✧', '⭐', '✨'];

    for (let i = 0; i < burstCount; i++) {
      const sparkle = document.createElement('span');
      sparkle.className = 'map-click-sparkle';
      sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      sparkle.style.left = `${xPercent}%`;
      sparkle.style.top = `${yPercent}%`;
      
      const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.4;
      const distance = 30 + Math.random() * 50;
      const dx = `${Math.cos(angle) * distance}px`;
      const dy = `${Math.sin(angle) * distance}px`;
      const rot = `${(Math.random() - 0.5) * 180}deg`;

      sparkle.style.setProperty('--dx', dx);
      sparkle.style.setProperty('--dy', dy);
      sparkle.style.setProperty('--rot', rot);
      sparkle.style.color = Math.random() > 0.4 ? '#FCE183' : '#FFB5D0';

      container.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 900);
    }
  }

  // 4. Special Visual Effects (Steam Puff, Water Ripple)
  function triggerSpecialEffect(container, lm) {
    if (!container || !lm) return;

    if (lm.actionEffect === 'train_puff') {
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          const puff = document.createElement('div');
          puff.className = 'steam-puff-element';
          puff.style.left = `${lm.x - 3 + (Math.random() - 0.5) * 4}%`;
          puff.style.top = `${lm.y - 2 + (Math.random() - 0.5) * 4}%`;
          puff.style.width = `${22 + Math.random() * 16}px`;
          puff.style.height = `${22 + Math.random() * 16}px`;
          container.appendChild(puff);
          setTimeout(() => puff.remove(), 1250);
        }, i * 180);
      }
    } else if (lm.actionEffect === 'wish_ripples' || lm.actionEffect === 'fountain_splash') {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const rip = document.createElement('div');
          rip.className = 'water-ripple-element';
          rip.style.left = `${lm.x}%`;
          rip.style.top = `${lm.y}%`;
          container.appendChild(rip);
          setTimeout(() => rip.remove(), 1450);
        }, i * 280);
      }
    }
  }

  // 5. Select & Focus Landmark Function
  function selectLandmark(worldId, landmarkId, playSound = true) {
    const world = WORLD_LORE_DATA[worldId];
    if (!world) return;
    const lm = world.landmarks.find((l) => l.id === landmarkId);
    if (!lm) return;

    const panel = panels[worldId];
    if (!panel) return;

    if (playSound) {
      playSoundForCategory(lm.sound);
    }

    const container = panel.querySelector('.map-visual-container');
    if (container && playSound) {
      spawnClickBurst(container, lm.x, lm.y, '✦');
      triggerSpecialEffect(container, lm);
    }

    // Update Spotlight on Picture
    panel.querySelectorAll('.map-hotspot-zone').forEach((zone) => {
      zone.classList.toggle('is-active', zone.dataset.landmarkId === landmarkId);
    });

    // Update Chips in Sidebar
    panel.querySelectorAll('.landmark-chip').forEach((chip) => {
      const isMatch = chip.dataset.landmarkId === landmarkId;
      chip.classList.toggle('ring-2', isMatch);
      chip.classList.toggle('ring-berry', isMatch);
      chip.classList.toggle('bg-berry/20', isMatch);
    });

    // Update Active Landmark Card in Sidebar
    const card = panel.querySelector(`.active-landmark-card[data-world="${worldId}"]`);
    if (card) {
      const titleEl = card.querySelector('.active-lm-title');
      const subtitleEl = card.querySelector('.active-lm-subtitle');
      const emojiEl = card.querySelector('.active-lm-emoji');
      const loreEl = card.querySelector('.active-lm-lore');
      const secretEl = card.querySelector('.active-secret-text');
      const actionBtn = card.querySelector('.active-action-btn');
      const actionIcon = card.querySelector('.active-action-icon');
      const actionLabel = card.querySelector('.active-action-label');
      const feedbackEl = card.querySelector('.active-feedback-status');

      if (titleEl) titleEl.textContent = lm.name;
      if (subtitleEl) subtitleEl.textContent = lm.subtitle;
      if (emojiEl) emojiEl.textContent = lm.emoji;
      if (loreEl) loreEl.textContent = lm.lore;
      if (secretEl) secretEl.textContent = lm.funFact;
      if (feedbackEl) feedbackEl.textContent = '';

      if (actionBtn && actionLabel) {
        actionLabel.textContent = lm.actionLabel;
        if (actionIcon) actionIcon.textContent = lm.emoji;

        // Clone button to refresh click handlers cleanly
        const newBtn = actionBtn.cloneNode(true);
        actionBtn.parentNode.replaceChild(newBtn, actionBtn);

        newBtn.addEventListener('click', () => {
          playSoundForCategory(lm.sound);
          if (container) {
            spawnClickBurst(container, lm.x, lm.y, '✨');
            triggerSpecialEffect(container, lm);
          }

          const fb = card.querySelector('.active-feedback-status');
          if (fb) {
            if (lm.actionEffect === 'switch_to_town') {
              fb.textContent = 'Traveling to Moonberry Hollow... 🌙';
              setTimeout(() => switchTab('town'), 600);
            } else if (lm.actionEffect === 'train_puff') {
              fb.textContent = 'Steam whistle echoing across Somnia! 🚂💨';
            } else if (lm.actionEffect === 'pastry_sparkles') {
              fb.textContent = 'Fresh cinnamon moon pastries are ready! 🥐✨';
            } else if (lm.actionEffect === 'wish_ripples') {
              fb.textContent = 'Your bedtime wish was sent to the Moon! 💫';
            } else if (lm.actionEffect === 'telescope_stars') {
              fb.textContent = 'Spotted the Great Cloud Bear constellation! 🔭🐻';
            } else if (lm.actionEffect === 'cottage_knock') {
              fb.textContent = 'Pip: "Come in! The chamomile tea is nice & warm." 🍵';
            } else if (lm.actionEffect === 'sheep_zzz') {
              fb.textContent = '1... 2... 3 sheep counted. Zzz... sweet dreams! 💤';
            } else if (lm.actionEffect === 'bunny_hearts') {
              fb.textContent = 'The moon bunny gently wiggled its ears at you! 🐰💕';
            } else {
              fb.textContent = 'Stardust sparkles gathered in your jar! ✨';
            }
          }
        });
      }
    }
  }

  // 6. Bind Hotspot Zone Clicks Directly on the Picture
  hotspotZones.forEach((zone) => {
    zone.addEventListener('click', (e) => {
      e.stopPropagation();
      const worldId = zone.dataset.world;
      const landmarkId = zone.dataset.landmarkId;
      selectLandmark(worldId, landmarkId, true);
    });
  });

  // 7. Bind Sidebar Chips to Focus Hotspots
  landmarkChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const worldId = chip.dataset.world;
      const landmarkId = chip.dataset.landmarkId;
      if (worldId && landmarkId) {
        if (currentActiveWorld !== worldId) {
          switchTab(worldId);
        }
        selectLandmark(worldId, landmarkId, true);
      }
    });

    // Hover sync: highlight spotlight on the picture when hovering the chip
    chip.addEventListener('mouseenter', () => {
      const landmarkId = chip.dataset.landmarkId;
      const targetZone = document.querySelector(`.map-hotspot-zone[data-landmark-id="${landmarkId}"]`);
      if (targetZone) {
        targetZone.classList.add('is-active');
      }
    });

    chip.addEventListener('mouseleave', () => {
      const landmarkId = chip.dataset.landmarkId;
      const targetZone = document.querySelector(`.map-hotspot-zone[data-landmark-id="${landmarkId}"]`);
      // Only remove if not the currently active landmark
      const activeCard = document.querySelector(`.active-landmark-card[data-world="${currentActiveWorld}"]`);
      const currentTitle = activeCard?.querySelector('.active-lm-title')?.textContent;
      const targetLm = WORLD_LORE_DATA[currentActiveWorld]?.landmarks.find((l) => l.id === landmarkId);
      if (targetZone && targetLm?.name !== currentTitle) {
        targetZone.classList.remove('is-active');
      }
    });
  });

  // 8. Toggle Guide Sparkles (ON / OFF)
  toggleGuideButtons.forEach((btn) => {
    let guidesVisible = true;
    btn.addEventListener('click', () => {
      guidesVisible = !guidesVisible;
      const panel = btn.closest('.world-content-panel');
      if (panel) {
        panel.classList.toggle('hide-map-guides', !guidesVisible);
        const label = btn.querySelector('.guide-btn-label');
        if (label) {
          label.textContent = guidesVisible ? 'Guides: On' : 'Guides: Off';
        }
        btn.classList.toggle('bg-berry', !guidesVisible);
        btn.classList.toggle('text-white', !guidesVisible);
      }
      nurseryAudio.playChime('G4');
    });
  });

  // 9. Initial Default Action Buttons Wiring
  document.querySelectorAll('.active-action-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.active-landmark-card');
      const worldId = card?.dataset.world;
      const sound = btn.dataset.sound || 'chime';
      const action = btn.dataset.action;
      const x = parseFloat(btn.dataset.x) || 50;
      const y = parseFloat(btn.dataset.y) || 50;

      playSoundForCategory(sound);
      const panel = panels[worldId];
      const container = panel?.querySelector('.map-visual-container');
      if (container) {
        spawnClickBurst(container, x, y, '✨');
        triggerSpecialEffect(container, { actionEffect: action, x, y });
      }

      const fb = card?.querySelector('.active-feedback-status');
      if (fb) {
        fb.textContent = '✨ Sparkles & magic gathered in your jar!';
      }
    });
  });

  // 10. Start Living Dreamworld Art Engines for continuous animations
  // (train steam, chimney smoke, water ripples, shooting stars, 2.5D tilt, and fireflies)
  document.querySelectorAll('.map-visual-container').forEach((container) => {
    const worldId = container.dataset.world;
    if (worldId) {
      livingArtEngine.init(container, worldId);
    }
  });

  // 11. Lightbox Modal for Full Resolution Art Inspection
  viewers.forEach((viewer) => {
    viewer.addEventListener('click', () => {
      const src = viewer.dataset.src;
      const title = viewer.dataset.title;
      if (src && lightbox && lightboxImg) {
        nurseryAudio.playChime('E5');
        lightboxImg.src = src;
        if (lightboxCaption) lightboxCaption.textContent = title || '';
        lightbox.classList.remove('opacity-0', 'pointer-events-none');
        lightbox.classList.add('opacity-100');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.add('opacity-0', 'pointer-events-none');
      lightbox.classList.remove('opacity-100');
      document.body.style.overflow = '';
    }
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.id === 'close-lightbox-btn') {
        closeLightbox();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}
