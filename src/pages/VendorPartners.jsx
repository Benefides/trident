import BrandMarquee from '../components/BrandMarquee.jsx';
import Reveal from '../components/Reveal.jsx';
import { Button, Eyebrow, Tag } from '../components/ui.jsx';
import { PageBanner } from '../components/sections.jsx';
import { BRANDS, IMPORTED_BRAND_COUNT } from '../data/brands.js';
import { IMAGES } from '../data/products.js';
import usePageTitle from '../hooks/usePageTitle.js';

export default function VendorPartners() {
  usePageTitle('Vendor Partners');
  return (
    <>
      <PageBanner
        title="Vendor Partners"
        text={`${IMPORTED_BRAND_COUNT} trusted Kerala and South Indian brands, directly imported and distributed by Trident Exim LLC — plus our featured Tasty Eats range.`}
        image={IMAGES.kozhukatta}
        bars={['var(--blue)', 'var(--red)']}
      />

      <section aria-label="Brand partners" style={{ background: 'var(--paper)', padding: '40px 0', borderBottom: '1px solid var(--line)' }}>
        <BrandMarquee duration={40} />
      </section>

      <section className="section" aria-labelledby="grid-h" style={{ paddingTop: 96 }}>
        <div className="container stack" style={{ gap: 48, alignItems: 'stretch' }}>
          <Reveal className="stack" style={{ gap: 14, maxWidth: 720 }}>
            <Eyebrow color="blue">Brands We Carry</Eyebrow>
            <h2 id="grid-h" className="h-section">Names your customers know</h2>
            <p className="body-muted">Every brand here is imported directly by us — no middlemen — so products stay in stock and fresh on your shelves.</p>
          </Reveal>
          <ul className="plain brand-grid">
            {BRANDS.map((b, i) => (
              <Reveal as="li" key={b.name} delay={(i % 4) * 90}>
                <div className="brand-card">
                  <div className="brand-card__tile">
                    {b.logo ? (
                      <img src={b.logo} alt={`${b.name} logo`} loading="lazy" />
                    ) : (
                      <span className="brand-card__pending">
                        <span className="brand-tile__text" style={{ fontSize: 34 }}>{b.name}</span>
                        <small>[LOGO TO COME]</small>
                      </span>
                    )}
                    {b.featured && <span className="brand-card__flag">Featured</span>}
                  </div>
                  <span className="brand-card__name">{b.name}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="vendor-h" style={{ paddingBottom: 112 }}>
        <div className="container">
          <Reveal>
            <div className="grid-2" style={{ gap: 0, background: 'var(--ink)', color: 'var(--white)', overflow: 'hidden', alignItems: 'stretch' }}>
              <div className="stack" style={{ padding: '64px 56px', gap: 20 }}>
                <Tag color="green">For Brands</Tag>
                <h2 id="vendor-h" className="h-section" style={{ fontSize: 'clamp(36px, 4vw, 54px)', lineHeight: 0.95 }}>Looking to reach new markets?</h2>
                <p style={{ fontSize: 18, color: '#c9d1dc' }}>We partner with food manufacturers who want a reliable importer and distributor for their products in the USA.</p>
                <ul className="plain stack" style={{ gap: 12 }}>
                  {[
                    ['var(--red)', 'Import handling and logistics'],
                    ['var(--green)', 'Access to our retail and food-service network'],
                    ['var(--sky)', 'Market feedback and sales reporting'],
                  ].map(([c, t]) => (
                    <li key={t} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 17 }}>
                      <span aria-hidden="true" style={{ width: 18, height: 8, background: c, transform: 'skewX(-24deg)' }} />
                      {t}
                    </li>
                  ))}
                </ul>
                <Button to="/contact" icon="arrowRight" style={{ marginTop: 8 }}>Partner With Us</Button>
              </div>
              <div className="has-parallax" style={{ minHeight: 420 }} role="img" aria-label="Tasty Eats Grated Coconut pack">
                <div className="parallax" style={{ backgroundImage: `url(${IMAGES.coconut})` }} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
