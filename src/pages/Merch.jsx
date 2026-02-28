import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const products = [
  { name: 'LADY DRIVEN TEE', price: '$35', tag: 'NEW', emoji: '👕', color: 'var(--pink)', desc: 'Oversized unisex tee. Screen-printed NFS-style graphic front.' },
  { name: 'NEON HOODIE', price: '$65', tag: 'HOT', emoji: '🧥', color: 'var(--purple-bright)', desc: 'Pullover hoodie with embroidered logo. Available in black/purple.' },
  { name: 'RACER CAP', price: '$30', tag: '', emoji: '🧢', color: 'var(--teal)', desc: 'Structured snapback in black with teal and pink embroidery.' },
  { name: 'STICKER PACK', price: '$12', tag: 'BESTSELLER', emoji: '🎴', color: 'var(--pink)', desc: 'Set of 6 die-cut holographic stickers. Waterproof and UV resistant.' },
  { name: 'LICENSE PLATE FRAME', price: '$25', tag: '', emoji: '🏁', color: 'var(--teal)', desc: 'Chrome finish plate frame with LADY DRIVEN NEW ENGLAND.' },
  { name: 'TRACK DAY BAG', price: '$55', tag: 'LIMITED', emoji: '🎒', color: 'var(--purple-bright)', desc: 'Durable duffel with interior organizer. Fits all your track day gear.' },
];

export default function Merch() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="merch" ref={ref} style={{ padding: '100px 20px', background: '#050508', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(123,47,190,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(123,47,190,0.04) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-title neon-text-purple"
        >
          [ MERCH ]
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '25px' }}>
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              style={{
                background: 'rgba(10,10,15,0.95)',
                border: `1px solid ${p.color}30`,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {/* Product image area */}
              <div style={{
                height: '180px',
                background: `radial-gradient(circle at center, ${p.color}15 0%, transparent 70%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '5rem',
                position: 'relative',
                borderBottom: `1px solid ${p.color}20`,
              }}>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                >
                  {p.emoji}
                </motion.div>
                {p.tag && (
                  <div style={{
                    position: 'absolute', top: '10px', right: '10px',
                    background: p.color, color: '#000',
                    fontSize: '0.55rem', padding: '4px 8px', letterSpacing: '1px',
                    fontFamily: 'Orbitron', fontWeight: 700,
                  }}>
                    {p.tag}
                  </div>
                )}
              </div>

              <div style={{ padding: '20px' }}>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.85rem', fontWeight: 700, color: 'var(--white)', marginBottom: '8px', letterSpacing: '1px' }}>{p.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(240,240,255,0.6)', lineHeight: 1.7, marginBottom: '15px' }}>{p.desc}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontFamily: 'Orbitron', fontSize: '1.2rem', fontWeight: 900, color: p.color, textShadow: `0 0 10px ${p.color}` }}>{p.price}</div>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: `0 0 15px ${p.color}` }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: `${p.color}20`,
                      border: `1px solid ${p.color}`,
                      color: p.color,
                      padding: '8px 16px',
                      cursor: 'pointer',
                      fontFamily: 'Orbitron, monospace',
                      fontSize: '0.6rem',
                      letterSpacing: '1px',
                    }}
                  >
                    ADD TO CART
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
