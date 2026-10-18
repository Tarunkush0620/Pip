export function renderGrowthChart() {
  const skills = [
    { name: 'Dream design', height: '92 cm', value: 92, note: 'Specializes in clouds that never leak rain' },
    { name: 'Lullabies', height: '80 cm', value: 80, note: 'Tuned to soothing heartbeats and gentle night chimes' },
    { name: 'Nightlights', height: '88 cm', value: 88, note: 'Banish wardrobe and under-bed shadows' },
    { name: 'Bedtime stories', height: '74 cm', value: 74, note: 'Guaranteed to induce heavy eyelids within 3 pages' },
    { name: 'Giggling', height: '100 cm', value: 100, note: 'World record holder across 4 nursery wards' },
  ];

  return `
    <section class="grow py-24 px-6 sm:px-12 lg:px-20 relative z-20" id="growth">
      <div class="max-w-5xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-white/80 shadow-2xl backdrop-blur-2xl">
        
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-berry mb-2">
              <span>📏</span> <span>Skills & Growth</span>
            </div>
            <h2 class="font-display text-4xl sm:text-5xl font-extrabold text-berry dark:text-moon leading-tight">
              Pip’s Growth Chart
            </h2>
            <p class="text-ink dark:text-cream/80 text-base sm:text-lg mt-2 font-medium">
              Skills marked carefully with chalk on the nursery wall.
            </p>
          </div>

          <button id="cheer-pip-btn" type="button" class="self-start sm:self-auto px-6 py-3 rounded-full font-display font-bold text-white bg-berry hover:bg-berry-dark transition-all duration-300 shadow-md hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer">
            <span>✨</span>
            <span>Cheer on Pip!</span>
          </button>
        </div>

        <!-- The Wall with Measurement Markings -->
        <div class="wall border-l-4 border-berry dark:border-moon pl-6 sm:pl-10 space-y-8 relative">
          
          ${skills
            .map(
              (skill) => `
            <div class="row group">
              <div class="flex items-baseline justify-between mb-2">
                <span class="font-display font-semibold text-lg sm:text-xl text-ink dark:text-cream group-hover:text-berry transition-colors">
                  ${skill.name}
                </span>
                <span class="font-display font-bold text-base sm:text-lg text-berry dark:text-moon">
                  ${skill.height}
                </span>
              </div>
              <div class="w-full h-5 rounded-full bg-pink-100 dark:bg-white/10 overflow-hidden p-0.5 backdrop-blur-xs border border-pink-200/50">
                <div
                  class="growth-bar-fill h-full rounded-full transition-all duration-1000 ease-out opacity-0"
                  style="width: 0%; background: linear-gradient(90deg, #FF75A0, #F4D77B);"
                  data-w="${skill.value}"
                ></div>
              </div>
              <p class="text-xs text-ink/75 dark:text-cream/60 mt-1.5 font-medium">${skill.note}</p>
            </div>
          `
            )
            .join('')}

        </div>

      </div>
    </section>
  `;
}
