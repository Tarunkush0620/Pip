import { nurseryAudio } from '../audio/soundEffects.js';

export function initBlocksGame() {
  const stack = document.getElementById('stack');
  const addBtn = document.getElementById('add');
  const tumbleBtn = document.getElementById('block-tumble-btn');
  const countDisplay = document.getElementById('block-counter');
  const trophyEl = document.getElementById('block-trophy');
  const stabilityEl = document.getElementById('block-stability-readout');

  if (!stack || !addBtn) return;

  const cols = [
    { bg: 'linear-gradient(135deg, #A23A62 0%, #7E2849 100%)', text: '#FFFFFF', border: '#D97398' }, // Berry
    { bg: 'linear-gradient(135deg, #CDB8E3 0%, #A990C5 100%)', text: '#3E1C55', border: '#E7DCF5' }, // Lavender
    { bg: 'linear-gradient(135deg, #FAD77B 0%, #E6BA45 100%)', text: '#5D4100', border: '#FFF1BA' }, // Gold
    { bg: 'linear-gradient(135deg, #FFB3C6 0%, #E8839C 100%)', text: '#5B1E30', border: '#FFE0E8' }, // Rose
    { bg: 'linear-gradient(135deg, #99E2D8 0%, #68C1B5 100%)', text: '#154B43', border: '#D4F7F2' }, // Mint
    { bg: 'linear-gradient(135deg, #8E6AA8 0%, #6A4486 100%)', text: '#FFFFFF', border: '#BFA0D6' }, // Plum
  ];

  const letters = ['P', 'I', 'P', 'D', 'R', 'E', 'A', 'M'];
  const symbols = ['🧸', '⭐', '🌙', '☁️', '🍼', '✨', '🦄', '🎵'];
  let counter = 0;

  function updateStatus() {
    const count = stack.children.length;
    if (countDisplay) {
      countDisplay.textContent = `${count} / 8 blocks`;
    }

    if (trophyEl) {
      if (count >= 8) {
        trophyEl.classList.remove('opacity-0');
        trophyEl.classList.add('opacity-100');
      } else {
        trophyEl.classList.add('opacity-0');
        trophyEl.classList.remove('opacity-100');
      }
    }

    if (stabilityEl) {
      if (count === 8) {
        stabilityEl.textContent = 'Stability: 100% Masterpiece! ⭐';
        stabilityEl.style.color = '#A23A62';
      } else if (count >= 6) {
        stabilityEl.textContent = 'Stability: 85% Wobble-Fun! 🎈';
        stabilityEl.style.color = '#D97706';
      } else if (count >= 3) {
        stabilityEl.textContent = 'Stability: 96% Snug & Solid';
        stabilityEl.style.color = '#059669';
      } else {
        stabilityEl.textContent = 'Stability: 100% Solid Base';
        stabilityEl.style.color = '#059669';
      }
    }
  }

  function addBlock() {
    if (stack.children.length >= 8) {
      // Shake warning if full
      stack.classList.add('animate-shake');
      setTimeout(() => stack.classList.remove('animate-shake'), 400);
      return;
    }

    const col = cols[counter % cols.length];
    const letter = letters[counter % letters.length];
    const symbol = symbols[counter % symbols.length];

    const block = document.createElement('div');
    block.className = 'wooden-toy-block block-fall flex items-center justify-between px-3.5 select-none font-bold text-base shadow-md transition-all';
    block.style.width = 'min(200px, 80%)';
    block.style.height = '38px';
    block.style.background = col.bg;
    block.style.color = col.text;
    block.style.borderColor = col.border;
    block.style.transform = `translateX(${(Math.random() - 0.5) * 14}px) rotate(${(Math.random() - 0.5) * 4}deg)`;
    block.title = 'Click to pop this block with confetti!';

    block.innerHTML = `
      <span class="text-xs opacity-75">${symbol}</span>
      <span class="font-display tracking-widest text-lg font-extrabold uppercase">${letter}</span>
      <span class="text-xs opacity-75">${symbol}</span>
    `;

    // Drop sound
    nurseryAudio.playBlockDrop(stack.children.length);

    // Pop on click
    block.onclick = (e) => {
      e.stopPropagation();
      nurseryAudio.playBlockPop();
      spawnConfetti(block);
      block.style.transform = 'scale(1.25) rotate(12deg)';
      block.style.opacity = '0';
      setTimeout(() => {
        block.remove();
        updateStatus();
      }, 150);
    };

    stack.appendChild(block);
    counter++;
    updateStatus();

    // If 8th block reached, trigger celebratory chime
    if (stack.children.length === 8) {
      setTimeout(() => {
        nurseryAudio.playChime('C6');
      }, 250);
    }
  }

  function tumbleTower() {
    if (stack.children.length === 0) {
      addBlock();
      addBlock();
      addBlock();
      return;
    }

    nurseryAudio.playBlockPop();
    const children = Array.from(stack.children);
    children.forEach((child, idx) => {
      setTimeout(() => {
        spawnConfetti(child);
        const dir = (idx % 2 === 0 ? 1 : -1);
        child.style.transform = `translate(${dir * (60 + idx * 25)}px, 40px) rotate(${dir * (35 + idx * 10)}deg) scale(0.6)`;
        child.style.opacity = '0';
        setTimeout(() => child.remove(), 250);
      }, idx * 45);
    });

    setTimeout(() => {
      updateStatus();
      // Re-populate initial 3 blocks
      setTimeout(() => {
        addBlock();
        addBlock();
        addBlock();
      }, 350);
    }, children.length * 45 + 300);
  }

  function spawnConfetti(parent) {
    const rect = parent.getBoundingClientRect();
    for (let i = 0; i < 9; i++) {
      const p = document.createElement('div');
      p.className = 'fixed pointer-events-none rounded-full z-50';
      p.style.width = `${5 + Math.random() * 6}px`;
      p.style.height = `${5 + Math.random() * 6}px`;
      p.style.left = `${rect.left + rect.width / 2}px`;
      p.style.top = `${rect.top + rect.height / 2}px`;
      p.style.backgroundColor = cols[Math.floor(Math.random() * cols.length)].border;
      p.style.transition = 'all 0.55s cubic-bezier(0.2, 0.9, 0.3, 1)';
      document.body.appendChild(p);

      const angle = (i / 9) * Math.PI * 2;
      const dist = 35 + Math.random() * 45;
      requestAnimationFrame(() => {
        p.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
        p.style.opacity = '0';
      });

      setTimeout(() => p.remove(), 550);
    }
  }

  addBtn.onclick = () => addBlock();
  if (tumbleBtn) tumbleBtn.onclick = () => tumbleTower();

  // Initial 3 blocks
  addBlock();
  addBlock();
  addBlock();
}
