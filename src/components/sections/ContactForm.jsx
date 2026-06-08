import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Element } from 'react-scroll';
import { CONTACT } from '../../constants/contact';

const CONTACT_PHOTO = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1';

const ctaButtons = [
  {
    label: 'CALL NOW',
    href: CONTACT.phoneHref,
    bg: 'bg-dark',
    text: 'text-yellow',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
      </svg>
    ),
  },
  {
    label: 'WHATSAPP US',
    href: CONTACT.whatsapp,
    target: '_blank',
    bg: 'bg-green',
    text: 'text-white',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'EMAIL US',
    href: `mailto:${CONTACT.email}`,
    bg: 'bg-dark',
    text: 'text-white',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <Element name="contact">
      <section ref={ref} className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl">
            {/* Left — boiler photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative text-white p-8 md:p-12 flex flex-col justify-center overflow-hidden"
            >
              {/* Background photo as real img for browser optimisation */}
              <img
                src={`${CONTACT_PHOTO}?w=900&q=75&fm=webp`}
                srcSet={`${CONTACT_PHOTO}?w=400&q=75&fm=webp 400w, ${CONTACT_PHOTO}?w=900&q=75&fm=webp 900w`}
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="Dynomo plumbing and heating engineer at work"
                loading="eager"
                fetchPriority="high"
                width="900"
                height="628"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-dark/75" />
              <div className="relative z-10">
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">GET IN TOUCH</h2>
                <p className="font-body text-gray-300 leading-relaxed max-w-sm">
                  Available 24/7 for emergencies. Call, WhatsApp, or email — we&apos;ll get back to
                  you fast.
                </p>
              </div>
            </motion.div>

            {/* Right — yellow CTA buttons */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-yellow p-8 md:p-12 flex flex-col items-center justify-center gap-5"
            >
              {ctaButtons.map((btn, i) => (
                <motion.a
                  key={btn.label}
                  href={btn.href}
                  {...(btn.target ? { target: btn.target, rel: 'noopener noreferrer' } : {})}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full max-w-xs flex items-center justify-center gap-3 ${btn.bg} ${btn.text} rounded-pill px-8 py-4 font-body font-bold text-base uppercase tracking-widest shadow-md hover:shadow-lg transition-shadow`}
                >
                  {btn.icon}
                  {btn.label}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </Element>
  );
}
