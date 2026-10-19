export function renderAbout() {
  const statement = 'Pip is a curious, sleepy, a little clumsy baby with a smooth round skull face and huge glowing eyes. Pip designs the dreams, lullabies, nightlights and bedtime stories that help the neighbourhood’s little ghosts and creatures fall asleep. Pip giggles at everything and hates silence.';
  const words = statement.split(' ').map((w) => `<span class="statement-word">${w}</span>`).join(' ');

  const traits = [
    { label: 'Curious', icon: '🔍' },
    { label: 'Sleepy', icon: '💤' },
    { label: 'A little clumsy', icon: '🧸' },
    { label: 'Easily delighted', icon: '🌸' },
    { label: 'Giggles at everything', icon: '✨' },
    { label: 'Hates silence', icon: '🎵' },
  ];

  const tools = [
    { name: 'Stardust Pouch', icon: '✨', desc: '100% organic starlight for sweet dreams' },
    { name: 'Cloud Spatula', icon: '☁️', desc: 'Fluffs pillow clouds to optimal softness' },
    { name: 'Lullaby Key', icon: '🗝️', desc: 'Winds music boxes across seven rooftops' },
    { name: 'Warm Milk Thermos', icon: '🍼', desc: 'Brewed with cinnamon and moonbeams' },
  ];

  return `
    <section class="about py-24 px-6 sm:px-12 lg:px-20 relative z-20" id="about">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        <!-- Polaroid Character Card -->
        <div class="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-center">
          <figure id="card" class="glass-panel p-4 rounded-3xl w-full max-w-sm transition-transform duration-300 hover:rotate-1 shadow-xl hover:shadow-2xl border-2 border-white/80 cursor-pointer">
            <div class="aspect-[4/5] rounded-2xl overflow-hidden bg-blush/40 relative">
              <img
                src="/assets/images/pip_portrait.png"
                alt="Pip holding a glowing lantern and a unicorn music box"
                class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
            <figcaption class="pt-4 pb-2 text-center">
              <h3 class="font-display font-bold text-xl text-berry">Pip</h3>
              <p class="text-xs text-ink/70 font-medium">Junior Dream Engineer · Badge #001</p>
            </figcaption>
          </figure>
          
          <div class="mt-4 text-xs text-ink/50 text-center italic">
            ✦ Pip's official Midnight Nursery identification card
          </div>
        </div>

        <!-- Story & Bio -->
        <div class="lg:col-span-7 flex flex-col gap-8">
          <div>
            <div class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-berry mb-3">
              <span>✦</span> <span>Character Dossier</span>
            </div>
            <h2 class="font-display text-4xl sm:text-5xl font-bold text-berry leading-tight mb-6">
              Who is Pip?
            </h2>
            <div class="stmt font-display text-2xl sm:text-3xl md:text-4xl text-ink leading-snug font-bold" id="stmt">
              ${words}
            </div>
          </div>

          <!-- Personality Traits -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-ink/60 mb-3">Core Traits</h4>
            <div class="flex flex-wrap gap-2.5">
              ${traits
      .map(
        (t) => `
                <span class="trait-chip inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-ink text-sm font-medium border border-pink-200/50 shadow-sm transition-all duration-300 hover:scale-105 hover:border-berry/40 cursor-default">
                  <span>${t.icon}</span>
                  <span>${t.label}</span>
                </span>
              `
      )
      .join('')}
            </div>
          </div>

          <!-- Pip's Sleepy Toolbelt -->
          <div class="pt-6 border-t border-berry/15">
            <h4 class="text-xs font-bold uppercase tracking-wider text-ink/60 mb-4">Pip’s Dream Toolbelt</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              ${tools
      .map(
        (tool) => `
                <div class="toolbelt-card p-3.5 rounded-2xl glass-panel border border-pink-100/60 transition-all duration-300 hover:shadow-md flex items-start gap-3.5">
                  <span class="tool-icon-wrapper text-2xl p-2.5 rounded-xl bg-blush/40 flex-none">${tool.icon}</span>
                  <div>
                    <h5 class="font-display font-semibold text-berry text-base mb-0.5">${tool.name}</h5>
                    <p class="text-xs text-ink/80 leading-relaxed">${tool.desc}</p>
                  </div>
                </div>
              `
      )
      .join('')}
            </div>
          </div>

          <!-- The Story Behind This Portfolio: Built for Babies & Parents -->
          <div class="pt-8 border-t border-berry/15">
            <div class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-berry mb-2">
              <span>📖</span> <span>The Bedtime Story Behind This Portfolio</span>
            </div>
            <h3 class="font-display text-2xl sm:text-3xl font-extrabold text-berry dark:text-moon leading-tight mb-3">
              Why Did Pip Build This Nursery?
            </h3>
            <p class="text-sm sm:text-base text-ink/90 dark:text-cream/90 leading-relaxed font-normal mb-5">
              One twilight in Somnia, Pip peered through his starlight telescope down at Earth. In the quiet nurseries below, <strong>little babies were crying in the dark</strong>—the silence felt too loud, the shadows seemed scary, and exhausted mothers and fathers were pacing the floor at 2:00 AM. Pip hated silence and couldn’t bear to see anyone cry. So he rolled up his nightgown sleeves and engineered this portfolio to turn bedtime into an enchanted haven for both babies and parents.
            </p>

            <!-- Dual Audience Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
              <div class="p-4 rounded-2xl bg-pink-500/10 dark:bg-pink-950/40 border border-pink-400/30">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="text-lg">👶</span>
                  <h4 class="font-display font-bold text-sm text-berry dark:text-pink-300">For Little Babies</h4>
                </div>
                <p class="text-xs text-ink/80 dark:text-cream/80 leading-relaxed">
                  Soothing 432 Hz music box bells that synchronize with a mother's resting heart rate, gentle 2700K amber nightlights that preserve melatonin, and playful wooden blocks for tired giggles.
                </p>
              </div>

              <div class="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-400/30">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="text-lg">🧑‍🍼</span>
                  <h4 class="font-display font-bold text-sm text-amber-800 dark:text-amber-300">For Loving Parents</h4>
                </div>
                <p class="text-xs text-ink/80 dark:text-cream/80 leading-relaxed">
                  Sing-along lyrics for classic Hindi & world lullabies, calming ambient rain and crickets, a gentle bedtime routine helper, and bedtime storybooks ready to read aloud.
                </p>
              </div>
            </div>

            <!-- Narrative Bridge to Inventions -->
            <div class="flex items-center gap-3">
              <a href="#work" class="btn-berry px-5 py-2.5 rounded-full font-display font-bold text-xs sm:text-sm text-white shadow-md hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2">
                <span>🛠️</span> <span>Explore Pip’s 5 Bedtime Inventions</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  `;
}
