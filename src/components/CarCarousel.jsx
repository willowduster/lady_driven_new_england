import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const highlights = [
  {
    id: 1,
    title: 'BURNOUT COMPETITIONS',
    subtitle: 'TIRE-SHREDDING ACTION',
    description: 'Watch our members light up the tires at sanctioned burnout events across New England.',
    color: '#ff2d78',
    emoji: '🔥',
    accent: 'var(--pink)',
    tag: 'FAN FAVORITE',
  },
  {
    id: 2,
    title: 'CHARITY TOY RUNS',
    subtitle: 'GIVING BACK',
    description: 'Our annual toy runs bring the car community together for kids in need every holiday season.',
    color: '#00f5d4',
    emoji: '🎁',
    accent: 'var(--teal)',
    tag: 'COMMUNITY',
  },
  {
    id: 3,
    title: 'TWO-STEP SHOWDOWNS',
    subtitle: 'FLAMES & THUNDER',
    description: 'Anti-lag, flames, and bragging rights. Our two-step competitions bring the heat.',
    color: '#7b2fbe',
    emoji: '💥',
    accent: 'var(--purple-bright)',
    tag: 'COMPETITION',
  },
  {
    id: 4,
    title: 'CRUISE NIGHTS',
    subtitle: 'ROLL TOGETHER',
    description: 'Nothing beats a sunset cruise with the crew through the scenic New England backroads.',
    color: '#ff2d78',
    emoji: '🌅',
    accent: 'var(--pink)',
    tag: 'SIGNATURE',
  },
  {
    id: 5,
    title: 'POWER WHEELS RACES',
    subtitle: 'TINY CARS, BIG FUN',
    description: 'Adults in Power Wheels — what could go wrong? Our wildest and funniest event.',
    color: '#00f5d4',
    emoji: '🏎️',
    accent: 'var(--teal)',
    tag: 'FAN FAVORITE',
  },
];

export default function CarCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);
  const touchRef = useRef({ startX: 0, startY: 0 });

  const goTo = useCallback((idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + highlights.length) % highlights.length);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % highlights.length);
  }, []);

  // Auto-advance every 6 seconds
  useEffect(() => {
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  // Reset timer on manual navigation
  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 6000);
  }, [next]);

  // Touch / swipe support
  const handleTouchStart = (e) => {
    touchRef.current.startX = e.touches[0].clientX;
    touchRef.current.startY = e.touches[0].clientY;
  };
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchRef.current.startX;
    const dy = e.changedTouches[0].clientY - touchRef.current.startY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) { next(); } else { prev(); }
      resetTimer();
    }
  };

  const item = highlights[current];

  const variants = {
    enter: (dir) => ({ x: dir * 200, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir * -200, opacity: 0, scale: 0.95 }),
  };

  return (
    <div
      style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '20px' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '25px',
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 'clamp(0.65rem, 2vw, 1rem)',
        color: 'var(--teal)',
        textShadow: '0 0 15px var(--teal)',
        letterSpacing: '3px',
        animation: 'pulse-neon 2s infinite',
      }}>
        ▶ EVENT HIGHLIGHTS ◀
      </div>

      {/* Main carousel area */}
      <div style={{
        position: 'relative',
        background: 'rgba(10, 10, 15, 0.9)',
        border: `1px solid ${item.color}40`,
        boxShadow: `0 0 40px ${item.color}15, inset 0 0 40px rgba(0,0,0,0.5)`,
        padding: 'clamp(20px, 4vw, 35px)',
        transition: 'border-color 0.6s, box-shadow 0.6s',
        overflow: 'hidden',
      }}>
        {/* Scanline overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)',
          pointerEvents: 'none', zIndex: 10,
        }} />

        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', width: '300px', height: '300px',
          transform: 'translate(-50%, -50%)', borderRadius: '50%',
          background: `radial-gradient(circle, ${item.color}10 0%, transparent 70%)`,
          pointerEvents: 'none', transition: 'background 0.6s',
        }} />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', zIndex: 5 }}
          >
            {/* Tag */}
            <div style={{
              display: 'inline-block',
              padding: '4px 12px',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '3px',
              color: item.accent,
              border: `1px solid ${item.color}40`,
              background: `${item.color}10`,
              fontFamily: 'Orbitron, monospace',
              marginBottom: '20px',
            }}>
              {item.tag}
            </div>

            {/* Emoji + Title block — stacks on mobile */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(15px, 3vw, 30px)',
              marginBottom: '20px',
              flexWrap: 'wrap',
            }}>
              <div
                className="carousel-emoji-float"
                style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: 1, flexShrink: 0, filter: `drop-shadow(0 0 15px ${item.color})` }}
              >
                {item.emoji}
              </div>

              <div style={{ flex: 1, minWidth: '150px' }}>
                <div style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 'clamp(0.8rem, 2.5vw, 1.2rem)',
                  color: item.accent,
                  textShadow: `0 0 12px ${item.color}`,
                  letterSpacing: '2px',
                  marginBottom: '6px',
                  lineHeight: 1.5,
                }}>
                  {item.title}
                </div>
                <div style={{
                  fontFamily: 'Orbitron, monospace',
                  fontSize: 'clamp(0.65rem, 1.4vw, 0.8rem)',
                  color: 'rgba(240,240,255,0.4)',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                }}>
                  {item.subtitle}
                </div>
              </div>
            </div>

            {/* Description */}
            <p style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)',
              color: 'rgba(240,240,255,0.6)',
              lineHeight: 2,
              letterSpacing: '1px',
              maxWidth: '600px',
            }}>
              {item.description}
            </p>

            {/* Image placeholder area */}
            <div style={{
              marginTop: '20px',
              height: 'clamp(100px, 15vw, 150px)',
              background: `linear-gradient(135deg, ${item.color}08, ${item.color}03)`,
              border: `1px dashed ${item.color}25`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Orbitron',
              fontSize: '0.7rem',
              color: 'rgba(240,240,255,0.25)',
              letterSpacing: '3px',
            }}>
              {/* Replace with: <img src={`/images/event-${item.id}.jpg`} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
              📸 EVENT PHOTO
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '25px', position: 'relative', zIndex: 20 }}>
          <motion.button
            whileHover={{ scale: 1.15, color: item.color }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { prev(); resetTimer(); }}
            style={{
              background: 'none',
              border: `1px solid ${item.color}60`,
              color: 'rgba(240,240,255,0.6)',
              padding: '10px 18px',
              cursor: 'pointer',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.8rem',
              transition: 'all 0.3s',
            }}
          >
            ◄
          </motion.button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {highlights.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => { goTo(i); resetTimer(); }}
                whileHover={{ scale: 1.3 }}
                style={{
                  width: current === i ? '24px' : '8px',
                  height: '8px',
                  borderRadius: current === i ? '4px' : '50%',
                  background: current === i ? item.color : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                  boxShadow: current === i ? `0 0 10px ${item.color}` : 'none',
                  padding: 0,
                }}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.15, color: item.color }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { next(); resetTimer(); }}
            style={{
              background: 'none',
              border: `1px solid ${item.color}60`,
              color: 'rgba(240,240,255,0.6)',
              padding: '10px 18px',
              cursor: 'pointer',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.8rem',
              transition: 'all 0.3s',
            }}
          >
            ►
          </motion.button>
        </div>
      </div>

      {/* Counter */}
      <div style={{
        textAlign: 'center',
        marginTop: '12px',
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '0.65rem',
        color: 'rgba(240,240,255,0.3)',
        letterSpacing: '3px',
      }}>
        {String(current + 1).padStart(2, '0')} / {String(highlights.length).padStart(2, '0')}
      </div>
    </div>
  );
}
