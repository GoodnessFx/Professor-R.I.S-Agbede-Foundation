/**
 * Grants application page — information + validated form
 */

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation } from 'react-router';
import { motion } from 'motion/react';

const schema = z.object({
  organisation: z.string().min(2, 'Organisation name is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  grantType: z.string(),
  projectTitle: z.string().min(3, 'Project title is required'),
  summary: z.string().min(20, 'Please provide at least 20 characters'),
  requestedAmount: z.string().min(1, 'Amount requested is required'),
  location: z.string().min(2, 'Project location is required'),
});

type FormValues = z.infer<typeof schema>;

export function GrantsApplyPage() {
  const location = useLocation();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type) setValue('grantType', type);
  }, [location.search, setValue]);

  const onSubmit = (data: FormValues) => {
    console.log('Grant application submitted', data);
    alert('Thank you. Your application has been received. Our team will respond via email.');
    reset();
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[42vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--navy)]" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-serif font-bold"
          >
            Apply for Grants
          </motion.h1>
          <p className="mt-3 text-white/90 max-w-2xl mx-auto" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            Read the guidelines and complete the form to be considered for our Annual or Discretionary grants.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 max-w-6xl">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[var(--navy)] mb-4">Eligibility & Guidelines</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Registered organisations operating in Nigeria.</li>
              <li>Projects aligned with education, healthcare, and community development.</li>
              <li>Clear implementation plan, budget, and monitoring approach.</li>
              <li>For Discretionary Grants, projects must address urgent needs with immediate impact.</li>
            </ul>
            <div className="mt-6 p-4 rounded-lg bg-[var(--neutral-100)] text-gray-800">
              Funding range varies by grant type and scope. Shortlisted applicants will be contacted for further documentation.
            </div>
          </div>
          <div className="bg-[var(--neutral-100)] rounded-xl p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Organisation</label>
                  <input {...register('organisation')} className="w-full px-3 py-2 border rounded-md" />
                  {errors.organisation && <p className="text-red-600 text-xs mt-1">{errors.organisation.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contact Name</label>
                  <input {...register('contactName')} className="w-full px-3 py-2 border rounded-md" />
                  {errors.contactName && <p className="text-red-600 text-xs mt-1">{errors.contactName.message}</p>}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" {...register('email')} className="w-full px-3 py-2 border rounded-md" />
                  {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input {...register('phone')} className="w-full px-3 py-2 border rounded-md" />
                  {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Grant Type</label>
                  <select {...register('grantType')} className="w-full px-3 py-2 border rounded-md">
                    <option value="annual-grants">Annual Grants</option>
                    <option value="discretionary">Discretionary Grants</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Requested Amount (₦)</label>
                  <input {...register('requestedAmount')} className="w-full px-3 py-2 border rounded-md" />
                  {errors.requestedAmount && <p className="text-red-600 text-xs mt-1">{errors.requestedAmount.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Project Title</label>
                <input {...register('projectTitle')} className="w-full px-3 py-2 border rounded-md" />
                {errors.projectTitle && <p className="text-red-600 text-xs mt-1">{errors.projectTitle.message}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Project Location</label>
                  <input {...register('location')} className="w-full px-3 py-2 border rounded-md" />
                  {errors.location && <p className="text-red-600 text-xs mt-1">{errors.location.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Project Summary</label>
                <textarea rows={5} {...register('summary')} className="w-full px-3 py-2 border rounded-md" />
                {errors.summary && <p className="text-red-600 text-xs mt-1">{errors.summary.message}</p>}
              </div>
              <button
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-[var(--gold)] text-[var(--navy)] rounded-md font-semibold hover:opacity-90 transition"
              >
                {isSubmitting ? 'Submitting…' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

