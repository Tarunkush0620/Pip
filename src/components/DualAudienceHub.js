// Dual Audience Hub: Baby Sensory Mode 👶 & Parent Sanctuary Mode 🧑‍🍼
// Tailored UX specifically engineered for babies (sensory stimulation & calming)
// and parents (bedtime routines, sleep timers, sing-along lyrics & pediatric science).

export function renderDualAudienceHub() {
  const nurseryRhymesLyrics = [
    {
      id: 'lakdi-ki-kaathi',
      title: 'Lakdi Ki Kaathi (लकड़ी की काठी)',
      badge: 'Energetic Play · Wind-Down Transition',
      phonetic: 'Lakdi ki kaathi, kaathi pe ghoda, Ghode ki dum pe jo maara hathoda...',
      english: 'A wooden saddle upon a wooden horse, when we tapped the horse’s tail, off galloped the horse to the market bazaar!',
      pediatricTip: 'Ideal for early evening play before bathtime to tire out restless legs with bouncy rhythmic clapping.'
    },
    {
      id: 'chanda-mama',
      title: 'Chanda Mama Door Ke (चंदा मामा दूर के)',
      badge: 'Classic Sleep Lullaby · 432 Hz',
      phonetic: 'Chanda mama door ke, puye pakayein boor ke. Aap khayein thali mein, munne ko dein pyali mein...',
      english: 'Uncle Moon so far away, cooking sweet cakes in the celestial sky. You eat from a golden plate, and give my sweet baby a tiny cup...',
      pediatricTip: 'Slow pentatonic cadence slows respiratory rate down to infant sleeping rhythm (24-30 breaths per minute).'
    },
    {
      id: 'nani-teri-morni',
      title: 'Nani Teri Morni (नानी तेरी मोरनी)',
      badge: 'Story Song · Bonding',
      phonetic: 'Nani teri morni ko mor le gaye, baaki jo bacha tha kaale chor le gaye...',
      english: 'Grandma, the peacock took your peahen away! And the little thieves took the rest. Now sleep tight with sweet dreams...',
      pediatricTip: 'Story rhymes stimulate early language phoneme recognition and vocal mimicry in infants 6-18 months.'
    },
    {
      id: 'lalla-lalla-lori',
      title: 'Lalla Lalla Lori (लल्ला लल्ला लोरी)',
      badge: 'Deep Slumber · Warm Milk Ritual',
      phonetic: 'Lalla lalla lori, doodh ki katori, doodh mein batasha, munni kare tamasha...',
      english: 'Lullaby, lullaby, a little bowl of warm milk with sweet sugar drops. My little baby watches with sweet sleepy eyes...',
      pediatricTip: 'The soft "L" and "M" phonemes act as biological auditory pacifiers that lower cortisol.'
    },
    {
      id: 'twinkle-twinkle',
      title: 'Twinkle Twinkle Little Star (ट्विंकल ट्विंकल)',
      badge: 'Universal Classic · Celestial Peace',
      phonetic: 'Twinkle twinkle little star, how I wonder what you are. Up above the world so high, like a diamond in the sky...',
      english: 'A timeless global lullaby that paints the night sky as a protective, shimmering canopy watching over sleep.',
      pediatricTip: 'Predictable melodic intervals trigger safety neurochemicals, easing bedtime separation anxiety.'
    },
    {
      id: 'machhli-jal',
      title: 'Machhli Jal Ki Rani Hai (मछली जल की रानी है)',
      badge: 'Sensory Rhythm · Hand Gestures',
      phonetic: 'Machhli jal ki rani hai, jeevan uska paani hai. Haath lagao toh darr jaayegi, baahar nikaalo toh marr jaayegi...',
      english: 'The little fish is the queen of the waters, swimming safe and cool in the gentle waves...',
      pediatricTip: 'Great for gentle parent-baby hand-swimming gestures in the warm evening bath.'
    }
  ];

  return `
    <section class="dual-audience-section py-20 px-4 sm:px-8 lg:px-16 relative z-20" id="dual-hub">
      <div class="max-w-7xl mx-auto">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-10">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-berry/10 dark:bg-white/10 text-berry dark:text-moon font-display font-bold text-xs uppercase tracking-wider mb-3 border border-berry/20">
            <span>👶</span> <span>Designed for Tiny Dreamers & Loving Parents</span> <span>🧑‍🍼</span>
          </div>
          <h2 class="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-berry dark:text-cream leading-tight">
            Baby & Parent Haven
          </h2>
          <p class="text-ink dark:text-cream/90 text-sm sm:text-base md:text-lg mt-3 font-medium leading-relaxed">
            Switch between interactive sensory toys for babies and bedtime wind-down tools for parents. Every pixel is crafted for calm and delight.
          </p>

          <!-- Master Mode Switcher Bar -->
          <div class="inline-flex p-1.5 rounded-full glass-panel mt-6 border-2 border-berry/30 shadow-lg gap-2 bg-white/80 dark:bg-black/50" id="hub-mode-toggle-group">
            <button
              type="button"
              id="hub-btn-baby-mode"
              class="hub-mode-btn is-active px-5 sm:px-7 py-2.5 rounded-full font-display font-bold text-xs sm:text-sm flex items-center gap-2 transition-all duration-300 shadow-md bg-berry text-white cursor-pointer"
            >
              <span class="text-base">👶</span>
              <span>Baby Sensory Mode</span>
            </button>
            <button
              type="button"
              id="hub-btn-parent-mode"
              class="hub-mode-btn px-5 sm:px-7 py-2.5 rounded-full font-display font-bold text-xs sm:text-sm flex items-center gap-2 transition-all duration-300 text-ink dark:text-cream hover:text-berry cursor-pointer"
            >
              <span class="text-base">🧑‍🍼</span>
              <span>Parent Sanctuary Mode</span>
            </button>
          </div>
        </div>

        <!-- ===================================================================
             1. BABY SENSORY MODE PANEL
             =================================================================== -->
        <div id="panel-baby-sensory" class="hub-view-panel block transition-all duration-500">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- Interactive Baby Rattle & Squeaky Toy Console -->
            <div class="lg:col-span-6 flex flex-col gap-6">
              <div class="rounded-3xl glass-panel p-6 sm:p-8 border-2 border-pink-300/60 dark:border-pink-500/30 shadow-xl bg-gradient-to-br from-pink-50/90 to-white/90 dark:from-pink-950/40 dark:to-[#160822]/90 relative overflow-hidden">
                <div class="flex items-center justify-between mb-4">
                  <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-berry">
                    <span>🧸</span> <span>Tactile Sensory Toy</span>
                  </div>
                  <span class="text-[11px] font-extrabold px-3 py-1 rounded-full bg-pink-200/80 text-berry">Baby Safe</span>
                </div>

                <h3 class="font-display text-2xl sm:text-3xl font-bold text-berry mb-2">
                  Pip’s Magic Baby Rattle
                </h3>
                <p class="text-xs sm:text-sm text-ink/80 dark:text-cream/80 mb-6">
                  Tap, click, or shake the rattle! It rings with real soothing maraca beads, plays bells, and triggers Pip's joyful baby giggles.
                </p>

                <!-- 3D Baby Rattle Interactive Trigger -->
                <div class="flex flex-col items-center justify-center py-6">
                  <div
                    id="interactive-baby-rattle"
                    class="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-pink-300 via-lav-light to-amber-200 border-4 border-white dark:border-pink-300/40 shadow-2xl flex flex-col items-center justify-center cursor-pointer select-none transition-transform active:scale-90 hover:scale-105 animate-pulse-glow"
                    title="Tap to shake the rattle!"
                  >
                    <span class="text-5xl sm:text-6xl select-none" id="rattle-toy-icon">🪇</span>
                    <span class="text-xs font-display font-extrabold text-berry mt-2 tracking-wide uppercase">Shake Me!</span>
                  </div>
                  <span class="text-xs text-berry font-bold mt-4" id="rattle-feedback-text">✦ Tap to hear the gentle rattle beads ✦</span>
                </div>

                <!-- Secondary Sensory Buttons -->
                <div class="grid grid-cols-2 gap-3 mt-4">
                  <button
                    type="button"
                    id="baby-toy-squeak-btn"
                    class="p-3.5 rounded-2xl glass-panel border border-pink-200 hover:border-berry text-berry font-display font-bold text-xs flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
                  >
                    <span>🐥</span> <span>Squeaky Duck</span>
                  </button>
                  <button
                    type="button"
                    id="baby-giggle-btn"
                    class="p-3.5 rounded-2xl glass-panel border border-pink-200 hover:border-berry text-berry font-display font-bold text-xs flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
                  >
                    <span>✨</span> <span>Pip’s Giggle</span>
                  </button>
                </div>
              </div>

              <!-- High Contrast / Calming Visual Mode for Infants -->
              <div class="rounded-3xl glass-panel p-6 border border-berry/20 shadow-md flex items-center justify-between flex-wrap gap-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-2xl bg-berry/10 dark:bg-white/10 flex items-center justify-center text-2xl flex-none">
                    👀
                  </div>
                  <div>
                    <h4 class="font-display font-bold text-sm sm:text-base text-berry dark:text-moon">Newborn Visual Filter (0–6 Mo)</h4>
                    <p class="text-xs text-ink/70 dark:text-cream/70">Toggles gentle high-contrast outlines for developing infant eyes.</p>
                  </div>
                </div>
                <button
                  type="button"
                  id="toggle-high-contrast-infant"
                  class="px-4 py-2 rounded-full font-display font-bold text-xs bg-berry text-white hover:bg-berry-dark shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  Toggle Filter
                </button>
              </div>
            </div>

            <!-- Tap-to-Pop Stardust Bubbles Playground -->
            <div class="lg:col-span-6 flex flex-col gap-6">
              <div class="rounded-3xl glass-panel p-6 sm:p-8 border-2 border-lav/40 dark:border-lav/30 shadow-xl bg-gradient-to-br from-lav-light/90 to-white/90 dark:from-[#210D35]/90 dark:to-[#160822]/90 relative overflow-hidden">
                <div class="flex items-center justify-between mb-2">
                  <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lav">
                    <span>🫧</span> <span>Motor Skill Play</span>
                  </div>
                  <span id="bubbles-popped-counter" class="text-xs font-bold px-3 py-1 rounded-full bg-lav/20 text-lav dark:text-moon">
                    0 Bubbles Popped
                  </span>
                </div>

                <h3 class="font-display text-2xl sm:text-3xl font-bold text-lav dark:text-moon mb-2">
                  Tap-to-Pop Stardust Bubbles
                </h3>
                <p class="text-xs sm:text-sm text-ink/80 dark:text-cream/80 mb-4">
                  Touch anywhere in this bubble garden to pop floating iridescent stardust bubbles. Every pop plays a gentle harmonic chime!
                </p>

                <!-- Interactive Bubble Garden Stage -->
                <div
                  id="bubble-interactive-stage"
                  class="relative w-full h-72 sm:h-84 rounded-2xl bg-radial-gradient border-2 border-white/80 dark:border-white/15 overflow-hidden shadow-inner cursor-pointer select-none"
                  style="background: radial-gradient(circle at center, rgba(237, 231, 246, 0.9), rgba(251, 220, 230, 0.5));"
                >
                  <!-- Floating Bubbles will be injected and float upwards dynamically -->
                  <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 text-center px-4">
                    <span class="text-xs sm:text-sm font-display font-bold text-berry">
                      ✦ Tap anywhere inside to spawn & pop bubbles! ✦
                    </span>
                  </div>
                </div>

                <div class="mt-4 flex items-center justify-between text-xs text-ink/60 dark:text-cream/60">
                  <span>💡 Builds hand-eye coordination</span>
                  <button
                    type="button"
                    id="spawn-bubble-swarm-btn"
                    class="px-3.5 py-1.5 rounded-full glass-panel border border-lav/40 text-lav dark:text-moon font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    🫧 Release Bubble Swarm
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- ===================================================================
             2. PARENT SANCTUARY MODE PANEL
             =================================================================== -->
        <div id="panel-parent-sanctuary" class="hub-view-panel hidden transition-all duration-500">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- Bedtime Wind-Down Assistant & Sleep Timer -->
            <div class="lg:col-span-5 flex flex-col gap-6">
              <div class="rounded-3xl glass-panel p-6 sm:p-8 border-2 border-amber-300/60 dark:border-amber-500/30 shadow-xl bg-gradient-to-br from-amber-50/90 to-white/90 dark:from-amber-950/40 dark:to-[#160822]/90">
                <div class="flex items-center justify-between mb-3">
                  <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    <span>⏱️</span> <span>Bedtime Routine Assistant</span>
                  </div>
                  <span class="text-[11px] font-extrabold px-3 py-1 rounded-full bg-amber-200/80 text-amber-900">Sleep Timer</span>
                </div>

                <h3 class="font-display text-2xl sm:text-3xl font-bold text-amber-900 dark:text-amber-200 mb-2">
                  Bedtime Wind-Down Timer
                </h3>
                <p class="text-xs sm:text-sm text-ink/80 dark:text-cream/80 mb-5">
                  Select a duration. The timer gently fades ambient sounds, dims the screen, and transitions into midnight as your baby drifts to sleep.
                </p>

                <!-- Active Timer Display -->
                <div class="p-6 rounded-2xl glass-panel border border-amber-300/40 text-center mb-6 bg-white/70 dark:bg-black/40">
                  <span class="text-xs uppercase font-extrabold text-amber-800 dark:text-amber-300 tracking-wider block mb-1">Time Remaining</span>
                  <div class="font-display text-4xl sm:text-5xl font-extrabold text-berry dark:text-moon font-mono tracking-tight" id="parent-timer-display">
                    --:--
                  </div>
                  <span class="text-xs text-ink/60 dark:text-cream/60 mt-1 block" id="parent-timer-status">
                    Select a timer preset below
                  </span>
                </div>

                <!-- Timer Presets -->
                <div class="grid grid-cols-4 gap-2 mb-4">
                  <button type="button" data-minutes="10" class="parent-timer-btn p-2.5 rounded-xl border border-amber-300 text-xs font-bold text-amber-900 dark:text-amber-200 hover:bg-amber-200/50 transition-all cursor-pointer">
                    10 Min
                  </button>
                  <button type="button" data-minutes="20" class="parent-timer-btn p-2.5 rounded-xl border border-amber-300 text-xs font-bold text-amber-900 dark:text-amber-200 hover:bg-amber-200/50 transition-all cursor-pointer">
                    20 Min
                  </button>
                  <button type="button" data-minutes="30" class="parent-timer-btn p-2.5 rounded-xl border border-amber-300 text-xs font-bold text-amber-900 dark:text-amber-200 hover:bg-amber-200/50 transition-all cursor-pointer">
                    30 Min
                  </button>
                  <button type="button" data-minutes="45" class="parent-timer-btn p-2.5 rounded-xl border border-amber-300 text-xs font-bold text-amber-900 dark:text-amber-200 hover:bg-amber-200/50 transition-all cursor-pointer">
                    45 Min
                  </button>
                </div>

                <div class="flex items-center gap-3">
                  <button
                    type="button"
                    id="parent-timer-stop-btn"
                    class="w-full py-2.5 rounded-full border border-berry/30 text-berry font-display font-bold text-xs hover:bg-berry/10 transition-all cursor-pointer"
                  >
                    Reset Timer
                  </button>
                  <button
                    type="button"
                    id="parent-nightlight-screen-btn"
                    class="w-full py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-display font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    💡 Screen Lamp
                  </button>
                </div>
              </div>

              <!-- Pediatric Sleep Science Tips -->
              <div class="rounded-3xl glass-panel p-6 border border-berry/20 shadow-md flex flex-col gap-3">
                <div class="flex items-center gap-2">
                  <span class="text-lg">🩺</span>
                  <h4 class="font-display font-bold text-sm text-berry dark:text-moon">Pediatric Sleep Science</h4>
                </div>
                <ul class="text-xs text-ink/80 dark:text-cream/80 space-y-2 leading-relaxed">
                  <li>✦ <strong>432 Hz Harmonics:</strong> Tuned to natural circadian frequencies that calm infant heart rates.</li>
                  <li>✦ <strong>2700K Amber Glow:</strong> Protects natural melatonin synthesis, preventing bedtime alertness.</li>
                  <li>✦ <strong>Rhythmic Repetition:</strong> Predictable lyrics reassure the amygdala that baby is safe and warm.</li>
                </ul>
              </div>
            </div>

            <!-- Sing-Along Nursery Rhyme Lyrics & Translations Guide -->
            <div class="lg:col-span-7 flex flex-col gap-6">
              <div class="rounded-3xl glass-panel p-6 sm:p-8 border-2 border-pink-300/60 dark:border-pink-500/30 shadow-xl bg-gradient-to-br from-pink-50/90 to-white/90 dark:from-pink-950/40 dark:to-[#160822]/90">
                <div class="flex items-center justify-between mb-3">
                  <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-berry">
                    <span>🎵</span> <span>Sing With Your Child</span>
                  </div>
                  <span class="text-[11px] font-extrabold px-3 py-1 rounded-full bg-pink-200/80 text-berry">Lyrics & Meaning</span>
                </div>

                <h3 class="font-display text-2xl sm:text-3xl font-bold text-berry mb-2">
                  Lullaby Lyrics & Sing-Along Guide
                </h3>
                <p class="text-xs sm:text-sm text-ink/80 dark:text-cream/80 mb-6">
                  Singing to your baby strengthens emotional bonding and accelerates infant speech development. Tap any song to view lyrics, transliteration, and English meanings.
                </p>

                <!-- Rhymes Accordion List -->
                <div class="space-y-3" id="lyrics-accordion-container">
                  ${nurseryRhymesLyrics.map((rhyme, idx) => `
                    <div class="lyrics-card rounded-2xl glass-panel border border-pink-200/80 dark:border-white/10 overflow-hidden transition-all duration-300">
                      <button
                        type="button"
                        class="lyrics-toggle-btn w-full p-4 flex items-center justify-between text-left hover:bg-pink-100/40 dark:hover:bg-white/5 transition-all cursor-pointer"
                        data-rhyme-idx="${idx}"
                      >
                        <div class="flex items-center gap-3">
                          <span class="text-xl">🎶</span>
                          <div>
                            <h4 class="font-display font-bold text-sm text-berry dark:text-cream">${rhyme.title}</h4>
                            <span class="text-[10px] font-semibold text-ink/60 dark:text-cream/60">${rhyme.badge}</span>
                          </div>
                        </div>
                        <span class="lyrics-chevron text-xs text-berry transition-transform duration-300 font-bold">▼</span>
                      </button>

                      <div class="lyrics-drawer px-4 pb-4 hidden flex-col gap-3 border-t border-pink-100 dark:border-white/10 pt-3">
                        <div class="p-3 rounded-xl bg-pink-100/50 dark:bg-pink-950/30 text-xs italic font-medium text-berry leading-relaxed">
                          &ldquo;${rhyme.phonetic}&rdquo;
                        </div>
                        <div class="text-xs text-ink/80 dark:text-cream/80">
                          <strong class="text-berry">English Meaning:</strong> ${rhyme.english}
                        </div>
                        <div class="p-2.5 rounded-xl bg-amber-100/40 dark:bg-amber-950/30 border border-amber-200/60 text-[11px] text-amber-900 dark:text-amber-200 flex items-center gap-2">
                          <span>💡</span>
                          <span>${rhyme.pediatricTip}</span>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- Fullscreen Screen Lamp Nightlight Modal -->
      <div id="fullscreen-nightlight-modal" class="fixed inset-0 z-[9999] bg-[#FFE0B2] text-[#4E342E] hidden flex-col items-center justify-center p-6 text-center select-none animate-fadeIn transition-colors duration-1000" style="background-color: #FFECB3;">
        <div class="w-64 h-64 rounded-full bg-[#FFE082]/60 blur-2xl absolute pointer-events-none animate-pulse-glow"></div>
        <div class="relative z-10 flex flex-col items-center max-w-md">
          <div class="w-32 h-32 rounded-full bg-white/40 border-4 border-white/60 shadow-2xl flex items-center justify-center text-6xl mb-6 animate-float-gentle">
            🌙
          </div>
          <h2 class="font-display text-3xl font-extrabold text-[#5D4037] mb-2">Crib-Side Nightlight Lamp</h2>
          <p class="text-sm text-[#795548] mb-6">
            Soft 2700K soothing light for nursing, diaper changes, and tucking baby into sleep.
          </p>
          <div class="flex items-center gap-3">
            <button
              type="button"
              id="nightlight-color-amber"
              class="px-4 py-2 rounded-full font-bold text-xs bg-[#FFD54F] text-[#3E2723] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Amber Honey 🍯
            </button>
            <button
              type="button"
              id="nightlight-color-lavender"
              class="px-4 py-2 rounded-full font-bold text-xs bg-[#E1BEE7] text-[#4A148C] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Lavender Moon 🌸
            </button>
          </div>
          <button
            type="button"
            id="close-fullscreen-nightlight"
            class="mt-8 px-6 py-2.5 rounded-full bg-[#5D4037] text-white font-display font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            ✕ Exit Nightlight Lamp
          </button>
        </div>
      </div>

    </section>
  `;
}
