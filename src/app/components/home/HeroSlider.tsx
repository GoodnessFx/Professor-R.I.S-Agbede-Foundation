/**
 * Hero section with a single static foundation image
 */

import { HERO_SLIDES } from '../../../lib/constants';

export function HeroSlider() {
  const heroImage = HERO_SLIDES[0]?.image ?? '/images/hero-section-image.jpeg';

  return (
    <div className="relative min-h-[68svh] md:min-h-[100svh] w-full overflow-hidden" style={{ backgroundColor: '#0D1B2A' }}>
      <div
        className="absolute inset-0 min-h-[68svh] md:min-h-[100svh]"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
