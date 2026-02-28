import { useScroll, motion, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, var(--purple), var(--pink), var(--teal))',
        transformOrigin: '0%',
        scaleX,
        zIndex: 10001,
        boxShadow: '0 0 10px var(--teal), 0 0 20px rgba(0,245,212,0.3)',
      }}
    />
  );
}
