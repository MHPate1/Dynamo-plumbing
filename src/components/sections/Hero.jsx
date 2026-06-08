import { motion } from 'framer-motion';
import { Link, Element } from 'react-scroll';
import { CONTACT } from '../../constants/contact';
import baxiBg from '../../assets/baxi.png';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
});

export default function Hero() {
  return (
    <Element name="hero">
      <div className="relative min-h-screen bg-dark flex flex-col items-center justify-center overflow-hidden">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${baxiBg})` }}
        />

        {/* Dark gradient overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(26,26,26,0.45) 0%, rgba(26,26,26,0.65) 50%, rgba(26,26,26,0.90) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl w-full">
          {/* Main heading */}
          <motion.h1
            {...fadeUp(0)}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-5"
          >
            24/7 EMERGENCY PLUMBER IN BOLTON
          </motion.h1>

          {/* Sub-heading */}
          <motion.p {...fadeUp(0.2)} className="font-body text-lg md:text-xl text-gray-300 mb-10">
            Boiler Repairs, Gas Safety Checks &amp; Central Heating — Gas Safe Registered Plumbing &amp; Heating across Bolton &amp; Greater Manchester
          </motion.p>

          {/* CTA buttons */}
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
              GET HELP NOW
            </Link>
            <a
              href={CONTACT.phoneHref}
              className="btn-outline h-14 px-10 text-base inline-flex items-center justify-center"
            >
              {CONTACT.phone}
            </a>
          </motion.div>
        </div>

        {/* Bouncing chevron */}
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
