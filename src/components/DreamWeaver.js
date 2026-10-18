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
          <div class="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/25 shadow-2xl backdrop-blur-2xl">
            <h3 class="font-display font-bold text-xl text-berry dark:text-white mb-1">Nursery Pantry</h3>
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
            <div id="dream-result-card" class="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-moon/80 shadow-2xl relative overflow-hidden transition-all duration-500 backdrop-blur-2xl">
              <div class="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-moon/20 blur-2xl pointer-events-none"></div>

              <div class="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-moon/25 text-moon border border-moon/40 mb-2">
                    Bedtime Certificate #D-${Math.floor(1000 + Math.random() * 9000)}
                  </span>
                  <h3 id="dream-result-title" class="font-display font-bold text-2xl sm:text-3xl text-white leading-tight" style="text-shadow: 0 2px 10px rgba(0,0,0,0.5);">
                    The Golden Floating Marshmallow Cruise
                  </h3>
                </div>
                <div id="dream-orb" class="w-14 h-14 rounded-full bg-gradient-to-br from-moon via-blush to-lav shadow-lg flex items-center justify-center text-2xl flex-none animate-pulse-glow">
                  🌙
                </div>
              </div>

              <div class="inline-flex items-center gap-2 text-xs font-semibold text-moon mb-3">
                <span class="text-cream/80">Vibe:</span>
                <span id="dream-result-vibe" class="px-3 py-1 rounded-full bg-white/15 text-white font-bold border border-white/20">
                  Cozy & Velvety Smooth
                </span>
              </div>

              <p id="dream-result-story" class="text-cream/95 text-sm sm:text-base leading-relaxed mb-6 font-light">
                You drift gently across amber night skies tucked under a warm comforter made of spun clouds, sipping honey milk from a star mug.
              </p>

              <!-- Pip's Hand-drawn Note -->
              <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-start gap-3">
                <span class="text-2xl flex-none">🧸</span>
                <div>
                  <div class="text-xs font-bold text-moon mb-0.5">Pip's Engineering Note</div>
                  <p id="dream-result-quote" class="text-xs sm:text-sm text-cream/90 italic font-medium">
                    “Pip added 3 extra pillows so you won't roll off while giggling!” — Pip
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  `;
}
