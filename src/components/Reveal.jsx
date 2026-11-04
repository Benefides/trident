import { useEffect, useRef, useState } from 'react';

/**
 * Fades its content in when it scrolls into view.
 * dir: "up" (default) | "left" | "right"; delay in ms for staggering.
 */
export default function Reveal({ as: Tag = 'div', dir = 'up', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dirClass = dir === 'left' ? ' reveal--left' : dir === 'right' ? ' reveal--right' : '';
  return (
    <Tag
      ref={ref}
      className={`reveal${dirClass}${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ ...style, '--delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
