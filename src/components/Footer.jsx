import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const socialLinks = [
    { label: 'INSTAGRAM', url: 'https://www.instagram.com/ladydrivennewengland/', color: 'var(--pink)' },
    { label: 'FACEBOOK', url: 'https://www.facebook.com/LadyDrivenNewEngland', color: 'var(--purple-bright)' },
  ];

  return (
    <footer ref={ref} style={{
      padding: '60px 20px 40px',
      background: 'linear-gradient(180deg, transparent 0%, rgba(5,5,8,1) 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top divider line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--purple-bright), var(--pink), var(--teal), transparent)',
          transformOrigin: 'center',
        }}
      />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', bottom: '-50%', left: '50%', width: '600px', height: '300px',
        transform: 'translateX(-50%)', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(123,47,190,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '30px' }}
        >
          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(0.85rem, 2.5vw, 1.2rem)',
            color: 'var(--pink)',
            textShadow: '0 0 20px rgba(255,45,120,0.4)',
            letterSpacing: '4px',
            marginBottom: '10px',
          }}>
            LADY DRIVEN NEW ENGLAND
          </div>
          <div style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: '0.7rem',
            fontWeight: 500,
            color: 'rgba(240,240,255,0.35)',
            letterSpacing: '5px',
          }}>
            EST. 2020 · NEW ENGLAND
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          style={{
            textAlign: 'center',
            fontFamily: 'Orbitron, monospace',
            fontSize: '0.75rem',
            fontWeight: 500,
            color: 'rgba(240,240,255,0.4)',
            letterSpacing: '3px',
            marginBottom: '30px',
            lineHeight: 2,
          }}
        >
          WOMEN WHO DRIVE — WOMEN WHO THRIVE
        </motion.p>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px', flexWrap: 'wrap',
          }}
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, textShadow: `0 0 15px ${link.color}` }}
              style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: link.color,
                textDecoration: 'none',
                letterSpacing: '3px',
                opacity: 0.7,
                transition: 'opacity 0.3s',
              }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.7}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Contact email */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '30px' }}
        >
          <a
            href="mailto:ladydrivennewengland@gmail.com"
            style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '0.7rem',
              fontWeight: 500,
              color: 'rgba(0,245,212,0.5)',
              textDecoration: 'none',
              letterSpacing: '2px',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--teal)'}
            onMouseLeave={e => e.target.style.color = 'rgba(0,245,212,0.5)'}
          >
            LADYDRIVENNEWENGLAND@GMAIL.COM
          </a>
        </motion.div>

        {/* Separator */}
        <div style={{
          width: '40px', height: '1px', margin: '0 auto 20px',
          background: 'linear-gradient(90deg, var(--teal), var(--pink))',
          opacity: 0.4,
        }} />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          style={{
            textAlign: 'center',
            fontFamily: 'Orbitron, monospace',
            fontSize: '0.65rem',
            color: 'rgba(240,240,255,0.2)',
            letterSpacing: '3px',
          }}
        >
          © {new Date().getFullYear()} LDNE · ALL RIGHTS RESERVED
        </motion.div>
      </div>
    </footer>
  );
}
