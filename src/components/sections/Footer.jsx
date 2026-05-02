import { Link } from 'react-scroll';
import { CONTACT } from '../../constants/contact';

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* CTA bar */}
      <div className="py-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href={CONTACT.phoneHref} className="btn-primary">
            CALL NOW
          </a>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green text-white rounded-pill px-8 py-3 font-body font-semibold uppercase tracking-wide text-sm hover:brightness-110 transition-all"
          >
            WHATSAPP
          </a>
        </div>
      </div>

      {/* Links row */}
      <div className="py-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl font-bold tracking-widest mb-2">DYNOMO</h3>
            <p className="font-body text-sm text-gray-400 leading-relaxed">
              Plumbing &amp; Heating Services<br />Carlisle, Cumbria
            </p>
          </div>

          {/* Services links */}
          <div>
            <h4 className="font-heading text-sm font-bold tracking-widest mb-4 text-gray-300">SERVICES</h4>
            <ul className="space-y-2">
              {['BOILER', 'GAS', 'PLUMBING', 'HEATING'].map((item) => (
                <li key={item}>
                  <Link
                    to="services"
                    smooth
                    offset={-72}
                    className="font-body text-sm text-gray-400 hover:text-yellow transition-colors cursor-pointer"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-bold tracking-widest mb-4 text-gray-300">CONTACT</h4>
            <ul className="space-y-2 font-body text-sm text-gray-400">
              <li>
                <a href={CONTACT.phoneHref} className="hover:text-yellow transition-colors">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-yellow transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li>{CONTACT.address}</li>
              <li className="text-xs text-gray-500 mt-2">⚡ Gas Safe Registered</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-5">
        <p className="max-w-7xl mx-auto px-4 text-center font-body text-xs text-gray-500">
          &copy; 2025 Dynomo Plumbing &amp; Heating Services. All rights reserved. | Gas Safe Registered
        </p>
      </div>
    </footer>
  );
}
