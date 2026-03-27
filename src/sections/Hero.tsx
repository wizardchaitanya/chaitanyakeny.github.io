import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gamepad2, Code, Trophy, Brain, Puzzle, Swords, Box, ChevronDown } from 'lucide-react';
import useTextScramble from '../hooks/useTextScramble';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [titleComplete, setTitleComplete] = useState(false);
  const fullText = 'CHAITANYA KENY';

  // Typewriter effect for name
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTitleComplete(true);
        // Blink cursor after typing
        setInterval(() => {
          setShowCursor((prev) => !prev);
        }, 530);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Scramble effect for subtitle
  const { displayText: scrambledSubtitle } = useTextScramble({
    text: 'Unity · C# · 2D & 3D',
    trigger: titleComplete,
    delay: 300,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero elements
      gsap.fromTo(
        '.hero-tag',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.5, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-badge',
        { opacity: 0, scale: 0.8, rotateZ: -10 },
        {
          opacity: 1,
          scale: 1,
          rotateZ: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 2,
          ease: 'back.out(1.7)',
        }
      );

      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 2.5, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-corner',
        { opacity: 0, scale: 0.5, rotate: -45 },
        {
          opacity: 0.5,
          scale: 1,
          rotate: 0,
          duration: 1,
          stagger: 0.2,
          delay: 0.5,
          ease: 'power3.out',
        }
      );

      // Animated grid lines
      gsap.to('.grid-line-h', {
        strokeDashoffset: 0,
        duration: 2,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.grid-line-v', {
        strokeDashoffset: 0,
        duration: 2,
        repeat: -1,
        ease: 'none',
      });

      // Parallax effect on scroll
      gsap.to('.hero-content', {
        y: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Floating animation for badges
      gsap.to('.hero-badge', {
        y: '+=5',
        duration: 2,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const badges = [
    { text: 'UNITY', icon: <Gamepad2 size={12} />, color: 'yellow' },
    { text: 'C#', icon: <Code size={12} />, color: 'cyan' },
    { text: 'GAME JAM VETERAN', icon: <Trophy size={12} />, color: 'green' },
    { text: 'ENEMY AI', icon: <Brain size={12} />, color: 'pink' },
    { text: 'PUZZLE DESIGN', icon: <Puzzle size={12} />, color: 'yellow' },
    { text: 'COMBAT SYSTEMS', icon: <Swords size={12} />, color: 'cyan' },
    { text: 'BLENDER', icon: <Box size={12} />, color: 'green' },
  ];

  const getBadgeClasses = (color: string) => {
    const classes: Record<string, string> = {
      yellow: 'border-[#f5d300] text-[#f5d300] hover:shadow-[0_0_15px_#f5d300]',
      cyan: 'border-[#00e5ff] text-[#00e5ff] hover:shadow-[0_0_15px_#00e5ff]',
      green: 'border-[#39ff14] text-[#39ff14] hover:shadow-[0_0_15px_#39ff14]',
      pink: 'border-[#ff2d78] text-[#ff2d78] hover:shadow-[0_0_15px_#ff2d78]',
    };
    return classes[color] || classes.yellow;
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-8 pt-20 pb-16 overflow-hidden"
    >
      {/* Animated corner decorations */}
      <div className="hero-corner absolute top-20 left-6 w-[120px] h-[120px] border-[3px] border-[#f5d300] border-r-0 border-b-0 opacity-50" />
      <div className="hero-corner absolute top-20 right-6 w-[120px] h-[120px] border-[3px] border-[#f5d300] border-l-0 border-b-0 opacity-50" />
      <div className="hero-corner absolute bottom-6 left-6 w-[120px] h-[120px] border-[3px] border-[#f5d300] border-r-0 border-t-0 opacity-50" />
      <div className="hero-corner absolute bottom-6 right-6 w-[120px] h-[120px] border-[3px] border-[#f5d300] border-l-0 border-t-0 opacity-50" />

      {/* Animated SVG Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path className="grid-line-h" d="M 50 0 L 0 0 0 50" fill="none" stroke="#f5d300" strokeWidth="0.5" strokeDasharray="50" strokeDashoffset="50" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['#f5d300', '#00e5ff', '#39ff14', '#ff2d78'][Math.floor(Math.random() * 4)],
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 2 + 1}s`,
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="hero-content relative z-10 max-w-4xl mx-auto">
        {/* Tag with typing effect */}
        <div className="hero-tag font-pixel text-[0.5rem] md:text-[0.6rem] text-[#00e5ff] tracking-[4px] mb-6 glow-cyan animate-blink-slow">
          {'// GAME DEVELOPER'.split('').map((char, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                animation: `fadeIn 0.1s ease ${i * 0.05}s forwards`,
                opacity: 0,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Main title with typewriter */}
        <h1 className="font-pixel text-[clamp(1.4rem,4vw,2.6rem)] text-[#f5d300] leading-[1.6] mb-4 glow-yellow min-h-[1.6em]">
          {displayText}
          <span
            className={`inline-block w-[3px] h-[1em] bg-[#f5d300] ml-1 align-middle ${
              showCursor ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </h1>

        {/* Subtitle with scramble effect */}
        <div className="hero-title font-vt text-[clamp(1.6rem,3vw,2.2rem)] text-[#e8f0fe] tracking-[3px] mb-8 opacity-85">
          {scrambledSubtitle}
        </div>

        {/* Badges with floating animation */}
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-10">
          {badges.map((badge, index) => (
            <span
              key={index}
              className={`hero-badge font-pixel text-[0.32rem] md:text-[0.38rem] px-3 py-2 border transition-all duration-300 hover:scale-110 flex items-center gap-2 ${getBadgeClasses(
                badge.color
              )}`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {badge.icon}
              {badge.text}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-wrap gap-4 justify-center">
          <a
            href="https://chaitanyawizard.itch.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative font-pixel text-[0.4rem] md:text-[0.45rem] px-6 py-3 bg-[#f5d300] text-[#080c10] tracking-[1px] transition-all duration-300 hover:shadow-[0_0_30px_#f5d300] hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Gamepad2 size={14} />
              PLAY MY GAMES
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-full w-full -translate-y-full group-hover:translate-y-full transition-transform duration-500" />
          </a>
          <button
            onClick={() => {
              const element = document.getElementById('about');
              if (element) {
                const navHeight = 80;
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - navHeight;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            className="group font-pixel text-[0.4rem] md:text-[0.45rem] px-6 py-3 bg-transparent text-[#00e5ff] border-2 border-[#00e5ff] tracking-[1px] transition-all duration-300 hover:bg-[#00e5ff] hover:text-[#080c10] hover:shadow-[0_0_30px_#00e5ff] hover:-translate-y-1 flex items-center gap-2"
          >
            <Code size={14} />
            VIEW PORTFOLIO
          </button>
        </div>
      </div>

      {/* Scroll indicator with bounce */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="font-pixel text-[0.3rem] text-[#4a5568] tracking-[2px]">SCROLL</span>
        <ChevronDown size={20} className="text-[#f5d300] animate-bounce" />
      </div>

      {/* Side decorations */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4">
        <div className="w-[2px] h-16 bg-gradient-to-b from-transparent via-[#f5d300] to-transparent" />
        <div className="font-pixel text-[0.25rem] text-[#f5d300] tracking-[2px] -rotate-90 origin-center whitespace-nowrap">
          PLAYER 1
        </div>
        <div className="w-[2px] h-16 bg-gradient-to-b from-transparent via-[#f5d300] to-transparent" />
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 items-end">
        <div className="w-[2px] h-16 bg-gradient-to-b from-transparent via-[#00e5ff] to-transparent" />
        <div className="font-pixel text-[0.25rem] text-[#00e5ff] tracking-[2px] rotate-90 origin-center whitespace-nowrap">
          READY
        </div>
        <div className="w-[2px] h-16 bg-gradient-to-b from-transparent via-[#00e5ff] to-transparent" />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
