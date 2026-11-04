import { useCallback, useEffect, useRef, useState } from 'react';
import { BRANDS } from '../data/brands.js';
import { IMAGES } from '../data/products.js';
import { Button, Tag } from './ui.jsx';
import Icon from './Icon.jsx';

const INTERVAL_MS = 6000;
const heroBrands = ['Eastern', 'Triveni Grains', 'Kalan Ayurveda', "Kozhikoden's", 'Brahmins', 'Kitchen Treasures']
  .map((n) => BRANDS.find((b) => b.name === n))
  .filter(Boolean);

const SLIDES = [
  {
    tag: { color: 'red', text: 'Importer & Distributor' },
    title: (<>Connecting the world <span className="accent-sky">with foods</span></>),
    text: 'Authentic Kerala and South Indian foods from trusted brands — directly imported, and delivered to retailers and restaurants.',
    ctas: [
      { to: '/categories', label: 'Explore Categories', variant: 'primary', icon: 'arrowRight' },
      { to: '/become-a-customer', label: 'Become a Customer', variant: 'outline-light' },
    ],
    image: IMAGES.porotta,
    alt: 'Tasty Eats Malabar Porotta family pack',
    shadow: 'var(--blue)',
    badge: { color: 'var(--green)', text: 'Malabar Porotta · 12 pcs' },
  },
  {
    tag: { color: 'green', text: 'Frozen · Ready to Eat' },
    title: (<>Kerala breakfasts, <span className="accent-lime">frozen fresh</span></>),
    text: 'Puttu, idiyappam, kozhukatta and kumbilappam from Tasty Eats — heat, serve and enjoy home-style taste in minutes.',
    ctas: [{ to: '/categories', label: 'View Frozen Range', variant: 'primary', icon: 'arrowRight' }],
    image: IMAGES.whitePuttu,
    alt: 'Tasty Eats White Puttu steamed rice cake',
    shadow: 'var(--green)',
    badge: { color: 'var(--red)', text: 'Heat & Eat · Keep Frozen' },
  },
  {
    tag: { color: 'blue', text: 'Vendor Partners' },
    title: (<>Twelve brands. <span className="accent-sky">One partner.</span></>),
    text: 'From Eastern spices to Triveni grains and Kalan Ayurveda — one order, one supplier, one delivery schedule.',
    ctas: [{ to: '/vendor-partners', label: 'Meet Our Brands', variant: 'primary', icon: 'arrowRight' }],
    logos: true,
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);
  const count = SLIDES.length;

  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduce) return undefined;
    timer.current = setTimeout(() => go(index + 1), INTERVAL_MS);
    return () => clearTimeout(timer.current);
  }, [index, paused, go]);

  // Basic swipe support on touch screens.
  const touchX = useRef(null);
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  return (
    <section
      className="hero has-parallax"
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="parallax" style={{ backgroundImage: `url(${IMAGES.kozhukatta})` }} aria-hidden="true" />
      <div className="parallax-tint" style={{ background: 'rgba(10,18,32,0.88)' }} aria-hidden="true" />
      <div className="hero__band hero__band--panel" aria-hidden="true" />
      <div className="hero__band hero__band--red" aria-hidden="true" />
      <div className="hero__band hero__band--green" aria-hidden="true" />
      <div className="hero__band hero__band--sky" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__viewport">
          {SLIDES.map((s, i) => {
            const active = i === index;
            const Heading = i === 0 ? 'h1' : 'h2';
            return (
              <div
                key={i}
                className={`hero__slide${active ? ' is-active' : ''}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!active}
                inert={active ? undefined : ''}
              >
                <div className="hero__copy">
                  <Tag color={s.tag.color}>{s.tag.text}</Tag>
                  <Heading className="display">{s.title}</Heading>
                  <p className="lead">{s.text}</p>
                  <div className="btn-row" style={{ marginTop: 8 }}>
                    {s.ctas.map((c) => (
                      <Button key={c.label} to={c.to} variant={c.variant} icon={c.icon}>{c.label}</Button>
                    ))}
                  </div>
                </div>
                {s.logos ? (
                  <div className="hero__logos">
                    {heroBrands.map((b) => (
                      <div key={b.name} className="hero__logo-tile para para--mid">
                        <img src={b.logo} alt={b.name} loading="lazy" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="hero__media">
                    <div className="hero__media-shadow clip-para" style={{ background: s.shadow }} aria-hidden="true" />
                    <img className="clip-para" src={s.image} alt={s.alt} fetchpriority={i === 0 ? 'high' : undefined} />
                    <div className="hero__badge para" style={{ background: s.badge.color }}>
                      <span>{s.badge.text}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="hero__controls">
          <div className="hero__arrows">
            <button type="button" className="hero__arrow para" aria-label="Previous slide" onClick={() => go(index - 1)}>
              <span style={{ display: 'flex' }}><Icon name="chevronLeft" size={20} strokeWidth={2.4} /></span>
            </button>
            <button type="button" className="hero__arrow hero__arrow--next para" aria-label="Next slide" onClick={() => go(index + 1)}>
              <span style={{ display: 'flex' }}><Icon name="chevronRight" size={20} strokeWidth={2.4} /></span>
            </button>
          </div>
          <div className="hero__dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`hero__dot${i === index ? ' is-active' : ''}`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i)}
              >
                <span />
              </button>
            ))}
          </div>
          <span className="hero__counter" aria-live="polite">
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
