import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../assets/dynamo-plumbing.jpeg?w=212&format=webp&imagetools';

const navLinks = [
  { name: 'BOILER', to: 'services' },
  { name: 'GAS', to: 'services' },
  { name: 'PLUMBING', to: 'services' },
  { name: 'HEATING', to: 'services' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 h-[64px] md:h-[72px] flex items-center justify-between">
        {/* Logo */}
        <RouterLink to="/" className="cursor-pointer flex items-center">
          <img
            src={logoImg}
            alt="Dynomo Plumbing & Heating Services"
            width="212"
            height="70"
            className="h-10 md:h-12 w-auto object-contain"
            fetchPriority="high"
          />
        </RouterLink>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth
              offset={-72}
              className="font-body text-sm uppercase font-semibold tracking-widest cursor-pointer text-dark hover:text-yellow transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Enquire Now — desktop */}
        <div className="hidden md:block">
          <Link to="contact" smooth offset={-72} className="btn-primary cursor-pointer">
            ENQUIRE NOW
          </Link>
        </div>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span className={`block h-0.5 w-6 bg-dark transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-dark transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-dark transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth
                  offset={-64}
                  className="font-body text-sm uppercase font-semibold tracking-widest cursor-pointer text-dark hover:text-yellow transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="contact"
                smooth
                offset={-64}
                className="btn-primary text-center cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                ENQUIRE NOW
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
