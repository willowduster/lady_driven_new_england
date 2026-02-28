import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300, mass: 0.5 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.style?.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    // Hide default cursor
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.body.style.cursor = '';
      style.remove();
    };
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: cursorX,
          top: cursorY,
          width: isClicking ? '6px' : '8px',
          height: isClicking ? '6px' : '8px',
          borderRadius: '50%',
          background: 'var(--teal)',
          boxShadow: '0 0 10px var(--teal), 0 0 20px rgba(0,245,212,0.3)',
          pointerEvents: 'none',
          zIndex: 100000,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.15s, height 0.15s',
        }}
      />
      {/* Outer ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: springX,
          top: springY,
          width: isHovering ? '50px' : isClicking ? '28px' : '36px',
          height: isHovering ? '50px' : isClicking ? '28px' : '36px',
          borderRadius: '50%',
          border: `1.5px solid ${isHovering ? 'var(--pink)' : 'rgba(0,245,212,0.4)'}`,
          background: isHovering ? 'rgba(255,45,120,0.06)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, background 0.3s',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
