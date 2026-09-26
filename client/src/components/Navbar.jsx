import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, VolumeX, Zap, ZapOff, Download, Menu, X, 
  Code2, Layers, Briefcase, FolderGit2, GraduationCap, Mail, Network, Compass, Sun, Moon
} from 'lucide-react';
import { soundFX } from '../utils/audio';

export default function Navbar({ 
  developerInfo,
  activeSection, 
  isAudioMuted, 
  onToggleAudio, 
  isReduced, 
  onToggleReducedMotion, 
  onOpenResume, 
  isApiConnected,
  theme,
  onToggleTheme,
  isSystemSync
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#about', icon: Code2 },
    { name: 'Skills', href: '#skills', icon: Layers },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Projects', href: '#projects', icon: FolderGit2 },
    { name: 'Architecture', href: '#architecture', icon: Network },
    { name: 'Credentials', href: '#credentials', icon: GraduationCap },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  const handleNavClick = (e, href) => {
    if (e && e.preventDefault) e.preventDefault();
    soundFX.playClick();
    setMobileMenuOpen(false);

    const performScroll = () => {
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 85;
        const rect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetY = rect.top + scrollTop - headerOffset;

        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: isReduced ? 'auto' : 'smooth'
        });

        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', href);
        }
      }
    };

    // Trigger immediately and also post-drawer collapse for 100% mobile browser reliability
    performScroll();
    setTimeout(performScroll, 80);
    setTimeout(performScroll, 260);
  };

  return (
    <>
      {/* Mobile Dimmer Backdrop Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              soundFX.playClick();
              setMobileMenuOpen(false);
            }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-4">
        <div 
          className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
            scrolled || mobileMenuOpen
              ? 'glass-panel bg-[#090d18]/95 backdrop-blur-xl border border-cyan-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(6,182,212,0.15)] px-4 py-2.5'
              : 'bg-[#090d18]/70 backdrop-blur-md border border-slate-800/60 shadow-lg px-3 py-2'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <a 
                href="#hero" 
                onClick={(e) => handleNavClick(e, '#hero')} 
                onMouseEnter={() => soundFX.playHover()} 
                className="flex items-center gap-2.5 group cursor-pointer"
              >
                <div className="relative flex items-center">
                  {/* Outer ambient cosmic glow */}
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-cyan-400/30 blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* High-tech SR Monogram Emblem */}
                  <div className="relative px-3 py-1.5 rounded-xl bg-[#090d18] border border-cyan-500/60 group-hover:border-cyan-400 flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all duration-300">
                    <span className="font-mono text-cyan-400 text-xs font-bold opacity-70 group-hover:opacity-100 transition-opacity">&lt;</span>
                    <span className="font-mono font-black text-sm sm:text-base tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                      SR
                    </span>
                    <span className="font-mono text-cyan-400 text-xs font-bold opacity-70 group-hover:opacity-100 transition-opacity">/&gt;</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse ml-0.5 shadow-[0_0_8px_#22d3ee]" />
                  </div>
                </div>
                <div className="hidden sm:flex flex-col ml-0.5">
                  <span className="font-mono text-[9px] text-cyan-400/80 tracking-wider">
                    {(developerInfo?.role || "Software Developer").toUpperCase()}
                  </span>
                </div>
              </a>

              {/* Mobile Active Breadcrumb Badge */}
              <button
                onClick={() => {
                  soundFX.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="flex lg:hidden items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900/90 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 shadow-sm hover:border-cyan-400 transition-all cursor-pointer"
                title="Tap to view section matrix"
              >
                <Compass className="w-3 h-3 text-cyan-400" />
                <span className="text-slate-500">/</span>
                <span className="font-semibold uppercase tracking-wider text-cyan-200 truncate max-w-[80px]">
                  {activeSection || 'hero'}
                </span>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    onMouseEnter={() => soundFX.playHover()}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? 'text-cyan-400 bg-cyan-950/50 border border-cyan-800/60 shadow-sm shadow-cyan-500/10' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border text-[10px] font-mono ${isApiConnected ? 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20' : 'text-amber-400 border-amber-500/40'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isApiConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                <span>{isApiConnected ? 'REST API Live' : 'API Connecting'}</span>
              </div>

              {/* Theme Toggle (Automatic System Theme or Manual) */}
              <button
                onClick={() => {
                  soundFX.playClick();
                  if (onToggleTheme) onToggleTheme();
                }}
                title={
                  theme === 'light' 
                    ? `Theme: Light (${isSystemSync ? 'System' : 'Manual'}) - Click to toggle` 
                    : `Theme: Dark (${isSystemSync ? 'System' : 'Manual'}) - Click to toggle`
                }
                className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                  theme === 'light'
                    ? 'border-amber-400/60 bg-amber-500/15 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.2)]'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40'
                }`}
              >
                {theme === 'light' ? <Sun className="w-4 h-4 text-amber-300 animate-spin-slow" /> : <Moon className="w-4 h-4" />}
              </button>
              
              <button
                onClick={onToggleAudio}
                title={isAudioMuted ? "Unmute Sound" : "Mute Sound"}
                className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${!isAudioMuted ? 'border-cyan-500/40 bg-cyan-950/40 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'border-slate-800 bg-slate-900/60 text-slate-400'}`}
              >
                {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />}
              </button>
              
              <button
                onClick={() => { soundFX.playClick(); onToggleReducedMotion(); }}
                title={isReduced ? "Full Motion" : "Reduced Motion"}
                className={`p-2 rounded-xl border text-xs transition-colors hidden sm:block cursor-pointer ${isReduced ? 'border-amber-500/40 bg-amber-950/30 text-amber-400' : 'border-slate-800 bg-slate-900/60 text-slate-400'}`}
              >
                {isReduced ? <ZapOff className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
              </button>
              
              <button
                onClick={() => { soundFX.playModalOpen(); onOpenResume(); }}
                onMouseEnter={() => soundFX.playHover()}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md font-mono transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
              
              <button
                onClick={() => { 
                  soundFX.playClick(); 
                  setMobileMenuOpen(!mobileMenuOpen); 
                }}
                aria-label="Toggle Navigation Menu"
                className={`p-2 rounded-xl border transition-all duration-200 lg:hidden cursor-pointer ${
                  mobileMenuOpen 
                    ? 'border-cyan-500/70 bg-cyan-950/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                    : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700'
                }`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* High-Tech Mobile Navigation Drawer Panel */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                key="mobile-nav-panel"
                initial={isReduced ? { opacity: 1 } : { opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={isReduced ? { opacity: 0 } : { opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="lg:hidden mt-3.5 pt-3.5 border-t border-slate-800/80 space-y-3 overflow-hidden"
              >
                {/* Navigation Header / Breadcrumb Tracker */}
                <div className="flex items-center justify-between px-1 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-semibold tracking-wider">
                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                    <span>NAVIGATION MATRIX</span>
                  </div>
                  <button
                    onClick={(e) => handleNavClick(e, `#${activeSection || 'hero'}`)}
                    className="flex items-center gap-1 text-[10px] text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-500/50 hover:bg-cyan-900/80 transition-colors cursor-pointer"
                  >
                    <span>#{activeSection || 'overview'}</span>
                  </button>
                </div>

                {/* Grid of Cyber Navigation Link Cards */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {navLinks.map((link, idx) => {
                    const Icon = link.icon;
                    const isActive = activeSection === link.href.substring(1);
                    const isLastOdd = idx === navLinks.length - 1 && navLinks.length % 2 !== 0;

                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        onMouseEnter={() => soundFX.playHover()}
                        className={`group flex items-center gap-2.5 p-2.5 rounded-xl font-mono text-xs transition-all duration-200 border cursor-pointer ${
                          isLastOdd ? 'col-span-2' : ''
                        } ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-950/90 via-slate-900/90 to-blue-950/90 border-cyan-500/70 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)] font-bold ring-1 ring-cyan-500/40'
                            : 'bg-slate-950/80 hover:bg-slate-900/90 border-slate-800/90 hover:border-cyan-500/40 text-slate-300 hover:text-white'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                          isActive 
                            ? 'bg-cyan-500/25 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.4)]' 
                            : 'bg-slate-900 text-slate-400 group-hover:text-cyan-300 group-hover:bg-slate-800'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="truncate font-medium">{link.name}</span>
                        {isActive && (
                          <span className="ml-auto flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                          </span>
                        )}
                      </a>
                    );
                  })}
                </div>

                {/* Mobile Bottom Status Bar */}
                <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between px-1 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isApiConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                    <span className="text-[10px] text-slate-400">REST API {isApiConnected ? 'ONLINE' : 'OFFLINE'}</span>
                  </div>
                  <div className="text-[10px] text-cyan-400/90 font-semibold tracking-wider">
                    {(developerInfo?.role || "Software Developer").toUpperCase()}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
