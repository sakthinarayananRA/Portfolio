import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { soundFX } from '../utils/audio';

export default function Footer({ data, isReduced }) {
  const personalInfo = data || {};
  const scrollToTop = () => {
    soundFX.playClick();
    window.scrollTo({ top: 0, behavior: isReduced ? 'auto' : 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#06080d] py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div
        initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-mono font-bold text-slate-950">SR</div>
            <span className="font-bold text-white text-base">{personalInfo.name}</span>
          </div>
          <p className="text-slate-400 text-xs mt-2">{personalInfo.role || "Software Developer"} • {personalInfo.experienceYears || "3.7 Years Experience"}</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span>&copy; {new Date().getFullYear()} Sakthinarayanan R.</span>
          <button onClick={scrollToTop} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300">
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </footer>
  );
}
