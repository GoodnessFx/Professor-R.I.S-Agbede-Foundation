/**
 * Main navigation bar component with mega dropdowns
 * Sticky navbar with scroll-aware blur and shadow
 */

import { Link, useLocation } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Search, X as CloseIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '../icons/Logo';
import { NAV_LINKS } from '../../../lib/constants';
import { PROGRAMS, NEWS_ARTICLES } from '../../../lib/constants';
import { useNavigate } from 'react-router';
import { useScrollProgress } from '../../../hooks/useScrollProgress';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile (below 768px to match Tailwind's md: breakpoint)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const scrolled = useScrollProgress(50);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileActiveDropdown(null);
    setSearchExpanded(false);
    setSearchQuery('');
  }, [location.pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchExpanded(false);
        setSearchQuery('');
      }
    };

    if (searchExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchExpanded]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const navClasses = scrolled || !isHomePage
    ? 'bg-white/95 backdrop-blur-md shadow-md'
    : 'bg-transparent';

  const textClasses = scrolled || !isHomePage
    ? 'text-[var(--navy)]'
    : 'text-white';

  // Search data
  const searchData = [
    // Pages
    { title: 'Home', path: '/', category: 'Page', excerpt: 'Welcome to the Professor R.I.S Agbede Foundation' },
    { title: 'About Us', path: '/about', category: 'Page', excerpt: 'Learn about our mission and founder' },
    { title: 'Our Programs', path: '/programs', category: 'Page', excerpt: 'Explore our educational and community initiatives' },
    { title: 'Impact', path: '/impact', category: 'Page', excerpt: 'See the difference we\'re making' },
    { title: 'News & Media', path: '/news', category: 'Page', excerpt: 'Latest updates and press releases' },
    { title: 'Contact Us', path: '/contact', category: 'Page', excerpt: 'Get in touch with our team' },
    { title: 'Donate', path: '/donate', category: 'Page', excerpt: 'Support our work and make a difference' },
    { title: 'Grantmaking', path: '/grantmaking', category: 'Page', excerpt: 'Learn about our grant programs' },
    { title: 'Gallery', path: '/gallery', category: 'Page', excerpt: 'View our community impact photos' },
    
    // Programs
    ...PROGRAMS.map(p => ({ 
      title: p.title, 
      path: `/programs#${p.id}`, 
      category: 'Program', 
      excerpt: p.description 
    })),
    
    // News Articles
    ...NEWS_ARTICLES.map(a => ({ 
      title: a.title, 
      path: `/news/${(a as any).slug ?? a.id}`, 
      category: 'News', 
      excerpt: a.excerpt || a.content?.substring(0, 100) + '...' 
    })),
  ];

  const performSearch = (query: string) => {
    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6);
    
    setSearchResults(filtered);
  };

  const handleSearchToggle = () => {
    setSearchExpanded(!searchExpanded);
    if (!searchExpanded) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleSearchToggle();
    } else if (e.key === 'Enter' && searchResults.length > 0) {
      navigate(searchResults[0].path);
      handleSearchToggle();
    }
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: scrolled || !isHomePage ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0)',
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClasses}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-28 lg:h-32">
            {/* Logo & Name */}
            <Link to="/" className="flex items-center gap-2 md:gap-4 group shrink-0">
              <Logo className="w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24" />
              <div className={`flex flex-col items-start leading-[1.1] ${textClasses} transition-colors duration-300`}>
                <span className="text-[10px] md:text-[12px] lg:text-[14px] font-bold tracking-wider">Professor</span>
                <span className="text-lg md:text-xl lg:text-3xl font-bold font-serif whitespace-nowrap">R.I.S</span>
                <span className="text-[9px] md:text-[11px] lg:text-[12px] font-bold tracking-widest uppercase">Agbede Foundation</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3 lg:gap-6 flex-nowrap">
              {NAV_LINKS.map((link) => {
                const hasDropdown = 'dropdown' in link;
                
                return (
                  <div
                    key={link.label}
                    className="relative flex-shrink-0"
                    onMouseEnter={() => hasDropdown && setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {hasDropdown ? (
                      <button
                        className={`tap-target text-[clamp(11px,1vw,14px)] font-bold transition-colors duration-300 tracking-[0.05em] flex items-center gap-1 whitespace-nowrap ${textClasses} hover:text-[var(--gold)]`}
                        style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                      >
                        {link.label}
                        <ChevronDown size={12} className="flex-shrink-0" />
                      </button>
                    ) : (
                      <Link
                        to={link.path!}
                        className={`tap-target text-[clamp(11px,1vw,14px)] font-bold transition-colors duration-300 tracking-[0.05em] whitespace-nowrap ${textClasses} hover:text-[var(--gold)]`}
                        style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                      >
                        {link.label}
                      </Link>
                    )}

                    {/* Mega Dropdown Panel */}
                    {hasDropdown && (
                      <AnimatePresence>
                        {activeDropdown === link.label && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-2 min-w-[280px] rounded-lg overflow-hidden shadow-2xl"
                            style={{
                              backgroundColor: 'rgba(15, 20, 35, 0.92)',
                              backdropFilter: 'blur(16px)',
                            }}
                          >
                            <div className="py-4">
                              {link.dropdown!.map((item) => (
                                <Link
                                  key={item.path}
                                  to={item.path}
                                  className="group block px-6 py-3 text-white hover:text-[var(--gold)] transition-all duration-200"
                                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                                >
                                  <span className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-200">
                                    <span className="text-[var(--gold)]">→</span>
                                    <span className="text-[15px] whitespace-nowrap">{item.label}</span>
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
              
              {/* Donate Button */}
              <Link
                to="/donate"
                className="group relative px-4 lg:px-8 py-2 lg:py-3 bg-gradient-to-r from-[var(--gold)] to-[#D4962F] text-white rounded-full font-bold overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex-shrink-0 whitespace-nowrap"
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              >
                <span className="relative z-10 flex items-center gap-2 text-[clamp(10px,0.9vw,13px)] lg:text-sm">
                  <span className="whitespace-nowrap">SUPPORT OUR WORK</span>
                  <svg 
                    className="w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-[var(--navy)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </Link>
              {/* Inline Expanding Search */}
              <div ref={searchContainerRef} className="relative flex-shrink-0">
                <div className="flex items-center">
                  <motion.div 
                    className="flex items-center"
                    animate={{ 
                      width: searchExpanded ? (isMobile ? 'calc(100vw - 2rem)' : '240px') : '40px',
                      position: searchExpanded && isMobile ? 'fixed' : 'relative',
                      left: searchExpanded && isMobile ? '1rem' : 'auto',
                      right: searchExpanded && isMobile ? '1rem' : 'auto',
                      top: searchExpanded && isMobile ? '1.25rem' : 'auto',
                      zIndex: searchExpanded && isMobile ? 60 : 'auto',
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <button
                      onClick={handleSearchToggle}
                      className={`p-2 rounded-full border border-transparent hover:border-current transition-colors flex-shrink-0 ${textClasses} ${searchExpanded ? 'hidden md:hidden' : 'block'}`}
                      aria-label="Search site"
                    >
                      <Search size={18} />
                    </button>
                    
                    <AnimatePresence>
                      {searchExpanded && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="flex-1 flex items-center bg-inherit"
                        >
                          <div className="relative w-full">
                            <input
                              ref={searchInputRef}
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              onKeyDown={handleSearchKeyDown}
                              placeholder="Search for programs, news, or info..."
                              className={`w-full px-4 py-2.5 pl-10 pr-12 rounded-full border-2 shadow-lg transition-all duration-300 text-sm ${
                                scrolled || !isHomePage
                                  ? 'bg-white border-[var(--navy)]/20 focus:border-[var(--gold)] text-[var(--navy)] placeholder-[var(--navy)]/50'
                                  : 'bg-[var(--navy)] border-white/20 focus:border-[var(--gold)] text-white placeholder-white/50'
                              } focus:outline-none focus:ring-4 focus:ring-[var(--gold)]/10 backdrop-blur-xl`}
                              style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                            />
                            <Search 
                              size={18} 
                              className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 ${
                                scrolled || !isHomePage ? 'text-[var(--navy)]/50' : 'text-white/50'
                              }`} 
                            />
                            <button
                              onClick={handleSearchToggle}
                              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full hover:bg-black/10 transition-colors ${
                                scrolled || !isHomePage ? 'text-[var(--navy)]' : 'text-white'
                              }`}
                            >
                              <CloseIcon size={16} />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {searchExpanded && searchQuery.trim() && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={`fixed md:absolute top-[5.5rem] md:top-full left-4 right-4 md:left-auto md:right-0 md:w-[450px] mt-2 rounded-2xl shadow-2xl overflow-hidden z-[70] ${
                        scrolled || !isHomePage ? 'bg-white/98' : 'bg-[var(--navy)]/98'
                      } backdrop-blur-2xl border border-white/10 max-h-[70vh] flex flex-col`}
                    >
                      {searchResults.length > 0 ? (
                        <div className="max-h-80 overflow-y-auto">
                          {searchResults.map((result, index) => (
                            <Link
                              key={`${result.path}-${index}`}
                              to={result.path}
                              onClick={handleSearchToggle}
                              className={`block px-4 py-3 transition-colors duration-200 ${
                                scrolled || !isHomePage
                                  ? 'hover:bg-[var(--neutral-100)] text-[var(--navy)]'
                                  : 'hover:bg-white/10 text-white'
                              } border-b border-white/10 last:border-b-0`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className={`font-semibold text-sm ${
                                    scrolled || !isHomePage ? 'text-[var(--navy)]' : 'text-white'
                                  }`}>
                                    {result.title}
                                  </div>
                                  <div className={`text-xs mt-1 line-clamp-2 ${
                                    scrolled || !isHomePage ? 'text-[var(--navy)]/70' : 'text-white/70'
                                  }`}>
                                    {result.excerpt}
                                  </div>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ml-3 flex-shrink-0 ${
                                  result.category === 'Page' ? 'bg-blue-500/20 text-blue-300' :
                                  result.category === 'Program' ? 'bg-green-500/20 text-green-300' :
                                  'bg-orange-500/20 text-orange-300'
                                }`}>
                                  {result.category}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className={`px-4 py-6 text-center ${
                          scrolled || !isHomePage ? 'text-[var(--navy)]/70' : 'text-white/70'
                        }`}>
                          <div className="text-sm font-medium mb-3">Oops, nothing found!</div>
                          <div className="text-xs mb-4">Did you mean...</div>
                          <div className="space-y-2">
                            {[
                              { title: 'About Us', path: '/about' },
                              { title: 'Our Programs', path: '/programs' },
                              { title: 'Contact Us', path: '/contact' }
                            ].map((suggestion) => (
                              <Link
                                key={suggestion.path}
                                to={suggestion.path}
                                onClick={handleSearchToggle}
                                className={`block text-xs px-3 py-2 rounded transition-colors ${
                                  scrolled || !isHomePage
                                    ? 'hover:bg-[var(--neutral-100)] text-[var(--navy)]/80'
                                    : 'hover:bg-white/10 text-white/80'
                                }`}
                              >
                                {suggestion.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${textClasses}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[var(--navy)] z-40 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col pt-32 pb-12 px-8 gap-2">
              {NAV_LINKS.map((link, index) => {
                const hasDropdown = 'dropdown' in link;
                const isExpanded = mobileActiveDropdown === link.label;

                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    {hasDropdown ? (
                      <div className="mb-2">
                        <button
                          onClick={() => setMobileActiveDropdown(isExpanded ? null : link.label)}
                          className="w-full flex items-center justify-between text-xl font-semibold text-white hover:text-[var(--gold)] transition-colors py-3"
                          style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                        >
                          <span>{link.label}</span>
                          <ChevronDown
                            size={20}
                            className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-4 border-l-2 border-[var(--gold)] ml-2"
                            >
                              {link.dropdown!.map((item) => (
                                <Link
                                  key={item.path}
                                  to={item.path}
                                  className="block text-lg text-white/80 hover:text-[var(--gold)] py-2 transition-colors"
                                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                                >
                                  → {item.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={link.path!}
                        className="block text-xl font-semibold text-white hover:text-[var(--gold)] transition-colors py-3"
                        style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
              
              {/* Mobile Donate Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.08 }}
                className="mt-6"
              >
                <Link
                  to="/donate"
                  className="block text-center px-8 py-4 bg-[var(--gold)] text-[var(--navy)] rounded-full text-xl font-bold"
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                >
                  SUPPORT OUR WORK
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
