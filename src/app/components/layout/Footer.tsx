/**
 * Site footer with links, newsletter signup, and contact info
 */

import { Link } from 'react-router';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Send } from 'lucide-react';
import { Logo } from '../icons/Logo';
import { NAV_LINKS, PROGRAMS, SOCIAL_LINKS } from '../../../lib/constants';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const iconMap: Record<string, any> = {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
  };

  return (
    <footer className="bg-[var(--navy)] text-white relative overflow-hidden">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo & Mission */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <Logo className="w-10 h-10 text-[var(--gold)]" />
              <span className="font-serif text-xl font-semibold">
                Prof. R.I.S Agbede<br />Foundation
              </span>
            </Link>
            <p className="text-white/80 mb-6 leading-relaxed">
              Empowering underserved Nigerian communities through education, healthcare, and sustainable development.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--gold)] flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4 text-[var(--gold)]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.filter(link => link.label !== 'Donate').map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-[var(--gold)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4 text-[var(--gold)]">
              Our Programs
            </h3>
            <ul className="space-y-3">
              {PROGRAMS.map((program) => (
                <li key={program.id}>
                  <Link
                    to="/programs"
                    className="text-white/80 hover:text-[var(--gold)] transition-colors"
                  >
                    {program.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4 text-[var(--gold)]">
              Stay Connected
            </h3>
            <p className="text-white/80 mb-4 text-sm">
              Subscribe to receive updates on our programs, impact stories, and upcoming events.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                />
              </div>
              <button
                type="submit"
                disabled={subscribed}
                className="w-full px-4 py-3 bg-[var(--gold)] text-[var(--navy)] rounded-lg font-medium hover:bg-[var(--gold)]/90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {subscribed ? (
                  <>✓ Subscribed!</>
                ) : (
                  <>
                    Subscribe <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>
              © {new Date().getFullYear()} Prof. R.I.S Agbede Foundation. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-[var(--gold)] transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-[var(--gold)] transition-colors">
                Terms of Service
              </Link>
              <span>CAC No: RC-XXXXXXX</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
