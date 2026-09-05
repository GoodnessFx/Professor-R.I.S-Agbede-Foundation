/**
 * Hero section with a single static foundation image
 */

import { HERO_SLIDES } from '../../../lib/constants';

export function HeroSlider() {
  const heroImage = HERO_SLIDES[0]?.image ?? '/images/hero-section-image.jpeg';

  return (
    <div className="relative w-full overflow-hidden bg-[#0b1117] min-h-[52svh] sm:min-h-[60svh] md:min-h-[72svh] lg:min-h-[86svh] pt-24 sm:pt-28 md:pt-28 lg:pt-32">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 22%',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.72) contrast(1.04)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />

      <div className="relative z-10 mx-auto flex min-h-[52svh] w-full max-w-7xl items-center justify-center px-3 pb-6 pt-2 sm:px-6 sm:pb-8 sm:pt-4 lg:px-10 lg:pb-12 xl:px-12" />
    </div>
  );
}
