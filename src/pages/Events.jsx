import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const events = [
  { date: 'MAR 15', year: '2026', name: 'SPRING KICKOFF CRUISE', location: 'Providence, RI', type: 'CRUISE', description: 'Annual spring opener — dust off your ride and join the convoy through scenic New England back roads.', color: 'var(--teal)', spots: '42 SPOTS LEFT' },
  { date: 'APR 05', year: '2026', name: 'TRACK DAY @ NHMS', location: 'Loudon, NH', type: 'TRACK', description: 'Ladies-only track day at New Hampshire Motor Speedway. All experience levels welcome.', color: 'var(--pink)', spots: '18 SPOTS LEFT' },
  { date: 'MAY 20', year: '2026', name: 'NE CAR SHOW SEASON OPENER', location: 'Boston, MA', type: 'SHOW', description: 'The biggest women-led car show in New England. Trophies, vendors, and good vibes.', color: 'var(--purple-bright)', spots: 'REGISTRATION OPEN' },
  { date: 'JUN 14', year: '2026', name: 'COASTAL CRUISE NIGHT', location: 'Newport, RI', type: 'CRUISE', description: 'Sunset cruise along the Newport coastline. Arrive and shine — bring your best ride.', color: 'var(--teal)', spots: 'OPEN' },
];

export default function Events() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="events" ref={ref} style={{ padding: '100px 20px', background: 'linear-gradient(180deg, #050508 0%, #0a0a1e 100%)', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-title neon-text-teal"
        >
          [ UPCOMING EVENTS ]
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {events.map((e, i) => (
            <motion.div
              key={e.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.01, x: 5 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr auto',
                gap: '25px',
                alignItems: 'center',
                background: 'rgba(10,10,15,0.9)',
                border: `1px solid ${e.color}40`,
                padding: '25px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
              }}
            >
              {/* Glow line on left */}
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: e.color, boxShadow: `0 0 10px ${e.color}` }} />

              {/* Date */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '1.1rem', color: e.color, textShadow: `0 0 10px ${e.color}`, lineHeight: 1.2 }}>{e.date}</div>
                <div style={{ fontSize: '0.6rem', color: 'rgba(240,240,255,0.4)', letterSpacing: '1px', marginTop: '4px' }}>{e.year}</div>
              </div>

              {/* Event info */}
              <div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.55rem', padding: '3px 8px', background: `${e.color}20`, border: `1px solid ${e.color}60`, color: e.color, letterSpacing: '2px' }}>{e.type}</span>
                  <span style={{ fontSize: '0.6rem', color: 'rgba(240,240,255,0.4)', letterSpacing: '1px' }}>📍 {e.location}</span>
                </div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', fontWeight: 700, color: 'var(--white)', marginBottom: '8px', letterSpacing: '1px' }}>{e.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(240,240,255,0.6)', lineHeight: 1.7 }}>{e.description}</div>
              </div>

              {/* Spots */}
              <div style={{ textAlign: 'right', minWidth: '100px' }}>
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ fontSize: '0.55rem', color: e.color, letterSpacing: '1px', marginBottom: '10px' }}
                >
                  {e.spots}
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: `0 0 15px ${e.color}` }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'none',
                    border: `1px solid ${e.color}`,
                    color: e.color,
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontFamily: 'Orbitron, monospace',
                    fontSize: '0.6rem',
                    letterSpacing: '1px',
                  }}
                >
                  REGISTER
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
