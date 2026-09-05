/**
 * Hero section with a single static foundation image
 */

import { HERO_SLIDES } from '../../../lib/constants';

export function HeroSlider() {
  const heroImage = HERO_SLIDES[0]?.image ?? '/images/hero-section-image.jpeg';

  return (
    <div className="relative w-full overflow-hidden bg-[#111820] min-h-[52svh] sm:min-h-[60svh] md:min-h-[72svh] lg:min-h-[86svh] pt-28 sm:pt-32 md:pt-32 lg:pt-36">
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/30" />

      <div className="relative z-10 mx-auto flex min-h-[52svh] w-full max-w-7xl flex-col gap-8 px-4 pb-8 pt-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:px-10 lg:pb-12 xl:px-12">
        <div className="max-w-2xl text-white lg:pb-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/80 sm:text-sm">
            Professor R.I.S Agbede
          </p>

          <h1 className="text-[clamp(2.5rem,6vw,7rem)] font-black leading-[0.8] tracking-[-0.06em] text-white uppercase">
            Foundation
          </h1>

          <div className="mt-6 max-w-xl space-y-4 text-white/95">
            <p className="text-[clamp(1.5rem,2.8vw,2.8rem)] font-medium leading-tight">
              Object or Purpose
            </p>

            <ul className="space-y-3 text-[clamp(0.98rem,1.7vw,1.7rem)] font-light leading-relaxed">
              <li>• Medical Research</li>
              <li>• To assist underserved individuals with end-stage kidney disease in obtaining kidney replacement therapy.</li>
              <li>• To fund a prize recognizing excellence in research and study within the field of parasitology.</li>
            </ul>
          </div>
        </div>

        <div className="flex w-full justify-center lg:w-[34%] lg:justify-end">
          <img
            src={heroImage}
            alt="Professor R.I.S Agbede"
            className="h-[280px] w-full max-w-[360px] rounded-t-[1.5rem] object-cover object-center shadow-[0_22px_60px_rgba(0,0,0,0.45)] md:h-[420px] lg:h-[520px] lg:max-w-[460px]"
            style={{ objectPosition: 'center top' }}
          />
        </div>
      </div>
    </div>
  );
}
