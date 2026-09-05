/**
 * Donate page — Flutterwave inline checkout (NGN & USD)
 *
 * Payment flow:
 *  1. Client opens Flutterwave modal with public key (safe to expose)
 *  2. Flutterwave calls callback({ transaction_id, status, ... }) in the browser
 *  3. Client POSTs { transaction_id, expected_amount, expected_currency, ... }
 *     to /api/flutterwave/verify  ← Vercel serverless function
 *  4. Server verifies with Flutterwave using the SECRET key, checks amount &
 *     currency match, and sends the admin notification
 *  5. Client shows success screen only when the server returns { success: true }
 *
 * Required env vars (GitHub Actions secrets → injected at Vite build time):
 *   VITE_FLUTTERWAVE_PUBLIC_KEY
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Shield, TrendingUp, CheckCircle, Copy, Loader2 } from 'lucide-react';
import { BANK_DETAILS_NGN, BANK_DETAILS_USD } from '../../lib/constants';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// ─── Preset amounts ───────────────────────────────────────────────────────────
const NGN_PRESET_AMOUNTS = [50_000, 100_000, 500_000, 1_000_000];
const USD_PRESET_AMOUNTS = [10, 25, 50, 100];

// ─── Form schema ──────────────────────────────────────────────────────────────
const donationSchema = z.object({
  amount: z.number().min(1, 'Please enter a valid amount'),
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  message: z.string().optional(),
});

type DonationForm = z.infer<typeof donationSchema>;
type Currency = 'NGN' | 'USD';
type AmountMode = 'preset' | 'custom';
type PaymentProvider = 'flutterwave' | 'paystack';

// ─── Public keys ─────────────────────────────────────────────────────────────
// Prefer the env vars (set in your host environment variables dashboard).
// The public keys are safe to expose in the browser; secret keys are never put here.
const FLW_PUBLIC_KEY =
  (import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY as string | undefined) ||
  'FLWPUBK-039b11e5fdad47ae5daa6d31b415bc58-X';

const PAYSTACK_PUBLIC_KEY =
  (import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string | undefined) ||
  '';

const isMissingKey = false; // fallback keys are kept for convenience; key absence is usually a host config issue.

// ─── Component ────────────────────────────────────────────────────────────────
export function DonatePage() {
  const [currency, setCurrency]         = useState<Currency>('NGN');
  const [amountMode, setAmountMode]     = useState<AmountMode>('preset');
  const [presetAmount, setPresetAmount] = useState<number>(NGN_PRESET_AMOUNTS[0]);
  const [customInput, setCustomInput]   = useState('');
  const [loading, setLoading]           = useState(false);
  const [copied, setCopied]             = useState(false);
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>('flutterwave');

  // Holds verified payment data — rendering this means the server confirmed success
  const [successData, setSuccessData] = useState<{
    name: string;
    amount: number;
    currency: Currency;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<DonationForm>({
    resolver: zodResolver(donationSchema),
    defaultValues: { amount: NGN_PRESET_AMOUNTS[0] },
  });

  // ── Currency toggle ──────────────────────────────────────────────────────
  const handleCurrencyChange = (c: Currency) => {
    setCurrency(c);
    setAmountMode('preset');
    setCustomInput('');
    const def = c === 'NGN' ? NGN_PRESET_AMOUNTS[0] : USD_PRESET_AMOUNTS[0];
    setPresetAmount(def);
    setValue('amount', def);
  };

  // ── Preset click ─────────────────────────────────────────────────────────
  const handlePresetClick = (amount: number) => {
    setAmountMode('preset');
    setPresetAmount(amount);
    setCustomInput('');
    setValue('amount', amount);
  };

  // ── Custom input ─────────────────────────────────────────────────────────
  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomInput(e.target.value);
    setAmountMode('custom');
    const parsed = parseFloat(e.target.value);
    setValue('amount', isNaN(parsed) ? 0 : parsed);
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const onSubmit = async (data: DonationForm) => {
    if (paymentProvider === 'flutterwave') {
      if (isMissingKey) {
        alert(
          'SITE OWNER ACTION REQUIRED:\n\n' +
          'VITE_FLUTTERWAVE_PUBLIC_KEY is missing or not set.\n\n' +
          'Add it as a GitHub Actions / Vercel environment variable and redeploy.',
        );
        return;
      }

      const FlutterwaveCheckout = (window as any).FlutterwaveCheckout;
      if (!FlutterwaveCheckout) {
        alert(
          'Payment system failed to load.\n' +
          'Please disable any ad-blockers, refresh the page, and try again.',
        );
        return;
      }

      setLoading(true);
      const tx_ref = `don-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;

      try {
        FlutterwaveCheckout({
          public_key: FLW_PUBLIC_KEY,
          tx_ref,
          amount: data.amount,
          currency,
          payment_options: 'card, banktransfer, ussd, mobilemoney',
          customer: {
            email: data.email,
            phone_number: data.phone,
            name: data.fullName,
          },
          customizations: {
            title: 'Prof. R.I.S. Agbede Foundation',
            description: 'Donation',
            logo: `${window.location.origin}/images/Professor%20logo.png`,
          },
          meta: {
            donor_message: data.message || '',
          },
          callback: async (payment: any) => {
            if (!payment.transaction_id) {
              setLoading(false);
              alert('Payment could not be confirmed. Please contact us if money was deducted.');
              return;
            }

            setLoading(true);

            try {
              const res = await fetch('/api/flutterwave/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  transaction_id: payment.transaction_id,
                  expected_amount: data.amount,
                  expected_currency: currency,
                  tx_ref,
                  donor_name: data.fullName,
                  donor_email: data.email,
                  donor_message: data.message || '',
                }),
              });

              const result = await res.json();

              if (res.ok && result.success) {
                setSuccessData({
                  name: data.fullName,
                  amount: data.amount,
                  currency,
                });
                setTimeout(() => {
                  reset();
                  setAmountMode('preset');
                  setCustomInput('');
                  const def = currency === 'NGN' ? NGN_PRESET_AMOUNTS[0] : USD_PRESET_AMOUNTS[0];
                  setPresetAmount(def);
                  setValue('amount', def);
                }, 500);
              } else {
                alert(
                  result.error ||
                  'Payment verification failed. Please contact us if money was deducted.',
                );
              }
            } catch (err) {
              console.error('[verify]', err);
              alert('Could not reach the verification server. Please contact us if money was deducted.');
            } finally {
              setLoading(false);
            }
          },
          onclose: () => {
            setLoading(false);
          },
        });
      } catch (err: any) {
        console.error(err);
        alert(err.message || 'Error initiating payment. Please try again.');
        setLoading(false);
      }
      return;
    }

    // ── Paystack flow ───────────────────────────────────────────────────────
    if (!PAYSTACK_PUBLIC_KEY) {
      alert('SITE OWNER ACTION REQUIRED:\n\nVITE_PAYSTACK_PUBLIC_KEY is missing or not set.');
      return;
    }

    const waitForScript = () => new Promise<void>((resolve, reject) => {
      if ((window as any).PaystackPop && typeof (window as any).PaystackPop.setup === 'function') {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => {
        if ((window as any).PaystackPop && typeof (window as any).PaystackPop.setup === 'function') {
          resolve();
          return;
        }
        reject(new Error('Paystack script loaded but did not initialize correctly.'));
      };
      script.onerror = () => reject(new Error('Paystack script failed to load'));
      document.body.appendChild(script);
    });

    try {
      setLoading(true);
      await waitForScript();

      const ref = `don-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
      const paystack = (window as any).PaystackPop;

      if (!paystack || typeof paystack.setup !== 'function') {
        throw new Error('Paystack did not initialize correctly.');
      }

      const handler = paystack.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: data.email,
        amount: Math.round(data.amount * 100),
        currency,
        ref,
        firstname: data.fullName.split(' ')[0],
        lastname: data.fullName.split(' ').slice(1).join(' ') || 'Donor',
        metadata: {
          custom_fields: [
            {
              display_name: 'Donation message',
              variable_name: 'donation_message',
              value: data.message || '',
            },
          ],
        },
        channels: ['card', 'bank', 'ussd', 'mobile_money'],
        label: 'Prof. R.I.S. Agbede Foundation',
        onClose: function () {
          setLoading(false);
        },
        callback: function (response: { reference: string }) {
          fetch('/api/paystack/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              reference: response.reference,
              expected_amount: data.amount,
              expected_currency: currency,
              donor_name: data.fullName,
              donor_email: data.email,
              donor_message: data.message || '',
              tx_ref: ref,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.success) {
                setSuccessData({
                  name: data.fullName,
                  amount: data.amount,
                  currency,
                });
                setTimeout(() => {
                  reset();
                  setAmountMode('preset');
                  setCustomInput('');
                  const def = currency === 'NGN' ? NGN_PRESET_AMOUNTS[0] : USD_PRESET_AMOUNTS[0];
                  setPresetAmount(def);
                  setValue('amount', def);
                }, 500);
              } else {
                alert(result.error || 'Paystack verification failed. Please contact us if money was deducted.');
              }
            })
            .catch((err) => {
              console.error('[paystack-verify]', err);
              alert('Could not verify the Paystack payment. Please contact us if money was deducted.');
            })
            .finally(() => setLoading(false));
        },
      });

      handler.openIframe();
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Paystack payment could not be initiated. Please try again.');
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const currentAmounts = currency === 'USD' ? USD_PRESET_AMOUNTS : NGN_PRESET_AMOUNTS;
  const currencySymbol = currency === 'USD' ? '$' : '₦';
  const bankDetails    = currency === 'USD' ? BANK_DETAILS_USD : BANK_DETAILS_NGN;

  const displayAmount =
    amountMode === 'preset' ? presetAmount : parseFloat(customInput) || 0;

  // ── Success screen ───────────────────────────────────────────────────────
  if (successData) {
    const sym = successData.currency === 'USD' ? '$' : '₦';
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-white px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
          className="max-w-md w-full text-center bg-white border-2 border-gray-100 rounded-2xl p-10 shadow-xl"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={48} className="text-green-500" />
            </div>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[var(--navy)] mb-3">
            Thank you, {successData.name.split(' ')[0]}!
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Your donation of{' '}
            <span className="font-bold text-[var(--navy)]">
              {sym}{successData.amount.toLocaleString()} {successData.currency}
            </span>{' '}
            has been received and verified.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            A confirmation will be sent to your email. The Prof. R.I.S. Agbede Foundation is
            deeply grateful for your generosity.
          </p>
          <button
            onClick={() => setSuccessData(null)}
            className="w-full py-3 bg-[var(--gold)] text-[var(--navy)] rounded-lg font-bold hover:scale-[1.02] transition-all duration-300 shadow"
          >
            Make Another Donation
          </button>
        </motion.div>
      </div>
    );
  }

  // ── Main page ────────────────────────────────────────────────────────────
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
              Invest in a life
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Your generosity fuels education, healthcare, and hope for Nigerian communities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* ── Form ──────────────────────────────────────────────────── */}
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
                  {/* Currency toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    {(['NGN', 'USD'] as Currency[]).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => handleCurrencyChange(c)}
                        className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                          currency === c
                            ? 'bg-white shadow text-[var(--navy)]'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {c === 'NGN' ? '₦ NGN' : '$ USD'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Provider</label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {(['flutterwave', 'paystack'] as PaymentProvider[]).map((provider) => (
                      <button
                        key={provider}
                        type="button"
                        onClick={() => setPaymentProvider(provider)}
                        className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                          paymentProvider === provider
                            ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--navy)] shadow-sm'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {provider === 'flutterwave' ? 'Flutterwave' : 'Paystack'}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Donation Amount ({currencySymbol})
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                      {currentAmounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => handlePresetClick(amount)}
                          className={`py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                            amountMode === 'preset' && presetAmount === amount
                              ? 'bg-[var(--gold)] text-[var(--navy)] ring-2 ring-[var(--gold)] ring-offset-2'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {currencySymbol}{amount.toLocaleString()}
                        </button>
                      ))}
                      {/* Other — activates custom field */}
                      <button
                        type="button"
                        onClick={() => {
                          setAmountMode('custom');
                          setCustomInput('');
                          setValue('amount', 0);
                          setTimeout(() => {
                            (document.getElementById('custom-amount-input') as HTMLInputElement | null)?.focus();
                          }, 50);
                        }}
                        className={`py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                          amountMode === 'custom'
                            ? 'bg-[var(--gold)] text-[var(--navy)] ring-2 ring-[var(--gold)] ring-offset-2'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Other
                      </button>
                    </div>
                    <AnimatePresence>
                      {amountMode === 'custom' && (
                        <motion.div
                          key="custom-input"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <input
                            id="custom-amount-input"
                            type="number"
                            min="1"
                            placeholder={`Enter amount (${currencySymbol})`}
                            value={customInput}
                            onChange={handleCustomChange}
                            className="w-full px-4 py-3 border-2 border-[var(--gold)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)] mt-1"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {errors.amount && (
                      <p className="text-red-600 text-sm mt-1">{errors.amount.message}</p>
                    )}
                  </div>

                  {/* Personal info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        {...register('fullName')}
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                      />
                      {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="+234 800 000 0000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                      />
                      {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
                    <textarea
                      {...register('message')}
                      rows={3}
                      placeholder="Add a message with your donation..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 flex items-start gap-2">
                    <Shield size={16} className="text-[var(--gold)] flex-shrink-0 mt-0.5" />
                    <p>
                      Payments are processed securely via Paystack. Pay by card, bank transfer, or USSD - no account required.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[var(--gold)] text-[var(--navy)] rounded-lg font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <><Loader2 className="animate-spin" size={24} /> Processing...</>
                    ) : (
                      `Donate ${currencySymbol}${displayAmount > 0 ? displayAmount.toLocaleString() : '...'}`
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* ── Sidebar ───────────────────────────────────────────────── */}
            <div className="space-y-6">

              {/* Bank details — switches with currency */}
              <motion.div
                key={currency}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[var(--navy)] text-white rounded-2xl p-6"
              >
                <h3 className="text-xl font-serif font-bold mb-1">Direct Bank Transfer</h3>
                <p className="text-white/60 text-xs mb-4 uppercase tracking-wide">
                  {bankDetails.currency} account
                </p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-white/70 mb-1">Bank Name</p>
                    <p className="font-semibold">{bankDetails.bank}</p>
                  </div>
                  <div>
                    <p className="text-white/70 mb-1">Account Name</p>
                    <p className="font-semibold">{bankDetails.accountName}</p>
                  </div>
                  <div>
                    <p className="text-white/70 mb-1">Account Number</p>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold font-mono tracking-widest">
                        {bankDetails.accountNumber}
                      </p>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(bankDetails.accountNumber)}
                        className="p-1.5 hover:bg-white/10 rounded transition-colors"
                        aria-label="Copy account number"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                    <AnimatePresence>
                      {copied && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-[var(--gold)] text-xs mt-1"
                        >
                          Copied!
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <p className="mt-4 text-white/40 text-xs">
                  Switch to {currency === 'NGN' ? 'USD' : 'NGN'} above to see the{' '}
                  {currency === 'NGN' ? 'USD' : 'NGN'} account details.
                </p>
              </motion.div>

              {/* Why donate */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white border-2 border-gray-100 rounded-2xl p-6"
              >
                <h3 className="text-xl font-serif font-bold text-[var(--navy)] mb-4">Why Donate?</h3>
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
