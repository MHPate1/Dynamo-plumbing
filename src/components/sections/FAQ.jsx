import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Element } from 'react-scroll';

const faqs = [
  {
    q: 'Do you offer 24/7 emergency plumbing in Bolton?',
    a: "Yes. We're available 24 hours a day, 7 days a week for plumbing and heating emergencies across Bolton and the surrounding areas — including burst pipes, leaks, and complete boiler breakdowns. Call or WhatsApp us any time and we'll get to you as fast as we can.",
  },
  {
    q: 'Are you Gas Safe registered?',
    a: 'Yes. All of our gas and boiler work is carried out by Gas Safe registered engineers, so any work on your gas appliances is fully certified and safe. We can also provide landlord gas safety certificates (CP12).',
  },
  {
    q: 'How much does a boiler service or repair cost in Bolton?',
    a: 'Costs depend on the job, but we always give a clear, competitive quote before any work starts — with no hidden charges. Many of our customers tell us our prices beat other quotes they receive. Get in touch for a free, no-obligation quote.',
  },
  {
    q: 'Which areas do you cover?',
    a: "We're based in Bolton and cover the whole town plus the surrounding areas of Greater Manchester — including Bury, Wigan, Salford, Horwich, Farnworth and Westhoughton. Not sure if you're in our area? Just ask.",
  },
  {
    q: 'Which boiler brands do you install and repair?',
    a: 'We install and repair all the major boiler brands, including Worcester Bosch, Vaillant, Baxi, Ideal, Alpha and Glow-worm. We can recommend and fit the right boiler for your home and budget.',
  },
  {
    q: 'Can you install a Nest or Hive smart thermostat?',
    a: 'Yes. We install and set up Nest and Hive smart thermostats so you can control your heating from your phone and save energy. We tailor the setup to your home and how you use your heating.',
  },
];

const cardVariant = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const container = {
  animate: { transition: { staggerChildren: 0.08 } },
};

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={cardVariant} className="bg-offwhite rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 cursor-pointer"
      >
        <span className="font-heading text-base md:text-lg font-bold text-dark">{faq.q}</span>
        <span className={`text-yellow text-2xl leading-none flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} aria-hidden="true">
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm text-muted leading-relaxed px-6 pb-5">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Element name="faq">
      <section ref={ref} className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="font-body text-yellow text-xs uppercase tracking-widest mb-3">FAQs</p>
            <h2 className="section-heading">FREQUENTLY ASKED QUESTIONS</h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="initial"
            animate={inView ? 'animate' : 'initial'}
            className="flex flex-col gap-4"
          >
            {faqs.map((faq) => (
              <FaqItem key={faq.q} faq={faq} />
            ))}
          </motion.div>
        </div>
      </section>
    </Element>
  );
}
