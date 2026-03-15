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
          src="https://images.pexels.com/photos/8363104/pexels-photo-8363104.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Community celebration"
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter value={8} label="Students Supported" suffix="+" />
            <StatCounter value={2} label="Communities Reached" />
            <StatCounter value={0} label="Years of Impact" />
            <StatCounter value={250} label="Funds Disbursed" prefix="₦" suffix="K+" />
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
              Students Supported by Year
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
      <section ref={testimonialsRef} className="py-20 bg-[var(--neutral-100)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Stories of Impact"
            subtitle="Hear from the people whose lives have been transformed"
            centered
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
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

      {/* Annual Reports */}
      <section className="py-20 bg-[var(--neutral-100)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Annual Reports"
            subtitle="Transparent reporting on our programs and finances"
            centered
          />

          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            {reports.map((report) => (
              <div
                key={report.year}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--navy)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--navy)] transition-colors">
                  <Download size={28} className="text-[var(--navy)] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[var(--navy)] mb-2">
                  {report.title}
                </h3>
                <button className="mt-4 px-6 py-2 bg-[var(--gold)] text-[var(--navy)] rounded-full font-medium hover:scale-105 transition-all duration-300">
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
