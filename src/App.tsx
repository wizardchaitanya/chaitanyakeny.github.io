import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import SoloWork from './sections/SoloWork';
import TeamProjects from './sections/TeamProjects';
import PersonalProjects from './sections/PersonalProjects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import CursorTrail from './components/CursorTrail';
import ParticleBackground from './components/ParticleBackground';
import MatrixRain from './components/MatrixRain';
import FloatingGameIcons from './components/FloatingGameIcons';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize scroll-triggered animations for sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelectorAll('.reveal-item'),
        { 
          opacity: 0, 
          y: 40 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Parallax effect for section dividers
    gsap.utils.toArray<HTMLElement>('.section-divider').forEach((divider) => {
      gsap.to(divider, {
        x: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: divider,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-black">
      <CursorTrail />
      <ParticleBackground />
      <MatrixRain />
      <FloatingGameIcons />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <SoloWork />
        <TeamProjects />
        <PersonalProjects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
