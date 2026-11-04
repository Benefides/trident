import { useMemo, useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import { Eyebrow, IconChip } from '../components/ui.jsx';
import { BrochureBand, PageBanner, ProductCard } from '../components/sections.jsx';
import { IMAGES, MORE_CATEGORIES, PRODUCTS, PRODUCT_FILTERS } from '../data/products.js';
import tastyEatsLogo from '../assets/logos/tastyeats.png';
import usePageTitle from '../hooks/usePageTitle.js';

export default function Categories() {
  usePageTitle('Categories');
  const [filter, setFilter] = useState('All');
  const shown = useMemo(() => (filter === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)), [filter]);

  return (
    <>
      <PageBanner
        title="Our Products"
        crumb="Categories"
        text="Frozen ready-to-eat favourites and pantry staples from Kerala's best-loved brands."
        image={IMAGES.idiyappam}
        bars={['var(--green)', 'var(--sky)']}
      />

      <section className="section" aria-labelledby="range-h" style={{ paddingTop: 96, paddingBottom: 104 }}>
        <div className="container stack" style={{ gap: 36, alignItems: 'stretch' }}>
          <Reveal className="row-between">
            <div className="stack" style={{ gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={tastyEatsLogo} alt="Tasty Eats" style={{ height: 40, width: 'auto' }} />
                <span className="eyebrow__text" style={{ color: 'var(--red-dark)' }}>Featured Range</span>
              </div>
              <h2 id="range-h" className="h-section">Frozen Foods</h2>
            </div>
            <span className="small-muted" style={{ fontSize: 16 }} aria-live="polite">
              Showing {shown.length} of {PRODUCTS.length} products
            </span>
          </Reveal>

          <div className="filters" role="group" aria-label="Filter products by category">
            {PRODUCT_FILTERS.map((c) => (
              <button key={c} type="button" className="filter-btn" aria-pressed={filter === c} onClick={() => setFilter(c)}>
                <span>{c}</span>
              </button>
            ))}
          </div>

          <div className="card-grid">
            {shown.map((p, i) => (
              <div key={`${filter}-${p.id}`} className="fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                <ProductCard product={p} enquire />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="more-h" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="container stack" style={{ gap: 44, alignItems: 'stretch' }}>
          <Reveal className="stack" style={{ gap: 14, maxWidth: 720 }}>
            <Eyebrow color="green">From Our Brand Partners</Eyebrow>
            <h2 id="more-h" className="h-section">More categories</h2>
            <p className="body-muted">Pantry staples and specialty products to round out every order. Ask us for the current range and pricing.</p>
          </Reveal>
          <div className="feature-grid">
            {MORE_CATEGORIES.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 110}>
                <div className="info-card lift">
                  <IconChip name={c.icon} color={c.color} />
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                  <span className="info-card__brands">Brands: {c.brands}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BrochureBand
        image={IMAGES.porotta}
        title="Want the full product list?"
        text="Get our brochure with every product, pack size and case configuration."
      />
    </>
  );
}
