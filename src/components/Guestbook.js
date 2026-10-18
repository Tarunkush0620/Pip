export function renderGuestbook() {
  return `
    <section class="whispers py-24 px-6 sm:px-12 lg:px-20 relative z-20 text-ink dark:text-cream" id="whispers">
      <div class="max-w-5xl mx-auto">
        
        <div class="text-center max-w-2xl mx-auto mb-12 glass-panel p-6 sm:p-8 rounded-3xl border border-white/90 dark:border-white/15 shadow-xl backdrop-blur-2xl bg-white/85 dark:bg-black/35">
          <div class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-berry dark:text-moon mb-2">
            <span>💌</span> <span>Community Guestbook</span>
          </div>
          <h2 class="font-display text-4xl sm:text-5xl font-extrabold text-berry dark:text-cream leading-tight">
            Bedtime Whispers
          </h2>
          <p class="text-ink/80 dark:text-cream/80 text-base sm:text-lg mt-3 font-medium">
            Leave Pip a gentle lullaby wish, sleep tip, or warm goodnight note before turning off the lamp.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Whisper Form -->
          <div class="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-panel border border-white/90 dark:border-white/15 shadow-xl backdrop-blur-2xl bg-white/85 dark:bg-black/35">
            <h3 class="font-display font-bold text-2xl text-berry dark:text-moon mb-1.5">Leave a Whisper</h3>
            <p class="text-xs text-ink/75 dark:text-cream/70 mb-6 font-semibold">Pip reads these right before tucking into his cloud bed.</p>
            
            <form id="whisper-form" class="space-y-4">
              <div>
                <label for="whisper-name" class="block text-xs font-bold text-ink/85 dark:text-cream/90 mb-1.5">Your Name / Creature Type</label>
                <input
                  type="text"
                  id="whisper-name"
                  placeholder="e.g. Timothy the Firefly"
                  required
                  class="w-full px-4 py-3 rounded-2xl bg-white/90 dark:bg-white/10 border border-berry/20 dark:border-white/20 text-ink dark:text-cream placeholder-ink/40 dark:placeholder-cream/40 text-sm font-medium shadow-inner focus:outline-none focus:border-berry focus:ring-2 focus:ring-berry/20 transition-all"
                />
              </div>

              <div>
                <label for="whisper-msg" class="block text-xs font-bold text-ink/85 dark:text-cream/90 mb-1.5">Your Bedtime Note or Lullaby Lyric</label>
                <textarea
                  id="whisper-msg"
                  rows="3"
                  placeholder="e.g. Thanks for the sweet dreams, Pip! Don't forget your warm milk..."
                  required
                  class="w-full px-4 py-3 rounded-2xl bg-white/90 dark:bg-white/10 border border-berry/20 dark:border-white/20 text-ink dark:text-cream placeholder-ink/40 dark:placeholder-cream/40 text-sm font-medium shadow-inner focus:outline-none focus:border-berry focus:ring-2 focus:ring-berry/20 transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                class="w-full py-3.5 rounded-full font-display font-bold text-white bg-gradient-to-r from-berry via-[#F0427F] to-pink-500 hover:from-berry-dark hover:to-pink-600 transition-all duration-300 shadow-lg shadow-berry/30 hover:shadow-berry/50 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span class="text-base">🌙</span>
                <span>Send Bedtime Note</span>
              </button>
            </form>
          </div>

          <!-- Whispers Stream -->
          <div class="lg:col-span-7 space-y-4" id="whispers-list">
            <!-- Dynamically populated by guestbook.js -->
          </div>

        </div>

      </div>
    </section>
  `;
}
