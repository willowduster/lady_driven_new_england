import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import CarCarousel from './CarCarousel';

function Particle({ style, delay, dur }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: '2px',
        height: '2px',
        borderRadius: '50%',
        ...style,
      }}
      animate={{
        y: [-20, -250],
        x: [0, (Math.random() - 0.5) * 60],
        opacity: [0, 0.8, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{
        duration: dur,
        repeat: Infinity,
        delay,
        ease: 'easeOut',
      }}
    />
  );
}

function FloatingOrb({ color, size, x, y, duration }) {
  return (
    <motion.div
      animate={{
        x: [0, 30, -20, 10, 0],
        y: [0, -40, 20, -10, 0],
        scale: [1, 1.2, 0.9, 1.1, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
        filter: `blur(${parseInt(size) / 3}px)`,
      }}
    />
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const carouselY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  const [particles] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${40 + Math.random() * 60}%`,
      background: ['var(--pink)', 'var(--teal)', 'var(--purple-bright)'][Math.floor(Math.random() * 3)],
      delay: Math.random() * 4,
      dur: Math.random() * 3 + 3,
      size: Math.random() * 2 + 1,
    }))
  );

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
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(600px circle at calc(${smoothX.get() || 0.5} * 100%) calc(${smoothY.get() || 0.5} * 100%), rgba(123,47,190,0.08) 0%, transparent 50%)`,
          pointerEvents: 'none',
          x: useTransform(smoothX, [0, 1], [-20, 20]),
          y: useTransform(smoothY, [0, 1], [-20, 20]),
        }}
      />

      {/* Animated grid background with parallax */}
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

      {/* Floating orbs */}
      <FloatingOrb color="var(--purple)" size="300px" x="10%" y="20%" duration={8} />
      <FloatingOrb color="var(--pink)" size="200px" x="75%" y="30%" duration={10} />
      <FloatingOrb color="var(--teal)" size="250px" x="50%" y="60%" duration={12} />

      {/* Horizon glow line */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 40px 10px rgba(123, 47, 190, 0.2)',
            '0 0 60px 15px rgba(255, 45, 120, 0.3)',
            '0 0 40px 10px rgba(0, 245, 212, 0.2)',
            '0 0 40px 10px rgba(123, 47, 190, 0.2)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '85%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--purple), var(--pink), var(--teal), var(--purple), transparent)',
        }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <Particle
          key={p.id}
          style={{
            left: p.left,
            top: p.top,
            background: p.background,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          delay={p.delay}
          dur={p.dur}
        />
      ))}

      {/* Title with parallax */}
      <motion.div
        style={{
          textAlign: 'center',
          marginBottom: '40px',
          position: 'relative',
          zIndex: 1,
          y: titleY,
          opacity: titleOpacity,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
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
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="glitch"
            data-text="LADY DRIVEN"
            style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 900,
              color: 'var(--pink)',
              textShadow: '0 0 20px var(--pink), 0 0 40px var(--pink), 0 0 80px rgba(255,45,120,0.3)',
              letterSpacing: '8px',
              lineHeight: 1,
              position: 'relative',
            }}
          >
            LADY DRIVEN
          </h1>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '2px',
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
          }}
        >
          {typedText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            style={{ color: 'var(--teal)', marginLeft: '2px' }}
          >
            ▌
          </motion.span>
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

      {/* Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.45rem',
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
        </motion.div>
      </motion.div>
    </section>
  );
}
