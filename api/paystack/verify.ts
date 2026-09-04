import type { VercelRequest, VercelResponse } from '@vercel/node';

interface VerifyRequestBody {
  reference: string;
  expected_amount: number;
  expected_currency: string;
  donor_name: string;
  donor_email: string;
  donor_message?: string;
  tx_ref?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    console.error('[paystack] PAYSTACK_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Payment service misconfigured' });
  }

  const body = req.body as Partial<VerifyRequestBody>;
  const { reference, expected_amount, expected_currency, donor_name, donor_email, donor_message, tx_ref } = body;

  if (!reference) {
    return res.status(400).json({ error: 'reference is required' });
  }
  if (typeof expected_amount !== 'number' || expected_amount <= 0) {
    return res.status(400).json({ error: 'expected_amount must be a positive number' });
  }
  if (!expected_currency || !['NGN', 'USD'].includes(expected_currency)) {
    return res.status(400).json({ error: 'expected_currency must be NGN or USD' });
  }
  if (!donor_name || !donor_email) {
    return res.status(400).json({ error: 'donor_name and donor_email are required' });
  }

  try {
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await paystackRes.json();

    if (!paystackRes.ok || !data.status || data.status !== 'success') {
      console.error('[paystack] verification failed:', data);
      return res.status(400).json({ success: false, error: 'Paystack verification failed' });
    }

    const transaction = data.data;

    if (transaction.status !== 'success') {
      return res.status(400).json({ success: false, error: 'Transaction status is not successful' });
    }

    if (transaction.currency && transaction.currency !== expected_currency) {
      console.warn('[paystack] currency mismatch', {
        expected: expected_currency,
        received: transaction.currency,
        reference,
      });
      return res.status(400).json({ success: false, error: 'Currency mismatch — transaction rejected' });
    }

    const amountInMinor = Number(transaction.amount ?? 0);
    const expectedInMinor = Math.round(expected_amount * 100);
    if (Math.abs(amountInMinor - expectedInMinor) > 100) {
      console.warn('[paystack] amount mismatch', {
        expected: expectedInMinor,
        received: amountInMinor,
        reference,
      });
      return res.status(400).json({ success: false, error: 'Amount mismatch — transaction rejected' });
    }

    if (tx_ref && transaction.reference && transaction.reference !== tx_ref) {
      console.warn('[paystack] reference mismatch', {
        expected: tx_ref,
        received: transaction.reference,
      });
      return res.status(400).json({ success: false, error: 'Transaction reference mismatch — transaction rejected' });
    }

    return res.status(200).json({
      success: true,
      donor_name,
      amount: transaction.amount / 100,
      currency: transaction.currency || expected_currency,
    });
  } catch (err) {
    console.error('[paystack] network error:', err);
    return res.status(502).json({ success: false, error: 'Could not reach Paystack' });
  }
}
