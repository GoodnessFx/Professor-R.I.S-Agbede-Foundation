import crypto from 'node:crypto';
import { env } from './env';

export function createReference(prefix: 'ngn' | 'usd' | 'crypto') {
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

export function verifyPaystackSignature(rawBody: string, signature: string | undefined) {
  if (!signature) {
    return false;
  }

  const expected = crypto
    .createHmac('sha512', env.paystackSecretKey)
    .update(rawBody)
    .digest('hex');

  return timingSafeEqual(expected, signature);
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

export interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    status: string;
    amount: number;
    currency: string;
    reference: string;
    channel?: string;
    gateway_response?: string;
    paid_at?: string;
    customer?: {
      email?: string;
    };
  };
}

export async function initializePaystackTransaction(payload: Record<string, unknown>) {
  return requestJson<PaystackInitializeResponse>('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.paystackSecretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function verifyPaystackTransaction(reference: string) {
  return requestJson<PaystackVerifyResponse>(`https://api.paystack.co/transaction/verify/${reference}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${env.paystackSecretKey}`,
      'Content-Type': 'application/json',
    },
  });
}

export interface FlutterwaveInitializeResponse {
  status: string;
  message: string;
  data: {
    link: string;
  };
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

export async function initializeFlutterwaveTransaction(payload: Record<string, unknown>) {
  return requestJson<FlutterwaveInitializeResponse>('https://api.flutterwave.com/v3/payments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.flutterwaveSecretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
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
