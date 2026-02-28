import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const gallery = [
  { id: 1, caption: 'CRUISE NIGHT', tag: 'CRUISE', color: 'var(--teal)', emoji: '🚗' },
  { id: 2, caption: 'SHOW & SHINE', tag: 'SHOW', color: 'var(--pink)', emoji: '✨' },
  { id: 3, caption: 'BURNOUT COMP', tag: 'COMPETITION', color: 'var(--purple-bright)', emoji: '🔥' },
  { id: 4, caption: 'TEAM PHOTO', tag: 'COMMUNITY', color: 'var(--pink)', emoji: '👯‍♀️' },
  { id: 5, caption: 'CHARITY RUN', tag: 'CHARITY', color: 'var(--teal)', emoji: '🎁' },
  { id: 6, caption: 'LOW CAR LIMBO', tag: 'COMPETITION', color: 'var(--purple-bright)', emoji: '⬇️' },
  { id: 7, caption: 'POWER WHEELS', tag: 'FUN', color: 'var(--pink)', emoji: '🏎️' },
  { id: 8, caption: 'BASS-OFF', tag: 'COMPETITION', color: 'var(--teal)', emoji: '🔊' },
  { id: 9, caption: 'MEETUP', tag: 'COMMUNITY', color: 'var(--purple-bright)', emoji: '🤝' },
];

const values = [
  { title: 'SUPPORTIVE', desc: 'A no-pressure, no-intimidation zone for women of all skill levels.', icon: '💪', color: 'var(--teal)' },
  { title: 'INCLUSIVE', desc: 'All makes, all models, all experience levels welcome.', icon: '🌟', color: 'var(--pink)' },
  { title: 'EMPOWERING', desc: 'Learn, grow, and build confidence in the automotive world.', icon: '🔥', color: 'var(--purple-bright)' },
  { title: 'COMMUNITY', desc: 'More than cars — we\'re a family of women who lift each other up.', icon: '❤️', color: 'var(--pink)' },
];

export default function MeetTheGirls() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section id="meet" ref={ref} style={{ padding: '100px 20px', background: 'linear-gradient(180deg, #050508 0%, #0d0d22 50%, #050508 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Grid BG */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,45,120,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,120,0.025) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      {/* Ambient glow */}
      <div style={{ position: 'absolute', bottom: '10%', left: '20%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,45,120,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="section-title neon-text-pink"
        >
          [ THE COMMUNITY ]
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{ textAlign: 'center', fontSize: '0.95rem', fontWeight: 500, color: 'rgba(240,240,255,0.65)', letterSpacing: '2px', marginBottom: '50px', marginTop: '-30px', fontFamily: 'Orbitron', maxWidth: '700px', margin: '-30px auto 50px', lineHeight: 2 }}
        >
          The New England automotive community for women, by women. We&apos;re here to connect, empower, and support female motor enthusiasts.
        </motion.p>

        {/* Photo Gallery Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '60px' }}>
          {gallery.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.04, y: -4, zIndex: 10 }}
              onHoverStart={() => setHoveredCard(item.id)}
              onHoverEnd={() => setHoveredCard(null)}
              style={{
                aspectRatio: i === 0 || i === 4 ? '1' : i === 3 ? '2/1' : '1',
                gridColumn: i === 3 ? 'span 2' : 'span 1',
                background: `linear-gradient(135deg, rgba(10,10,15,0.95) 0%, rgba(20,20,35,0.9) 100%)`,
                border: `1px solid ${hoveredCard === item.id ? item.color : 'rgba(255,255,255,0.06)'}`,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.4s, box-shadow 0.4s',
                boxShadow: hoveredCard === item.id ? `0 0 30px ${item.color}20` : 'none',
              }}
            >
              {/* Gradient shimmer */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at 30% 70%, ${item.color}10 0%, transparent 60%)`,
              }} />

              {/* Content */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '15px',
              }}>
                <motion.div
                  animate={hoveredCard === item.id ? { scale: 1.2, y: -5 } : { scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{ fontSize: '2.5rem' }}
                >
                  {item.emoji}
                </motion.div>
                <div style={{ fontSize: '0.6rem', fontWeight: 600, padding: '4px 10px', border: `1px solid ${item.color}50`, color: item.color, letterSpacing: '2px', fontFamily: 'Orbitron' }}>
                  {item.tag}
                </div>
                <div style={{
                  fontFamily: 'Orbitron',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--white)',
                  letterSpacing: '1px',
                  textAlign: 'center',
                }}>
                  {item.caption}
                </div>
                {/* Replace with real photo: <img src={`/images/gallery-${item.id}.jpg`} /> */}
                <div style={{ fontSize: '0.6rem', color: 'rgba(240,240,255,0.25)', letterSpacing: '1px' }}>
                  📷 ADD PHOTO
                </div>
              </div>

              {/* Corner accents */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '15px', height: '15px', borderTop: `2px solid ${item.color}`, borderLeft: `2px solid ${item.color}`, opacity: hoveredCard === item.id ? 1 : 0.3, transition: 'opacity 0.3s' }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '15px', height: '15px', borderBottom: `2px solid ${item.color}`, borderRight: `2px solid ${item.color}`, opacity: hoveredCard === item.id ? 1 : 0.3, transition: 'opacity 0.3s' }} />
            </motion.div>
          ))}
        </div>

        {/* Values Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' }}>
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, borderColor: v.color, boxShadow: `0 0 25px ${v.color}15` }}
              style={{
                background: 'rgba(10,10,15,0.85)',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '28px 22px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${v.color}, transparent)`, opacity: 0.5 }} />
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{v.icon}</div>
              <div style={{ fontFamily: 'Orbitron', fontSize: '1rem', fontWeight: 900, color: v.color, textShadow: `0 0 8px ${v.color}`, marginBottom: '8px', letterSpacing: '2px' }}>{v.title}</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(240,240,255,0.65)', lineHeight: 1.9 }}>{v.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
