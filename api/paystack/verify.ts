import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { reference } = req.query;

  if (!reference) {
    return res.status(400).json({ error: 'Reference is required' });
  }

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Paystack verification failed');
    }

    if (data.data.status === 'success') {
      // Send confirmation email to admin
      const donationData = data.data.metadata || {};
      try {
        await resend.emails.send({
          from: 'donations@agbedefoundation.org', // This will need to be verified on Resend
          to: process.env.ADMIN_EMAIL || 'info@agbedefoundation.org',
          subject: 'New Donation Received (Paystack)',
          html: `
            <h2>New Donation Received!</h2>
            <p><strong>Amount:</strong> ₦${data.data.amount / 100}</p>
            <p><strong>Donor Name:</strong> ${donationData.fullName || 'Anonymous'}</p>
            <p><strong>Email:</strong> ${data.data.customer.email}</p>
            <p><strong>Phone:</strong> ${donationData.phone || 'N/A'}</p>
            <p><strong>Message:</strong> ${donationData.message || 'N/A'}</p>
            <p><strong>Reference:</strong> ${reference}</p>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // We still return success to the frontend even if email fails, so they see the success screen
      }
      
      return res.status(200).json({ success: true, data: data.data });
    }

    return res.status(400).json({ success: false, message: 'Transaction not successful' });
  } catch (error) {
    console.error('Paystack verify error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
