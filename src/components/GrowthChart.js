export function renderGrowthChart() {
  const skills = [
    { name: 'Dream design', height: '92 cm', value: 92, note: 'Specializes in clouds that never leak rain' },
    { name: 'Lullabies', height: '80 cm', value: 80, note: 'Tuned to soothing heartbeats and gentle night chimes' },
    { name: 'Nightlights', height: '88 cm', value: 88, note: 'Banish wardrobe and under-bed shadows' },
    { name: 'Bedtime stories', height: '74 cm', value: 74, note: 'Guaranteed to induce heavy eyelids within 3 pages' },
    { name: 'Giggling', height: '100 cm', value: 100, note: 'World record holder across 4 nursery wards' },
  ];

  return `
    <section class="py-24 px-6 sm:px-12 lg:px-20 relative z-20" id="growth">
      <div class="max-w-5xl mx-auto glass-panel p-8 sm:p-12 pb-14 sm:pb-16 rounded-3xl border border-white/80 dark:border-white/15 shadow-2xl backdrop-blur-2xl bg-white/85 dark:bg-black/35">
        
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-berry mb-2">
              <span>📏</span> <span>Skills & Growth Wall</span>
            </div>
            <h2 class="font-display text-4xl sm:text-5xl font-extrabold text-berry dark:text-moon leading-tight">
              Pip’s Growth Chart
            </h2>
            <p class="text-ink dark:text-cream/80 text-base sm:text-lg mt-2 font-medium">
              Skills marked carefully with chalk on the nursery wall. Tap any row to hear its melody!
            </p>
          </div>

          <button id="cheer-pip-btn" type="button" class="self-start sm:self-auto px-6 py-3.5 rounded-full font-display font-bold text-white bg-gradient-to-r from-berry via-[#F0427F] to-pink-500 hover:from-berry-dark hover:to-pink-600 transition-all duration-300 shadow-lg shadow-berry/30 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer">
            <span>✨</span>
            <span>Cheer on Pip!</span>
          </button>
        </div>

        <!-- The Wall with Measurement Markings -->
        <div class="wall border-l-4 border-berry dark:border-moon pl-6 sm:pl-10 space-y-7 relative pb-2">
          
          ${skills
            .map(
              (skill, idx) => `
            <div class="growth-skill-row group cursor-pointer transition-transform duration-200 hover:translate-x-1" data-skill-idx="${idx}" data-skill-name="${skill.name}" title="Tap to test ${skill.name}!">
              <div class="flex items-baseline justify-between mb-2">
                <span class="font-display font-semibold text-lg sm:text-xl text-ink dark:text-cream group-hover:text-berry dark:group-hover:text-moon transition-colors flex items-center gap-2">
                  <span>${['☁️', '🎵', '💡', '📖', '✨'][idx]}</span>
                  <span>${skill.name}</span>
                </span>
                <span class="font-display font-bold text-base sm:text-lg text-berry dark:text-moon group-hover:scale-110 transition-transform">
                  ${skill.height}
                </span>
              </div>
              <div class="w-full h-5 rounded-full bg-pink-100 dark:bg-white/10 overflow-hidden p-0.5 backdrop-blur-xs border border-pink-200/50 dark:border-white/10 shadow-inner">
                <div
                  class="growth-bar-fill h-full rounded-full transition-all duration-1000 ease-out opacity-0 shadow-xs"
                  style="width: 0%; background: linear-gradient(90deg, #FF75A0 0%, #F4D77B 100%);"
                  data-w="${skill.value}"
                ></div>
              </div>
              <p class="text-xs text-ink/75 dark:text-cream/70 mt-1.5 font-medium">${skill.note}</p>
            </div>
          `
            )
            .join('')}

        </div>

        <!-- Milestone Growth Badge Footer -->
        <div class="mt-8 pt-6 border-t border-berry/15 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink/70 dark:text-cream/60">
          <div class="flex items-center gap-2 font-medium">
            <span>🌟</span>
            <span>Measured with starlight chalk · Pip grows 2 cm with every bedtime giggle!</span>
          </div>
          <span class="px-3 py-1 rounded-full bg-berry/10 dark:bg-white/10 text-berry dark:text-moon font-extrabold uppercase tracking-wider text-[11px]">
            Official Nursery Metric
          </span>
        </div>

      </div>
    </section>
  `;
}
