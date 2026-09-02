/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Flutterwave inline checkout public key
  readonly VITE_FLUTTERWAVE_PUBLIC_KEY?: string;
  // Admin email notification via EmailJS
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
  // General
  readonly VITE_DONATION_SUPPORT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
