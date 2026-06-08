import { motion } from 'framer-motion';
import { Link, Element } from 'react-scroll';
import { CONTACT } from '../../constants/contact';
import baxiBg from '../../assets/baxi.png';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
});

export default function LocationHero({ location }) {
  const { area } = location;
  return (
    <Element name="hero">
      <div className="relative min-h-screen bg-dark flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${baxiBg})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(26,26,26,0.45) 0%, rgba(26,26,26,0.65) 50%, rgba(26,26,26,0.90) 100%)',
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-3xl w-full">
          <motion.p {...fadeUp(0)} className="font-body text-yellow text-sm uppercase tracking-widest mb-4">
            Gas Safe Registered · Worcester Bosch Accredited
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5"
          >
            PLUMBER &amp; HEATING ENGINEER IN {area.toUpperCase()}
          </motion.h1>

          <motion.p {...fadeUp(0.25)} className="font-body text-lg md:text-xl text-gray-300 mb-10">
            Premium boiler installation, repair &amp; central heating in {area} — clean, reliable
            and fully guaranteed. Available 24/7 for emergencies.
          </motion.p>

          <motion.div
            {...fadeUp(0.4)}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="contact"
              smooth
              offset={-72}
              className="btn-primary h-14 px-10 text-base cursor-pointer inline-flex items-center justify-center"
            >
              GET A FREE QUOTE
            </Link>
            <a
              href={CONTACT.phoneHref}
              className="btn-outline h-14 px-10 text-base inline-flex items-center justify-center"
            >
              {CONTACT.phone}
            </a>
          </motion.div>
        </div>

        <Link to="services" smooth offset={-72} className="cursor-pointer absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-yellow text-3xl select-none"
            aria-hidden="true"
          >
            ↓
          </motion.div>
        </Link>
      </div>
    </Element>
  );
}
