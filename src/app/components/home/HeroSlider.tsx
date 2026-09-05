/**
 * Hero section with a single static foundation image
 */

import { HERO_SLIDES } from '../../../lib/constants';

export function HeroSlider() {
  const heroImage = HERO_SLIDES[0]?.image ?? '/images/hero-section-image.jpeg';

  return (
    <div className="relative w-full overflow-hidden bg-[#111820] min-h-[52svh] sm:min-h-[60svh] md:min-h-[72svh] lg:min-h-[90svh] pt-28 sm:pt-32 md:pt-32 lg:pt-36">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.7) contrast(1.05)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-black/35" />

      <div className="relative z-10 mx-auto flex min-h-[52svh] w-full max-w-7xl items-end justify-between gap-8 px-4 pb-10 pt-6 sm:px-6 lg:px-10 lg:pb-12 xl:px-12">
        <div className="max-w-3xl text-white">
          <h1 className="text-[clamp(2.6rem,5vw,8rem)] font-black leading-[0.8] tracking-[-0.06em] text-white/95 uppercase">
            Professor R.I.S Agbede
            <span className="mt-2 block text-[clamp(2.9rem,6vw,8.5rem)] font-black leading-[0.75] tracking-[-0.06em] text-white">FOUNDATION</span>
          </h1>

          <div className="mt-8 max-w-xl space-y-3 text-[clamp(1.05rem,1.8vw,2rem)] font-light text-white/95">
            <p className="text-[clamp(1.6rem,3vw,3rem)] font-medium leading-tight">Object or Purpose</p>
            <ul className="space-y-3 text-[clamp(1.05rem,1.6vw,2rem)] font-light leading-relaxed">
              <li>• Medical Research</li>
              <li>• To assist underserved individuals with end-stage kidney disease in obtaining kidney replacement therapy.</li>
              <li>• To fund a prize recognizing excellence in research and study within the field of parasitology.</li>
            </ul>
          </div>
        </div>

        <div className="hidden md:flex h-[min(68vh,700px)] w-[min(36vw,520px)] items-end justify-center overflow-hidden">
          <img
            src={heroImage}
            alt="Professor R.I.S Agbede"
            className="h-full w-full object-cover object-center"
            style={{ objectPosition: 'center top' }}
          />
        </div>
      </div>
    </div>
  );
}
