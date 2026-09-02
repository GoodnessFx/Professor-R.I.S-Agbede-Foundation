/**
 * POST /api/flutterwave/verify
 *
 * Server-side Flutterwave payment verification.
 *
 * Flow:
 *  1. Client sends { transaction_id, expected_amount, expected_currency, tx_ref,
 *                    donor_name, donor_email, donor_message }
 *  2. This handler calls Flutterwave's /verify endpoint using the SECRET key
 *     (never exposed to the browser).
 *  3. It validates that the returned status is "successful", and that the
 *     amount and currency match what the client claimed — preventing any
 *     spoofed or replayed success callbacks.
 *  4. On confirmed success it fires an admin notification email via Resend and
 *     returns { success: true } to the client.
 *  5. On any mismatch or failure it returns { success: false } — the client
 *     never shows a success screen.
 *
 * Required environment variables (set in Vercel dashboard → Settings → Environment Variables):
 *   FLUTTERWAVE_SECRET_KEY   — from Flutterwave dashboard → API Keys
 *   ADMIN_EMAIL              — where admin notifications are sent
 *   RESEND_API_KEY           — from resend.com (optional; skips email if absent)
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Resend is optional — if RESEND_API_KEY is not set, email is skipped but
// verification still works correctly.
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface VerifyRequestBody {
  transaction_id: string | number;
  expected_amount: number;
  expected_currency: string;
  tx_ref: string;
  donor_name: string;
  donor_email: string;
  donor_message?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST — GET would expose transaction_id in server logs/CDN caches
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!secretKey) {
    console.error('[verify] FLUTTERWAVE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Payment service misconfigured' });
  }

  const body = req.body as Partial<VerifyRequestBody>;
  const { transaction_id, expected_amount, expected_currency, tx_ref,
          donor_name, donor_email, donor_message } = body;

  // ── Input validation ────────────────────────────────────────────────────────
  if (!transaction_id) {
    return res.status(400).json({ error: 'transaction_id is required' });
  }
  if (typeof expected_amount !== 'number' || expected_amount <= 0) {
    return res.status(400).json({ error: 'expected_amount must be a positive number' });
  }
  if (!expected_currency || !['NGN', 'USD'].includes(expected_currency)) {
    return res.status(400).json({ error: 'expected_currency must be NGN or USD' });
  }
  if (!tx_ref || !donor_name || !donor_email) {
    return res.status(400).json({ error: 'tx_ref, donor_name and donor_email are required' });
  }

  // ── Call Flutterwave verify endpoint with the SECRET key ────────────────────
  let flwData: any;
  try {
    const flwRes = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
        },
      },
    );
    flwData = await flwRes.json();

    if (!flwRes.ok || flwData.status !== 'success') {
      console.error('[verify] Flutterwave API error:', flwData);
      return res.status(400).json({ success: false, error: 'Flutterwave verification failed' });
    }
  } catch (err) {
    console.error('[verify] Network error calling Flutterwave:', err);
    return res.status(502).json({ success: false, error: 'Could not reach Flutterwave' });
  }

  const txData = flwData.data;

  // ── Security checks — validate against what the client claimed ──────────────
  // 1. Transaction must be in a successful terminal state
  if (txData.status !== 'successful') {
    return res.status(400).json({
      success: false,
      error: `Transaction status is "${txData.status}", not "successful"`,
    });
  }

  // 2. Currency must match — prevents currency-swap attacks
  if (txData.currency !== expected_currency) {
    console.warn(
      `[verify] Currency mismatch: expected ${expected_currency}, got ${txData.currency}`,
      { transaction_id, tx_ref },
    );
    return res.status(400).json({
      success: false,
      error: 'Currency mismatch — transaction rejected',
    });
  }

  // 3. Amount must match (allow ±1 for rounding on integer currencies)
  const amountDiff = Math.abs(txData.amount - expected_amount);
  if (amountDiff > 1) {
    console.warn(
      `[verify] Amount mismatch: expected ${expected_amount}, got ${txData.amount}`,
      { transaction_id, tx_ref },
    );
    return res.status(400).json({
      success: false,
      error: 'Amount mismatch — transaction rejected',
    });
  }

  // 4. tx_ref must match — prevents replay of a different transaction
  if (txData.tx_ref !== tx_ref) {
    console.warn(
      `[verify] tx_ref mismatch: expected ${tx_ref}, got ${txData.tx_ref}`,
      { transaction_id },
    );
    return res.status(400).json({
      success: false,
      error: 'Transaction reference mismatch — transaction rejected',
    });
  }

  // ── All checks passed — send admin notification ─────────────────────────────
  const symbol = expected_currency === 'NGN' ? '₦' : '$';
  const adminEmail = process.env.ADMIN_EMAIL || 'info@agbedefoundation.org';

  if (resend) {
    try {
      await resend.emails.send({
        from: 'donations@agbedefoundation.org',
        to: adminEmail,
        subject: `New Donation — ${symbol}${expected_amount.toLocaleString()} ${expected_currency}`,
        html: `
          <h2 style="color:#1a2e4a">New Donation Confirmed ✓</h2>
          <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
            <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Donor Name</td>
                <td style="padding:8px;border:1px solid #eee">${escHtml(donor_name)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Email</td>
                <td style="padding:8px;border:1px solid #eee">${escHtml(donor_email)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Amount</td>
                <td style="padding:8px;border:1px solid #eee">${symbol}${expected_amount.toLocaleString()} ${expected_currency}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Payment Channel</td>
                <td style="padding:8px;border:1px solid #eee">${escHtml(txData.payment_type || 'N/A')}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Message</td>
                <td style="padding:8px;border:1px solid #eee">${escHtml(donor_message || '—')}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Transaction Ref</td>
                <td style="padding:8px;border:1px solid #eee;font-family:monospace">${escHtml(tx_ref)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Flutterwave ID</td>
                <td style="padding:8px;border:1px solid #eee;font-family:monospace">${transaction_id}</td></tr>
          </table>
          <p style="margin-top:16px;color:#666;font-size:12px">
            This notification was sent after server-side verification with Flutterwave.
          </p>
        `,
      });
    } catch (emailErr) {
      // Email failure must never block the success response —
      // the payment is confirmed; only the notification failed.
      console.error('[verify] Admin email failed (payment still confirmed):', emailErr);
    }
  } else {
    console.warn('[verify] RESEND_API_KEY not set — skipping admin email notification.');
  }

  return res.status(200).json({
    success: true,
    donor_name,
    amount: txData.amount,
    currency: txData.currency,
  });
}

/** Minimal HTML escaping to prevent injection in email body. */
function escHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
