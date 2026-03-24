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
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Our Programs"
          subtitle="Comprehensive initiatives designed to create lasting impact across Nigeria"
          centered
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
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
