/**
 * Grantmaking page - Annual grants, discretionary grants, partnerships
 */

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link } from 'react-router';

const grantCards = [
  {
    id: 'annual-grants',
    title: 'Annual Grants',
    borderColor: '#C8832A',
    titleColor: 'var(--gold)',
    description: 'Coming soon. We will announce our next grant cycle and application details here when it opens.',
    buttonText: 'Coming Soon',
  },
  {
    id: 'discretionary',
    title: 'Discretionary Grants',
    borderColor: '#2E9CCA',
    titleColor: 'var(--teal)',
    description: 'Coming soon. Our discretionary grant opportunities will be shared once the next call for urgent support is launched.',
    buttonText: 'Coming Soon',
  },
  {
    id: 'partnerships',
    title: 'Partnerships & Collaborations',
    borderColor: '#C8832A',
    titleColor: 'var(--gold)',
    description: 'Coming soon. Partnership opportunities will be posted here as they become available.',
    buttonText: 'Coming Soon',
  },
];

export function GrantmakingPage() {
  const { ref: cardsRef, inView: cardsInView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.pexels.com/photos/4225920/pexels-photo-4225920.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="African doctor consulting with patient"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'grayscale(100%)' }}
          unoptimized={true}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-7xl lg:text-[80px] font-bold mb-8"
            style={{ 
              fontFamily: 'Cormorant Garamond, serif',
              lineHeight: '1.2',
              textWrap: 'balance'
            }}
          >
            Grantmaking
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ 
              fontFamily: 'Nunito Sans, sans-serif',
              lineHeight: '1.85'
            }}
          >
            Coming soon. We are updating our grantmaking opportunities and will share updates here when new funding cycles open.
          </motion.p>
        </div>
      </section>

      {/* Grant Cards Section */}
      <section 
        ref={cardsRef}
        className="relative section-padding overflow-hidden"
        style={{ backgroundColor: 'var(--dark-bg)' }}
      >
        {/* Fading background image */}
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.pexels.com/photos/4225921/pexels-photo-4225921.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Background"
            className="w-full h-full object-cover grayscale"
            unoptimized={true}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="responsive-grid max-w-7xl mx-auto">
            {grantCards.map((card, index) => (
              <motion.div
                key={card.id}
                id={card.id}
                initial={{ opacity: 0, y: 40 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="bg-white rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 flex flex-col"
                style={{
                  borderTop: `4px solid ${card.borderColor}`,
                }}
              >
                <div className="p-8 flex-1 flex flex-col">
                  <h3
                    className="text-2xl font-bold mb-6"
                    style={{
                      fontFamily: 'Libre Baskerville, serif',
                      color: card.titleColor,
                      textWrap: 'balance'
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-gray-700 mb-8 flex-1"
                    style={{
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '18px',
                      lineHeight: '1.85'
                    }}
                  >
                    {card.description}
                  </p>
                <span
                  className="px-6 py-3 border-2 border-[var(--navy)] text-[var(--navy)] rounded-lg font-semibold text-center opacity-80"
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                >
                  {card.buttonText}
                </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional info section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={cardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 max-w-4xl mx-auto text-center"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  textWrap: 'balance'
                }}
              >
                Application Process
              </h2>
              <p
                className="text-white/90 text-lg mb-8"
                style={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  lineHeight: '1.85'
                }}
              >
                Coming soon. We will publish the next grant cycle, application guidelines, and funding priorities here as soon as they are ready.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <span
                  className="px-8 py-3 bg-[var(--gold)] text-[var(--navy)] rounded-full font-bold opacity-80"
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                >
                  Coming Soon
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
