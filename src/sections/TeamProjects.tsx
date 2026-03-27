import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Code, Swords, Brain, Gamepad, Trophy, Shield } from 'lucide-react';
import Card3D from '../components/Card3D';
import useTextScramble from '../hooks/useTextScramble';

gsap.registerPlugin(ScrollTrigger);

const TeamProjects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header
      gsap.fromTo(
        '.team-header',
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

      // Project cards with 3D effect
      gsap.fromTo(
        '.team-card-3d',
        { opacity: 0, y: 50, rotateY: -15 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.team-grid',
            start: 'top 75%',
          },
        }
      );

      // Feature items stagger
      gsap.fromTo(
        '.feature-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.features-list',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scramble effect for section title
  const { displayText: scrambledTitle } = useTextScramble({
    text: 'TEAM PROJECTS',
    trigger: true,
  });

  const projects = [
    {
      type: 'TEAM · IN DEVELOPMENT',
      typeIcon: <Users size={12} />,
      dotColor: '#00e5ff',
      title: 'FURY',
      subtitle: '2D Action Side-Scroller · Unity / C#',
      description: 'Core gameplay developer responsible for all enemy AI and player combat systems.',
      features: [
        { icon: <Brain size={12} />, text: 'Modular Enemy AI FSM — patrol, chase, attack, stagger states' },
        { icon: <Swords size={12} />, text: 'Full Player Combat System with ground & air combo chains' },
        { icon: <Gamepad size={12} />, text: 'Air Combat States — mid-air sequences, directional lunges' },
        { icon: <Code size={12} />, text: 'Debugged critical FSM issues: dash overrides, combo windows' },
      ],
      tags: [
        { text: 'Enemy AI', color: 'cyan' },
        { text: 'Combat Systems', color: 'yellow' },
        { text: 'FSM', color: 'green' },
        { text: 'Air Combat', color: 'pink' },
      ],
      borderColor: 'cyan',
      featured: true,
    },
    {
      type: 'TEAM · GGJ 2026',
      typeIcon: <Trophy size={12} />,
      dotColor: '#00e5ff',
      title: 'FITTING IN',
      subtitle: 'Global Game Jam 2026 · 48 Hours',
      description:
        'An intergalactic explorer arrives on an alien world to study native behaviour — but must first gather fuel and maintain contact with Mission Control.',
      features: [
        { icon: <Users size={12} />, text: 'First formal team game development experience' },
        { icon: <Code size={12} />, text: 'Shared codebase, live collaboration under pressure' },
        { icon: <Shield size={12} />, text: 'Certificate of Participation — Global Game Jam 2026' },
      ],
      tags: [
        { text: 'GGJ 2026', color: 'green' },
        { text: 'Team Dev', color: 'cyan' },
        { text: 'Certificate', color: 'yellow' },
      ],
      borderColor: 'default',
      featured: false,
    },
  ];

  const getTagClasses = (color: string) => {
    const classes: Record<string, string> = {
      yellow: 'border-[#f5d300] text-[#f5d300]',
      cyan: 'border-[#00e5ff] text-[#00e5ff]',
      green: 'border-[#39ff14] text-[#39ff14]',
      pink: 'border-[#ff2d78] text-[#ff2d78]',
    };
    return classes[color] || classes.yellow;
  };

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative z-10 py-20 md:py-28 px-4 md:px-8"
    >
      {/* Divider */}
      <div className="max-w-[1100px] mx-auto mb-12">
        <div className="section-divider text-center font-pixel text-[0.4rem] text-[#2a3545] tracking-[3px]">
          · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto">
        {/* Section Header */}
        <div className="team-header mb-12">
          <div className="font-pixel text-[0.5rem] text-[#00e5ff] tracking-[4px] mb-2 glow-cyan">
            // 003
          </div>
          <h2 className="font-pixel text-[clamp(0.8rem,2vw,1.2rem)] text-[#f5d300] mb-2 glow-yellow">
            {scrambledTitle}
          </h2>
          <div className="w-full h-[2px] bg-gradient-to-r from-[#f5d300] to-transparent" />
        </div>

        {/* Projects Grid with 3D Cards */}
        <div className="team-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <Card3D key={index} className="team-card-3d">
              <div
                className={`bg-[#111820] border p-5 relative overflow-hidden h-full group transition-all duration-500 ${
                  project.featured
                    ? 'border-[#00e5ff] hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]'
                    : 'border-[#2a3545] hover:border-[#00e5ff] hover:shadow-[0_0_30px_rgba(0,229,255,0.1)]'
                }`}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,229,255,0.03)] to-transparent pointer-events-none" />

                {/* Type badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: project.dotColor, boxShadow: `0 0 8px ${project.dotColor}` }}
                  />
                  <span className="font-pixel text-[0.32rem] tracking-[2px] text-[#4a5568] flex items-center gap-1">
                    {project.typeIcon}
                    {project.type}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-pixel text-[0.75rem] text-[#f5d300] mb-1 leading-[1.6]">
                  {project.title}
                </h3>

                {/* Subtitle */}
                <div className="font-vt text-[1rem] text-[#4a5568] mb-4 tracking-[1px]">
                  {project.subtitle}
                </div>

                {/* Description */}
                <p className="font-mono text-[0.82rem] text-[rgba(232,240,254,0.75)] leading-[1.6] mb-4">
                  {project.description}
                </p>

                {/* Features list */}
                <ul className="features-list space-y-2 mb-4">
                  {project.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="feature-item font-mono text-[0.78rem] text-[rgba(232,240,254,0.8)] leading-[1.6] py-1 pl-5 relative border-b border-[rgba(255,255,255,0.04)] last:border-b-0"
                    >
                      <span className="absolute left-0 text-[#f5d300]">{feature.icon}</span>
                      {feature.text}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`font-pixel text-[0.28rem] px-2 py-1 border ${getTagClasses(
                        tag.color
                      )}`}
                    >
                      {tag.text}
                    </span>
                  ))}
                </div>

                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(0,229,255,0.05)] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamProjects;
