import BrandMarquee from '../components/BrandMarquee.jsx';
import Reveal from '../components/Reveal.jsx';
import { Eyebrow, Parallax, Tricolor } from '../components/ui.jsx';
import { CtaCard, PageBanner } from '../components/sections.jsx';
import { IMAGES } from '../data/products.js';
import { IMPORTED_BRAND_COUNT } from '../data/brands.js';
import usePageTitle from '../hooks/usePageTitle.js';

const MVV = [
  { n: '01', title: 'Mission', bg: 'var(--red)', text: 'To bring authentic, high-quality Indian food to every customer we serve — reliably and at fair prices.' },
  { n: '02', title: 'Vision', bg: 'var(--green-dark)', text: "To be the most trusted bridge between Kerala's food makers and markets around the world." },
  { n: '03', title: 'Values', bg: 'var(--blue)', text: 'Authenticity, consistency and honest partnership — with our brands and with every customer.' },
];

const APART = [
  { n: '01', bg: 'var(--red)', title: 'Directly imported', text: `${IMPORTED_BRAND_COUNT} brands imported by us — no middlemen between the maker and your shelf.` },
  { n: '02', bg: 'var(--green-dark)', title: 'Frozen & dry together', text: 'Mixed shipments of frozen and ambient products in a single order.' },
  { n: '03', bg: 'var(--blue)', title: 'Consistent supply', text: 'Forward planning with our brands keeps best-sellers on the shelf.' },
  { n: '04', bg: 'var(--ink)', title: 'Responsive support', text: 'One point of contact for orders, pricing and new product listings.' },
];

export default function About() {
  usePageTitle('About Us');
  return (
    <>
      <PageBanner
        title="Who We Are"
        crumb="About Us"
        text="An importer and distributor connecting Kerala's favourite food brands with stores and kitchens across the USA."
        image={IMAGES.kumbilappam}
      />

      {/* Story */}
      <section className="section" aria-labelledby="story-h">
        <div className="container grid-2">
          <Reveal dir="left" className="stack">
            <Eyebrow color="red">Our Story</Eyebrow>
            <h2 id="story-h" className="h-section">Rooted in Kerala. Built for wholesale.</h2>
            <p className="body-muted">
              Trident Exim LLC was founded in [YEAR] with a simple goal: make authentic Kerala and South Indian food easy
              to find, wherever our customers are.
            </p>
            <p className="body-muted">
              From our base in Mount Prospect, Illinois, we directly import and distribute {IMPORTED_BRAND_COUNT} established
              brands — including Eastern, Double Horse, Triveni, Brahmins and Kalan Ayurveda — alongside our featured Tasty
              Eats frozen range, supplying [NUMBER] retail and food-service customers across [REGION].
            </p>
            <p className="body-muted">Every order is handled by a team that knows the products, the brands and the people who buy them.</p>
          </Reveal>
          <Reveal dir="right">
            <div className="collage" style={{ height: 520 }}>
              <img className="clip-para" src={IMAGES.whitePuttu} alt="Tasty Eats White Puttu" loading="lazy"
                style={{ position: 'absolute', right: 0, top: 0, width: '78%', height: '70%', objectFit: 'cover' }} />
              <img className="clip-para" src={IMAGES.coconut} alt="Tasty Eats Grated Coconut" loading="lazy"
                style={{ position: 'absolute', left: 0, bottom: 0, width: '46%', height: '58%', objectFit: 'cover', filter: 'drop-shadow(0 16px 30px rgba(10,18,32,0.25))' }} />
              <div className="para" style={{ position: 'absolute', right: '6%', bottom: '10%', background: 'var(--ink)', color: 'var(--white)', padding: '18px 30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span className="collage__num" style={{ fontSize: 44 }}>Since [YEAR]</span>
                  <span className="stat__label" style={{ fontSize: 16 }}>Importing &amp; distributing</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission / vision / values */}
      <section className="section section--paper" aria-labelledby="mvv-h" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="container stack" style={{ gap: 48, alignItems: 'stretch' }}>
          <Reveal className="stack center" style={{ gap: 14 }}>
            <Tricolor />
            <h2 id="mvv-h" className="h-section">Three colours. One promise.</h2>
            <p className="body-muted" style={{ maxWidth: 620 }}>The three wings of our logo stand for what guides every shipment we handle.</p>
          </Reveal>
          <div className="feature-grid" style={{ gap: 28, padding: '0 16px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {MVV.map((m, i) => (
              <Reveal key={m.title} delay={i * 120}>
                <div className="mvv-card para para--soft lift" style={{ background: m.bg }}>
                  <div>
                    <span className="mvv-card__num">{m.n}</span>
                    <h3>{m.title}</h3>
                    <p style={{ fontSize: 17 }}>{m.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What sets us apart */}
      <section className="section" aria-labelledby="apart-h">
        <div className="container grid-2" style={{ alignItems: 'start', gap: 56, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))' }}>
          <Reveal dir="left" className="stack" style={{ gap: 20 }}>
            <Eyebrow color="green">Why Partner With Us</Eyebrow>
            <h2 id="apart-h" className="h-section">What sets us apart</h2>
            <p className="body-muted">We keep our portfolio focused so we can know every product well and keep it moving.</p>
            <img className="clip-para" src={IMAGES.brownPuttu} alt="Tasty Eats Brown Puttu" loading="lazy"
              style={{ marginTop: 12, width: '100%', height: 280, objectFit: 'cover', clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)' }} />
          </Reveal>
          <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {APART.map((a, i) => (
              <Reveal key={a.title} delay={(i % 2) * 120}>
                <div className="info-card lift">
                  <span className="num-chip para" style={{ background: a.bg }}><span>{a.n}</span></span>
                  <h3 style={{ fontSize: 26 }}>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brand partners on parallax */}
      <section className="has-parallax" aria-labelledby="partners-h" style={{ padding: '120px 0' }}>
        <Parallax image={IMAGES.whitePuttu} tint="ink" />
        <Reveal as="h2" id="partners-h" className="h-section" style={{ textAlign: 'center', color: 'var(--white)', fontSize: 'clamp(32px, 3.4vw, 44px)', padding: '0 24px', marginBottom: 32 }}>
          Our brand partners
        </Reveal>
        <BrandMarquee dark />
      </section>

      <CtaCard title="Let's grow together" text="Whether you run a store, a restaurant or a brand, we'd like to hear from you." />
    </>
  );
}
