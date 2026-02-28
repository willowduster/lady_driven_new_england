import { useState } from 'react';
import { motion } from 'framer-motion';
import CarCarousel from './CarCarousel';

function Particle({ style }) {
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
        y: [-20, -200],
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{
        duration: Math.random() * 3 + 2,
        repeat: Infinity,
        delay: Math.random() * 3,
        ease: 'easeOut',
      }}
    />
  );
}

export default function HeroSection() {
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${50 + Math.random() * 50}%`,
      background: ['var(--pink)', 'var(--teal)', 'var(--purple-bright)'][Math.floor(Math.random() * 3)],
    }))
  );

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
        background: 'linear-gradient(180deg, #050508 0%, #0a0a1e 50%, #050508 100%)',
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(123, 47, 190, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123, 47, 190, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Horizon glow */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, var(--purple), var(--pink), var(--teal), var(--purple), transparent)',
        boxShadow: '0 0 40px 10px rgba(123, 47, 190, 0.3)',
      }} />

      {/* Particles */}
      {particles.map((p) => (
        <Particle key={p.id} style={{ left: p.left, top: p.top, background: p.background }} />
      ))}

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: '40px', position: 'relative', zIndex: 1 }}
      >
        <motion.div
          animate={{ opacity: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(0.5rem, 1.5vw, 0.9rem)',
            color: 'var(--teal)',
            letterSpacing: '6px',
            marginBottom: '15px',
            textShadow: '0 0 10px var(--teal)',
          }}
        >
          ★ NEW ENGLAND ★
        </motion.div>

        <h1
          className="glitch"
          data-text="LADY DRIVEN"
          style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: 900,
            color: 'var(--pink)',
            textShadow: '0 0 20px var(--pink), 0 0 40px var(--pink)',
            letterSpacing: '8px',
            lineHeight: 1,
            position: 'relative',
          }}
        >
          LADY DRIVEN
        </h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--teal), transparent)',
            margin: '15px auto',
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(0.6rem, 2vw, 0.9rem)',
            color: 'rgba(240,240,255,0.7)',
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}
        >
          Women Who Drive — Women Who Thrive
        </motion.p>
      </motion.div>

      {/* Car Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ width: '100%', position: 'relative', zIndex: 1 }}
      >
        <CarCarousel />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '0.5rem',
          color: 'rgba(240,240,255,0.4)',
          letterSpacing: '2px',
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        <div>▼ SCROLL ▼</div>
      </motion.div>
    </section>
  );
}
