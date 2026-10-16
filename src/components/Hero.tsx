import React, { useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ThreeHeroScene } from './ThreeHeroScene';
import { ArrowDown, Code2, Layers, Cpu, GraduationCap, Sparkles, Terminal } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const techPillsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const profileBadgeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Cinematic Entrance Master Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // 1. Status badge
      tl.from(badgesRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.9,
        delay: 0.1,
      })
      // 2. Line 1: "I Build" masked slide-up
      .from(headlineLine1Ref.current, {
        y: '120%',
        opacity: 0,
        duration: 1.1,
        ease: 'power4.out',
      }, '-=0.6')
      // 3. Line 2: "Digital Experiences." masked slide-up
      .from(headlineLine2Ref.current, {
        y: '120%',
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      }, '-=0.85')
      // 4. Subtitle
      .from(subtitleRef.current, {
        opacity: 0,
        y: 25,
        duration: 0.9,
      }, '-=0.7')
      // 5. Value Proposition
      .from(descRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, '-=0.7')
      // 6. CTA buttons
      .from(ctaRef.current, {
        opacity: 0,
        y: 25,
        duration: 0.85,
        stagger: 0.1,
      }, '-=0.6')
      // 7. Technology domain badges
      .from(techPillsRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.8,
      }, '-=0.6')
      // 8. 3D Globe Scene container scale & fade-in
      .from(visualRef.current, {
        opacity: 0,
        scale: 0.88,
        duration: 1.4,
        ease: 'power3.out',
      }, '-=1.2')
      // 9. Floating profile badge reveal
      .from(profileBadgeRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.9,
        ease: 'back.out(1.7)',
      }, '-=0.6');

      // Scroll-triggered depth parallax
      gsap.to(visualRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
        y: 80,
        scale: 0.94,
        opacity: 0.7,
      });

      gsap.to([headlineLine1Ref.current, headlineLine2Ref.current], {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -40,
        opacity: 0.6,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-cyber-grid"
      aria-label="Cinematic Hero Section"
    >
      {/* Background Volumetric Radiance */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/15 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-10 right-1/4 w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Cinematic Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 sm:space-y-8">
          
          {/* Status Badges */}
          <div ref={badgesRef} className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-[0_0_20px_rgba(0,210,255,0.2)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span>Available for Technical Roles & Internships</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 backdrop-blur-md">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              <span>B.Tech CSE • VITS Proddatur</span>
            </div>
          </div>

          {/* Main Headline with Staggered Masked Reveal */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white font-display leading-[1.05]">
              <span className="block overflow-hidden py-1">
                <span ref={headlineLine1Ref} className="inline-block">
                  I Build
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span
                  ref={headlineLine2Ref}
                  className="inline-block gradient-shimmer drop-shadow-[0_0_35px_rgba(0,210,255,0.4)]"
                >
                  Digital Experiences.
                </span>
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl md:text-2xl font-light text-slate-200 max-w-2xl leading-relaxed tracking-wide font-sans pt-2"
            >
              {PORTFOLIO_DATA.profile.subHeadline}
            </p>
          </div>

          {/* Value Proposition */}
          <p
            ref={descRef}
            className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed font-light"
          >
            Engineering software at the nexus of full-stack Java Spring Boot architecture, interactive Three.js 3D web environments, and applied AI agent systems.
          </p>

          {/* Call to Actions with Magnetic Hover */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="px-7 sm:px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(0,210,255,0.45)] hover:shadow-[0_0_45px_rgba(0,210,255,0.7)] transition-all duration-300 flex items-center gap-2 group active:scale-95"
            >
              <span>Explore My Work</span>
              <span className="group-hover:translate-x-1.5 transition-transform duration-200 font-mono">→</span>
            </a>

            <a
              href="#contact"
              className="px-7 sm:px-8 py-4 rounded-2xl bg-[#090d18]/90 hover:bg-[#10172b] text-slate-200 hover:text-white font-semibold text-sm sm:text-base tracking-wide border border-slate-700/80 hover:border-cyan-400/60 transition-all duration-300 shadow-md backdrop-blur-md active:scale-95"
            >
              Get In Touch
            </a>
          </div>

          {/* Domain Badges */}
          <div
            ref={techPillsRef}
            className="pt-4 flex flex-wrap items-center gap-5 sm:gap-6 border-t border-slate-800/80 text-xs text-slate-400 font-mono"
          >
            <div className="flex items-center gap-2 group cursor-default">
              <Code2 className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-slate-200 transition-colors">Full-Stack Development</span>
            </div>
            <div className="flex items-center gap-2 group cursor-default">
              <Cpu className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-slate-200 transition-colors">Applied AI & RAG</span>
            </div>
            <div className="flex items-center gap-2 group cursor-default">
              <Layers className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-slate-200 transition-colors">Interactive 3D Web</span>
            </div>
          </div>
        </div>

        {/* Right Column: Prominent Interactive 3D Energy Sphere & Connected Profile Badge */}
        <div
          ref={visualRef}
          className="lg:col-span-5 flex flex-col items-center justify-center relative w-full h-[460px] sm:h-[540px] lg:h-[620px]"
        >
          {/* Ethereal Glow Backplate directly centered behind the 3D sphere */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-cyan-500/25 via-blue-500/20 to-indigo-600/10 blur-[90px] animate-pulse-slow" />
          </div>

          {/* 3D Scene Canvas Container */}
          <div className="w-full h-full relative rounded-3xl overflow-hidden glass-card border border-cyan-500/30 shadow-[0_0_50px_rgba(0,210,255,0.18)]">
            <ThreeHeroScene className="w-full h-full" />
            
            {/* Connected Animated Profile Badge with Authentic Portrait */}
            <a
              ref={profileBadgeRef}
              href="#about"
              className="absolute top-4 left-4 p-2.5 rounded-2xl bg-[#060913]/90 backdrop-blur-xl border border-cyan-400/40 hover:border-cyan-300 transition-all duration-300 group flex items-center gap-3.5 shadow-[0_0_25px_rgba(0,210,255,0.25)] hover:scale-105 active:scale-95"
              title="Click to view About Uday Kumar"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.5)]">
                <img
                  src={PORTFOLIO_DATA.profile.photo}
                  alt={PORTFOLIO_DATA.profile.name}
                  className="w-full h-full object-cover object-top scale-105 group-hover:scale-115 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = PORTFOLIO_DATA.profile.photoFallback;
                  }}
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full" />
              </div>
              <div className="flex flex-col pr-3 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors font-display">
                    {PORTFOLIO_DATA.profile.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950/80 text-cyan-300 font-mono border border-cyan-500/40">
                    CSE
                  </span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                  <span>View Identity</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </a>

            {/* Micro-terminal indicator badge */}
            <div className="absolute top-4 right-4 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300 pointer-events-none">
              <Terminal className="w-3 h-3 text-cyan-400" />
              <span>THREE.JS R170</span>
            </div>
          </div>
        </div>

      </div>

      {/* Subtle Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors group cursor-pointer focus:outline-none"
        aria-label="Scroll to About section"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll To Explore</span>
        <ArrowDown className="w-4 h-4 animate-bounce group-hover:text-cyan-400 transition-colors" />
      </a>
    </section>
  );
};

export default Hero;
