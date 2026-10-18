// Interactive Bedtime Storybook Controller & Cozy Reader Engine
// Features: 3D Paper-Turning Physics (CSS rotateY -180deg & dynamic parchment drop shadow),
// Real Web Speech API Bedtime Narration with word-by-word stardust highlighting,
// Story Search, Theme Filters (Animals, Bedtime, Friendship, Classics), and ❤️ LocalStorage Bookmarks.

import { storybooks } from '../data/storybookData.js';
import { nurseryAudio } from '../audio/soundEffects.js';

export function initStorybookController() {
  const container = document.getElementById('p5');
  if (!container) return;

  const FAV_STORAGE_KEY = 'pip_favorite_storybook_ids';

  let currentBookIndex = 0;
  let currentPageIndex = 0;
  let currentTheme = 'all';
  let searchQuery = '';
  let isPageFlipping = false;
  let isVoiceReading = false;
  let isLullabyReading = false;
  let readingTimer = null;
  let currentUtterance = null;

  // LocalStorage Favorites Initialization
  function getStoredFavorites() {
    try {
      const raw = localStorage.getItem(FAV_STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch (e) {
      return new Set();
    }
  }

  function saveStoredFavorites(favSet) {
    try {
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify([...favSet]));
    } catch (e) {}
  }

  let favorites = getStoredFavorites();

  // DOM Elements in Card 5
  const coverImg = document.getElementById('storybook-cover-img');
  const bookTitleEl = document.getElementById('storybook-title');
  const bookSubtitleEl = document.getElementById('storybook-subtitle');
  const bookAuthorEl = document.getElementById('storybook-author');
  const bookBadgeEl = document.getElementById('storybook-badge');
  const pageHeadingEl = document.getElementById('storybook-page-heading');
  const pageTextEl = document.getElementById('storybook-page-text');
  const pageWhisperEl = document.getElementById('storybook-page-whisper');
  const pageCounterEl = document.getElementById('storybook-page-counter');
  const progressFillEl = document.getElementById('storybook-progress-fill');
  const prevBtn = document.getElementById('storybook-prev-btn');
  const nextBtn = document.getElementById('storybook-next-btn');
  const voiceBtn = document.getElementById('storybook-voice-btn');
  const voiceLabel = document.getElementById('storybook-voice-label');
  const readAloudBtn = document.getElementById('storybook-read-btn');
  const favBtn = document.getElementById('storybook-fav-btn');
  const favHeartEl = document.getElementById('storybook-fav-heart');
  const favLabelEl = document.getElementById('storybook-fav-label');
  const favCountEl = document.getElementById('fav-count');
  const searchInput = document.getElementById('storybook-search-input');
  const openModalBtn = document.getElementById('storybook-open-modal-btn');
  const selectorTabsContainer = document.getElementById('storybook-tabs');
  const categoryFiltersContainer = document.getElementById('storybook-category-filters');
  const dropdownSelect = document.getElementById('storybook-select-dropdown');
  const pageSheet = document.getElementById('storybook-page-sheet');

  // Modal DOM Elements
  const modal = document.getElementById('storybook-nook-modal');
  const modalCloseBtn = document.getElementById('storybook-modal-close');
  const modalImg = document.getElementById('modal-story-img');
  const modalTitleEl = document.getElementById('modal-story-title');
  const modalAuthorEl = document.getElementById('modal-story-author');
  const modalPageHeadingEl = document.getElementById('modal-page-heading');
  const modalPageTextEl = document.getElementById('modal-page-text');
  const modalPageWhisperEl = document.getElementById('modal-page-whisper');
  const modalPageCounterEl = document.getElementById('modal-page-counter');
  const modalPrevBtn = document.getElementById('modal-prev-btn');
  const modalNextBtn = document.getElementById('modal-next-btn');
  const modalVoiceBtn = document.getElementById('modal-voice-btn');
  const modalLullabyBtn = document.getElementById('modal-lullaby-btn');
  const modalDropdownSelect = document.getElementById('modal-storybook-select');
  const modalPageSheet = document.getElementById('modal-page-sheet');

  // Friendly Book Icons
  function getBookIcon(book) {
    const id = book.id;
    if (id === 'pip-sleepy-star') return '🌟';
    if (id === 'moms-hands') return '🤟';
    if (id === 'owl-stopped-pretending') return '🦉';
    if (id === 'polar-bear-dream') return '🐻‍❄️';
    if (id === 'banzi-busy-bees') return '🐝';
    if (id === 'bedtime-for-dog') return '🐶';
    if (id === 'i-love-sunshine') return '☀️';
    if (id === 'jock-and-me') return '🐕';
    if (id === 'elvis-big-adventure') return '🐛';
    if (id === 'school-by-myself') return '🎒';
    if (id === 'amahle-wants-to-help') return '🌸';
    if (id === 'oliver-sleepy-cloud') return '☁️';
    if (id === 'barnaby-little-bear') return '🐻';
    if (id === 'the-star-talers') return '✨';
    return '📖';
  }

  function getBook() {
    return storybooks[currentBookIndex] || storybooks[0];
  }

  function getPage() {
    const book = getBook();
    return book.pages[currentPageIndex] || book.pages[0];
  }

  // Filter books by theme & search query
  function getFilteredBooks() {
    let list = storybooks.map((b, idx) => ({ ...b, originalIndex: idx }));

    // Theme filter
    if (currentTheme === 'bedtime') {
      list = list.filter((b) =>
        b.themes?.some((t) => t.toLowerCase() === 'bedtime') ||
        b.category?.toLowerCase().includes('bedtime')
      );
    } else if (currentTheme === 'animals') {
      list = list.filter((b) =>
        b.themes?.some((t) => t.toLowerCase() === 'animals')
      );
    } else if (currentTheme === 'friendship') {
      list = list.filter((b) =>
        b.themes?.some((t) => t.toLowerCase() === 'friendship')
      );
    } else if (currentTheme === 'classics') {
      list = list.filter((b) =>
        b.themes?.some((t) => t.toLowerCase() === 'classics' || t.toLowerCase() === 'pip original') ||
        b.category?.toLowerCase().includes('classic') ||
        b.category?.toLowerCase().includes('pip')
      );
    } else if (currentTheme === 'favorites') {
      list = list.filter((b) => favorites.has(b.id));
    }

    // Live search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((b) => {
        const matchTitle = b.title.toLowerCase().includes(q);
        const matchSub = b.subtitle.toLowerCase().includes(q);
        const matchAuthor = b.author.toLowerCase().includes(q);
        const matchDesc = b.description.toLowerCase().includes(q);
        const matchCat = b.category.toLowerCase().includes(q);
        const matchTheme = b.themes?.some((t) => t.toLowerCase().includes(q));
        return matchTitle || matchSub || matchAuthor || matchDesc || matchCat || matchTheme;
      });
    }

    return list;
  }

  // Populate Dropdown Jump Menu
  function populateDropdowns() {
    const filtered = getFilteredBooks();
    const listToUse = filtered.length > 0 ? filtered : storybooks.map((b, idx) => ({ ...b, originalIndex: idx }));

    const optionsHtml = listToUse
      .map((book) => {
        const icon = getBookIcon(book);
        const isFav = favorites.has(book.id);
        const shortTitle = book.title.length > 26 ? book.title.slice(0, 24) + '...' : book.title;
        return `<option value="${book.originalIndex}">${icon} ${shortTitle}${isFav ? ' ❤️' : ''}</option>`;
      })
      .join('');

    if (dropdownSelect) {
      dropdownSelect.innerHTML = optionsHtml;
      dropdownSelect.value = String(currentBookIndex);
    }
    if (modalDropdownSelect) {
      modalDropdownSelect.innerHTML = optionsHtml;
      modalDropdownSelect.value = String(currentBookIndex);
    }
  }

  // Update Favorite Bookmarking UI
  function updateFavoritesUI() {
    const book = getBook();
    const isFav = favorites.has(book.id);

    if (favCountEl) {
      favCountEl.textContent = favorites.size;
    }
    if (favHeartEl) {
      favHeartEl.textContent = isFav ? '💖' : '🤍';
    }
    if (favLabelEl) {
      favLabelEl.textContent = isFav ? 'Favorited' : 'Favorite';
    }
    if (favBtn) {
      if (isFav) {
        favBtn.classList.add('bg-rose-500/30', 'text-rose-200', 'border-rose-400/40');
        favBtn.classList.remove('bg-white/15', 'text-cream');
      } else {
        favBtn.classList.remove('bg-rose-500/30', 'text-rose-200', 'border-rose-400/40');
        favBtn.classList.add('bg-white/15', 'text-cream');
      }
    }
  }

  function toggleFavorite() {
    const book = getBook();
    if (favorites.has(book.id)) {
      favorites.delete(book.id);
    } else {
      favorites.add(book.id);
      nurseryAudio.playChime('G5');
    }
    saveStoredFavorites(favorites);

    if (favBtn) {
      favBtn.classList.remove('heart-pop');
      void favBtn.offsetWidth;
      favBtn.classList.add('heart-pop');
    }

    updateFavoritesUI();
    renderChips();
    populateDropdowns();
  }

  // Render Horizontal Story Chips
  function renderChips() {
    if (!selectorTabsContainer) return;
    const filtered = getFilteredBooks();

    if (filtered.length === 0) {
      if (currentTheme === 'favorites') {
        selectorTabsContainer.innerHTML = `
          <div class="px-3.5 py-1.5 rounded-full text-xs text-rose-300 bg-rose-950/40 border border-rose-800/50 flex items-center gap-1.5 whitespace-nowrap">
            <span>💖</span> <span>No favorites bookmarked yet! Tap 🤍 to save your favorite bedtime stories.</span>
          </div>
        `;
      } else {
        selectorTabsContainer.innerHTML = `
          <div class="px-3.5 py-1.5 rounded-full text-xs text-cream/70 bg-white/10 border border-white/10 flex items-center gap-1.5 whitespace-nowrap">
            <span>🔍</span> <span>No stories matching "${searchQuery}". Tap "All (14)" to see everything.</span>
          </div>
        `;
      }
      return;
    }

    selectorTabsContainer.innerHTML = filtered
      .map((item) => {
        const isActive = item.originalIndex === currentBookIndex;
        const isFav = favorites.has(item.id);
        const activeClasses = isActive
          ? 'bg-berry text-white border-berry shadow-sm scale-105'
          : 'bg-white/80 dark:bg-white/10 text-ink dark:text-cream border-berry/20 hover:border-berry/60';
        const icon = getBookIcon(item);
        const shortTitle = item.title.length > 18 ? item.title.slice(0, 16) + '...' : item.title;
        return `
          <button
            type="button"
            data-book-idx="${item.originalIndex}"
            class="storybook-tab-chip px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${activeClasses}"
            title="${item.title}"
          >
            <span>${icon}</span>
            <span>${shortTitle}</span>
            ${isFav ? '<span class="text-[10px]">❤️</span>' : ''}
          </button>
        `;
      })
      .join('');

    // Re-bind click events
    selectorTabsContainer.querySelectorAll('[data-book-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.bookIdx, 10);
        selectBook(idx);
      });
    });

    // Scroll active chip into view smoothly
    const activeChip = selectorTabsContainer.querySelector(`[data-book-idx="${currentBookIndex}"]`);
    if (activeChip) {
      activeChip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  // Pre-wrap text into individual span words with character offsets for zero-latency speech boundary sync
  function renderTextWithWordSpans(text) {
    if (!text) return '';
    const sentences = text.match(/[^.!?]+[.!?]+(\s+|$)|[^.!?]+$/g) || [text];
    let html = '';
    let globalCharOffset = 0;

    sentences.forEach((sentence, sIdx) => {
      html += `<span class="story-sentence" data-sentence-idx="${sIdx}">`;
      const wordRegex = /\S+/g;
      let wMatch;
      let sLastIndex = 0;

      while ((wMatch = wordRegex.exec(sentence)) !== null) {
        const leadingSpace = sentence.slice(sLastIndex, wMatch.index);
        if (leadingSpace) html += leadingSpace;

        const start = globalCharOffset + wMatch.index;
        const end = start + wMatch[0].length;
        html += `<span class="narrate-word" data-start="${start}" data-end="${end}" data-sentence-idx="${sIdx}">${wMatch[0]}</span>`;
        sLastIndex = wordRegex.lastIndex;
      }

      const trailingSpace = sentence.slice(sLastIndex);
      if (trailingSpace) html += trailingSpace;
      html += `</span>`;
      globalCharOffset += sentence.length;
    });

    return html;
  }

  // Highlight word & sentence actively read by SpeechSynthesis
  function highlightNarrateWord(charIdx) {
    const spans = document.querySelectorAll('.narrate-word');
    let targetSentenceIdx = null;

    spans.forEach((span) => {
      const start = parseInt(span.dataset.start, 10);
      const end = parseInt(span.dataset.end, 10);

      if (charIdx >= start && charIdx <= end + 1) {
        span.classList.add('story-word-reading');
        targetSentenceIdx = span.dataset.sentenceIdx;
      } else {
        span.classList.remove('story-word-reading');
      }
    });

    if (targetSentenceIdx !== null) {
      document.querySelectorAll('.story-sentence').forEach((sSpan) => {
        if (sSpan.dataset.sentenceIdx === targetSentenceIdx) {
          sSpan.classList.add('story-sentence-reading');
        } else {
          sSpan.classList.remove('story-sentence-reading');
        }
      });
    }
  }

  function clearNarrationHighlights() {
    document.querySelectorAll('.story-word-reading').forEach((el) => el.classList.remove('story-word-reading'));
    document.querySelectorAll('.story-sentence-reading').forEach((el) => el.classList.remove('story-sentence-reading'));
  }

  // Gentle Bedtime Speech Voice Selector
  function getBedtimeVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // Prefer soothing English voices
    const preferredNames = [
      'samantha', 'victoria', 'karen', 'serena', 'moira', 'fiona',
      'natural', 'female', 'google uk english female', 'hazel', 'zira'
    ];

    for (const name of preferredNames) {
      const found = voices.find(
        (v) => v.lang.startsWith('en') && v.name.toLowerCase().includes(name)
      );
      if (found) return found;
    }

    const enVoice = voices.find((v) => v.lang.startsWith('en'));
    return enVoice || voices[0];
  }

  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      getBedtimeVoice();
    };
  }

  // Update Voice Button States
  function updateVoiceButtonsState(active) {
    if (active) {
      if (voiceBtn) {
        voiceBtn.classList.add('bg-berry', 'text-white', 'ring-2', 'ring-berry/40');
        voiceBtn.classList.remove('bg-lav/30', 'text-berry');
      }
      if (voiceLabel) voiceLabel.textContent = 'Stop Reading';
      if (modalVoiceBtn) {
        modalVoiceBtn.classList.add('bg-berry', 'text-white');
        modalVoiceBtn.innerHTML = '<span>⏹️</span> <span>Stop Voice</span>';
      }
    } else {
      if (voiceBtn) {
        voiceBtn.classList.remove('bg-berry', 'text-white', 'ring-2', 'ring-berry/40');
        voiceBtn.classList.add('bg-lav/30', 'text-berry');
      }
      if (voiceLabel) voiceLabel.textContent = 'Voice Read';
      if (modalVoiceBtn) {
        modalVoiceBtn.classList.remove('bg-berry', 'text-white');
        modalVoiceBtn.innerHTML = '<span>🎙️</span> <span>Voice Read</span>';
      }
    }
  }

  function stopVoiceRead() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    isVoiceReading = false;
    currentUtterance = null;
    clearNarrationHighlights();
    updateVoiceButtonsState(false);
  }

  function startVoiceRead() {
    if (!('speechSynthesis' in window)) {
      alert('The Web Speech API is not supported in this browser.');
      return;
    }

    stopVoiceRead();
    const book = getBook();
    const page = getPage();

    const utterance = new SpeechSynthesisUtterance(page.text);
    const voice = getBedtimeVoice();
    if (voice) utterance.voice = voice;
    utterance.rate = 0.88; // Calm bedtime tempo
    utterance.pitch = 0.95; // Gentle, warm tone

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        highlightNarrateWord(event.charIndex);
      }
    };

    utterance.onend = () => {
      clearNarrationHighlights();
      // Auto-advance to next page if not on the last page
      if (currentPageIndex < book.pages.length - 1) {
        setTimeout(() => {
          if (isVoiceReading) {
            changePage(1);
          }
        }, 1100);
      } else {
        isVoiceReading = false;
        updateVoiceButtonsState(false);
        nurseryAudio.playChime('C6');
      }
    };

    utterance.onerror = () => {
      stopVoiceRead();
    };

    isVoiceReading = true;
    currentUtterance = utterance;
    updateVoiceButtonsState(true);
    window.speechSynthesis.speak(utterance);
  }

  function toggleVoiceRead() {
    if (isVoiceReading) {
      stopVoiceRead();
    } else {
      startVoiceRead();
    }
  }

  // Render Page Content Only (used at the 300ms midpoint of the 3D leaf rotation)
  function renderPageContentOnly() {
    const book = getBook();
    const page = getPage();
    const totalPages = book.pages.length;

    if (pageHeadingEl) pageHeadingEl.textContent = page.heading;
    if (pageTextEl) {
      pageTextEl.innerHTML = renderTextWithWordSpans(page.text);
    }
    if (pageWhisperEl) {
      pageWhisperEl.innerHTML = `<span class="text-berry">✦</span> ${page.whisper}`;
    }
    if (pageCounterEl) {
      pageCounterEl.textContent = `Page ${page.pageNumber} of ${totalPages}`;
    }
    if (progressFillEl) {
      const pct = (page.pageNumber / totalPages) * 100;
      progressFillEl.style.width = `${pct}%`;
    }

    if (prevBtn) prevBtn.disabled = currentPageIndex === 0;
    if (nextBtn) {
      if (currentPageIndex === totalPages - 1) {
        nextBtn.innerHTML = '<span>🌙</span> <span>Sleep Tight (Finished)</span>';
      } else {
        nextBtn.innerHTML = '<span>Next Page</span> <span>→</span>';
      }
    }

    syncModal();
  }

  // Full Page Render
  function renderCurrentPage() {
    const book = getBook();
    const page = getPage();

    // Update Cover Image with gentle crossfade
    if (coverImg) {
      const targetSrc = book.coverImage;
      if (!coverImg.src.endsWith(targetSrc)) {
        coverImg.style.opacity = '0.35';
        coverImg.style.transform = 'scale(0.97)';
        setTimeout(() => {
          coverImg.src = targetSrc;
          coverImg.alt = `${book.title} page ${page.pageNumber}`;
          coverImg.style.opacity = '1';
          coverImg.style.transform = 'scale(1)';
        }, 160);
      }
    }

    // Book Header Details
    if (bookTitleEl) bookTitleEl.textContent = book.title;
    if (bookSubtitleEl) bookSubtitleEl.textContent = book.subtitle;
    if (bookAuthorEl) bookAuthorEl.textContent = book.author;
    if (bookBadgeEl) {
      bookBadgeEl.textContent = book.badge;
      bookBadgeEl.style.backgroundColor = `${book.themeColor}33`;
      bookBadgeEl.style.color = '#7A2048';
    }

    renderPageContentOnly();
    updateFavoritesUI();
    populateDropdowns();
    renderChips();
  }

  // Modal Synchronization
  function syncModal() {
    if (!modal || modal.classList.contains('hidden')) return;
    const book = getBook();
    const page = getPage();
    const totalPages = book.pages.length;

    if (modalImg) modalImg.src = book.coverImage;
    if (modalTitleEl) modalTitleEl.textContent = book.title;
    if (modalAuthorEl) modalAuthorEl.textContent = book.author;
    if (modalPageHeadingEl) modalPageHeadingEl.textContent = page.heading;
    if (modalPageTextEl) {
      modalPageTextEl.innerHTML = renderTextWithWordSpans(page.text);
    }
    if (modalPageWhisperEl) modalPageWhisperEl.textContent = page.whisper;
    if (modalPageCounterEl) modalPageCounterEl.textContent = `Page ${page.pageNumber} of ${totalPages}`;

    if (modalPrevBtn) modalPrevBtn.disabled = currentPageIndex === 0;
    if (modalNextBtn) {
      modalNextBtn.textContent = currentPageIndex === totalPages - 1 ? 'Finish & Sleep 🌙' : 'Next Page →';
    }

    if (modalDropdownSelect && modalDropdownSelect.value !== String(currentBookIndex)) {
      modalDropdownSelect.value = String(currentBookIndex);
    }
  }

  // 3D Realistic Page Curl Turning (CSS 3D rotateY(-180deg) around left spine with parchment shadow)
  function changePage(delta) {
    if (isPageFlipping) return;
    const book = getBook();
    const totalPages = book.pages.length;
    const newIdx = currentPageIndex + delta;

    if (newIdx < 0 || newIdx >= totalPages) {
      if (newIdx >= totalPages) {
        // Looped past end, reset to page 1
        currentPageIndex = 0;
        nurseryAudio.playChime('G5');
        renderCurrentPage();
      }
      return;
    }

    isPageFlipping = true;
    const wasVoiceReading = isVoiceReading;
    if (isVoiceReading) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      clearNarrationHighlights();
    }

    const animClass = delta > 0 ? 'turn-page-forward' : 'turn-page-backward';

    if (pageSheet) {
      pageSheet.classList.remove('turn-page-forward', 'turn-page-backward');
      void pageSheet.offsetWidth;
      pageSheet.classList.add(animClass);
    }
    if (modalPageSheet) {
      modalPageSheet.classList.remove('turn-page-forward', 'turn-page-backward');
      void modalPageSheet.offsetWidth;
      modalPageSheet.classList.add(animClass);
    }

    nurseryAudio.playChime(delta > 0 ? 'E5' : 'C5');

    // At 300ms midpoint (when page is turned 90deg edge-on), swap page text & heading
    setTimeout(() => {
      currentPageIndex = newIdx;
      renderPageContentOnly();
    }, 300);

    // At 650ms, the paper finishes rotating flat to rest
    setTimeout(() => {
      if (pageSheet) pageSheet.classList.remove(animClass);
      if (modalPageSheet) modalPageSheet.classList.remove(animClass);
      isPageFlipping = false;

      // Resume voice reading if it was active
      if (wasVoiceReading) {
        startVoiceRead();
      }
    }, 650);
  }

  function selectBook(idx) {
    if (idx < 0 || idx >= storybooks.length) return;
    stopVoiceRead();
    currentBookIndex = idx;
    currentPageIndex = 0;
    nurseryAudio.playChime('C5');
    renderCurrentPage();
  }

  // Lullaby Chime Reading Mode
  function toggleLullabyRead() {
    isLullabyReading = !isLullabyReading;

    if (isLullabyReading) {
      if (readAloudBtn) {
        readAloudBtn.classList.add('bg-berry', 'text-white');
        readAloudBtn.innerHTML = '<span>🎶</span> <span>Lullaby Reading On...</span>';
      }
      if (modalLullabyBtn) {
        modalLullabyBtn.innerHTML = '<span>⏸️</span> <span>Stop Lullaby</span>';
      }
      if (pageTextEl) pageTextEl.classList.add('story-glow-active');
      if (modalPageTextEl) modalPageTextEl.classList.add('story-glow-active');

      const melody = ['C5', 'E5', 'G5', 'B5', 'C6'];
      let noteIndex = 0;
      clearInterval(readingTimer);
      readingTimer = setInterval(() => {
        if (!isLullabyReading) {
          clearInterval(readingTimer);
          return;
        }
        nurseryAudio.playChime(melody[noteIndex % melody.length]);
        noteIndex++;
      }, 750);

      setTimeout(() => {
        if (isLullabyReading) {
          changePage(1);
        }
      }, 8500);
    } else {
      clearInterval(readingTimer);
      if (readAloudBtn) {
        readAloudBtn.classList.remove('bg-berry', 'text-white');
        readAloudBtn.innerHTML = '<span>🎵</span> <span>Lullaby Chimes</span>';
      }
      if (modalLullabyBtn) {
        modalLullabyBtn.innerHTML = '<span>🎵</span> <span>Lullaby</span>';
      }
      if (pageTextEl) pageTextEl.classList.remove('story-glow-active');
      if (modalPageTextEl) modalPageTextEl.classList.remove('story-glow-active');
    }
  }

  function openModal() {
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    nurseryAudio.playChime('C5');
    syncModal();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  // Bind Card 5 Page Turn & Audio Controls
  if (prevBtn) prevBtn.addEventListener('click', () => changePage(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => changePage(1));
  if (voiceBtn) voiceBtn.addEventListener('click', toggleVoiceRead);
  if (readAloudBtn) readAloudBtn.addEventListener('click', toggleLullabyRead);
  if (favBtn) favBtn.addEventListener('click', toggleFavorite);
  if (openModalBtn) openModalBtn.addEventListener('click', openModal);

  if (coverImg) {
    coverImg.style.cursor = 'pointer';
    coverImg.addEventListener('click', openModal);
  }

  // Bind Dropdown Selectors
  if (dropdownSelect) {
    dropdownSelect.addEventListener('change', (e) => {
      selectBook(parseInt(e.target.value, 10));
    });
  }
  if (modalDropdownSelect) {
    modalDropdownSelect.addEventListener('change', (e) => {
      selectBook(parseInt(e.target.value, 10));
    });
  }

  // Search Input Listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      const filtered = getFilteredBooks();
      renderChips();
      populateDropdowns();
      if (filtered.length > 0 && !filtered.some((b) => b.originalIndex === currentBookIndex)) {
        selectBook(filtered[0].originalIndex);
      }
    });
  }

  // Theme Pill Filter Buttons
  if (categoryFiltersContainer) {
    categoryFiltersContainer.querySelectorAll('[data-cat]').forEach((btn) => {
      btn.addEventListener('click', () => {
        categoryFiltersContainer.querySelectorAll('[data-cat]').forEach((b) => {
          b.classList.remove('bg-berry', 'text-white', 'border-berry', 'is-active');
          b.classList.add('bg-white/80', 'dark:bg-white/10', 'text-ink', 'dark:text-cream', 'border-berry/20');
        });
        btn.classList.add('bg-berry', 'text-white', 'border-berry', 'is-active');
        btn.classList.remove('bg-white/80', 'dark:bg-white/10', 'text-ink', 'dark:text-cream', 'border-berry/20');

        currentTheme = btn.dataset.cat;
        const filtered = getFilteredBooks();
        renderChips();
        populateDropdowns();

        if (filtered.length > 0 && !filtered.some((b) => b.originalIndex === currentBookIndex)) {
          selectBook(filtered[0].originalIndex);
        }
      });
    });
  }

  // Modal Controls
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalPrevBtn) modalPrevBtn.addEventListener('click', () => changePage(-1));
  if (modalNextBtn) modalNextBtn.addEventListener('click', () => changePage(1));
  if (modalVoiceBtn) modalVoiceBtn.addEventListener('click', toggleVoiceRead);
  if (modalLullabyBtn) modalLullabyBtn.addEventListener('click', toggleLullabyRead);

  // Close modal on outside click or Escape
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Initialization
  updateFavoritesUI();
  populateDropdowns();
  renderCurrentPage();
}
