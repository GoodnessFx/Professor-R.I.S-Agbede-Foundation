/**
 * Contact page - Office cards, map, and contact form
 */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { useLocation } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  organisation: z.string().optional(),
  subject: z.string().min(1, 'Subject required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

const officeLocations = [
  {
    name: 'Head Office — Lagos',
    address: '22 Bode Thomas Street, Surulere,',
    city: 'Lagos State, 23401, Nigeria',
    phone: '+234 809 123 4567',
    email: 'info@agbedefoundation.org',
  },
  {
    name: 'Abuja Office',
    address: 'Plot 14, Diplomatic Zone, Maitama,',
    city: 'Abuja, FCT 900288, Nigeria',
    phone: '+234 802 345 6789',
    email: 'abuja@agbedefoundation.org',
  },
  {
    name: 'Kogi State Office',
    address: '12 Ibrahim Attah Road,',
    city: 'Lokoja, Kogi State, Nigeria',
    phone: '+234 803 456 7890',
    email: 'kogi@agbedefoundation.org',
  },
];

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();
  
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const subject = params.get('subject');
    if (subject) {
      setValue('subject', subject);
    }
  }, [location.search, setValue]);

  const onSubmit = (data: ContactForm) => {
    console.log('Contact form submitted:', data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-20">
      {/* Hero with Image Background */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80"
          alt="Nigerian community gathering"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--navy)]/70" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif', textWrap: 'balance' }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ fontFamily: 'Nunito Sans, sans-serif' }}
          >
            Get in touch with our team across Nigeria
          </motion.p>
        </div>
      </section>

      {/* Office Location Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {officeLocations.map((office, index) => (
              <motion.div
                key={office.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 
                      className="text-lg font-bold text-[var(--navy)] mb-2"
                      style={{ fontFamily: 'Libre Baskerville, serif' }}
                    >
                      {office.name}
                    </h3>
                    <p 
                      className="text-gray-600 text-sm leading-relaxed"
                      style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                    >
                      {office.address}<br />
                      {office.city}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-[var(--gold)]" />
                    <a href={`tel:${office.phone}`} className="text-gray-600 hover:text-[var(--gold)]">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={16} className="text-[var(--gold)]" />
                    <a href={`mailto:${office.email}`} className="text-gray-600 hover:text-[var(--gold)]">
                      {office.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map and Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 h-full"
            >
              <div className="relative bg-white rounded-xl overflow-hidden shadow-md h-full min-h-[520px] md:min-h-[560px]">
                {/* Map title overlay */}
                <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur px-3 py-1.5 rounded-md border border-gray-200 shadow-sm"
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  <span className="text-[var(--navy)] font-semibold">Prof. R.I.S Agbede Foundation</span>
                  <span className="text-gray-500 ml-2">• Nigeria</span>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7926689.7!2d3.3!3d9.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0baf7da48d0d%3A0x99a8fe4168c50bc8!2sNigeria!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Foundation locations across Nigeria"
                />
              </div>
              <p 
                className="text-sm text-gray-500 text-center"
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              >
                Prof. R.I.S Agbede Foundation — Serving communities across Nigeria
              </p>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-8 shadow-md"
            >
              {!submitted ? (
                <>
                  <h2 
                    className="text-3xl font-bold text-[var(--navy)] mb-2"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    Contact Us
                  </h2>
                  <p 
                    className="text-gray-600 mb-6"
                    style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '15px' }}
                  >
                    Thank you for your interest in the Foundation's work. 
                    Fill in the form and our team will respond within 48 hours.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Row 1: First Name | Last Name */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          First Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          {...register('firstName')}
                          type="text"
                          className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--navy)] focus:border-transparent"
                          style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                        />
                        {errors.firstName && (
                          <p className="text-red-600 text-xs mt-1">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Last Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          {...register('lastName')}
                          type="text"
                          className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--navy)] focus:border-transparent"
                          style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                        />
                        {errors.lastName && (
                          <p className="text-red-600 text-xs mt-1">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Email | Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Email Address <span className="text-red-600">*</span>
                        </label>
                        <input
                          {...register('email')}
                          type="email"
                          className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--navy)] focus:border-transparent"
                          style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                        />
                        {errors.email && (
                          <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Phone Number <span className="text-red-600">*</span>
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--navy)] focus:border-transparent"
                          style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                        />
                        {errors.phone && (
                          <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 3: Organisation (full width) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Your Organisation <span className="text-gray-400">(optional)</span>
                      </label>
                      <input
                        {...register('organisation')}
                        type="text"
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--navy)] focus:border-transparent"
                        style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                      />
                    </div>

                    {/* Row 4: Subject */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Subject <span className="text-red-600">*</span>
                      </label>
                      <select
                        {...register('subject')}
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--navy)] focus:border-transparent"
                        style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                      >
                        <option value="">Select a subject</option>
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Grant Application">Grant Application</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Media">Media</option>
                        <option value="Donation">Donation</option>
                        <option value="Volunteer">Volunteer</option>
                      </select>
                      {errors.subject && (
                        <p className="text-red-600 text-xs mt-1">{errors.subject.message}</p>
                      )}
                    </div>

                    {/* Row 5: Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Message <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        {...register('message')}
                        rows={5}
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--navy)] focus:border-transparent resize-none"
                        placeholder="Tell us how we can help..."
                        style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                      />
                      {errors.message && (
                        <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full px-8 py-3.5 bg-[var(--gold)] text-[var(--navy)] rounded-lg font-bold hover:bg-[var(--navy)] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                      style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                    >
                      Send Message
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
                  <h3 
                    className="text-2xl font-bold text-[var(--navy)] mb-2"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    Message Sent!
                  </h3>
                  <p 
                    className="text-gray-600"
                    style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                  >
                    We'll be in touch within 48 hours.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
