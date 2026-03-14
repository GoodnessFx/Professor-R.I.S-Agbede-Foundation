/**
 * Donation call-to-action section
 */

import { Link } from 'react-router';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

const DONATION_AMOUNTS = ['₦5,000', '₦20,000', '₦50,000', 'Custom'];

export function DonateCTA() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section 
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/baby-girl-smile.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'grayscale(100%)',
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="w-16 h-16 rounded-full bg-[var(--gold)] flex items-center justify-center mx-auto mb-6">
            <Heart size={32} className="text-white fill-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--navy)] mb-6">
            Your Support Changes Everything
          </h2>
          <p className="text-xl text-gray-700 mb-10 leading-relaxed">
            Every contribution, no matter the size, directly funds education, healthcare, and hope for communities across Nigeria. Join us in building a brighter future.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {DONATION_AMOUNTS.map((amount) => (
              <button
                key={amount}
                className="px-6 py-3 bg-white border-2 border-[var(--navy)] text-[var(--navy)] rounded-full font-semibold hover:bg-[var(--navy)] hover:text-white transition-all duration-300"
              >
                {amount}
              </button>
            ))}
          </div>

          <Link
            to="/donate"
            className="inline-block px-10 py-4 bg-[var(--navy)] text-white rounded-full font-semibold text-lg hover:bg-[var(--gold)] hover:text-[var(--navy)] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Donate Now
          </Link>

          <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--green)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--green)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Registered NGO</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--green)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Tax Deductible</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
