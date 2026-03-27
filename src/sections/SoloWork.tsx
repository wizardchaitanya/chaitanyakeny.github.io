import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, CheckCircle, Zap, Target, Star } from 'lucide-react';
import Card3D from '../components/Card3D';
import useTextScramble from '../hooks/useTextScramble';

gsap.registerPlugin(ScrollTrigger);

const SoloWork = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header
      gsap.fromTo(
        '.solo-header',
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

      // Featured project cards with 3D effect
      gsap.fromTo(
        '.project-card-3d',
        { opacity: 0, y: 50, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 75%',
          },
        }
      );

      // Jam table rows with slide-in
      gsap.fromTo(
        '.jam-row',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.jam-table',
            start: 'top 85%',
          },
        }
      );

      // Assignment cards with scale
      gsap.fromTo(
        '.assign-card',
        { opacity: 0, scale: 0.9, rotateY: -10 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.assignments-container',
            start: 'top 80%',
          },
        }
      );

      // Counter animation for jam count
      const counter = { value: 0 };
      gsap.to(counter, {
        value: 10,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.jam-counter',
          start: 'top 85%',
        },
        onUpdate: () => {
          const el = document.querySelector('.jam-count');
          if (el) el.textContent = Math.round(counter.value).toString();
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scramble effect for section title
  const { displayText: scrambledTitle } = useTextScramble({
    text: 'SOLO WORK',
    trigger: true,
  });

  const featuredProjects = [
    {
      type: 'SOLO · BYOG 2025 · 3 DAYS',
      typeClass: 'type-solo',
      dotColor: '#39ff14',
      icon: <Star size={14} />,
      title: 'ECHO',
      jam: 'Theme: "RE: Think, Mix, Make"',
      desc: '2D puzzle-platformer where you record your movement — a ghostly echo then replays every action. Solve puzzles by coordinating with your own past self. Built advanced 2D platformer movement from scratch.',
      tags: [
        { text: 'Puzzle-Platformer', color: 'green' },
        { text: 'Time-Echo Mechanic', color: 'cyan' },
        { text: 'Advanced Movement', color: 'yellow' },
      ],
      link: 'https://chaitanyawizard.itch.io/echo',
      featured: true,
    },
    {
      type: 'SOLO · MINI JAM #51 · 3 DAYS',
      typeClass: 'type-solo',
      dotColor: '#39ff14',
      icon: <Target size={14} />,
      title: 'ECHO BELOW',
      jam: 'Theme: "Underwater" · Object: Speaker',
      desc: 'Trapped in a pitch-black underwater dungeon. Fire echo waves from a speaker to reveal the surrounding terrain — but use them carefully, they are not unlimited.',
      tags: [
        { text: 'Echolocation', color: 'cyan' },
        { text: 'Resource Management', color: 'green' },
        { text: 'Puzzle-Platformer', color: 'pink' },
      ],
      link: 'https://chaitanyawizard.itch.io/echo-below',
      featured: true,
    },
    {
      type: 'SOLO · MINI JAM #52 · 2 DAYS',
      typeClass: 'type-solo',
      dotColor: '#39ff14',
      icon: <Zap size={14} />,
      title: 'FROST BUILD',
      jam: 'Theme: "Freeze" · Object: Whistle',
      desc: 'Fire sonic waves from a whistle to freeze falling objects mid-air — use frozen objects as platforms. Full ScriptableObject architecture, pixel art aesthetic, procedural audio, shipped in 48 hours.',
      tags: [
        { text: 'Physics Mechanic', color: 'cyan' },
        { text: 'ScriptableObjects', color: 'yellow' },
        { text: 'Puzzle-Platformer', color: 'green' },
      ],
      link: 'https://chaitanyawizard.itch.io/frost-build',
      featured: true,
    },
  ];

  const jamEntries = [
    {
      num: '01',
      name: 'DeadLine',
      jam: 'Patch Notes V1.1 — "Out of Time"',
      genre: 'Platformer / Time Pressure',
      deadline: '10 days',
      link: 'https://chaitanyawizard.itch.io/deadline',
    },
    {
      num: '02',
      name: 'Space Biscuit Delivery',
      jam: 'Brackeys 2025.2 — "Risk it for the Biscuit"',
      genre: 'Risk/Reward Arcade Survival',
      deadline: '7 days',
      link: 'https://chaitanyawizard.itch.io/space-biscuit-delivery',
    },
    {
      num: '03',
      name: 'Glitch Runner',
      jam: 'Patch Notes V1.0 — "The Error Is the Feature"',
      genre: 'Chaotic 2D Platformer',
      deadline: '3 days',
      link: 'https://chaitanyawizard.itch.io/glitch-runner',
    },
  ];

  const assignments = [
    {
      badge: 'ASSIGNMENT 01',
      title: 'CHESS CORE MECHANICS SYSTEM',
      sub: 'Unity · C# · Board Game Systems Architecture',
      desc: 'Complete chess core gameplay system in Unity — centralized BoardManager tracks tile occupancy, validates movements, and manages all piece interactions across a scalable, modular OOP architecture.',
      tags: [
        { text: 'Unity', color: 'yellow' },
        { text: 'C#', color: 'cyan' },
        { text: 'OOP', color: 'green' },
        { text: 'Board Systems', color: 'pink' },
        { text: 'Inheritance', color: 'blue' },
      ],
      systems: [
        'BoardManager — board state & tile occupancy',
        'Base ChessPiece class with shared properties',
        'All 6 pieces: Rook, Bishop, Knight, Queen, King, Pawn',
        'Legal move generation per chess rules',
        'Movement blocking — friendly piece detection',
        'Enemy piece capture detection',
        'Tile highlighting for legal moves & captures',
        'Modular architecture for easy rule expansion',
      ],
    },
    {
      badge: 'ASSIGNMENT 02',
      title: 'FOOTBALL SHOOTER — SWIPE PENALTY KICK MECHANIC',
      sub: 'Unity · C# · Physics · Mobile · Cross-Platform',
      desc: 'Physics-based penalty shooting prototype — swipe direction controls shot direction, swipe length determines power. Rigidbody physics with realistic spin, goalkeeper AI, state machine, UI feedback, audio. Tested on Windows and Android.',
      tags: [
        { text: 'Unity', color: 'yellow' },
        { text: 'C#', color: 'cyan' },
        { text: 'Physics', color: 'green' },
        { text: 'Mobile / Android', color: 'pink' },
        { text: 'Input Systems', color: 'blue' },
      ],
      systems: [
        'Swipe input → shot direction & power',
        'Rigidbody physics with backspin & sidespin',
        'Camera-aligned world-space shot direction',
        'Goalkeeper collision & save/goal detection',
        'Ball state machine: Ready → InAir → Result',
        'Randomised spawn point system',
        'Shot power UI indicator',
        'Sound: kick, goal, goalkeeper save',
        'UI feedback: Goal / Saved / Missed',
        'Cross-platform: Windows & Android debugged',
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
      id="solo"
      ref={sectionRef}
      className="relative z-10 py-20 md:py-28 px-4 md:px-8"
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Section Header */}
        <div className="solo-header mb-12">
          <div className="font-pixel text-[0.5rem] text-[#00e5ff] tracking-[4px] mb-2 glow-cyan">
            // 002
          </div>
          <h2 className="font-pixel text-[clamp(0.8rem,2vw,1.2rem)] text-[#f5d300] mb-2 glow-yellow">
            {scrambledTitle}
          </h2>
          <div className="w-full h-[2px] bg-gradient-to-r from-[#f5d300] to-transparent mb-8" />
        </div>

        {/* Jam Counter */}
        <div className="jam-counter flex items-center gap-4 mb-8 p-4 bg-[#111820] border border-[#2a3545]">
          <div className="font-pixel text-[0.6rem] text-[#f5d300]">
            <span className="jam-count text-[1.2rem]">0</span>+
          </div>
          <div className="font-mono text-[0.8rem] text-[#4a5568]">
            GAME JAMS COMPLETED
          </div>
          <div className="flex-1 h-2 bg-[#161e28] border border-[#2a3545] overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#f5d300] to-[#00e5ff] animate-pulse"
              style={{ width: '85%' }}
            />
          </div>
        </div>

        {/* Game Jam Projects Label */}
        <div className="font-pixel text-[0.45rem] text-[#00e5ff] mb-6 tracking-[2px]">
          // GAME JAM PROJECTS
        </div>

        {/* Featured Projects Grid with 3D Cards */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {featuredProjects.map((project, index) => (
            <Card3D key={index} className="project-card-3d">
              <div
                className={`bg-[#111820] border p-5 relative overflow-hidden h-full group transition-all duration-500 ${
                  project.featured
                    ? 'border-[#f5d300] hover:shadow-[0_0_30px_rgba(245,211,0,0.15)]'
                    : 'border-[#2a3545] hover:border-[#00e5ff] hover:shadow-[0_0_30px_rgba(0,229,255,0.1)]'
                }`}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(245,211,0,0.03)] to-transparent pointer-events-none" />

                {/* Type badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: project.dotColor, boxShadow: `0 0 8px ${project.dotColor}` }}
                  />
                  <span className="font-pixel text-[0.32rem] tracking-[2px] text-[#4a5568] flex items-center gap-1">
                    {project.icon}
                    {project.type}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-pixel text-[0.65rem] text-[#f5d300] mb-1 leading-[1.6]">
                  {project.title}
                </h3>

                {/* Jam info */}
                <div className="font-vt text-[1rem] text-[#4a5568] mb-4 tracking-[1px]">
                  {project.jam}
                </div>

                {/* Description */}
                <p className="font-mono text-[0.82rem] text-[rgba(232,240,254,0.75)] leading-[1.6] mb-4">
                  {project.desc}
                </p>

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

                {/* Link */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-pixel text-[0.35rem] text-[#00e5ff] border-b border-[#00e5ff] pb-0.5 transition-all duration-300 hover:text-[#f5d300] hover:border-[#f5d300] group/link"
                >
                  <ExternalLink size={12} />
                  PLAY ON ITCH.IO
                  <span className="transform transition-transform duration-300 group-hover/link:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </Card3D>
          ))}
        </div>

        {/* Additional Releases Table */}
        <div className="mb-12">
          <div className="font-pixel text-[0.38rem] text-[#00e5ff] mb-4 tracking-[2px]">
            // ADDITIONAL RELEASES
          </div>
          <div className="overflow-x-auto border border-[#2a3545]">
            <table className="jam-table w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-[#f5d300]">
                  <th className="font-pixel text-[0.35rem] text-[#f5d300] py-3 px-4 text-left tracking-[1px]">#</th>
                  <th className="font-pixel text-[0.35rem] text-[#f5d300] py-3 px-4 text-left tracking-[1px]">GAME</th>
                  <th className="font-pixel text-[0.35rem] text-[#f5d300] py-3 px-4 text-left tracking-[1px]">JAM / THEME</th>
                  <th className="font-pixel text-[0.35rem] text-[#f5d300] py-3 px-4 text-left tracking-[1px]">GENRE</th>
                  <th className="font-pixel text-[0.35rem] text-[#f5d300] py-3 px-4 text-left tracking-[1px]">DEADLINE</th>
                  <th className="font-pixel text-[0.35rem] text-[#f5d300] py-3 px-4 text-left tracking-[1px]">LINK</th>
                </tr>
              </thead>
              <tbody>
                {jamEntries.map((entry, index) => (
                  <tr
                    key={index}
                    className="jam-row border-b border-[#2a3545] hover:bg-[rgba(245,211,0,0.04)] transition-colors duration-200"
                  >
                    <td className="py-3 px-4">
                      <span className="font-pixel text-[0.45rem] text-[#f5d300]">{entry.num}</span>
                    </td>
                    <td className="font-mono text-[0.8rem] text-[#e8f0fe] py-3 px-4">{entry.name}</td>
                    <td className="font-mono text-[0.8rem] text-[#00e5ff] py-3 px-4">{entry.jam}</td>
                    <td className="font-mono text-[0.8rem] text-[rgba(232,240,254,0.8)] py-3 px-4">
                      {entry.genre}
                    </td>
                    <td className="font-mono text-[0.8rem] text-[rgba(232,240,254,0.8)] py-3 px-4">
                      {entry.deadline}
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={entry.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-pixel text-[0.32rem] text-[#00e5ff] border-b border-[#00e5ff] transition-all duration-300 hover:text-[#f5d300] hover:border-[#f5d300]"
                      >
                        PLAY ↗
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 font-mono text-[0.82rem] text-[#4a5568]">
            + Mobile game jam title · Full portfolio →{' '}
            <a
              href="https://chaitanyawizard.itch.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00e5ff] border-b border-[#00e5ff] transition-all duration-300 hover:text-[#f5d300] hover:border-[#f5d300]"
            >
              SEE MORE
            </a>
          </div>
        </div>

        {/* Assignments Section */}
        <div className="assignments-container">
          <div className="font-pixel text-[0.45rem] text-[#00e5ff] mb-4 tracking-[2px]">
            // ASSIGNMENTS
          </div>
          <div className="font-mono text-[0.85rem] text-[rgba(232,240,254,0.5)] mb-8 leading-[1.7] border-l-[3px] border-[#f5d300] pl-4">
            Completed as technical assignments for game developer positions. Executed to industry
            standard — demonstrating production-level architecture, modular design, and
            cross-platform capability.
          </div>

          {assignments.map((assignment, index) => (
            <div
              key={index}
              className="assign-card bg-[#111820] border border-[#f5d300] p-6 mb-6 relative overflow-hidden group transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,211,0,0.1)]"
              style={{ perspective: '1000px' }}
            >
              {/* Background watermark */}
              <div className="absolute top-3 right-4 font-pixel text-[0.28rem] text-[#f5d300] tracking-[2px] opacity-20">
                ASSIGNMENT
              </div>

              {/* Badge */}
              <div className="inline-block font-pixel text-[0.32rem] bg-[#f5d300] text-[#080c10] px-3 py-1.5 mb-4 tracking-[1px]">
                {assignment.badge}
              </div>

              {/* Title */}
              <h3 className="font-pixel text-[0.7rem] text-[#f5d300] mb-1 leading-[1.7]">
                {assignment.title}
              </h3>

              {/* Subtitle */}
              <div className="font-vt text-[1.1rem] text-[#00e5ff] mb-4 tracking-[1px]">
                {assignment.sub}
              </div>

              {/* Description */}
              <p className="font-mono text-[0.82rem] text-[rgba(232,240,254,0.8)] leading-[1.7] mb-4">
                {assignment.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {assignment.tags.map((tag, tagIndex) => (
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

              {/* Key Systems */}
              <div className="font-pixel text-[0.32rem] text-[#00e5ff] mb-3 tracking-[2px]">
                KEY SYSTEMS:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {assignment.systems.map((system, sysIndex) => (
                  <div
                    key={sysIndex}
                    className="bg-[rgba(245,211,0,0.05)] border border-[rgba(245,211,0,0.2)] px-3 py-2 font-mono text-[0.72rem] text-[#e8f0fe] flex items-center gap-2 transition-all duration-300 hover:bg-[rgba(245,211,0,0.1)] hover:border-[rgba(245,211,0,0.4)]"
                  >
                    <CheckCircle size={12} className="text-[#39ff14] flex-shrink-0" />
                    {system}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoloWork;
