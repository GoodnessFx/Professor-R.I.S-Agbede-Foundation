export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, amount, metadata } = req.body;

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Convert NGN to kobo
        metadata,
        callback_url: `${req.headers.origin}/donate`, // Optional, since we use inline checkout
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Paystack initialization failed');
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Paystack init error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
