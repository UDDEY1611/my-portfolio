import React from 'react';
import { Project } from '../data/portfolioData';
import { X, ExternalLink, Github, CheckCircle, Layers } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090b12] border border-cyan-500/30 shadow-2xl p-6 sm:p-8 space-y-6 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            <span>{project.category}</span>
          </div>
          <h3 id="modal-project-title" className="text-2xl sm:text-4xl font-bold text-white font-display">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base font-light text-cyan-400 font-mono">
            {project.subtitle}
          </p>
        </div>

        {/* Primary Project Visual */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-inner group">
          <img
            src={project.image}
            alt={`${project.title} detailed visual`}
            className="w-full max-h-[480px] object-contain object-center mx-auto"
          />
        </div>

        {/* If secondary image exists (e.g. architecture diagram) */}
        {project.secondaryImage && (
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400">
              System Architecture & Entity Flow
            </h4>
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
              <img
                src={project.secondaryImage}
                alt={`${project.title} architecture diagram`}
                className="w-full max-h-[380px] object-contain object-center mx-auto"
              />
            </div>
          </div>
        )}

        {/* Project Description */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            System Overview
          </h4>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            {project.description}
          </p>
        </div>

        {/* Key Features */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            Architectural Highlights & Capabilities
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.keyFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 p-2.5 rounded-lg bg-slate-900/50 border border-white/[0.04]">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Used */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            Technology Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-800/40"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="text-xs font-mono text-slate-500">
            Configuration: Editable in <code className="text-cyan-400">src/data/portfolioData.ts</code>
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-400 text-xs font-mono flex items-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub Repository</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectModal;
