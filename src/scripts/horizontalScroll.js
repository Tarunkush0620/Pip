// Pip's Inventions Scroll-Driven Showcase Controller
// Connects vertical window scroll directly to butter-smooth 60-120fps horizontal carousel motion.
// Features:
// 1. Inertia-smoothed RAF lerp translation tied to document scroll
// 2. Exact card-centering geometry across all screen resolutions
// 3. Quick-jump invention tabs with active pill styling
// 4. Dot pagination, previous/next arrows, and counter badge
// 5. Touch swipe gestures for mobile & trackpad horizontal scroll support
// 6. Keyboard navigation (ArrowLeft / ArrowRight)
// 7. Harmonious nursery chime audio feedback

import { nurseryAudio } from '../audio/soundEffects.js';

export function initHorizontalScroll() {
  const section = document.getElementById('work');
  const track = document.getElementById('track');
  const trackWrapper = track ? track.parentElement : null;
  const prevBtn = document.getElementById('track-prev');
  const nextBtn = document.getElementById('track-next');
  const dotsContainer = document.getElementById('track-dots');
  const counterEl = document.getElementById('invention-counter');
  const tabButtons = document.querySelectorAll('#invention-tabs [data-invention-idx]');

  if (!track || !section || !trackWrapper) return;

  const cards = Array.from(track.querySelectorAll('.showcase-card'));
  const totalCards = cards.length;
  if (totalCards === 0) return;

  let currentActiveIndex = 0;
  let currentX = 0;
  let targetX = 0;
  let cachedSectionTop = 0;
  let cachedTotalDistance = 0;
  let cardOffsets = [];
  let cachedCardGeometries = [];
  let isSectionInView = true;
  let isRafRunning = false;

  // Reset any browser auto-scrolling on trackWrapper
  trackWrapper.scrollLeft = 0;
  trackWrapper.addEventListener('scroll', () => {
    if (trackWrapper.scrollLeft !== 0) {
      trackWrapper.scrollLeft = 0;
    }
  }, { passive: true });

  // Initialize Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    cards.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
        idx === 0 ? 'w-6 bg-berry' : 'w-2.5 bg-berry/30 hover:bg-berry/60'
      }`;
      dot.setAttribute('aria-label', `Go to invention ${idx + 1} of ${totalCards}`);
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToCard(idx);
      });
      dotsContainer.appendChild(dot);
    });
  }

  // Recalculate geometry bounds on load & resize
  function recalculateMetrics() {
    trackWrapper.scrollLeft = 0;

    const rect = section.getBoundingClientRect();
    cachedSectionTop = window.scrollY + rect.top;
    cachedTotalDistance = Math.max(1, section.offsetHeight - window.innerHeight);

    const wrapperWidth = trackWrapper.clientWidth || window.innerWidth;

    // Cache exact geometry to avoid layout thrashing during render loop
    cachedCardGeometries = cards.map((card) => {
      const offsetLeft = card.offsetLeft;
      const offsetWidth = card.offsetWidth;
      return {
        cardCenter: offsetLeft + offsetWidth / 2,
        widthNorm: offsetWidth + 44
      };
    });

    // Calculate exact centering offset for each card
    cardOffsets = cachedCardGeometries.map((geom) => {
      return (wrapperWidth / 2) - geom.cardCenter;
    });

    // Immediately compute target for current scroll
    updateTargetFromScroll(true);
  }

  function updateTargetFromScroll(immediate = false) {
    if (!cardOffsets.length) return;

    const scrolled = window.scrollY - cachedSectionTop;
    const rawProgress = cachedTotalDistance > 0 ? scrolled / cachedTotalDistance : 0;
    const progress = Math.max(0, Math.min(1, rawProgress));

    // Smooth piecewise interpolation between each card center
    const scaledProgress = progress * (totalCards - 1);
    const lowerIdx = Math.floor(scaledProgress);
    const upperIdx = Math.min(totalCards - 1, lowerIdx + 1);
    const fraction = scaledProgress - lowerIdx;

    const start = cardOffsets[lowerIdx] !== undefined ? cardOffsets[lowerIdx] : cardOffsets[0];
    const end = cardOffsets[upperIdx] !== undefined ? cardOffsets[upperIdx] : start;

    targetX = start + fraction * (end - start);

    if (immediate) {
      currentX = targetX;
      track.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;
    }

    // Determine active card based on progress
    const activeIdx = Math.min(totalCards - 1, Math.max(0, Math.round(scaledProgress)));
    if (activeIdx !== currentActiveIndex) {
      currentActiveIndex = activeIdx;
      updateUI(currentActiveIndex, true);
    }
  }

  function updateUI(idx, playSound = false) {
    // 1. Update Dots
    if (dotsContainer) {
      const dots = dotsContainer.children;
      for (let i = 0; i < dots.length; i++) {
        if (i === idx) {
          dots[i].className = 'h-2.5 rounded-full transition-all duration-300 cursor-pointer w-6 bg-berry';
        } else {
          dots[i].className = 'h-2.5 rounded-full transition-all duration-300 cursor-pointer w-2.5 bg-berry/30 hover:bg-berry/60';
        }
      }
    }

    // 2. Update Invention Selector Tabs
    tabButtons.forEach((tab) => {
      const tabIdx = parseInt(tab.dataset.inventionIdx, 10);
      const isActive = tabIdx === idx;
      tab.classList.toggle('is-active', isActive);
      if (isActive) {
        tab.classList.add('bg-berry', 'text-white', 'shadow-md');
        tab.classList.remove('text-ink/80');
      } else {
        tab.classList.remove('bg-berry', 'text-white', 'shadow-md');
        tab.classList.add('text-ink/80');
      }
    });

    // 3. Update Counter
    if (counterEl) {
      counterEl.textContent = `Invention ${idx + 1} of ${totalCards}`;
    }

    // 4. Update subtle card focus depth
    cards.forEach((card, i) => {
      if (i === idx) {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      } else {
        card.style.opacity = '0.72';
        card.style.transform = 'scale(0.96)';
      }
    });

    // 5. Sound chime
    if (playSound) {
      const notePalette = ['C5', 'E5', 'G5', 'A5', 'C6'];
      try {
        nurseryAudio.playChime(notePalette[idx % notePalette.length]);
      } catch (e) {}
    }
  }

  function scrollToCard(index, playSound = true) {
    if (index < 0) index = 0;
    if (index >= totalCards) index = totalCards - 1;

    recalculateMetrics();
    const targetScrollY = cachedSectionTop + (index / (totalCards - 1)) * cachedTotalDistance;

    window.scrollTo({
      top: Math.round(targetScrollY),
      behavior: 'smooth'
    });

    if (playSound && index !== currentActiveIndex) {
      const notePalette = ['C5', 'E5', 'G5', 'A5', 'C6'];
      try {
        nurseryAudio.playChime(notePalette[index % notePalette.length]);
      } catch (e) {}
    }
  }

  // Prev / Next Button Listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToCard(currentActiveIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToCard(currentActiveIndex + 1);
    });
  }

  // Tab Button Listeners
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(btn.dataset.inventionIdx, 10);
      if (!isNaN(idx)) {
        scrollToCard(idx);
      }
    });
  });

  // Keyboard Navigation: Left & Right Arrows when section is in viewport
  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea, select')) return;
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;

    if (isVisible) {
      if (e.key === 'ArrowRight') {
        scrollToCard(currentActiveIndex + 1);
      } else if (e.key === 'ArrowLeft') {
        scrollToCard(currentActiveIndex - 1);
      }
    }
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchStartY = 0;

  trackWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  trackWrapper.addEventListener('touchend', (e) => {
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const diffY = touchStartY - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        scrollToCard(currentActiveIndex + 1);
      } else {
        scrollToCard(currentActiveIndex - 1);
      }
    }
  }, { passive: true });

  // Trackpad horizontal swipe support
  section.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
      window.scrollBy({ top: e.deltaX, behavior: 'auto' });
    }
  }, { passive: true });

  // Continuous RAF loop with smooth inertia lerp & cached geometry
  const progressBar = document.getElementById('showcase-progress-bar');

  function renderLoop() {
    if (!isSectionInView) {
      isRafRunning = false;
      return;
    }

    if (trackWrapper.scrollLeft !== 0) {
      trackWrapper.scrollLeft = 0;
    }

    // Smooth inertia lerp factor (0.16 = butter-smooth 60-120fps response)
    const diff = targetX - currentX;
    if (Math.abs(diff) > 0.05) {
      currentX += diff * 0.16;
      track.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;
    } else if (currentX !== targetX) {
      currentX = targetX;
      track.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;
    }

    // Dynamic 3D Spatial Perspective on each card using cached geometries (zero reflows!)
    const wrapperWidth = trackWrapper.clientWidth || window.innerWidth;
    const screenCenter = wrapperWidth / 2;

    cards.forEach((card, idx) => {
      const geom = cachedCardGeometries[idx];
      if (!geom) return;

      const cardCenterInWrapper = currentX + geom.cardCenter;
      const distFromCenter = cardCenterInWrapper - screenCenter;
      const normalizedDist = distFromCenter / geom.widthNorm;

      const scale = Math.max(0.92, 1 - Math.abs(normalizedDist) * 0.08);
      const opacity = Math.max(0.70, 1 - Math.abs(normalizedDist) * 0.30);
      const rotateY = Math.max(-5, Math.min(5, -normalizedDist * 4));

      card.style.transform = `scale(${scale.toFixed(3)}) rotateY(${rotateY.toFixed(2)}deg)`;
      card.style.opacity = opacity.toFixed(2);
    });

    // Update Progress Bar
    if (progressBar && cachedTotalDistance > 0) {
      const scrolled = window.scrollY - cachedSectionTop;
      const progress = Math.max(0, Math.min(1, scrolled / cachedTotalDistance));
      progressBar.style.width = `${Math.min(100, Math.max(4, Math.round(progress * 100)))}%`;
    }

    // If still moving, continue RAF; else pause loop until next movement
    if (Math.abs(diff) > 0.05) {
      requestAnimationFrame(renderLoop);
    } else {
      isRafRunning = false;
    }
  }

  // Observe visibility of showcase to completely pause loop when off-screen
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isSectionInView = entry.isIntersecting;
        if (isSectionInView && !isRafRunning) {
          isRafRunning = true;
          requestAnimationFrame(renderLoop);
        }
      });
    }, { rootMargin: '300px 0px 300px 0px' });
    sectionObserver.observe(section);
  }

  // Throttled Window scroll & resize listeners
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateTargetFromScroll(false);
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    recalculateMetrics();
  }, { passive: true });

  // Clean up hash anchors if needed
  const hash = window.location.hash;
  let initialCard = 0;
  if (hash === '#p1') initialCard = 0;
  else if (hash === '#p2') initialCard = 1;
  else if (hash === '#p3') initialCard = 2;
  else if (hash === '#p4') initialCard = 3;
  else if (hash === '#p5') initialCard = 4;

  if (hash && hash.startsWith('#p')) {
    try {
      history.replaceState(null, null, window.location.pathname + '#work');
    } catch (e) {}
  }

  // Initialize
  recalculateMetrics();
  updateUI(currentActiveIndex, false);
  requestAnimationFrame(renderLoop);

  if (initialCard > 0) {
    setTimeout(() => {
      scrollToCard(initialCard, false);
    }, 150);
  }

  // Expose on window for direct access
  window.goToInvention = scrollToCard;
}
