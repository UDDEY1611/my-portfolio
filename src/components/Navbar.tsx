import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';

interface NavbarProps {
  onResumeClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onResumeClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030407]/85 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-slate-100 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg px-1.5 py-1"
          aria-label="Uday Kumar Portfolio Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors shadow-glow-sm">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold tracking-tight text-base sm:text-lg uppercase text-white group-hover:text-cyan-400 transition-colors">
              {PORTFOLIO_DATA.profile.name}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase -mt-1 hidden sm:block">
              Creative Technologist
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0a0d16]/80 px-4 py-1.5 rounded-full border border-white/[0.08] shadow-inner" aria-label="Primary Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs lg:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] px-3.5 py-1.5 rounded-full transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onResumeClick}
            className="text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 px-3.5 py-2 rounded-lg border border-slate-700 hover:border-cyan-500/40 transition-all flex items-center gap-1.5"
          >
            <span>Résumé</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
          </button>
          
          <a
            href="#contact"
            className="text-xs font-medium tracking-wide bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold px-4 py-2 rounded-lg shadow-glow-sm hover:shadow-glow-md transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>

        {/* Mobile menu toggle button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070910]/95 backdrop-blur-xl border-b border-slate-800 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800/60 px-3 py-2.5 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onResumeClick();
              }}
              className="w-full text-center text-sm font-mono uppercase tracking-wider text-slate-200 bg-slate-900/80 hover:bg-slate-800 py-2.5 rounded-lg border border-slate-700 flex items-center justify-center gap-2"
            >
              <span>View Résumé</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-400" />
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 rounded-lg shadow-glow-sm"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
