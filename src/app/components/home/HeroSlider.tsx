/**
 * Hero section with a single static foundation image
 */

import { HERO_SLIDES } from '../../../lib/constants';

export function HeroSlider() {
  const heroImage = HERO_SLIDES[0]?.image ?? '/images/hero-section-image.jpeg';

  return (
    <div className="relative min-h-[72svh] md:min-h-[100svh] w-full overflow-hidden" style={{ backgroundColor: '#0D1B2A' }}>
      <div
        className="absolute inset-0 min-h-[72svh] md:min-h-[100svh]"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/35" />

      <div className="absolute inset-x-0 bottom-10 md:bottom-16 lg:bottom-20 z-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-end gap-3 md:gap-5 lg:gap-6 text-white">
            <img
              src="/images/Professor logo.png"
              alt="Professor R.I.S Agbede Foundation Logo"
              className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 object-contain drop-shadow-[0_8px_22px_rgba(0,0,0,0.35)]"
            />
            <div className="flex-1 min-w-0">
              <div className="text-[clamp(2.4rem,7vw,9rem)] font-black leading-[0.8] tracking-[-0.06em] whitespace-nowrap text-white/90 uppercase drop-shadow-[0_6px_18px_rgba(0,0,0,0.5)]">
                Professor R.I.S Agbede
              </div>
              <div className="mt-1 text-[clamp(1.2rem,3.5vw,4rem)] font-black leading-[0.9] tracking-[0.18em] uppercase text-white/80 drop-shadow-[0_6px_18px_rgba(0,0,0,0.5)]">
                Foundation
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
