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

          <!-- The Bedtime Storybook Spread: Built for Babies & Parents -->
          <div id="story-behind-card" class="nursery-storybook-card p-6 sm:p-9 md:p-10 transition-all duration-300">
            
            <!-- Dreamy Ambient Floating Lights -->
            <div class="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-pink-300/35 via-rose-200/25 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-amber-300/35 via-yellow-100/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

            <div class="relative z-10">
              
              <!-- Top Nursery Chapter Header & Audio Story Bar -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-pink-200/40 dark:border-white/10 mb-6">
                <div class="flex items-center gap-2.5">
                  <span class="w-9 h-9 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center text-lg flex-none shadow-xs">🌙</span>
                  <div>
                    <span class="text-[11px] font-black uppercase tracking-widest text-berry/80 dark:text-pink-300">Nursery Storybook · Chapter I</span>
                    <p class="text-xs text-ink/60 dark:text-cream/60">An enchanted bedtime origin tale</p>
                  </div>
                </div>

                <!-- Pillowy Audio Player Button -->
                <button 
                  id="story-narrate-btn" 
                  type="button" 
                  class="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-display font-bold text-xs shadow-md shadow-pink-500/25 hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer self-start sm:self-auto"
                  aria-label="Listen to Pip's bedtime story read aloud"
                >
                  <span id="story-narrate-icon" class="text-sm">🔊</span>
                  <span id="story-narrate-text">Listen to Bedtime Story</span>
                  <span class="flex items-center gap-0.5 ml-1 opacity-80">
                    <span class="w-1 h-2.5 bg-white rounded-full animate-bounce"></span>
                    <span class="w-1 h-4 bg-white rounded-full animate-bounce [animation-delay:0.15s]"></span>
                    <span class="w-1 h-2 bg-white rounded-full animate-bounce [animation-delay:0.3s]"></span>
                  </span>
                </button>
              </div>

              <!-- Title & Story Narrative -->
              <div class="mb-7">
                <h3 class="font-display text-3xl sm:text-4xl md:text-[2.65rem] font-black text-berry dark:text-moon leading-tight tracking-tight mb-3">
                  Why Pip Built This Nursery 🧸
                </h3>
                
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 dark:bg-amber-950/60 border border-amber-300/60 dark:border-amber-500/30 text-xs font-bold text-amber-950 dark:text-amber-200 mb-5 shadow-2xs">
                  <span>✨</span> <span>Born from 2:00 AM nursery tears · Crafted with starlight & pediatric care</span>
                </div>

                <!-- Illustrated Story Passages -->
                <div class="space-y-4 text-sm sm:text-base text-ink/90 dark:text-cream/90 leading-relaxed font-normal">
                  <p>
                    <span class="nursery-drop-cap">O</span>ne quiet twilight in Somnia, Pip peered through his starlight telescope down at Earth. In the darkened nurseries below, <strong>little babies were crying softly in their cribs</strong>—the midnight silence felt too wide, the room shadows felt scary, and loving mothers and fathers were pacing the floor at 2:00 AM with weary eyes and heavy arms.
                  </p>
                  <p>
                    Pip hated cold silence and couldn’t bear to see anyone cry. So he rolled up his nightgown sleeves, gathered moonbeam wool, and engineered this enchanted haven: <strong>a comforting world designed specifically to calm restless little souls and give exhausted parents their breath back.</strong>
                  </p>
                </div>
              </div>

              <!-- Cozy Cloud Lullaby Whisper -->
              <div class="nursery-cloud-whisper p-5 sm:p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-white dark:bg-plum-900/60 shadow-sm flex items-center justify-center text-3xl flex-none border border-pink-200/60 dark:border-white/10">
                  🧸
                </div>
                <div class="flex-1">
                  <p class="font-display italic text-sm sm:text-base text-berry dark:text-pink-200 font-semibold leading-relaxed">
                    “Babies don’t need loud silence—they need the gentle hum of safety. And parents walking the hallway at 2:00 AM deserve a magical friend to carry the melody.”
                  </p>
                  <div class="flex items-center gap-2 mt-2 text-xs font-bold text-ink/70 dark:text-cream/70">
                    <span class="text-berry dark:text-moon font-extrabold">— Baby Pip</span>
                    <span>·</span>
                    <span>Chief Slumber Weaver & Cradle Companion</span>
                  </div>
                </div>
              </div>

              <!-- Dual Sensory Cradles (Babies & Parents) -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                
                <!-- Cradle 1: For Little Dreamers (Babies) -->
                <div class="sensory-cradle-baby p-6 flex flex-col justify-between transition-all duration-300">
                  <div>
                    <!-- Card Header -->
                    <div class="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-pink-200/50 dark:border-pink-800/40">
                      <div class="flex items-center gap-2.5">
                        <span class="text-3xl">👶</span>
                        <div>
                          <h4 class="font-display font-black text-lg text-berry dark:text-pink-300 leading-tight">In the Baby’s Cradle</h4>
                          <p class="text-[11px] font-medium text-pink-700/80 dark:text-pink-300/70">Sensory Calm & Sweet Dreams</p>
                        </div>
                      </div>
                      <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-pink-200/80 text-pink-800 dark:bg-pink-900 dark:text-pink-200 shadow-2xs">Ages 0 - 4</span>
                    </div>

                    <!-- Tactile Visual Items -->
                    <div class="space-y-3 mb-5">
                      <div class="sensory-toy-card">
                        <span class="text-2xl p-2 rounded-xl bg-pink-100 dark:bg-pink-900/50 flex-none">🔔</span>
                        <div>
                          <h5 class="font-display font-bold text-xs text-berry dark:text-pink-200">432 Hz Music Box Bells</h5>
                          <p class="text-[11px] text-ink/75 dark:text-cream/75 leading-tight mt-0.5">Warm solfeggio chimes tuned to mimic a mother's resting heart rate.</p>
                        </div>
                      </div>

                      <div class="sensory-toy-card">
                        <span class="text-2xl p-2 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex-none">🌕</span>
                        <div>
                          <h5 class="font-display font-bold text-xs text-amber-950 dark:text-amber-200">2700K Melatonin Nightlight</h5>
                          <p class="text-[11px] text-ink/75 dark:text-cream/75 leading-tight mt-0.5">Gentle zero-blue amber light that preserves natural sleep hormones.</p>
                        </div>
                      </div>

                      <div class="sensory-toy-card">
                        <span class="text-2xl p-2 rounded-xl bg-rose-100 dark:bg-rose-900/50 flex-none">🧸</span>
                        <div>
                          <h5 class="font-display font-bold text-xs text-berry dark:text-pink-200">Playful Cloud Blocks</h5>
                          <p class="text-[11px] text-ink/75 dark:text-cream/75 leading-tight mt-0.5">Interactive wooden blocks with gentle physics for sleepy giggles.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Sensory Action -->
                  <button 
                    id="btn-demo-baby-chime" 
                    type="button" 
                    class="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-display font-bold text-xs sm:text-sm shadow-md shadow-pink-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>✨</span> <span>Play 432 Hz Crib Chime</span>
                  </button>
                </div>

                <!-- Cradle 2: For Loving Caregivers (Parents) -->
                <div class="sensory-cradle-parent p-6 flex flex-col justify-between transition-all duration-300">
                  <div>
                    <!-- Card Header -->
                    <div class="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-amber-200/50 dark:border-amber-800/40">
                      <div class="flex items-center gap-2.5">
                        <span class="text-3xl">🧑‍🍼</span>
                        <div>
                          <h4 class="font-display font-black text-lg text-amber-950 dark:text-amber-300 leading-tight">In the Parent’s Arms</h4>
                          <p class="text-[11px] font-medium text-amber-800/80 dark:text-amber-300/70">2:00 AM Midnight Relief</p>
                        </div>
                      </div>
                      <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-200/80 text-amber-900 dark:bg-amber-900 dark:text-amber-200 shadow-2xs">For Caregivers</span>
                    </div>

                    <!-- Tactile Visual Items -->
                    <div class="space-y-3 mb-5">
                      <div class="sensory-toy-card">
                        <span class="text-2xl p-2 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex-none">🎶</span>
                        <div>
                          <h5 class="font-display font-bold text-xs text-amber-950 dark:text-amber-200">Sing-Along Lullabies</h5>
                          <p class="text-[11px] text-ink/75 dark:text-cream/75 leading-tight mt-0.5">Bilingual lyrics for Chanda Mama & global classics when words fade.</p>
                        </div>
                      </div>

                      <div class="sensory-toy-card">
                        <span class="text-2xl p-2 rounded-xl bg-sky-100 dark:bg-sky-900/50 flex-none">🌧️</span>
                        <div>
                          <h5 class="font-display font-bold text-xs text-sky-950 dark:text-sky-200">Skylight White Noise</h5>
                          <p class="text-[11px] text-ink/75 dark:text-cream/75 leading-tight mt-0.5">Soothing nursery rain and hearth crickets to mask outside sounds.</p>
                        </div>
                      </div>

                      <div class="sensory-toy-card">
                        <span class="text-2xl p-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex-none">📖</span>
                        <div>
                          <h5 class="font-display font-bold text-xs text-purple-950 dark:text-purple-200">3-Minute Bedtime Tales</h5>
                          <p class="text-[11px] text-ink/75 dark:text-cream/75 leading-tight mt-0.5">Ready-to-read illustrated stories when you are too tired to improvise.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Sensory Action -->
                  <button 
                    id="btn-demo-parent-rain" 
                    type="button" 
                    class="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-display font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>🌧️</span> <span id="parent-rain-btn-label">Start Calming Skylight Rain</span>
                  </button>
                </div>

              </div>

              <!-- Whimsical Nursery Footer Actions -->
              <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-pink-200/40 dark:border-white/10">
                <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <a href="#work" class="flex-1 sm:flex-none justify-center px-6 py-3 rounded-full bg-berry hover:bg-berry/90 text-white font-display font-bold text-xs sm:text-sm shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2">
                    <span>🎠</span> <span>Explore Pip’s 5 Sleep Inventions</span>
                  </a>

                  <button 
                    id="about-stardust-btn" 
                    type="button" 
                    class="flex-1 sm:flex-none justify-center px-5 py-3 rounded-full bg-white/90 dark:bg-black/40 border border-pink-300 dark:border-white/20 text-berry dark:text-moon font-display font-bold text-xs sm:text-sm shadow-sm hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>✨</span> <span>Sprinkle Baby Stardust</span>
                  </button>
                </div>

                <!-- Pedagogy & Safety Seal -->
                <div class="flex items-center gap-2 text-[11px] font-bold text-ink/60 dark:text-cream/60">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Pediatric Sleep Sound Standards · 100% Free · Ad-Free Haven</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  `;
}
