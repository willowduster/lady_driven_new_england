import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const products = [
  { name: 'LDNE TEAM TEE', price: '$35', tag: 'NEW', emoji: '👕', color: 'var(--pink)', desc: 'Oversized unisex tee featuring the Lady Driven NE logo. Screen-printed on premium cotton.' },
  { name: 'NEON HOODIE', price: '$65', tag: 'HOT', emoji: '🧥', color: 'var(--purple-bright)', desc: 'Pullover hoodie with embroidered LDNE logo. Available in black and purple.' },
  { name: 'RACER CAP', price: '$30', tag: '', emoji: '🧢', color: 'var(--teal)', desc: 'Structured snapback in black with teal and pink LDNE embroidery.' },
  { name: 'STICKER PACK', price: '$12', tag: 'BESTSELLER', emoji: '🎴', color: 'var(--pink)', desc: 'Set of 6 die-cut holographic LDNE stickers. Waterproof and UV resistant for your ride.' },
  { name: 'LICENSE PLATE FRAME', price: '$25', tag: '', emoji: '🏁', color: 'var(--teal)', desc: 'Chrome finish plate frame with LADY DRIVEN NEW ENGLAND. Rep the crew everywhere.' },
  { name: 'TRACK DAY BAG', price: '$55', tag: 'LIMITED', emoji: '🎒', color: 'var(--purple-bright)', desc: 'Durable duffel with interior organizer. Built for shows, cruises, and track days.' },
];

export default function Merch() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <section id="merch" ref={ref} style={{ padding: '100px 20px', background: 'linear-gradient(180deg, #050508 0%, #0a0a1e 50%, #050508 100%)', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(123,47,190,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(123,47,190,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="section-title neon-text-purple"
        >
          [ MERCH ]
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{ textAlign: 'center', fontSize: '0.75rem', color: 'rgba(240,240,255,0.5)', letterSpacing: '2px', marginBottom: '50px', marginTop: '-30px', fontFamily: 'Orbitron' }}
        >
          Rep the crew. All proceeds support LDNE events.
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredProduct(i)}
              onHoverEnd={() => setHoveredProduct(null)}
              style={{
                background: 'rgba(10,10,15,0.9)',
                border: `1px solid ${hoveredProduct === i ? p.color : 'rgba(255,255,255,0.06)'}`,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                boxShadow: hoveredProduct === i ? `0 8px 40px ${p.color}15` : 'none',
              }}
            >
              {/* Product image area */}
              <div style={{
                height: '200px',
                background: `radial-gradient(circle at center, ${p.color}12 0%, transparent 70%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                borderBottom: `1px solid ${hoveredProduct === i ? p.color + '40' : 'rgba(255,255,255,0.04)'}`,
                transition: 'border-color 0.4s',
              }}>
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: hoveredProduct === i ? [0, -3, 3, 0] : 0,
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                  style={{ fontSize: '5rem' }}
                >
                  {p.emoji}
                </motion.div>
                {p.tag && (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    style={{
                      position: 'absolute', top: '12px', right: '12px',
                      background: p.color, color: '#000',
                      fontSize: '0.5rem', padding: '4px 10px', letterSpacing: '1.5px',
                      fontFamily: 'Orbitron', fontWeight: 700,
                    }}
                  >
                    {p.tag}
                  </motion.div>
                )}
                {/* Replace emoji with real product photo: <img src={`/images/merch-${i+1}.jpg`} /> */}
              </div>

              <div style={{ padding: '20px' }}>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.85rem', fontWeight: 700, color: 'var(--white)', marginBottom: '8px', letterSpacing: '1px' }}>{p.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(240,240,255,0.55)', lineHeight: 1.8, marginBottom: '18px', minHeight: '40px' }}>{p.desc}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontFamily: 'Orbitron', fontSize: '1.2rem', fontWeight: 900, color: p.color, textShadow: `0 0 8px ${p.color}` }}>{p.price}</div>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${p.color}40` }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: `${p.color}10`,
                      border: `1px solid ${p.color}`,
                      color: p.color,
                      padding: '8px 18px',
                      cursor: 'pointer',
                      fontFamily: 'Orbitron, monospace',
                      fontSize: '0.55rem',
                      letterSpacing: '1.5px',
                      transition: 'all 0.3s',
                    }}
                  >
                    COMING SOON
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DM to order note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: '40px', padding: '25px', border: '1px solid rgba(123,47,190,0.2)', background: 'rgba(10,10,15,0.6)' }}
        >
          <div style={{ fontFamily: 'Orbitron', fontSize: '0.7rem', color: 'rgba(240,240,255,0.6)', letterSpacing: '2px', lineHeight: 2 }}>
            DM us on <a href="https://www.instagram.com/ladydrivennewengland/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pink)', textDecoration: 'none' }}>Instagram</a> to order or ask about custom gear
          </div>
        </motion.div>
      </div>
    </section>
  );
}
