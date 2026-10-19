export function renderHero() {
  return `
    <section class="hero relative min-h-screen flex items-center pt-24 pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden" id="top">
      <!-- Decorative twinkling starlight sparkles -->
      <div class="hero-sparkle" style="top:15%;left:12%;animation-delay:0s" aria-hidden="true"></div>
      <div class="hero-sparkle" style="top:35%;left:45%;animation-delay:.8s" aria-hidden="true"></div>
      <div class="hero-sparkle" style="top:60%;left:25%;animation-delay:1.6s" aria-hidden="true"></div>
      <div class="hero-sparkle" style="top:20%;right:26%;animation-delay:2.4s" aria-hidden="true"></div>
      <div class="hero-sparkle" style="top:70%;right:15%;animation-delay:.4s" aria-hidden="true"></div>
      <div class="hero-sparkle" style="top:45%;right:36%;animation-delay:1.2s" aria-hidden="true"></div>
      <div class="hero-sparkle" style="top:80%;left:50%;animation-delay:2s" aria-hidden="true"></div>
      <div class="hero-sparkle" style="top:10%;left:60%;animation-delay:2.8s" aria-hidden="true"></div>

      <div class="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        <!-- Text Column -->
        <div class="lg:col-span-7 flex flex-col items-start">
          <!-- Status Badge & Dual Audience Tag -->
          <div class="flex items-center gap-2 flex-wrap mb-4">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-berry/25 border border-berry/30 text-berry font-display font-bold text-xs shadow-md animate-pulse-glow">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Midnight Nursery · On Duty</span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100/90 dark:bg-white/10 border border-pink-300/60 text-berry dark:text-moon font-display font-extrabold text-xs shadow-xs">
              <span>📖</span>
              <span>Based on a Bedtime Story</span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/90 dark:bg-amber-950/40 border border-amber-300/60 text-amber-900 dark:text-amber-200 font-display font-bold text-xs shadow-xs">
              <span>👶 🧑‍🍼</span>
              <span>Babies & Parents</span>
            </div>
          </div>

          <!-- Hero Name -->
          <h1 class="big font-display text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] leading-none tracking-tight font-extrabold flex gap-1 select-none text-berry cursor-pointer group" id="hero-title" aria-label="Pip">
            <span class="inline-block transition-transform duration-300 group-hover:-translate-y-3 hover:text-lav">P</span>
            <span class="inline-block transition-transform duration-300 group-hover:-translate-y-4 hover:text-moon text-lav">i</span>
            <span class="inline-block transition-transform duration-300 group-hover:-translate-y-2 hover:text-blush">p</span>
          </h1>

          <!-- Role -->
          <p class="font-display text-xl sm:text-3xl md:text-4xl text-ink font-bold mt-4 max-w-xl leading-snug drop-shadow-sm">
            Junior <span class="text-berry underline decoration-moon decoration-4 underline-offset-4 decoration-wavy">Dream Engineer</span> at the Midnight Nursery
          </p>

          <!-- Quote -->
          <p class="text-ink/90 italic font-medium text-base sm:text-xl mt-2.5 sm:mt-3 max-w-lg drop-shadow-sm">
            &ldquo;I build the dreams you fall asleep inside.&rdquo;
          </p>

          <!-- Narrative Premise -->
          <p class="text-xs sm:text-sm text-ink/75 dark:text-cream/80 font-medium mt-2 max-w-lg leading-relaxed">
            An enchanted bedtime portfolio rooted in a story: crafted to bring giggles to restless babies and calm reassurance to tired parents through gentle 432 Hz melodies, soft nightlights, and soothing dreams.
          </p>

          <!-- CTA Row -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mt-6 sm:mt-7 w-full sm:w-auto flex-wrap">
            <a href="#story-origin" class="btn-berry px-5 sm:px-6 py-3 rounded-full font-display font-bold text-white shadow-lg shadow-berry/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-xs sm:text-sm">
              <span>📖</span>
              <span>Read Pip’s Story</span>
            </a>

            <a href="#dual-hub" class="px-5 sm:px-6 py-3 rounded-full font-display font-bold text-amber-900 dark:text-amber-200 bg-amber-100 hover:bg-amber-200/80 border border-amber-300 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-xs sm:text-sm">
              <span>👶 🧑‍🍼</span>
              <span>Baby & Parent Haven</span>
            </a>

            <button id="summon-stardust-btn" type="button" class="px-4 py-3 rounded-full font-display font-bold text-berry bg-white hover:bg-blush/30 border border-pink-200 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 text-xs sm:text-sm cursor-pointer">
              <span>✨</span>
              <span>Sprinkle Stardust</span>
            </button>
          </div>

          <!-- Stats Counters -->
          <div class="grid grid-cols-3 gap-2.5 sm:gap-10 mt-8 pt-6 sm:mt-10 sm:pt-8 border-t border-berry/15 w-full max-w-md">
            <div class="text-left">
              <span class="stat-num font-display font-bold text-2xl sm:text-4xl text-berry block" data-target="42">0</span>
              <span class="text-[11px] sm:text-sm text-ink font-semibold">Dreams crafted</span>
            </div>
            <div class="text-left">
              <span class="stat-num font-display font-bold text-2xl sm:text-4xl text-berry block" data-target="7">0</span>
              <span class="text-[11px] sm:text-sm text-ink font-semibold">Lullabies</span>
            </div>
            <div class="text-left">
              <span class="font-display font-bold text-2xl sm:text-4xl text-berry block" id="giggles-stat">∞</span>
              <span class="text-[11px] sm:text-sm text-ink font-semibold">Giggles</span>
            </div>
          </div>
        </div>

        <!-- Visual Arch Column -->
        <div class="lg:col-span-5 flex justify-center relative mt-6 lg:mt-0">
          <!-- Interactive Pip Voice Greeting Bubble -->
          <div id="pip-speech-bubble" class="absolute -top-12 left-1/2 -translate-x-1/2 glass-pill px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-berry bg-white/95 shadow-xl border border-pink-200 flex items-center gap-2 opacity-0 pointer-events-none transition-all duration-500 scale-90 whitespace-nowrap z-30">
            <span class="text-base animate-bounce">🧸</span>
            <span>&ldquo;Hi, I’m Pip! Sweet dreams!&rdquo;</span>
            <span class="text-sm">✨</span>
          </div>

          <!-- Decorative Rotating Halo -->
          <div class="relative w-56 sm:w-84 md:w-96 aspect-[896/1090] rounded-t-full rounded-b-3xl p-2 sm:p-2.5 bg-gradient-to-b from-blush via-lav to-moon shadow-2xl shadow-berry/25 animate-float-gentle cursor-pointer group" id="pip-hero-avatar-trigger" title="Tap Pip to hear his voice!">
            <div class="w-full h-full rounded-t-full rounded-b-2xl overflow-hidden bg-cream relative border-4 border-white">
              <img
                src="/assets/images/pip_avatar_cloud.png"
                alt="Pip, a gentle baby with a skull face and starry nightcap on a pink cloud"
                class="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-deep/20 via-transparent to-transparent pointer-events-none"></div>
            </div>

            <!-- Floating Badge Label -->
            <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-pill px-4 py-1.5 rounded-full text-xs font-semibold text-berry whitespace-nowrap shadow-md flex items-center gap-1.5 border border-white">
              <span>🌙</span> <span>Chief Pillow Architect</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
