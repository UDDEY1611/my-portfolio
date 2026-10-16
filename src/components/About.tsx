import React, { useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { FileText, MapPin, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  onResumeClick: () => void;
}

export const About: React.FC<AboutProps> = ({ onResumeClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(portraitRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        x: -40,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        x: 40,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#040509] overflow-hidden"
      aria-label="About Me Section"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-700/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-2">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40">
            <span>01 // IDENTITY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            {PORTFOLIO_DATA.profile.aboutHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Portrait Column */}
          <div ref={portraitRef} className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-sm sm:max-w-md">
              
              {/* Outer decorative glowing aura */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-indigo-500/30 rounded-[2.5rem] blur-xl opacity-75 group-hover:opacity-100 transition duration-700" />

              {/* Editorial Frame with refined metallic border */}
              <div className="relative rounded-[2.2rem] overflow-hidden border border-cyan-400/40 bg-[#090c14] p-2.5 sm:p-3 shadow-2xl">
                
                {/* Photo Container preserving authentic facial identity */}
                <div className="relative aspect-[3/4] w-full rounded-[1.8rem] overflow-hidden bg-slate-950 border border-white/[0.08]">
                  <img
                    src={PORTFOLIO_DATA.profile.photo}
                    alt="Uday Kumar authentic portrait photograph"
                    className="w-full h-full object-cover object-top filter contrast-[1.01] brightness-[1.01] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = PORTFOLIO_DATA.profile.photoFallback;
                    }}
                  />

                  {/* Subtle rim-lighting overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04060c]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Corner editorial markers */}
                  <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-cyan-300/90 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-cyan-500/30">
                    UDAY KUMAR
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-[10px] font-mono text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>VERIFIED</span>
                  </div>

                  {/* Bottom Portrait Caption */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/[0.08] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white">Uday Kumar</p>
                      <p className="text-[11px] font-mono text-cyan-400">Developer & Technologist</p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{PORTFOLIO_DATA.profile.location}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Under-frame status tags */}
              <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400 px-2">
                <span>IDENTITY: GENUINE</span>
                <span className="text-cyan-400">FULL-STACK & AI</span>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col space-y-6 text-left">
            
            {/* Primary Bio Paragraph */}
            <div className="p-6 rounded-2xl glass-card border border-cyan-500/20 shadow-xl relative">
              <div className="absolute top-0 left-8 -translate-y-1/2 px-3 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 uppercase tracking-wider">
                Introduction
              </div>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans font-normal pt-1">
                "{PORTFOLIO_DATA.profile.bio}"
              </p>
            </div>

            {/* Extended Academic & Practical Overview */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              {PORTFOLIO_DATA.profile.extendedBio}
            </p>

            {/* Grounded Academic Credentials & Focus Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06] hover:border-cyan-500/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Undergraduate Degree</h4>
                    <p className="text-xs text-slate-400 mt-0.5">B.Tech in Computer Science & Engineering</p>
                    <p className="text-[11px] text-cyan-400/90 font-mono mt-0.5">Vaagdevi Institute of Tech & Science</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06] hover:border-cyan-500/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Practical Engineering</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Full-Stack Services & Applied AI Pipelines</p>
                    <p className="text-[11px] text-blue-400/90 font-mono mt-0.5">Spring Boot • React • RAG • FastAPI</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grounded Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {PORTFOLIO_DATA.stats.map((stat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/40 border border-white/[0.05] text-center">
                  <p className="text-lg sm:text-xl font-bold font-display text-white">{stat.value}</p>
                  <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onResumeClick}
                className="px-6 py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-200 border border-cyan-500/40 hover:border-cyan-400 font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-glow-sm"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>View Résumé Document</span>
              </button>

              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] font-medium text-xs tracking-wide transition-all duration-200 flex items-center gap-2"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
