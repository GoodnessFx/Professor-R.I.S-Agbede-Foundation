/**
 * Impact statistics strip with animated counters
 */

import { IMPACT_STATS } from '../../../lib/constants';
import { StatCounter } from '../shared/StatCounter';

export function ImpactNumbers() {
  return (
    <section className="bg-[var(--navy)] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {IMPACT_STATS.map((stat, index) => (
            <StatCounter
              key={index}
              value={stat.value}
              label={stat.label}
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
