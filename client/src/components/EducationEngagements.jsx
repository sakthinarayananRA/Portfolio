import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

export default function EducationEngagements({ data, isReduced }) {
  const eduData = data?.education || {};
  const engagementsData = data?.technicalEngagements || [];

  return (
    <section id="credentials" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <motion.div
        initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Academic & Community Leadership</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Education & <span className="gradient-text-cyan">Technical Engagements</span></h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div
          initial={isReduced ? { opacity: 1 } : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-4 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-mono uppercase text-cyan-400 px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/40">Higher Education</span>
            <h3 className="text-xl font-bold text-white mt-4">{eduData.degree}</h3>
            <div className="text-cyan-400 font-semibold text-base mt-2">{eduData.institution}</div>
            <div className="text-slate-400 text-xs font-mono mt-1">{eduData.location}</div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between"><span className="text-slate-400">Score:</span><span className="text-emerald-400 font-bold bg-emerald-950/50 px-2 py-0.5 rounded">{eduData.score ? (eduData.score.includes("%") ? eduData.score : `Score: ${eduData.score}`) : "75%"}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-400">Period:</span><span className="text-slate-200">{eduData.period}</span></div>
          </div>
        </motion.div>

        <motion.div
          initial={isReduced ? { opacity: 1 } : { opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-8 space-y-4"
        >
          {engagementsData.map((item) => (
            <div key={item.id} className="p-6 rounded-2xl glass-panel bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-all duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h4 className="text-base sm:text-lg font-bold text-white">{item.title}</h4>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-800/30 w-fit">{item.badge}</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.focusAreas.map((area, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-950 border border-slate-800/90 text-slate-400">{area}</span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
