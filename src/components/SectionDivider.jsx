import { useRef, useState, useEffect } from 'react';

export default function SectionDivider({ color = 'teal' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const colors = {
    teal: { line: 'var(--teal)', glow: 'rgba(0,245,212,0.3)' },
    pink: { line: 'var(--pink)', glow: 'rgba(255,45,120,0.3)' },
    purple: { line: 'var(--purple-bright)', glow: 'rgba(168,85,247,0.3)' },
  };

  const c = colors[color] || colors.teal;

  return (
    <div ref={ref} style={{ padding: '10px 0', position: 'relative' }}>
      <div
        style={{
          height: '1px',
          background: `linear-gradient(90deg, transparent 0%, ${c.line} 30%, ${c.line} 70%, transparent 100%)`,
          transform: `scaleX(${visible ? 1 : 0})`,
          opacity: visible ? 1 : 0,
          boxShadow: `0 0 15px ${c.glow}`,
          transformOrigin: 'center',
          transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '6px',
          height: '6px',
          background: c.line,
          opacity: visible ? 1 : 0,
          boxShadow: `0 0 10px ${c.line}`,
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          transition: 'opacity 0.8s ease',
        }}
      />
    </div>
  );
}
