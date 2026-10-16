import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { ExternalLink, Github, Eye, Sparkles, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Full Stack & AI Systems', 'Data Systems & AI Agents', 'Full Stack & Commercial Software'];

  const filteredProjects = activeFilter === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.project-card');
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#030408] overflow-hidden"
      aria-label="Selected Projects Section"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-blue-700/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 // SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
              Engineered Projects.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-light max-w-xl">
              Authentic systems built for real-world impact—spanning autonomous AI agents, semantic enterprise architectures, and commercial point-of-sale platforms.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-semibold shadow-glow-sm'
                    : 'bg-slate-900/60 text-slate-400 border-white/[0.08] hover:text-white hover:border-slate-600'
                }`}
              >
                {cat === 'All' ? 'All Systems' : cat.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="project-card group rounded-3xl overflow-hidden glass-card glass-card-hover border border-white/[0.08] flex flex-col justify-between"
            >
              <div>
                {/* Visual Thumbnail */}
                <div
                  className="relative aspect-video w-full overflow-hidden bg-slate-950 cursor-pointer border-b border-white/[0.06]"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b14] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Badge & Quick View Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                    {project.category}
                  </div>

                  <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/10 text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-400/50 transition-colors">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h3
                      className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-display cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 line-clamp-1">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-cyan-950/50 text-cyan-400 border border-cyan-800/40">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 border-t border-white/[0.04] mt-4 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors group/btn"
                >
                  <span>Architecture Deep Dive</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                      aria-label={`${project.title} live demo`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Central Configuration Note */}
        <div className="mt-12 text-center text-xs font-mono text-slate-500">
          All project metadata, GitHub repositories, and architectural assets are centrally managed in <span className="text-cyan-400">src/data/portfolioData.ts</span>.
        </div>

      </div>

      {/* Deep Dive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
