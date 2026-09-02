import 'dotenv/config';

function required(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 8787),
  frontendBaseUrl: process.env.FRONTEND_BASE_URL ?? 'http://localhost:5173',
  flutterwavePublicKey: required('FLUTTERWAVE_PUBLIC_KEY'),
  flutterwaveSecretKey: required('FLUTTERWAVE_SECRET_KEY'),
  flutterwaveSecretHash: required('FLUTTERWAVE_SECRET_HASH'),
};
