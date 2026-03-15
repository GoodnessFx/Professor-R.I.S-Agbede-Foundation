/**
 * Mission statement preview section
 */

import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

export function MissionPreview() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section 
      ref={ref} 
      className="py-20 relative overflow-hidden" 
      style={{ 
        backgroundImage: 'url(https://images.pexels.com/photos/8363104/pexels-photo-8363104.jpeg?auto=compress&cs=tinysrgb&w=1920)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <div className="absolute inset-0 bg-[var(--navy)]/30" />
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Pull Quote */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <blockquote className="relative">
                <div className="text-[var(--gold)] text-8xl font-serif leading-none mb-4">"</div>
                <p className="text-3xl md:text-4xl font-serif italic text-[var(--navy)] mb-6 leading-relaxed" style={{ fontFamily: 'Fraunces, serif' }}>
                  Education is not a privilege — it is the foundation upon which every dream is built.
                </p>
                <footer className="text-lg text-gray-600">
                  — Prof. R.I.S Agbede
                </footer>
              </blockquote>
            </motion.div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--navy)] mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                The Professor R.I.S Agbede Foundation was established with a singular vision: to break the cycle of poverty through education, healthcare access, and community empowerment.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                We believe that every Nigerian child, regardless of their background, deserves the opportunity to reach their full potential. Through our targeted programs and partnerships, we're making that belief a reality across communities in all six geopolitical zones.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our work is guided by integrity, compassion, and a commitment to sustainable impact that transforms not just individual lives, but entire communities.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[var(--gold)] font-semibold text-lg group"
              >
                Learn More About Us
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
