/**
 * Donation call-to-action section
 */

import { Link } from 'react-router';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

export function DonateCTA() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{
        backgroundColor: '#1A3C5E',
        backgroundImage: "url('https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(10, 20, 40, 0.82)' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{
              backgroundColor: '#C8832A',
              boxShadow: '0 0 20px rgba(200, 131, 42, 0.3)'
            }}
          >
            <Heart size={32} className="text-white fill-white" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              lineHeight: '1.2'
            }}
          >
            Your Support Changes Everything
          </h2>
          <p
            className="text-xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: 'Nunito Sans, sans-serif' }}
          >
            A kidney patient in Nigeria is waiting. Your support today could be the difference between life and another day of suffering. Join us in providing life-saving care to those who need it most.
          </p>

          <Link
            to="/donate"
            className="inline-block px-10 py-4 text-[#1A3C5E] rounded-full font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{
              backgroundColor: '#C8832A',
              fontFamily: 'Nunito Sans, sans-serif'
            }}
          >
            Support the Foundation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
