import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CarCarousel from './CarCarousel';
import Logo from './Logo';

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

  // 30 CSS-animated particles (balanced from original 50)
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${40 + Math.random() * 60}%`,
    color: ['var(--pink)', 'var(--teal)', 'var(--purple-bright)'][i % 3],
    delay: `${(Math.random() * 4).toFixed(1)}s`,
    dur: `${(Math.random() * 3 + 4).toFixed(1)}s`,
    size: Math.random() * 2 + 1,
  }));

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
        background: 'linear-gradient(180deg, #030306 0%, #0a0a1e 40%, #0d0d22 60%, #050508 100%)',
      }}
    >
      {/* Mouse-reactive gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(600px circle at ${mouseGrad.x}% ${mouseGrad.y}%, rgba(123,47,190,0.08) 0%, transparent 50%)`,
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
            linear-gradient(rgba(123, 47, 190, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123, 47, 190, 0.06) 1px, transparent 1px)
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
          linear-gradient(rgba(123,47,190,0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(123,47,190,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 30px',
        transform: 'perspective(500px) rotateX(60deg)',
        transformOrigin: 'bottom center',
        maskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 80%)',
        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 80%)',
      }} />

      {/* CSS-only floating orbs (no blur filter, no JS animation) */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Horizon glow line — CSS animation */}
      <div className="hero-horizon-glow" />

      {/* CSS-only particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="hero-particle"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
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
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className="hero-subtitle-pulse"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 'clamp(0.5rem, 1.5vw, 0.9rem)',
              color: 'var(--teal)',
              letterSpacing: '8px',
              marginBottom: '18px',
              textShadow: '0 0 15px var(--teal), 0 0 30px rgba(0,245,212,0.3)',
            }}
          >
            ★ NEW ENGLAND ★
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <Logo size="hero" animate />
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '2px',
            width: '100%',
            background: 'linear-gradient(90deg, transparent, var(--teal), var(--pink), var(--teal), transparent)',
            margin: '18px auto',
            transformOrigin: 'center',
            boxShadow: '0 0 10px rgba(0,245,212,0.3)',
          }}
        />

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
          <span className="hero-cursor-blink" style={{ color: 'var(--teal)', marginLeft: '2px' }}>▌</span>
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
          color: 'rgba(240,240,255,0.3)',
          letterSpacing: '3px',
        }}>
          SCROLL
        </div>
        <div style={{
          width: '1px',
          height: '30px',
          background: 'linear-gradient(to bottom, rgba(0,245,212,0.5), transparent)',
        }} />
      </div>
    </section>
  );
}
