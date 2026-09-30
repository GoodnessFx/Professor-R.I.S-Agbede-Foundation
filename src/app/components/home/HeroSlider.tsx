/**
 * Hero section — displays the full foundation banner image without cropping.
 * Uses a real <img> with object-contain so text in the artwork is never cut off.
 */

import { useState } from 'react';
import { HERO_SLIDES } from '../../../lib/constants';

export function HeroSlider() {
  const heroImage = HERO_SLIDES[0]?.image ?? '/images/hero-section-image.jpeg';
  const heroAlt =
    HERO_SLIDES[0]?.alt ?? 'Professor R.I.S Agbede Foundation banner';
  const [failed, setFailed] = useState(false);
  const src = failed ? '/images/professor-agbede-portrait.jpeg' : heroImage;

  return (
    <section
      aria-label="Foundation banner"
      className="relative w-full overflow-hidden bg-[#0b1117] pt-24 sm:pt-28 md:pt-32 lg:pt-36"
    >
      {/* Soft backdrop glow so letterbox bars blend with the artwork */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_65%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-10 xl:px-12 pb-6 sm:pb-8 lg:pb-10">
        <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] bg-[#0b1117]">
          <img
            src={src}
            alt={heroAlt}
            loading="eager"
            decoding="async"
            draggable={false}
            onError={() => setFailed(true)}
            className="block h-auto w-full max-h-[78svh] sm:max-h-[80svh] lg:max-h-[86svh] object-contain object-center select-none"
          />
          {/* Very light legibility veil — does not hide artwork text */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
