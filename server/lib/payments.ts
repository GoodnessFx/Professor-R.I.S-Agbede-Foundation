import crypto from 'node:crypto';
import { env } from './env';

export function createReference(prefix: 'ngn' | 'usd') {
  return `don_${prefix}_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
}

export function toSubunit(amount: number, currency: string) {
  return currency === 'NGN' ? Math.round(amount * 100) : Math.round(amount);
}

export function timingSafeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);

  if (a.length !== b.length) {
    return false;
  }

  return crypto.timingSafeEqual(a, b);
}

export function verifyFlutterwaveSignature(rawBody: string, signature: string | undefined) {
  if (!signature) {
    return false;
  }

  const expected = crypto
    .createHmac('sha256', env.flutterwaveSecretHash)
    .update(rawBody)
    .digest('base64');

  return timingSafeEqual(expected, signature);
}

async function requestJson<T>(url: string, init: RequestInit) {
  const response = await fetch(url, init);
  const payload = (await response.json()) as T & { message?: string };

  if (!response.ok) {
    throw new Error(payload.message || `Request failed with status ${response.status}`);
  }

  return payload;
}

export interface FlutterwaveVerifyResponse {
  status: string;
  message: string;
  data: {
    id: number;
    tx_ref: string;
    amount: number;
    currency: string;
    status: string;
    payment_type?: string;
    processor_response?: string;
    customer?: {
      email?: string;
    };
  };
}

export async function verifyFlutterwaveTransaction(transactionId: string) {
  return requestJson<FlutterwaveVerifyResponse>(
    `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${env.flutterwaveSecretKey}`,
        'Content-Type': 'application/json',
      },
    },
  );
}
