import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { EducationExperience } from './components/EducationExperience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export const App: React.FC = () => {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030407] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation */}
      <Navbar onResumeClick={() => setResumeModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        <Hero />
        <About onResumeClick={() => setResumeModalOpen(true)} />
        <Projects />
        <Skills />
        <EducationExperience />
        <Contact onResumeClick={() => setResumeModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Printable Résumé Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
};

export default App;
