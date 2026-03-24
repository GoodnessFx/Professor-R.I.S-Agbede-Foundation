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
          src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="African medical professional in hospital"
          className="absolute inset-0 w-full h-full object-cover"
          unoptimized={true}
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
            Supporting indigent patients with end-stage kidney disease across Nigeria
          </motion.p>
        </div>
      </section>

      {/* Founder Section */}
      <section ref={heroRef} id="founder" className="py-20 bg-white">
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
                  src="https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Founder portrait"
                  className="relative rounded-lg shadow-2xl w-full h-[500px] object-cover"
                  unoptimized={true}
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
                  Professor Raphael Idowu Sunday Agbede was born in a small village in Kogi State, where access to quality healthcare was a distant dream for most. Through sheer determination and the support of his community, he rose to become a distinguished academic and public servant.
                </p>
                <p>
                  Throughout his career, Professor Agbede never forgot the challenges faced by those in his community. He witnessed firsthand how kidney disease could devastate families without the means to afford specialized care. This lived experience became the catalyst for the Foundation's mission.
                </p>
                <p>
                  Established with a clear focus on kidney health, the Professor R.I.S Agbede Foundation now stands as a beacon of hope for indigent Nigerians. Our work ensures that end-stage kidney disease is not a death sentence for the vulnerable, providing a path to treatment, dignity, and a second chance at life.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Objectives */}
      <section ref={valuesRef} className="py-20 bg-[var(--neutral-100)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-8 shadow-md"
            >
              <h3 className="text-2xl font-serif font-bold text-[var(--navy)] mb-4">Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To support indigent persons with end stage kidney disease to access replacement therapy across Nigeria.
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
                A Nigeria where kidney disease is no longer a death sentence for the indigent, through accessible healthcare and sustainable support.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-8 shadow-md"
          >
            <h3 className="text-2xl font-serif font-bold text-[var(--navy)] mb-6">Our Objectives</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Support indigent persons with end stage kidney disease to access replacement therapy",
                "Support a prize for excellence in the study of parasitology and support trainings and capacity-building related to kidney health",
                "Collaborate with hospitals, healthcare providers, and other organizations to support kidney disease awareness, prevention, and early detection programs",
                "Establish patient support programs including counseling, education, emotional support, nutrition, and social welfare assistance to patients and caregivers",
                "Provide financial assistance for laboratory investigations and related medical services for indigent end stage kidney disease patients"
              ].map((objective, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--gold)] mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed">{objective}</span>
                </div>
              ))}
            </div>
          </motion.div>
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
            Registered Non-Profit Organization | CAC No: 9382765 | 
            Registered with Special Control Unit Against Money Laundering (SCUML)
          </p>
        </div>
      </section>
    </div>
  );
}
