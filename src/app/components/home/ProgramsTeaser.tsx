/**
 * Programs preview section for home page
 */

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { SectionHeader } from '../shared/SectionHeader';
import { ProgramCard } from '../shared/ProgramCard';
import { PROGRAMS } from '../../../lib/constants';

export function ProgramsTeaser() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Our Key Programmes"
          subtitle="Focused interventions to reduce the burden of kidney disease across Nigeria"
          centered
        />

        <div className="responsive-grid mt-12">
          {PROGRAMS.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ProgramCard
                icon={program.icon}
                title={program.title}
                description={program.description.split('.')[0] + '.'}
                link={`/programs#${program.id}`}
                image={program.image}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
