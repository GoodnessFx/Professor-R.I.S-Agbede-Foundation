/**
 * Donation call-to-action section
 */

import { Link } from 'react-router';
import { Heart, Shield, CheckCircle, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

const DONATION_AMOUNTS = ['₦5,000', '₦20,000', '₦50,000', 'Custom'];

export function DonateCTA() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [selectedAmount, setSelectedAmount] = useState<string>('');

  return (
    <section 
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{
        backgroundColor: '#1A3C5E',
        backgroundImage: 'url(https://images.pexels.com/photos/3807571/pexels-photo-3807571.jpeg?auto=compress&cs=tinysrgb&w=1920)',
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
            Every contribution, no matter the size, directly funds education, healthcare, and hope for communities across Nigeria. Join us in building a brighter future.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {DONATION_AMOUNTS.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 min-w-[120px] ${
                  selectedAmount === amount
                    ? 'bg-[#C8832A] text-[#1A3C5E] border-0'
                    : 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1A3C5E]'
                }`}
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              >
                {amount}
              </button>
            ))}
          </div>

          <Link
            to="/donate"
            className="inline-block px-10 py-4 text-[#1A3C5E] rounded-full font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ 
              backgroundColor: '#C8832A',
              fontFamily: 'Nunito Sans, sans-serif'
            }}
          >
            Donate Now
          </Link>

          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-white" />
              <span 
                className="uppercase tracking-wider"
                style={{ 
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '13px',
                  letterSpacing: '0.05em'
                }}
              >
                Secure
              </span>
            </div>
            <div className="w-1 h-1 bg-white/60 rounded-full"></div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#22C55E]" />
              <span 
                className="uppercase tracking-wider"
                style={{ 
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '13px',
                  letterSpacing: '0.05em'
                }}
              >
                Registered NGO
              </span>
            </div>
            <div className="w-1 h-1 bg-white/60 rounded-full"></div>
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-[#22C55E]" />
              <span 
                className="uppercase tracking-wider"
                style={{ 
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '13px',
                  letterSpacing: '0.05em'
                }}
              >
                Tax Deductible
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
