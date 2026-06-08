import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-scroll';

export default function AreaIntro({ location }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const { area, region, neighbours, blurb } = location;

  return (
    <section ref={ref} className="bg-offwhite py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="font-body text-yellow text-xs uppercase tracking-widest mb-3">Your local engineer</p>
          <h2 className="section-heading mb-6">PLUMBING &amp; HEATING IN {area.toUpperCase()}</h2>
          <p className="font-body text-base text-muted leading-relaxed mb-6">{blurb}</p>
          <p className="font-body text-base text-muted leading-relaxed mb-8">
            Based in Bolton, we cover {area} and the surrounding {region} area — including{' '}
            {neighbours.slice(0, -1).join(', ')} and {neighbours[neighbours.length - 1]}. From a
            single dripping tap to a full heating system, every job is carried out by Gas Safe
            registered engineers and left clean and tidy.
          </p>
          <Link
            to="contact"
            smooth
            offset={-72}
            className="btn-primary cursor-pointer inline-block"
          >
            GET A FREE QUOTE IN {area.toUpperCase()}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
