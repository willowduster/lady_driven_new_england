import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Meet the Girls', href: '#meet' },
  { label: 'Events', href: '#events' },
  { label: 'Merch', href: '#merch' },
  { label: 'Join the Team', href: '#join' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '15px 30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled
          ? 'rgba(5, 5, 8, 0.95)'
          : 'linear-gradient(180deg, rgba(5,5,8,0.9) 0%, transparent 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: scrolled ? '1px solid rgba(0, 245, 212, 0.3)' : 'none',
        transition: 'all 0.3s',
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        style={{ cursor: 'pointer' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 'clamp(0.5rem, 1.5vw, 0.8rem)',
          color: 'var(--pink)',
          textShadow: '0 0 10px var(--pink), 0 0 20px var(--pink)',
          lineHeight: 1.6,
          letterSpacing: '2px',
        }}>
          <div>LADY DRIVEN</div>
          <div style={{ color: 'var(--teal)', textShadow: '0 0 10px var(--teal)' }}>NEW ENGLAND</div>
        </div>
      </motion.div>

      {/* Desktop Nav */}
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }} className="desktop-nav">
        {navLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3 }}
            whileHover={{ color: 'var(--teal)', textShadow: '0 0 10px var(--teal)' }}
            style={{
              color: 'var(--white)',
              textDecoration: 'none',
              fontFamily: 'Orbitron, monospace',
              fontSize: '0.7rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              transition: 'all 0.3s',
            }}
          >
            {link.label}
          </motion.a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: '1px solid var(--teal)',
          color: 'var(--teal)',
          padding: '8px 12px',
          cursor: 'pointer',
          fontFamily: 'Orbitron',
          fontSize: '0.7rem',
        }}
        className="mobile-menu-btn"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(5, 5, 8, 0.98)',
            borderBottom: '1px solid var(--purple)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: 'var(--teal)',
                textDecoration: 'none',
                fontFamily: 'Orbitron',
                fontSize: '0.8rem',
                letterSpacing: '2px',
                padding: '10px',
                borderBottom: '1px solid rgba(0,245,212,0.2)',
              }}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
