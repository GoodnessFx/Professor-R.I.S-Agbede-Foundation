/**
 * Hero section — displays the full foundation banner image without cropping.
 * Plain markup only (no state, no external constants): guaranteed to render
 * even if any other module fails.
 */

export function HeroSlider() {
  return (
    <section
      aria-label="Foundation banner"
      className="relative w-full overflow-hidden bg-[#0b1117] pt-24 sm:pt-28 md:pt-32 lg:pt-36"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-10 xl:px-12 pb-6 sm:pb-8 lg:pb-10">
        <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] bg-[#0b1117]">
          <img
            src="/images/hero-section-image.jpeg"
            alt="Professor R.I.S Agbede Foundation banner"
            loading="eager"
            decoding="async"
            draggable={false}
            className="block h-auto w-full object-contain object-center select-none"
          />
        </div>
      </div>
    </section>
  );
}
