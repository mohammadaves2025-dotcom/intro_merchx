import React, { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { siteConfig } from '@/data/site';

const ENQUIRY_TYPES = [
  'University / Institution',
  'Student Organisation',
  'Campus Club / Society',
  'Sports Team / Athletic Dept',
  'Business / Corporate Partner',
  'Investor / Incubator',
  'Other'
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    institution: '',
    email: '',
    phone: '',
    enquiryType: ENQUIRY_TYPES[0],
    message: '',
    website: '' // honeypot field
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error' | 'not_configured'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      setStatus('error');
      return;
    }

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    if (!formData.message.trim()) {
      setErrorMessage('Please enter a message regarding your enquiry.');
      setStatus('error');
      return;
    }

    // Check honeypot (silent success)
    if (formData.website) {
      setStatus('success');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setStatus('success');
        setFormData({
          fullName: '',
          institution: '',
          email: '',
          phone: '',
          enquiryType: ENQUIRY_TYPES[0],
          message: '',
          website: ''
        });
      } else if (data?.emailNotConfigured || response.status === 404) {
        // If serverless function is not active or env vars missing
        setStatus('not_configured');
      } else {
        setStatus('error');
        setErrorMessage(data?.error || 'Unable to submit enquiry. Please try again or reach out directly.');
      }
    } catch (err) {
      // In local dev without `vercel dev`, API endpoint may be unreachable
      setStatus('not_configured');
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xs p-5 sm:p-8 md:p-10 text-white max-w-2xl mx-auto shadow-2xl relative">
      <div className="h-1.5 w-full bg-green-primary absolute top-0 left-0 right-0" />

      {status === 'success' ? (
        <div className="py-12 text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-green-primary mx-auto animate-bounce" />
          <h3 className="font-heading text-3xl font-bold uppercase tracking-tight text-white">
            Enquiry Received
          </h3>
          <p className="text-neutral-300 text-sm max-w-md mx-auto leading-relaxed">
            Thank you for reaching out to MerchX. A member of our partnerships team will review your enquiry and respond within 24 to 48 business hours.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-6 px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
          >
            Send Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field (hidden from real users) */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <label htmlFor="website">Leave this field blank</label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {status === 'not_configured' && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-200 leading-relaxed">
                <p className="font-bold uppercase tracking-wider text-amber-400">
                  Email Delivery Notice
                </p>
                <p className="mt-1">
                  Messages aren't enabled yet, please email us directly at{' '}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="underline text-white font-bold hover:text-green-primary"
                  >
                    {siteConfig.email}
                  </a>.
                </p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="text-xs text-red-200 leading-relaxed">
                <p className="font-bold uppercase tracking-wider text-red-400">
                  Submission Error
                </p>
                <p className="mt-1">{errorMessage}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                Full Name <span className="text-green-primary">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Dr. Sarah Jenkins / Aryan Sharma"
                className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-4 py-3 text-sm rounded-xs text-white placeholder-neutral-600 focus:outline-none"
              />
            </div>

            {/* Institution / Organisation */}
            <div>
              <label htmlFor="institution" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                Institution / Organisation
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="e.g. Jamia Millia Islamia / Delhi University"
                className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-4 py-3 text-sm rounded-xs text-white placeholder-neutral-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                Email Address <span className="text-green-primary">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@institution.edu / name@example.com"
                className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-4 py-3 text-sm rounded-xs text-white placeholder-neutral-600 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-4 py-3 text-sm rounded-xs text-white placeholder-neutral-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Type of Enquiry */}
          <div>
            <label htmlFor="enquiryType" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
              Type of Enquiry <span className="text-green-primary">*</span>
            </label>
            <select
              id="enquiryType"
              name="enquiryType"
              value={formData.enquiryType}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-4 py-3 text-sm rounded-xs text-white focus:outline-none cursor-pointer"
            >
              {ENQUIRY_TYPES.map((type) => (
                <option key={type} value={type} className="bg-neutral-900 text-white">
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
              Message / Requirements <span className="text-green-primary">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your campus, expected collection (e.g. hoodies, polos), timeline, or partnership inquiry..."
              className="w-full bg-neutral-950 border border-neutral-700 focus:border-green-primary px-4 py-3 text-sm rounded-xs text-white placeholder-neutral-600 focus:outline-none resize-y"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-green-primary hover:bg-green-dark active:scale-[0.99] text-white font-heading text-base font-bold uppercase tracking-wider py-4 rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting Enquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Start a Conversation</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

