/**
 * Home page - Main landing page
 */

import { HeroSlider } from '../components/home/HeroSlider';
import { ImpactNumbers } from '../components/home/ImpactNumbers';
import { MissionPreview } from '../components/home/MissionPreview';
import { ProgramsTeaser } from '../components/home/ProgramsTeaser';
import { NewsTeaser } from '../components/home/NewsTeaser';
import { DonateCTA } from '../components/home/DonateCTA';
import { PartnersStrip } from '../components/home/PartnersStrip';

export function HomePage() {
  return (
    <div>
      <HeroSlider />
      <ImpactNumbers />
      <MissionPreview />
      <ProgramsTeaser />
      <NewsTeaser />
      <DonateCTA />
      <PartnersStrip />
    </div>
  );
}
