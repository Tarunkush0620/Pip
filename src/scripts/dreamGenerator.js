import { nurseryAudio } from '../audio/soundEffects.js';

export function initDreamGenerator() {
  const container = document.getElementById('dream-weaver-container');
  if (!container) return;

  const ingredients = [
    { id: 'cloud', name: 'Cloud Fluff', emoji: '☁️', desc: 'Soft and bouncy' },
    { id: 'honey', name: 'Moonbeam Honey', emoji: '🍯', desc: 'Warm golden sweetness' },
    { id: 'lavender', name: 'Lavender Breeze', emoji: '🌸', desc: 'Calming bedtime aroma' },
    { id: 'kitten', name: 'Starlight Kitten', emoji: '🐱', desc: 'Gentle purring cadence' },
    { id: 'castle', name: 'Pillow Fort', emoji: '🏰', desc: '100% monster-proof walls' },
    { id: 'comet', name: 'Marshmallow Stars', emoji: '⭐', desc: 'Midnight chewable snacks' },
  ];

  let selected = new Set(['cloud', 'honey']);

  const dreamRecipes = {
    'cloud+honey': {
      title: 'The Golden Floating Marshmallow Cruise',
      vibe: 'Cozy & Velvety Smooth',
      story: 'You drift gently across amber night skies tucked under a warm comforter made of spun clouds, sipping honey milk from a star mug.',
      pipQuote: 'Pip added 3 extra pillows so you won\'t roll off while giggling!',
    },
    'cloud+lavender': {
      title: 'The Lavender Cloud Meadow',
      vibe: 'Deep Slumber & Peaceful Rest',
      story: 'Gentle purple mist rolls over hills of lilac clouds, whispering soothing lullabies until your eyelids feel sweetly heavy.',
      pipQuote: 'Pip tested this on Mr. Bear; he fell asleep in four seconds flat.',
    },
    'cloud+kitten': {
      title: 'The Starlight Purr Pavilion',
      vibe: 'Warm & Fluffy Snuggles',
      story: 'A circle of celestial glowing kittens curls up around your toes, purring in perfect harmony with the night breeze.',
      pipQuote: 'Kittens are the best dream insulators against chilly drafts!',
    },
    'castle+honey': {
      title: 'The Golden Pillow Citadel',
      vibe: 'Safe, Mighty & Invulnerable',
      story: 'Ten thousand plush cushions form an impregnable bedtime fortress. Guard owls patrol the rooftop dropping dream feathers.',
      pipQuote: 'No bad thoughts can penetrate cushion walls thicker than four duvets!',
    },
    'comet+star': {
      title: 'The Sugar Star Shower',
      vibe: 'Joyful & Sweet Midnight Wander',
      story: 'You ride a gentle paper moon through a sky raining soft marshmallow comets that dissolve into warm vanilla cocoa.',
      pipQuote: 'Always keep your mouth open when riding through a sweet cloud!',
    },
  };

  function renderIngredients() {
    const listEl = document.getElementById('ingredient-list');
    if (!listEl) return;

    listEl.innerHTML = '';
    ingredients.forEach((ing) => {
      const isSelected = selected.has(ing.id);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `p-3 rounded-2xl flex items-center gap-3 transition-all duration-300 text-left border ${
        isSelected
          ? 'btn-berry shadow-md scale-102 ring-2 ring-moon/50'
          : 'bg-white/80 hover:bg-white text-ink border-pink-200/60 hover:scale-101'
      }`;
      btn.innerHTML = `
        <span class="text-2xl">${ing.emoji}</span>
        <div>
          <div class="font-semibold text-sm ${isSelected ? 'text-white' : 'text-berry'}">${ing.name}</div>
          <div class="text-xs ${isSelected ? 'text-white/80' : 'opacity-75'}">${ing.desc}</div>
        </div>
      `;

      btn.onclick = () => {
        nurseryAudio.playChime('C5');
        if (selected.has(ing.id)) {
          if (selected.size > 1) selected.delete(ing.id);
        } else {
          if (selected.size >= 3) {
            const first = selected.values().next().value;
            selected.delete(first);
          }
          selected.add(ing.id);
        }
        renderIngredients();
        updateSelectedSummary();
      };

      listEl.appendChild(btn);
    });
  }

  function updateSelectedSummary() {
    const summaryEl = document.getElementById('weaver-selection-summary');
    if (!summaryEl) return;
    const names = Array.from(selected)
      .map((id) => ingredients.find((i) => i.id === id)?.name)
      .filter(Boolean)
      .join(' + ');
    summaryEl.textContent = `Selected: ${names} (${selected.size}/3 ingredients)`;
  }

  function weaveDream() {
    nurseryAudio.playChime('E5');
    const resultCard = document.getElementById('dream-result-card');
    const titleEl = document.getElementById('dream-result-title');
    const vibeEl = document.getElementById('dream-result-vibe');
    const storyEl = document.getElementById('dream-result-story');
    const quoteEl = document.getElementById('dream-result-quote');

    if (!resultCard) return;

    // Trigger glowing animation on orb
    const orb = document.getElementById('dream-orb');
    if (orb) {
      orb.classList.add('animate-pulse-glow', 'scale-110');
      setTimeout(() => orb.classList.remove('scale-110'), 600);
    }

    const key = Array.from(selected).sort().join('+');
    const fallback = {
      title: 'The Midnight Stardust Slumber Expedition',
      vibe: 'Enchanted & 100% Sweet Sleep',
      story: `Pip combines ${Array.from(selected).map(s => ingredients.find(i=>i.id===s)?.name).join(' and ')} into a shimmering nocturnal recipe that cradles you in dreamy warmth.`,
      pipQuote: 'Pip signed off on this recipe: certified 0% scary, 100% nap-approved!',
    };

    const recipe = dreamRecipes[key] || fallback;

    if (titleEl) titleEl.textContent = recipe.title;
    if (vibeEl) vibeEl.textContent = recipe.vibe;
    if (storyEl) storyEl.textContent = recipe.story;
    if (quoteEl) quoteEl.textContent = `“${recipe.pipQuote}” — Pip`;

    resultCard.classList.remove('hidden');
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  const weaveBtn = document.getElementById('weave-btn');
  if (weaveBtn) {
    weaveBtn.onclick = weaveDream;
  }

  renderIngredients();
  updateSelectedSummary();
}
