export function renderMarquee() {
  const text = 'Dream engineer ★ Lullabies ★ Nightlights ★ Bedtime stories ★ Spun Clouds ★ Ghostlet Comforting ★ Star Dust Weaving ★ ';
  const repeated = text.repeat(4);

  return `
    <div class="marquee-wrapper relative overflow-hidden bg-berry text-cream py-4 -rotate-1 shadow-lg z-20 my-6 select-none border-y-2 border-moon/40">
      <div class="animate-marquee-scroll">
        <span class="font-display font-semibold text-xl sm:text-2xl md:text-3xl tracking-wide px-4">${repeated}</span>
        <span class="font-display font-semibold text-xl sm:text-2xl md:text-3xl tracking-wide px-4" aria-hidden="true">${repeated}</span>
      </div>
    </div>
  `;
}
