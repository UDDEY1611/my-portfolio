import React, { useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2, Milestone, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EducationExperience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const drawingLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Progressive Line Drawing linked to ScrollTrigger scrub
      if (drawingLineRef.current && timelineRef.current) {
        gsap.fromTo(
          drawingLineRef.current,
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 75%',
              end: 'bottom 85%',
              scrub: 0.8,
            },
          }
        );
      }

      // 2. Timeline blocks staggered entrance
      const items = timelineRef.current?.querySelectorAll('.timeline-block');
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          {
            opacity: 0,
            x: 30,
          },
          {
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            x: 0,
            stagger: 0.15,
            duration: 0.9,
            ease: 'power3.out',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#030407] overflow-hidden"
      aria-label="Education and Milestones Section"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest px-3.5 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/40 shadow-glow-sm">
            <Milestone className="w-3.5 h-3.5" />
            <span>04 // BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display">
            Education & Milestones.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light max-w-xl">
            Verified academic credentials, capstone research presentations, and engineering milestones.
          </p>
        </div>

        <div ref={timelineRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Education Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2.5 text-sm font-mono uppercase tracking-wider text-cyan-400 mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Foundation</span>
            </div>

            {PORTFOLIO_DATA.education.map((edu, idx) => (
              <div
                key={idx}
                className="timeline-block p-6 sm:p-8 rounded-3xl glass-card border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 space-y-5 relative shadow-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                      {edu.institution}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400 mt-0.5">
                      {edu.degree} — {edu.department}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-900/90 px-3.5 py-1.5 rounded-full border border-white/[0.08] shadow-sm">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{edu.location}</span>
                </div>

                <ul className="space-y-3 pt-1">
                  {edu.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Continuous Learning Card */}
            <div className="timeline-block p-6 sm:p-7 rounded-3xl border border-dashed border-slate-700/80 bg-slate-950/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-300">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>Continuous Engineering Learning</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 uppercase">
                  Verified
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Continuous deep-dive research into Distributed Enterprise Backends (Spring Boot), Applied AI & Vector Embeddings (RAG), and Creative 3D Web Graphics (Three.js & GSAP).
              </p>
            </div>
          </div>

          {/* Key Milestones Column with Progressive Line Drawing */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2.5 text-sm font-mono uppercase tracking-wider text-cyan-400 mb-2">
              <Award className="w-4 h-4" />
              <span>Project & Research Deliverables</span>
            </div>

            {/* Timeline Track with Progressive Glowing Drawing Line */}
            <div className="relative ml-4 sm:ml-6 pl-8 sm:pl-10 space-y-10">
              
              {/* Background inactive track line */}
              <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-slate-800 rounded-full" />

              {/* Foreground Progressive Animated Cyan Drawing Line */}
              <div
                ref={drawingLineRef}
                className="absolute left-0 top-3 w-[2px] bg-gradient-to-b from-cyan-400 via-sky-400 to-blue-500 rounded-full shadow-[0_0_12px_#00d2ff]"
                style={{ willChange: 'height' }}
              />

              {PORTFOLIO_DATA.milestones.map((item, idx) => (
                <div key={idx} className="timeline-block relative space-y-3 group">
                  {/* Glowing Node Dot centered on line */}
                  <div className="absolute -left-[37px] sm:-left-[45px] top-1.5 w-4 h-4 rounded-full bg-[#030407] border-2 border-cyan-400 group-hover:bg-cyan-400 group-hover:scale-125 transition-all duration-300 shadow-[0_0_12px_rgba(0,210,255,0.7)] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono px-3 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 shadow-sm">
                      {item.year}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {item.role}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-xl font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06] group-hover:border-cyan-500/25 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default EducationExperience;
