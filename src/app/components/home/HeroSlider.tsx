/**
 * Hero section with a single static foundation image
 */

import { HERO_SLIDES } from '../../../lib/constants';

export function HeroSlider() {
  const heroImage = HERO_SLIDES[0]?.image ?? '/images/hero-section-image.jpeg';

  return (
    <div className="relative w-full overflow-hidden bg-[#0D1B2A] min-h-[52svh] sm:min-h-[60svh] md:min-h-[72svh] lg:min-h-[90svh]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/10 to-black/20" />
    </div>
  );
}
