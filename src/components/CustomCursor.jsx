import { useEffect, useRef, useState } from 'react';

const TRAIL_LENGTH = 12;
const TRAIL_INTERVAL = 40; // ms between trail samples

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [trail, setTrail] = useState([]);
  const trailRef = useRef([]);
  const lastTrailTime = useRef(0);

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window) return;

    let rafId = null;
    let latestX = -100;
    let latestY = -100;

    const update = () => {
      setPos({ x: latestX, y: latestY });

      // Sample trail at intervals
      const now = performance.now();
      if (now - lastTrailTime.current > TRAIL_INTERVAL) {
        lastTrailTime.current = now;
        trailRef.current = [
          { x: latestX, y: latestY, id: now },
          ...trailRef.current,
        ].slice(0, TRAIL_LENGTH);
        setTrail([...trailRef.current]);
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
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Trail dots */}
      {trail.map((t, i) => {
        const progress = i / TRAIL_LENGTH;
        const size = Math.max(2, 8 * (1 - progress));
        const opacity = 0.5 * (1 - progress);
        return (
          <div
            key={t.id}
            style={{
              position: 'fixed',
              left: t.x,
              top: t.y,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              background: hovering
                ? `rgba(255, 45, 120, ${opacity})`
                : `rgba(0, 245, 212, ${opacity})`,
              pointerEvents: 'none',
              zIndex: 99999,
              transform: 'translate(-50%, -50%)',
              willChange: 'left, top',
            }}
          />
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
