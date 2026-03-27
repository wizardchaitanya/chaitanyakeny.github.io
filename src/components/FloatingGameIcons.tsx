import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const icons = [
  { color: '#f5d300', symbol: '◆' },
  { color: '#00e5ff', symbol: '▲' },
  { color: '#39ff14', symbol: '●' },
  { color: '#ff2d78', symbol: '■' },
  { color: '#f5d300', symbol: '★' },
  { color: '#00e5ff', symbol: '✦' },
  { color: '#39ff14', symbol: '✹' },
  { color: '#ff2d78', symbol: '✻' },
  { color: '#f5d300', symbol: '⬟' },
  { color: '#00e5ff', symbol: '⬢' },
];

const FloatingGameIcons = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const iconElements: HTMLDivElement[] = [];

    // Create floating icons
    icons.forEach(({ color, symbol }, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'absolute opacity-10 pointer-events-none font-pixel';
      wrapper.style.left = `${Math.random() * 90 + 5}%`;
      wrapper.style.top = `${Math.random() * 90 + 5}%`;
      wrapper.style.color = color;
      wrapper.textContent = symbol;
      
      // Size varies
      const size = Math.random() * 20 + 12;
      wrapper.style.fontSize = `${size}px`;
      
      container.appendChild(wrapper);
      iconElements.push(wrapper);

      // Floating animation
      gsap.to(wrapper, {
        y: `+=${Math.random() * 100 - 50}`,
        x: `+=${Math.random() * 100 - 50}`,
        rotation: Math.random() * 360,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.5,
      });

      // Pulsing opacity
      gsap.to(wrapper, {
        opacity: 0.2,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.3,
      });
    });

    return () => {
      iconElements.forEach((el) => el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default FloatingGameIcons;
