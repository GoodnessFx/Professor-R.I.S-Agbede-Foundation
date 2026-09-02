/**
 * Donate page — Flutterwave inline checkout (NGN & USD)
 *
 * ENV VARS required (set in Vercel / GitHub Actions secrets):
 *   VITE_FLUTTERWAVE_PUBLIC_KEY   — Flutterwave public key
 *   VITE_EMAILJS_SERVICE_ID       — EmailJS service ID  (admin notification)
 *   VITE_EMAILJS_TEMPLATE_ID      — EmailJS template ID (admin notification)
 *   VITE_EMAILJS_PUBLIC_KEY       — EmailJS public key  (admin notification)
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Shield, TrendingUp, CheckCircle, Copy, Loader2, AlertTriangle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { BANK_DETAILS_NGN, BANK_DETAILS_USD } from '../../lib/constants';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// ─── Preset amounts ──────────────────────────────────────────────────────────
const NGN_PRESET_AMOUNTS = [5_000, 10_000, 50_000, 100_000];
const USD_PRESET_AMOUNTS = [10, 25, 50, 100];

// ─── Form schema ─────────────────────────────────────────────────────────────
const donationSchema = z.object({
  amount: z.number().min(1, 'Please enter a valid amount'),
  frequency: z.enum(['one-time', 'monthly']),
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  message: z.string().optional(),
});

type DonationForm = z.infer<typeof donationSchema>;
type Currency = 'NGN' | 'USD';
type AmountMode = 'preset' | 'custom'; // which input source is active

// ─── Env-variable guard ───────────────────────────────────────────────────────
const FLW_PUBLIC_KEY = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY as string | undefined;

// Detect obviously bad values baked in from a missing secret
const isMissingKey = !FLW_PUBLIC_KEY ||
  FLW_PUBLIC_KEY === 'undefined' ||
  FLW_PUBLIC_KEY.trim() === '' ||
  FLW_PUBLIC_KEY.startsWith('FLWPUBK_TEST-xxx');

// ─── Admin notification (client-side via EmailJS) ─────────────────────────────
async function sendAdminNotification(params: {
  donorName: string;
  email: string;
  amount: number;
  currency: string;
  message: string;
  txRef: string;
}) {
  const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string | undefined;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
  const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string | undefined;

  if (!serviceId || !templateId || !publicKey) {
    // EmailJS not configured — log and skip silently (donation already succeeded)
    console.warn('[Admin notification] EmailJS env vars missing — skipping notification.');
    return;
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        donor_name: params.donorName,
        donor_email: params.email,
        amount: `${params.currency === 'NGN' ? '₦' : '$'}${params.amount.toLocaleString()}`,
        currency: params.currency,
        donor_message: params.message || '—',
        tx_ref: params.txRef,
      },
      publicKey,
    );
  } catch (err) {
    // Never surface to donor — this is internal only
    console.error('[Admin notification] EmailJS send failed:', err);
  }
}

// ─── Component ───────────────────────────────────────────────────────────────
export function DonatePage() {
  const [currency, setCurrency]       = useState<Currency>('NGN');
  const [amountMode, setAmountMode]   = useState<AmountMode>('preset');
  const [presetAmount, setPresetAmount] = useState<number>(NGN_PRESET_AMOUNTS[0]);
  const [customInput, setCustomInput]  = useState('');
  const [loading, setLoading]          = useState(false);
  const [copied, setCopied]            = useState(false);

  // Donation success state — holds data to show the thank-you screen
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
    defaultValues: {
      amount: NGN_PRESET_AMOUNTS[0],
      frequency: 'one-time',
    },
  });

  const frequency = watch('frequency');

  // ── Currency toggle ────────────────────────────────────────────────────────
  const handleCurrencyChange = (c: Currency) => {
    setCurrency(c);
    setAmountMode('preset');
    setCustomInput('');
    const defaultAmount = c === 'NGN' ? NGN_PRESET_AMOUNTS[0] : USD_PRESET_AMOUNTS[0];
    setPresetAmount(defaultAmount);
    setValue('amount', defaultAmount);
  };

  // ── Preset button click ────────────────────────────────────────────────────
  const handlePresetClick = (amount: number) => {
    setAmountMode('preset');
    setPresetAmount(amount);
    setCustomInput(''); // clear custom input visually
    setValue('amount', amount);
  };

  // ── Custom input change ────────────────────────────────────────────────────
  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setCustomInput(raw);
    setAmountMode('custom');
    const parsed = parseFloat(raw);
    setValue('amount', isNaN(parsed) ? 0 : parsed);
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const onSubmit = async (data: DonationForm) => {
    // Guard: missing public key — show actionable error to site owner
    if (isMissingKey) {
      alert(
        'SITE OWNER ACTION REQUIRED:\n\n' +
        'The Flutterwave public key (VITE_FLUTTERWAVE_PUBLIC_KEY) is missing or not set.\n\n' +
        'Fix: Add it as a GitHub Actions secret (or Vercel env var) and redeploy.\n\n' +
        'Donors cannot pay until this is resolved.'
      );
      return;
    }

    const FlutterwaveCheckout = (window as any).FlutterwaveCheckout;

    if (!FlutterwaveCheckout) {
      alert(
        'Payment system failed to load.\n\n' +
        'This usually means the Flutterwave script was blocked by an ad-blocker or ' +
        'network issue. Please disable any ad-blockers and refresh the page, then try again.'
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
          frequency: data.frequency,
        },
        callback: async (payment: any) => {
          // Flutterwave calls this on successful payment
          setLoading(false);

          if (payment.status === 'successful' || payment.status === 'completed') {
            // Show donor success screen
            setSuccessData({
              name: data.fullName,
              amount: data.amount,
              currency,
            });

            // Fire admin notification (non-blocking — donor never sees this)
            sendAdminNotification({
              donorName: data.fullName,
              email: data.email,
              amount: data.amount,
              currency,
              message: data.message || '',
              txRef: tx_ref,
            });

            // Reset form silently in background
            setTimeout(() => {
              reset();
              setAmountMode('preset');
              setCustomInput('');
              const defaultAmt = currency === 'NGN' ? NGN_PRESET_AMOUNTS[0] : USD_PRESET_AMOUNTS[0];
              setPresetAmount(defaultAmt);
              setValue('amount', defaultAmt);
            }, 500);
          } else {
            alert('Payment was not completed. No money has been deducted. Please try again.');
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
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const currentAmounts  = currency === 'USD' ? USD_PRESET_AMOUNTS : NGN_PRESET_AMOUNTS;
  const currencySymbol  = currency === 'USD' ? '$' : '₦';
  const bankDetails     = currency === 'USD' ? BANK_DETAILS_USD : BANK_DETAILS_NGN;

  // Displayed amount for the donate button label
  const displayAmount =
    amountMode === 'preset'
      ? presetAmount
      : parseFloat(customInput) || 0;

  // ── Success screen ─────────────────────────────────────────────────────────
  if (successData) {
    const symbol = successData.currency === 'USD' ? '$' : '₦';
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
              {symbol}{successData.amount.toLocaleString()} {successData.currency}
            </span>{' '}
            has been received.
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

  // ── Main page ──────────────────────────────────────────────────────────────
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

      {/* Missing key banner — visible to site owner only during testing */}
      {isMissingKey && (
        <div className="bg-amber-50 border-l-4 border-amber-400 px-6 py-4 flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <strong>Site owner:</strong> The Flutterwave public key (
            <code className="bg-amber-100 px-1 rounded">VITE_FLUTTERWAVE_PUBLIC_KEY</code>) is
            not set. Donations will not process until you add it as a GitHub Actions / deployment
            secret and redeploy.
          </p>
        </div>
      )}

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* ── Donation Form ─────────────────────────────────────────── */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg"
              >
                {/* Header + Currency toggle */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h2 className="text-3xl font-serif font-bold text-[var(--navy)] mb-4 sm:mb-0">
                    Make Your Donation
                  </h2>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => handleCurrencyChange('NGN')}
                      className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                        currency === 'NGN'
                          ? 'bg-white shadow text-[var(--navy)]'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      ₦ NGN
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCurrencyChange('USD')}
                      className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                        currency === 'USD'
                          ? 'bg-white shadow text-[var(--navy)]'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      $ USD
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                  {/* ── Amount selection ─────────────────────────────────── */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Donation Amount ({currencySymbol})
                    </label>

                    {/* Preset buttons */}
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

                      {/* "Other" button — activates custom input */}
                      <button
                        type="button"
                        onClick={() => {
                          setAmountMode('custom');
                          setCustomInput('');
                          setValue('amount', 0);
                          // Focus the input after a tick
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

                    {/* Custom amount input — only enabled when "Other" is active */}
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
                            autoFocus
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {errors.amount && (
                      <p className="text-red-600 text-sm mt-1">{errors.amount.message}</p>
                    )}
                  </div>

                  {/* ── Frequency ────────────────────────────────────────── */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Frequency
                    </label>
                    <div className="flex gap-4">
                      {(['one-time', 'monthly'] as const).map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setValue('frequency', f)}
                          className={`flex-1 py-3 px-6 rounded-lg font-semibold capitalize transition-all duration-300 ${
                            frequency === f
                              ? 'bg-[var(--navy)] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {f === 'one-time' ? 'One-time' : 'Monthly'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ── Personal information ─────────────────────────────── */}
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
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                      placeholder="Add a message with your donation..."
                    />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 flex items-start gap-2">
                    <Shield size={16} className="text-[var(--gold)] flex-shrink-0 mt-0.5" />
                    <p>
                      Payments are processed securely via Flutterwave. Pay by card, bank transfer,
                      or USSD — no account required.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[var(--gold)] text-[var(--navy)] rounded-lg font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={24} />
                        Processing...
                      </>
                    ) : (
                      `Donate ${currencySymbol}${displayAmount > 0 ? displayAmount.toLocaleString() : '...'}`
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* ── Sidebar ───────────────────────────────────────────────── */}
            <div className="space-y-6">

              {/* Bank details — switches with currency toggle */}
              <motion.div
                key={currency} // re-animate when currency changes
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
                  <div className="pt-3 border-t border-white/20 text-white/60 text-xs">
                    Reference: Your Full Name
                  </div>
                </div>

                {/* Subtle toggle hint */}
                <p className="mt-4 text-white/40 text-xs">
                  Switch to {currency === 'NGN' ? 'USD' : 'NGN'} above to see the{' '}
                  {currency === 'NGN' ? 'USD' : 'NGN'} account details.
                </p>
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
