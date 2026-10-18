export function renderPip3DStudio() {
  return `
    <section class="py-16 sm:py-24 px-4 sm:px-6 relative z-20" id="3d-pip">
      <div class="max-w-6xl mx-auto">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-moon/30 text-berry mb-3">
            <span>✦</span> <span>Living Dream Companion · Roaming Across Your Website</span>
          </div>
          <h2 class="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-plum tracking-tight leading-tight">
            Meet <span class="text-berry">Pip.</span>
          </h2>
          <p class="text-ink/80 text-sm sm:text-base mt-2.5 font-light leading-relaxed">
            Pip isn’t trapped in a box—he is <strong>alive and roaming all over your website</strong>! Watch him glide across the clouds, burst into happy dances, zoom on stardust sprints, or cuddle in for a cozy nap.
          </p>

          <!-- Quick Roam Command Bar -->
          <div class="mt-4 flex items-center justify-center gap-2 flex-wrap">
            <button onclick="window.activePip3DRoamer && window.activePip3DRoamer.setMode('dance')" class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-berry text-white hover:bg-berry-dark shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5">
              <span>♫</span> <span>Watch Pip Dance</span>
            </button>
            <button onclick="window.activePip3DRoamer && window.activePip3DRoamer.setMode('run')" class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-ink hover:text-berry border border-berry/30 hover:border-berry shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5">
              <span>⚡</span> <span>Star Sprint Run</span>
            </button>
            <button onclick="window.activePip3DRoamer && window.activePip3DRoamer.setMode('sleep')" class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-ink hover:text-berry border border-berry/30 hover:border-berry shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5">
              <span>💤</span> <span>Sleepy Slumber</span>
            </button>
            <button onclick="window.activePip3DRoamer && window.activePip3DRoamer.setMode('roam')" class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-ink hover:text-berry border border-berry/30 hover:border-berry shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5">
              <span>🐾</span> <span>Free Roam</span>
            </button>
            <button onclick="window.activePip3DRoamer && window.activePip3DRoamer.setMode('wave')" class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-moon/60 hover:bg-moon text-ink dark:text-plum shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5">
              <span>☻</span> <span>Wave Hello</span>
            </button>
          </div>
        </div>

        <!-- 3D Studio Stage Frame -->
        <div class="relative w-full rounded-3xl overflow-hidden glass-panel border border-white/80 shadow-2xl shadow-berry/10 bg-[#FAF0E4] dark:bg-[#1C0D26]">
          
          <!-- Top Overlay HUD -->
          <div class="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md border border-white/40 text-xs font-semibold text-berry shadow-sm pointer-events-auto">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span id="pip-3d-status">Idle · Breathing softly</span>
            </div>

            <div class="flex items-center gap-2 pointer-events-auto">
              <button id="pip3d-reset-btn" class="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/80 dark:bg-black/50 hover:bg-white text-ink hover:text-berry border border-white/40 shadow-sm transition-all hover:scale-105 active:scale-95" title="Reset camera angle and pose">
                Reset Pose ↻
              </button>
              <a href="/pip-3d-character.html" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-full text-xs font-semibold bg-berry text-white hover:bg-berry-dark shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1" title="Open standalone full-window 3D mode">
                <span>Fullscreen</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <!-- Canvas Scene Container (Min height for 3D viewport) -->
          <div id="pip-3d-scene-host" class="w-full h-[420px] sm:h-[480px] md:h-[520px] cursor-grab active:cursor-grabbing select-none outline-none">
            <!-- Three.js Canvas injected here by pipCharacter3D.js -->
          </div>

          <!-- Floating Bottom Control Panel -->
          <div class="absolute bottom-4 inset-x-0 flex justify-center px-4 z-20 pointer-events-none">
            <div class="p-2 sm:p-2.5 rounded-2xl bg-white/85 dark:bg-black/70 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xl flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pointer-events-auto">
              <span class="text-[11px] font-bold uppercase tracking-wider text-berry/80 px-2 hidden lg:inline">Actions:</span>
              <button class="px-3 py-1.5 rounded-full text-xs font-bold border border-berry/20 bg-white/90 dark:bg-white/10 text-ink hover:border-berry transition-all active:scale-95 active" data-pip3d-mode="idle">
                ✦ Idle
              </button>
              <button class="px-3 py-1.5 rounded-full text-xs font-bold border border-berry/20 bg-white/90 dark:bg-white/10 text-ink hover:border-berry transition-all active:scale-95" data-pip3d-mode="stand">
                ♙ Stand
              </button>
              <button class="px-3 py-1.5 rounded-full text-xs font-bold border border-berry/20 bg-white/90 dark:bg-white/10 text-ink hover:border-berry transition-all active:scale-95" data-pip3d-mode="play">
                ☆ Play
              </button>
              <button class="px-3 py-1.5 rounded-full text-xs font-bold border border-berry/20 bg-white/90 dark:bg-white/10 text-ink hover:border-berry transition-all active:scale-95" data-pip3d-mode="run">
                ➜ Run
              </button>
              <button class="px-3 py-1.5 rounded-full text-xs font-bold border border-berry/20 bg-white/90 dark:bg-white/10 text-ink hover:border-berry transition-all active:scale-95" data-pip3d-mode="wave">
                ☻ Wave
              </button>
              <button class="px-3 py-1.5 rounded-full text-xs font-bold border border-berry/20 bg-white/90 dark:bg-white/10 text-ink hover:border-berry transition-all active:scale-95" data-pip3d-mode="dance">
                ♫ Dance
              </button>
            </div>
          </div>

          <!-- Interaction Hint Overlay -->
          <div class="absolute bottom-4 left-4 z-10 pointer-events-none hidden md:block">
            <span class="text-[11px] text-ink/50 dark:text-cream/50 bg-white/40 dark:bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
              🖱️ Drag to orbit · Scroll to zoom
            </span>
          </div>

        </div>

      </div>
    </section>
  `;
}
