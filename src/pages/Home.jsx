import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Certifications from '../components/sections/Certifications';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import ContactForm from '../components/sections/ContactForm';
import Footer from '../components/sections/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Certifications />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
    </>
  );
}
