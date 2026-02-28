import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const events = [
  { date: 'MAR 15', year: '2026', name: 'SPRING KICKOFF CRUISE', location: 'New England', type: 'CRUISE', description: 'Annual spring opener — dust off your ride and join the convoy through scenic New England back roads. All makes and models welcome.', color: 'var(--teal)', spots: 'OPEN TO ALL' },
  { date: 'APR 19', year: '2026', name: 'PAY IT FORWARD MEMORIAL CAR SHOW', location: 'New England', type: 'SHOW', description: 'Our signature car show with trophies, vendors, live music, and good vibes. Low car limbo, burnout comp, bass-off, and more.', color: 'var(--pink)', spots: 'REGISTRATION OPEN' },
  { date: 'MAY 17', year: '2026', name: 'BURNOUT & TWO-STEP SHOWDOWN', location: 'TBA', type: 'COMPETITION', description: 'Show us what you\'ve got! Burnout competition and two-step showdown — all skill levels. Power Wheels race for the kids!', color: 'var(--purple-bright)', spots: 'SIGN UP SOON' },
  { date: 'JUN 21', year: '2026', name: 'SUMMER SUNSET CRUISE', location: 'New England Coast', type: 'CRUISE', description: 'Sunset cruise along the New England coastline. Ride together, park together, make memories together.', color: 'var(--teal)', spots: 'OPEN' },
  { date: 'DEC 06', year: '2026', name: 'GREAT NE TOY RUN', location: 'LaBelle Winery, NH', type: 'CHARITY', description: 'Annual charity toy run benefiting local children. Bring an unwrapped toy and join the convoy to LaBelle Winery.', color: 'var(--pink)', spots: 'SAVE THE DATE' },
];

export default function Events() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="events" ref={ref} style={{ padding: '100px 20px', background: 'linear-gradient(180deg, #050508 0%, #0a0a1e 50%, #050508 100%)', position: 'relative' }}>
      {/* Ambient light */}
      <div style={{ position: 'absolute', top: '30%', right: '0', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,245,212,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="section-title neon-text-teal"
        >
          [ UPCOMING EVENTS ]
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{ textAlign: 'center', fontSize: '0.75rem', color: 'rgba(240,240,255,0.5)', letterSpacing: '2px', marginBottom: '40px', marginTop: '-30px', fontFamily: 'Orbitron' }}
        >
          Follow <a href="https://www.instagram.com/ladydrivennewengland/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pink)', textDecoration: 'none' }}>@ladydrivennewengland</a> for the latest updates
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {events.map((e, i) => (
            <motion.div
              key={e.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.12, ease: [0.16, 1, 0.3, 1], duration: 0.7 }}
              whileHover={{
                scale: 1.01,
                x: 8,
                borderColor: e.color,
                boxShadow: `0 0 25px ${e.color}15`,
              }}
              style={{
                display: 'grid',
                gridTemplateColumns: '90px 1fr auto',
                gap: '20px',
                alignItems: 'center',
                background: 'rgba(10,10,15,0.85)',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '22px 25px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {/* Glow line */}
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: e.color, boxShadow: `0 0 12px ${e.color}` }} />
              {/* Top shine */}
              <div style={{ position: 'absolute', top: 0, left: '3px', right: 0, height: '1px', background: `linear-gradient(90deg, ${e.color}40, transparent 60%)` }} />

              {/* Date */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '1rem', color: e.color, textShadow: `0 0 10px ${e.color}`, lineHeight: 1.2 }}>{e.date}</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 500, color: 'rgba(240,240,255,0.4)', letterSpacing: '1px', marginTop: '4px' }}>{e.year}</div>
              </div>

              {/* Event info */}
              <div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '4px 10px', background: `${e.color}15`, border: `1px solid ${e.color}50`, color: e.color, letterSpacing: '2px', fontFamily: 'Orbitron' }}>{e.type}</span>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(240,240,255,0.45)', letterSpacing: '1px' }}>📍 {e.location}</span>
                </div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', fontWeight: 800, color: 'var(--white)', marginBottom: '8px', letterSpacing: '1px' }}>{e.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(240,240,255,0.6)', lineHeight: 1.7 }}>{e.description}</div>
              </div>

              {/* Status */}
              <div style={{ textAlign: 'right', minWidth: '90px' }}>
                <div
                  className="hero-subtitle-pulse"
                  style={{ fontSize: '0.7rem', fontWeight: 600, color: e.color, letterSpacing: '1px', marginBottom: '10px', fontFamily: 'Orbitron' }}
                >
                  {e.spots}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${e.color}40` }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'transparent',
                    border: `1px solid ${e.color}`,
                    color: e.color,
                    padding: '10px 20px',
                    cursor: 'pointer',
                    fontFamily: 'Orbitron, monospace',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    transition: 'all 0.3s',
                  }}
                >
                  DETAILS
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: '40px' }}
        >
          <motion.a
            href="https://www.facebook.com/ladydrivennewengland"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ textDecoration: 'none', display: 'inline-block' }}
          >
            SEE ALL EVENTS ON FACEBOOK →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
