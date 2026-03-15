/**
 * Hero section with automatic image/video slider and animated text
 */

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HERO_SLIDES } from '../../../lib/constants';

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState<boolean[]>(Array(HERO_SLIDES.length).fill(false));
  const [sources, setSources] = useState<string[]>(HERO_SLIDES.map(s => s.image));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  // Preload images to avoid white flashes and swap to fallback on error
  useEffect(() => {
    const FALLBACKS = [
      // Fallbacks chosen to avoid duplication within Hero if a primary fails
      'https://images.pexels.com/photos/8363031/pexels-photo-8363031.jpeg?auto=compress&cs=tinysrgb&w=1920', // for slide 1
      'https://images.pexels.com/photos/3807571/pexels-photo-3807571.jpeg?auto=compress&cs=tinysrgb&w=1920', // for slide 2
      'https://images.pexels.com/photos/8363104/pexels-photo-8363104.jpeg?auto=compress&cs=tinysrgb&w=1920', // for slide 3
      'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1920', // for slide 4
      'https://images.pexels.com/photos/6647028/pexels-photo-6647028.jpeg?auto=compress&cs=tinysrgb&w=1920', // for slide 5
      'https://images.pexels.com/photos/8363028/pexels-photo-8363028.jpeg?auto=compress&cs=tinysrgb&w=1920', // for slide 6
    ];

    sources.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setIsLoaded((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
      };
      img.onerror = () => {
        // Swap to fallback if available
        const fb = FALLBACKS[index];
        if (fb && fb !== src) {
          setSources((prev) => {
            const next = [...prev];
            next[index] = fb;
            return next;
          });
        }
      };
    });
  }, [sources]);

  const currentSlideData = HERO_SLIDES[currentSlide];
  const heroTitle = HERO_SLIDES[0].title;
  const heroSubtitle = HERO_SLIDES[0].subtitle;

  return (
    <div className="relative h-screen w-full overflow-hidden" style={{ backgroundColor: '#0D1B2A' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 will-change-transform"
          style={{
            backgroundImage: `url(${sources[currentSlide]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: currentSlide === 1 ? 'grayscale(100%)' : 'none',
            opacity: isLoaded[currentSlide] ? 1 : 0,
          }}
        />
      </AnimatePresence>
      {/* Enhanced gradient and visual overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-[rgba(13,27,42,0.2)] to-[rgba(212,175,55,0.1)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(212,175,55,0.05)] via-transparent to-[rgba(13,27,42,0.1)] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Enhanced Marquee Eyebrow Text */}
      <div className="absolute left-0 right-0 z-10 top-24 md:top-28 lg:top-28 overflow-hidden">
        <div className="mx-auto max-w-[90vw] overflow-hidden">
          <div
            className="marquee-left text-[var(--gold)] uppercase tracking-[0.2em] text-sm md:text-base font-semibold px-4 drop-shadow-lg"
            style={{ 
              fontFamily: 'Montserrat, sans-serif', 
              letterSpacing: '0.12em',
              textShadow: '0 2px 4px rgba(0,0,0,0.3), 0 0 10px rgba(212,175,55,0.2)'
            }}
          >
            Changing Lives Across Nigeria — One Community At A Time
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            key="hero-overlay"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 
              className="font-bold text-white mb-6 drop-shadow-2xl"
              style={{ 
                fontFamily: 'Cormorant Garamond, serif',
                lineHeight: '1.2',
                textWrap: 'balance',
                fontSize: 'clamp(2rem, 6vw, 5rem)',
                textShadow: '0 4px 8px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.1)'
              }}
            >
              {heroTitle}
            </h1>
            <p 
              className="text-white/90 mb-10 max-w-[620px] drop-shadow-lg"
              style={{
                fontFamily: 'Nunito Sans, sans-serif',
                lineHeight: '1.85',
                fontSize: 'clamp(1rem, 2.2vw, 1.375rem)',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/programs"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--gold)] to-yellow-500 text-[var(--navy)] rounded-full font-bold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[var(--gold)]/30"
                style={{ 
                  fontFamily: 'Nunito Sans, sans-serif',
                  boxShadow: '0 4px 15px rgba(212,175,55,0.2)'
                }}
              >
                <span>See What We Do</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/donate"
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white hover:text-[var(--navy)] transition-all duration-300 text-center shadow-lg hover:shadow-2xl hover:shadow-white/20"
                style={{ 
                  fontFamily: 'Nunito Sans, sans-serif',
                  backdropFilter: 'blur(10px)'
                }}
              >
                Join the Movement
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Slide counter */}
      <div className="absolute bottom-8 right-8 z-20 text-white/90 font-mono text-sm drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        {String(currentSlide + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
      </div>

      {/* Enhanced Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 shadow-lg ${
              index === currentSlide 
                ? 'w-10 bg-gradient-to-r from-[var(--gold)] to-yellow-400 shadow-[var(--gold)]/50' 
                : 'w-3 bg-white/40 hover:bg-white/70 hover:scale-110 backdrop-blur-sm'
            }`}
            style={{
              boxShadow: index === currentSlide ? '0 0 15px rgba(212,175,55,0.4)' : '0 2px 4px rgba(0,0,0,0.2)'
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Enhanced Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.5 },
          y: { repeat: Infinity, duration: 1.5 }
        }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/90 drop-shadow-lg"
        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
      >
        <span className="text-xs uppercase tracking-widest mb-2 font-medium">Scroll</span>
        <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
          <ChevronDown size={20} className="text-[var(--gold)]" />
        </div>
      </motion.div>
    </div>
  );
}
