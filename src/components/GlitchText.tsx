import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
}

const GlitchText = ({ text, className = '', as: Component = 'span' }: GlitchTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        onEnter: () => setIsVisible(true),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const container = containerRef.current;
    const mainText = container.querySelector('.glitch-main');
    const glitchLayers = container.querySelectorAll('.glitch-layer');

    // Glitch animation
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    tl.to(glitchLayers, {
      opacity: 1,
      x: () => gsap.utils.random(-5, 5),
      duration: 0.05,
      stagger: 0.01,
    })
    .to(glitchLayers, {
      opacity: 0,
      x: 0,
      duration: 0.05,
    })
    .to(mainText, {
      skewX: 5,
      duration: 0.05,
    })
    .to(mainText, {
      skewX: -5,
      duration: 0.05,
    })
    .to(mainText, {
      skewX: 0,
      duration: 0.05,
    });

    return () => {
      tl.kill();
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Main text */}
      <Component className={`glitch-main relative z-10 ${className}`}>
        {text}
      </Component>
      
      {/* Glitch layers */}
      <Component 
        className={`glitch-layer absolute top-0 left-0 opacity-0 text-[#ff2d78] ${className}`}
        style={{ clipPath: 'inset(0 0 50% 0)' }}
        aria-hidden="true"
      >
        {text}
      </Component>
      <Component 
        className={`glitch-layer absolute top-0 left-0 opacity-0 text-[#00e5ff] ${className}`}
        style={{ clipPath: 'inset(50% 0 0 0)' }}
        aria-hidden="true"
      >
        {text}
      </Component>
    </div>
  );
};

export default GlitchText;
