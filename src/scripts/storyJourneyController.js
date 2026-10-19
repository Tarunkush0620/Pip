// Controller for StoryBehindThePortfolio
import { nurseryAudio } from '../audio/soundEffects.js';

export function initStoryJourneyController() {
  const tabs = document.querySelectorAll('.story-tab-btn');
  const cards = document.querySelectorAll('.story-chapter-card');
  const prevBtn = document.getElementById('story-prev-btn');
  const nextBtn = document.getElementById('story-next-btn');
  const progressIndicator = document.getElementById('story-progress-indicator');
  const narrateBtns = document.querySelectorAll('.story-narrate-btn');

  if (!tabs.length || !cards.length) return;

  let currentIdx = 0;
  let isNarrating = false;
  let activeUtterance = null;

  function updateChapter(idx, playSound = true) {
    if (idx < 0 || idx >= cards.length) return;
    currentIdx = idx;

    // Stop current voice narration if active
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      isNarrating = false;
      narrateBtns.forEach(btn => {
        const icon = btn.querySelector('.narrate-icon');
        const label = btn.querySelector('.narrate-label');
        if (icon) icon.textContent = '🔊';
        if (label) label.textContent = 'Read Chapter to Me';
      });
    }

    tabs.forEach((tab, tIdx) => {
      if (tIdx === idx) {
        tab.classList.add('is-active', 'bg-berry', 'text-white');
        tab.classList.remove('border-berry/20');
      } else {
        tab.classList.remove('is-active', 'bg-berry', 'text-white');
        tab.classList.add('border-berry/20');
      }
    });

    cards.forEach((card, cIdx) => {
      if (cIdx === idx) {
        card.classList.remove('hidden');
        card.classList.add('block', 'animate-fadeIn');
      } else {
        card.classList.add('hidden');
        card.classList.remove('block', 'animate-fadeIn');
      }
    });

    if (progressIndicator) {
      progressIndicator.textContent = `Chapter ${idx + 1} of ${cards.length}`;
    }

    if (prevBtn) {
      prevBtn.disabled = idx === 0;
      prevBtn.style.opacity = idx === 0 ? '0.5' : '1';
    }

    if (nextBtn) {
      nextBtn.disabled = idx === cards.length - 1;
      nextBtn.style.opacity = idx === cards.length - 1 ? '0.5' : '1';
    }

    if (playSound && nurseryAudio) {
      nurseryAudio.playBell(587.33, null, 0.5); // D5 gentle bell
    }
  }

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      updateChapter(idx, true);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIdx > 0) updateChapter(currentIdx - 1, true);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIdx < cards.length - 1) updateChapter(currentIdx + 1, true);
    });
  }

  // Voice Narration handler using Web Speech API
  narrateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const chapterIdx = parseInt(btn.getAttribute('data-chapter-idx') || '0', 10);
      const card = document.getElementById(`story-chap-${chapterIdx}`);
      if (!card) return;

      const titleEl = card.querySelector('h3');
      const bodyEl = card.querySelector('.story-narrative-body');
      const whisperEl = card.querySelector('.story-narrative-body + div p') || card.querySelector('p.italic');

      const textToRead = `${titleEl ? titleEl.textContent : ''}. ${bodyEl ? bodyEl.textContent : ''}`;

      if (!('speechSynthesis' in window)) {
        alert("Speech synthesis is not supported in your browser, but Pip's stardust chimes are always ready!");
        return;
      }

      const icon = btn.querySelector('.narrate-icon');
      const label = btn.querySelector('.narrate-label');

      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        isNarrating = false;
        if (icon) icon.textContent = '🔊';
        if (label) label.textContent = 'Read Chapter to Me';
      } else {
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.82; // Calming, slow bedtime cadence
        utterance.pitch = 1.05; // Friendly and warm

        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Zira')));
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onstart = () => {
          isNarrating = true;
          if (icon) icon.textContent = '⏹️';
          if (label) label.textContent = 'Pause Reading';
          if (nurseryAudio) nurseryAudio.playChime('G5');
        };

        utterance.onend = () => {
          isNarrating = false;
          if (icon) icon.textContent = '🔊';
          if (label) label.textContent = 'Read Chapter to Me';
          if (nurseryAudio) nurseryAudio.playPipGiggle();
        };

        utterance.onerror = () => {
          isNarrating = false;
          if (icon) icon.textContent = '🔊';
          if (label) label.textContent = 'Read Chapter to Me';
        };

        window.speechSynthesis.speak(utterance);
      }
    });
  });

  // Initialize first chapter state
  updateChapter(0, false);
}
