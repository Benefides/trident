import { Link } from 'react-router-dom';
import logo from '../assets/logos/trident.png';
import { NAV, SITE } from '../data/site.js';
import Icon from './Icon.jsx';
import { Stripe } from './ui.jsx';

const FOOTER_CATEGORIES = ['Frozen Breakfast', 'Snacks & Sweets', 'Breads', 'Spices & Masalas', 'Rice & Grains', 'Ayurveda & Wellness'];

export default function Footer() {
  return (
    <footer className="site-footer">
      <Stripe />
      <div className="site-footer__band" aria-hidden="true" />
      <div className="container site-footer__grid">
        <div className="stack" style={{ gap: 20 }}>
          <Link to="/" className="site-footer__logo para para--mid" aria-label="Trident Exim LLC — home">
            <img src={logo} alt="Trident Exim LLC" />
          </Link>
          <p style={{ fontSize: 15, lineHeight: 1.7, maxWidth: 300 }}>
            Based in Mount Prospect, Illinois, Trident Exim LLC directly imports and distributes authentic Kerala and
            South Indian food brands to retailers and restaurants.
          </p>
        </div>

        <nav aria-label="Quick links">
          <h2><span style={{ background: 'var(--red)' }} />Quick Links</h2>
          {NAV.map((item) => (
            <Link key={item.to} to={item.to}>{item.label}</Link>
          ))}
          <Link to="/become-a-customer">Become a Customer</Link>
        </nav>

        <nav aria-label="Categories">
          <h2><span style={{ background: 'var(--green)' }} />Categories</h2>
          {FOOTER_CATEGORIES.map((c) => (
            <Link key={c} to="/categories">{c}</Link>
          ))}
        </nav>

        <div>
          <h2><span style={{ background: 'var(--sky)' }} />Get in Touch</h2>
          <div className="site-footer__contact">
            <a href={SITE.phoneHref}>
              <span className="footer-icon"><Icon name="phone" size={15} strokeWidth={2} /></span>
              {SITE.phoneDisplay}
            </a>
            {SITE.email && (
              <a href={`mailto:${SITE.email}`}>
                <span className="footer-icon"><Icon name="mail" size={15} strokeWidth={2} /></span>
                {SITE.email}
              </a>
            )}
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
              <span className="footer-icon"><Icon name="pin" size={15} strokeWidth={2} /></span>
              <span>{SITE.addressLines[0]}<br />{SITE.addressLines[1]}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <div className="container">
          <span>© {new Date().getFullYear()} Trident Exim LLC. All rights reserved.</span>
          <span style={{ fontStyle: 'italic' }}>{SITE.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
