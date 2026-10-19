// The Story Behind Pip's Portfolio
// Hackathon Requirement: The entire portfolio is built upon and driven by this story.
// This interactive storybook section reveals Pip's origin, the bedtime struggle of babies & parents,
// and how every invention in this portfolio was born to bring peace, giggles, and sweet slumber.

export function renderStoryJourney() {
  const storyChapters = [
    {
      id: 'prologue',
      number: 'Prologue',
      title: 'The Baby from the Stardust Nebula',
      subtitle: 'How a sleepy little night-spirit found his purpose',
      badge: 'Origin Lore',
      image: '/assets/images/pip_avatar_cloud.png',
      aspect: 'aspect-square',
      forBaby: '👶 Sensory delight: Soft floating clouds, gentle breathing glow, and starlight giggles.',
      forParent: '🧑‍🍼 Parenting heart: Pip represents the watchful, tender love that guards every child through the night.',
      narrative: `
        Long ago, beyond the reach of daylight in the dreamy sky of Somnia, a sleepy little baby night-spirit was born from a lavender nebula. He had a smooth, round skull face with huge glowing amber eyes and an oversized nightcap embroidered with sleeping constellations.
        
        The elders named him <strong>Pip</strong>. While other night-spirits guarded ancient towers, Pip was different: he was clumsy, easily delighted, giggled at the rustle of leaves, and most of all—<strong>he hated silence</strong>.
      `,
      whisper: '“Even the darkest night is just a blanket waiting for starlight.” — Pip',
      actionLink: '#about',
      actionText: 'View Pip’s Dossier',
      inventionLink: '#work',
      inventionText: 'See Pip’s Workshop'
    },
    {
      id: 'chapter-1',
      number: 'Chapter I',
      title: 'The Great Earth Silence',
      subtitle: 'The night Pip looked through the telescope and heard the cribs',
      badge: 'The Problem',
      image: '/assets/images/moonberry_hollow.jpg',
      aspect: 'aspect-[4/3]',
      forBaby: '👶 Sensory comfort: Banishing the cold darkness with warm ambient sounds.',
      forParent: '🧑‍🍼 Reassurance: Every parent knows the 2:00 AM exhaustion. Pip’s world was created to ease that weight.',
      narrative: `
        One twilight in Moonberry Hollow, Pip climbed the brass ladder of the clocktower and peered through his starlight telescope down at Earth.
        
        Down below, in quiet nurseries, <strong>little babies were crying in their cribs</strong>. The rooms were too dark, the silence was too heavy for little ears accustomed to the warm hum of their mother’s heartbeat, and exhausted mothers and fathers were pacing back and forth, desperately trying to rock their babies to sleep.
        
        Pip clutched his starry cap with wide eyes. <em>“No baby should ever be afraid of the quiet,”</em> Pip gasped with a brave little wobble. <em>“And no tired parent should have to carry bedtime all alone!”</em>
      `,
      whisper: 'The quiet is never empty when it is filled with a mother’s lullaby.',
      actionLink: '#world',
      actionText: 'Explore Moonberry Hollow',
      inventionLink: '#p1',
      inventionText: 'See The Lullaby Solution'
    },
    {
      id: 'chapter-2',
      number: 'Chapter II',
      title: 'The Four Slumber Inventions',
      subtitle: 'How every project in this portfolio was born from love',
      badge: 'Portfolio Inventions',
      image: '/assets/images/pip_lullaby_box.png',
      aspect: 'aspect-square',
      forBaby: '👶 Interactive toys: Tactile wooden blocks, gentle rattle shakes, and 432 Hz bells.',
      forParent: '🧑‍🍼 Pediatric value: Calms nervous systems, stimulates gentle cognitive growth, and promotes deep REM sleep.',
      narrative: `
        Pip rushed down to the Midnight Nursery workshop and laid out his blueprints. To turn bedtime tears into peaceful smiles, he engineered four wondrous artifacts:
        <ul class="story-invention-list">
          <li><strong>🎵 The Lullaby Lab:</strong> A 432 Hz clockwork music box tuned to the cadence of maternal heartbeats, replacing terrifying silence with sweet melody.</li>
          <li><strong>💡 The Nightlight Lanterns:</strong> Handblown 2700K amber glow lanterns that melt scary shadows away without disrupting fragile baby melatonin.</li>
          <li><strong>🗺️ The Dream Delivery Flight Radar:</strong> A sky-sled route mapped across rooftops to hand-deliver sweet dreams to baby windows before midnight.</li>
          <li><strong>🧸 Rattle & Sensory Blocks:</strong> Soft wooden physics toys that build baby motor skills, soothe teething restlessness, and prompt tired giggles.</li>
        </ul>
      `,
      whisper: 'Every cog and gear in Pip’s workshop was tuned to the rhythm of a cradle.',
      actionLink: '#work',
      actionText: 'Test The Inventions Live',
      inventionLink: '#p1',
      inventionText: 'Launch The Lullaby Lab'
    },
    {
      id: 'chapter-3',
      number: 'Chapter III',
      title: 'The Sanctuary for Tired Parents',
      subtitle: 'Because soothing a baby begins with reassuring the parent',
      badge: 'Parenting Care',
      image: '/assets/images/moms_hands.jpg',
      aspect: 'aspect-[4/3]',
      forBaby: '👶 Bonding: Listening to parent’s familiar voice reading stories and singing verses.',
      forParent: '🧑‍🍼 Practical tools: Sing-along lyrics (English + Hindi), Bedtime Wind-Down Timer, and Nightlight Screen Lamp.',
      narrative: `
        Pip understood a golden secret: <strong>a baby cannot sleep peacefully if the parent is tense and overwhelmed</strong>.
        
        So Pip expanded his portfolio into a complete dual sanctuary. He added sing-along nursery lyrics for classic Indian & world rhymes (so parents never forget the words), soothing rain and cricket white noise, a progressive Bedtime Wind-Down Timer that dims the room, and an entire digital bedtime storybook library.
      `,
      whisper: 'When a mother or father hums, the whole nursery becomes safe.',
      actionLink: '#p5',
      actionText: 'Open Bedtime Storybooks',
      inventionLink: '#dual-hub',
      inventionText: 'Open Parent Sanctuary'
    },
    {
      id: 'epilogue',
      number: 'Epilogue',
      title: 'Tonight’s Slumber Invitation',
      subtitle: 'You are now part of Pip’s Midnight Nursery family',
      badge: 'Sweet Dreams',
      image: '/assets/images/pip_portrait.png',
      aspect: 'aspect-[4/5]',
      forBaby: '👶 Sweet dreams: A cozy dream woven just for tonight.',
      forParent: '🧑‍🍼 A peaceful evening: You’ve done wonderfully today. Sleep tight.',
      narrative: `
        Tonight, Pip sits on his pink cloud above the rooftops, holding his glowing amber lantern and winding his music box.
        
        This website is not just a digital showcase. It is a living storybook haven where little babies can be soothed by sensory magic and parents can find calm, tools, and joy.
        
        <em>“I build the dreams you fall asleep inside,”</em> Pip whispers with a cozy yawn. <em>“Snuggle close, little dreamer. Tomorrow is waiting for you.”</em>
      `,
      whisper: 'Close your eyes now. Pip is on duty at the Midnight Nursery. ✦',
      actionLink: '#guestbook',
      actionText: 'Leave Pip a Bedtime Whisper',
      inventionLink: '#top',
      inventionText: 'Back to Stardust Skies'
    }
  ];

  return `
    <section class="story-journey-section py-20 px-4 sm:px-8 lg:px-16 relative z-20" id="story-origin">
      <div class="max-w-7xl mx-auto">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-berry/10 dark:bg-white/10 text-berry dark:text-moon font-display font-bold text-xs uppercase tracking-wider mb-3 border border-berry/20">
            <span>📖</span> <span>Hackathon Narrative Foundation · The True Tale</span> <span>✦</span>
          </div>
          <h2 class="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-berry dark:text-cream leading-tight">
            The Story Behind Pip’s World
          </h2>
          <p class="text-ink dark:text-cream/90 text-sm sm:text-base md:text-lg mt-3 font-medium leading-relaxed">
            This portfolio was not built as a typical tech resume. It was born from a story: how a sleepy little night-spirit named Pip engineered dreams, lullabies, and nightlights to comfort crying babies and soothe tired parents.
          </p>

          <!-- Audience Dual Badge Indicator -->
          <div class="flex items-center justify-center gap-3 mt-5 flex-wrap">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 dark:bg-pink-950/60 border border-pink-300/60 text-xs font-bold text-berry">
              <span>👶</span> <span>Sensory Playground for Babies</span>
            </span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 dark:bg-amber-950/60 border border-amber-300/60 text-xs font-bold text-amber-800 dark:text-amber-200">
              <span>🧑‍🍼</span> <span>Bedtime Sanctuary for Parents</span>
            </span>
          </div>
        </div>

        <!-- Interactive Chapter Navigation Bar -->
        <div class="flex items-center justify-center gap-2 mb-8 flex-wrap" id="story-chapter-tabs">
          ${storyChapters.map((chap, idx) => `
            <button
              type="button"
              class="story-tab-btn ${idx === 0 ? 'is-active' : ''} px-3.5 sm:px-4 py-2 rounded-full font-display font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all duration-300 shadow-sm border border-berry/20 cursor-pointer"
              data-story-idx="${idx}"
            >
              <span class="text-xs opacity-70">${chap.number}:</span>
              <span>${chap.title.split(' ')[0]} ${chap.title.split(' ')[1] || ''}</span>
            </button>
          `).join('')}
        </div>

        <!-- Storybook Reading Stage Card -->
        <div class="story-stage-container rounded-3xl glass-panel p-6 sm:p-10 border-2 border-white/80 dark:border-berry/30 shadow-2xl relative overflow-hidden">
          
          <!-- Decorative Stardust Backdrop -->
          <div class="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-pink-300/20 blur-3xl pointer-events-none"></div>
          <div class="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-lav/20 blur-3xl pointer-events-none"></div>

          ${storyChapters.map((chap, idx) => `
            <div class="story-chapter-card ${idx === 0 ? 'block' : 'hidden'} transition-all duration-500" id="story-chap-${idx}">
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                <!-- Left: Illustration Stage -->
                <div class="lg:col-span-5 flex flex-col items-center">
                  <div class="relative w-full max-w-sm rounded-3xl overflow-hidden glass-panel border-4 border-white dark:border-white/20 shadow-2xl group cursor-pointer" onclick="if(window.nurseryAudio) window.nurseryAudio.playPipGiggle();">
                    <div class="${chap.aspect} overflow-hidden bg-blush/20 relative">
                      <img
                        src="${chap.image}"
                        alt="${chap.title}"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-deep/30 via-transparent to-transparent pointer-events-none"></div>
                    </div>

                    <!-- Tap to Giggle floating sticker -->
                    <div class="absolute bottom-3 right-3 glass-pill px-3 py-1 rounded-full text-[11px] font-bold text-berry bg-white/90 shadow-md flex items-center gap-1 border border-pink-200">
                      <span>✨</span> <span>Tap for Giggle</span>
                    </div>

                    <!-- Chapter Badge -->
                    <div class="absolute top-3 left-3 glass-pill px-3 py-1 rounded-full text-[11px] font-extrabold text-white bg-berry/90 shadow-md">
                      ${chap.number} · ${chap.badge}
                    </div>
                  </div>

                  <!-- Audio Read Aloud & Chime Narration Bar -->
                  <div class="mt-4 flex items-center gap-2">
                    <button
                      type="button"
                      class="story-narrate-btn px-4 py-2 rounded-full glass-panel border border-berry/30 hover:border-berry text-berry font-display font-bold text-xs flex items-center gap-2 transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                      data-chapter-idx="${idx}"
                    >
                      <span class="narrate-icon">🔊</span>
                      <span class="narrate-label">Read Chapter to Me</span>
                    </button>
                    <button
                      type="button"
                      class="story-chime-btn w-9 h-9 rounded-full glass-panel border border-pink-200 text-berry flex items-center justify-center text-sm hover:scale-110 active:scale-90 transition-all cursor-pointer"
                      title="Play Stardust Chime"
                      onclick="if(window.nurseryAudio) window.nurseryAudio.playChime('C6');"
                    >
                      🔔
                    </button>
                  </div>
                </div>

                <!-- Right: Chapter Narrative Content -->
                <div class="lg:col-span-7 flex flex-col gap-4 text-left">
                  <div class="inline-flex items-center gap-2">
                    <span class="text-xs font-extrabold text-berry px-2.5 py-0.5 rounded-full bg-berry/10 dark:bg-white/10 uppercase tracking-widest">${chap.number}</span>
                    <span class="text-xs font-semibold text-ink/60 dark:text-cream/60">Bedtime Story Archive</span>
                  </div>

                  <h3 class="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-berry dark:text-moon leading-tight">
                    ${chap.title}
                  </h3>

                  <p class="text-sm sm:text-base font-semibold text-berry/80 dark:text-moon/90 italic">
                    ${chap.subtitle}
                  </p>

                  <div class="story-narrative-body text-ink dark:text-cream/90 text-sm sm:text-base leading-relaxed font-normal pt-2 border-t border-berry/15 dark:border-white/10">
                    ${chap.narrative}
                  </div>

                  <!-- Dual Perspective Callouts (Baby & Parent) -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    <div class="p-3 rounded-2xl bg-pink-500/10 dark:bg-pink-950/40 border border-pink-400/30">
                      <div class="text-xs font-bold text-berry dark:text-pink-300 mb-1">For Baby 👶</div>
                      <p class="text-xs text-ink/80 dark:text-cream/80 leading-normal">${chap.forBaby}</p>
                    </div>
                    <div class="p-3 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-400/30">
                      <div class="text-xs font-bold text-amber-800 dark:text-amber-300 mb-1">For Parent 🧑‍🍼</div>
                      <p class="text-xs text-ink/80 dark:text-cream/80 leading-normal">${chap.forParent}</p>
                    </div>
                  </div>

                  <!-- Bedtime Whisper Card -->
                  <div class="p-3.5 rounded-2xl bg-lav/10 dark:bg-lav/20 border border-lav/30 flex items-center gap-3">
                    <span class="text-xl">🌙</span>
                    <p class="text-xs sm:text-sm italic font-medium text-ink dark:text-cream/90 leading-snug">
                      ${chap.whisper}
                    </p>
                  </div>

                  <!-- Story-to-Portfolio Action Bridge -->
                  <div class="flex items-center gap-3 pt-3 flex-wrap">
                    <a
                      href="${chap.inventionLink}"
                      class="px-5 py-2.5 rounded-full btn-berry text-white font-display font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all"
                    >
                      <span>🛠️</span>
                      <span>${chap.inventionText}</span>
                    </a>
                    <a
                      href="${chap.actionLink}"
                      class="px-4 py-2.5 rounded-full glass-panel border border-pink-200 text-berry font-display font-semibold text-xs sm:text-sm hover:border-berry transition-all"
                    >
                      <span>✦</span>
                      <span>${chap.actionText}</span>
                    </a>
                  </div>

                </div>

              </div>
            </div>
          `).join('')}

          <!-- Chapter Paging Controls -->
          <div class="flex items-center justify-between mt-8 pt-6 border-t border-berry/15 dark:border-white/10">
            <button
              id="story-prev-btn"
              type="button"
              class="px-4 py-2 rounded-full glass-panel border border-berry/20 text-berry font-display font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>←</span> <span>Previous Chapter</span>
            </button>

            <span id="story-progress-indicator" class="text-xs font-bold text-berry dark:text-moon font-mono">
              Chapter 1 of 5
            </span>

            <button
              id="story-next-btn"
              type="button"
              class="px-4 py-2 rounded-full glass-panel border border-berry/20 text-berry font-display font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Next Chapter</span> <span>→</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  `;
}
