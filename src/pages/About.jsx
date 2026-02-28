import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { label: 'FOLLOWERS', value: 1765, suffix: '+', icon: '👥' },
  { label: 'EST.', value: 2020, suffix: '', icon: '📅' },
  { label: 'EVENTS', value: 20, suffix: '+', icon: '🏁' },
  { label: 'COMMUNITY', value: 3, suffix: 'K+', icon: '⭐' },
];

function AnimatedCounter({ value, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <>{count}{suffix}</>;
}

const highlights = [
  { text: 'Car Shows', icon: '🏆' },
  { text: 'Burnout Competitions', icon: '🔥' },
  { text: 'Charity Toy Runs', icon: '🎁' },
  { text: 'Bass-Offs', icon: '🔊' },
  { text: 'Two-Step Showdowns', icon: '💥' },
  { text: 'Power Wheels Races', icon: '🏎️' },
  { text: 'Low Car Limbo', icon: '⬇️' },
  { text: 'Cruises', icon: '🛣️' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} style={{ padding: '100px 20px', background: 'linear-gradient(180deg, #050508 0%, #0a0a1e 50%, #050508 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,245,212,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,212,0.025) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,47,190,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="section-title neon-text-teal"
        >
          [ ABOUT US ]
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '50px', alignItems: 'start' }}>
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ fontSize: '0.85rem', lineHeight: 2.2, color: 'rgba(240,240,255,0.8)', fontFamily: 'Orbitron, monospace', letterSpacing: '1px' }}>
              <p style={{ marginBottom: '20px' }}>
                Lady Driven New England is the New England automotive community <strong style={{ color: 'var(--teal)' }}>for women, by women</strong>. Est. 2020, LDNE was created to provide a platform for New England-based lady motor enthusiasts of all kinds.
              </p>
              <p style={{ marginBottom: '20px' }}>
                We host car shows, burnout competitions, charity toy runs, cruises, and so much more — all in a <strong style={{ color: 'var(--pink)' }}>supportive, no-pressure environment</strong> where women can learn, connect, and thrive.
              </p>
              <p style={{ color: 'var(--pink)', textShadow: '0 0 5px var(--pink)', fontSize: '0.9rem' }}>
                Whether you&apos;re brand new or a seasoned pro — there&apos;s a seat for you here.
              </p>
            </div>

            {/* Instagram gallery placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '30px' }}
            >
              {[1, 2, 3].map((n) => (
                <motion.div
                  key={n}
                  whileHover={{ scale: 1.05, borderColor: 'var(--pink)' }}
                  style={{
                    aspectRatio: '1',
                    background: `linear-gradient(135deg, rgba(123,47,190,0.15) 0%, rgba(255,45,120,0.1) 100%)`,
                    border: '1px solid rgba(123,47,190,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.5rem',
                    color: 'rgba(240,240,255,0.3)',
                    letterSpacing: '1px',
                    fontFamily: 'Orbitron',
                    transition: 'all 0.3s',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  {/* Replace src with your Instagram photos: /images/gallery-{n}.jpg */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>📸</div>
                    <div>PHOTO {n}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '30px', flexWrap: 'wrap' }}>
              <motion.a
                href="#join"
                className="btn-neon"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-block', textDecoration: 'none' }}
              >
                JOIN THE TEAM →
              </motion.a>
              <motion.a
                href="https://www.instagram.com/ladydrivennewengland/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon btn-pink"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-block', textDecoration: 'none' }}
              >
                FOLLOW US →
              </motion.a>
            </div>
          </motion.div>

          {/* Stats + activity highlights */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.05, borderColor: 'var(--pink)', boxShadow: '0 0 20px rgba(255,45,120,0.15)' }}
                  style={{
                    background: 'rgba(123, 47, 190, 0.08)',
                    border: '1px solid rgba(123, 47, 190, 0.3)',
                    padding: '22px 15px',
                    textAlign: 'center',
                    cursor: 'default',
                    transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,245,212,0.3), transparent)' }} />
                  <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{s.icon}</div>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.5rem', fontWeight: 900, color: 'var(--teal)', textShadow: '0 0 10px var(--teal)' }}>
                    <AnimatedCounter value={s.value} suffix={s.suffix} inView={inView} />
                  </div>
                  <div style={{ fontSize: '0.55rem', letterSpacing: '2px', color: 'rgba(240,240,255,0.5)', marginTop: '6px' }}>{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* What we do tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <div style={{ fontSize: '0.6rem', letterSpacing: '3px', color: 'rgba(0,245,212,0.6)', marginBottom: '12px', fontFamily: 'Orbitron' }}>WHAT WE DO</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {highlights.map((h, i) => (
                  <motion.span
                    key={h.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.7 + i * 0.05 }}
                    whileHover={{ scale: 1.08, borderColor: 'var(--teal)', background: 'rgba(0,245,212,0.08)' }}
                    style={{
                      fontSize: '0.6rem',
                      padding: '6px 12px',
                      border: '1px solid rgba(123,47,190,0.3)',
                      color: 'rgba(240,240,255,0.7)',
                      letterSpacing: '1px',
                      fontFamily: 'Orbitron',
                      transition: 'all 0.3s',
                      cursor: 'default',
                    }}
                  >
                    {h.icon} {h.text}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
