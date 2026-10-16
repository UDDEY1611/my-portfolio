import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Code2, Layout, Server, Database, Brain, Wrench, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Skills: React.FC = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const getCategoryIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'programming languages':
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'frontend & creative tech':
        return <Layout className="w-5 h-5 text-blue-400" />;
      case 'backend & systems':
        return <Server className="w-5 h-5 text-emerald-400" />;
      case 'databases & storage':
        return <Database className="w-5 h-5 text-purple-400" />;
      case 'ai & modern architectures':
        return <Brain className="w-5 h-5 text-sky-400" />;
      default:
        return <Wrench className="w-5 h-5 text-indigo-400" />;
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.skill-card');
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          stagger: 0.1,
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
      id="skills"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#05060b] overflow-hidden"
      aria-label="Technical Skills Section"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-2">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40">
            <span>03 // COMPETENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            Technical Stack.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light max-w-2xl">
            Practical, verified engineering stack derived directly from production codebases and real projects—spanning full-stack systems, modern AI architectures, and reactive frontends.
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.skills.map((category, idx) => {
            const isSelected = selectedCategoryIndex === idx;
            return (
              <div
                key={category.title}
                onClick={() => setSelectedCategoryIndex(isSelected ? null : idx)}
                className={`skill-card p-6 rounded-3xl glass-card transition-all duration-300 border flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-cyan-400/60 bg-[#0e1220] shadow-glow-md'
                    : 'border-white/[0.08] hover:border-cyan-500/30 hover:bg-[#0a0d18]'
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-white/[0.08]">
                        {getCategoryIcon(category.title)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white font-display">
                          {category.title}
                        </h3>
                        <p className="text-[11px] font-mono text-slate-400">
                          {category.skills.length} core technologies
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category Subtitle */}
                  <p className="text-xs text-slate-400 leading-relaxed font-light mb-5">
                    {category.description}
                  </p>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="px-3 py-1.5 rounded-xl bg-slate-950/70 border border-white/[0.06] hover:border-cyan-400/40 transition-colors flex items-center gap-1.5 group"
                      >
                        <CheckCircle className="w-3 h-3 text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                        <span className="text-xs font-mono text-slate-200 group-hover:text-cyan-300 transition-colors">
                          {skill.name}
                        </span>
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-950/70 text-cyan-400 ml-1 border border-cyan-800/40">
                            {skill.level}
                          </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer status */}
                <div className="pt-5 mt-5 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>VERIFIED PROFICIENCY</span>
                  <span className="text-cyan-400/80">STACK READY</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skills;
