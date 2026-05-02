import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Element } from 'react-scroll';

const testimonials = [
  {
    title: 'Excellent service from start to finish',
    body: 'Spoke to Siraj — he was friendly, arranged to visit the property within a few hours, and sorted everything to a high standard. I would not hesitate to request his services again.',
    author: 'Harry Featherstone',
    location: 'Bolton',
    date: '9 months ago',
  },
  {
    title: 'Worcester Bosch boiler replacement',
    body: 'Engineer came when he said he would and was polite and very friendly. He explained what needed doing and how much it would cost. Price was very competitive compared to other quotes I had received. A pleasure to have in the house.',
    author: 'Ilyas Dhan',
    location: 'Bolton',
    date: '5 years ago',
  },
  {
    title: 'Central heating repair',
    body: 'Rang Siraj when I had a problem with the central heating, he sorted it out over the phone and didn\'t charge me. Then booked a basic service — professional, explained everything he was doing. Would definitely recommend.',
    author: 'Shoaib B',
    location: 'Bolton',
    date: '3 years ago',
  },
  {
    title: 'New boiler fitted quickly and cleanly',
    body: 'Boiler broke down Wednesday, Dynomo came out Thursday and had a new boiler fitted Monday lunchtime. Siraj came out at 7am to suit us and even came back at 9pm to show us how to use it. House was left clean and tidy.',
    author: 'Dean Whittle',
    location: 'Bolton',
    date: '5 years ago',
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
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
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
