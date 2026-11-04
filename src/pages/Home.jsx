import HeroCarousel from '../components/HeroCarousel.jsx';
import BrandMarquee from '../components/BrandMarquee.jsx';
import Reveal from '../components/Reveal.jsx';
import { Button, Eyebrow, IconChip, Parallax } from '../components/ui.jsx';
import { BrochureBand, CheckItem, CtaCard, ProductCard } from '../components/sections.jsx';
import Icon from '../components/Icon.jsx';
import { Link } from 'react-router-dom';
import { IMAGES, PRODUCTS } from '../data/products.js';
import { IMPORTED_BRAND_COUNT } from '../data/brands.js';
import usePageTitle from '../hooks/usePageTitle.js';

const VALUES = [
  { icon: 'star', color: 'red', title: 'Authentic Sourcing', text: 'Imported directly from established Kerala and South Indian brands your customers already trust.' },
  { icon: 'truck', color: 'green', title: 'Frozen & Dry, One Order', text: 'Ready-to-eat frozen foods and pantry staples consolidated into a single shipment.' },
  { icon: 'shield', color: 'blue', title: 'Partner-First Service', text: 'Dependable supply, clear communication and dedicated support for every account.' },
];

// Replace the [XX] placeholders with the client's real figures.
const STATS = [
  { num: String(IMPORTED_BRAND_COUNT), label: 'Partner brands', bar: 'var(--red)' },
  { num: '[XX]+', label: 'Products in range', bar: 'var(--green)' },
  { num: '[XX]+', label: 'Retail customers', bar: 'var(--sky)' },
  { num: '[XX]', label: 'Containers per year', bar: 'var(--white)' },
];

export default function Home() {
  usePageTitle('');
  return (
    <>
      <HeroCarousel />

      {/* Value points overlapping the hero */}
      <div className="container">
        <section className="values" aria-label="Why Trident Exim">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 120}>
              <div className="value-card para para--soft lift">
                <div className="value-card__body">
                  <IconChip name={v.icon} color={v.color} />
                  <div className="stack" style={{ gap: 6 }}>
                    <h3 className="h-card">{v.title}</h3>
                    <p className="small-muted" style={{ fontSize: 16, lineHeight: 1.55 }}>{v.text}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </section>
      </div>

      {/* About summary */}
      <section className="section" aria-labelledby="about-h">
        <div className="container grid-2">
          <Reveal dir="left">
            <div className="collage">
              <img className="collage__a clip-para" src={IMAGES.kozhukatta} alt="Tasty Eats Kozhukatta sweet rice dumplings" loading="lazy" />
              <img className="collage__b clip-para" src={IMAGES.idiyappam} alt="Tasty Eats Brown Idiyappam steamed rice noodles" loading="lazy" />
              <div className="collage__badge para">
                <div>
                  <span className="collage__num">{IMPORTED_BRAND_COUNT}</span>
                  <span className="collage__label">Partner<br />brands</span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal dir="right" className="stack">
            <Eyebrow color="red">About Trident Exim</Eyebrow>
            <h2 id="about-h" className="h-section">Bringing the flavours of Kerala to every shelf</h2>
            <p className="body-muted">
              Based in Mount Prospect, Illinois, Trident Exim LLC directly imports and distributes authentic Indian food
              products, with a focus on Kerala and South Indian brands. We work closely with manufacturers and retailers
              to keep popular products in stock and introduce new favourites to the market.
            </p>
            <ul className="plain checklist">
              <CheckItem>Frozen ready-to-eat range</CheckItem>
              <CheckItem>Spices, grains &amp; pantry staples</CheckItem>
              <CheckItem>Snacks &amp; vegetarian foods</CheckItem>
              <CheckItem>Ayurveda &amp; wellness</CheckItem>
            </ul>
            <Button to="/about" variant="dark" icon="arrowRight" style={{ marginTop: 10 }}>Read More</Button>
          </Reveal>
        </div>
      </section>

      <BrochureBand
        image={IMAGES.porotta}
        title="Everything Kerala. Delivered with care."
        text="Browse our full range of frozen foods, spices, grains and pantry staples in one brochure."
      />

      {/* Featured products */}
      <section className="section" aria-labelledby="offer-h" style={{ paddingTop: 96 }}>
        <div className="container stack" style={{ gap: 44, alignItems: 'stretch' }}>
          <Reveal className="row-between">
            <div className="stack" style={{ gap: 14 }}>
              <Eyebrow color="green">What We Offer</Eyebrow>
              <h2 id="offer-h" className="h-section">Featured Products</h2>
            </div>
            <Button to="/categories" variant="outline" icon="arrowRight" size="sm">View All</Button>
          </Reveal>
          <div className="card-grid">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
            <Reveal delay={270}>
              <Link to="/categories" className="promo-card lift">
                <span className="promo-card__title">See the full catalogue</span>
                <span className="promo-card__foot">
                  Spices, grains, snacks, wellness and more from all our brands.
                  <span className="promo-card__arrow para" aria-hidden="true"><Icon name="arrowRight" size={20} strokeWidth={2.6} /></span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats on a parallax background */}
      <section className="stats has-parallax" aria-label="Trident Exim in numbers">
        <Parallax image={IMAGES.idiyappam} tint="ink" />
        <div className="container stats__grid">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 110}>
              <div className="stat para para--mid lift">
                <div>
                  <span className="stat__bar" style={{ background: s.bar }} aria-hidden="true" />
                  <span className="stat__num">{s.num}</span>
                  <span className="stat__label">{s.label}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Non-stop brand carousel */}
      <section className="section section--paper" aria-labelledby="brands-h" style={{ paddingBottom: 96 }}>
        <Reveal className="container stack center" style={{ gap: 14, marginBottom: 40 }}>
          <Eyebrow color="blue">Vendor Partners</Eyebrow>
          <h2 id="brands-h" className="h-section">Brands We Carry</h2>
        </Reveal>
        <div className="stack" style={{ gap: 8, alignItems: 'stretch' }}>
          <BrandMarquee />
          <BrandMarquee reverse duration={52} />
        </div>
        <div className="stack center" style={{ marginTop: 40 }}>
          <Button to="/vendor-partners" variant="outline" size="sm">View All Partners</Button>
        </div>
      </section>

      <CtaCard
        title="Ready to stock authentic Kerala foods?"
        text="Open a trade account and get access to our full range, pricing and delivery schedule."
      />
    </>
  );
}
