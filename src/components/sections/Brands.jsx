import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Element } from 'react-scroll';

const brands = [
  'Worcester Bosch',
  'Vaillant',
  'Baxi',
  'Ideal',
  'Viessmann',
  'Alpha',
  'Glow-worm',
  'Potterton',
];

export default function Brands() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const container = {
    animate: { transition: { staggerChildren: 0.07 } },
  };

  const item = {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <Element name="brands">
      <section ref={ref} className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-heading text-center mb-12"
          >
            WE WORK WITH ALL MAJOR BRANDS
          </motion.h2>

          {/* Try to load brands.png; show text badges as fallback */}
          {!imgError ? (
            <div className="max-w-4xl mx-auto mb-8 text-center">
              <img
                src="/brands.png"
                alt="Major boiler brands: Worcester Bosch, Vaillant, Baxi, Ideal, Viessmann and more"
                loading="lazy"
                width={800}
                height={300}
                className={`w-full h-auto rounded-lg mx-auto ${imgLoaded ? 'block' : 'hidden'}`}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
              />
              {!imgLoaded && (
                <BrandBadges inView={inView} container={container} item={item} />
              )}
            </div>
          ) : (
            <BrandBadges inView={inView} container={container} item={item} />
          )}

          <div className="border-t border-gray-200 mt-4" />
        </div>
      </section>
    </Element>
  );
}

function BrandBadges({ inView, container, item }) {
  return (
    <motion.div
      variants={container}
      initial="initial"
      animate={inView ? 'animate' : 'initial'}
      className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mb-8"
    >
      {brands.map((brand) => (
        <motion.div
          key={brand}
          variants={item}
          className="bg-offwhite border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-center min-w-[140px]"
        >
          <span className="font-heading text-base font-bold text-dark tracking-wide">{brand}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
