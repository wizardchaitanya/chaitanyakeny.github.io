import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  element: HTMLDivElement;
}

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 25;
    const particles: Particle[] = [];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      particle.className = 'absolute rounded-full';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      
      // Random color from palette
      const colors = ['#f5d300', '#00e5ff', '#39ff14', '#ff2d78'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.backgroundColor = color;
      particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
      particle.style.opacity = '0';
      
      container.appendChild(particle);

      const particleObj: Particle = {
        x,
        y,
        size,
        speedY: Math.random() * 0.02 + 0.01,
        speedX: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.5 + 0.2,
        element: particle,
      };

      particles.push(particleObj);

      // Animate each particle with GSAP
      gsap.to(particle, {
        opacity: particleObj.opacity,
        duration: 2,
        delay: Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Floating animation
      gsap.to(particle, {
        y: `${y - 10}%`,
        x: `${x + (Math.random() - 0.5) * 5}%`,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    particlesRef.current = particles;

    return () => {
      particles.forEach((p) => p.element.remove());
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

export default ParticleBackground;
