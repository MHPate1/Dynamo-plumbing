import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Element } from 'react-scroll';
import { CONTACT } from '../../constants/contact';

const inputClass =
  'bg-white/30 border border-white/40 rounded-full px-5 py-3 w-full text-dark placeholder-dark/50 focus:outline-none focus:ring-2 focus:ring-dark/20 font-body text-sm';

export default function ContactForm() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const [lastSubmit, setLastSubmit] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const now = Date.now();
    if (now - lastSubmit < 20000) {
      alert('Please wait 20 seconds between submissions.');
      return;
    }
    if (data._gotcha) return; // honeypot

    setIsSubmitting(true);
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_first: data.firstName,
            from_last: data.lastName,
            from_email: data.email,
            from_phone: data.phone,
            service_needed: data.service,
            heard_from: data.heardFrom,
            to_email: CONTACT.email,
          },
          publicKey,
        );
      }

      setSubmitSuccess(true);
      setLastSubmit(now);
      reset();
      setTimeout(() => setSubmitSuccess(false), 6000);
    } catch {
      alert('There was a problem sending your message. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Element name="contact">
      <section ref={ref} className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl">
            {/* Left – dark photo side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative text-white p-8 md:p-12 flex flex-col justify-center overflow-hidden"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-dark/75" />
              <div className="relative z-10">
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">GET IN TOUCH</h2>
                <p className="font-body text-gray-300 leading-relaxed mb-8 max-w-sm">
                  Get in touch for reliable boiler repairs, services, and installations. We&apos;re here
                  to help with all your needs.
                </p>

                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-3 mb-6 group"
                >
                  <span className="text-yellow text-2xl">📞</span>
                  <span className="font-body text-2xl font-semibold group-hover:text-yellow transition-colors">
                    {CONTACT.phone}
                  </span>
                </a>

                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green text-white px-6 py-3 rounded-pill font-body font-semibold text-sm hover:brightness-110 transition-all uppercase tracking-wide w-fit"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Right – yellow form side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-yellow p-8 md:p-12"
            >
              {submitSuccess ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 bg-dark rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-heading text-dark text-2xl font-bold mb-2">THANK YOU!</p>
                  <p className="font-body text-dark/80">We&apos;ll be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                  <h3 className="font-heading text-dark text-2xl font-bold mb-2">SEND A MESSAGE</h3>

                  {/* Honeypot */}
                  <input
                    type="text"
                    {...register('_gotcha')}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        {...register('firstName', { required: 'First name is required' })}
                        placeholder="First Name"
                        className={inputClass}
                      />
                      {errors.firstName && (
                        <p className="text-red-700 text-xs mt-1 pl-2">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <input
                        {...register('lastName', { required: 'Last name is required' })}
                        placeholder="Last Name"
                        className={inputClass}
                      />
                      {errors.lastName && (
                        <p className="text-red-700 text-xs mt-1 pl-2">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Please enter a valid email address',
                        },
                      })}
                      placeholder="Email Address"
                      type="email"
                      className={inputClass}
                    />
                    {errors.email && (
                      <p className="text-red-700 text-xs mt-1 pl-2">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^(?:\+44|0)[0-9\s\-()]{9,}$/,
                          message: 'Please enter a valid UK phone number',
                        },
                      })}
                      placeholder="Phone Number"
                      type="tel"
                      className={inputClass}
                    />
                    {errors.phone && (
                      <p className="text-red-700 text-xs mt-1 pl-2">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Service */}
                  <div>
                    <select
                      {...register('service', { required: true })}
                      className={inputClass}
                      defaultValue=""
                    >
                      <option value="" disabled>What service do you need?</option>
                      <option>Boiler Install</option>
                      <option>Boiler Repair</option>
                      <option>Gas Safety Check</option>
                      <option>Emergency Plumbing</option>
                      <option>Central Heating</option>
                      <option>Thermostat Installation</option>
                      <option>Underfloor Heating</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Heard from */}
                  <div>
                    <select
                      {...register('heardFrom', { required: true })}
                      className={inputClass}
                      defaultValue=""
                    >
                      <option value="" disabled>Where did you hear about us?</option>
                      <option>Google</option>
                      <option>Facebook</option>
                      <option>Instagram</option>
                      <option>Referral</option>
                      <option>Checkatrade</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-dark text-yellow font-body font-semibold rounded-pill px-10 py-3 mt-2 hover:bg-charcoal transition-all disabled:opacity-60 cursor-pointer uppercase tracking-wide text-sm"
                  >
                    {isSubmitting ? 'SENDING…' : 'SEND MESSAGE'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </Element>
  );
}
