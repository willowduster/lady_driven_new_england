import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CarCarousel from './CarCarousel';
import Logo from './Logo';

/* ── Inline SVGs for hero decorations ── */
const HeroHeart = ({ size = 14, color = '#ff2d78', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const HeroStar = ({ size = 14, color = '#a855f7', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <path d="M12 0l3.09 7.26L23 8.27l-5.46 5.11L18.82 22 12 17.77 5.18 22l1.28-8.62L1 8.27l7.91-1.01z" />
  </svg>
);

const HeroSparkle = ({ size = 12, color = '#00f5d4', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <path d="M12 0L14.59 8.41 20 12l-5.41 3.59L12 24l-2.59-8.41L4 12l5.41-3.59z" />
  </svg>
);

export default function HeroSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const carouselY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  // Mouse-reactive gradient — rAF-throttled CSS variable update
  const [mouseGrad, setMouseGrad] = useState({ x: 50, y: 50 });
  const rafRef = useRef(null);
  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        setMouseGrad({
          x: ((e.clientX - rect.left) / rect.width * 100),
          y: ((e.clientY - rect.top) / rect.height * 100),
        });
      }
      rafRef.current = null;
    });
  }, []);
  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  // Typed text effect for tagline
  const [typedText, setTypedText] = useState('');
  const fullText = 'Women Who Drive — Women Who Thrive';
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  // Mixed floating particles: hearts, stars, sparkles, dots
  const floatingItems = useMemo(() =>
    Array.from({ length: 35 }, (_, i) => {
      const type = i % 5 === 0 ? 'heart' : i % 5 === 1 ? 'star' : i % 5 === 2 ? 'sparkle' : 'dot';
      const colors = ['#ff2d78', '#ff6eb4', '#a855f7', '#00f5d4', '#7b2fbe'];
      return {
        id: i,
        type,
        left: `${(i * 2.9 + Math.random() * 6) % 100}%`,
        top: `${30 + Math.random() * 65}%`,
        color: colors[i % colors.length],
        delay: `${(Math.random() * 5).toFixed(1)}s`,
        dur: `${(Math.random() * 3 + 4).toFixed(1)}s`,
        size: type === 'dot' ? Math.random() * 2 + 1 : 6 + Math.random() * 10,
      };
    }), []);

  // Logo entrance sparkle burst (around logo, staggered)
  const logoBurstItems = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      angle: (i / 10) * 360,
      distance: 80 + Math.random() * 60,
      size: 8 + (i % 3) * 4,
      color: ['#ff2d78', '#00f5d4', '#a855f7', '#ff6eb4', '#00f5d4'][i % 5],
      delay: 0.6 + i * 0.06,
    })), []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
        background: 'linear-gradient(180deg, #030306 0%, #0d0618 40%, #100820 60%, #050508 100%)',
      }}
    >
      {/* Mouse-reactive gradient overlay (pink tinted) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(600px circle at ${mouseGrad.x}% ${mouseGrad.y}%, rgba(255,45,120,0.06) 0%, rgba(123,47,190,0.04) 30%, transparent 50%)`,
          pointerEvents: 'none',
          transition: 'background 0.3s ease-out',
        }}
      />

      {/* Grid background with parallax */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(123, 47, 190, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123, 47, 190, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          y: gridY,
        }}
      />

      {/* Perspective grid floor */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '-20%',
        right: '-20%',
        height: '40%',
        backgroundImage: `
          linear-gradient(rgba(123,47,190,0.12) 1px, transparent 1px),
          linear-gradient(90deg, rgba(123,47,190,0.08) 1px, transparent 1px)
        `,
        backgroundSize: '60px 30px',
        transform: 'perspective(500px) rotateX(60deg)',
        transformOrigin: 'bottom center',
        maskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 80%)',
        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 80%)',
      }} />

      {/* CSS-only floating orbs (pink-purple tinted) */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Horizon glow line — CSS animation */}
      <div className="hero-horizon-glow" />

      {/* Mixed floating particles: hearts, stars, sparkles, dots */}
      {floatingItems.map((item) => (
        item.type === 'dot' ? (
          <div
            key={item.id}
            className="hero-particle"
            style={{
              left: item.left,
              top: item.top,
              width: `${item.size}px`,
              height: `${item.size}px`,
              background: item.color,
              animationDelay: item.delay,
              animationDuration: item.dur,
            }}
          />
        ) : (
          <div
            key={item.id}
            className="hero-shape-float"
            style={{
              position: 'absolute',
              left: item.left,
              top: item.top,
              animationDelay: item.delay,
              animationDuration: item.dur,
            }}
          >
            {item.type === 'heart' && (
              <HeroHeart size={item.size} color={item.color} style={{ filter: `drop-shadow(0 0 2px ${item.color})`, opacity: 0.6 }} />
            )}
            {item.type === 'star' && (
              <HeroStar size={item.size} color={item.color} style={{ filter: `drop-shadow(0 0 2px ${item.color})`, opacity: 0.5 }} />
            )}
            {item.type === 'sparkle' && (
              <HeroSparkle size={item.size} color={item.color} style={{ filter: `drop-shadow(0 0 2px ${item.color})`, opacity: 0.6 }} />
            )}
          </div>
        )
      ))}

      {/* Title with parallax */}
      <motion.div
        style={{
          textAlign: 'center',
          marginBottom: '40px',
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '900px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          y: titleY,
          opacity: titleOpacity,
        }}
      >
        {/* Logo with dramatic entrance + sparkle burst */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo size="hero" animate />
          </motion.div>

          {/* Sparkle burst around logo on entrance */}
          {logoBurstItems.map((item) => (
            <motion.div
              key={`burst-${item.id}`}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.2, 1, 0.5],
                x: Math.cos(item.angle * Math.PI / 180) * item.distance,
                y: Math.sin(item.angle * Math.PI / 180) * item.distance,
              }}
              transition={{ duration: 1.4, delay: item.delay, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                pointerEvents: 'none',
              }}
            >
              {item.id % 3 === 0
                ? <HeroHeart size={item.size} color={item.color} style={{ filter: `drop-shadow(0 0 3px ${item.color})` }} />
                : item.id % 3 === 1
                ? <HeroStar size={item.size} color={item.color} style={{ filter: `drop-shadow(0 0 3px ${item.color})` }} />
                : <HeroSparkle size={item.size} color={item.color} style={{ filter: `drop-shadow(0 0 3px ${item.color})` }} />
              }
            </motion.div>
          ))}
        </div>

        {/* Sparkle divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '2px',
            width: '100%',
            position: 'relative',
            background: 'linear-gradient(90deg, transparent, var(--pink), var(--teal), var(--pink), transparent)',
            margin: '18px auto',
            transformOrigin: 'center',
            boxShadow: '0 0 12px rgba(255,45,120,0.3), 0 0 25px rgba(0,245,212,0.15)',
          }}
        >
          <div className="hero-divider-sparkle" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(0.6rem, 2vw, 0.9rem)',
            color: 'rgba(240,240,255,0.7)',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            minHeight: '1.5em',
            width: '100%',
          }}
        >
          {typedText}
          <span className="hero-cursor-blink" style={{ color: 'var(--pink)', marginLeft: '2px' }}>♡</span>
        </motion.p>
      </motion.div>

      {/* Car Carousel with parallax */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', position: 'relative', zIndex: 1, y: carouselY }}
      >
        <CarCarousel />
      </motion.div>

      {/* CSS-animated scroll indicator */}
      <div className="hero-scroll-indicator">
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '0.65rem',
          color: 'rgba(255,45,120,0.35)',
          letterSpacing: '3px',
        }}>
          ♡ SCROLL ♡
        </div>
        <div style={{
          width: '1px',
          height: '30px',
          background: 'linear-gradient(to bottom, rgba(255,45,120,0.5), transparent)',
        }} />
      </div>
    </section>
  );
}
