import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Code2, GraduationCap, Award, Cpu, Gamepad, Layers, Wrench } from 'lucide-react';
import XPBar from '../components/XPBar';
import Card3D from '../components/Card3D';
import useTextScramble from '../hooks/useTextScramble';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => setIsVisible(true),
      });

      // Section header animation
      gsap.fromTo(
        '.about-header',
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

      // Photo animation with 3D flip
      gsap.fromTo(
        '.about-photo-container',
        { opacity: 0, rotateY: -90 },
        {
          opacity: 1,
          rotateY: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Bio text animation
      gsap.fromTo(
        '.bio-paragraph',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-text-col',
            start: 'top 75%',
          },
        }
      );

      // Meta items animation
      gsap.fromTo(
        '.meta-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-meta',
            start: 'top 85%',
          },
        }
      );

      // Skill cards animation with 3D
      gsap.fromTo(
        '.skill-card-3d',
        { opacity: 0, y: 40, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillCategories = [
    {
      title: '⚙ ENGINE & LANGUAGE',
      icon: <Cpu size={16} />,
      skills: ['Unity 2D', 'Unity 3D', 'C#', 'Blender'],
      color: 'yellow',
    },
    {
      title: '🎮 GAMEPLAY SYSTEMS',
      icon: <Gamepad size={16} />,
      skills: ['Enemy AI FSM', 'Combat Systems', 'Physics', 'Puzzle Design', 'Air Combat'],
      color: 'cyan',
    },
    {
      title: '🏗 ARCHITECTURE',
      icon: <Layers size={16} />,
      skills: ['OOP', 'ScriptableObjects', 'Singleton', 'State Machines', 'Board Systems'],
      color: 'green',
    },
    {
      title: '🛠 TOOLS & PIPELINE',
      icon: <Wrench size={16} />,
      skills: ['Git / GitHub', 'Visual Studio', 'itch.io', 'Android Build', 'WebGL'],
      color: 'pink',
    },
  ];

  const skillXP = [
    { label: 'UNITY ENGINE', value: 92, color: '#f5d300' },
    { label: 'C# PROGRAMMING', value: 88, color: '#00e5ff' },
    { label: 'GAME DESIGN', value: 85, color: '#39ff14' },
    { label: 'GAME JAM EXPERIENCE', value: 95, color: '#ff2d78' },
  ];

  const metaItems = [
    { icon: <MapPin size={14} />, text: 'Mumbai, India' },
    { icon: <Code2 size={14} />, text: 'Unity 2D & 3D · C#' },
    { icon: <GraduationCap size={14} />, text: 'B.E. Mechanical Engineering' },
    { icon: <Award size={14} />, text: 'GGJ 2026 Certified' },
  ];

  // Text scramble for name
  const { displayText: scrambledName } = useTextScramble({
    text: 'CHAITANYA KENY',
    trigger: isVisible,
    delay: 500,
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 py-20 md:py-28 px-4 md:px-8"
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Section Header */}
        <div className="about-header mb-12">
          <div className="font-pixel text-[0.5rem] text-[#00e5ff] tracking-[4px] mb-2 glow-cyan">
            // 001
          </div>
          <h2 className="font-pixel text-[clamp(0.8rem,2vw,1.2rem)] text-[#f5d300] mb-2 glow-yellow">
            ABOUT ME
          </h2>
          <div className="w-full h-[2px] bg-gradient-to-r from-[#f5d300] to-transparent" />
        </div>

        {/* About Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 md:gap-10 mb-12">
          {/* Photo Column */}
          <div className="about-photo-col flex flex-col items-center gap-3">
            <div className="about-photo-container relative group" style={{ perspective: '1000px' }}>
              {/* 
                TO ADD YOUR PROFILE PICTURE:
                1. Place your image file (e.g., profile.jpg) in the /public folder
                2. Change the src below from the placeholder to: /profile.jpg
                3. Make sure your image is square (1:1 ratio) for best results
              */}
              <img
                src="profile.jpg"
                alt="Chaitanya Keny"
                className="w-[140px] h-[140px] object-cover object-center border-2 border-[#f5d300] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(245,211,0,0.3)]"
                onError={(e) => {
                  // Show placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'w-[140px] h-[140px] border-2 border-[#f5d300] bg-[#161e28] flex items-center justify-center';
                    placeholder.innerHTML = `
                      <div class="text-center">
                        <div class="text-4xl mb-2">🎮</div>
                        <div class="font-pixel text-[0.28rem] text-[#4a5568] text-center leading-[1.6] px-2">
                          ADD PHOTO<br/>IN /public
                        </div>
                      </div>
                    `;
                    parent.appendChild(placeholder);
                  }
                }}
              />
              {/* Decorative corners */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#f5d300]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#f5d300]" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#f5d300]" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#f5d300]" />
            </div>
            <div className="font-pixel text-[0.3rem] text-[#39ff14] border border-[#39ff14] px-3 py-2 tracking-[1px] animate-blink-slow text-center w-[140px]">
              ▸ OPEN TO WORK
            </div>
          </div>

          {/* Text Column */}
          <div className="about-text-col">
            <div className="font-pixel text-[0.7rem] text-[#f5d300] glow-yellow mb-1 tracking-[1px]">
              {scrambledName}
            </div>
            <div className="font-vt text-[1.3rem] text-[#00e5ff] tracking-[2px] mb-6">
              Game Developer · Mumbai, India
            </div>

            <div className="about-bio space-y-4 mb-6">
              <p className="bio-paragraph font-mono text-[0.88rem] text-[rgba(232,240,254,0.8)] leading-[1.9]">
                I'm a game developer driven by one belief — games are the most powerful medium for storytelling and experience. From the moment I wrote my first line of Unity C#, I knew this was the craft I wanted to dedicate myself to.
              </p>
              <p className="bio-paragraph font-mono text-[0.88rem] text-[rgba(232,240,254,0.8)] leading-[1.9]">
                I'm passionate about designing systems that feel satisfying — whether that's a combat mechanic that clicks into place, an enemy AI that surprises you, or a puzzle built around one unexpected idea. I love the challenge of taking a single constraint and turning it into something{' '}
                <em className="text-[#f5d300] not-italic">memorable</em>.
              </p>
              <p className="bio-paragraph font-mono text-[0.88rem] text-[rgba(232,240,254,0.8)] leading-[1.9]">
                Building in game jams has taught me how to prioritise, prototype fast, and ship under pressure. I'm always learning, always building, and always chasing that feeling of a mechanic that just{' '}
                <em className="text-[#f5d300] not-italic">works</em>.
              </p>
            </div>

            {/* XP Bars */}
            <div className="mb-6">
              <div className="font-pixel text-[0.35rem] text-[#00e5ff] mb-4 tracking-[2px]">
                // SKILL LEVELS
              </div>
              {skillXP.map((skill, index) => (
                <XPBar
                  key={index}
                  label={skill.label}
                  value={skill.value}
                  color={skill.color}
                  delay={index * 0.2}
                />
              ))}
            </div>

            {/* Meta Items */}
            <div className="about-meta flex flex-wrap gap-3">
              {metaItems.map((item, index) => (
                <div
                  key={index}
                  className="meta-item font-mono text-[0.78rem] text-[#4a5568] flex items-center gap-2 transition-all duration-300 hover:text-[#e8f0fe]"
                >
                  <span className="text-[#f5d300]">▸</span>
                  {item.icon}
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Grid with 3D Cards */}
        <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {skillCategories.map((category, index) => (
            <Card3D key={index} className="skill-card-3d">
              <div className="bg-[#111820] border border-[#2a3545] p-5 relative overflow-hidden h-full group transition-all duration-300 hover:border-[#f5d300]">
                {/* Left accent line */}
                <div className="absolute top-0 left-0 w-[3px] h-full bg-[#f5d300] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                
                <div className="font-pixel text-[0.5rem] text-[#f5d300] mb-4 tracking-[1px] flex items-center gap-2">
                  {category.icon}
                  {category.title}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="inline-block font-mono text-[0.75rem] text-[#00e5ff] bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.2)] px-2 py-1 transition-all duration-300 hover:bg-[rgba(0,229,255,0.15)] hover:border-[rgba(0,229,255,0.4)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(245,211,0,0.05)] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
