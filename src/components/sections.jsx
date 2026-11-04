import { Link } from 'react-router-dom';
import { SITE } from '../data/site.js';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import { Button, Parallax, Tag } from './ui.jsx';

/** Inner-page header with a fixed (parallax) product photo behind it. */
export function PageBanner({ title, crumb, text, image, bars = ['var(--red)', 'var(--green)'] }) {
  return (
    <section className="page-banner has-parallax" aria-labelledby="page-title">
      <Parallax image={image} tint="ink-soft" />
      <div className="page-banner__bar" style={{ right: 'calc(48% - 6px)', width: 16, background: bars[0] }} aria-hidden="true" />
      <div className="page-banner__bar" style={{ right: 'calc(48% + 22px)', width: 8, background: bars[1] }} aria-hidden="true" />
      <div className="container page-banner__inner">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb__sep" aria-hidden="true" />
          <span aria-current="page" style={{ color: 'var(--white)' }}>{crumb || title}</span>
        </nav>
        <h1 id="page-title">{title}</h1>
        {text && <p className="lead">{text}</p>}
      </div>
    </section>
  );
}

export function ProductCard({ product, enquire = false }) {
  const body = (
    <>
      <div className="product-card__media zoom">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card__body">
        <Tag color="blue" small>{product.category}</Tag>
        <span className="product-card__name">{product.name}</span>
        <span className="small-muted">{product.desc}{enquire ? '' : ` · ${product.weight}`}</span>
        {enquire && (
          <div className="product-card__foot">
            <span className="product-card__weight">{product.weight}</span>
            <Button to="/contact" size="sm" variant="primary" aria-label={`Enquire about ${product.name}`}>Enquire</Button>
          </div>
        )}
      </div>
    </>
  );
  if (enquire) return <article className="product-card lift">{body}</article>;
  return <Link to="/categories" className="product-card lift">{body}</Link>;
}

export function BrochureBand({ image, title, text }) {
  const hasBrochure = Boolean(SITE.brochureUrl);
  return (
    <section className="band has-parallax" aria-labelledby="brochure-title">
      <Parallax image={image} tint="blue" />
      <Reveal className="container band__inner">
        <div className="band__copy">
          <h2 id="brochure-title" className="h-section" style={{ fontSize: 'clamp(40px, 4.6vw, 64px)', lineHeight: 0.95 }}>{title}</h2>
          <p>{text}</p>
        </div>
        {hasBrochure ? (
          <Button href={SITE.brochureUrl} variant="light" iconLeft="download" download>Download Brochure</Button>
        ) : (
          <Button to="/contact" variant="light" iconLeft="download">Request Brochure</Button>
        )}
      </Reveal>
    </section>
  );
}

export function CtaCard({ title, text }) {
  return (
    <section className="section--tight" aria-label={title} style={{ padding: '104px 0' }}>
      <div className="container">
        <Reveal>
          <div className="cta-card">
            <div className="cta-card__copy">
              <h2 className="h-section" style={{ fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 0.95 }}>{title}</h2>
              <p>{text}</p>
            </div>
            <div className="btn-row">
              <Button to="/become-a-customer" variant="light-red">Become a Customer</Button>
              <Button to="/contact" variant="outline-light">Contact Us</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CheckItem({ children }) {
  return (
    <li>
      <span className="checklist__mark" aria-hidden="true"><Icon name="check" size={14} strokeWidth={3.2} /></span>
      {children}
    </li>
  );
}
