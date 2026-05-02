import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Element } from 'react-scroll';

import vaillantImg   from '../../assets/vaillant.png';
import cityGuildsImg from '../../assets/cityandguilds.png';
import baxiCertImg   from '../../assets/baxi-cert.png';
import alphaImg      from '../../assets/alpha.png';
import glowwormImg   from '../../assets/glowworm.png';
import idealImg      from '../../assets/idealboilers.png';
import worcesterImg  from '../../assets/worcester-logo.png';

const certs = [
  { name: 'Vaillant',        sub: 'Advance Installer',    image: vaillantImg },
  { name: 'City & Guilds',   sub: 'Qualified Technician', image: cityGuildsImg },
  { name: 'Baxi',            sub: 'Approved Installer',   image: baxiCertImg },
  { name: 'Alpha',           sub: 'Approved Installer',   image: alphaImg },
  { name: 'Glow-worm',       sub: 'Approved Installer',   image: glowwormImg },
  { name: 'Ideal Boilers',   sub: 'Approved Installer',   image: idealImg },
  { name: 'Worcester Bosch', sub: 'Accredited Installer', image: worcesterImg },
];

const DESKTOP_PER_PAGE = 4;
const TOTAL_DESKTOP_PAGES = Math.ceil(certs.length / DESKTOP_PER_PAGE);
const AUTOPLAY_MS = 3500;

function CertCard({ cert, active }) {
  return (
    <div
      className={`w-full bg-white rounded-xl p-5 flex flex-col items-center justify-center gap-3 border transition-all duration-300 ${
        active ? 'border-yellow shadow-md' : 'border-gray-100'
      }`}
    >
      <img
        src={cert.image}
        alt={cert.name}
        loading="lazy"
        className="h-14 w-auto object-contain"
      />
      <div className="text-center">
        <p className="font-heading text-sm font-bold text-dark leading-tight">{cert.name}</p>
        <p className="font-body text-xs text-muted mt-0.5">{cert.sub}</p>
      </div>
    </div>
  );
}

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:  (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.25 } }),
};

export default function Certifications() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const [mobileIdx, setMobileIdx] = useState(0);
  const [mobileDir, setMobileDir] = useState(1);

  const [desktopPage, setDesktopPage] = useState(0);
  const [desktopDir, setDesktopDir]   = useState(1);

  const mobilePrev = () => {
    setMobileDir(-1);
    setMobileIdx((i) => (i - 1 + certs.length) % certs.length);
  };

  const mobileNext = () => {
    setMobileDir(1);
    setMobileIdx((i) => (i + 1) % certs.length);
  };

  const desktopPrev = () => {
    if (desktopPage > 0) {
      setDesktopDir(-1);
      setDesktopPage((p) => p - 1);
    }
  };

  const desktopNext = () => {
    if (desktopPage < TOTAL_DESKTOP_PAGES - 1) {
      setDesktopDir(1);
      setDesktopPage((p) => p + 1);
    }
  };

  useEffect(() => {
    const t = setInterval(() => {
      setMobileDir(1);
      setMobileIdx((i) => (i + 1) % certs.length);
      setDesktopDir(1);
      setDesktopPage((p) => (p + 1) % TOTAL_DESKTOP_PAGES);
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, []);

  const desktopItems = certs.slice(
    desktopPage * DESKTOP_PER_PAGE,
    desktopPage * DESKTOP_PER_PAGE + DESKTOP_PER_PAGE,
  );

  const ArrowBtn = ({ onClick, disabled, children, label }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex-shrink-0 w-10 h-10 rounded-full border border-yellow text-yellow flex items-center justify-center hover:bg-yellow hover:text-dark transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      aria-label={label}
    >
      {children}
    </button>
  );

  return (
    <Element name="certifications">
      <section ref={ref} className="bg-offwhite py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="font-body text-yellow text-xs uppercase tracking-widest mb-3">TRUSTED &amp; VERIFIED</p>
            <h2 className="section-heading">FULLY CERTIFIED &amp; ACCREDITED</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* Desktop: 4-per-page carousel */}
            <div className="hidden md:block">
              <div className="flex items-center gap-4">
                <ArrowBtn onClick={desktopPrev} disabled={desktopPage === 0} label="Previous">←</ArrowBtn>

                <div className="flex-1 overflow-hidden">
                  <AnimatePresence mode="wait" custom={desktopDir}>
                    <motion.div
                      key={desktopPage}
                      custom={desktopDir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="grid grid-cols-4 gap-4"
                    >
                      {desktopItems.map((cert, idx) => (
                        <CertCard
                          key={cert.name}
                          cert={cert}
                          active={idx === 0 && desktopPage === 0}
                        />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <ArrowBtn onClick={desktopNext} disabled={desktopPage === TOTAL_DESKTOP_PAGES - 1} label="Next">→</ArrowBtn>
              </div>

              <div className="flex justify-center gap-2 mt-5">
                {Array.from({ length: TOTAL_DESKTOP_PAGES }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDesktopDir(i > desktopPage ? 1 : -1); setDesktopPage(i); }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === desktopPage ? 'bg-yellow w-6' : 'bg-gray-300 w-2'
                    }`}
                    aria-label={`Page ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Mobile: 1-per-slide carousel */}
            <div className="md:hidden">
              <div className="flex items-center gap-3">
                <ArrowBtn onClick={mobilePrev} label="Previous">←</ArrowBtn>

                <div className="flex-1 overflow-hidden rounded-xl">
                  <AnimatePresence mode="wait" custom={mobileDir}>
                    <motion.div
                      key={mobileIdx}
                      custom={mobileDir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="bg-white rounded-xl p-8 flex flex-col items-center gap-4 border border-yellow shadow-md min-h-[180px] justify-center"
                    >
                      <img
                        src={certs[mobileIdx].image}
                        alt={certs[mobileIdx].name}
                        className="h-20 w-auto object-contain"
                      />
                      <div className="text-center">
                        <p className="font-heading text-lg font-bold text-dark">{certs[mobileIdx].name}</p>
                        <p className="font-body text-sm text-muted mt-1">{certs[mobileIdx].sub}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <ArrowBtn onClick={mobileNext} label="Next">→</ArrowBtn>
              </div>

              <div className="flex justify-center gap-1.5 mt-5 flex-wrap">
                {certs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setMobileDir(i > mobileIdx ? 1 : -1); setMobileIdx(i); }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === mobileIdx ? 'bg-yellow w-5' : 'bg-gray-300 w-2'
                    }`}
                    aria-label={certs[i].name}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Element>
  );
}
