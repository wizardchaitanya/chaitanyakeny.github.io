import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface XPBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
  delay?: number;
}

const XPBar = ({ 
  label, 
  value, 
  maxValue = 100, 
  color = '#f5d300',
  delay = 0 
}: XPBarProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!fillRef.current || !barRef.current) return;

    const percentage = (value / maxValue) * 100;

    const ctx = gsap.context(() => {
      // Animate fill width on scroll
      gsap.fromTo(
        fillRef.current,
        { width: '0%' },
        {
          width: `${percentage}%`,
          duration: 1.5,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: barRef.current,
            start: 'top 85%',
          },
        }
      );

      // Animate counter
      gsap.to({}, {
        duration: 1.5,
        delay: delay,
        onUpdate: function() {
          setDisplayValue(Math.round(value * this.progress()));
        },
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 85%',
        },
      });
    }, barRef);

    return () => ctx.revert();
  }, [value, maxValue, delay]);

  return (
    <div ref={barRef} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-pixel text-[0.35rem] tracking-[1px]" style={{ color }}>
          {label}
        </span>
        <span className="font-mono text-[0.7rem]" style={{ color }}>
          {displayValue}/{maxValue} XP
        </span>
      </div>
      <div className="h-3 bg-[#161e28] border border-[#2a3545] relative overflow-hidden">
        {/* Fill */}
        <div
          ref={fillRef}
          className="h-full relative"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`,
            width: '0%'
          }}
        >
          {/* Shimmer effect */}
          <div 
            className="absolute inset-0 animate-shimmer"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
              backgroundSize: '200% 100%',
            }}
          />
        </div>
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 1px)`,
            backgroundSize: '10% 100%',
          }}
        />
      </div>
    </div>
  );
};

export default XPBar;
