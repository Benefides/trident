import { BRANDS } from '../data/brands.js';

export function BrandLogo({ brand }) {
  return brand.logo ? (
    <img src={brand.logo} alt={brand.name} loading="lazy" />
  ) : (
    <span className="brand-tile__text">{brand.name}</span>
  );
}

/** Endless scrolling row of brand logos. The list is doubled so the loop is seamless. Pauses on hover. */
export default function BrandMarquee({ reverse = false, duration = 46, dark = false, brands = BRANDS }) {
  const list = reverse ? [...brands].reverse() : brands;
  const doubled = [...list, ...list];
  return (
    <div className={`marquee${reverse ? ' marquee--reverse' : ''}${dark ? ' marquee--dark' : ''}`} style={{ '--duration': `${duration}s` }}>
      <div className="marquee__track">
        {doubled.map((b, i) => (
          <div key={`${b.name}-${i}`} className="brand-tile" aria-hidden={i >= list.length ? true : undefined}>
            <BrandLogo brand={b} />
          </div>
        ))}
      </div>
    </div>
  );
}
