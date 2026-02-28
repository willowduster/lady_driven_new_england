import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SectionDivider({ color = 'teal' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const colors = {
    teal: { line: 'var(--teal)', glow: 'rgba(0,245,212,0.3)' },
    pink: { line: 'var(--pink)', glow: 'rgba(255,45,120,0.3)' },
    purple: { line: 'var(--purple-bright)', glow: 'rgba(168,85,247,0.3)' },
  };

  const c = colors[color] || colors.teal;

  return (
    <div ref={ref} style={{ padding: '10px 0', position: 'relative' }}>
      <motion.div
        style={{
          height: '1px',
          background: `linear-gradient(90deg, transparent 0%, ${c.line} 30%, ${c.line} 70%, transparent 100%)`,
          scaleX,
          opacity,
          boxShadow: `0 0 15px ${c.glow}`,
          transformOrigin: 'center',
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '6px',
          height: '6px',
          background: c.line,
          opacity,
          boxShadow: `0 0 10px ${c.line}`,
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        }}
      />
    </div>
  );
}
