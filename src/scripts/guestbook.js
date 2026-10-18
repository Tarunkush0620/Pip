import { nurseryAudio } from '../audio/soundEffects.js';

export function initGuestbook() {
  const container = document.getElementById('whispers-list');
  const form = document.getElementById('whisper-form');
  const nameInput = document.getElementById('whisper-name');
  const msgInput = document.getElementById('whisper-msg');
  if (!container || !form) return;

  const defaultWhispers = [
    {
      id: '1',
      name: 'Luna the Little Ghost',
      avatar: '👻',
      time: 'Midnight today',
      message: 'Pip! The dream where we chased fireflies inside teacups was wonderful. The attic wasn’t scary at all!',
      hearts: 14,
      pipReply: 'Pip giggled and saved your teacup firefly in a jar! ✨',
    },
    {
      id: '2',
      name: 'Barnaby the Night Owl',
      avatar: '🦉',
      time: 'Yesterday at dusk',
      message: 'Pip’s music box lullaby in 432Hz is the gold standard across the forest. Even the cranky badgers snoozed.',
      hearts: 29,
      pipReply: 'Pip is very proud of his music box! *yawns happily* 🎵',
    },
    {
      id: '3',
      name: 'Snorey the Sleepy Cloud',
      avatar: '☁️',
      time: 'Two nights ago',
      message: 'Please send an extra shipment of lavender fluff to Moon Lane tonight. We need extra softness!',
      hearts: 21,
      pipReply: 'Express cloud delivery dispatched with starry ribbons! 🎀',
    },
  ];

  function getWhispers() {
    try {
      const stored = localStorage.getItem('pip_bedtime_whispers');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
    return defaultWhispers;
  }

  function saveWhispers(whispers) {
    try {
      localStorage.setItem('pip_bedtime_whispers', JSON.stringify(whispers));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }

  function render() {
    const list = getWhispers();
    container.innerHTML = '';

    list.forEach((w) => {
      const card = document.createElement('div');
      card.className = 'p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-black/35 border border-pink-200/80 dark:border-white/15 shadow-md hover:shadow-lg backdrop-blur-2xl transition-all duration-300';
      card.innerHTML = `
        <div class="flex items-start justify-between gap-3 mb-2.5">
          <div class="flex items-center gap-2.5">
            <span class="text-2xl drop-shadow-xs">${w.avatar || '⭐'}</span>
            <div>
              <h4 class="font-bold text-berry dark:text-moon text-base font-display">${escapeHTML(w.name)}</h4>
              <span class="text-xs text-ink/70 dark:text-cream/60 font-semibold">${w.time}</span>
            </div>
          </div>
          <button type="button" class="heart-btn text-xs px-3 py-1.5 rounded-full bg-pink-100/90 dark:bg-white/15 hover:bg-pink-200 dark:hover:bg-white/25 text-berry dark:text-pink-300 border border-pink-200 dark:border-white/15 transition-all flex items-center gap-1.5 font-bold cursor-pointer active:scale-95 shadow-xs">
            <span>❤️</span> <span class="heart-count">${w.hearts}</span>
          </button>
        </div>
        <p class="text-ink dark:text-cream text-sm leading-relaxed mb-3.5 font-medium">${escapeHTML(w.message)}</p>
        <div class="p-3 sm:p-3.5 rounded-2xl bg-pink-50/90 dark:bg-white/10 border border-pink-200/70 dark:border-white/15 text-xs text-ink/85 dark:text-cream/90 flex items-center gap-2.5 shadow-inner">
          <span class="font-bold text-berry dark:text-moon shrink-0">Pip says:</span>
          <span class="font-medium">${w.pipReply}</span>
        </div>
      `;

      const heartBtn = card.querySelector('.heart-btn');
      heartBtn.onclick = () => {
        nurseryAudio.playChime('G4');
        w.hearts += 1;
        heartBtn.querySelector('.heart-count').textContent = w.hearts;
        saveWhispers(list);
      };

      container.appendChild(card);
    });
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const msg = msgInput.value.trim();
    if (!name || !msg) return;

    nurseryAudio.playChime('C5');

    const pipReplies = [
      'Pip clapped his tiny hands and tucked this under his pillow!',
      'Pip giggled softly and sent a warm dream bubble back to you!',
      'Pip marked this with golden stardust in the Midnight Ledger!',
      'Pip yawned a sweet thank you and promised the sweetest dreams tonight!',
    ];

    const newWhisper = {
      id: Date.now().toString(),
      name,
      avatar: ['🌙', '⭐', '🧸', '✨', '🍼', '🎈'][Math.floor(Math.random() * 6)],
      time: 'Just now',
      message: msg,
      hearts: 1,
      pipReply: pipReplies[Math.floor(Math.random() * pipReplies.length)],
    };

    const currentList = getWhispers();
    currentList.unshift(newWhisper);
    saveWhispers(currentList);

    nameInput.value = '';
    msgInput.value = '';
    render();

    // Feedback
    const submitBtn = form.querySelector('button[type="submit"]');
    const oldText = submitBtn.textContent;
    submitBtn.textContent = 'Whisper sent to Pip! 🌙';
    submitBtn.classList.add('bg-green-600');
    setTimeout(() => {
      submitBtn.textContent = oldText;
      submitBtn.classList.remove('bg-green-600');
    }, 2000);
  };

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  render();
}
