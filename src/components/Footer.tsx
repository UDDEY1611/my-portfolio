import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowUp, Terminal, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020306] border-t border-white/[0.08] py-12 px-4 sm:px-6 lg:px-8 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Wordmark and Identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="font-display font-bold text-white text-sm sm:text-base tracking-tight uppercase">
              {PORTFOLIO_DATA.profile.name}
            </p>
            <p className="text-[11px] font-mono text-cyan-400/80 -mt-0.5">
              Developer & Creative Technologist
            </p>
          </div>
        </div>

        {/* Center Credits */}
        <div className="text-center text-xs font-mono text-slate-500 space-y-1">
          <p>© {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}. All rights reserved.</p>
          <p className="text-[10px] text-slate-600 flex items-center justify-center gap-1">
            Built with React, TypeScript, Three.js & Tailwind CSS
          </p>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400/60 text-slate-400 hover:text-cyan-400 transition-all shadow-sm group focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>

      </div>
    </footer>
  );
};

export default Footer;
