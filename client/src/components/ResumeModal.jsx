import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X, Download, Printer, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';

export default function ResumeModal({ data, isOpen, onClose, isReduced }) {
  const personalInfo = data?.personalInfo || {};
  const professionalExperience = data?.professionalExperience || [];
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

  if (!isOpen) return null;

  const handleDownload = () => {
    soundFX.playSuccess();
    if (!isReduced) confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    const link = document.createElement('a');
    link.href = '/api/resume/download';
    link.setAttribute('download', 'Sakthinarayanan_R_Software_Developer_Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <div onClick={() => { soundFX.playClick(); onClose(); }} className="fixed inset-0 bg-black/85 backdrop-blur-md" />
        <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0b0f19] border border-cyan-500/30 p-6 sm:p-10 shadow-2xl z-10">
          <div className="sticky top-0 -mt-6 -mx-6 sm:-mt-10 sm:-mx-10 px-6 py-4 bg-[#0b0f19]/95 backdrop-blur-md border-b border-slate-800 flex items-center justify-between mb-8 z-20">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span className="font-mono text-xs sm:text-sm font-semibold text-white">Curriculum Vitae</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => window.print()} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"><Printer className="w-4 h-4" /></button>
              <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs font-mono shadow-md">
                <Download className="w-4 h-4" /><span>Download PDF</span>
              </button>
              <button onClick={() => { soundFX.playClick(); onClose(); }} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400"><X className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="space-y-6 font-sans">
            <div className="border-b border-slate-800 pb-4">
              <h1 className="text-3xl font-extrabold text-white">{personalInfo.name.toUpperCase()}</h1>
              <div className="text-cyan-400 font-semibold text-lg font-mono">{personalInfo.role} | {personalInfo.experienceYears}</div>
              <div className="text-xs font-mono text-slate-400 mt-1">{personalInfo.location} • {personalInfo.phone} • {personalInfo.email}</div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase">PROFESSIONAL SUMMARY</h2>
              <p className="text-slate-300 text-sm leading-relaxed">{personalInfo.summary}</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase">EXPERIENCE</h2>
              {professionalExperience.map((exp) => (
                <div key={exp.id} className="text-xs space-y-1">
                  <div className="font-bold text-white">{exp.role} | {exp.company} ({exp.period})</div>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    {exp.achievements.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
