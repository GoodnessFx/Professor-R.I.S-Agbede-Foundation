/**
 * Root layout component with navigation and footer.
 * AnimatePresence/motion wrapper removed: it blanked the page when the
 * motion package failed to load, and it added no visible benefit.
 */

import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { BackToTop } from '../components/shared/BackToTop';
import { WhatsAppButton } from '../components/shared/WhatsAppButton';
import { CookieNotice } from '../components/shared/CookieNotice';

export function RootLayout() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
      <CookieNotice />
    </div>
  );
}
