/**
 * Impact page - Statistics, testimonials, and impact map
 */

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SectionHeader } from '../components/shared/SectionHeader';
import { TestimonialCard } from '../components/shared/TestimonialCard';
import { TESTIMONIALS } from '../../lib/constants';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { StatCounter } from '../components/shared/StatCounter';
import { NigeriaMap } from '../components/shared/NigeriaMap';

const yearlyData = [
  { year: '2020', students: 180, communities: 12, funds: 420 },
  { year: '2021', students: 210, communities: 14, funds: 480 },
  { year: '2022', students: 250, communities: 16, funds: 520 },
  { year: '2023', students: 310, communities: 18, funds: 580 },
];

const reports = [
  { year: '2022', title: '2022 Annual Report' },
  { year: '2023', title: '2023 Annual Report' },
  { year: '2024', title: '2024 Q1-Q2 Report' },
];

export function ImpactPage() {
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: mapRef, inView: mapInView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Healthcare impact in Nigeria"
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
            Our Impact
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Measuring the difference we're making in communities across Nigeria
          </motion.p>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 bg-[var(--navy)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="responsive-grid text-center">
            <StatCounter value={10} label="Patients Supported" suffix="+" />
            <StatCounter value={3} label="Communities Reached" />
            <StatCounter value={5} label="Awareness Campaigns Run" />
            <StatCounter value={50} label="Lives Touched" suffix="+" />
          </div>
        </div>
      </section>

      {/* Growth Charts */}
      <section ref={statsRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Growth Over Time"
            subtitle="Our expanding reach and impact across Nigeria"
            centered
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-[var(--neutral-100)] rounded-2xl p-8"
          >
            <h3 className="text-2xl font-serif font-bold text-[var(--navy)] mb-8 text-center">
              Patients Supported by Year
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="year" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="students" fill="#C8832A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[var(--neutral-100)] rounded-2xl p-8"
            >
              <h3 className="text-xl font-serif font-bold text-[var(--navy)] mb-6 text-center">
                Communities Reached
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={yearlyData} id="communities-chart">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="year" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="communities" fill="#2E7D52" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[var(--neutral-100)] rounded-2xl p-8"
            >
              <h3 className="text-xl font-serif font-bold text-[var(--navy)] mb-6 text-center">
                Funds Disbursed (₦M)
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={yearlyData} id="funds-chart">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="year" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="funds" fill="#1A3C5E" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Voices of Impact"
            subtitle="Stories from the patients and communities we serve"
            centered
          />

          <div className="responsive-grid mt-12">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Map */}
      <section ref={mapRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Where We Work"
            subtitle="Our programs span across six geopolitical zones in Nigeria"
            centered
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto bg-[var(--neutral-100)] rounded-2xl p-8 text-center"
          >
            <p className="text-lg text-gray-700 mb-6">
              Our work currently spans <strong>Lagos, Abuja (FCT), Kogi, Enugu, Kano</strong> and <strong>Rivers</strong> states — with more communities coming onboard.
            </p>
            <NigeriaMap />
          </motion.div>
        </div>
      </section>

      {/* Annual Reports removed - redundant or needs kidney context */}
    </div>
  );
}
