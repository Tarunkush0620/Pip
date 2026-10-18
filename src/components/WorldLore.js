import { WORLD_LORE_DATA } from '../data/worldData.js';

export function renderWorldLore() {
  const worlds = Object.values(WORLD_LORE_DATA);

  return `
    <section class="world-section py-24 px-4 sm:px-8 lg:px-16 relative z-20" id="world">
      <div class="max-w-7xl mx-auto">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-10">
          <div class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-berry mb-2.5">
            <span>✦</span> <span>Atlas & Geography · Living Dreamlands</span>
          </div>
          <h2 class="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-berry leading-tight">
            Pip’s Magical Universe
          </h2>
          <p class="text-ink text-base sm:text-lg mt-3 font-semibold leading-relaxed">
            Move your cursor across the scenery to discover hidden whispers, glowing lights, and bedtime stories. Tap anywhere to interact with Pip’s world.
          </p>
        </div>

          <!-- Interactive Tab Selector -->
          <div class="inline-flex p-1 sm:p-1.5 rounded-full glass-panel mt-6 gap-1 sm:gap-1.5 shadow-md flex-wrap justify-center border border-pink-200/50 max-w-full">
            <button
              type="button"
              class="world-tab-btn active px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-display font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer"
              data-tab="somnia"
            >
              <span>🌌</span>
              <span>1. <span class="hidden sm:inline">The World — </span>Somnia</span>
            </button>

            <button
              type="button"
              class="world-tab-btn px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-display font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer"
              data-tab="town"
            >
              <span>🌙</span>
              <span>2. <span class="hidden sm:inline">The Town — </span>Moonberry</span>
            </button>

            <button
              type="button"
              class="world-tab-btn px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-display font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer"
              data-tab="neighborhood"
            >
              <span>🏡</span>
              <span>3. <span class="hidden sm:inline">Neighborhood — </span>Starwhisper</span>
            </button>
          </div>
        </div>

        <!-- Tab Panels -->
        ${worlds.map((world, idx) => {
    const defaultLm = world.landmarks[0];
    const isPortrait = world.aspect.includes('2/3');

    return `
            <div class="world-content-panel ${idx === 0 ? 'active' : 'hidden'} transition-all duration-500" id="panel-${world.id}">
              <div class="grid grid-cols-1 ${isPortrait ? 'lg:grid-cols-12' : 'lg:grid-cols-12'} gap-8 items-start">
                
                <!-- Pure Living Artwork Container (No Chunky Sticker Badges) -->
                <div class="${isPortrait ? 'lg:col-span-7 flex justify-center' : 'lg:col-span-8'}">
                  <div class="w-full ${isPortrait ? 'max-w-lg mx-auto' : ''}">
                    <div class="relative rounded-3xl overflow-hidden glass-panel border-2 border-white/80 shadow-2xl p-2.5 map-visual-container group/frame" data-world="${world.id}">
                      <div class="rounded-2xl overflow-hidden ${world.aspect} bg-deep/20 relative select-none">
                        
                        <!-- Base Living Artwork Image with Dream Breathing Animation -->
                        <img
                          src="${world.image}"
                          alt="${world.name}: ${world.subtitle}"
                          class="w-full h-full object-cover transition-transform duration-700 select-none pointer-events-none living-art-image"
                          loading="lazy"
                        />

                        <!-- Living Breathing Lantern & Window Lights -->
                        ${world.id === 'somnia' ? `
                          <div class="living-lantern-glow" style="left: 18%; top: 78%; width: 55px; height: 55px;"></div>
                          <div class="living-lantern-glow glow-cyan" style="left: 54%; top: 73%; width: 75px; height: 75px;"></div>
                          <div class="living-lantern-glow glow-star" style="left: 48%; top: 16%; width: 50px; height: 50px;"></div>
                          <div class="living-lantern-glow" style="left: 21%; top: 38%; width: 60px; height: 60px;"></div>
                        ` : ''}

                        ${world.id === 'town' ? `
                          <div class="living-lantern-glow" style="left: 48%; top: 65%; width: 65px; height: 65px;"></div>
                          <div class="living-lantern-glow" style="left: 24%; top: 39%; width: 70px; height: 70px;"></div>
                          <div class="living-lantern-glow" style="left: 77%; top: 46%; width: 65px; height: 65px;"></div>
                          <div class="living-lantern-glow glow-cyan" style="left: 52%; top: 36%; width: 60px; height: 60px;"></div>
                          <div class="living-lantern-glow glow-star" style="left: 51%; top: 13%; width: 55px; height: 55px;"></div>
                          <div class="living-lantern-glow" style="left: 12%; top: 31%; width: 40px; height: 40px;"></div>
                          <div class="living-lantern-glow" style="left: 60%; top: 44%; width: 40px; height: 40px;"></div>
                        ` : ''}

                        ${world.id === 'neighborhood' ? `
                          <div class="living-lantern-glow" style="left: 19%; top: 49%; width: 70px; height: 70px;"></div>
                          <div class="living-lantern-glow" style="left: 43%; top: 26%; width: 70px; height: 70px;"></div>
                          <div class="living-lantern-glow glow-star" style="left: 61%; top: 14%; width: 90px; height: 90px;"></div>
                          <div class="living-lantern-glow" style="left: 76%; top: 30%; width: 70px; height: 70px;"></div>
                          <div class="living-lantern-glow" style="left: 88%; top: 52%; width: 65px; height: 65px;"></div>
                          <div class="living-lantern-glow glow-cyan" style="left: 58%; top: 51%; width: 65px; height: 65px;"></div>
                          <div class="living-lantern-glow" style="left: 74%; top: 76%; width: 60px; height: 60px;"></div>
                          <div class="living-lantern-glow" style="left: 40%; top: 65%; width: 40px; height: 40px;"></div>
                          <div class="living-lantern-glow" style="left: 53%; top: 68%; width: 40px; height: 40px;"></div>
                        ` : ''}

                        <!-- Drifting Ambient Mist / Clouds -->
                        <div class="drifting-cloud-layer absolute bottom-0 left-0 right-0 h-36"></div>

                        <!-- Animated Ambient Living Stardust, Steam, Smoke, & Shooting Stars Canvas -->
                        <canvas class="world-particle-canvas absolute inset-0 pointer-events-none z-10 w-full h-full" data-world="${world.id}"></canvas>

                        <!-- Invisible Interactive Hotspot Hitboxes & Soft Fairy Sparkles -->
                        <div class="world-hotspots-layer absolute inset-0 z-20 pointer-events-none" data-world="${world.id}">
                          ${world.landmarks.map((lm) => `
                            <button
                              type="button"
                              class="map-hotspot-zone pointer-events-auto absolute group/zone focus:outline-none w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center"
                              style="left: ${lm.x}%; top: ${lm.y}%;"
                              data-landmark-id="${lm.id}"
                              data-world="${world.id}"
                              aria-label="${lm.name}"
                              title="${lm.name} · Click to explore"
                            >
                              <!-- Soft Illuminated Spotlight on Hover -->
                              <span class="spotlight-halo"></span>

                              <!-- Delicate Golden Fairy Star Pip (Subtle & Magical) -->
                              <span class="fairy-sparkle-pip flex items-center justify-center w-6 h-6 rounded-full bg-amber-400/25 backdrop-blur-xs border border-amber-300/70 text-amber-100 text-[11px] font-bold shadow-sm pointer-events-none">
                                ✦
                              </span>

                              <!-- Floating Fairy-Tale Tooltip Banner on Hover -->
                              <span class="spotlight-tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 rounded-full glass-pill border border-amber-200/60 text-ink text-xs font-semibold whitespace-nowrap opacity-0 group-hover/zone:opacity-100 transition-all duration-200 pointer-events-none shadow-xl scale-95 group-hover/zone:scale-100 flex items-center gap-1.5 z-30">
                                <span class="text-amber-500 font-bold">✦</span>
                                <span class="font-display font-bold text-berry">${lm.name}</span>
                              </span>
                            </button>
                          `).join('')}
                        </div>

                        <!-- Top Toolbar Pills -->
                        <div class="absolute top-3 left-3 z-30 pointer-events-none flex items-center gap-2">
                          <span class="glass-pill px-3 py-1.5 rounded-full text-[11px] font-bold text-berry flex items-center gap-1.5 shadow-md border border-white/40">
                            <span class="text-[10px]">✨</span>
                            <span>Click any building or scenery</span>
                          </span>
                        </div>

                        <div class="absolute top-3 right-3 z-30 flex items-center gap-2">
                          <!-- Toggle Sparkle Guides -->
                          <button
                            type="button"
                            class="toggle-guides-btn glass-pill px-3 py-1.5 rounded-full text-[11px] font-semibold text-ink hover:text-berry flex items-center gap-1.5 shadow-md border border-white/40 transition-all active:scale-95 cursor-pointer bg-white/80"
                            title="Toggle subtle fairy guide stars"
                          >
                            <span>✦</span>
                            <span class="guide-btn-label">Guides: On</span>
                          </button>

                          <!-- Fullscreen Lightbox -->
                          <button
                            type="button"
                            class="world-image-viewer glass-pill px-3 py-1.5 rounded-full text-[11px] font-semibold text-ink hover:text-berry flex items-center gap-1.5 shadow-md border border-white/40 transition-all active:scale-95 cursor-pointer bg-white/80"
                            data-src="${world.image}"
                            data-title="${world.name} — ${world.subtitle}"
                            title="Open native high-res lightbox"
                          >
                            <span>🔍</span>
                            <span>Inspect Art</span>
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                <!-- Story & Landmark Explorer Sidebar (Unobstructed View) -->
                <div class="${isPortrait ? 'lg:col-span-5' : 'lg:col-span-4'} flex flex-col gap-5">
                  
                  <!-- Realm Header -->
                  <div class="flex items-center justify-between">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-moon/20 text-berry">
                      <span>✦</span> <span>${world.tag}</span>
                    </div>
                    <span class="text-[11px] font-bold text-ink/60 uppercase tracking-wider">Dream Field Guide</span>
                  </div>
                  
                  <div>
                    <h3 class="font-display font-bold text-3xl sm:text-4xl text-berry leading-tight">
                      ${world.name}
                    </h3>
                    <p class="text-xs uppercase tracking-wider text-ink/60 font-semibold mt-0.5">
                      ${world.subtitle}
                    </p>
                  </div>

                  <!-- Dynamic Active Landmark Story Card -->
                  <div class="active-landmark-card glass-panel rounded-2xl p-4 sm:p-5 border-2 border-white/90 shadow-xl" data-world="${world.id}">
                    <div class="flex items-start justify-between gap-3">
                      <div>
                        <div class="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">
                          <span>✦</span> <span class="active-lm-label">Selected Landmark</span>
                        </div>
                        <h4 class="active-lm-title font-display font-bold text-xl sm:text-2xl text-berry leading-tight">
                          ${defaultLm.name}
                        </h4>
                        <p class="active-lm-subtitle text-xs font-medium text-ink/70 mt-0.5">
                          ${defaultLm.subtitle}
                        </p>
                      </div>
                      <span class="active-lm-emoji text-3xl p-2 rounded-2xl bg-white/70 shadow-inner flex items-center justify-center">
                        ${defaultLm.emoji}
                      </span>
                    </div>

                    <p class="active-lm-lore text-xs sm:text-sm text-ink leading-relaxed mt-3">
                      ${defaultLm.lore}
                    </p>

                    <div class="active-lm-secret p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/50 text-[11px] sm:text-xs text-ink/80 mt-3 italic flex items-start gap-2">
                      <span class="text-amber-500 font-bold shrink-0">✨ Secret:</span>
                      <span class="active-secret-text">${defaultLm.funFact}</span>
                    </div>

                    <!-- Interactive Action Button in Sidebar -->
                    <div class="mt-4 pt-3 border-t border-pink-100/60 flex items-center justify-between gap-2 flex-wrap">
                      <button
                        type="button"
                        class="active-action-btn btn-berry px-4 py-2 rounded-full text-xs font-bold text-white shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                        data-action="${defaultLm.actionEffect}"
                        data-sound="${defaultLm.sound}"
                        data-x="${defaultLm.x}"
                        data-y="${defaultLm.y}"
                      >
                        <span class="active-action-icon">${defaultLm.emoji}</span>
                        <span class="active-action-label">${defaultLm.actionLabel}</span>
                      </button>

                      <span class="active-feedback-status text-[11px] font-semibold text-berry/80 italic"></span>
                    </div>
                  </div>

                  <!-- Clickable Landmarks Directory -->
                  <div>
                    <div class="flex items-center justify-between mb-2.5">
                      <h4 class="text-xs font-bold uppercase tracking-wider text-ink/60">
                        Explore All Locations (${world.landmarks.length})
                      </h4>
                      <span class="text-[11px] text-berry font-semibold">Tap to spotlight ✦</span>
                    </div>
                    
                    <div class="flex flex-wrap gap-2">
                      ${world.landmarks.map((lm, i) => `
                        <button
                          type="button"
                          class="landmark-chip ${i === 0 ? 'ring-2 ring-berry bg-berry/15' : ''} px-3 py-1.5 rounded-full text-xs font-medium glass-panel text-ink flex items-center gap-1.5 transition-all cursor-pointer"
                          data-landmark-id="${lm.id}"
                          data-world="${world.id}"
                          title="${lm.subtitle}"
                        >
                          <span>${lm.emoji}</span>
                          <span>${lm.name}</span>
                        </button>
                      `).join('')}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          `;
  }).join('')}

      </div>

      <!-- Lightbox Modal for Full-Resolution Artwork Inspection -->
      <div id="world-lightbox" class="fixed inset-0 z-[100] bg-deep/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 opacity-0 pointer-events-none transition-opacity duration-300">
        <div class="relative max-w-6xl w-full flex flex-col items-center">
          <button id="close-lightbox-btn" type="button" class="absolute -top-12 right-0 sm:right-2 text-white bg-white/10 hover:bg-white/25 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg transition-colors cursor-pointer" title="Close lightbox (Esc)">
            ✕
          </button>
          <div class="rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl max-h-[82vh] bg-black/40">
            <img id="lightbox-img" src="" alt="World Artwork" class="w-full h-auto max-h-[80vh] object-contain select-none" />
          </div>
          <div id="lightbox-caption" class="mt-3 text-cream font-display font-semibold text-sm sm:text-base text-center"></div>
        </div>
      </div>

    </section>
  `;
}


