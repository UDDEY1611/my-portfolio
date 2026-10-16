import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { ExternalLink, Github, Eye, Sparkles, ArrowUpRight, FolderGit2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Interactive 3D Tilt Project Card Component
const TiltProjectCard: React.FC<{
  project: Project;
  onSelect: (p: Project) => void;
}> = ({ project, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateX = -y * 14;
    const rotateY = x * 14;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    if (imageRef.current) {
      imageRef.current.style.transform = `scale(1.08) translate3d(${-x * 12}px, ${-y * 12}px, 0)`;
    }

    if (glareRef.current) {
      const glareX = (x + 0.5) * 100;
      const glareY = (y + 0.5) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(0, 210, 255, 0.25), transparent 60%)`;
      glareRef.current.style.opacity = '1';
    }
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';

    if (imageRef.current) {
      imageRef.current.style.transform = 'scale(1) translate3d(0, 0, 0)';
      imageRef.current.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    }

    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
      glareRef.current.style.transition = 'opacity 0.5s ease-out';
    }
  };

  const handlePointerEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = 'none';
    }
    if (imageRef.current) {
      imageRef.current.style.transition = 'none';
    }
    if (glareRef.current) {
      glareRef.current.style.transition = 'none';
    }
  };

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
      className="project-card group rounded-3xl overflow-hidden glass-card border border-white/[0.08] hover:border-cyan-400/50 flex flex-col justify-between relative shadow-xl will-change-transform"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Dynamic 3D Glare Lighting overlay */}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none rounded-3xl z-20 opacity-0 transition-opacity"
      />

      <div>
        {/* Visual Thumbnail */}
        <div
          className="relative aspect-video w-full overflow-hidden bg-slate-950 cursor-pointer border-b border-white/[0.06]"
          onClick={() => onSelect(project)}
        >
          <img
            ref={imageRef}
            src={project.image}
            alt={`${project.title} screenshot visual`}
            className="w-full h-full object-cover object-top will-change-transform"
            loading="lazy"
          />
          
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b14] via-transparent to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

          {/* Category Badge & Inspect Icon */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono text-cyan-300 shadow-sm">
            {project.category}
          </div>

          <div className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-400/50 transition-colors shadow-sm">
            <Eye className="w-4 h-4" />
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <h3
              className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-display cursor-pointer"
              onClick={() => onSelect(project)}
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
                className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.08]"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-6 pt-0 border-t border-white/[0.04] mt-4 flex items-center justify-between">
        <button
          onClick={() => onSelect(project)}
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors group/btn"
        >
          <span>Architecture Deep Dive</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-2">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors shadow-sm"
              aria-label={`${project.title} GitHub repository link`}
              title="View GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          ) : (
            <span
              className="p-2 rounded-xl bg-slate-900/50 border border-dashed border-slate-700 text-slate-500 cursor-help"
              title="Repository link can be configured in src/data/portfolioData.ts"
            >
              <FolderGit2 className="w-4 h-4" />
            </span>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-colors shadow-sm"
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

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
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.14,
            duration: 0.9,
            ease: 'power3.out',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#030408] overflow-hidden"
      aria-label="Selected Projects Section"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-blue-700/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 sm:mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest px-3.5 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/40 shadow-glow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 // SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display">
              Engineered Projects.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-light max-w-xl">
              Authentic software systems built for real-world utility—spanning enterprise Spring Boot backends, business semantic data architectures, and commercial POS platforms.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto bg-slate-950/80 p-1.5 rounded-2xl border border-white/[0.08] backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-xl transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {cat === 'All' ? 'All Systems' : cat.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with 3D Tilt Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <TiltProjectCard
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        {/* Central Configuration Note */}
        <div className="mt-14 text-center text-xs font-mono text-slate-500">
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
