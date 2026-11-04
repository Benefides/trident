import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/logos/trident.png';
import { NAV, SITE } from '../data/site.js';
import { Button, Tricolor } from './ui.jsx';
import Icon from './Icon.jsx';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const links = NAV.map((item) => (
    <NavLink key={item.to} to={item.to} end={item.end} className="nav__link">
      {item.label}
    </NavLink>
  ));

  return (
    <>
      <div className="topbar">
        <div className="container topbar__inner">
          <div className="topbar__links">
            <a href={SITE.phoneHref}>
              <Icon name="phone" size={15} strokeWidth={2} style={{ color: 'var(--sky)' }} />
              {SITE.phoneDisplay}
            </a>
            {SITE.email && (
              <a href={`mailto:${SITE.email}`}>
                <Icon name="mail" size={15} strokeWidth={2} style={{ color: 'var(--sky)' }} />
                {SITE.email}
              </a>
            )}
          </div>
          <div className="topbar__tag">
            <Tricolor />
            <span>{SITE.tagline}</span>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="site-header__logo" aria-label="Trident Exim LLC — home">
            <img src={logo} alt="Trident Exim LLC" width="72" height="64" />
          </Link>
          <nav className="nav" aria-label="Main">{links}</nav>
          <Button to="/become-a-customer" className="site-header__cta" icon="arrowRight" size="sm">
            Become a Customer
          </Button>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" size={24} />
          </button>
        </div>
      </header>

      <div id="mobile-nav" className={`mobile-nav${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <div className="mobile-nav__backdrop" onClick={() => setOpen(false)} />
        <nav className="mobile-nav__panel" aria-label="Mobile">
          <button type="button" className="mobile-nav__close" aria-label="Close menu" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            <Icon name="close" size={24} />
          </button>
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className="nav__link" tabIndex={open ? 0 : -1}>
              {item.label}
            </NavLink>
          ))}
          <Button to="/become-a-customer" icon="arrowRight" tabIndex={open ? 0 : -1}>
            Become a Customer
          </Button>
        </nav>
      </div>
    </>
  );
}
