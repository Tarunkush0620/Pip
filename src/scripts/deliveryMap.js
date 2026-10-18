import { nurseryAudio } from '../audio/soundEffects.js';

export function initDeliveryMap() {
  const waypoints = document.querySelectorAll('.delivery-waypoint');
  const stepBtns = document.querySelectorAll('.delivery-step-btn');
  const dispatchBtn = document.getElementById('dispatch-cloud-btn');
  const dispatchBtnText = document.getElementById('dispatch-btn-text');
  const quickCycleBtn = document.getElementById('quick-cycle-btn');
  const soundChimeBtn = document.getElementById('sound-chime-btn');
  const craft = document.getElementById('pip-delivery-craft');
  const pathCurve = document.getElementById('flightPathCurve');
  const telemetryAlt = document.getElementById('map-telemetry-alt');
  const statusTag = document.getElementById('route-status-tag');
  const progressFill = document.getElementById('delivery-progress-fill');
  const progressText = document.getElementById('delivery-progress-text');
  const svgMap = document.getElementById('dream-route-svg');

  // Manifest DOM elements
  const manifestIcon = document.getElementById('manifest-icon');
  const manifestName = document.getElementById('manifest-name');
  const manifestSub = document.getElementById('manifest-sub');
  const manifestBadge = document.getElementById('manifest-status-badge');
  const manifestNote = document.getElementById('manifest-note');
  const manifestGrid = document.getElementById('manifest-cargo-grid');

  if (!waypoints.length || !craft || !pathCurve) return;

  const totalLength = pathCurve.getTotalLength();
  const stopList = ['moon', 'sleepy', 'spire', 'cloud'];
  let currentStopIndex = 0;
  let isTourRunning = false;
  let currentT = 0.0;
  let flightAnimId = null;

  const stopData = {
    moon: {
      name: 'Moon Lane',
      icon: '🌙',
      sub: 'Cottage District · Stop 1 of 4',
      badge: '✓ Delivered',
      alt: '120m',
      t: 0.0,
      pitch: 'C5',
      note: '"Mrs. Whisker-Mouse requested extra-fluffy blankets with zero squeaking. Pip padded all floorboards with spun-cloud fleece."',
      cargo: [
        ['☁️', '18 Spun-Cloud Duvets'],
        ['🎵', '4 Lavender Lullabies'],
        ['🍯', '2 Jars Firefly Glow'],
        ['🧸', '6 Starlight Teddies'],
      ],
    },
    sleepy: {
      name: 'Sleepy Hollow',
      icon: '🏡',
      sub: 'Lavender Valley · Stop 2 of 4',
      badge: '✓ Delivered',
      alt: '210m',
      t: 0.32,
      pitch: 'E5',
      note: '"The entire Bramble-Hedge dormouse family was yawning. Pip served warm chamomile dew and read three cozy bedtime fables."',
      cargo: [
        ['🍵', '24 Cups Chamomile Dew'],
        ['🪶', '12 Downy Feather Pillows'],
        ['📖', '3 Bedtime Fables'],
        ['🕯️', '8 Star Nightlights'],
      ],
    },
    spire: {
      name: 'Starwhisper Spire',
      icon: '⏰',
      sub: 'Observatory Clocktower · Stop 3 of 4',
      badge: '✓ Delivered',
      alt: '340m',
      t: 0.65,
      pitch: 'G5',
      note: '"The town clock needed chime damping so the hollow could sleep. Pip lubricated the pendulum gears with cloud oil."',
      cargo: [
        ['🧈', '4 Flasks Cloud Oil'],
        ['🔔', '1 Velvet Chime Mute'],
        ['🔭', '1 Polished Star Lens'],
        ['☕', '2 Midnight Cocoas'],
      ],
    },
    cloud: {
      name: 'Cloud Court',
      icon: '🏰',
      sub: 'High Cloud Pavilion · Stop 4 of 4',
      badge: '✓ Delivered',
      alt: '520m',
      t: 1.0,
      pitch: 'C6',
      note: '"Restocked the celestial slumber loom with rainbow silk. Sky lambs counted to 100 and immediately fell into sweet dreams."',
      cargo: [
        ['🧶', '15 Spools Aurora Thread'],
        ['☁️', '9 Heavy-Duty Sleep Clouds'],
        ['🎶', '1 Enchanted Harp Score'],
        ['🌈', '5 Prism Dreamcatchers'],
      ],
    },
  };

  // Trailing stardust sparkles during flight
  function spawnTrailSparkle(x, y) {
    if (!svgMap) return;
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const colors = ['#F4D77B', '#FFB3C6', '#CDB8E3', '#FFF6EF'];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];
    const offsetX = (Math.random() - 0.5) * 8;
    const offsetY = (Math.random() - 0.5) * 8;

    circle.setAttribute('cx', String(x + offsetX));
    circle.setAttribute('cy', String(y + offsetY));
    circle.setAttribute('r', '2.2');
    circle.setAttribute('fill', chosenColor);
    circle.setAttribute('opacity', '0.9');
    circle.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    circle.style.pointerEvents = 'none';

    svgMap.appendChild(circle);

    requestAnimationFrame(() => {
      circle.setAttribute('cy', String(y + offsetY + 12));
      circle.setAttribute('r', '0.5');
      circle.style.opacity = '0';
    });

    setTimeout(() => {
      circle.remove();
    }, 850);
  }

  // Waypoint arrival sparkle burst
  function spawnArrivalBurst(x, y) {
    if (!svgMap) return;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${x}, ${y})`);
    g.style.pointerEvents = 'none';

    const colors = ['#F4D77B', '#FFB3C6', '#7CE5DF', '#FFF6EF'];
    for (let i = 0; i < 8; i++) {
      const angle = (i * 45 * Math.PI) / 180;
      const dist = 22 + Math.random() * 10;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;

      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', '0');
      dot.setAttribute('cy', '0');
      dot.setAttribute('r', '2.5');
      dot.setAttribute('fill', colors[i % colors.length]);
      dot.style.transition = 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
      g.appendChild(dot);

      requestAnimationFrame(() => {
        dot.setAttribute('cx', String(dx));
        dot.setAttribute('cy', String(dy));
        dot.setAttribute('r', '0.6');
        dot.style.opacity = '0';
      });
    }

    svgMap.appendChild(g);
    setTimeout(() => g.remove(), 700);
  }

  // Smooth curved flight interpolation engine
  function flyToStop(targetStopKey, onArrive) {
    const targetData = stopData[targetStopKey];
    if (!targetData) return;

    if (flightAnimId) {
      cancelAnimationFrame(flightAnimId);
      flightAnimId = null;
    }

    const startT = currentT;
    const targetT = targetData.t;
    const distanceT = Math.abs(targetT - startT);

    // If already at stop, just trigger UI update
    if (distanceT < 0.005) {
      updateUIForStop(targetStopKey, true);
      if (onArrive) onArrive();
      return;
    }

    // Dynamic flight duration based on sky distance
    const duration = Math.max(650, distanceT * 2200);
    const startTime = performance.now();

    updateUIForStop(targetStopKey, false);

    function stepFlight(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Smooth cubic bezier easing
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      currentT = startT + (targetT - startT) * eased;
      const curDist = currentT * totalLength;
      const pt = pathCurve.getPointAtLength(curDist);

      // Tangent calculation for natural flight banking
      const sampleOffset = targetT >= startT ? 2.5 : -2.5;
      const nextDist = Math.min(totalLength, Math.max(0, curDist + sampleOffset));
      const ptNext = pathCurve.getPointAtLength(nextDist);

      let angle = (Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * 180) / Math.PI;
      if (targetT < startT) angle += 180;
      const bank = Math.max(-24, Math.min(24, angle * 0.45));

      // Strictly set SVG attribute transform (immune to CSS pixel scaling)
      craft.setAttribute(
        'transform',
        `translate(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)}) rotate(${bank.toFixed(1)})`
      );

      // Dynamic stardust trail
      if (Math.random() < 0.45) {
        spawnTrailSparkle(pt.x, pt.y);
      }

      // Dynamic real-time altitude telemetry HUD
      const dynamicAlt = Math.round(540 - pt.y * 0.95);
      if (telemetryAlt) {
        telemetryAlt.textContent = `${dynamicAlt}m`;
      }

      if (progress < 1) {
        flightAnimId = requestAnimationFrame(stepFlight);
      } else {
        // Safe arrival at waypoint
        currentT = targetT;
        flightAnimId = null;

        // Ensure final sub-pixel lock
        const finalPt = pathCurve.getPointAtLength(targetT * totalLength);
        craft.setAttribute('transform', `translate(${finalPt.x.toFixed(1)}, ${finalPt.y.toFixed(1)})`);

        // Sound chime on arrival
        nurseryAudio.playChime(targetData.pitch);

        // Visual arrival burst
        spawnArrivalBurst(finalPt.x, finalPt.y);

        if (telemetryAlt) {
          telemetryAlt.textContent = targetData.alt;
        }

        if (onArrive) onArrive();
      }
    }

    flightAnimId = requestAnimationFrame(stepFlight);
  }

  // Update UI and Manifest card
  function updateUIForStop(stopKey, playSound = false) {
    const data = stopData[stopKey];
    if (!data) return;

    currentStopIndex = stopList.indexOf(stopKey);

    if (playSound) {
      nurseryAudio.playChime(data.pitch);
    }

    // 1. Waypoints
    waypoints.forEach((wp) => {
      if (wp.dataset.stop === stopKey) {
        wp.classList.add('is-active');
      } else {
        wp.classList.remove('is-active');
      }
    });

    // 2. Stepper Buttons
    stepBtns.forEach((btn) => {
      if (btn.dataset.tab === stopKey) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });

    // 3. Manifest Card
    if (manifestIcon) manifestIcon.textContent = data.icon;
    if (manifestName) manifestName.textContent = data.name;
    if (manifestSub) manifestSub.textContent = data.sub;
    if (manifestBadge) manifestBadge.textContent = data.badge;
    if (manifestNote) manifestNote.textContent = data.note;

    if (manifestGrid) {
      manifestGrid.innerHTML = data.cargo
        .map(
          ([emoji, label]) => `
          <div class="cargo-chip p-1.5 rounded-lg bg-white/10 border border-white/10 flex items-center gap-1.5">
            <span class="text-sm flex-shrink-0">${emoji}</span>
            <span class="font-medium leading-tight">${label}</span>
          </div>
        `
        )
        .join('');
    }

    // 4. Progress Bar
    const completedCount = currentStopIndex + 1;
    if (progressText) {
      progressText.textContent = `${completedCount} / 4 Stops Safe`;
    }
    if (progressFill) {
      progressFill.style.width = `${(completedCount / 4) * 100}%`;
    }
  }

  // Click on SVG Waypoint Beacons
  waypoints.forEach((wp) => {
    wp.addEventListener('click', () => {
      if (isTourRunning) return;
      const stopKey = wp.dataset.stop;
      flyToStop(stopKey);
    });
  });

  // Click on 4-Column Stepper Tabs
  stepBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (isTourRunning) return;
      const stopKey = btn.dataset.tab;
      flyToStop(stopKey);
    });
  });

  // Next Stop Quick Cycler
  if (quickCycleBtn) {
    quickCycleBtn.addEventListener('click', () => {
      if (isTourRunning) return;
      const nextIdx = (currentStopIndex + 1) % stopList.length;
      flyToStop(stopList[nextIdx]);
    });
  }

  // Ring Night Chimes Button
  if (soundChimeBtn) {
    soundChimeBtn.addEventListener('click', () => {
      nurseryAudio.playWishSparkle();
      if (statusTag) {
        statusTag.textContent = '🔔 Midnight Chimes Echoing';
        statusTag.className =
          'px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-lav/30 text-lav dark:text-moon border border-lav/40';
        setTimeout(() => {
          statusTag.textContent = '● Active Flight';
          statusTag.className =
            'px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200';
        }, 3200);
      }
    });
  }

  // Grand Delivery Tour
  if (dispatchBtn) {
    dispatchBtn.addEventListener('click', () => {
      if (isTourRunning) return;
      isTourRunning = true;
      dispatchBtn.disabled = true;

      if (dispatchBtnText) dispatchBtnText.textContent = '🚀 Grand Tour In Flight...';
      if (statusTag) {
        statusTag.textContent = '🚀 Grand Tour In Progress';
        statusTag.className =
          'px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200 animate-pulse';
      }

      nurseryAudio.playWishSparkle();

      let step = 0;
      const runNextStep = () => {
        if (step < stopList.length) {
          const targetKey = stopList[step];
          flyToStop(targetKey, () => {
            step++;
            setTimeout(runNextStep, 900);
          });
        } else {
          // Grand Tour Finished Celebration
          nurseryAudio.playBell(1046.5, null, 1.0); // C6 bell
          setTimeout(() => nurseryAudio.playPipGiggle(), 350);

          if (dispatchBtnText) dispatchBtnText.textContent = '✨ Tour Complete! Fly Again';
          dispatchBtn.disabled = false;
          isTourRunning = false;

          if (statusTag) {
            statusTag.textContent = '✓ All 42 Dreams Delivered!';
            statusTag.className =
              'px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200';
          }

          if (progressText) {
            progressText.textContent = '4 / 4 Complete · Town Sleeping';
          }
        }
      };

      runNextStep();
    });
  }

  // Initialize Pip at Moon Lane (Stop 0) directly on the curved path
  const initialPt = pathCurve.getPointAtLength(0);
  craft.setAttribute('transform', `translate(${initialPt.x.toFixed(1)}, ${initialPt.y.toFixed(1)})`);
  updateUIForStop('moon', false);
}
