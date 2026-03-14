import { useEffect, useState } from 'react';

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('cookieNoticeDismissed');
    if (!dismissed) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50">
      <div className="mx-auto max-w-5xl m-3 p-4 rounded-lg shadow-lg bg-white border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm text-gray-700">
          We use cookies to improve your experience and understand usage. By using this site, you agree to our cookie policy.
        </p>
        <button
          onClick={() => { localStorage.setItem('cookieNoticeDismissed', '1'); setVisible(false); }}
          className="px-4 py-2 bg-[var(--navy)] text-white rounded-md text-sm font-semibold"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

