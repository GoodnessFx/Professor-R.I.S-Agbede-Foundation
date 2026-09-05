/**
 * Hero section with a single static foundation image
 */

import { HERO_SLIDES } from '../../../lib/constants';

export function HeroSlider() {
  const heroImage = HERO_SLIDES[0]?.image ?? '/images/hero-section-image.jpeg';

  return (
    <div className="relative w-full overflow-hidden bg-[#0D1B2A] min-h-[52svh] sm:min-h-[60svh] md:min-h-[72svh] lg:min-h-[90svh] pt-14 md:pt-18 lg:pt-20">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-black/20" />
      <div className="relative z-10 h-full min-h-[52svh] sm:min-h-[60svh] md:min-h-[72svh] lg:min-h-[90svh]" />
    </div>
  );
}
