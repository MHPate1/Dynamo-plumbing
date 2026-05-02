import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Certifications from './components/sections/Certifications';
import Testimonials from './components/sections/Testimonials';
import ContactForm from './components/sections/ContactForm';
import Footer from './components/sections/Footer';
import WhatsAppButton from './components/ui/WhatsAppButton';
import ScrollToTop from './components/ui/ScrollToTop';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Certifications />
      <Testimonials />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}

export default App;
