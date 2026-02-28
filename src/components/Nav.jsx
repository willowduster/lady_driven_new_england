import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Community', href: '#meet' },
  { label: 'Events', href: '#events' },
  { label: 'Merch', href: '#merch' },
  { label: 'Join', href: '#join' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 50);

    // Hide nav on scroll down, show on scroll up (after 300px)
    if (y > 300) {
      setHidden(y > lastScrollY && y - lastScrollY > 5);
    } else {
      setHidden(false);
    }
    setLastScrollY(y);

    // Scroll spy: detect active section
    const sections = navLinks.map(l => l.href.replace('#', ''));
    let current = '';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) current = id;
      }
    }
    setActiveSection(current);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Smooth scroll handler
  const scrollTo = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '10px 30px' : '18px 30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled
          ? 'rgba(5, 5, 8, 0.92)'
          : 'linear-gradient(180deg, rgba(5,5,8,0.8) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'blur(5px)',
        borderBottom: scrolled ? '1px solid rgba(0, 245, 212, 0.15)' : 'none',
        transition: 'padding 0.4s cubic-bezier(0.16,1,0.3,1), background 0.4s, border-bottom 0.4s',
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        style={{ cursor: 'pointer' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Logo size="sm" />
      </motion.div>

      {/* Desktop Nav */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }} className="desktop-nav">
        {navLinks.map((link, i) => {
          const isActive = activeSection === link.href.replace('#', '');
          return (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 + 0.3 }}
              whileHover={{ y: -1 }}
              style={{
                color: isActive ? 'var(--teal)' : 'rgba(240,240,255,0.6)',
                textDecoration: 'none',
                fontFamily: 'Orbitron, monospace',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                padding: '8px 14px',
                position: 'relative',
                transition: 'color 0.3s',
                textShadow: isActive ? '0 0 10px var(--teal)' : 'none',
              }}
            >
              {link.label}
              {/* Active indicator */}
              <motion.div
                initial={false}
                animate={{
                  scaleX: isActive ? 1 : 0,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  left: '14px',
                  right: '14px',
                  height: '1px',
                  background: 'var(--teal)',
                  transformOrigin: 'center',
                  boxShadow: '0 0 6px var(--teal)',
                }}
              />
            </motion.a>
          );
        })}
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setMenuOpen(!menuOpen)}
        whileTap={{ scale: 0.9 }}
        style={{
          display: 'none',
          background: 'none',
          border: `1px solid ${menuOpen ? 'var(--pink)' : 'var(--teal)'}`,
          color: menuOpen ? 'var(--pink)' : 'var(--teal)',
          padding: '8px 12px',
          cursor: 'pointer',
          fontFamily: 'Orbitron',
          fontSize: '0.8rem',
          transition: 'all 0.3s',
        }}
        className="mobile-menu-btn"
      >
        {menuOpen ? '✕' : '☰'}
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, y: -10, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(5, 5, 8, 0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(123,47,190,0.3)',
              padding: '15px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    color: isActive ? 'var(--teal)' : 'rgba(240,240,255,0.7)',
                    textDecoration: 'none',
                    fontFamily: 'Orbitron',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '2px',
                    padding: '12px 15px',
                    borderLeft: isActive ? '2px solid var(--teal)' : '2px solid transparent',
                    background: isActive ? 'rgba(0,245,212,0.05)' : 'transparent',
                    transition: 'all 0.3s',
                  }}
                >
                  {link.label}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
