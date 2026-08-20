import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { transaction_id } = req.query;

  if (!transaction_id) {
    return res.status(400).json({ error: 'transaction_id is required' });
  }

  try {
    const response = await fetch(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok || data.status !== 'success') {
      throw new Error(data.message || 'Flutterwave verification failed');
    }

    if (data.data.status === 'successful' && data.data.currency === 'USD') {
      // Send confirmation email to admin
      const donationData = data.data.meta || {};
      try {
        await resend.emails.send({
          from: 'donations@agbedefoundation.org',
          to: process.env.ADMIN_EMAIL || 'info@agbedefoundation.org',
          subject: 'New Donation Received (Flutterwave - USD)',
          html: `
            <h2>New Donation Received!</h2>
            <p><strong>Amount:</strong> $${data.data.amount}</p>
            <p><strong>Donor Name:</strong> ${data.data.customer.name}</p>
            <p><strong>Email:</strong> ${data.data.customer.email}</p>
            <p><strong>Phone:</strong> ${donationData.phone || 'N/A'}</p>
            <p><strong>Message:</strong> ${donationData.message || 'N/A'}</p>
            <p><strong>Reference:</strong> ${data.data.tx_ref}</p>
            <p><strong>Transaction ID:</strong> ${transaction_id}</p>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
      }
      
      return res.status(200).json({ success: true, data: data.data });
    }

    return res.status(400).json({ success: false, message: 'Transaction not successful' });
  } catch (error) {
    console.error('Flutterwave verify error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
