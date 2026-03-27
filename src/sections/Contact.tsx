import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Gamepad2, Github, Linkedin, Send } from 'lucide-react';
import useTextScramble from '../hooks/useTextScramble';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header
      gsap.fromTo(
        '.contact-header',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Subtitle
      gsap.fromTo(
        '.contact-subtitle',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Contact items with bounce
      gsap.fromTo(
        '.contact-item',
        { opacity: 0, y: 50, scale: 0.5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 80%',
          },
        }
      );

      // Floating animation for contact items
      gsap.to('.contact-item', {
        y: '+=8',
        duration: 2,
        stagger: 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scramble effect for section title
  const { displayText: scrambledTitle } = useTextScramble({
    text: 'CONTACT',
    trigger: true,
  });

  const contactItems = [
    {
      icon: <Mail size={28} />,
      label: 'EMAIL',
      value: 'chaitanyakeny@email.com',
      href: 'mailto:chaitanyakeny@email.com',
      color: '#f5d300',
    },
    {
      icon: <Gamepad2 size={28} />,
      label: 'ITCH.IO',
      value: 'chaitanyawizard.itch.io',
      href: 'https://chaitanyawizard.itch.io',
      color: '#ff2d78',
    },
    {
      icon: <Github size={28} />,
      label: 'GITHUB',
      value: 'github.com/wizardchaitanya',
      href: 'https://github.com/wizardchaitanya',
      color: '#00e5ff',
    },
    {
      icon: <Linkedin size={28} />,
      label: 'LINKEDIN',
      value: 'linkedin.com/in/chaitanya-keny',
      href: 'https://linkedin.com/in/chaitanya-keny',
      color: '#39ff14',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 py-20 md:py-28 px-4 md:px-8 bg-[#111820]"
    >
      {/* Divider */}
      <div className="max-w-[1100px] mx-auto mb-12">
        <div className="section-divider text-center font-pixel text-[0.4rem] text-[#2a3545] tracking-[3px]">
          · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto">
        {/* Section Header */}
        <div className="contact-header mb-4">
          <div className="font-pixel text-[0.5rem] text-[#00e5ff] tracking-[4px] mb-2 glow-cyan">
            // 005
          </div>
          <h2 className="font-pixel text-[clamp(0.8rem,2vw,1.2rem)] text-[#f5d300] mb-2 glow-yellow">
            {scrambledTitle}
          </h2>
          <div className="w-full h-[2px] bg-gradient-to-r from-[#f5d300] to-transparent mb-6" />
        </div>

        {/* Subtitle */}
        <div className="contact-subtitle font-vt text-[1.3rem] text-[#4a5568] mb-10 tracking-[2px]">
          OPEN TO GAME DEVELOPER ROLES · INTERNSHIPS · FREELANCE
        </div>

        {/* Contact Grid */}
        <div className="contact-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {contactItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="contact-item bg-[#161e28] border border-[#2a3545] p-6 text-center relative overflow-hidden group transition-all duration-500 hover:-translate-y-3"
              style={{
                ['--hover-color' as string]: item.color,
              }}
            >
              {/* Icon */}
              <div
                className="text-[1.5rem] mb-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12"
                style={{ color: item.color }}
              >
                {item.icon}
              </div>

              {/* Label */}
              <div className="font-pixel text-[0.35rem] text-[#4a5568] mb-2 tracking-[2px]">
                {item.label}
              </div>

              {/* Value */}
              <div
                className="font-mono text-[0.8rem] transition-all duration-300 break-all"
                style={{ color: item.color }}
              >
                <span className="group-hover:glow-yellow transition-all duration-300">
                  {item.value}
                </span>
              </div>

              {/* Hover border effect */}
              <div
                className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ borderColor: item.color }}
              />

              {/* Corner decorations */}
              <div
                className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderColor: item.color }}
              />
              <div
                className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderColor: item.color }}
              />
              <div
                className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderColor: item.color }}
              />
              <div
                className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderColor: item.color }}
              />

              {/* Glow effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${item.color}, transparent 70%)`,
                }}
              />

              {/* Arrow indicator */}
              <div 
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                style={{ color: item.color }}
              >
                <Send size={14} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
