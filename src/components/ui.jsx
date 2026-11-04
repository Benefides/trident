import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';

/** Slanted call-to-action. Renders a router Link for internal paths, <a> for external/hash, <button> otherwise. */
export function Button({ to, href, variant = 'primary', size, icon, iconLeft, children, className = '', ...rest }) {
  const cls = `btn btn--${variant}${size === 'sm' ? ' btn--sm' : ''}${className ? ` ${className}` : ''}`;
  const inner = (
    <span>
      {iconLeft && <Icon name={iconLeft} size={20} strokeWidth={2.4} />}
      {children}
      {icon && <Icon name={icon} size={18} strokeWidth={2.4} />}
    </span>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button type="button" className={cls} {...rest}>{inner}</button>;
}

export function Eyebrow({ color = 'red', children }) {
  return (
    <div className={`eyebrow eyebrow--${color}`}>
      <span className="eyebrow__bar" aria-hidden="true" />
      <span className="eyebrow__text">{children}</span>
    </div>
  );
}

export function Tag({ color = 'red', small, children }) {
  return (
    <span className={`tag tag--${color}${small ? ' tag--sm' : ''} para`}>
      <span>{children}</span>
    </span>
  );
}

export function IconChip({ name, color = 'red', size = 26 }) {
  return (
    <span className={`icon-chip icon-chip--${color} para para--mid`} aria-hidden="true">
      <Icon name={name} size={size} strokeWidth={2} />
    </span>
  );
}

export function Tricolor() {
  return (
    <div className="tricolor" aria-hidden="true">
      <span /><span /><span />
    </div>
  );
}

export function Stripe() {
  return (
    <div className="stripe" aria-hidden="true">
      <span /><span /><span />
    </div>
  );
}

/** Background image that stays fixed while the page scrolls, under a colour tint. */
export function Parallax({ image, tint = 'ink' }) {
  return (
    <>
      <div className="parallax" style={{ backgroundImage: `url(${image})` }} aria-hidden="true" />
      <div className={`parallax-tint tint-${tint}`} aria-hidden="true" />
    </>
  );
}
