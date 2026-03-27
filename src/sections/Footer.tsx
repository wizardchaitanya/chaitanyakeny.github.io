import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Heart, Gamepad2 } from 'lucide-react';

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-content',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-10 text-center py-8 px-4 border-t-2 border-[#2a3545]"
    >
      <div className="footer-content max-w-[1100px] mx-auto">
        <div className="font-pixel text-[0.38rem] md:text-[0.42rem] text-[#4a5568] tracking-[2px] mb-3">
          <span className="text-[#f5d300]">CHAITANYA KENY</span> · GAME DEVELOPER · MUMBAI, INDIA
        </div>
        <div className="font-pixel text-[0.32rem] md:text-[0.38rem] text-[#4a5568] tracking-[2px] flex items-center justify-center gap-2">
          BUILT WITH
          <Heart
            size={12}
            className="text-[#ff2d78] fill-[#ff2d78] animate-pulse"
          />
          AND LOTS OF
          <Gamepad2 size={12} className="text-[#f5d300]" />
          GAME JAMS
        </div>
      </div>
    </footer>
  );
};

export default Footer;
