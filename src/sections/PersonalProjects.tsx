import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Loader2, Box, Ghost, Lightbulb, BookOpen, Code, Gamepad } from 'lucide-react';
import useTextScramble from '../hooks/useTextScramble';

gsap.registerPlugin(ScrollTrigger);

const PersonalProjects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header
      gsap.fromTo(
        '.personal-header',
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

      // Project cards with 3D perspective
      gsap.fromTo(
        '.personal-project',
        { opacity: 0, y: 60, rotateX: 20 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.personal-projects-container',
            start: 'top 75%',
          },
        }
      );

      // Progress bars animation
      gsap.fromTo(
        '.progress-bar',
        { width: '0%' },
        {
          width: (i) => `${[65, 45][i]}%`,
          duration: 1.5,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.personal-projects-container',
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scramble effect for section title
  const { displayText: scrambledTitle } = useTextScramble({
    text: 'PERSONAL PROJECTS — IN DEVELOPMENT',
    trigger: true,
  });

  const projects = [
    {
      status: 'SOLO · IN DEV',
      statusIcon: <Loader2 size={12} className="animate-spin" />,
      dotColor: '#ff2d78',
      title: 'WHISPERS OF THE NAGA',
      subtitle: '3D Cinematic Puzzle-Adventure',
      platform: 'PC · In Progress',
      progress: 65,
      description:
        'Dark mythological puzzle-adventure inside a forgotten temple-prison built to seal an ancient serpent of Indian legend. Blending exploration, cinematic puzzles, light combat, and horror atmosphere — each playable character carries a personal past tied to the Naga mythology.',
      features: [
        { icon: <Box size={12} />, text: '3D environments modelled in Blender, integrated into Unity with custom lighting for cinematic horror tone' },
        { icon: <Gamepad size={12} />, text: 'Multi-character narrative system — each character\'s backstory intersects with the mythology' },
        { icon: <Code size={12} />, text: 'Sole developer: gameplay programming, 3D art pipeline, level design, and narrative scripting' },
        { icon: <BookOpen size={12} />, text: 'Unique setting drawn from Indian mythology — unexplored territory in mainstream indie games' },
      ],
      tags: [
        { text: 'Unity', color: 'yellow' },
        { text: 'Blender', color: 'cyan' },
        { text: '3D', color: 'pink' },
        { text: 'Puzzle', color: 'green' },
        { text: 'Horror', color: 'blue' },
      ],
    },
    {
      status: 'SOLO · IN DEV',
      statusIcon: <Loader2 size={12} className="animate-spin" />,
      dotColor: '#ff2d78',
      title: 'SHADOW & ALCHEMY',
      subtitle: '2D Top-Down Psychological Survival',
      platform: 'PC · In Progress',
      progress: 45,
      description:
        "Psychological survival where the player navigates a world shaped by personal trauma. The protagonist's shadow grows stronger as sanity deteriorates — eventually manifesting as hostile creatures born from unresolved memory.",
      features: [
        { icon: <Ghost size={12} />, text: 'Core sanity system: darkness depletes sanity, causing shadow to grow and spawn trauma-creatures' },
        { icon: <Lightbulb size={12} />, text: 'Light as a gameplay mechanic — managing movement between moonlit areas and torches' },
        { icon: <BookOpen size={12} />, text: 'Narrative-first: the journey is about understanding and overcoming memories, not just surviving' },
        { icon: <Code size={12} />, text: 'Building all systems solo: sanity/shadow AI, top-down movement, environmental storytelling' },
      ],
      tags: [
        { text: 'Unity', color: 'yellow' },
        { text: '2D Top-Down', color: 'cyan' },
        { text: 'Survival', color: 'pink' },
        { text: 'Story-Driven', color: 'green' },
      ],
    },
  ];

  const getTagClasses = (color: string) => {
    const classes: Record<string, string> = {
      yellow: 'border-[#f5d300] text-[#f5d300]',
      cyan: 'border-[#00e5ff] text-[#00e5ff]',
      green: 'border-[#39ff14] text-[#39ff14]',
      pink: 'border-[#ff2d78] text-[#ff2d78]',
      blue: 'border-[#2e75ff] text-[#2e75ff]',
    };
    return classes[color] || classes.yellow;
  };

  return (
    <section
      id="personal"
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
        <div className="personal-header mb-12">
          <div className="font-pixel text-[0.5rem] text-[#00e5ff] tracking-[4px] mb-2 glow-cyan">
            // 004
          </div>
          <h2 className="font-pixel text-[clamp(0.8rem,2vw,1.2rem)] text-[#f5d300] mb-2 glow-yellow">
            {scrambledTitle}
          </h2>
          <div className="w-full h-[2px] bg-gradient-to-r from-[#f5d300] to-transparent" />
        </div>

        {/* Projects Container */}
        <div className="personal-projects-container space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="personal-project bg-[#111820] border border-[#2a3545] p-6 md:p-8 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 md:gap-8 relative overflow-hidden group transition-all duration-500 hover:border-[#f5d300] hover:shadow-[0_0_30px_rgba(245,211,0,0.1)]"
              style={{ perspective: '1000px' }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(245,211,0,0.03)] to-transparent pointer-events-none" />

              {/* Left Column */}
              <div className="relative z-10">
                {/* Status badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: project.dotColor, boxShadow: `0 0 8px ${project.dotColor}` }}
                  />
                  <span className="font-pixel text-[0.32rem] tracking-[2px] text-[#4a5568] flex items-center gap-1">
                    {project.statusIcon}
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-pixel text-[0.75rem] md:text-[0.85rem] text-[#f5d300] mb-1 leading-[1.7]">
                  {project.title}
                </h3>

                {/* Subtitle */}
                <div className="font-vt text-[1.1rem] text-[#00e5ff] mb-4 tracking-[1px]">
                  {project.subtitle}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
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

                {/* Platform */}
                <div className="font-vt text-[1rem] text-[#4a5568] tracking-[1px] mb-4">
                  {project.platform}
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-pixel text-[0.3rem] text-[#f5d300]">PROGRESS</span>
                    <span className="font-mono text-[0.7rem] text-[#f5d300]">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-[#161e28] border border-[#2a3545] overflow-hidden">
                    <div
                      className="progress-bar h-full bg-gradient-to-r from-[#f5d300] to-[#00e5ff] relative"
                      style={{ width: '0%' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="relative z-10">
                {/* Description */}
                <p className="font-mono text-[0.85rem] text-[rgba(232,240,254,0.8)] leading-[1.7] mb-5">
                  {project.description}
                </p>

                {/* Features list */}
                <ul className="space-y-3">
                  {project.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="font-mono text-[0.78rem] text-[rgba(232,240,254,0.8)] leading-[1.6] py-2 pl-6 relative border-b border-[rgba(255,255,255,0.04)] last:border-b-0"
                    >
                      <span className="absolute left-0 text-[#f5d300]">{feature.icon}</span>
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(245,211,0,0.05)] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalProjects;
