import { nurseryAudio } from '../audio/soundEffects.js';

export function initStatsAndGrowth() {
  // Animate hero numbers
  const stats = document.querySelectorAll('.stat-num[data-target]');
  let animatedStats = false;

  function runStats() {
    if (animatedStats) return;
    animatedStats = true;

    stats.forEach((stat) => {
      const target = parseInt(stat.dataset.target, 10);
      if (isNaN(target)) return;

      let current = 0;
      const duration = 1600;
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out expo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        current = Math.floor(ease * target);
        stat.textContent = current.toString();

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          stat.textContent = target.toString();
        }
      }
      requestAnimationFrame(update);
    });
  }

  // Trigger stats on load
  setTimeout(runStats, 400);

  // Growth chart wall observer
  const wall = document.querySelector('.wall');
  if (wall) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.growth-bar-fill');
            bars.forEach((bar, idx) => {
              const targetWidth = bar.dataset.w || '50';
              setTimeout(() => {
                bar.style.width = `${targetWidth}%`;
                bar.style.opacity = '1';
              }, idx * 160);
            });
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(wall);
  }

  // Encourage Pip button
  const cheerBtn = document.getElementById('cheer-pip-btn');
  if (cheerBtn) {
    cheerBtn.addEventListener('click', (e) => {
      nurseryAudio.playChime('C5');
      const gigglesStat = document.getElementById('giggles-stat');
      if (gigglesStat) {
        gigglesStat.textContent = '∞ + 1';
        gigglesStat.classList.add('scale-125', 'text-moon');
        setTimeout(() => {
          gigglesStat.classList.remove('scale-125', 'text-moon');
        }, 500);
      }

      // Spawn floating hearts from button
      const rect = cheerBtn.getBoundingClientRect();
      for (let i = 0; i < 6; i++) {
        const heart = document.createElement('span');
        heart.textContent = ['💖', '✨', '🍼', '⭐', '🎈'][Math.floor(Math.random() * 5)];
        heart.className = 'fixed pointer-events-none text-xl z-50';
        heart.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 40}px`;
        heart.style.top = `${rect.top}px`;
        heart.style.transition = 'all 0.8s cubic-bezier(0.2, 0.9, 0.3, 1)';
        document.body.appendChild(heart);

        requestAnimationFrame(() => {
          heart.style.transform = `translate(${(Math.random() - 0.5) * 60}px, -${60 + Math.random() * 40}px) scale(1.4)`;
          heart.style.opacity = '0';
        });

        setTimeout(() => heart.remove(), 800);
      }
    });
  }
}
