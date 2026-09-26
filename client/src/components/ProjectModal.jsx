import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Zap } from 'lucide-react';
import { soundFX } from '../utils/audio';

export default function ProjectModal({ project, isOpen = true, onClose, isReduced }) {
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const techList = project.techStack || project.stack || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => { soundFX.playClick(); onClose(); }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />
        <motion.div
          initial={isReduced ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={isReduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl glass-panel bg-slate-900 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl z-10"
        >
          <button
            onClick={() => { soundFX.playClick(); onClose(); }}
            className="absolute top-5 right-5 p-2 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="space-y-2 pr-10">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">{project.domain}</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{project.subtitle}</h3>
          </div>
          <p className="mt-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-300 text-sm leading-relaxed">{project.description}</p>
          
          {project.highlights && project.highlights.length > 0 && (
            <div className="mt-6 space-y-2.5">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Key Deliverables</h4>
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          )}

          {project.architectureHighlights && project.architectureHighlights.length > 0 && (
            <div className="mt-6 space-y-2.5">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Architecture Highlights</span>
              </h4>
              {project.architectureHighlights.map((arch, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>{arch}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap gap-2">
            {techList.map((tech, i) => (
              <span key={i} className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-950 border border-slate-800 text-cyan-300">{tech}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
