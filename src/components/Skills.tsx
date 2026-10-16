import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Code2, Layout, Server, Database, Brain, Wrench, CheckCircle, Sparkles, Zap } from 'lucide-react';
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

  const getLevelPercentage = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
      case 'expert':
        return 92;
      case 'proficient':
        return 84;
      case 'working':
      case 'competent':
        return 76;
      default:
        return 72;
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.skill-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 40,
            scale: 0.96,
          },
          {
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.85,
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
      id="skills"
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#05060b] overflow-hidden"
      aria-label="Technical Skills Section"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-cyan-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest px-3.5 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/40 shadow-glow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>03 // COMPETENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display">
            Technical Stack.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light max-w-2xl">
            Practical, verified engineering competencies derived directly from real production codebases—spanning full-stack systems, modern AI architectures, and reactive frontends.
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
                className={`skill-card p-6 sm:p-7 rounded-3xl glass-card transition-all duration-300 border flex flex-col justify-between cursor-pointer group/card ${
                  isSelected
                    ? 'border-cyan-400/80 bg-[#0e1324] shadow-[0_0_30px_rgba(0,210,255,0.25)]'
                    : 'border-white/[0.08] hover:border-cyan-500/40 hover:bg-[#090d1a]'
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="p-3 rounded-2xl bg-slate-900 border border-white/[0.08] shadow-inner group-hover/card:scale-105 transition-transform">
                        {getCategoryIcon(category.title)}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white font-display group-hover/card:text-cyan-300 transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-[11px] font-mono text-slate-400">
                          {category.skills.length} core technologies
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                      {isSelected ? 'ACTIVE' : 'EXPAND'}
                    </span>
                  </div>

                  {/* Category Subtitle */}
                  <p className="text-xs text-slate-400 leading-relaxed font-light mb-6">
                    {category.description}
                  </p>

                  {/* Skills Badges with Progress Meters */}
                  <div className="space-y-2.5">
                    {category.skills.map((skill) => {
                      const percentage = getLevelPercentage(skill.level);
                      return (
                        <div
                          key={skill.name}
                          className="p-2.5 rounded-xl bg-slate-950/80 border border-white/[0.05] hover:border-cyan-400/30 transition-all space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                              <span className="text-xs font-mono font-medium text-slate-200">
                                {skill.name}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/40">
                              {skill.level}
                            </span>
                          </div>

                          {/* Animated skill indicator progress bar */}
                          <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700 ease-out"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer status */}
                <div className="pt-5 mt-6 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-cyan-400" />
                    VERIFIED EXPERTISE
                  </span>
                  <span className="text-cyan-400/90">PRODUCTION READY</span>
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
