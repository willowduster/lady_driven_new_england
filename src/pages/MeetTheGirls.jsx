import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const members = [
  { name: 'ALEXIA STORM', role: 'Founder & Driver', car: 'Dodge Viper SRT-10', specialty: 'Drag Racing', emoji: '🐍', color: 'var(--purple-bright)', bio: 'Founder of Lady Driven NE. Has been turning heads since 2018.' },
  { name: 'ZARA NIGHT', role: 'Co-Founder & Lead Driver', car: 'Nissan Skyline R34', specialty: 'Time Attack', emoji: '🌙', color: 'var(--pink)', bio: 'JDM queen and the fastest woman on the New England circuit.' },
  { name: 'MAYA SWIFT', role: 'Events Director', car: 'Toyota Supra MK4', specialty: 'Track Days', emoji: '⚡', color: 'var(--teal)', bio: 'Organizes all our events and runs a mean quarter mile.' },
  { name: 'LUNA CROSS', role: 'Social Media & Style', car: 'Mitsubishi Eclipse GSX', specialty: 'Car Shows', emoji: '🔮', color: 'var(--pink-bright)', bio: 'If it looks good and goes fast, Luna already has it on her feed.' },
  { name: 'NOVA BLADE', role: 'Technical Lead', car: 'Subaru WRX STI', specialty: 'Rally & AWD', emoji: '👑', color: 'var(--purple-bright)', bio: 'Mechanic, driver, and the person you call when your turbo acts up.' },
  { name: 'SIERRA RUSH', role: 'New Member Coordinator', car: '1995 Honda Civic EK', specialty: 'Autocross', emoji: '🌟', color: 'var(--teal)', bio: "Started with a stock Civic and hasn't stopped modding since." },
];

export default function MeetTheGirls() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="meet" ref={ref} style={{ padding: '100px 20px', background: '#050508', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,45,120,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,120,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-title neon-text-pink"
        >
          [ MEET THE GIRLS ]
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              style={{
                background: 'rgba(10,10,15,0.9)',
                border: `1px solid ${m.color}40`,
                padding: '25px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'all 0.3s',
              }}
            >
              {/* Corner accents */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: `2px solid ${m.color}`, borderLeft: `2px solid ${m.color}` }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', borderBottom: `2px solid ${m.color}`, borderRight: `2px solid ${m.color}` }} />

              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{m.emoji}</div>
              
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1rem', fontWeight: 900, color: m.color, textShadow: `0 0 10px ${m.color}`, marginBottom: '5px', letterSpacing: '2px' }}>{m.name}</div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(240,240,255,0.5)', letterSpacing: '2px', marginBottom: '12px' }}>{m.role}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(240,240,255,0.8)', lineHeight: 1.8, marginBottom: '15px' }}>{m.bio}</div>
              
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.6rem', padding: '4px 10px', border: `1px solid ${m.color}60`, color: m.color, letterSpacing: '1px' }}>🚗 {m.car}</span>
                <span style={{ fontSize: '0.6rem', padding: '4px 10px', border: '1px solid rgba(240,240,255,0.2)', color: 'rgba(240,240,255,0.6)', letterSpacing: '1px' }}>⚡ {m.specialty}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
