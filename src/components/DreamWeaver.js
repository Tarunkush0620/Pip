export function renderDreamWeaver() {
  return `
    <section class="dream-weaver py-24 px-6 sm:px-12 lg:px-20 relative z-20" id="dream-weaver">
      <div class="max-w-7xl mx-auto" id="dream-weaver-container">
        
        <div class="text-center max-w-2xl mx-auto mb-12 glass-panel p-6 sm:p-8 rounded-3xl backdrop-blur-2xl border border-white/25 shadow-2xl">
          <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-moon/20 border border-moon/40 text-moon mb-3 shadow-sm">
            <span>✨</span> <span>Interactive Laboratory</span>
          </div>
          <h2 class="font-display text-4xl sm:text-5xl font-extrabold text-berry dark:text-white leading-tight">
            The Dream Weaver Lab
          </h2>
          <p class="text-ink dark:text-cream/90 text-base sm:text-lg mt-3 font-medium leading-relaxed">
            Pick up to 3 bedtime ingredients. Pip will weave them into an official, 100% nightmare-proof dream card!
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Ingredient Selector Panel -->
          <div class="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/80 dark:border-white/15 shadow-2xl backdrop-blur-2xl bg-white/85 dark:bg-black/40">
            <h3 class="font-display font-bold text-xl text-berry dark:text-moon mb-1">Nursery Pantry</h3>
            <p class="text-xs text-ink/80 dark:text-cream/80 mb-4 font-semibold" id="weaver-selection-summary">Select 2 to 3 soothing ingredients</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5" id="ingredient-list">
              <!-- Dynamically rendered by dreamGenerator.js -->
            </div>

            <button id="weave-btn" type="button" class="btn-berry mt-6 w-full py-3.5 rounded-full font-display font-semibold text-white transition-all duration-300 shadow-lg hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer">
              <span>🔮</span>
              <span>Weave Bedtime Dream with Pip</span>
            </button>
          </div>

          <!-- Orb Visual & Generated Dream Card -->
          <div class="lg:col-span-7 flex flex-col gap-6">
            
            <!-- Result Card -->
            <div id="dream-result-card" class="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-moon/80 shadow-2xl relative overflow-hidden transition-all duration-500 backdrop-blur-2xl bg-white/90 dark:bg-black/50">
              <div class="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-moon/20 blur-2xl pointer-events-none"></div>

              <div class="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span id="dream-certificate-badge" class="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 dark:bg-moon/25 text-amber-900 dark:text-moon border border-amber-300 dark:border-moon/40 mb-2 shadow-xs">
                    Bedtime Certificate #D-5405
                  </span>
                  <h3 id="dream-result-title" class="font-display font-bold text-2xl sm:text-3xl text-berry dark:text-moon leading-tight">
                    The Golden Floating Marshmallow Cruise
                  </h3>
                </div>
                <div id="dream-orb" class="w-14 h-14 rounded-full bg-gradient-to-br from-moon via-blush to-lav shadow-lg flex items-center justify-center text-2xl flex-none animate-pulse-glow cursor-pointer" title="Tap dream orb for a stardust sparkle!" onclick="if(window.nurseryAudio) window.nurseryAudio.playPipGiggle();">
                  🌙
                </div>
              </div>

              <div class="inline-flex items-center gap-2 text-xs font-semibold mb-3">
                <span class="text-ink/75 dark:text-cream/75 font-bold">Vibe:</span>
                <span id="dream-result-vibe" class="px-3 py-1 rounded-full bg-pink-100 dark:bg-white/15 text-berry dark:text-moon font-bold border border-pink-200 dark:border-white/20 shadow-xs">
                  Cozy & Velvety Smooth
                </span>
              </div>

              <p id="dream-result-story" class="text-ink dark:text-cream/95 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                You drift gently across amber night skies tucked under a warm comforter made of spun clouds, sipping honey milk from a star mug.
              </p>

              <!-- Pip's Hand-drawn Note -->
              <div class="p-4 rounded-2xl bg-pink-100/60 dark:bg-white/10 backdrop-blur-md border border-pink-200/80 dark:border-white/20 flex items-start gap-3 mb-5">
                <span class="text-2xl flex-none">🧸</span>
                <div>
                  <div class="text-xs font-bold text-berry dark:text-moon mb-0.5">Pip's Engineering Note</div>
                  <p id="dream-result-quote" class="text-xs sm:text-sm text-ink/90 dark:text-cream/90 italic font-semibold">
                    “Pip added 3 extra pillows so you won't roll off while giggling!” — Pip
                  </p>
                </div>
              </div>

              <!-- Certificate Interactive Action Tools -->
              <div class="flex items-center gap-2.5 flex-wrap pt-2 border-t border-berry/15 dark:border-white/10">
                <button
                  type="button"
                  id="dream-read-aloud-btn"
                  class="px-4 py-2 rounded-full glass-panel border border-berry/30 hover:border-berry text-berry font-display font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span id="dream-narrate-icon">🔊</span>
                  <span id="dream-narrate-label">Read Dream to Me</span>
                </button>

                <button
                  type="button"
                  id="dream-save-cert-btn"
                  class="px-4 py-2 rounded-full glass-panel border border-amber-300 text-amber-900 dark:text-amber-200 font-display font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>📜</span>
                  <span>Save Certificate</span>
                </button>

                <a
                  href="#whispers"
                  id="dream-whisper-link"
                  class="px-4 py-2 rounded-full bg-berry text-white font-display font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs hover:scale-105 active:scale-95"
                >
                  <span>💌</span>
                  <span>Share in Whispers</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  `;
}
