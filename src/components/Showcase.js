export function renderShowcase() {
  return `
    <section class="showcase-sticky-section relative z-20" id="work">
      <div class="showcase-sticky-container">
        
        <!-- Header & Nav Controls Bar -->
        <div class="max-w-7xl mx-auto w-full px-4 sm:px-8 flex flex-col md:flex-row md:items-center justify-between gap-2.5 flex-none mb-2">
          <div>
            <div class="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-berry mb-0.5">
              <span>✦</span> <span>Pip’s Workshop · Inventions & Artifacts</span> <span>✦</span>
            </div>
            <h2 class="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-berry dark:text-moon leading-tight">
              Pip’s Inventions
            </h2>
            <p class="text-ink dark:text-cream/80 text-xs sm:text-sm font-semibold">
              Keep scrolling down — the nursery gallery rolls by sideways.
            </p>
          </div>

          <!-- Navigation Controls Pill Console -->
          <div class="flex items-center gap-2 self-start md:self-center flex-wrap">
            <div class="flex items-center gap-1 overflow-x-auto no-scrollbar p-1 rounded-full glass-panel border border-berry/20 bg-white/70 dark:bg-black/40 shadow-sm max-w-[calc(100vw-8rem)] sm:max-w-none scroll-smooth shrink-0" id="invention-tabs">
              <button type="button" id="tab-inv-0" data-invention-idx="0" class="invention-tab-btn is-active px-3 py-1 rounded-full text-xs font-bold text-berry flex items-center gap-1 cursor-pointer transition-all shrink-0">
                <span>🎵</span> <span>Lullaby Lab</span>
              </button>
              <button type="button" id="tab-inv-1" data-invention-idx="1" class="invention-tab-btn px-3 py-1 rounded-full text-xs font-bold text-ink/80 dark:text-cream/80 flex items-center gap-1 cursor-pointer transition-all shrink-0">
                <span>💡</span> <span>Nightlight</span>
              </button>
              <button type="button" id="tab-inv-2" data-invention-idx="2" class="invention-tab-btn px-3 py-1 rounded-full text-xs font-bold text-ink/80 dark:text-cream/80 flex items-center gap-1 cursor-pointer transition-all shrink-0">
                <span>🗺️</span> <span>Radar</span>
              </button>
              <button type="button" id="tab-inv-3" data-invention-idx="3" class="invention-tab-btn px-3 py-1 rounded-full text-xs font-bold text-ink/80 dark:text-cream/80 flex items-center gap-1 cursor-pointer transition-all shrink-0">
                <span>🧸</span> <span>Blocks</span>
              </button>
              <button type="button" id="tab-inv-4" data-invention-idx="4" class="invention-tab-btn px-3 py-1 rounded-full text-xs font-bold text-ink/80 dark:text-cream/80 flex items-center gap-1 cursor-pointer transition-all shrink-0">
                <span>📖</span> <span>Storybook</span>
              </button>
            </div>

            <span id="invention-counter" class="text-xs font-bold text-berry px-3 py-1.5 rounded-full bg-berry/10 dark:bg-berry/20 border border-berry/25 shadow-sm whitespace-nowrap">
              1 of 5
            </span>
            <div class="flex items-center gap-1" id="track-dots"></div>
            <div class="flex items-center gap-1">
              <button id="track-prev" type="button" class="w-8 h-8 rounded-full glass-panel hover:bg-white text-berry flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm text-xs cursor-pointer border border-berry/20" aria-label="Previous invention" title="Previous invention">
                ←
              </button>
              <button id="track-next" type="button" class="w-8 h-8 rounded-full glass-panel hover:bg-white text-berry flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm text-xs cursor-pointer border border-berry/20" aria-label="Next invention" title="Next invention">
                →
              </button>
            </div>
          </div>
        </div>

        <!-- Horizontal Scroll Progress Ribbon -->
        <div class="max-w-7xl mx-auto w-full px-4 sm:px-8 mb-2">
          <div class="w-full h-1 rounded-full bg-berry/15 overflow-hidden">
            <div id="showcase-progress-bar" class="h-full bg-gradient-to-r from-berry via-pink-400 to-amber-300 rounded-full transition-all duration-150" style="width: 20%;"></div>
          </div>
        </div>

        <!-- Horizontal Track Wrapper (Perspective Stage) -->
        <div class="showcase-track-wrapper">
          <div class="showcase-track" id="track">

            <!-- Card 1: The Lullaby Lab -->
            <article class="pn showcase-card grid grid-cols-1 md:grid-cols-12 overflow-hidden shadow-2xl h-full" id="p1">
              <!-- Visual Left Stage (md:col-span-5) -->
              <div class="vis relative p-6 sm:p-7 flex flex-col items-center justify-between overflow-hidden h-full min-h-[280px] md:col-span-5 select-none">
                <!-- Stardust Stage Glow Backdrop -->
                <div class="absolute inset-0 bg-radial-gradient pointer-events-none opacity-50"></div>

                <!-- Stage Header Pill -->
                <div class="w-full flex items-center justify-between z-20 pointer-events-none">
                  <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-black/30 backdrop-blur-md border border-berry/15 text-[11px] font-bold text-berry shadow-sm">
                    <span>🎵</span>
                    <span>Clockwork Audio Atelier</span>
                  </div>
                  <span class="text-[11px] font-semibold text-berry/80 px-2 py-0.5 rounded-full bg-white/60 dark:bg-black/20 border border-berry/10">
                    432 Hz Warmth
                  </span>
                </div>

                <!-- Music Box on Luminous Floating Vitrine Pedestal -->
                <div class="relative z-10 w-full max-w-[260px] aspect-square flex items-center justify-center my-auto">
                  <div class="relative w-full h-full rounded-3xl bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/90 dark:border-white/20 shadow-xl flex items-center justify-center p-3 transition-transform duration-500 hover:scale-102">
                    <!-- Rotating Dashed Aura Ring -->
                    <div id="music-box-aura" class="absolute inset-2 rounded-2xl border-2 border-dashed border-berry/30 pointer-events-none transition-all duration-700 opacity-60"></div>
                    
                    <!-- 3D Music Box Image -->
                    <img
                      src="/assets/images/pip_lullaby_box.png"
                      alt="Pip lullaby music box"
                      class="w-full h-full object-contain rounded-2xl drop-shadow-md transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />

                    <!-- Floating Notes Emitter -->
                    <div id="notes-container" class="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <span class="note-bubble absolute text-3xl text-berry opacity-0 left-[20%] bottom-[30%]">♪</span>
                      <span class="note-bubble absolute text-3xl text-plum opacity-0 left-[50%] bottom-[20%]" style="animation-delay: 0.5s">♫</span>
                      <span class="note-bubble absolute text-3xl text-amber-500 opacity-0 left-[75%] bottom-[35%]" style="animation-delay: 1.0s">♩</span>
                      <span class="note-bubble absolute text-2xl text-rose-500 opacity-0 left-[35%] bottom-[40%]" style="animation-delay: 1.5s">✨</span>
                    </div>
                  </div>
                </div>

                <!-- Audio Visualizer Spectrum Waveform inside Stage -->
                <div class="w-full max-w-[260px] z-10 flex items-center justify-between px-3 py-1.5 rounded-full bg-white/75 dark:bg-black/30 backdrop-blur-md border border-berry/15 text-xs text-berry shadow-sm">
                  <div class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-berry animate-pulse"></span>
                    <span class="text-[11px] font-bold">Chime Waves</span>
                  </div>
                  <div class="flex items-center gap-1.5 h-4" id="audio-viz-bars">
                    <div class="viz-bar w-1 rounded-full bg-berry h-2"></div>
                    <div class="viz-bar w-1 rounded-full bg-berry h-3.5"></div>
                    <div class="viz-bar w-1 rounded-full bg-berry h-2"></div>
                    <div class="viz-bar w-1 rounded-full bg-berry h-4"></div>
                    <div class="viz-bar w-1 rounded-full bg-berry h-2"></div>
                  </div>
                </div>
              </div>

              <!-- Content Right Stage (md:col-span-7) -->
              <div class="tx p-6 sm:p-7 flex flex-col justify-between gap-3 md:col-span-7 backdrop-blur-md">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="badge-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-berry/15 text-berry border border-berry/20">
                      <span>🎵</span>
                      <span>Sound & Motion · Clockwork Atelier</span>
                    </span>
                    <span class="text-xs font-semibold text-berry/80 px-2.5 py-0.5 rounded-full bg-berry/10 border border-berry/15">
                      Celestial Tuning
                    </span>
                  </div>

                  <h3 class="font-display font-bold text-2xl sm:text-3xl tracking-tight text-berry">The Lullaby Lab</h3>
                  <p class="text-ink/90 dark:text-cream/90 text-xs sm:text-sm leading-relaxed mt-2 font-medium">
                    A handcrafted clockwork music box and nursery audio player Pip loaded with beloved bedtime melodies and classic Indian nursery rhymes to comfort little dreamers into peaceful slumber.
                  </p>

                  <!-- Melodic Tuning & Rhymes Palette -->
                  <div class="spec-panel mt-3 p-3 sm:p-3.5 rounded-2xl bg-white/85 dark:bg-black/25 border border-berry/15 shadow-sm">
                    <div class="flex items-center justify-between gap-2 mb-2">
                      <div class="text-[11px] font-bold text-berry dark:text-moon flex items-center gap-1.5 uppercase tracking-wider">
                        <span>🎼</span> <span>Select Sleep Melody / Rhyme:</span>
                      </div>
                      <span id="current-song-badge" class="text-[10px] font-bold text-berry dark:text-moon bg-berry/10 dark:bg-white/10 px-2.5 py-0.5 rounded-full border border-berry/15">
                        6 Songs Available
                      </span>
                    </div>

                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2" id="lullaby-playlist">
                      <!-- 1. Lakdi Ki Kathi -->
                      <button
                        type="button"
                        class="lullaby-track-btn p-2 rounded-xl border text-left flex items-center gap-2 transition-all duration-200 cursor-pointer is-active"
                        data-id="lakdi"
                        data-src="/assets/audio/lakdi_ki_kathi.mp3"
                        data-title="Lakdi Ki Kathi · लकड़ी की काठी"
                        data-badge="Classic Rhyme"
                      >
                        <span class="text-lg shrink-0">🪵</span>
                        <div class="min-w-0 overflow-hidden leading-tight">
                          <div class="font-bold text-xs truncate track-name">Lakdi Ki Kathi</div>
                          <div class="text-[10px] opacity-75 truncate track-sub">लकड़ी की काठी</div>
                        </div>
                      </button>

                      <!-- 2. Nani Teri Morni -->
                      <button
                        type="button"
                        class="lullaby-track-btn p-2 rounded-xl border text-left flex items-center gap-2 transition-all duration-200 cursor-pointer"
                        data-id="nani"
                        data-src="/assets/audio/nani_teri_morni.mp3"
                        data-title="Nani Teri Morni · नानी तेरी मोरनी"
                        data-badge="Forest Tale"
                      >
                        <span class="text-lg shrink-0">🦚</span>
                        <div class="min-w-0 overflow-hidden leading-tight">
                          <div class="font-bold text-xs truncate track-name">Nani Teri Morni</div>
                          <div class="text-[10px] opacity-75 truncate track-sub">नानी तेरी मोरनी</div>
                        </div>
                      </button>

                      <!-- 3. Aalu Kachalu -->
                      <button
                        type="button"
                        class="lullaby-track-btn p-2 rounded-xl border text-left flex items-center gap-2 transition-all duration-200 cursor-pointer"
                        data-id="aalu"
                        data-src="/assets/audio/aalu_kachalu.mp3"
                        data-title="Aalu Kachalu · आलू कचालू बेटा"
                        data-badge="Playful Rhyme"
                      >
                        <span class="text-lg shrink-0">🥔</span>
                        <div class="min-w-0 overflow-hidden leading-tight">
                          <div class="font-bold text-xs truncate track-name">Aalu Kachalu</div>
                          <div class="text-[10px] opacity-75 truncate track-sub">आलू कचालू बेटा</div>
                        </div>
                      </button>

                      <!-- 4. Aaha Tamatar -->
                      <button
                        type="button"
                        class="lullaby-track-btn p-2 rounded-xl border text-left flex items-center gap-2 transition-all duration-200 cursor-pointer"
                        data-id="tamatar"
                        data-src="/assets/audio/aaha_tamatar.mp3"
                        data-title="Aaha Tamatar · आहा टमाटर बड़े मजेदार"
                        data-badge="Sweet Rhyme"
                      >
                        <span class="text-lg shrink-0">🍅</span>
                        <div class="min-w-0 overflow-hidden leading-tight">
                          <div class="font-bold text-xs truncate track-name">Aaha Tamatar</div>
                          <div class="text-[10px] opacity-75 truncate track-sub">आहा टमाटर</div>
                        </div>
                      </button>

                      <!-- 5. Ek Mota Hathi -->
                      <button
                        type="button"
                        class="lullaby-track-btn p-2 rounded-xl border text-left flex items-center gap-2 transition-all duration-200 cursor-pointer"
                        data-id="hathi"
                        data-src="/assets/audio/ek_mota_hathi.mp3"
                        data-title="Ek Mota Hathi · एक मोटा हाथी"
                        data-badge="Spider's Web"
                      >
                        <span class="text-lg shrink-0">🐘</span>
                        <div class="min-w-0 overflow-hidden leading-tight">
                          <div class="font-bold text-xs truncate track-name">Ek Mota Hathi</div>
                          <div class="text-[10px] opacity-75 truncate track-sub">एक मोटा हाथी</div>
                        </div>
                      </button>

                      <!-- 6. Brahms Celestial (Synthesizer Chimes) -->
                      <button
                        type="button"
                        class="lullaby-track-btn p-2 rounded-xl border text-left flex items-center gap-2 transition-all duration-200 cursor-pointer"
                        data-id="brahms"
                        data-src="synth"
                        data-title="Brahms Celestial · Pip's Chime Scales (432Hz)"
                        data-badge="Chime Bells"
                      >
                        <span class="text-lg shrink-0">✨</span>
                        <div class="min-w-0 overflow-hidden leading-tight">
                          <div class="font-bold text-xs truncate track-name">Brahms Chime</div>
                          <div class="text-[10px] opacity-75 truncate track-sub">432Hz Synth</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="pt-3 border-t border-berry/15 flex items-center justify-between gap-3 flex-wrap">
                  <div class="flex items-center gap-2 text-xs text-ink/80 dark:text-cream/80 font-semibold min-w-0">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                    <span id="music-box-status" class="truncate">Ready: 🪵 Lakdi Ki Kathi</span>
                  </div>
                  <button class="btn btn-berry px-5 sm:px-6 py-2.5 rounded-full font-display font-bold text-white shadow-lg shadow-berry/30 hover:scale-105 active:scale-95 flex items-center gap-2 transition-all duration-300 cursor-pointer text-xs sm:text-sm" id="mb" aria-pressed="false">
                    <span id="mb-icon">🎵</span>
                    <span id="mb-text">Wind the music box</span>
                  </button>
                </div>
              </div>
            </article>

            <!-- Card 2: Nightlight Collection -->
            <article class="pn showcase-card grid grid-cols-1 md:grid-cols-12 overflow-hidden shadow-2xl h-full" id="p2">
              <!-- Visual Left Stage (md:col-span-5) -->
              <div class="vis relative p-6 sm:p-7 flex flex-col items-center justify-between overflow-hidden h-full min-h-[280px] md:col-span-5 select-none">
                <!-- Starlight Stage Glow Backdrop -->
                <div class="absolute inset-0 bg-radial-gradient pointer-events-none opacity-50"></div>

                <!-- Stage Header Pill -->
                <div class="w-full flex items-center justify-between z-20 pointer-events-none">
                  <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-black/30 backdrop-blur-md border border-amber-300/30 text-[11px] font-bold text-amber-800 dark:text-amber-200 shadow-sm">
                    <span>💡</span>
                    <span>Nocturnal Chamber</span>
                  </div>
                  <span class="text-[11px] font-semibold text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full bg-white/60 dark:bg-black/20 border border-amber-300/20">
                    Monster Ward ★
                  </span>
                </div>

                <!-- Nightlight on Luminous Floating Vitrine Pedestal -->
                <div class="relative z-10 w-full max-w-[260px] aspect-square flex items-center justify-center my-auto">
                  <div class="relative w-full h-full rounded-3xl bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/90 dark:border-white/20 shadow-xl flex items-center justify-center p-3 transition-transform duration-500 hover:scale-102">
                    <!-- Glowing Bedside Pedestal Aura -->
                    <div id="lantern-glow-effect" class="absolute inset-0 rounded-3xl opacity-0 pointer-events-none transition-opacity duration-700" style="background: radial-gradient(circle at 50% 50%, rgba(255,214,120,0.95), rgba(244,215,123,0.35) 45%, transparent 70%); mix-blend-mode: screen;"></div>
                    
                    <!-- Floating Starlight Sparkles -->
                    <div class="absolute inset-0 pointer-events-none">
                      <span class="absolute top-3 left-4 text-amber-400 text-sm animate-pulse">✦</span>
                      <span class="absolute bottom-4 right-4 text-purple-400 text-xs animate-pulse" style="animation-delay: 0.8s">★</span>
                      <span class="absolute top-1/2 left-3 text-pink-400 text-sm animate-pulse" style="animation-delay: 1.4s">✨</span>
                    </div>

                    <!-- Lantern Image -->
                    <img
                      src="/assets/images/pip_dream_lantern.png"
                      alt="Pip dream nightlight lantern"
                      class="w-full h-full object-contain rounded-2xl drop-shadow-md relative z-10 transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                <!-- Live Luminescence Readout Strip -->
                <div class="w-full max-w-[260px] z-10 flex items-center justify-between px-3 py-1.5 rounded-full bg-white/75 dark:bg-black/30 backdrop-blur-md border border-berry/15 text-xs text-ink/80 dark:text-cream/80 shadow-sm font-semibold">
                  <span class="text-[11px]">Core: Firefly Lumens</span>
                  <span id="lantern-lumens" class="font-bold text-amber-600 dark:text-amber-300">Off · Ready</span>
                </div>
              </div>

              <!-- Content Right Stage (md:col-span-7) -->
              <div class="tx p-6 sm:p-7 flex flex-col justify-between gap-3 md:col-span-7 backdrop-blur-md">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="badge-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-800 dark:text-amber-200 border border-amber-500/25">
                      <span>💡</span>
                      <span>Light & Ambiance · Shadow Ward</span>
                    </span>
                    <span class="text-xs font-semibold text-ink/70 dark:text-cream/70 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                      Zero Shadows
                    </span>
                  </div>

                  <h3 class="font-display font-bold text-2xl sm:text-3xl tracking-tight text-plum dark:text-moon">Nightlight Lantern</h3>
                  <p class="text-ink/90 dark:text-cream/90 text-xs sm:text-sm leading-relaxed mt-2 font-medium">
                    A glowing bedside lantern Pip engineered to ward off scary under-bed shadows. Houses enchanted sleeping fireflies that whisper reassuring bedtime warmth into dark corners.
                  </p>
                  
                  <!-- Color tone picker with glowing orb chips -->
                  <div class="spec-panel mt-4 p-3.5 rounded-2xl bg-white/80 dark:bg-white/5 border border-berry/15 shadow-sm">
                    <div class="text-[11px] font-bold text-plum dark:text-moon mb-2 flex items-center gap-1.5">
                      <span>🎨</span> <span>Select Starlight Aura:</span>
                    </div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <button type="button" class="lantern-color-pick flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-white/10 text-ink/90 dark:text-cream border border-amber-400 hover:border-amber-500 shadow-sm hover:scale-105 transition-all cursor-pointer" data-color="gold">
                        <span class="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 shadow"></span>
                        <span>Warm Gold</span>
                      </button>
                      <button type="button" class="lantern-color-pick flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-white/10 text-ink/90 dark:text-cream border border-purple-300 hover:border-purple-400 shadow-sm hover:scale-105 transition-all cursor-pointer" data-color="lavender">
                        <span class="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-200 shadow"></span>
                        <span>Lavender</span>
                      </button>
                      <button type="button" class="lantern-color-pick flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-white/10 text-ink/90 dark:text-cream border border-rose-300 hover:border-rose-400 shadow-sm hover:scale-105 transition-all cursor-pointer" data-color="rose">
                        <span class="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-rose-400 to-pink-200 shadow"></span>
                        <span>Cozy Rose</span>
                      </button>
                      <button type="button" class="lantern-color-pick flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-white/10 text-ink/90 dark:text-cream border border-emerald-300 hover:border-emerald-400 shadow-sm hover:scale-105 transition-all cursor-pointer" data-color="mint">
                        <span class="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-200 shadow"></span>
                        <span>Aurora Mint</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div class="pt-3 border-t border-berry/15 flex items-center justify-between gap-3 flex-wrap">
                  <span class="text-xs text-ink/80 dark:text-cream/80 font-semibold" id="lantern-status">Status: Extinguished (Ready to spark)</span>
                  <button class="btn self-start px-6 py-2.5 rounded-full font-display font-semibold transition-all duration-300 shadow-lg shadow-amber-400/30 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer text-xs sm:text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 text-amber-950 font-bold" id="lt" aria-pressed="false">
                    <span>💡</span>
                    <span>Light the lantern</span>
                  </button>
                </div>
              </div>
            </article>

            <!-- Card 3: Dream Delivery Routes -->
            <article class="pn showcase-card grid grid-cols-1 md:grid-cols-12 overflow-hidden shadow-2xl h-full" id="p3">
              <!-- Visual Left Panel: Nocturnal Town Skyline Flight Map (md:col-span-7) -->
              <div class="vis relative bg-[#130722] p-2.5 sm:p-4 flex flex-col items-center justify-between min-h-[300px] md:col-span-7 overflow-hidden select-none h-full">
                
                <!-- Atmospheric Starlight Header Bar inside map -->
                <div class="w-full flex items-center justify-between z-20 pointer-events-none mb-1">
                  <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-medium text-cream shadow">
                    <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Nocturnal Sky Radar · Moonberry Hollow</span>
                  </div>
                  <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono text-lav-light">
                    <span>Altitude:</span>
                    <span id="map-telemetry-alt" class="text-moon font-bold">120m</span>
                  </div>
                </div>

                <!-- SVG Map Skyline -->
                <svg id="dream-route-svg" viewBox="0 0 620 400" class="w-full h-full max-h-[340px] drop-shadow-2xl rounded-2xl overflow-hidden" role="img" aria-label="Interactive map of Pip’s nocturnal dream delivery flight across town rooftops">
                  <defs>
                    <!-- Sky Background Gradient -->
                    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#0E051D" />
                      <stop offset="45%" stop-color="#1B0A2E" />
                      <stop offset="80%" stop-color="#2C1242" />
                      <stop offset="100%" stop-color="#3D1854" />
                    </linearGradient>

                    <!-- Route Glow & Trail Gradient -->
                    <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#F4D77B" />
                      <stop offset="35%" stop-color="#FFB3C6" />
                      <stop offset="70%" stop-color="#CDB8E3" />
                      <stop offset="100%" stop-color="#7CE5DF" />
                    </linearGradient>

                    <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#F4D77B" stop-opacity="0.35" />
                      <stop offset="50%" stop-color="#FF75A0" stop-opacity="0.25" />
                      <stop offset="100%" stop-color="#CDB8E3" stop-opacity="0.35" />
                    </linearGradient>

                    <!-- Moon Radial Glow -->
                    <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stop-color="#FFF8D6" stop-opacity="0.9" />
                      <stop offset="40%" stop-color="#F4D77B" stop-opacity="0.35" />
                      <stop offset="100%" stop-color="#F4D77B" stop-opacity="0" />
                    </radialGradient>

                    <!-- Window Glow -->
                    <radialGradient id="windowGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stop-color="#FFF9D2" />
                      <stop offset="60%" stop-color="#FFCF56" />
                      <stop offset="100%" stop-color="#FF9E2C" />
                    </radialGradient>

                    <!-- Delivery Flight Path Curve -->
                    <path id="flightPathCurve" d="M 60 295 C 130 160, 180 160, 240 210 S 340 310, 410 230 S 510 90, 560 120" />
                  </defs>

                  <!-- Sky Backing -->
                  <rect width="620" height="400" rx="20" fill="url(#skyGrad)" />

                  <!-- Aurora Borealis Ribbon in Upper Sky -->
                  <path d="M 0 110 Q 150 40 300 95 T 620 60 L 620 0 L 0 0 Z" fill="url(#routeGlow)" opacity="0.45" />

                  <!-- Twinkling Starlight Field -->
                  <g class="stars-layer" fill="#FFF6EF">
                    <!-- Cross Sparkle Stars -->
                    <g class="dream-star" transform="translate(110, 60)"><path d="M0 -7 L1.5 -1.5 L7 0 L1.5 1.5 L0 7 L-1.5 1.5 L-7 0 L-1.5 -1.5 Z" fill="#F4D77B" /></g>
                    <g class="dream-star" transform="translate(260, 45)"><path d="M0 -6 L1.2 -1.2 L6 0 L1.2 1.2 L0 6 L-1.2 1.2 L-6 0 L-1.2 -1.2 Z" fill="#FFF6EF" /></g>
                    <g class="dream-star" transform="translate(340, 85)"><path d="M0 -5 L1 -1 L5 0 L1 1 L0 5 L-1 1 L-5 0 L-1 -1 Z" fill="#CDB8E3" /></g>
                    <g class="dream-star" transform="translate(470, 40)"><path d="M0 -7 L1.5 -1.5 L7 0 L1.5 1.5 L0 7 L-1.5 1.5 L-7 0 L-1.5 -1.5 Z" fill="#F4D77B" /></g>
                    <g class="dream-star" transform="translate(180, 105)"><path d="M0 -5 L1 -1 L5 0 L1 1 L0 5 L-1 1 L-5 0 L-1 -1 Z" fill="#FFB3C6" /></g>

                    <!-- Circular Twinkle Stars -->
                    <circle cx="45" cy="50" r="1.5" class="dream-star" opacity="0.8" />
                    <circle cx="85" cy="95" r="2" class="dream-star" opacity="0.9" />
                    <circle cx="150" cy="35" r="1.5" class="dream-star" opacity="0.7" />
                    <circle cx="215" cy="75" r="2.2" class="dream-star" opacity="0.85" />
                    <circle cx="300" cy="30" r="1.8" class="dream-star" opacity="0.8" />
                    <circle cx="390" cy="65" r="2.5" class="dream-star" opacity="0.9" />
                    <circle cx="430" cy="115" r="1.5" class="dream-star" opacity="0.75" />
                    <circle cx="505" cy="85" r="2" class="dream-star" opacity="0.85" />
                    <circle cx="590" cy="60" r="1.5" class="dream-star" opacity="0.7" />
                  </g>

                  <!-- Sleeping Crescent Moon with Golden Glow -->
                  <g transform="translate(535, 55)">
                    <circle cx="0" cy="0" r="38" fill="url(#moonGlow)" />
                    <path d="M 12 -24 A 26 26 0 1 0 24 16 A 21 21 0 1 1 12 -24 Z" fill="#FFF3BE" filter="drop-shadow(0 0 6px rgba(244, 215, 123, 0.7))" />
                    <path d="M 2 -4 Q 5 -2 8 -4" stroke="#8C6527" stroke-width="1.4" stroke-linecap="round" fill="none" />
                    <circle cx="3" cy="2" r="3" fill="#FF9EAF" opacity="0.6" />
                  </g>

                  <!-- Distant Silhouetted Hills & Pine Trees -->
                  <path d="M 0 400 L 0 310 Q 110 270 220 295 T 440 280 Q 530 260 620 290 L 620 400 Z" fill="#1C0C2B" opacity="0.85" />

                  <!-- Midground Architecture -->
                  <g fill="#2D1342">
                    <path d="M 0 400 L 0 330 L 35 295 L 75 330 L 115 290 L 155 335 L 195 305 L 225 330 L 225 400 Z" />
                    <rect x="385" y="270" width="46" height="130" rx="3" />
                    <polygon points="380,270 408,210 436,270" />
                    <path d="M 430 400 L 430 330 L 465 295 L 505 335 L 545 300 L 585 335 L 620 310 L 620 400 Z" />
                  </g>

                  <!-- Foreground Cozy Cottages with Glowing Windows -->
                  <g fill="#3E1A57">
                    <path d="M 20 400 L 20 335 L 60 300 L 105 340 L 105 400 Z" />
                    <rect x="80" y="280" width="14" height="30" rx="2" fill="#321446" />
                    <path d="M 180 400 L 180 325 L 230 285 L 275 325 L 275 400 Z" />
                    <rect x="250" y="265" width="13" height="30" rx="2" fill="#321446" />
                    <path d="M 330 400 L 330 345 L 365 315 L 400 345 L 400 400 Z" />
                    <path d="M 470 400 L 470 340 L 515 305 L 560 340 L 560 400 Z" />
                    <rect x="535" y="285" width="13" height="30" rx="2" fill="#321446" />
                  </g>

                  <!-- Warm Glowing Cottage Windows & Clock Face -->
                  <g>
                    <rect x="45" y="345" width="22" height="28" rx="11" fill="url(#windowGlow)" filter="drop-shadow(0 0 5px rgba(255,207,86,0.8))" />
                    <line x1="56" y1="345" x2="56" y2="373" stroke="#4A2312" stroke-width="1.2" />
                    <rect x="215" y="335" width="24" height="30" rx="12" fill="url(#windowGlow)" filter="drop-shadow(0 0 5px rgba(255,207,86,0.8))" />
                    <circle cx="408" cy="285" r="16" fill="url(#windowGlow)" filter="drop-shadow(0 0 7px rgba(255,207,86,0.9))" />
                    <circle cx="408" cy="285" r="14" fill="#FFFBE6" />
                    <line x1="408" y1="285" x2="408" y2="275" stroke="#663300" stroke-width="1.8" />
                    <line x1="408" y1="285" x2="416" y2="288" stroke="#663300" stroke-width="1.5" />
                    <rect x="500" y="345" width="22" height="26" rx="11" fill="url(#windowGlow)" filter="drop-shadow(0 0 5px rgba(255,207,86,0.8))" />
                  </g>

                  <!-- High Floating Cloud Court Pavilion in Sky (Stop 4) -->
                  <g transform="translate(560, 120)">
                    <path d="M -40 20 Q -50 0 -30 -10 Q -20 -30 5 -20 Q 25 -35 45 -15 Q 60 0 45 20 Z" fill="#EBDCFF" opacity="0.85" filter="drop-shadow(0 4px 12px rgba(180,140,240,0.5))" />
                    <rect x="-16" y="-32" width="10" height="22" rx="2" fill="#CDB8E3" />
                    <polygon points="-19,-32 -11,-44 -3,-32" fill="#FFB3C6" />
                    <rect x="6" y="-36" width="12" height="26" rx="2" fill="#CDB8E3" />
                    <polygon points="3,-36 12,-50 21,-36" fill="#F4D77B" />
                  </g>

                  <!-- The Glowing Nocturnal Flight Path -->
                  <use href="#flightPathCurve" fill="none" stroke="url(#routeGlow)" stroke-width="14" stroke-linecap="round" />
                  <use href="#flightPathCurve" fill="none" stroke="url(#routeGrad)" stroke-width="3.5" class="route-dashed-line" stroke-linecap="round" />

                  <!-- Interactive Waypoint Stops -->
                  <g class="delivery-waypoint is-active" id="wp-moon" data-stop="moon" transform="translate(60, 295)">
                    <circle cx="0" cy="0" r="18" fill="#F4D77B" fill-opacity="0.2" class="waypoint-beacon-ring" />
                    <circle cx="0" cy="0" r="11" fill="#F4D77B" stroke="#FFF" stroke-width="2" class="waypoint-core shadow-lg" />
                    <text x="0" y="4" font-size="11" text-anchor="middle" class="select-none">🌙</text>
                  </g>

                  <g class="delivery-waypoint" id="wp-sleepy" data-stop="sleepy" transform="translate(240, 210)">
                    <circle cx="0" cy="0" r="18" fill="#FFB3C6" fill-opacity="0.2" class="waypoint-beacon-ring" />
                    <circle cx="0" cy="0" r="11" fill="#FFB3C6" stroke="#FFF" stroke-width="2" class="waypoint-core shadow-lg" />
                    <text x="0" y="4" font-size="11" text-anchor="middle" class="select-none">🏡</text>
                  </g>

                  <g class="delivery-waypoint" id="wp-spire" data-stop="spire" transform="translate(410, 230)">
                    <circle cx="0" cy="0" r="18" fill="#CDB8E3" fill-opacity="0.2" class="waypoint-beacon-ring" />
                    <circle cx="0" cy="0" r="11" fill="#CDB8E3" stroke="#FFF" stroke-width="2" class="waypoint-core shadow-lg" />
                    <text x="0" y="4" font-size="11" text-anchor="middle" class="select-none">⏰</text>
                  </g>

                  <g class="delivery-waypoint" id="wp-cloud" data-stop="cloud" transform="translate(560, 120)">
                    <circle cx="0" cy="0" r="18" fill="#7CE5DF" fill-opacity="0.2" class="waypoint-beacon-ring" />
                    <circle cx="0" cy="0" r="11" fill="#7CE5DF" stroke="#FFF" stroke-width="2" class="waypoint-core shadow-lg" />
                    <text x="0" y="4" font-size="11" text-anchor="middle" class="select-none">🏰</text>
                  </g>

                  <!-- Pip's Custom Delivery Cloud Craft -->
                  <g id="pip-delivery-craft" transform="translate(60, 295)">
                    <g class="pip-craft-inner-bob">
                      <polygon points="0,8 -15,36 15,36" fill="url(#moonGlow)" opacity="0.45" />
                      <g filter="drop-shadow(0 6px 14px rgba(0,0,0,0.45))">
                        <ellipse cx="0" cy="4" rx="23" ry="12" fill="#E8D7F6" />
                        <ellipse cx="-11" cy="2" rx="12" ry="9" fill="#FFF" />
                        <ellipse cx="11" cy="2" rx="12" ry="9" fill="#FFF" />
                        <ellipse cx="0" cy="-2" rx="15" ry="11" fill="#FFFFFF" />
                      </g>
                      <g transform="translate(0, -9)">
                        <circle cx="0" cy="0" r="7" fill="#FDE2D2" />
                        <path d="M -6 -2 Q 0 -13 8 -6 Z" fill="#A23A62" />
                        <circle cx="8" cy="-6" r="2" fill="#F4D77B" />
                      </g>
                    </g>
                  </g>
                </svg>

                <!-- Bottom Floating Mini Flight Control Toolbar -->
                <div class="w-full pt-1.5 border-t border-white/15 flex items-center justify-between text-xs text-cream/90">
                  <div class="flex items-center gap-1.5">
                    <span class="text-moon font-semibold">✨ Flight Radar:</span>
                    <span class="text-cream/70">Follow Pip across Moonberry Hollow</span>
                  </div>
                  <button id="quick-cycle-btn" class="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-[11px] font-semibold text-cream transition-all flex items-center gap-1 cursor-pointer shadow-sm">
                    <span>Next Stop ⏩</span>
                  </button>
                </div>
              </div>

              <!-- Right Panel: Cargo Manifest & Command Dashboard (md:col-span-5) -->
              <div class="tx p-5 sm:p-6 flex flex-col justify-between gap-2.5 md:col-span-5 backdrop-blur-md overflow-hidden h-full">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-1.5">
                    <span class="badge-pill inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-lav/25 text-berry border border-berry/20">
                      <span>✦</span>
                      <span>Dream Dispatch Radar</span>
                    </span>
                    <span id="route-status-tag" class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 border border-emerald-300/40">
                      ● Active Flight
                    </span>
                  </div>

                  <h3 class="font-display font-bold text-xl sm:text-2xl text-berry tracking-tight">Dream Delivery Route</h3>
                  <p class="text-ink/90 dark:text-cream/90 text-xs leading-relaxed mt-1 font-medium">
                    Pip’s nocturnal flight plan across Moonberry Hollow. Tap any stop to steer Pip or launch the grand flight!
                  </p>

                  <!-- Mission Stepper Grid -->
                  <div class="grid grid-cols-4 gap-1.5 mt-2.5" id="delivery-stop-tabs">
                    <button class="delivery-step-btn is-active py-1.5 px-1 rounded-xl text-xs font-semibold flex flex-col sm:flex-row items-center justify-center gap-1 shadow-sm cursor-pointer" data-tab="moon">
                      <span class="text-sm">🌙</span>
                      <span class="text-[11px] leading-tight">Moon Lane</span>
                    </button>
                    <button class="delivery-step-btn py-1.5 px-1 rounded-xl text-xs font-semibold flex flex-col sm:flex-row items-center justify-center gap-1 shadow-sm cursor-pointer" data-tab="sleepy">
                      <span class="text-sm">🏡</span>
                      <span class="text-[11px] leading-tight">Sleepy</span>
                    </button>
                    <button class="delivery-step-btn py-1.5 px-1 rounded-xl text-xs font-semibold flex flex-col sm:flex-row items-center justify-center gap-1 shadow-sm cursor-pointer" data-tab="spire">
                      <span class="text-sm">⏰</span>
                      <span class="text-[11px] leading-tight">Spire</span>
                    </button>
                    <button class="delivery-step-btn py-1.5 px-1 rounded-xl text-xs font-semibold flex flex-col sm:flex-row items-center justify-center gap-1 shadow-sm cursor-pointer" data-tab="cloud">
                      <span class="text-sm">🏰</span>
                      <span class="text-[11px] leading-tight">Cloud Court</span>
                    </button>
                  </div>

                  <!-- Dynamic Stop Manifest Card -->
                  <div id="delivery-stop-info" class="mt-2.5 p-3 rounded-2xl shadow-sm transition-all duration-300">
                    <div class="flex items-center justify-between border-b border-berry/15 pb-1 mb-1.5">
                      <div class="flex items-center gap-1.5">
                        <span id="manifest-icon" class="text-base">🌙</span>
                        <div>
                          <div id="manifest-name" class="font-bold text-berry dark:text-moon text-xs leading-tight">Moon Lane</div>
                          <div id="manifest-sub" class="text-[9.5px] text-ink/70 dark:text-lav-light font-medium">Cottage District · Stop 1 of 4</div>
                        </div>
                      </div>
                      <span id="manifest-status-badge" class="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-amber-100 text-amber-800 dark:bg-moon/20 dark:text-moon border border-amber-300/40">
                        ✓ Delivered
                      </span>
                    </div>

                    <p id="manifest-note" class="text-[11px] italic p-1.5 rounded-xl mb-2 leading-relaxed font-serif">
                      "Mrs. Whisker-Mouse requested extra-fluffy blankets with zero squeaking. Pip padded all floorboards with spun-cloud fleece."
                    </p>

                    <div id="manifest-cargo-grid" class="grid grid-cols-2 gap-1.5 text-[10.5px]">
                      <div class="cargo-chip p-1.5 rounded-lg flex items-center gap-1.5">
                        <span class="text-xs">☁️</span>
                        <span class="font-semibold leading-tight">18 Spun-Cloud Duvets</span>
                      </div>
                      <div class="cargo-chip p-1.5 rounded-lg flex items-center gap-1.5">
                        <span class="text-xs">🎵</span>
                        <span class="font-semibold leading-tight">4 Lavender Lullabies</span>
                      </div>
                      <div class="cargo-chip p-1.5 rounded-lg flex items-center gap-1.5">
                        <span class="text-xs">🍯</span>
                        <span class="font-semibold leading-tight">2 Jars Firefly Glow</span>
                      </div>
                      <div class="cargo-chip p-1.5 rounded-lg flex items-center gap-1.5">
                        <span class="text-xs">🧸</span>
                        <span class="font-semibold leading-tight">6 Starlight Teddies</span>
                      </div>
                    </div>
                  </div>

                  <!-- Delivery Progress Bar -->
                  <div class="mt-2">
                    <div class="flex items-center justify-between text-[10.5px] text-ink/80 dark:text-cream/80 mb-0.5 font-semibold">
                      <span>Bedtime Delivery Progress</span>
                      <span id="delivery-progress-text" class="font-bold text-berry">4 / 4 Stops Safe</span>
                    </div>
                    <div class="w-full h-1.5 rounded-full bg-berry/15 overflow-hidden">
                      <div id="delivery-progress-fill" class="h-full bg-gradient-to-r from-moon via-pink to-lav rounded-full transition-all duration-500" style="width: 100%;"></div>
                    </div>
                  </div>
                </div>

                <div class="pt-2 border-t border-berry/15 flex flex-wrap items-center gap-2">
                  <button class="btn btn-plum px-4 py-2 rounded-full font-display font-semibold transition-all duration-300 shadow-md hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs cursor-pointer text-white" id="dispatch-cloud-btn">
                    <span>🚀</span>
                    <span id="dispatch-btn-text">Dispatch Grand Tour</span>
                  </button>
                  <button class="px-3.5 py-2 rounded-full text-xs font-bold bg-lav/20 hover:bg-lav/30 text-berry transition-all hover:scale-105 active:scale-95 flex items-center gap-1 cursor-pointer border border-berry/15 shadow-sm" id="sound-chime-btn">
                    <span>🔔</span>
                    <span>Night Chimes</span>
                  </button>
                </div>
              </div>
            </article>

            <!-- Card 4: Rattle & Block Toys -->
            <article class="pn showcase-card grid grid-cols-1 md:grid-cols-12 overflow-hidden shadow-2xl h-full" id="p4">
              <!-- Left Playroom Toy Shelf Stage (md:col-span-6) -->
              <div class="vis relative bg-gradient-to-b from-[#FFF6ED] via-[#FDF0E3] to-[#F7E4D3] dark:from-[#2A1434] dark:to-[#170920] p-4 sm:p-5 flex flex-col items-center justify-between overflow-hidden h-full min-h-[300px] select-none md:col-span-6">
                
                <!-- Top Nursery Mobiles -->
                <div class="w-full flex items-center justify-between z-10 px-1 pointer-events-none">
                  <div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-black/30 backdrop-blur-md border border-berry/15 text-[11px] font-bold text-berry shadow-sm">
                    <span>🧸</span>
                    <span>Pip’s Playroom Workshop</span>
                  </div>
                  <div class="flex items-center gap-1 text-sm text-berry/80 animate-bounce" style="animation-duration: 3s">
                    <span>⭐</span>
                    <span>☁️</span>
                    <span>🌙</span>
                  </div>
                </div>

                <!-- Block Tower Stacking Area -->
                <div class="relative w-full flex-1 flex flex-col justify-end items-center px-4 pb-1 z-10">
                  
                  <!-- Starlight Trophy (Appears when 8 blocks reached) -->
                  <div id="block-trophy" class="opacity-0 transition-opacity duration-500 mb-1 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-white font-bold text-xs shadow-lg animate-pulse">
                    <span>🏆</span>
                    <span>Starlight Tower Complete! ✨</span>
                  </div>

                  <!-- Stack Container (flex-col-reverse so new blocks drop onto the top) -->
                  <div id="stack" class="relative w-full flex flex-col-reverse items-center justify-start gap-1.5 transition-all">
                    <!-- Blocks populated dynamically by blocksGame.js -->
                  </div>

                  <!-- Polished Wooden Nursery Shelf Base -->
                  <div class="w-full max-w-[320px] h-4 rounded-xl bg-gradient-to-r from-[#D79A62] via-[#E9B37E] to-[#D79A62] shadow-lg border-t border-[#FFF2DE] mt-1 relative flex items-center justify-center">
                    <div class="w-3/4 h-1 bg-[#BF7E47] rounded-full opacity-60"></div>
                    <div class="absolute -bottom-2 w-5/6 h-2 bg-black/15 blur-sm rounded-full"></div>
                  </div>
                  
                  <!-- Measuring Height Tape on Left Edge -->
                  <div class="absolute left-3 bottom-6 top-6 flex flex-col justify-between text-[10px] font-mono font-bold text-berry/60 select-none border-l-2 border-dashed border-berry/30 pl-2 pointer-events-none hidden sm:flex">
                    <span>60cm ⭐</span>
                    <span>45cm ☁️</span>
                    <span>30cm 🧸</span>
                    <span>15cm 🧱</span>
                  </div>
                </div>

                <!-- Whimsical Bottom Shelf Status -->
                <div class="w-full flex items-center justify-between text-[11px] text-ink/75 dark:text-cream/80 px-2 pt-1 border-t border-berry/15 font-semibold">
                  <span class="flex items-center gap-1"><span>Tap block to pop with confetti!</span></span>
                  <span id="block-stability-readout" class="font-bold text-berry">Stability: 100% Solid Base</span>
                </div>
              </div>

              <!-- Right Details & Controls (md:col-span-6) -->
              <div class="tx p-6 sm:p-7 flex flex-col justify-between gap-3 md:col-span-6 backdrop-blur-md">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="badge-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-100 dark:bg-pink-900/40 text-berry border border-berry/20">
                      <span>🧸</span>
                      <span>Playable Toy · Motor Skills</span>
                    </span>
                    <span class="text-xs font-bold text-berry px-2.5 py-0.5 rounded-full bg-berry/10 border border-berry/20" id="block-counter">
                      3 / 8 blocks
                    </span>
                  </div>

                  <h3 class="font-display font-bold text-2xl sm:text-3xl text-berry tracking-tight">Rattle & Block Toys</h3>
                  <p class="text-ink/90 dark:text-cream/90 text-xs sm:text-sm leading-relaxed mt-2 font-medium">
                    Hand-carved celestial alphabet blocks Pip engineered with rounded beechwood corners and gravity springs. Stack them high or pop them with confetti!
                  </p>

                  <!-- Spec Details Grid -->
                  <div class="grid grid-cols-2 gap-2.5 mt-4 text-xs">
                    <div class="spec-panel p-3 rounded-2xl flex items-center gap-2.5">
                      <span class="text-xl">🪵</span>
                      <div>
                        <div class="text-[10px] text-ink/70 dark:text-cream/70 uppercase font-bold">Material</div>
                        <div class="font-bold text-berry">Beechwood & Silk</div>
                      </div>
                    </div>
                    <div class="spec-panel p-3 rounded-2xl flex items-center gap-2.5">
                      <span class="text-xl">🎵</span>
                      <div>
                        <div class="text-[10px] text-ink/70 dark:text-cream/70 uppercase font-bold">Tuning</div>
                        <div class="font-bold text-berry">Pentatonic Chime</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bottom Action Controls -->
                <div class="pt-3 border-t border-berry/15 flex flex-wrap items-center gap-2.5">
                  <button class="btn btn-berry px-5 py-2.5 rounded-full font-display font-semibold text-white shadow-lg shadow-berry/25 hover:scale-105 active:scale-95 flex items-center gap-2 transition-all duration-300 text-xs sm:text-sm cursor-pointer" id="add">
                    <span>🧱</span>
                    <span>Add a Block</span>
                  </button>
                  <button class="px-4 py-2.5 rounded-full font-display font-semibold bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/60 dark:hover:bg-rose-900/80 text-berry border border-berry/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer shadow-sm" id="block-tumble-btn" title="Knock down the tower with fun sound">
                    <span>💥</span>
                    <span>Tumble Tower!</span>
                  </button>
                </div>
              </div>
            </article>

            <!-- Card 5: Bedtime Storybook -->
            <article class="pn showcase-card grid grid-cols-1 md:grid-cols-12 overflow-hidden shadow-2xl h-full" id="p5">
              <!-- Visual Left: Illustrated Book Cover & Art Spread (md:col-span-5) -->
              <div class="vis relative bg-[#1B112B] p-5 flex flex-col items-center justify-between min-h-[280px] md:col-span-5 overflow-hidden select-none h-full">
                <!-- Stardust Ambient Glow -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-purple-900/20 pointer-events-none"></div>

                <!-- Illustrated Book Frame with Ribbon Bookmark -->
                <div class="relative w-full max-w-[270px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30 group my-auto">
                  <img
                    id="storybook-cover-img"
                    src="/assets/images/pip_bedtime_storybook.jpg"
                    alt="Pip and the Sleepy Star bedtime storybook cover"
                    class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <!-- Hanging Satin Ribbon Bookmark -->
                  <div class="absolute -top-1 right-5 w-4 h-14 bg-gradient-to-b from-rose-500 to-berry rounded-b-md shadow-md flex items-end justify-center pb-1">
                    <span class="text-[8px] text-white select-none">✦</span>
                  </div>
                  <!-- Little Starlight Badge on Cover -->
                  <div class="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span id="storybook-badge" class="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-white/95 text-berry backdrop-blur-md shadow-sm">
                      Pip Original
                    </span>
                    <span class="px-2 py-0.5 rounded-full text-[9.5px] font-semibold bg-black/60 text-white backdrop-blur-md">
                      Illustrated
                    </span>
                  </div>
                </div>

                <!-- Mini Reading Controls under Image -->
                <div class="w-full mt-2 flex items-center justify-between text-xs text-cream/90 px-1 gap-2 z-10 border-t border-white/15 pt-2">
                  <div class="flex items-center gap-1.5 truncate">
                    <span class="text-moon font-bold">📖</span>
                    <span id="storybook-author" class="text-[11px] font-medium text-cream/90 truncate">By Pip ✦</span>
                  </div>
                  <div class="flex items-center gap-1.5 flex-shrink-0">
                    <button id="storybook-fav-btn" class="px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 text-cream text-[11px] font-semibold transition-all flex items-center gap-1 shadow-sm cursor-pointer" title="Bookmark favorite story">
                      <span id="storybook-fav-heart">🤍</span>
                      <span id="storybook-fav-label">Favorite</span>
                    </button>
                    <button id="storybook-open-modal-btn" class="px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 text-cream text-[11px] font-semibold transition-all flex items-center gap-1 shadow-sm cursor-pointer" title="Expand reading nook">
                      <span>Full Nook ↗</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Right Panel: Story Reader & Interactive Page Flipping (md:col-span-7) -->
              <div class="tx p-5 sm:p-6 flex flex-col justify-between gap-2.5 md:col-span-7 backdrop-blur-md h-full overflow-hidden">
                <div>
                  <!-- Header Row: Title & Quick Story Selector -->
                  <div class="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <div class="flex items-center gap-1.5">
                      <span class="inline-flex items-center gap-1 text-xs font-bold text-berry">
                        <span>📖</span>
                        <span class="font-display text-sm tracking-wide">Bedtime Storybook</span>
                      </span>
                    </div>
                    
                    <div class="flex items-center gap-2">
                      <select id="storybook-select-dropdown" class="px-2.5 py-1 rounded-full text-xs font-bold border border-berry/25 bg-white/95 dark:bg-[#220F2B] text-plum dark:text-moon focus:outline-none focus:ring-2 focus:ring-berry/40 shadow-sm cursor-pointer max-w-[180px] truncate" aria-label="Jump to any storybook">
                      </select>
                      <span id="storybook-page-counter" class="text-xs font-bold px-2 py-0.5 rounded-full bg-berry/15 text-berry border border-berry/20">
                        Page 1 of 4
                      </span>
                    </div>
                  </div>

                  <h3 id="storybook-title" class="font-display font-bold text-xl sm:text-2xl text-plum dark:text-moon leading-tight tracking-tight">
                    Pip & The Sleepy Star
                  </h3>
                  <p id="storybook-subtitle" class="text-ink/80 dark:text-cream/80 text-xs mt-0.5 font-medium">
                    A cozy bedtime story Pip wrote and illustrated.
                  </p>

                  <!-- Theme Filter Chips Row -->
                  <div class="mt-2 flex items-center justify-between gap-1.5 flex-wrap">
                    <div class="flex items-center gap-1 flex-wrap" id="storybook-category-filters">
                      <button type="button" class="px-2.5 py-1 rounded-full text-[10.5px] font-bold border border-berry bg-berry text-white shadow-sm transition-all is-active cursor-pointer" data-cat="all">
                        All (14)
                      </button>
                      <button type="button" class="px-2.5 py-1 rounded-full text-[10.5px] font-bold border border-berry/20 bg-white/90 dark:bg-white/10 text-ink/90 dark:text-cream hover:border-berry shadow-sm transition-all cursor-pointer" data-cat="bedtime">
                        🌙 Bedtime
                      </button>
                      <button type="button" class="px-2.5 py-1 rounded-full text-[10.5px] font-bold border border-berry/20 bg-white/90 dark:bg-white/10 text-ink/90 dark:text-cream hover:border-berry shadow-sm transition-all cursor-pointer" data-cat="animals">
                        🐾 Animals
                      </button>
                      <button type="button" class="px-2.5 py-1 rounded-full text-[10.5px] font-bold border border-berry/20 bg-white/90 dark:bg-white/10 text-ink/90 dark:text-cream hover:border-berry shadow-sm transition-all cursor-pointer" data-cat="friendship">
                        🤝 Friends
                      </button>
                      <button type="button" class="px-2.5 py-1 rounded-full text-[10.5px] font-bold border border-berry/20 bg-white/90 dark:bg-white/10 text-ink/90 dark:text-cream hover:border-berry shadow-sm transition-all cursor-pointer" data-cat="favorites">
                        💖 Favs (<span id="fav-count">0</span>)
                      </button>
                    </div>

                    <!-- Hidden search input retained for search filter listeners -->
                    <input type="hidden" id="storybook-search-input" value="" />
                  </div>

                  <!-- Hidden Storybook Tabs for internal controller synchronization -->
                  <div class="hidden" id="storybook-tabs"></div>

                  <!-- 3D Realistic Page-Turn Sheet -->
                  <div class="storybook-page-perspective mt-2.5">
                    <div id="storybook-page-sheet" class="storybook-page-sheet p-3.5 sm:p-4 rounded-2xl shadow-sm max-h-[160px] sm:max-h-[175px] overflow-y-auto">
                      <div class="parchment-curl-overlay"></div>
                      <h4 id="storybook-page-heading" class="font-display font-bold text-sm sm:text-base text-berry mb-1 flex items-center gap-1.5">
                        A Star Falls Softly
                      </h4>
                      <p id="storybook-page-text" class="storybook-body-text text-ink/90 dark:text-cream/90 text-xs sm:text-[13px] leading-relaxed transition-all duration-300 font-serif">
                        High above Moonberry Hollow, past the sleepy clocktower and beyond the lavender clouds, a tiny golden star named Twinkle slipped off her celestial pillow...
                      </p>
                      <div id="storybook-page-whisper" class="mt-2 pt-1.5 border-t border-berry/15 text-[10.5px] italic text-berry font-serif flex items-center gap-1">
                        <span>✦</span> Listen closely... the night breeze whispers hush-a-bye.
                      </div>
                    </div>
                  </div>

                  <!-- Reading Progress Bar -->
                  <div class="mt-2">
                    <div class="w-full h-1.5 rounded-full bg-berry/15 overflow-hidden">
                      <div id="storybook-progress-fill" class="h-full bg-gradient-to-r from-berry via-pink-400 to-amber-300 rounded-full transition-all duration-300" style="width: 25%;"></div>
                    </div>
                  </div>
                </div>

                <!-- Page Turner, Narration & Voice Reading Controls Bar -->
                <div class="pt-2 border-t border-berry/15 flex items-center justify-between gap-2 flex-wrap">
                  <div class="flex items-center gap-2">
                    <button id="storybook-prev-btn" class="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/90 hover:bg-white text-ink border border-berry/20 shadow-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer" disabled>
                      ← Prev
                    </button>
                    <button id="storybook-next-btn" class="px-4 py-1.5 rounded-full text-xs font-bold bg-berry text-white hover:bg-berry-dark shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1 cursor-pointer">
                      <span>Next</span>
                      <span>→</span>
                    </button>
                  </div>

                  <div class="flex items-center gap-1.5 flex-wrap">
                    <button id="storybook-voice-btn" class="px-3 py-1.5 rounded-full text-xs font-semibold bg-lav/30 hover:bg-lav/50 text-berry border border-berry/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-1 shadow-sm cursor-pointer" title="Gentle Web Speech voice narration">
                      <span>🎙️</span>
                      <span id="storybook-voice-label">Voice Read</span>
                    </button>
                    <button id="storybook-read-btn" class="px-3 py-1.5 rounded-full text-xs font-semibold bg-moon/50 hover:bg-moon text-ink dark:text-plum transition-all hover:scale-105 active:scale-95 flex items-center gap-1 shadow-sm cursor-pointer" title="Play soft lullaby chimes while reading">
                      <span>🎵</span>
                      <span>Lullaby</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>

          </div>
        </div>

      </div>

      <!-- Cozy Bedtime Reading Nook Modal -->
      <div id="storybook-nook-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md hidden items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label="Bedtime Storybook Reader">
        <div class="relative w-full max-w-4xl bg-[#FAF1E6] dark:bg-[#180C24] rounded-3xl border border-white/40 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
          
          <!-- Close Button -->
          <button id="storybook-modal-close" class="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center font-bold text-sm transition-transform hover:scale-110 active:scale-95 cursor-pointer" aria-label="Close storybook reader">
            ✕
          </button>

          <!-- Left Large Artwork -->
          <div class="md:w-1/2 p-6 sm:p-8 flex items-center justify-center bg-[#130920] relative">
            <img id="modal-story-img" src="/assets/images/pip_bedtime_storybook.jpg" alt="Story illustration" class="w-full h-auto max-h-[380px] object-contain rounded-2xl shadow-2xl border border-white/20" />
          </div>

          <!-- Right Story Content -->
          <div class="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between gap-4 overflow-y-auto">
            <div>
              <div class="flex items-center justify-between text-xs text-berry font-bold uppercase tracking-wider mb-2 gap-2 flex-wrap">
                <span>✦ Bedtime Story Nook</span>
                <div class="flex items-center gap-2">
                  <select id="modal-storybook-select" class="px-2.5 py-1 rounded-full text-xs font-bold border border-berry/25 bg-white/95 dark:bg-[#200D28] text-plum dark:text-moon focus:outline-none shadow-sm cursor-pointer max-w-[200px] truncate" aria-label="Switch storybook in modal">
                  </select>
                  <span id="modal-page-counter" class="text-xs px-2 py-0.5 rounded-full bg-berry/15 text-berry font-semibold whitespace-nowrap">Page 1 of 4</span>
                </div>
              </div>
              <h3 id="modal-story-title" class="font-display text-2xl sm:text-3xl font-bold text-plum dark:text-moon leading-tight">
                Pip & The Sleepy Star
              </h3>
              <div id="modal-story-author" class="text-xs text-ink/70 dark:text-cream/70 mb-4">
                Written & Illustrated by Pip ✦
              </div>

              <!-- Modal 3D Page Sheet -->
              <div class="storybook-page-perspective">
                <div id="modal-page-sheet" class="storybook-page-sheet p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-berry/15">
                  <div class="parchment-curl-overlay"></div>
                  <h4 id="modal-page-heading" class="font-display font-bold text-lg text-berry mb-2">
                    A Star Falls Softly
                  </h4>
                  <p id="modal-page-text" class="storybook-body-text text-sm sm:text-base leading-relaxed text-ink/90 dark:text-cream/90 font-light">
                    High above Moonberry Hollow, past the sleepy clocktower and beyond the lavender clouds...
                  </p>
                  <div id="modal-page-whisper" class="mt-3 pt-2 border-t border-berry/10 text-xs italic text-berry/80">
                    Listen closely... the night breeze whispers hush-a-bye.
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-berry/15 gap-2 flex-wrap">
              <button id="modal-prev-btn" class="px-4 py-2 rounded-full text-xs font-semibold bg-white/80 hover:bg-white text-ink border border-berry/20 shadow-sm transition-all disabled:opacity-40 cursor-pointer" disabled>
                ← Prev Page
              </button>
              <div class="flex items-center gap-2">
                <button id="modal-voice-btn" class="px-3.5 py-2 rounded-full text-xs font-bold bg-lav/30 hover:bg-lav/50 text-berry border border-berry/20 rounded-full shadow-sm transition-all flex items-center gap-1 cursor-pointer">
                  <span>🎙️</span>
                  <span>Voice Read</span>
                </button>
                <button id="modal-lullaby-btn" class="px-3.5 py-2 rounded-full text-xs font-bold bg-moon/50 hover:bg-moon text-ink dark:text-plum rounded-full shadow-sm transition-all flex items-center gap-1 cursor-pointer">
                  <span>🎵</span>
                  <span>Lullaby</span>
                </button>
              </div>
              <button id="modal-next-btn" class="px-4 py-2 rounded-full text-xs font-bold bg-berry text-white hover:bg-berry-dark shadow-sm transition-all cursor-pointer">
                Next Page →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
