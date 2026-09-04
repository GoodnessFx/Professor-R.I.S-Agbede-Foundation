/**
 * Mission statement preview section
 */

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

export function MissionPreview() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--navy)] mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            At the Professor R.I.S Agbede Foundation, we are driven by a deep commitment to stand with indigent Nigerians facing the daunting challenge of end-stage kidney disease. Our mission is to ensure that no one is left to suffer simply because they cannot afford life-saving replacement therapy.
          </p>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            We believe in the power of excellence and education, supporting prizes for parasitology study and building the capacity of healthcare workers to better manage kidney health. By collaborating with hospitals and providers, we bring vital awareness, prevention, and early detection programs to the heart of our communities.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            From providing financial assistance for critical laboratory investigations to establishing holistic patient support programs that offer counseling and nutritional guidance, we strive to be a beacon of hope and a practical source of relief for patients and their caregivers across Nigeria.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
