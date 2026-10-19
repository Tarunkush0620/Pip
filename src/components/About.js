export function renderAbout() {
  const statement = 'Pip is a curious, sleepy, a little clumsy baby with a smooth round skull face and huge glowing eyes. Pip designs the dreams, lullabies, nightlights and bedtime stories that help the neighbourhood’s little ghosts and creatures fall asleep. Pip giggles at everything and hates silence.';
  const words = statement.split(' ').map((w) => `<span class="statement-word">${w}</span>`).join(' ');

  const traits = [
    { label: 'Curious', icon: '🔍', sound: 'E5' },
    { label: 'Sleepy', icon: '💤', sound: 'C4' },
    { label: 'A little clumsy', icon: '🧸', sound: 'G4' },
    { label: 'Easily delighted', icon: '🌸', sound: 'A4' },
    { label: 'Giggles at everything', icon: '✨', sound: 'C5' },
    { label: 'Hates silence', icon: '🎵', sound: 'E4' },
  ];

  const tools = [
    { name: 'Stardust Pouch', icon: '✨', desc: '100% organic starlight for sweet dreams', sound: 'C5' },
    { name: 'Cloud Spatula', icon: '☁️', desc: 'Fluffs pillow clouds to optimal softness', sound: 'G4' },
    { name: 'Lullaby Key', icon: '🗝️', desc: 'Winds music boxes across seven rooftops', sound: 'E5' },
    { name: 'Warm Milk Thermos', icon: '🍼', desc: 'Brewed with cinnamon and moonbeams', sound: 'A4' },
  ];

  return `
    <section class="about py-24 px-6 sm:px-12 lg:px-20 relative z-20" id="about">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        <!-- Polaroid Character Card -->
        <div class="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-center">
          <figure id="card" class="glass-panel p-4 rounded-3xl w-full max-w-sm transition-transform duration-300 hover:rotate-1 shadow-xl hover:shadow-2xl border-2 border-white/80 dark:border-white/20 bg-white/90 dark:bg-[#1E0D27]/90 cursor-pointer">
            <div class="aspect-[4/5] rounded-2xl overflow-hidden bg-blush/40 relative">
              <img
                src="/assets/images/pip_portrait.png"
                alt="Pip holding a glowing lantern and a unicorn music box"
                class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div class="absolute bottom-3 left-3 right-3 py-1.5 px-3 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold text-center flex items-center justify-center gap-1.5 pointer-events-none">
                <span>✨</span> <span>Tap Pip to hear a gentle greeting!</span>
              </div>
            </div>
            <figcaption class="pt-4 pb-2 text-center">
              <h3 class="font-display font-bold text-xl text-berry dark:text-moon">Pip</h3>
              <p class="text-xs text-ink/70 dark:text-cream/70 font-medium">Junior Dream Engineer · Badge #001</p>
            </figcaption>
          </figure>
          
          <div class="mt-4 text-xs text-ink/60 dark:text-cream/60 text-center italic">
            ✦ Pip's official Midnight Nursery identification card
          </div>
        </div>

        <!-- Story & Bio -->
        <div class="lg:col-span-7 flex flex-col gap-8">
          <div>
            <div class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-berry dark:text-pink-300 mb-3">
              <span>✦</span> <span>Character Dossier</span>
            </div>
            <h2 class="font-display text-4xl sm:text-5xl font-bold text-berry dark:text-moon leading-tight mb-6">
              Who is Pip?
            </h2>
            <div class="stmt font-display text-2xl sm:text-3xl md:text-4xl text-ink dark:text-cream leading-snug font-bold" id="stmt">
              ${words}
            </div>
          </div>

          <!-- Personality Traits -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-ink/60 dark:text-cream/60 mb-3">Core Traits</h4>
            <div class="flex flex-wrap gap-2.5">
              ${traits
      .map(
        (t) => `
                <button type="button" class="trait-chip inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-ink dark:text-cream text-sm font-medium border border-pink-200/50 dark:border-white/10 shadow-sm transition-all duration-300 hover:scale-105 hover:border-berry/40 active:scale-95 cursor-pointer bg-white/70 dark:bg-black/30" data-sound="${t.sound}">
                  <span>${t.icon}</span>
                  <span>${t.label}</span>
                </button>
              `
      )
      .join('')}
            </div>
          </div>

          <!-- Pip's Sleepy Toolbelt -->
          <div class="pt-6 border-t border-berry/15 dark:border-white/10">
            <h4 class="text-xs font-bold uppercase tracking-wider text-ink/60 dark:text-cream/60 mb-4">Pip’s Dream Toolbelt</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              ${tools
      .map(
        (tool) => `
                <div class="toolbelt-card p-3.5 rounded-2xl glass-panel border border-pink-100/60 dark:border-white/10 transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 flex items-start gap-3.5 bg-white/75 dark:bg-black/30 cursor-pointer" data-tool="${tool.name}" data-sound="${tool.sound}">
                  <span class="tool-icon-wrapper text-2xl p-2.5 rounded-xl bg-blush/40 dark:bg-pink-900/30 flex-none">${tool.icon}</span>
                  <div>
                    <h5 class="font-display font-semibold text-berry dark:text-moon text-base mb-0.5">${tool.name}</h5>
                    <p class="text-xs text-ink/80 dark:text-cream/80 leading-relaxed">${tool.desc}</p>
                  </div>
                </div>
              `
      )
      .join('')}
            </div>
          </div>

          <!-- The Story Behind This Portfolio: Built for Babies & Parents -->
          <div id="story-behind-card" class="story-behind-card glass-panel rounded-3xl p-6 sm:p-8 bg-white/95 dark:bg-[#180A26]/90 border-2 border-white/95 dark:border-white/15 shadow-2xl backdrop-blur-2xl relative overflow-hidden transition-all duration-300">
            
            <!-- Ambient Dream Light Glows -->
            <div class="absolute -top-14 -right-14 w-48 h-48 bg-gradient-to-br from-pink-400/25 via-rose-300/15 to-transparent rounded-full blur-2xl pointer-events-none"></div>
            <div class="absolute -bottom-14 -left-14 w-48 h-48 bg-gradient-to-tr from-amber-400/25 via-yellow-200/15 to-transparent rounded-full blur-2xl pointer-events-none"></div>

            <div class="relative z-10">
              <!-- Header Bar with Read Aloud Voice Button -->
              <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-100/90 dark:bg-pink-950/60 border border-pink-300/60 dark:border-pink-500/30 text-xs font-bold uppercase tracking-wider text-berry dark:text-pink-300 shadow-xs">
                  <span>📖</span> <span>The Bedtime Story Behind This Nursery</span>
                </div>
                
                <button 
                  id="story-narrate-btn" 
                  type="button" 
                  class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel bg-white/80 dark:bg-black/40 border border-berry/30 dark:border-white/20 hover:border-berry text-berry dark:text-moon font-display font-bold text-xs shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  aria-label="Listen to Pip's bedtime story read aloud"
                  title="Listen to Pip's bedtime story read aloud"
                >
                  <span id="story-narrate-icon">🔊</span>
                  <span id="story-narrate-text">Read Story Aloud</span>
                </button>
              </div>

              <h3 class="font-display text-2xl sm:text-3xl font-extrabold text-berry dark:text-moon leading-tight mb-2">
                Why Did Pip Build This Nursery?
              </h3>
              
              <p class="text-xs sm:text-sm font-semibold text-berry/80 dark:text-pink-300/90 mb-4 flex items-center gap-1.5">
                <span>✦</span>
                <span>Born from 2:00 AM nursery tears · Engineered with starlight & pediatric care</span>
              </p>

              <p class="text-sm sm:text-base text-ink/90 dark:text-cream/90 leading-relaxed font-normal mb-5">
                One twilight in Somnia, Pip peered through his starlight telescope down at Earth. In the quiet nurseries below, <strong class="text-berry dark:text-pink-300 font-bold">little babies were crying in the dark</strong>—the silence felt too loud, the shadows seemed scary, and exhausted mothers and fathers were pacing the floor at 2:00 AM. Pip hated silence and couldn’t bear to see anyone cry. So he rolled up his nightgown sleeves and engineered this portfolio to turn bedtime into an enchanted haven for both babies and parents.
              </p>

              <!-- Pip's Personal Quote Callout -->
              <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-500/10 via-amber-500/10 to-purple-500/10 border-l-4 border-berry dark:border-pink-400 mb-6 flex items-start gap-3.5 shadow-xs">
                <span class="text-3xl flex-none leading-none select-none">🧸</span>
                <div>
                  <blockquote class="italic text-xs sm:text-sm text-ink/90 dark:text-cream/90 font-medium leading-relaxed">
                    “No baby should ever be afraid of the quiet, and no tired parent should have to walk the hallway all alone. Every dream deserves a warm melody and a peaceful heart.”
                  </blockquote>
                  <div class="text-xs font-bold not-italic text-berry dark:text-pink-300 mt-2 flex items-center gap-1.5">
                    <span>— Pip, Junior Dream Weaver</span>
                    <span class="text-ink/40 dark:text-cream/40">·</span>
                    <span class="font-normal text-ink/70 dark:text-cream/70">Somnia Midnight Nursery Chief</span>
                  </div>
                </div>
              </div>

              <!-- Dual Audience Cards -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <!-- For Little Babies -->
                <div class="rounded-2xl p-5 bg-gradient-to-br from-pink-50/95 via-rose-50/80 to-white/95 dark:from-pink-950/60 dark:to-plum-950/50 border-2 border-pink-200/90 dark:border-pink-500/30 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between gap-2 mb-3">
                      <div class="flex items-center gap-2">
                        <span class="text-2xl">👶</span>
                        <h4 class="font-display font-bold text-base text-berry dark:text-pink-300">For Little Babies</h4>
                      </div>
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pink-100 text-pink-700 dark:bg-pink-900/60 dark:text-pink-200">Ages 0 - 4</span>
                    </div>
                    
                    <ul class="text-xs text-ink/80 dark:text-cream/80 space-y-2 mb-3 leading-relaxed">
                      <li class="flex items-start gap-2">
                        <span class="text-pink-500 flex-none font-bold">✓</span>
                        <span><strong>432 Hz Solfeggio Bells:</strong> Gentle notes tuned to mimic a mother's resting heart rate.</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-pink-500 flex-none font-bold">✓</span>
                        <span><strong>2700K Amber Glow:</strong> Blue-light-free nightlights that safely preserve melatonin.</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-pink-500 flex-none font-bold">✓</span>
                        <span><strong>Tactile Wooden Toys:</strong> Physics blocks and gentle stars for tired giggles.</span>
                      </li>
                    </ul>
                  </div>

                  <button 
                    id="btn-demo-baby-chime" 
                    type="button" 
                    class="mt-3 w-full py-2 px-3 rounded-xl bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/40 dark:hover:bg-pink-800/60 text-pink-700 dark:text-pink-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>✨</span> <span>Hear Baby Sleep Chime (432 Hz)</span>
                  </button>
                </div>

                <!-- For Loving Parents -->
                <div class="rounded-2xl p-5 bg-gradient-to-br from-amber-50/95 via-orange-50/80 to-white/95 dark:from-amber-950/60 dark:to-plum-950/50 border-2 border-amber-200/90 dark:border-amber-500/30 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between gap-2 mb-3">
                      <div class="flex items-center gap-2">
                        <span class="text-2xl">🧑‍🍼</span>
                        <h4 class="font-display font-bold text-base text-amber-900 dark:text-amber-300">For Loving Parents</h4>
                      </div>
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200">Midnight Relief</span>
                    </div>

                    <ul class="text-xs text-ink/80 dark:text-cream/80 space-y-2 mb-3 leading-relaxed">
                      <li class="flex items-start gap-2">
                        <span class="text-amber-600 flex-none font-bold">✓</span>
                        <span><strong>Bilingual Lullaby Lyrics:</strong> Sing-along to classic Hindi & global rhymes with ease.</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-amber-600 flex-none font-bold">✓</span>
                        <span><strong>Calming White Noise:</strong> Skylight rain, crickets, and hearth breeze on demand.</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-amber-600 flex-none font-bold">✓</span>
                        <span><strong>Bedtime Storybooks:</strong> Ready-to-read illustrated tales for midnight pacing.</span>
                      </li>
                    </ul>
                  </div>

                  <button 
                    id="btn-demo-parent-rain" 
                    type="button" 
                    class="mt-3 w-full py-2 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/40 dark:hover:bg-amber-800/60 text-amber-800 dark:text-amber-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>🌧️</span> <span id="parent-rain-btn-label">Sample Calming Rain</span>
                  </button>
                </div>
              </div>

              <!-- Interactive Actions & Sleep Science Tag -->
              <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div class="flex flex-wrap items-center gap-3">
                  <a href="#work" class="btn-berry px-6 py-2.5 rounded-full font-display font-bold text-xs sm:text-sm text-white shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2">
                    <span>🛠️</span> <span>Explore Pip’s 5 Bedtime Inventions</span>
                  </a>

                  <button 
                    id="about-stardust-btn" 
                    type="button" 
                    class="px-4 py-2.5 rounded-full font-display font-bold text-xs sm:text-sm glass-panel border border-berry/30 dark:border-white/20 text-berry dark:text-moon hover:bg-berry/10 dark:hover:bg-white/10 shadow-xs hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>✨</span> <span>Sprinkle Dream Dust</span>
                  </button>
                </div>

                <div class="text-[11px] font-semibold text-ink/60 dark:text-cream/60 flex items-center gap-2">
                  <span>✦ 100% Free</span>
                  <span>·</span>
                  <span>No Ads</span>
                  <span>·</span>
                  <span>Pediatric Sleep Sound Science</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  `;
}
