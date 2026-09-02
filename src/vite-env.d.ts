/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FLUTTERWAVE_PUBLIC_KEY?: string;
  readonly VITE_DONATION_SUPPORT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
