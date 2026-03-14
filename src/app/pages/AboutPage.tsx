/**
 * About page - Foundation story and team
 */

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { SectionHeader } from '../components/shared/SectionHeader';
import { TRUSTEES, VALUES } from '../../lib/constants';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { User } from 'lucide-react';

export function AboutPage() {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: valuesRef, inView: valuesInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: boardRef, inView: boardInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.pexels.com/photos/8363031/pexels-photo-8363031.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="African community members gathered together in unity"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--navy)]/70" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-4"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            A legacy of hope, education, and transformation
          </motion.p>
        </div>
      </section>

      {/* Founder Section */}
      <section ref={heroRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="relative max-w-md mx-auto">
                <div className="absolute inset-0 bg-[var(--gold)] rounded-lg transform rotate-3" />
                <ImageWithFallback
                  src="/images/founder.jpg"
                  alt="Founder portrait"
                  className="relative rounded-lg shadow-2xl w-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl font-serif font-bold text-[var(--navy)] mb-2">
                Professor R.I.S Agbede
              </h2>
              <p className="text-xl text-[var(--gold)] mb-6">Founder & Patron</p>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Professor Raphael Idowu Sunday Agbede was born in a small village in Kogi State, where access to quality education was a distant dream for most children. Through sheer determination, the support of a dedicated teacher, and countless sacrifices by his family, he became the first in his community to attend university.
                </p>
                <p>
                  His academic journey took him from the University of Lagos, where he studied Economics, to doctoral studies at Oxford University. Throughout his distinguished 40-year career in academia and public service, Professor Agbede never forgot the helping hands that lifted him up. He witnessed firsthand how a single scholarship, one medical intervention, or a community development project could change not just individual lives, but the trajectory of entire families and communities.
                </p>
                <p>
                  In 2012, upon his retirement as Vice-Chancellor of Federal University of Technology, Minna, Professor Agbede established this foundation with a clear mission: to ensure that no bright Nigerian child would be denied the opportunity to learn, grow, and contribute to society simply because of their economic circumstances. Today, his legacy lives on through the thousands of students, families, and communities transformed by the Foundation's work.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section ref={valuesRef} className="py-20 bg-[var(--neutral-100)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-8 shadow-md"
            >
              <h3 className="text-2xl font-serif font-bold text-[var(--navy)] mb-4">Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To empower underserved Nigerian communities through quality education, accessible healthcare, and sustainable development.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-8 shadow-md"
            >
              <h3 className="text-2xl font-serif font-bold text-[var(--navy)] mb-4">Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                A Nigeria where every child has the opportunity to reach their full potential, regardless of their background.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-8 shadow-md"
            >
              <h3 className="text-2xl font-serif font-bold text-[var(--navy)] mb-4">Values</h3>
              <div className="grid grid-cols-2 gap-3">
                {VALUES.map((value, index) => (
                  <div key={value} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Board of Trustees */}
      <section ref={boardRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Board of Trustees"
            subtitle="Experienced leaders committed to driving positive change"
            centered
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {TRUSTEES.map((trustee, index) => (
              <motion.div
                key={trustee.id}
                initial={{ opacity: 0, y: 30 }}
                animate={boardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="w-32 h-32 rounded-full bg-[var(--neutral-100)] mx-auto mb-4 flex items-center justify-center">
                  <User size={48} className="text-[var(--navy)]/30" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-[var(--navy)] mb-1">
                  {trustee.name}
                </h3>
                <p className="text-[var(--gold)]">{trustee.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Registration */}
      <section className="py-12 bg-[var(--neutral-100)] border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600">
            Registered Non-Profit Organization | CAC No: RC-XXXXXXX | 
            Registered with Special Control Unit Against Money Laundering (SCUML)
          </p>
        </div>
      </section>
    </div>
  );
}
