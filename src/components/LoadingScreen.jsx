import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

/* ── tiny SVG helpers ── */
const StarSVG = ({ size = 16, color = '#ff2d78', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <path d="M12 0l3.09 7.26L23 8.27l-5.46 5.11L18.82 22 12 17.77 5.18 22l1.28-8.62L1 8.27l7.91-1.01z" />
  </svg>
);

const HeartSVG = ({ size = 16, color = '#ff2d78', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const SparkleSVG = ({ size = 14, color = '#00f5d4', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <path d="M12 0L14.59 8.41 20 12l-5.41 3.59L12 24l-2.59-8.41L4 12l5.41-3.59z" />
  </svg>
);

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading -> reveal -> done

  useEffect(() => {
    const duration = 2600;
    const interval = 30;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const t = step / steps;
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setProgress(Math.min(Math.round(eased * 100), 100));

      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => setPhase('reveal'), 200);
        setTimeout(() => {
          setPhase('done');
          onComplete();
        }, 1400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  /* ── Floating hearts & stars (CSS-animated, generated once) ── */
  const floatingItems = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => {
      const isHeart = i % 3 === 0;
      const isStar = i % 3 === 1;
      const colors = ['#ff2d78', '#ff6eb4', '#a855f7', '#7b2fbe', '#00f5d4'];
      return {
        id: i,
        type: isHeart ? 'heart' : isStar ? 'star' : 'sparkle',
        left: `${(i * 3.7 + Math.random() * 8) % 100}%`,
        size: 8 + Math.random() * 14,
        color: colors[i % colors.length],
        delay: `${(i * 0.25).toFixed(1)}s`,
        dur: `${(3 + Math.random() * 4).toFixed(1)}s`,
        drift: Math.random() > 0.5 ? 'loading-float-left' : 'loading-float-right',
      };
    }), []);

  /* ── Sparkle ring items around logo ── */
  const ringSparkles = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i * 30),
      size: 6 + (i % 3) * 4,
      color: ['#ff2d78', '#00f5d4', '#a855f7', '#ff6eb4'][i % 4],
      delay: `${(i * 0.15).toFixed(2)}s`,
    })), []);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'radial-gradient(ellipse at 50% 40%, #1a0828 0%, #0d0415 40%, #030306 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Soft pink/purple glow blobs */}
          <div className="loading-glow loading-glow-1" />
          <div className="loading-glow loading-glow-2" />
          <div className="loading-glow loading-glow-3" />

          {/* Floating hearts, stars & sparkles */}
          {floatingItems.map((item) => (
            <div
              key={item.id}
              className={`loading-floater ${item.drift}`}
              style={{
                position: 'absolute',
                left: item.left,
                bottom: '-30px',
                animationDelay: item.delay,
                animationDuration: item.dur,
                opacity: 0,
              }}
            >
              {item.type === 'heart' && <HeartSVG size={item.size} color={item.color} />}
              {item.type === 'star' && <StarSVG size={item.size} color={item.color} />}
              {item.type === 'sparkle' && <SparkleSVG size={item.size} color={item.color} />}
            </div>
          ))}

          {phase === 'loading' && (
            <>
              {/* Logo with sparkle ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  textAlign: 'center',
                  marginBottom: '50px',
                  position: 'relative',
                }}
              >
                {/* Spinning sparkle ring */}
                <div className="sparkle-ring">
                  {ringSparkles.map((s) => (
                    <div
                      key={s.id}
                      className="sparkle-ring-item"
                      style={{
                        transform: `rotate(${s.angle}deg) translateX(130px)`,
                        animationDelay: s.delay,
                      }}
                    >
                      <SparkleSVG size={s.size} color={s.color} style={{ filter: `drop-shadow(0 0 4px ${s.color})` }} />
                    </div>
                  ))}
                </div>

                {/* Shimmer text */}
                <div className="loading-title-shimmer" style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 'clamp(0.5rem, 1.8vw, 0.75rem)',
                  letterSpacing: '5px',
                  marginBottom: '16px',
                }}>
                  ✦ LADY DRIVEN ✦
                </div>

                <Logo size="lg" animate />

                {/* Decorative hearts under logo */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '12px',
                    marginTop: '14px',
                  }}
                >
                  {[12, 8, 14, 8, 12].map((sz, i) => (
                    <span key={i} className="loading-heart-pulse" style={{ animationDelay: `${i * 0.15}s` }}>
                      <HeartSVG
                        size={sz}
                        color={['#ff2d78', '#a855f7', '#ff6eb4', '#a855f7', '#ff2d78'][i]}
                        style={{ filter: `drop-shadow(0 0 6px ${['#ff2d78', '#a855f7', '#ff6eb4', '#a855f7', '#ff2d78'][i]})` }}
                      />
                    </span>
                  ))}
                </motion.div>
              </motion.div>

              {/* Progress bar — glamorous pink/purple */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{ width: '280px', position: 'relative' }}
              >
                <div style={{
                  height: '4px',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #7b2fbe, #ff2d78, #ff6eb4, #00f5d4)',
                      borderRadius: '4px',
                      boxShadow: '0 0 12px rgba(255,45,120,0.6), 0 0 25px rgba(255,45,120,0.3)',
                      transition: 'width 0.1s ease-out',
                      position: 'relative',
                    }}
                  >
                    {/* Sparkle sweep on progress bar */}
                    <div className="progress-sparkle-sweep" />
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '14px',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '0.55rem',
                  color: 'rgba(255,45,120,0.5)',
                  letterSpacing: '3px',
                  gap: '6px',
                }}>
                  <span>♡</span>
                  <span style={{ color: 'rgba(240,240,255,0.4)' }}>{progress}%</span>
                  <span>♡</span>
                </div>
              </motion.div>

              {/* Corner decorative hearts */}
              {[
                { top: '25px', left: '25px', rot: 0 },
                { top: '25px', right: '25px', rot: 0 },
                { bottom: '25px', left: '25px', rot: 0 },
                { bottom: '25px', right: '25px', rot: 0 },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.4, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
                  className="loading-heart-pulse"
                  style={{
                    position: 'absolute',
                    ...pos,
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  <HeartSVG size={16} color={['#ff2d78', '#a855f7', '#a855f7', '#ff2d78'][i]} />
                </motion.div>
              ))}

              {/* Extra floating sparkles in mid-screen */}
              {[
                { top: '18%', left: '15%', s: 10 },
                { top: '25%', right: '20%', s: 8 },
                { top: '70%', left: '22%', s: 12 },
                { top: '75%', right: '15%', s: 9 },
                { top: '12%', left: '55%', s: 7 },
                { top: '82%', left: '45%', s: 11 },
              ].map((sp, i) => (
                <div
                  key={`sp-${i}`}
                  className="loading-twinkle"
                  style={{
                    position: 'absolute',
                    top: sp.top,
                    left: sp.left,
                    right: sp.right,
                    animationDelay: `${i * 0.4}s`,
                  }}
                >
                  <SparkleSVG size={sp.s} color={['#00f5d4', '#ff6eb4', '#a855f7'][i % 3]} style={{
                    filter: `drop-shadow(0 0 6px ${['#00f5d4', '#ff6eb4', '#a855f7'][i % 3]})`,
                  }} />
                </div>
              ))}
            </>
          )}

          {phase === 'reveal' && (
            <>
              {/* Sparkle burst outward from center */}
              {Array.from({ length: 16 }, (_, i) => {
                const angle = (i / 16) * 360;
                const colors = ['#ff2d78', '#00f5d4', '#a855f7', '#ff6eb4'];
                return (
                  <motion.div
                    key={`burst-${i}`}
                    initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    animate={{
                      opacity: 0,
                      x: Math.cos(angle * Math.PI / 180) * 600,
                      y: Math.sin(angle * Math.PI / 180) * 600,
                      scale: 0,
                    }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute',
                      zIndex: 3,
                    }}
                  >
                    {i % 3 === 0
                      ? <HeartSVG size={12 + (i % 5) * 3} color={colors[i % 4]} />
                      : i % 3 === 1
                      ? <StarSVG size={10 + (i % 4) * 3} color={colors[i % 4]} />
                      : <SparkleSVG size={8 + (i % 3) * 4} color={colors[i % 4]} />
                    }
                  </motion.div>
                );
              })}

              {/* Big center glow flash */}
              <motion.div
                initial={{ opacity: 0.9, scale: 0.1 }}
                animate={{ opacity: 0, scale: 8 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,110,180,0.8) 0%, rgba(168,85,247,0.4) 40%, transparent 70%)',
                  zIndex: 2,
                }}
              />

              {/* Soft wipe overlay */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse at 50% 40%, #1a0828 0%, #0d0415 40%, #030306 100%)',
                  zIndex: 1,
                }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
