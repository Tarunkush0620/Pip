export function renderNavbar() {
  return `
    <header class="fixed top-4 left-0 right-0 z-40 px-4 sm:px-6 pointer-events-none">
      <nav class="max-w-5xl mx-auto glass-pill rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between pointer-events-auto shadow-lg shadow-berry/5 transition-all duration-300">
        <a href="#top" class="flex items-center gap-2 group text-berry font-bold text-lg">
          <span class="w-8 h-8 rounded-full bg-berry text-white flex items-center justify-center text-sm shadow-sm transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">✦</span>
          <span class="font-display tracking-tight text-xl text-berry">Pip</span>
        </a>

        <div class="hidden md:flex items-center gap-5 text-sm font-semibold text-[#482038]">
          <a href="#story-origin" class="hover:text-berry transition-colors font-bold flex items-center gap-1 text-berry">
            <span>Story</span>
            <span class="px-1.5 py-0.2 bg-pink-100 text-berry text-[10px] rounded-full font-extrabold border border-pink-200">Origin</span>
          </a>
          <a href="#dual-hub" class="hover:text-berry transition-colors font-bold flex items-center gap-1 text-amber-900 dark:text-amber-200">
            <span>Baby & Parent</span>
            <span class="px-1.5 py-0.2 bg-amber-100 text-amber-900 text-[10px] rounded-full font-extrabold border border-amber-300">Haven</span>
          </a>
          <a href="#about" class="hover:text-berry transition-colors font-semibold">About</a>
          <a href="#work" class="hover:text-berry transition-colors font-semibold">Inventions</a>
          <a href="#world" class="hover:text-berry transition-colors flex items-center gap-1 font-semibold">
            <span>World</span>
            <span class="px-1.5 py-0.2 bg-moon text-[#482038] text-[10px] rounded-full font-bold shadow-xs">Lore</span>
          </a>
          <a href="#dream-weaver" class="hover:text-berry transition-colors flex items-center gap-1 font-semibold">
            <span>Dream Lab</span>
          </a>
          <a href="#growth" class="hover:text-berry transition-colors font-semibold">Growth</a>
          <a href="#whispers" class="hover:text-berry transition-colors font-semibold">Whispers</a>
        </div>

        <div class="flex items-center gap-2">
          <!-- Audience Mode Quick Switcher -->
          <button id="navbar-audience-toggle" type="button" class="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 hover:bg-amber-200 border border-amber-300 flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer" title="Switch Baby Sensory Mode / Parent Sanctuary Mode" onclick="if(window.toggleNavbarAudienceMode) window.toggleNavbarAudienceMode();">
            <span id="navbar-mode-icon">👶</span>
            <span class="hidden sm:inline" id="navbar-mode-label">Baby Mode</span>
          </button>

          <!-- Replay Intro Button -->
          <button id="replay-intro-btn" type="button" class="px-3 py-1.5 rounded-full text-xs font-bold bg-white text-[#482038] hover:text-berry border border-pink-200/80 flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer" title="Replay Opening Video Intro" onclick="if(window.replayPipIntro) window.replayPipIntro();">
            <span>🎬</span>
            <span class="hidden sm:inline">Intro</span>
          </button>

          <!-- Ambient Sound Toggle -->
          <button id="ambient-sound-toggle" type="button" class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-[#482038] hover:text-berry border border-pink-200/80 flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer" aria-pressed="false" title="Toggle bedtime soothing sound">
            <span class="flex items-end gap-0.5 h-3">
              <span class="w-0.5 h-1.5 bg-berry rounded-full"></span>
              <span class="w-0.5 h-3 bg-berry rounded-full"></span>
              <span class="w-0.5 h-2 bg-berry rounded-full"></span>
            </span>
            <span class="hidden sm:inline" id="sound-label">Lullaby Waves</span>
          </button>

          <!-- Sky Cycle Atmosphere Switch (Dawn ☀️ / Twilight 🌅 / Midnight 🌌) -->
          <div class="relative flex items-center bg-berry rounded-full p-0.5 shadow-sm pointer-events-auto">
            <button id="night-mode-toggle" type="button" class="px-2.5 py-1 rounded-full text-xs font-semibold text-white hover:bg-white/15 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer" aria-pressed="false" title="Cycle Sky: Dawn ☀️ → Twilight 🌅 → Midnight 🌌">
              <span id="sky-cycle-icon">☀️</span>
              <span class="hidden sm:inline" id="sky-cycle-label">Dawn</span>
              <!-- 3 Mini Celestial Pips -->
              <span class="flex items-center gap-0.5 ml-0.5">
                <span class="sky-pip w-1.5 h-1.5 rounded-full bg-white transition-all"></span>
                <span class="sky-pip w-1.5 h-1.5 rounded-full bg-white/40 transition-all"></span>
                <span class="sky-pip w-1.5 h-1.5 rounded-full bg-white/40 transition-all"></span>
              </span>
            </button>
            <button id="sky-hud-open-btn" type="button" class="w-6 h-6 rounded-full hover:bg-white/20 text-white flex items-center justify-center text-xs transition-all active:scale-90 cursor-pointer" title="Open Sky & Lighting Atmosphere HUD" aria-label="Open Atmosphere HUD">
              ⚙️
            </button>

            <!-- Dynamic Sky & Atmosphere Lighting HUD Drawer -->
            <div id="sky-atmosphere-hud" class="pointer-events-auto absolute right-0 top-11 w-[calc(100vw-2rem)] max-w-sm sm:w-88 p-4 rounded-3xl glass-panel bg-white/95 dark:bg-[#1C0A2E]/95 border border-berry/20 dark:border-white/20 shadow-2xl backdrop-blur-xl hidden flex-col gap-3 z-50 text-ink dark:text-cream animate-fadeIn" style="box-shadow: 0 20px 45px rgba(28, 10, 46, 0.45);">
              
              <!-- HUD Header -->
              <div class="flex items-center justify-between border-b border-berry/15 dark:border-white/10 pb-2">
                <div class="flex items-center gap-2">
                  <span class="text-base">✨</span>
                  <div>
                    <h4 class="font-display font-bold text-sm text-berry dark:text-moon leading-tight">Sky Cycle & Atmosphere</h4>
                    <span class="text-[10px] text-ink/70 dark:text-cream/70">Dynamic Lighting & Particle FX</span>
                  </div>
                </div>
                <button id="sky-hud-close-btn" class="w-6 h-6 rounded-full bg-berry/10 hover:bg-berry/20 dark:bg-white/10 dark:hover:bg-white/20 text-berry dark:text-cream flex items-center justify-center text-xs font-bold transition-all cursor-pointer" aria-label="Close Sky HUD">
                  ✕
                </button>
              </div>

              <!-- Time of Day Slider -->
              <div>
                <div class="flex items-center justify-between text-xs font-semibold mb-1">
                  <span>Celestial Time Slider</span>
                  <span class="text-berry dark:text-moon font-mono text-[11px]" id="sky-hud-time-val">Dawn · 06:30</span>
                </div>
                <input
                  type="range"
                  id="sky-time-slider"
                  min="0"
                  max="2"
                  step="1"
                  value="0"
                  class="w-full accent-berry cursor-pointer h-2 bg-berry/20 dark:bg-white/15 rounded-lg appearance-none"
                />
                <div class="flex items-center justify-between text-[10px] text-ink/60 dark:text-cream/60 mt-1 px-0.5">
                  <span>☀️ 06:00 Dawn</span>
                  <span>🌅 19:30 Twilight</span>
                  <span>🌌 23:45 Midnight</span>
                </div>
              </div>

              <!-- 3 Phase Preset Buttons -->
              <div class="grid grid-cols-3 gap-1.5">
                <button type="button" data-sky-preset="dawn" class="sky-preset-btn p-2 rounded-2xl border border-berry/20 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:border-berry transition-all flex flex-col items-center gap-0.5 text-center cursor-pointer is-active border-berry bg-berry/20">
                  <span class="text-base">☀️</span>
                  <span class="text-xs font-bold text-berry dark:text-cream">Dawn</span>
                  <span class="text-[9px] text-ink/60 dark:text-cream/60">Morning Glow</span>
                </button>
                <button type="button" data-sky-preset="twilight" class="sky-preset-btn p-2 rounded-2xl border border-berry/20 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:border-berry transition-all flex flex-col items-center gap-0.5 text-center cursor-pointer">
                  <span class="text-base">🌅</span>
                  <span class="text-xs font-bold text-berry dark:text-cream">Twilight</span>
                  <span class="text-[9px] text-ink/60 dark:text-cream/60">Dusk Rose</span>
                </button>
                <button type="button" data-sky-preset="midnight" class="sky-preset-btn p-2 rounded-2xl border border-berry/20 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:border-berry transition-all flex flex-col items-center gap-0.5 text-center cursor-pointer">
                  <span class="text-base">🌌</span>
                  <span class="text-xs font-bold text-berry dark:text-cream">Midnight</span>
                  <span class="text-[9px] text-ink/60 dark:text-cream/60">Cosmic Sky</span>
                </button>
              </div>

              <!-- Atmosphere Diagnostics & Star Density -->
              <div class="p-2.5 rounded-2xl bg-berry/5 dark:bg-black/30 border border-berry/10 dark:border-white/10 text-xs flex flex-col gap-1.5">
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-ink/75 dark:text-cream/75 flex items-center gap-1">
                    <span>✨</span> Star Density:
                  </span>
                  <span id="sky-star-density-text" class="font-bold text-berry dark:text-moon">15% · Faint Dawn Stardust</span>
                </div>
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-ink/75 dark:text-cream/75 flex items-center gap-1">
                    <span id="sky-lantern-color-dot" class="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block shadow-sm"></span> Lantern Illumination:
                  </span>
                  <span class="font-bold text-berry dark:text-moon">Active Hue Sync</span>
                </div>
              </div>

              <!-- Summon Shooting Star Trigger Button -->
              <div class="pt-1 flex items-center justify-between gap-2">
                <button id="summon-shooting-star-btn" type="button" class="w-full py-2 px-3 rounded-2xl text-xs font-bold bg-gradient-to-r from-berry via-pink-600 to-amber-400 text-white shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                  <span>🌠</span>
                  <span>Summon Shooting Star</span>
                </button>
              </div>
              <div class="text-[10px] text-center text-ink/50 dark:text-cream/50">
                Tip: Press <kbd class="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[9px]">S</kbd> on keyboard anytime to shoot a star!
              </div>

            </div>
          </div>

          <!-- Mobile Hamburger Menu Button -->
          <button id="mobile-menu-toggle" type="button" class="md:hidden w-8 h-8 rounded-full bg-white text-berry border border-pink-200/80 flex items-center justify-center text-sm shadow-sm active:scale-95 cursor-pointer" aria-label="Toggle Navigation Menu">
            <span id="mobile-menu-icon" class="font-bold text-base">☰</span>
          </button>
        </div>
      </nav>

      <!-- Mobile Navigation Drawer -->
      <div id="mobile-menu-drawer" class="pointer-events-auto hidden md:hidden mt-2 max-w-5xl mx-auto glass-panel p-4 rounded-3xl bg-white/95 dark:bg-[#1C0A2E]/95 border border-berry/20 dark:border-white/20 shadow-2xl backdrop-blur-2xl flex-col gap-2.5 animate-fadeIn text-ink dark:text-cream" style="box-shadow: 0 16px 40px rgba(0,0,0,0.25);">
        <div class="text-[11px] font-bold text-berry dark:text-moon px-1 uppercase tracking-wider flex items-center justify-between">
          <span>Navigate Nursery</span>
          <span class="text-[10px] text-ink/60 dark:text-cream/60">Pip’s World</span>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs font-semibold">
          <a href="#story-origin" class="mobile-nav-link p-2.5 rounded-2xl bg-berry/10 hover:bg-berry/20 text-berry font-bold flex items-center gap-2 transition-colors">
            <span>📖</span> <span>Story Origin</span>
          </a>
          <a href="#dual-hub" class="mobile-nav-link p-2.5 rounded-2xl bg-amber-100/60 hover:bg-amber-200/60 text-amber-900 dark:text-amber-200 font-bold flex items-center gap-2 transition-colors">
            <span>👶</span> <span>Baby & Parent</span>
          </a>
          <a href="#about" class="mobile-nav-link p-2.5 rounded-2xl bg-berry/5 hover:bg-berry/15 dark:bg-white/5 dark:hover:bg-white/10 flex items-center gap-2 text-ink dark:text-cream transition-colors">
            <span>🧸</span> <span>About Pip</span>
          </a>
          <a href="#work" class="mobile-nav-link p-2.5 rounded-2xl bg-berry/5 hover:bg-berry/15 dark:bg-white/5 dark:hover:bg-white/10 flex items-center gap-2 text-ink dark:text-cream transition-colors">
            <span>💡</span> <span>Inventions</span>
          </a>
          <a href="#world" class="mobile-nav-link p-2.5 rounded-2xl bg-berry/5 hover:bg-berry/15 dark:bg-white/5 dark:hover:bg-white/10 flex items-center gap-2 text-ink dark:text-cream transition-colors">
            <span>🌌</span> <span>World Lore</span>
          </a>
          <a href="#dream-weaver" class="mobile-nav-link p-2.5 rounded-2xl bg-berry/5 hover:bg-berry/15 dark:bg-white/5 dark:hover:bg-white/10 flex items-center gap-2 text-ink dark:text-cream transition-colors">
            <span>🔮</span> <span>Dream Lab</span>
          </a>
          <a href="#growth" class="mobile-nav-link p-2.5 rounded-2xl bg-berry/5 hover:bg-berry/15 dark:bg-white/5 dark:hover:bg-white/10 flex items-center gap-2 text-ink dark:text-cream transition-colors">
            <span>📈</span> <span>Growth</span>
          </a>
          <a href="#whispers" class="mobile-nav-link p-2.5 rounded-2xl bg-berry/5 hover:bg-berry/15 dark:bg-white/5 dark:hover:bg-white/10 flex items-center gap-2 text-ink dark:text-cream transition-colors">
            <span>💬</span> <span>Whispers</span>
          </a>
        </div>
      </div>
    </header>
  `;
}
