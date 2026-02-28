import { useEffect, useRef, useState } from 'react';

const SPARKLE_LIMIT = 20;
const SPARKLE_INTERVAL = 60; // ms between sparkle spawns
const SPARKLE_LIFETIME = 800; // ms before sparkle fully fades

// 4-point star SVG path (sparkle shape)
const StarSVG = ({ size, color, opacity, rotation }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
    <path
      d="M12 0 L14 9 L24 12 L14 15 L12 24 L10 15 L0 12 L10 9 Z"
      fill={color}
      opacity={opacity}
      transform={`rotate(${rotation} 12 12)`}
    />
  </svg>
);

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const sparklesRef = useRef([]);
  const lastSparkleTime = useRef(0);
  const hoveringRef = useRef(false);

  useEffect(() => {
    hoveringRef.current = hovering;
  }, [hovering]);

  useEffect(() => {
    if ('ontouchstart' in window) return;

    let rafId = null;
    let latestX = -100;
    let latestY = -100;
    let cleanupTimer = null;

    const update = () => {
      setPos({ x: latestX, y: latestY });

      const now = performance.now();
      if (now - lastSparkleTime.current > SPARKLE_INTERVAL) {
        lastSparkleTime.current = now;

        // Random offset from cursor for organic feel
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;
        const size = 8 + Math.random() * 14;
        const rotation = Math.random() * 45;

        const newSparkle = {
          x: latestX + offsetX,
          y: latestY + offsetY,
          id: now + Math.random(),
          born: now,
          size,
          rotation,
          pink: hoveringRef.current,
        };

        sparklesRef.current = [newSparkle, ...sparklesRef.current].slice(0, SPARKLE_LIMIT);
        setSparkles([...sparklesRef.current]);
      }

      // Clean up dead sparkles periodically
      if (!cleanupTimer) {
        cleanupTimer = setTimeout(() => {
          const cutoff = performance.now() - SPARKLE_LIFETIME;
          sparklesRef.current = sparklesRef.current.filter(s => s.born > cutoff);
          setSparkles([...sparklesRef.current]);
          cleanupTimer = null;
        }, SPARKLE_LIFETIME);
      }

      rafId = null;
    };

    const onMove = (e) => {
      latestX = e.clientX;
      latestY = e.clientY;
      if (!visible) setVisible(true);
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    const onOver = (e) => {
      const t = e.target;
      setHovering(
        t.tagName === 'A' || t.tagName === 'BUTTON' ||
        !!t.closest('a') || !!t.closest('button') ||
        t.style?.cursor === 'pointer'
      );
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.textContent = 'a,button,[role="button"]{cursor:none!important}';
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      document.body.style.cursor = '';
      style.remove();
      if (rafId) cancelAnimationFrame(rafId);
      if (cleanupTimer) clearTimeout(cleanupTimer);
    };
  }, [visible]);

  if (!visible) return null;

  const now = performance.now();

  return (
    <>
      {/* Sparkles that fade */}
      {sparkles.map((s) => {
        const age = now - s.born;
        const life = Math.max(0, 1 - age / SPARKLE_LIFETIME);
        if (life <= 0) return null;
        // Sparkles drift upward and scale down as they fade
        const driftY = age * -0.03;
        const scale = 0.3 + life * 0.7;
        const opacity = life * 0.8;
        return (
          <div
            key={s.id}
            style={{
              position: 'fixed',
              left: s.x,
              top: s.y + driftY,
              pointerEvents: 'none',
              zIndex: 99999,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity,
              transition: 'opacity 0.1s',
            }}
          >
            <StarSVG
              size={s.size}
              color={s.pink ? '#ff2d78' : '#00f5d4'}
              opacity={1}
              rotation={s.rotation}
            />
          </div>
        );
      })}

      {/* Main cursor */}
      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          width: hovering ? '44px' : '32px',
          height: hovering ? '44px' : '32px',
          borderRadius: '50%',
          border: `1.5px solid ${hovering ? 'var(--pink)' : 'rgba(0,245,212,0.5)'}`,
          background: hovering ? 'rgba(255,45,120,0.08)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 100000,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, background 0.2s',
          willChange: 'left, top',
          mixBlendMode: 'difference',
        }}
      >
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: '6px', height: '6px',
          borderRadius: '50%',
          background: 'var(--teal)',
          transform: 'translate(-50%,-50%)',
          boxShadow: '0 0 8px var(--teal)',
        }} />
      </div>
    </>
  );
}
