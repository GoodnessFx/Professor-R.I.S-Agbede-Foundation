/**
 * 404 Not Found page
 */

import { Link } from 'react-router';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--neutral-100)] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="mb-8">
          <h1 className="text-9xl font-serif font-bold text-[var(--gold)] mb-4">404</h1>
          <h2 className="text-4xl font-serif font-bold text-[var(--navy)] mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--gold)] text-[var(--navy)] rounded-full font-semibold hover:scale-105 transition-all duration-300"
          >
            <Home size={20} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-[var(--navy)] text-[var(--navy)] rounded-full font-semibold hover:bg-[var(--navy)] hover:text-white transition-all duration-300"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-gray-600 mb-4">Or explore these sections:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/about" className="text-[var(--gold)] hover:underline">About Us</Link>
            <Link to="/programs" className="text-[var(--gold)] hover:underline">Programs</Link>
            <Link to="/impact" className="text-[var(--gold)] hover:underline">Impact</Link>
            <Link to="/news" className="text-[var(--gold)] hover:underline">News</Link>
            <Link to="/gallery" className="text-[var(--gold)] hover:underline">Gallery</Link>
            <Link to="/contact" className="text-[var(--gold)] hover:underline">Contact</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
