import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { label: 'Members', value: '50+', icon: '👥' },
  { label: 'Events/Year', value: '20+', icon: '🏁' },
  { label: 'Miles Driven', value: '10K+', icon: '🛣️' },
  { label: 'Years Strong', value: '5+', icon: '⭐' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} style={{ padding: '100px 20px', background: 'linear-gradient(180deg, #050508 0%, #0a0a1e 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,245,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,212,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-title neon-text-teal"
        >
          [ ABOUT US ]
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{ fontSize: '0.85rem', lineHeight: 2, color: 'rgba(240,240,255,0.8)', fontFamily: 'Orbitron, monospace', letterSpacing: '1px' }}>
              <p style={{ marginBottom: '20px' }}>
                Lady Driven New England is more than a car club — it&apos;s a movement. Founded by women who live and breathe automotive culture, we&apos;re here to prove that the fast lane has no gender.
              </p>
              <p style={{ color: 'var(--pink)', textShadow: '0 0 5px var(--pink)' }}>
                From track days to car shows, cruises to community events, we bring the fire and the finesse.
              </p>
            </div>
            <motion.a
              href="#join"
              className="btn-neon"
              whileHover={{ scale: 1.05 }}
              style={{ display: 'inline-block', marginTop: '30px', textDecoration: 'none' }}
            >
              JOIN THE MOVEMENT →
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'var(--pink)' }}
                style={{
                  background: 'rgba(123, 47, 190, 0.1)',
                  border: '1px solid rgba(123, 47, 190, 0.4)',
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'default',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{s.icon}</div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.5rem', fontWeight: 900, color: 'var(--teal)', textShadow: '0 0 10px var(--teal)' }}>{s.value}</div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '2px', color: 'rgba(240,240,255,0.5)', marginTop: '5px' }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
