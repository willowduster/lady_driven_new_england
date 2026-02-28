import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading -> reveal -> done

  useEffect(() => {
    const duration = 2200;
    const interval = 30;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-in-out progress curve
      const t = step / steps;
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setProgress(Math.min(Math.round(eased * 100), 100));

      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => setPhase('reveal'), 300);
        setTimeout(() => {
          setPhase('done');
          onComplete();
        }, 1200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: '#030306',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Animated grid lines */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(123, 47, 190, 0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(123, 47, 190, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }} />

          {/* Radial glow */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(123,47,190,0.15) 0%, transparent 70%)',
            }}
          />

          {phase === 'loading' && (
            <>
              {/* Brand text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center', marginBottom: '50px', position: 'relative' }}
              >
                <div style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 'clamp(0.6rem, 2vw, 0.9rem)',
                  color: 'var(--teal)',
                  letterSpacing: '6px',
                  marginBottom: '12px',
                  textShadow: '0 0 20px var(--teal)',
                }}>
                  INITIALIZING
                </div>
                <div style={{
                  fontFamily: 'Orbitron, monospace',
                  fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                  fontWeight: 900,
                  color: 'var(--pink)',
                  textShadow: '0 0 20px var(--pink), 0 0 40px var(--pink)',
                  letterSpacing: '6px',
                }}>
                  LADY DRIVEN
                </div>
              </motion.div>

              {/* Progress bar */}
              <div style={{ width: '280px', position: 'relative' }}>
                <div style={{
                  height: '3px',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}>
                  <motion.div
                    style={{
                      height: '100%',
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, var(--purple), var(--pink), var(--teal))',
                      borderRadius: '2px',
                      boxShadow: '0 0 15px var(--teal)',
                    }}
                  />
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '12px',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '0.5rem',
                  color: 'rgba(240,240,255,0.4)',
                  letterSpacing: '2px',
                }}>
                  <span>LOADING ASSETS</span>
                  <span style={{ color: 'var(--teal)' }}>{progress}%</span>
                </div>
              </div>

              {/* Decorative corner brackets */}
              {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
                <motion.div
                  key={pos}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    position: 'absolute',
                    [pos.includes('top') ? 'top' : 'bottom']: '30px',
                    [pos.includes('left') ? 'left' : 'right']: '30px',
                    width: '30px',
                    height: '30px',
                    borderTop: pos.includes('top') ? '2px solid var(--purple)' : 'none',
                    borderBottom: pos.includes('bottom') ? '2px solid var(--purple)' : 'none',
                    borderLeft: pos.includes('left') ? '2px solid var(--purple)' : 'none',
                    borderRight: pos.includes('right') ? '2px solid var(--purple)' : 'none',
                  }}
                />
              ))}
            </>
          )}

          {phase === 'reveal' && (
            <>
              {/* Split wipe reveal */}
              <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '50%',
                  height: '100%',
                  background: '#030306',
                  transformOrigin: 'left',
                  zIndex: 2,
                }}
              />
              <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '50%',
                  height: '100%',
                  background: '#030306',
                  transformOrigin: 'right',
                  zIndex: 2,
                }}
              />
              {/* Center flash */}
              <motion.div
                initial={{ opacity: 1, scaleX: 0.01 }}
                animate={{ opacity: 0, scaleX: 30 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  width: '4px',
                  height: '100%',
                  background: 'linear-gradient(180deg, var(--teal), var(--pink), var(--purple))',
                  boxShadow: '0 0 60px 20px rgba(0,245,212,0.6)',
                }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
