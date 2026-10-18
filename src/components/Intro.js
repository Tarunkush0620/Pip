export function renderIntro() {
  return `
    <!-- Cinematic Edge-to-Edge Full-Page Intro Video Experience -->
    <div id="pip-intro-overlay" class="fixed inset-0 z-[99999] bg-black overflow-hidden select-none transition-all duration-1000">
      
      <!-- Edge-to-Edge Fullscreen Video -->
      <video
        id="pip-intro-video"
        src="/intro.mp4"
        playsinline
        preload="auto"
        class="absolute inset-0 w-full h-full object-cover cursor-pointer"
      >
        <source src="/intro.mp4" type="video/mp4" />
        <source src="/assets/videos/intro.mp4" type="video/mp4" />
      </video>

      <!-- Soft Atmospheric Vignette (Enhances Contrast for Overlaid HUD) -->
      <div class="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>


      <!-- Professional Top Floating HUD -->
      <div id="intro-top-hud" class="absolute top-[max(1rem,env(safe-area-inset-top,1rem))] left-3.5 right-3.5 sm:top-8 sm:left-8 sm:right-8 flex items-center justify-between z-20 pointer-events-none transition-opacity duration-500 gap-2">
        <div class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/55 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-semibold shadow-lg pointer-events-auto transition-colors shrink-0">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span class="font-display tracking-wide"><span class="hidden sm:inline">Midnight Nursery · </span>Prologue</span>
        </div>

        <button id="skip-intro-btn-top" type="button" class="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full font-display font-bold text-xs sm:text-sm text-white bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/30 transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 flex items-center gap-1.5 sm:gap-2 cursor-pointer pointer-events-auto">
          <span>Skip</span>
          <span class="text-pink-300 font-extrabold text-xs sm:text-sm">↷</span>
        </button>
      </div>

      <!-- Professional Bottom Floating HUD -->
      <div id="intro-bottom-hud" class="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom,1.25rem))] right-3.5 sm:right-8 z-20 pointer-events-auto transition-opacity duration-500">
        <!-- Enter Website CTA Pill -->
        <button id="skip-intro-btn" type="button" class="px-5 py-2.5 sm:px-7 sm:py-3 rounded-full font-display font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-berry via-pink-500 to-rose-400 hover:from-berry-dark hover:to-pink-600 backdrop-blur-md border border-white/30 transition-all duration-300 shadow-2xl shadow-berry/40 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer">
          <span>Enter Pip’s Nursery</span>
          <span class="text-amber-200 font-extrabold text-sm sm:text-base">✨</span>
        </button>
      </div>



    </div>
  `;
}
