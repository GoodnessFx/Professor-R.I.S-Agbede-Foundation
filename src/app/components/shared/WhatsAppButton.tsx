/**
 * WhatsApp floating button
 */

import { motion } from 'motion/react';
import { useState } from 'react';

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.a
        href="https://wa.me/23457370966"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-xl hover:shadow-2xl transition-shadow duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat with us on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/60 animate-ping" aria-hidden="true" />
        {/* WhatsApp logo */}
        <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16.01 5a10.9 10.9 0 0 0-9.63 16.07L5 27l6.1-1.35A10.9 10.9 0 1 0 16.01 5Zm0 19.6c-1.81 0-3.57-.49-5.1-1.42l-.37-.22-3.62.8.77-3.52-.24-.38a8.76 8.76 0 1 1 8.56 4.74Zm5.16-6.51c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.27-.73.9-.9 1.09-.17.18-.33.2-.61.07-.28-.14-1.18-.43-2.25-1.37-.83-.74-1.4-1.65-1.56-1.93-.16-.27-.02-.42.12-.56.12-.12.28-.33.42-.5.14-.17.19-.28.28-.47.09-.2.05-.36-.03-.5-.08-.14-.64-1.54-.88-2.11-.23-.55-.47-.47-.64-.48h-.55c-.2 0-.52.07-.79.36-.27.28-1.04 1.02-1.04 2.49s1.06 2.88 1.21 3.08c.15.2 2.09 3.18 5.06 4.46.71.31 1.26.49 1.69.63.71.22 1.36.19 1.88.12.57-.08 1.74-.71 1.99-1.39.25-.68.25-1.26.18-1.39-.07-.14-.26-.22-.54-.35Z"
          />
        </svg>
        
        {/* Tooltip */}
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 px-4 py-2 bg-[var(--navy)] text-white text-sm rounded-lg whitespace-nowrap shadow-lg"
            style={{ fontFamily: 'Nunito Sans, sans-serif' }}
          >
            Chat with us
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[var(--navy)]" />
          </motion.div>
        )}
      </motion.a>
    </div>
  );
}
