import React, { useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { X, Printer, Download, Mail, MapPin, GraduationCap, Code2, Briefcase, Sparkles, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#090b12] border border-cyan-500/30 shadow-2xl p-6 sm:p-10 space-y-8 text-left text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Sparkles className="w-4 h-4" />
            <span>OFFICIAL CURRICULUM VITAE PREVIEW</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-400 transition-colors flex items-center gap-1.5"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Header Profile Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/[0.08] pb-6">
          <div className="space-y-1.5">
            <h2 id="resume-title" className="text-3xl font-extrabold text-white font-display">
              {PORTFOLIO_DATA.profile.name}
            </h2>
            <p className="text-sm font-mono text-cyan-400">
              {PORTFOLIO_DATA.profile.title}
            </p>
            <p className="text-xs text-slate-400 max-w-md font-light">
              Full-Stack Developer specializing in enterprise Java Spring Boot backends, autonomous AI agent architectures, and responsive interactive web applications.
            </p>
          </div>

          <div className="flex flex-col sm:items-end space-y-1 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="hover:text-cyan-300 transition-colors">
                {PORTFOLIO_DATA.profile.email}
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{PORTFOLIO_DATA.profile.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-cyan-400">
              <ExternalLink className="w-3.5 h-3.5" />
              <a href={PORTFOLIO_DATA.profile.github} target="_blank" rel="noreferrer" className="hover:underline">
                github.com/udaykumar1611
              </a>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 border-b border-white/[0.04] pb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Education</span>
          </div>

          {PORTFOLIO_DATA.education.map((edu, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex flex-wrap items-center justify-between">
                <h4 className="text-sm font-bold text-white font-display">
                  {edu.institution}
                </h4>
                <span className="text-xs font-mono text-slate-400">{edu.period}</span>
              </div>
              <p className="text-xs font-mono text-cyan-400">
                {edu.degree} — {edu.department} ({edu.location})
              </p>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pt-1 font-light">
                {edu.details.map((d, dIdx) => (
                  <li key={dIdx}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Key Projects Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 border-b border-white/[0.04] pb-1">
            <Briefcase className="w-4 h-4" />
            <span>Selected Projects</span>
          </div>

          {PORTFOLIO_DATA.projects.map((proj) => (
            <div key={proj.id} className="p-4 rounded-xl bg-slate-900/40 border border-white/[0.04] space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <h4 className="text-sm font-bold text-white font-display">
                  {proj.title}
                </h4>
                <span className="text-[11px] font-mono text-cyan-400">
                  {proj.category}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {proj.technologies.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Competencies Summary */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 border-b border-white/[0.04] pb-1">
            <Code2 className="w-4 h-4" />
            <span>Technical Skills</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="font-mono text-slate-400">Languages:</span>
              <p className="text-slate-200 mt-0.5 font-light">Java, Python, TypeScript, JavaScript, SQL, HTML5/CSS3</p>
            </div>
            <div>
              <span className="font-mono text-slate-400">Backend & AI:</span>
              <p className="text-slate-200 mt-0.5 font-light">Spring Boot, FastAPI, Node.js, RAG Architecture, LLMs, Vector DB</p>
            </div>
            <div>
              <span className="font-mono text-slate-400">Frontend & 3D:</span>
              <p className="text-slate-200 mt-0.5 font-light">React.js, Three.js / WebGL, GSAP, Tailwind CSS, Vite</p>
            </div>
            <div>
              <span className="font-mono text-slate-400">Databases & Tools:</span>
              <p className="text-slate-200 mt-0.5 font-light">PostgreSQL, SQLite, Docker, Git/GitHub, Maven, Postman</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Candidate: Uday Kumar</span>
          <button
            onClick={handlePrint}
            className="text-cyan-400 hover:underline flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Résumé Document</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResumeModal;
