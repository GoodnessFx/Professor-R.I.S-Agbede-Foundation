/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYSTACK_PUBLIC_KEY?: string;
  readonly VITE_FLUTTERWAVE_PUBLIC_KEY?: string;
  readonly VITE_PAYPAL_DONATE_URL?: string;
  readonly VITE_CRYPTO_USDT_BASE_ADDRESS?: string;
  readonly VITE_CRYPTO_USDC_BASE_ADDRESS?: string;
  readonly VITE_CRYPTO_ETH_ADDRESS?: string;
  readonly VITE_DONATION_SUPPORT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
