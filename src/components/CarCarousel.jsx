import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cars = [
  {
    id: 1,
    name: 'SHADOW VIPER',
    driver: 'ALEXIA STORM',
    model: '2003 Dodge Viper SRT-10',
    color: '#7b2fbe',
    stats: { speed: 95, handling: 80, style: 98 },
    emoji: '🐍',
    description: '"Speed is an art form."',
    accent: 'var(--purple-bright)',
  },
  {
    id: 2,
    name: 'NEON PHANTOM',
    driver: 'ZARA NIGHT',
    model: '1999 Nissan Skyline GT-R R34',
    color: '#ff2d78',
    stats: { speed: 92, handling: 96, style: 90 },
    emoji: '👻',
    description: '"The road is my runway."',
    accent: 'var(--pink)',
  },
  {
    id: 3,
    name: 'TEAL LIGHTNING',
    driver: 'MAYA SWIFT',
    model: '2001 Toyota Supra MK4',
    color: '#00f5d4',
    stats: { speed: 98, handling: 88, style: 94 },
    emoji: '⚡',
    description: '"Born to race, built to win."',
    accent: 'var(--teal)',
  },
  {
    id: 4,
    name: 'CRIMSON WITCH',
    driver: 'LUNA CROSS',
    model: '1998 Mitsubishi Eclipse GSX',
    color: '#ff2d78',
    stats: { speed: 87, handling: 94, style: 99 },
    emoji: '🔮',
    description: '"Spells and speed — that\'s my game."',
    accent: 'var(--pink-bright)',
  },
  {
    id: 5,
    name: 'PURPLE REIGN',
    driver: 'NOVA BLADE',
    model: '2004 Subaru Impreza WRX STI',
    color: '#a855f7',
    stats: { speed: 90, handling: 97, style: 91 },
    emoji: '👑',
    description: '"All-wheel dominance."',
    accent: 'var(--purple-bright)',
  },
];

function StatBar({ label, value, color }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.55rem', letterSpacing: '2px', color: 'rgba(240,240,255,0.7)' }}>
        <span>{label}</span>
        <span style={{ color }}>{value}/100</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          style={{ height: '100%', background: `linear-gradient(90deg, ${color}, white)`, borderRadius: '3px', boxShadow: `0 0 8px ${color}` }}
        />
      </div>
    </div>
  );
}

export default function CarCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + cars.length) % cars.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % cars.length);
  };

  const car = cars[current];

  const variants = {
    enter: (dir) => ({ x: dir * 300, opacity: 0, scale: 0.8 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir * -300, opacity: 0, scale: 0.8 }),
  };

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      {/* PS1-style header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 'clamp(0.6rem, 2vw, 1rem)',
        color: 'var(--teal)',
        textShadow: '0 0 15px var(--teal)',
        letterSpacing: '4px',
        animation: 'pulse-neon 2s infinite',
      }}>
        ▶ SELECT YOUR CAR ◀
      </div>

      {/* Main carousel area */}
      <div style={{
        position: 'relative',
        background: 'rgba(10, 10, 15, 0.9)',
        border: `2px solid ${car.color}`,
        boxShadow: `0 0 30px ${car.color}40, inset 0 0 30px rgba(0,0,0,0.5)`,
        padding: '30px',
        transition: 'border-color 0.5s, box-shadow 0.5s',
        overflow: 'hidden',
      }}>
        {/* Scanline overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)',
          pointerEvents: 'none', zIndex: 10,
        }} />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'center' }}
          >
            {/* Car display */}
            <div style={{ textAlign: 'center' }}>
              <motion.div
                animate={{ y: [0, -15, 0], filter: ['drop-shadow(0 0 20px ' + car.color + ')', 'drop-shadow(0 0 40px ' + car.color + ')', 'drop-shadow(0 0 20px ' + car.color + ')'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', marginBottom: '15px', display: 'block' }}
              >
                {car.emoji}
              </motion.div>
              
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 'clamp(0.8rem, 2.5vw, 1.3rem)',
                color: car.accent,
                textShadow: `0 0 15px ${car.color}`,
                marginBottom: '8px',
                letterSpacing: '2px',
              }}>
                {car.name}
              </div>
              
              <div style={{
                fontSize: '0.65rem',
                color: 'rgba(240,240,255,0.6)',
                letterSpacing: '1px',
                fontFamily: 'Orbitron, monospace',
              }}>
                {car.model}
              </div>
            </div>

            {/* Driver info and stats */}
            <div>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '0.6rem', color: 'rgba(240,240,255,0.5)', letterSpacing: '3px', marginBottom: '5px' }}>
                  DRIVER
                </div>
                <div style={{
                  fontFamily: 'Orbitron, monospace',
                  fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                  fontWeight: 900,
                  color: 'var(--white)',
                  letterSpacing: '3px',
                }}>
                  {car.driver}
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: 'rgba(240,240,255,0.6)',
                  fontStyle: 'italic',
                  marginTop: '5px',
                }}>
                  {car.description}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.55rem', color: 'rgba(240,240,255,0.5)', letterSpacing: '3px', marginBottom: '12px' }}>
                  STATS
                </div>
                <StatBar label="SPEED" value={car.stats.speed} color={car.color} />
                <StatBar label="HANDLING" value={car.stats.handling} color={car.color} />
                <StatBar label="STYLE" value={car.stats.style} color={car.color} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '25px', position: 'relative', zIndex: 20 }}>
          <motion.button
            whileHover={{ scale: 1.2, color: car.color }}
            whileTap={{ scale: 0.9 }}
            onClick={prev}
            style={{
              background: 'none',
              border: `1px solid ${car.color}`,
              color: 'var(--white)',
              padding: '10px 20px',
              cursor: 'pointer',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.8rem',
              transition: 'all 0.3s',
            }}
          >
            ◄
          </motion.button>

          {/* Car selector dots */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {cars.map((c, i) => (
              <motion.button
                key={c.id}
                onClick={() => goTo(i)}
                whileHover={{ scale: 1.3 }}
                style={{
                  width: current === i ? '20px' : '10px',
                  height: '10px',
                  borderRadius: current === i ? '5px' : '50%',
                  background: current === i ? car.color : 'rgba(255,255,255,0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: current === i ? `0 0 10px ${car.color}` : 'none',
                }}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.2, color: car.color }}
            whileTap={{ scale: 0.9 }}
            onClick={next}
            style={{
              background: 'none',
              border: `1px solid ${car.color}`,
              color: 'var(--white)',
              padding: '10px 20px',
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

      {/* Car counter */}
      <div style={{
        textAlign: 'center',
        marginTop: '15px',
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '0.6rem',
        color: 'rgba(240,240,255,0.4)',
        letterSpacing: '3px',
      }}>
        {String(current + 1).padStart(2, '0')} / {String(cars.length).padStart(2, '0')}
      </div>
    </div>
  );
}
