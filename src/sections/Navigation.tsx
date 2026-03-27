import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'about', label: 'ABOUT' },
    { id: 'solo', label: 'SOLO WORK' },
    { id: 'team', label: 'TEAM' },
    { id: 'personal', label: 'PERSONAL' },
    { id: 'contact', label: 'CONTACT' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate nav on load
    gsap.fromTo(
      '.nav-logo',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.nav-link',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.4, ease: 'power3.out' }
    );
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80; // Height of fixed nav + padding
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        isScrolled
          ? 'bg-[rgba(8,12,16,0.95)] backdrop-blur-md border-b-2 border-[#f5d300]'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between h-14 px-4 md:px-8">
        {/* Logo */}
        <div
          className="nav-logo font-pixel text-[0.7rem] text-[#f5d300] tracking-[2px] glow-yellow cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          CK.DEV
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`nav-link font-pixel text-[0.45rem] tracking-[1px] pb-1 border-b-2 transition-all duration-200 hover:text-[#f5d300] hover:border-[#f5d300] hover:glow-yellow ${
                activeSection === item.id
                  ? 'text-[#f5d300] border-[#f5d300] glow-yellow'
                  : 'text-[#e8f0fe] border-transparent'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#f5d300] p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[rgba(8,12,16,0.98)] border-b-2 border-[#f5d300] transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`font-pixel text-[0.5rem] tracking-[1px] py-3 px-6 text-left border-b border-[#2a3545] last:border-b-0 transition-all duration-200 hover:text-[#f5d300] hover:bg-[rgba(245,211,0,0.05)] ${
                activeSection === item.id ? 'text-[#f5d300]' : 'text-[#e8f0fe]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
