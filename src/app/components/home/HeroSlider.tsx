/**
 * Hero section with automatic image/video slider and animated text
 */

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ChevronDown, Volume2, VolumeX, X as CloseIcon, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HERO_SLIDES } from '../../../lib/constants';

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState<boolean[]>(Array(HERO_SLIDES.length).fill(false));
  const [sources, setSources] = useState<string[]>(HERO_SLIDES.map(s => s.image));
  
  // Video dock states
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const dockVideoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  // Sync dock video volume
  useEffect(() => {
    if (dockVideoRef.current) {
      dockVideoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Handle modal open/close
  useEffect(() => {
    if (isVideoModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVideoModalOpen]);

  // Preload images to avoid white flashes and swap to fallback on error
  useEffect(() => {
    const FALLBACKS = [
      // Fallbacks chosen to avoid duplication within Hero if a primary fails
      'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=1920', // fallback for slide 1
      'https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg?auto=compress&cs=tinysrgb&w=1920', // fallback for slide 2
      'https://images.pexels.com/photos/5452204/pexels-photo-5452204.jpeg?auto=compress&cs=tinysrgb&w=1920', // fallback for slide 3
      'https://images.pexels.com/photos/7579835/pexels-photo-7579835.jpeg?auto=compress&cs=tinysrgb&w=1920', // fallback for slide 4
      'https://images.pexels.com/photos/4270365/pexels-photo-4270365.jpeg?auto=compress&cs=tinysrgb&w=1920', // fallback for slide 5
      'https://images.pexels.com/photos/5490280/pexels-photo-5490280.jpeg?auto=compress&cs=tinysrgb&w=1920', // fallback for slide 6
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
  const heroTitle = currentSlideData.title;
  const heroSubtitle = currentSlideData.subtitle;

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden" style={{ backgroundColor: '#0D1B2A' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 will-change-transform min-h-[100svh]"
          style={{
            backgroundImage: `url(${sources[currentSlide]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
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
            Fighting Kidney Disease Across Nigeria — One Patient At A Time
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[100svh] flex items-center pt-24 md:pt-0">
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

      {/* Floating Video Dock */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="fixed bottom-[88px] right-6 md:bottom-8 md:right-[120px] z-30 group"
      >
        <div 
          className="relative w-[220px] h-[124px] md:w-[380px] md:h-[214px] rounded-2xl overflow-hidden border-2 border-[var(--gold)]/40 shadow-2xl cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:border-[var(--gold)]"
          onClick={() => setIsVideoModalOpen(true)}
        >
          {/* Label */}
          <div className="absolute top-0 left-0 right-0 z-10 px-3 py-2 bg-black/60 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-wider">Foundation Story</span>
              <Maximize2 size={14} className="text-[var(--gold)]" />
            </div>
          </div>

          {/* Unmute/Mute Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="absolute bottom-3 left-3 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/20 hover:bg-[var(--gold)] transition-colors"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Video Preview */}
          {/* 🎬 SWAP THIS: Replace video src with your own kidney awareness preview loop */}
          <video
            ref={dockVideoRef}
            src="https://player.vimeo.com/external/494252666.sd.mp4?s=727f711ad13e8a38ff5c03251aa309bd073444a3&profile_id=165"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          
          {/* Play Icon Overlay on Hover */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[var(--gold)] flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-[var(--navy)] border-b-[10px] border-b-transparent ml-1" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-[110]"
            >
              <CloseIcon size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              {/* 🎬 SWAP THIS: Replace YouTube URL with your own kidney awareness video */}
              <iframe
                src="https://www.youtube.com/embed/fD3q0W55Sj0?autoplay=1"
                title="Kidney Awareness Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
