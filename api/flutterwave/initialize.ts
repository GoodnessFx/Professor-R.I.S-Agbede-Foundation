export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, amount, fullName, metadata } = req.body;
    
    // Generate a unique transaction reference
    const tx_ref = `tx-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

    const payload = {
      tx_ref,
      amount: amount.toString(),
      currency: 'USD',
      redirect_url: `${req.headers.origin}/donate`, // Using inline we might not need redirect_url but good to have
      customer: {
        email: email,
        name: fullName || 'Anonymous',
        phonenumber: metadata?.phone || '',
      },
      customizations: {
        title: 'Prof. R.I.S. Agbede Foundation Donation',
        description: 'Thank you for your generous donation',
        logo: `${req.headers.origin}/logo.png`, // Assuming you have a logo.png
      },
      meta: metadata,
    };

    const response = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || data.status !== 'success') {
      throw new Error(data.message || 'Flutterwave initialization failed');
    }

    // Flutterwave standard returns a link to redirect to, but inline can use tx_ref and API keys directly.
    // If you are using standard checkout link, you return data.data.link
    res.status(200).json(data);
  } catch (error) {
    console.error('Flutterwave init error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
