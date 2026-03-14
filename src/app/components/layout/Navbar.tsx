/**
 * Main navigation bar component with mega dropdowns
 * Sticky navbar with scroll-aware blur and shadow
 */

import { Link, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const scrolled = useScrollProgress(50);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileActiveDropdown(null);
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

  const navClasses = scrolled || !isHomePage
    ? 'bg-white/95 backdrop-blur-md shadow-md'
    : 'bg-transparent';

  const textClasses = scrolled || !isHomePage
    ? 'text-[var(--navy)]'
    : 'text-white';

  const searchItems = [
    { label: 'Home', path: '/' },
    ...NAV_LINKS.flatMap((l: any) =>
      'dropdown' in l ? l.dropdown : l.path ? [{ label: l.label, path: l.path }] : []
    ),
    ...PROGRAMS.map(p => ({ label: `${p.title}`, path: `/programs#${p.id}` })),
    ...NEWS_ARTICLES.map(a => ({ label: a.title, path: `/news/${(a as any).slug ?? a.id}` })),
  ];

  const results = query.trim()
    ? searchItems.filter(i => i.label.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : [];

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
          <div className="flex items-center justify-between h-24">
            {/* Logo - Made Bigger */}
            <Link to="/" className="flex items-center gap-4 group">
              <Logo variant={(scrolled || !isHomePage) ? 'dark' : 'light'} className={`w-40 h-14 md:w-56 md:h-20 lg:w-64 lg:h-24 ${textClasses}`} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map((link) => {
                const hasDropdown = 'dropdown' in link;
                
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => hasDropdown && setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {hasDropdown ? (
                      <button
                        className={`text-[15px] font-medium transition-colors duration-300 tracking-[0.08em] flex items-center gap-1 ${textClasses} hover:text-[var(--gold)]`}
                        style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                      >
                        {link.label}
                        <ChevronDown size={14} />
                      </button>
                    ) : (
                      <Link
                        to={link.path!}
                        className={`text-[15px] font-medium transition-colors duration-300 tracking-[0.08em] ${textClasses} hover:text-[var(--gold)]`}
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
                                    <span className="text-[15px]">{item.label}</span>
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
                className="group relative px-8 py-3 bg-gradient-to-r from-[var(--gold)] to-[#D4962F] text-white rounded-full font-bold overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>SUPPORT OUR WORK</span>
                  <svg 
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-[var(--navy)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </Link>
              {/* Search trigger */}
              <button
                onClick={() => { setSearchOpen(true); setTimeout(() => (document.getElementById('site-search-input') as HTMLInputElement | null)?.focus(), 0); }}
                className={`p-2 rounded-full border border-transparent hover:border-current transition-colors ${textClasses}`}
                aria-label="Search site"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${textClasses}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 p-5 border-b border-gray-200">
                <Search className="text-[var(--navy)]" size={20} />
                <input
                  id="site-search-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && results[0]) {
                      navigate(results[0].path);
                      setSearchOpen(false);
                      setQuery('');
                    } else if (e.key === 'Escape') {
                      setSearchOpen(false);
                      setQuery('');
                    }
                  }}
                  placeholder="Search the foundation..."
                  className="flex-1 px-4 py-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--navy)] text-xl font-semibold"
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                />
                <button
                  onClick={() => { setSearchOpen(false); setQuery(''); }}
                  className="px-3 py-1.5 rounded-md text-[var(--navy)] hover:bg-[var(--neutral-100)]"
                  aria-label="Close search"
                >
                  ✕
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {results.length ? (
                  results.map((r) => (
                    <Link
                      key={`${r.path}-${r.label}`}
                      to={r.path}
                      onClick={() => { setSearchOpen(false); setQuery(''); }}
                      className="block px-5 py-4 hover:bg-[var(--neutral-100)] text-[var(--navy)]"
                      style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                    >
                      {r.label}
                      <span className="text-gray-500 text-xs ml-2">{r.path}</span>
                    </Link>
                  ))
                ) : (
                  <div className="px-5 py-8 text-gray-500" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    Type to search for a page, program, or article…
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[var(--navy)] z-40 lg:hidden overflow-y-auto"
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
