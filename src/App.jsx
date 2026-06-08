import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import LocationPage from './pages/LocationPage';
import WhatsAppButton from './components/ui/WhatsAppButton';
import ScrollToTop from './components/ui/ScrollToTop';
import { locations } from './data/locations';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {locations.map((loc) => (
          <Route key={loc.slug} path={`/${loc.slug}`} element={<LocationPage location={loc} />} />
        ))}
        <Route path="*" element={<Home />} />
      </Routes>
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}

export default App;
