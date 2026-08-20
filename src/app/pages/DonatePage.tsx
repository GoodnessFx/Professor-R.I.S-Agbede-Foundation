/**
 * Donate page - Donation form and information
 */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'motion/react';
import { Heart, Shield, TrendingUp, CheckCircle, Copy, Loader2, QrCode } from 'lucide-react';
import QRCode from 'qrcode';
import { SectionHeader } from '../components/shared/SectionHeader';
import { BANK_DETAILS, CRYPTO_ADDRESSES } from '../../lib/constants';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import PaystackPop from '@paystack/inline-js';

const NGN_DONATION_AMOUNTS = [5000, 20000, 50000, 100000];
const USD_DONATION_AMOUNTS = [10, 25, 50, 100];

const donationSchema = z.object({
  amount: z.number().min(1, 'Please enter a valid amount'),
  frequency: z.enum(['one-time', 'monthly']),
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  message: z.string().optional(),
});

type DonationForm = z.infer<typeof donationSchema>;

type PaymentMethod = 'ngn' | 'usd' | 'crypto';
type CryptoType = 'usdt' | 'eth';

export function DonatePage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('ngn');
  const [customAmount, setCustomAmount] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [cryptoType, setCryptoType] = useState<CryptoType>('usdt');
  const [qrCodeData, setQrCodeData] = useState<Record<string, string>>({});

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<DonationForm>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 5000,
      frequency: 'one-time',
    },
  });

  const selectedAmount = watch('amount');
  const frequency = watch('frequency');

  useEffect(() => {
    // Generate QR codes for crypto
    const generateQRs = async () => {
      try {
        const usdtQr = await QRCode.toDataURL(CRYPTO_ADDRESSES.USDT_BASE);
        const ethQr = await QRCode.toDataURL(CRYPTO_ADDRESSES.ETH);
        setQrCodeData({ usdt: usdtQr, eth: ethQr });
      } catch (err) {
        console.error('Failed to generate QR codes', err);
      }
    };
    generateQRs();
  }, []);

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setCustomAmount(null);
    if (method === 'ngn') {
      setValue('amount', 5000);
    } else if (method === 'usd') {
      setValue('amount', 10);
    }
  };

  const verifyPaystack = async (reference: string) => {
    try {
      const res = await fetch(`/api/paystack/verify?reference=${reference}`);
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          reset();
        }, 5000);
      } else {
        alert('Payment verification failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Error verifying payment.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: DonationForm) => {
    setLoading(true);

    try {
      if (paymentMethod === 'ngn') {
        // 1. Initialize Paystack Transaction
        const initRes = await fetch('/api/paystack/initialize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.email,
            amount: data.amount,
            metadata: {
              fullName: data.fullName,
              phone: data.phone,
              message: data.message,
            },
          }),
        });
        
        const initData = await initRes.json();
        
        if (!initData.status) {
          throw new Error(initData.message || 'Initialization failed');
        }

        // 2. Open Paystack popup
        const paystack = new PaystackPop();
        paystack.resumeTransaction(initData.data.access_code, {
          onSuccess: (transaction: any) => {
            // 3. Verify server-side
            setLoading(true); // Keep loading while verifying
            verifyPaystack(transaction.reference);
          },
          onCancel: () => {
            setLoading(false);
          },
        });
      } else if (paymentMethod === 'usd') {
        // Flutterwave flow
        const initRes = await fetch('/api/flutterwave/initialize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.email,
            amount: data.amount,
            fullName: data.fullName,
            metadata: {
              phone: data.phone,
              message: data.message,
            },
          }),
        });

        const initData = await initRes.json();
        
        if (initData.status !== 'success') {
          throw new Error(initData.message || 'Flutterwave initialization failed');
        }

        // Normally we would redirect to Flutterwave standard link or use their JS inline here
        // For standard link:
        // window.location.href = initData.data.link;
        // Since we need to verify before confirm without redirect, the standard way is to use flutterwave inline JS.
        // We'll show a prompt for the demo.
        alert('Flutterwave demo: For a complete inline integration we would load Flutterwave JS here. For now, we redirect to standard checkout.');
        window.location.href = initData.data.link; // Demo fallback
        setLoading(false);
      }
    } catch (err: any) {
      console.error(err);
      alert('Error initiating payment: ' + err.message);
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const currentAmounts = paymentMethod === 'usd' ? USD_DONATION_AMOUNTS : NGN_DONATION_AMOUNTS;
  const currencySymbol = paymentMethod === 'usd' ? '$' : '₦';

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.pexels.com/photos/5215011/pexels-photo-5215011.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Healthcare provider supporting a patient"
          className="absolute inset-0 w-full h-full object-cover"
          unoptimized={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy)]/70 to-[var(--navy)]/80" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heart size={64} className="mx-auto mb-6 text-[var(--gold)]" />
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Invest in a Generation
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Your generosity fuels education, healthcare, and hope for Nigerian communities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Donation Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h2 className="text-3xl font-serif font-bold text-[var(--navy)] mb-4 sm:mb-0">
                    Make Your Donation
                  </h2>
                  
                  {/* Currency/Payment Toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => handlePaymentMethodChange('ngn')}
                      className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                        paymentMethod === 'ngn' ? 'bg-white shadow text-[var(--navy)]' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      NGN
                    </button>
                    <button
                      onClick={() => handlePaymentMethodChange('usd')}
                      className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                        paymentMethod === 'usd' ? 'bg-white shadow text-[var(--navy)]' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      USD
                    </button>
                    <button
                      onClick={() => handlePaymentMethodChange('crypto')}
                      className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                        paymentMethod === 'crypto' ? 'bg-white shadow text-[var(--navy)]' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Crypto
                    </button>
                  </div>
                </div>

                {paymentMethod === 'crypto' ? (
                  <div className="space-y-6">
                    <p className="text-gray-600 mb-6">Select a cryptocurrency to view the wallet address and QR code.</p>
                    <div className="flex gap-4 border-b border-gray-200 pb-4">
                      <button
                        onClick={() => setCryptoType('usdt')}
                        className={`font-semibold pb-2 border-b-2 transition-colors ${
                          cryptoType === 'usdt' ? 'border-[var(--gold)] text-[var(--navy)]' : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        USDT (Base)
                      </button>
                      <button
                        onClick={() => setCryptoType('eth')}
                        className={`font-semibold pb-2 border-b-2 transition-colors ${
                          cryptoType === 'eth' ? 'border-[var(--gold)] text-[var(--navy)]' : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Ethereum (ETH)
                      </button>
                    </div>

                    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-100">
                      {qrCodeData[cryptoType] ? (
                        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-100">
                          <img src={qrCodeData[cryptoType]} alt={`${cryptoType.toUpperCase()} QR Code`} className="w-48 h-48" />
                        </div>
                      ) : (
                        <div className="w-48 h-48 bg-gray-200 animate-pulse rounded-lg mb-6 flex items-center justify-center">
                          <QrCode className="text-gray-400" size={48} />
                        </div>
                      )}
                      
                      <div className="w-full max-w-md">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">
                          {cryptoType.toUpperCase()} Address
                        </label>
                        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-3">
                          <p className="flex-1 font-mono text-sm text-gray-800 break-all">
                            {cryptoType === 'usdt' ? CRYPTO_ADDRESSES.USDT_BASE : CRYPTO_ADDRESSES.ETH}
                          </p>
                          <button
                            onClick={() => copyToClipboard(cryptoType === 'usdt' ? CRYPTO_ADDRESSES.USDT_BASE : CRYPTO_ADDRESSES.ETH, 'crypto')}
                            className="p-2 hover:bg-gray-100 rounded-md transition-colors text-gray-500 hover:text-[var(--navy)]"
                            aria-label="Copy crypto address"
                          >
                            <Copy size={18} />
                          </button>
                        </div>
                        {copied === 'crypto' && (
                          <p className="text-[var(--gold)] text-sm mt-2 text-center font-semibold">Address copied to clipboard!</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Donation Amount */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Donation Amount ({currencySymbol})
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                        {currentAmounts.map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => {
                              setValue('amount', amount);
                              setCustomAmount(null);
                            }}
                            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                              selectedAmount === amount && !customAmount
                                ? 'bg-[var(--gold)] text-[var(--navy)] ring-2 ring-[var(--gold)] ring-offset-2'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {currencySymbol}{amount.toLocaleString()}
                          </button>
                        ))}
                      </div>
                      <input
                        type="number"
                        placeholder={`Custom amount (${currencySymbol})`}
                        value={customAmount || ''}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setCustomAmount(value);
                          setValue('amount', value || 0);
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                      />
                      {errors.amount && (
                        <p className="text-red-600 text-sm mt-1">{errors.amount.message}</p>
                      )}
                    </div>

                    {/* Frequency */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Frequency
                      </label>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setValue('frequency', 'one-time')}
                          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                            frequency === 'one-time'
                              ? 'bg-[var(--navy)] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          One-time
                        </button>
                        <button
                          type="button"
                          onClick={() => setValue('frequency', 'monthly')}
                          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                            frequency === 'monthly'
                              ? 'bg-[var(--navy)] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Monthly
                        </button>
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          {...register('fullName')}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                          placeholder="John Doe"
                        />
                        {errors.fullName && (
                          <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                          placeholder="+234 800 000 0000"
                        />
                        {errors.phone && (
                          <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message (Optional)
                      </label>
                      <textarea
                        {...register('message')}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                        placeholder="Add a message with your donation..."
                      />
                    </div>

                    <div className="bg-[var(--neutral-100)] rounded-lg p-4 text-sm text-gray-600">
                      <p>You will be redirected securely to complete your payment.</p>
                    </div>

                    <button
                      type="submit"
                      disabled={submitted || loading}
                      className="w-full py-4 bg-[var(--gold)] text-[var(--navy)] rounded-lg font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={24} /> Processing...
                        </>
                      ) : submitted ? (
                        <>
                          <CheckCircle size={24} /> Thank You!
                        </>
                      ) : (
                        `Donate ${currencySymbol}${selectedAmount?.toLocaleString() || '0'}`
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Bank Details */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[var(--navy)] text-white rounded-2xl p-6"
              >
                <h3 className="text-xl font-serif font-bold mb-4">Direct Bank Transfer</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-white/70 mb-1">Bank Name</p>
                    <p className="font-semibold">{BANK_DETAILS.bank}</p>
                  </div>
                  <div>
                    <p className="text-white/70 mb-1">Account Name</p>
                    <p className="font-semibold">{BANK_DETAILS.accountName}</p>
                  </div>
                  <div>
                    <p className="text-white/70 mb-1">Account Number</p>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{BANK_DETAILS.accountNumber}</p>
                      <button
                        onClick={() => copyToClipboard(BANK_DETAILS.accountNumber, 'bank')}
                        className="p-1.5 hover:bg-white/10 rounded transition-colors"
                        aria-label="Copy account number"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                    {copied === 'bank' && (
                      <p className="text-[var(--gold)] text-xs mt-1">Copied!</p>
                    )}
                  </div>
                  <div>
                    <p className="text-white/70 mb-1">Sort Code</p>
                    <p className="font-semibold">{BANK_DETAILS.sortCode}</p>
                  </div>
                  <div className="pt-3 border-t border-white/20">
                    <p className="text-white/70 text-xs">Reference: Your Full Name</p>
                  </div>
                </div>
              </motion.div>

              {/* Why Donate */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white border-2 border-gray-100 rounded-2xl p-6"
              >
                <h3 className="text-xl font-serif font-bold text-[var(--navy)] mb-4">
                  Why Donate?
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Shield size={24} className="text-[var(--gold)] flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[var(--navy)] mb-1">Tax Benefits</h4>
                      <p className="text-sm text-gray-600">Donations are tax-deductible</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Heart size={24} className="text-[var(--gold)] flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[var(--navy)] mb-1">100% Impact</h4>
                      <p className="text-sm text-gray-600">Every naira goes directly to programs</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <TrendingUp size={24} className="text-[var(--gold)] flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[var(--navy)] mb-1">Transparent Reporting</h4>
                      <p className="text-sm text-gray-600">Annual reports and impact updates</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
