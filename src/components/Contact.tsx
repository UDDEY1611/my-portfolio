import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Mail, Github, Linkedin, FileText, Copy, Check, Send, Sparkles, MapPin } from 'lucide-react';

interface ContactProps {
  onResumeClick: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onResumeClick }) => {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(subject.trim() || `Portfolio Inquiry from ${senderName || 'Recruiter/Collaborator'}`);
    const mailBody = encodeURIComponent(
      `Hello Uday,\n\n${message.trim() || 'I came across your portfolio and would like to discuss an opportunity.'}\n\nFrom: ${senderName || 'Anonymous'}`
    );
    window.location.href = `mailto:${PORTFOLIO_DATA.profile.email}?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#030407] overflow-hidden"
      aria-label="Contact Section"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-2">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>05 // CONTACT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            Let's Build Something Exceptional.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light max-w-xl">
            Whether you have an ambitious full-stack project, an innovative AI architecture opportunity, or want to discuss creative tech—let's talk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Links & Profile Summary */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Email Card */}
            <div className="p-6 sm:p-8 rounded-3xl glass-card border border-cyan-500/20 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Direct Inquiries
                </span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>

              <div>
                <a
                  href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                  className="text-base sm:text-lg font-mono font-medium text-white hover:text-cyan-400 transition-colors break-all"
                >
                  {PORTFOLIO_DATA.profile.email}
                </a>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-mono text-slate-300 hover:text-cyan-300 flex items-center gap-2 transition-all shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold font-sans flex items-center gap-1.5 transition-colors shadow-glow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Mail</span>
                </a>
              </div>
            </div>

            {/* Social & Profile Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl glass-card border border-white/[0.08] hover:border-cyan-400/50 flex flex-col items-center justify-center gap-2 transition-all group"
              >
                <Github className="w-5 h-5 text-slate-300 group-hover:text-cyan-400 transition-colors" />
                <span className="text-xs font-mono text-slate-300 group-hover:text-white">GitHub</span>
              </a>

              <a
                href={PORTFOLIO_DATA.profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl glass-card border border-white/[0.08] hover:border-cyan-400/50 flex flex-col items-center justify-center gap-2 transition-all group"
              >
                <Linkedin className="w-5 h-5 text-slate-300 group-hover:text-cyan-400 transition-colors" />
                <span className="text-xs font-mono text-slate-300 group-hover:text-white">LinkedIn</span>
              </a>

              <button
                onClick={onResumeClick}
                className="p-4 rounded-2xl glass-card border border-white/[0.08] hover:border-cyan-400/50 flex flex-col items-center justify-center gap-2 transition-all group"
              >
                <FileText className="w-5 h-5 text-slate-300 group-hover:text-cyan-400 transition-colors" />
                <span className="text-xs font-mono text-slate-300 group-hover:text-white">Résumé</span>
              </button>
            </div>

            {/* Location & Availability Note */}
            <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/[0.04] flex items-center gap-3 text-xs text-slate-400 font-mono">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{PORTFOLIO_DATA.profile.location} • Available for Remote & Onsite Roles</span>
            </div>

          </div>

          {/* Right Column: Direct Mail Composer Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSendEmail}
              className="p-6 sm:p-8 rounded-3xl glass-card border border-white/[0.08] shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <h3 className="text-lg font-bold text-white font-display">
                  Compose Email Dispatch
                </h3>
                <span className="text-[11px] font-mono text-cyan-400">
                  Functional Mailto Connection
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="sender-name" className="text-xs font-mono uppercase text-slate-400">
                    Your Name / Company
                  </label>
                  <input
                    id="sender-name"
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/[0.1] text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-mono uppercase text-slate-400">
                    Topic / Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Software Engineering Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/[0.1] text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-mono uppercase text-slate-400">
                  Message Details
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details about your project, timeline, tech stack, or opportunity..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/[0.1] text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm font-sans resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <p className="text-[11px] font-mono text-slate-500">
                  Direct transmission to <span className="text-cyan-400">{PORTFOLIO_DATA.profile.email}</span>
                </p>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-glow-sm hover:shadow-glow-md transition-all flex items-center gap-2"
                >
                  <span>Dispatch Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
