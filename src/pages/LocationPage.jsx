import LocationHero from '../components/sections/LocationHero';
import AreaIntro from '../components/sections/AreaIntro';
import Services from '../components/sections/Services';
import Certifications from '../components/sections/Certifications';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import ContactForm from '../components/sections/ContactForm';
import Footer from '../components/sections/Footer';

export default function LocationPage({ location }) {
  return (
    <>
      <LocationHero location={location} />
      <AreaIntro location={location} />
      <Services />
      <Certifications />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
    </>
  );
}
