export function renderFooter() {
  return `
    <footer class="end relative min-h-screen flex flex-col items-center justify-between text-center px-6 pt-20 pb-10 overflow-hidden text-ink dark:text-cream z-20">
      
      <!-- Celestial Multi-layered Glowing Crescent Moon with Craters -->
      <div class="absolute top-8 right-6 sm:right-16 pointer-events-none z-10 animate-float-gentle select-none" aria-hidden="true">
        <div class="relative w-28 sm:w-36 h-28 sm:h-36 rounded-full" style="background: radial-gradient(circle at 68% 32%, #FFF4C2 0%, #F4D77B 38%, #D4A330 75%, #7A530C 100%); box-shadow: inset -20px -12px 0 rgba(47, 22, 52, 0.45), 0 0 50px rgba(244, 215, 123, 0.5), 0 0 100px rgba(244, 215, 123, 0.25);">
          <!-- Surface Craters -->
          <div class="absolute top-4 left-5 w-4 h-4 rounded-full bg-[#B8871E]/30 shadow-inner"></div>
          <div class="absolute top-11 left-9 w-6 h-6 rounded-full bg-[#B8871E]/25 shadow-inner"></div>
          <div class="absolute bottom-5 left-7 w-3.5 h-3.5 rounded-full bg-[#B8871E]/30 shadow-inner"></div>
          <div class="absolute top-7 left-16 w-2.5 h-2.5 rounded-full bg-[#B8871E]/20 shadow-inner"></div>
          <!-- Orbital Halo -->
          <div class="absolute -inset-3 rounded-full border border-moon/30 rotate-12 animate-[spin_50s_linear_infinite]"></div>
        </div>
      </div>

      <!-- Atmospheric Ambient Glow -->
      <div class="absolute inset-0 pointer-events-none opacity-30">
        <div class="absolute top-1/4 -left-12 w-80 h-28 rounded-full bg-blush/25 blur-3xl animate-cloud-drift"></div>
        <div class="absolute bottom-1/4 -right-12 w-96 h-36 rounded-full bg-lav/25 blur-3xl animate-cloud-drift" style="animation-delay: -7s;"></div>
      </div>

      <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full my-auto glass-panel p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-white/90 dark:border-white/15 shadow-2xl backdrop-blur-2xl bg-white/85 dark:bg-black/35">
        
        <!-- Live Dream Delivery Countdown Badge -->
        <div class="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/95 dark:bg-white/10 border border-berry/30 dark:border-moon/30 shadow-md mb-4 max-w-full">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0"></span>
          <span class="text-[11px] sm:text-xs font-bold text-berry dark:text-moon font-display tracking-wide whitespace-nowrap">Next Dream Flight:</span>
          <span id="dream-countdown" class="font-mono text-xs font-extrabold text-ink dark:text-cream whitespace-nowrap">01:42:15</span>
          <span class="text-[11px] text-ink/70 dark:text-cream/60 hidden sm:inline">· Moon Lane Route</span>
        </div>

        <!-- Main Title -->
        <h2 class="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-berry dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-cream dark:via-[#FFF5E6] dark:to-[#E2C7E5] leading-none select-none drop-shadow-sm mb-3">
          Sleep tight.
        </h2>

        <p class="text-ink/80 dark:text-cream/80 text-base sm:text-lg font-medium max-w-lg mb-6 leading-relaxed">
          Pip is already hard at work fluffing clouds and measuring stardust for tomorrow night’s sweetest dreams.
        </p>

        <!-- Interactive Sleeping Pip Card -->
        <div id="sleeping-pip-card" class="relative group p-4 sm:p-5 rounded-3xl bg-white/90 dark:bg-white/10 border border-pink-200/90 dark:border-white/15 backdrop-blur-xl hover:bg-white dark:hover:bg-white/15 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl max-w-md w-full flex items-center gap-4 text-left mb-6">
          <!-- Rising Zzz Particles -->
          <div class="absolute -top-5 left-10 flex flex-col items-center pointer-events-none">
            <span class="text-xs text-lav font-bold opacity-0 group-hover:opacity-100 transition-opacity animate-bounce">Z</span>
            <span class="text-base text-moon font-bold opacity-80 animate-pulse">z</span>
            <span class="text-lg text-berry dark:text-cream font-bold">z</span>
          </div>

          <div class="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-plum/40 border-2 border-pink-300/60 dark:border-moon/40 flex-none relative shadow-inner">
            <img
              src="/assets/images/pip_avatar_cloud.png"
              alt="Pip sleeping on a cloud"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-deep/15"></div>
          </div>

          <div class="flex-1">
            <div class="flex items-center gap-2 mb-0.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-berry dark:text-moon">Nursery Quiet Ward</span>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] bg-berry text-white font-bold shadow-xs">Tucked in</span>
            </div>
            <h4 class="font-display font-bold text-berry dark:text-cream text-base sm:text-lg">Pip is Snoozing</h4>
            <p class="text-xs text-ink/80 dark:text-cream/80 font-semibold leading-relaxed" id="sleeping-pip-status">
              Tap Pip gently to tuck him in under the cloud quilt ✨
            </p>
          </div>
        </div>

        <!-- Bedtime Soundboard / Nursery Ambient Radio -->
        <div class="p-5 sm:p-6 rounded-3xl bg-white/85 dark:bg-white/10 border border-pink-200/80 dark:border-white/15 backdrop-blur-xl shadow-lg w-full max-w-2xl mb-6">
          <div class="flex items-center justify-between gap-4 mb-3.5 px-1">
            <div class="flex items-center gap-2">
              <span class="text-berry dark:text-moon text-sm">🌙</span>
              <span class="text-xs font-bold uppercase tracking-wider text-ink dark:text-cream font-display">Bedtime Sound Companion</span>
            </div>
            <span class="text-[11px] text-ink/65 dark:text-cream/60 font-semibold">Mix and match sleep sounds</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button id="sound-btn-lullaby" type="button" class="footer-sound-btn p-3.5 rounded-2xl bg-white/90 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-berry/15 dark:border-white/15 text-xs font-semibold text-ink dark:text-cream flex flex-col items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-xs hover:shadow-md cursor-pointer">
              <span class="text-xl">🎵</span>
              <span class="font-bold text-xs text-berry dark:text-cream">Music Box</span>
              <span class="text-[10px] text-ink/70 dark:text-cream/70 font-bold status-text uppercase tracking-wider">Off</span>
            </button>

            <button id="sound-btn-rain" type="button" class="footer-sound-btn p-3.5 rounded-2xl bg-white/90 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-berry/15 dark:border-white/15 text-xs font-semibold text-ink dark:text-cream flex flex-col items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-xs hover:shadow-md cursor-pointer">
              <span class="text-xl">🌧️</span>
              <span class="font-bold text-xs text-berry dark:text-cream">Skylight Rain</span>
              <span class="text-[10px] text-ink/70 dark:text-cream/70 font-bold status-text uppercase tracking-wider">Off</span>
            </button>

            <button id="sound-btn-crickets" type="button" class="footer-sound-btn p-3.5 rounded-2xl bg-white/90 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-berry/15 dark:border-white/15 text-xs font-semibold text-ink dark:text-cream flex flex-col items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-xs hover:shadow-md cursor-pointer">
              <span class="text-xl">🦗</span>
              <span class="font-bold text-xs text-berry dark:text-cream">Night Crickets</span>
              <span class="text-[10px] text-ink/70 dark:text-cream/70 font-bold status-text uppercase tracking-wider">Off</span>
            </button>

            <button id="sound-btn-breeze" type="button" class="footer-sound-btn p-3.5 rounded-2xl bg-white/90 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-berry/15 dark:border-white/15 text-xs font-semibold text-ink dark:text-cream flex flex-col items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-xs hover:shadow-md cursor-pointer">
              <span class="text-xl">☁️</span>
              <span class="font-bold text-xs text-berry dark:text-cream">Cloud Breeze</span>
              <span class="text-[10px] text-ink/70 dark:text-cream/70 font-bold status-text uppercase tracking-wider">Off</span>
            </button>
          </div>
        </div>

        <!-- CTA Action Row -->
        <div class="flex flex-wrap items-center justify-center gap-4">
          <a href="#whispers" class="px-7 py-3.5 rounded-full font-display font-bold text-white bg-gradient-to-r from-berry via-[#F0427F] to-pink-500 hover:from-berry-dark hover:to-pink-600 transition-all duration-300 shadow-xl shadow-berry/30 hover:shadow-berry/50 hover:scale-105 active:scale-95 flex items-center gap-2 text-sm sm:text-base cursor-pointer">
            <span class="text-base">💌</span>
            <span>Leave Pip a lullaby</span>
          </a>

          <a href="#top" class="px-6 py-3.5 rounded-full font-display font-bold text-ink dark:text-cream bg-white/90 hover:bg-white dark:bg-white/15 dark:hover:bg-white/25 border border-berry/20 dark:border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 text-sm sm:text-base shadow-sm cursor-pointer">
            <span>Back to Top</span>
            <span class="text-berry dark:text-moon font-extrabold">↑</span>
          </a>
        </div>

      </div>

      <!-- Silhouetted Midnight Village Rooftops with Dreamscape Harmony -->
      <div class="w-full max-w-5xl mx-auto pt-6 relative">
        <svg viewBox="0 0 1000 110" class="w-full h-auto pointer-events-none select-none drop-shadow-sm" preserveAspectRatio="none">
          <defs>
            <linearGradient id="village-skyline-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--skyline-top, #4A193E)" />
              <stop offset="100%" stop-color="var(--skyline-bottom, #280824)" />
            </linearGradient>
          </defs>
          <!-- Village Silhouette -->
          <polygon points="0,110 0,65 55,30 115,65 175,45 245,85 315,35 375,70 455,25 525,80 615,40 695,85 765,30 835,70 915,35 1000,75 1000,110" fill="url(#village-skyline-grad)" />
          <!-- Chimney Puffs -->
          <circle cx="58" cy="22" r="4" fill="#FBDCE6" opacity="0.6" />
          <circle cx="62" cy="14" r="6" fill="#FBDCE6" opacity="0.4" />
          <circle cx="458" cy="18" r="5" fill="#FFE58F" opacity="0.6" />
          <circle cx="768" cy="22" r="4.5" fill="#D0B8F0" opacity="0.6" />
          <!-- Glowing Bedroom Windows -->
          <rect x="48" y="48" width="14" height="14" rx="2" fill="#FFE58F" opacity="0.95" />
          <rect x="308" y="52" width="13" height="13" rx="2" fill="#FFE58F" opacity="0.9" />
          <rect x="448" y="42" width="14" height="14" rx="2" fill="#FFB4CB" opacity="0.95" />
          <rect x="758" y="46" width="14" height="14" rx="2" fill="#FFE58F" opacity="0.95" />
          <rect x="908" y="50" width="13" height="13" rx="2" fill="#D0B8F0" opacity="0.9" />
        </svg>

        <div class="pt-4 pb-2 border-t border-berry/15 dark:border-white/10 text-xs text-ink/75 dark:text-cream/60 font-semibold flex flex-col sm:flex-row items-center justify-between w-full gap-2 px-2">
          <span>Midnight Nursery · Dream Division</span>
          <span>Designed with Three.js, Tailwind v4 &amp; Web Audio API</span>
          <span>© 2026 Pip · Junior Dream Engineer</span>
        </div>
      </div>

    </footer>
  `;
}
