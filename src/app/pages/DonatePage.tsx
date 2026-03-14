/**
 * Donate page - Donation form and information
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'motion/react';
import { Heart, Shield, TrendingUp, CheckCircle, Copy } from 'lucide-react';
import { SectionHeader } from '../components/shared/SectionHeader';
import { BANK_DETAILS } from '../../lib/constants';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const DONATION_AMOUNTS = [5000, 20000, 50000, 100000];

const donationSchema = z.object({
  amount: z.number().min(1000, 'Minimum donation is ₦1,000'),
  frequency: z.enum(['one-time', 'monthly']),
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  message: z.string().optional(),
});

type DonationForm = z.infer<typeof donationSchema>;

export function DonatePage() {
  const [customAmount, setCustomAmount] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<DonationForm>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 5000,
      frequency: 'one-time',
    },
  });

  const selectedAmount = watch('amount');
  const frequency = watch('frequency');

  const onSubmit = (data: DonationForm) => {
    console.log('Donation submitted:', data);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.pexels.com/photos/7004906/pexels-photo-7004906.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Make a donation"
          className="absolute inset-0 w-full h-full object-cover"
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
                <h2 className="text-3xl font-serif font-bold text-[var(--navy)] mb-6">
                  Make Your Donation
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Donation Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Donation Amount
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                      {DONATION_AMOUNTS.map((amount) => (
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
                          ₦{amount.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      placeholder="Custom amount (₦)"
                      value={customAmount || ''}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setCustomAmount(value);
                        setValue('amount', value);
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
                    <p>Bank transfer details will be sent to your email upon submission.</p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitted}
                    className="w-full py-4 bg-[var(--gold)] text-[var(--navy)] rounded-lg font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitted ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle size={20} /> Thank You!
                      </span>
                    ) : (
                      'Complete Donation'
                    )}
                  </button>
                </form>
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
                        onClick={() => copyToClipboard(BANK_DETAILS.accountNumber)}
                        className="p-1.5 hover:bg-white/10 rounded transition-colors"
                        aria-label="Copy account number"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                    {copied && (
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
