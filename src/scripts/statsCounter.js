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
      nurseryAudio.playPipGiggle();
      const gigglesStat = document.getElementById('giggles-stat');
      if (gigglesStat) {
        gigglesStat.textContent = '∞ + 1';
        gigglesStat.classList.add('scale-125', 'text-moon');
        setTimeout(() => {
          gigglesStat.classList.remove('scale-125', 'text-moon');
        }, 600);
      }

      // Shimmer and pulse all growth bars
      const allBars = document.querySelectorAll('.growth-bar-fill');
      allBars.forEach((bar) => {
        bar.classList.add('animate-pulse-glow', 'scale-y-125');
        setTimeout(() => bar.classList.remove('animate-pulse-glow', 'scale-y-125'), 800);
      });

      // Spawn floating hearts from button
      const rect = cheerBtn.getBoundingClientRect();
      for (let i = 0; i < 7; i++) {
        const heart = document.createElement('span');
        heart.textContent = ['💖', '✨', '🍼', '⭐', '🎈', '🌸'][Math.floor(Math.random() * 6)];
        heart.className = 'fixed pointer-events-none text-xl z-50 select-none';
        heart.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 50}px`;
        heart.style.top = `${rect.top}px`;
        heart.style.transition = 'all 0.9s cubic-bezier(0.2, 0.9, 0.3, 1)';
        document.body.appendChild(heart);

        requestAnimationFrame(() => {
          heart.style.transform = `translate(${(Math.random() - 0.5) * 70}px, -${60 + Math.random() * 50}px) scale(1.4)`;
          heart.style.opacity = '0';
        });

        setTimeout(() => heart.remove(), 900);
      }
    });
  }

  // Interactive Skill Rows
  const skillRows = document.querySelectorAll('.growth-skill-row');
  const skillNotes = ['C4', 'E4', 'G4', 'B4', 'C5'];
  skillRows.forEach((row, idx) => {
    row.addEventListener('click', () => {
      const note = skillNotes[idx % skillNotes.length];
      nurseryAudio.playChime(note);

      const bar = row.querySelector('.growth-bar-fill');
      if (bar) {
        bar.classList.add('brightness-125', 'scale-y-125');
        setTimeout(() => bar.classList.remove('brightness-125', 'scale-y-125'), 350);
      }

      const rect = row.getBoundingClientRect();
      const spark = document.createElement('span');
      spark.textContent = ['✨', '☁️', '🎵', '💡', '🌟'][idx % 5];
      spark.className = 'fixed pointer-events-none text-base z-50';
      spark.style.left = `${rect.left + 30}px`;
      spark.style.top = `${rect.top}px`;
      spark.style.transition = 'all 0.6s ease-out';
      document.body.appendChild(spark);

      requestAnimationFrame(() => {
        spark.style.transform = 'translateY(-30px) scale(1.3)';
        spark.style.opacity = '0';
      });

      setTimeout(() => spark.remove(), 600);
    });
  });
}
