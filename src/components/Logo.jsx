import { useState, useEffect } from 'react';

const sizes = { xs: 32, sm: 48, md: 80, lg: 140, xl: 200, hero: 340 };
let cachedSvg = null;

export default function Logo({ size = 'md', animate = false, className = '' }) {
  const px = typeof size === 'number' ? size : (sizes[size] || sizes.md);
  const [svg, setSvg] = useState(cachedSvg);

  useEffect(() => {
    if (cachedSvg) return;
    const base = import.meta.env.BASE_URL || '/';
    fetch(`${base}images/logo-traced.svg`)
      .then(r => r.text())
      .then(text => { cachedSvg = text; setSvg(text); });
  }, []);

  if (!svg) return <div style={{ width: px, aspectRatio: '725/484' }} />;

  return (
    <div
      className={`ldne-logo ${animate ? 'ldne-logo--animate' : ''} ${className}`}
      style={{ width: px, display: 'inline-block' }}
      role="img"
      aria-label="Lady Driven New England logo"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
