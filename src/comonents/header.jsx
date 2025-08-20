import React, { useState, useEffect } from 'react';
import { LuHome as Home, LuUserCircle as UserCircle, LuBriefcase as Briefcase, LuFileText as FileText, LuRss as Rss, LuMail as Mail } from 'react-icons/lu';

const NavLink = ({ section, title, children, activeSection, onClick }) => (
  <li>
    <a
      href={`#${section}`}
      data-section={section}
      className={`nav-link flex flex-col items-center p-3 rounded-full transition-all duration-300 hover:bg-gray-200 ${activeSection === section ? 'active' : ''}`}
      title={title}
      onClick={(e) => onClick(e, section)}
    >
      {children}
    </a>
  </li>
);

const Header = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '0px', threshold: 0.3 }
    );

    sections.forEach(section => observer.observe(section));

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  const handleNavClick = (e, section) => {
    e.preventDefault();
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(section);
  };

  return (
    <>
      {/* Sidebar Navigation (Desktop) */}
      <header className="hidden lg:block lg:w-24 lg:h-screen lg:fixed lg:top-0 lg:left-0 lg:flex lg:flex-col lg:items-center p-4 z-50">
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="mb-8">
          <div className="w-16 h-16 rounded-full bg-[#001f3f] flex items-center justify-center shadow-lg">
            {/* مسیر لوگو اصلاح شده است */}
            <img src="/logo-mn.jpg" alt="Logo" className="w-[3.75rem] h-[3.75rem] rounded-full object-cover" />
          </div>
        </a>
        <nav className="glass-effect w-16 rounded-full shadow-lg">
          <ul className="flex flex-col items-center justify-center space-y-2 py-4">
            <NavLink section="home" title="Home" activeSection={activeSection} onClick={handleNavClick}><Home className="w-6 h-6 text-gray-600" /></NavLink>
            <NavLink section="about" title="About" activeSection={activeSection} onClick={handleNavClick}><UserCircle className="w-6 h-6 text-gray-600" /></NavLink>
            <NavLink section="services" title="Services" activeSection={activeSection} onClick={handleNavClick}><Briefcase className="w-6 h-6 text-gray-600" /></NavLink>
            <NavLink section="resume" title="Resume" activeSection={activeSection} onClick={handleNavClick}><FileText className="w-6 h-6 text-gray-600" /></NavLink>
            <NavLink section="blog" title="Blog" activeSection={activeSection} onClick={handleNavClick}><Rss className="w-6 h-6 text-gray-600" /></NavLink>
            <NavLink section="contact" title="Contact" activeSection={activeSection} onClick={handleNavClick}><Mail className="w-6 h-6 text-gray-600" /></NavLink>
          </ul>
        </nav>
      </header>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm p-4 z-50 flex items-center">
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>
          <div className="w-12 h-12 rounded-full bg-[#001f3f] flex items-center justify-center shadow-lg">
            {/* مسیر لوگو اصلاح شده است */}
            <img src="/logo-mn.jpg" alt="Logo" className="w-11 h-11 rounded-full object-cover" />
          </div>
        </a>
        <h1 className="text-xl font-bold text-gray-800 ml-4">Meysam Norouzi</h1>
      </div>
    </>
  );
};

export default Header;
