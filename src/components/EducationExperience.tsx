import React, { useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2, Milestone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EducationExperience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll('.timeline-block');
      if (items && items.length > 0) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#030407] overflow-hidden"
      aria-label="Education and Milestones Section"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-2">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40">
            <Milestone className="w-3.5 h-3.5" />
            <span>04 // BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            Education & Milestones.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light max-w-xl">
            Verified academic credentials, capstone research presentations, and engineering milestones.
          </p>
        </div>

        <div ref={timelineRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Education Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2.5 text-sm font-mono uppercase tracking-wider text-cyan-400 mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Foundation</span>
            </div>

            {PORTFOLIO_DATA.education.map((edu, idx) => (
              <div
                key={idx}
                className="timeline-block p-6 sm:p-8 rounded-3xl glass-card border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 space-y-4 relative"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                      {edu.institution}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400 mt-0.5">
                      {edu.degree} — {edu.department}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-white/[0.06]">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{edu.location}</span>
                </div>

                <ul className="space-y-2.5 pt-2">
                  {edu.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Editable Certification Slot */}
            <div className="timeline-block p-6 rounded-3xl border border-dashed border-slate-700/80 bg-slate-950/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400">
                  <Award className="w-4 h-4 text-slate-400" />
                  <span>Certifications & Continuous Learning</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase">
                  Configurable
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Continuous upskilling in Java Enterprise, Distributed Systems, Computer Science fundamentals, and Applied AI. Add additional verified certifications via <code className="text-cyan-400">src/data/portfolioData.ts</code>.
              </p>
            </div>
          </div>

          {/* Key Milestones Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2.5 text-sm font-mono uppercase tracking-wider text-cyan-400 mb-2">
              <Award className="w-4 h-4" />
              <span>Project & Research Deliverables</span>
            </div>

            <div className="relative border-l border-white/[0.1] ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
              {PORTFOLIO_DATA.milestones.map((item, idx) => (
                <div key={idx} className="timeline-block relative space-y-2">
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#030407] border-2 border-cyan-400 shadow-glow-sm" />

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                      {item.year}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {item.role}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.05]"
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
