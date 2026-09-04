/**
 * Home page - Main landing page
 */

import { HeroSlider } from '../components/home/HeroSlider';
import { MissionPreview } from '../components/home/MissionPreview';
import { ProgramsTeaser } from '../components/home/ProgramsTeaser';
import { DonateCTA } from '../components/home/DonateCTA';

export function HomePage() {
  return (
    <div>
      <HeroSlider />
      <MissionPreview />
      <ProgramsTeaser />
      <DonateCTA />
    </div>
  );
}
