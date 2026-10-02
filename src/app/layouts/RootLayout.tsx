/**
 * Root layout — bulletproof.
 * Navbar/Footer are each guarded: if either throws, the page content
 * still renders. The app can NEVER go fully blank.
 */

import { Component, type ReactNode, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

class Guard extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export function RootLayout() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Guard>
        <Navbar />
      </Guard>
      <main className="flex-1">
        <Outlet />
      </main>
      <Guard>
        <Footer />
      </Guard>
    </div>
  );
}
