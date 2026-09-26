import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Cursor3D from './components/Cursor3D';
import BackgroundCanvas from './components/BackgroundCanvas';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ArchitectureShowcase from './components/ArchitectureShowcase';
import EducationEngagements from './components/EducationEngagements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import { useReducedMotion } from './hooks/useReducedMotion';
import { soundFX } from './utils/audio';
import { fetchPortfolio } from './services/api';
import { ServerCrash, RefreshCw, Activity } from 'lucide-react';

export default function App() {
  const { isReduced, toggleReducedMotion } = useReducedMotion();
  const [isAudioMuted, setIsAudioMuted] = useState(() => soundFX.getMuted());
  const [activeSection, setActiveSection] = useState('hero');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const loadPortfolioData = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const data = await fetchPortfolio();
      if (data && data.personalInfo) {
        setPortfolioData(data);
        setApiError(null);
      } else {
        throw new Error('Received incomplete payload from Backend REST API');
      }
    } catch (err) {
      console.error('[Portfolio API Error]:', err.message);
      setPortfolioData(null);
      setApiError(err.message || 'Backend REST API is currently offline');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPortfolioData();
  }, [loadPortfolioData]);

  const handleToggleAudio = () => {
    const muted = soundFX.toggleMute();
    setIsAudioMuted(muted);
  };

  // Prevent automatic scroll down on load
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'architecture', 'credentials', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 1. Loading State Screen (Connecting directly to Express API)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080a10] text-slate-100 flex flex-col items-center justify-center p-6 font-sans relative selection:bg-cyan-500 selection:text-slate-950">
        <BackgroundCanvas isReduced={isReduced} />
        <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
          <div className="relative w-16 h-16 mb-6">
            <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 animate-ping" />
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-cyan-500/60 flex items-center justify-center text-cyan-400 font-mono font-bold text-xl shadow-[0_0_25px_rgba(6,182,212,0.3)]">
              SR
            </div>
          </div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm tracking-wider uppercase font-semibold">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>Connecting to Backend API...</span>
          </div>
          <p className="text-slate-400 text-xs font-mono mt-2">
            Fetching canonical portfolio dataset from <span className="text-slate-300">/api/portfolio</span>
          </p>
        </div>
      </div>
    );
  }

  // 2. Offline / API Down Error State (Strictly enforces backend-driven architecture)
  if (apiError || !portfolioData) {
    return (
      <div className="min-h-screen bg-[#080a10] text-slate-100 flex flex-col items-center justify-center p-6 font-sans relative selection:bg-cyan-500 selection:text-slate-950">
        <BackgroundCanvas isReduced={isReduced} />
        <div className="relative z-10 max-w-lg w-full p-8 rounded-3xl glass-panel bg-slate-900/95 border border-rose-500/40 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto mb-5 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
            <ServerCrash className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight mb-2">Backend REST API Offline</h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-mono">
            This portfolio is strictly configured to consume all data dynamically from the Express backend service (<code className="text-cyan-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">port 5000</code>). Static fallback data is disabled.
          </p>
          
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-left text-xs font-mono text-slate-400 mb-6 space-y-1.5">
            <div className="flex justify-between items-center">
              <span>Required Endpoint:</span>
              <span className="text-cyan-400 font-semibold">GET /api/portfolio</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Connection Status:</span>
              <span className="text-rose-400 font-semibold">Failed / Offline</span>
            </div>
            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
              Run: <code className="text-emerald-400">node server/server.js</code> to resume API service.
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              loadPortfolioData();
            }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Backend Connection</span>
          </button>
        </div>
      </div>
    );
  }

  // 3. Normal Live Rendering - 100% powered by Backend REST API
  return (
    <div className="min-h-screen bg-[#080a10] text-slate-100 relative selection:bg-cyan-500 selection:text-slate-950 font-sans">
      <Cursor3D isReduced={isReduced} />
      <BackgroundCanvas isReduced={isReduced} />
      <Navbar
        developerInfo={portfolioData.personalInfo}
        activeSection={activeSection}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
        isReduced={isReduced}
        onToggleReducedMotion={toggleReducedMotion}
        onOpenResume={() => setIsResumeOpen(true)}
        isApiConnected={true}
      />
      <main className="relative z-10">
        <Hero data={portfolioData.personalInfo} terminalStats={portfolioData.heroTerminalStats} onOpenResume={() => setIsResumeOpen(true)} isReduced={isReduced} />
        <About data={portfolioData.personalInfo} isReduced={isReduced} />
        <Skills data={portfolioData.technicalSkills} isReduced={isReduced} />
        <Experience data={portfolioData.professionalExperience} isReduced={isReduced} />
        <Projects data={portfolioData.keyProjects} isReduced={isReduced} />
        <ArchitectureShowcase data={portfolioData.architectureShowcase} isReduced={isReduced} />
        <EducationEngagements data={{ education: portfolioData.education, technicalEngagements: portfolioData.technicalEngagements }} isReduced={isReduced} />
        <Contact data={portfolioData.personalInfo} isReduced={isReduced} />
      </main>
      <Footer data={portfolioData.personalInfo} isReduced={isReduced} isApiConnected={true} />
      <ResumeModal data={portfolioData} isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} isReduced={isReduced} />
    </div>
  );
}
