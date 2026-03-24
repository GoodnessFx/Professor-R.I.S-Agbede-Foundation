/**
 * Programs page - Detailed program listings
 */

import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { HeartPulse, Megaphone, Users, FlaskConical, ChevronDown, Send } from 'lucide-react';
import { SectionHeader } from '../components/shared/SectionHeader';
import { PROGRAMS } from '../../lib/constants';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const iconMap: Record<string, any> = {
  HeartPulse,
  Megaphone,
  Users,
  FlaskConical,
};

export function ProgramsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.pexels.com/photos/4270371/pexels-photo-4270371.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="African nurse caring for patient"
          className="absolute inset-0 w-full h-full object-cover"
          unoptimized={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy)]/70 to-[var(--navy)]/80" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-4"
          >
            Programs That Change Lives
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Comprehensive initiatives creating lasting impact across Nigeria
          </motion.p>
        </div>
      </section>

      {/* Programs */}
      <section ref={ref} className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {PROGRAMS.map((program, index) => {
              const Icon = iconMap[program.icon];
              const isExpanded = expandedId === program.id;

              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-[var(--gold)] transition-all duration-300 shadow-md hover:shadow-xl"
                  id={program.id}
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-[var(--gold)]/10 flex items-center justify-center">
                        <Icon size={40} className="text-[var(--gold)]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-3xl font-serif font-bold text-[var(--navy)] mb-2">
                            {program.title}
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            <span className="px-3 py-1 bg-[var(--green)]/10 text-[var(--green)] rounded-full text-sm font-medium">
                              {program.status}
                            </span>
                            <span className="px-3 py-1 bg-[var(--navy)]/10 text-[var(--navy)] rounded-full text-sm font-medium">
                              {program.stats}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        {program.description}
                      </p>

                      {/* Sub-programs accordion */}
                      <div className="border-t border-gray-200 pt-4">
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : program.id)}
                          className="flex items-center justify-between w-full text-left group"
                        >
                          <span className="text-[var(--navy)] font-semibold">
                            View Sub-Programs ({program.subPrograms.length})
                          </span>
                          <ChevronDown
                            className={`text-[var(--gold)] transition-transform duration-300 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                            size={24}
                          />
                        </button>

                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 space-y-2"
                          >
                            {program.subPrograms.map((subProgram, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3 p-3 bg-[var(--neutral-100)] rounded-lg"
                              >
                                <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />
                                <span className="text-gray-700">{subProgram}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </div>

                      {/* Apply button */}
                      <div className="mt-6">
                        <Link
                          to={`/contact?subject=${encodeURIComponent(program.title)}`}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--gold)] text-[var(--navy)] rounded-full font-semibold hover:scale-105 transition-all duration-300"
                        >
                          Apply Now <Send size={18} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--navy)] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to Get Involved?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Whether you're interested in applying for support or partnering with us, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-[var(--gold)] text-[var(--navy)] rounded-full font-semibold hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </Link>
            <Link
              to="/donate"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[var(--navy)] transition-all duration-300"
            >
              Support Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
