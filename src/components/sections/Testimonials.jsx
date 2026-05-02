import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Element } from 'react-scroll';

const testimonials = [
  {
    title: 'New gas boiler installation',
    body: "Engineer arrived exactly on time, professional and tidy. Couldn't be happier with the service.",
    author: 'Sarah M.',
    location: 'Carlisle',
    date: 'March 2025',
  },
  {
    title: 'Emergency call out',
    body: 'Called at 11pm with no heating. Engineer arrived within the hour. Absolute lifesaver.',
    author: 'James T.',
    location: 'Carlisle',
    date: 'January 2025',
  },
  {
    title: 'Boiler replacement',
    body: 'The installation was carried out efficiently, on time, and the engineer explained everything clearly.',
    author: 'Donald W.',
    location: 'Carlisle',
    date: 'February 2025',
  },
];

const container = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <Element name="testimonials">
      <section ref={ref} className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-heading text-center mb-12"
          >
            JOIN THE THOUSANDS WHO ALREADY TRUST US
          </motion.h2>

          <motion.div
            variants={container}
            initial="initial"
            animate={inView ? 'animate' : 'initial'}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {testimonials.map((t, idx) => (
              <motion.div key={idx} variants={cardVariant} className="bg-offwhite rounded-xl p-6 flex flex-col">
                {/* Stars */}
                <div className="flex gap-0.5 mb-3" aria-label="5 stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-green-500 text-xl">★</span>
                  ))}
                </div>
                <h3 className="font-body font-bold text-base text-dark mb-2">{t.title}</h3>
                <p className="font-body text-sm text-muted leading-relaxed flex-1">{t.body}</p>
                <p className="font-body text-xs text-muted mt-4">
                  <span className="font-semibold text-dark">{t.author}</span>, {t.location} · {t.date}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Trustpilot-style badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-3 bg-offwhite border border-gray-200 px-6 py-4 rounded-xl">
              <span className="text-green-500 text-3xl leading-none">★</span>
              <div>
                <p className="font-heading text-sm font-bold text-dark uppercase tracking-wide">Excellent</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-green-500 text-xs">★</span>
                  ))}
                  <span className="font-body text-xs text-muted ml-1">Based on our reviews</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Element>
  );
}
