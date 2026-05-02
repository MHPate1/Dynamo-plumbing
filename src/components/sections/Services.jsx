import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link, Element } from 'react-scroll';
import thermostatImg from '../../assets/thermostat.jpg';
import baxiImg from '../../assets/baxi.png';
import centralHeatingImg from '../../assets/ventralheating.png';
import underfloorImg from '../../assets/underfloorheating.png';

const services = [
  {
    title: 'BOILER INSTALL & REPAIR',
    body: 'Professional boiler installation and servicing, ensuring your home stays warm, efficient, and safe all year round.',
    cta: 'GET BOILER HELP',
    image: baxiImg,
  },
  {
    title: 'LANDLORD GAS SAFETY CHECK / CP12',
    body: 'Gas safety checks you can trust – helping homeowners and landlords keep their properties and appliances safe and working as they should.',
    cta: 'GET GAS HELP',
    image: 'https://images.unsplash.com/photo-1616587226960-4a03badbe8bf?w=600&q=80',
  },
  {
    title: '24/7 EMERGENCY PLUMBING',
    body: "Plumbing problems big or small, we're here to help. Whether it's a burst pipe or a simple repair, our team is available 24/7.",
    cta: 'GET PLUMBING HELP',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80',
  },
  {
    title: 'CENTRAL HEATING INSTALLATION',
    body: 'Looking to install new radiators or upgrade your existing ones? Our expert heating engineers will take care of everything.',
    cta: 'GET HEATING HELP',
    image: centralHeatingImg,
  },
  {
    title: 'NEST & HIVE THERMOSTAT',
    body: 'We provide expert thermostat installations, set up to suit your home and lifestyle for maximum comfort and energy savings.',
    cta: 'GET THERMOSTAT HELP',
    image: thermostatImg,
  },
  {
    title: 'UNDERFLOOR HEATING INSTALLATION',
    body: 'Upgrade your comfort with reliable underfloor heating installation, designed to keep your home cosy all year round.',
    cta: 'GET HEATING HELP',
    image: underfloorImg,
  },
];

const container = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Element name="services">
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="font-body text-yellow text-xs uppercase tracking-widest mb-3">OUR SERVICES</p>
            <h2 className="section-heading">EVERYTHING YOUR HOME NEEDS</h2>
          </motion.div>

          {/* Cards grid */}
          <motion.div
            ref={ref}
            variants={container}
            initial="initial"
            animate={inView ? 'animate' : 'initial'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, idx) => (
              <motion.div key={idx} variants={cardVariant} className="service-card flex flex-col">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  width={600}
                  height={192}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading text-xl font-bold text-dark mb-2">{service.title}</h3>
                  <p className="font-body text-sm text-muted leading-relaxed flex-1">{service.body}</p>
                  <Link
                    to="contact"
                    smooth
                    offset={-72}
                    className="btn-primary w-full text-center text-sm mt-4 cursor-pointer inline-block"
                  >
                    {service.cta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Element>
  );
}
