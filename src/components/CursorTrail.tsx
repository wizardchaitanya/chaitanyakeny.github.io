import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CursorTrail = () => {
  const isTouch = useRef(false);

  useEffect(() => {
    // Detect touch device
    isTouch.current = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Create trail dot
      const dot = document.createElement('div');
      dot.className = 'fixed w-1 h-1 rounded-full pointer-events-none z-[9998]';
      dot.style.backgroundColor = '#f5d300';
      dot.style.left = `${e.clientX - 2}px`;
      dot.style.top = `${e.clientY - 2}px`;
      dot.style.boxShadow = '0 0 6px #f5d300';
      document.body.appendChild(dot);

      // Animate and remove
      gsap.to(dot, {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => dot.remove(),
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null;
};

export default CursorTrail;
