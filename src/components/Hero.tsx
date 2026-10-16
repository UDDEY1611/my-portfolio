import React, { useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ThreeHeroScene } from './ThreeHeroScene';
import { ArrowDown, Code2, Layers, Cpu, GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(badgesRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.8,
        delay: 0.15,
      })
      .from(headlineRef.current, {
        opacity: 0,
        y: 35,
        duration: 1,
      }, '-=0.5')
      .from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, '-=0.6')
      .from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, '-=0.5')
      .from(visualRef.current, {
        opacity: 0,
        scale: 0.92,
        duration: 1.2,
      }, '-=0.8');

      // 2. Tasteful scroll-linked parallax with ScrollTrigger
      gsap.to(visualRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
        y: 60,
        opacity: 0.75,
      });

      gsap.to(headlineRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -30,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen w-full flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-cyber-grid"
      aria-label="Hero Section"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[380px] h-[380px] bg-indigo-600/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Column: Cinematic Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 sm:space-y-8">
          
          {/* Grounded Status Badge */}
          <div ref={badgesRef} className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-glow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>Open to Technical Roles & Internships</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              <span>B.Tech CSE • VITS Proddatur</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-3">
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.08]"
            >
              I Build{' '}
              <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                Digital Experiences.
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl md:text-2xl font-light text-slate-300 max-w-2xl leading-relaxed tracking-wide font-sans"
            >
              {PORTFOLIO_DATA.profile.subHeadline}
            </p>
          </div>

          {/* Grounded Value Proposition */}
          <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
            Crafting software at the crossroads of enterprise architecture, modern 3D web interfaces, and applied AI agent systems.
          </p>

          {/* Call to Actions */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-1">
            <a
              href="#projects"
              className="px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-glow-md hover:shadow-glow-lg transition-all duration-300 flex items-center gap-2 group"
            >
              <span>Explore My Work</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <a
              href="#contact"
              className="px-6 sm:px-8 py-3.5 rounded-xl bg-[#0b0f19] hover:bg-[#121828] text-slate-200 hover:text-white font-semibold text-sm sm:text-base tracking-wide border border-slate-700/80 hover:border-cyan-500/50 transition-all duration-300 shadow-sm"
            >
              Get In Touch
            </a>
          </div>

          {/* Domain Badges */}
          <div className="pt-4 flex flex-wrap items-center gap-6 border-t border-slate-800/80 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Full-Stack Development</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>Applied AI & RAG</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Interactive 3D Web</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Globe & Profile Badge */}
        <div ref={visualRef} className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[360px] sm:min-h-[460px]">
          
          {/* Globe Canvas Container */}
          <div className="w-full h-[360px] sm:h-[460px] relative rounded-3xl overflow-hidden glass-card border border-white/[0.08] shadow-2xl">
            <ThreeHeroScene className="w-full h-full" />
            
            {/* Floating portrait badge linking to About section */}
            <a
              href="#about"
              className="absolute top-4 left-4 p-2 rounded-2xl bg-[#070912]/80 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400 transition-all group flex items-center gap-3 shadow-lg"
              title="Click to view About section"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-cyan-400/60 shadow-glow-sm">
                <img
                  src={PORTFOLIO_DATA.profile.photo}
                  alt={PORTFOLIO_DATA.profile.name}
                  className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = PORTFOLIO_DATA.profile.photoFallback;
                  }}
                />
              </div>
              <div className="flex flex-col pr-2 text-left">
                <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {PORTFOLIO_DATA.profile.name}
                </span>
                <span className="text-[10px] font-mono text-cyan-400">
                  View Profile →
                </span>
              </div>
            </a>
          </div>
        </div>

      </div>

      {/* Subtle Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors group cursor-pointer focus:outline-none"
        aria-label="Scroll to About section"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll Down</span>
        <ArrowDown className="w-4 h-4 animate-bounce group-hover:text-cyan-400 transition-colors" />
      </a>
    </section>
  );
};

export default Hero;
