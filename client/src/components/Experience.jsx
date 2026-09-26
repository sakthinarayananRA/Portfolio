import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function Experience({ data, isReduced }) {
  const experiences = data || [];
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <motion.div
        initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Professional Career</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Work <span className="gradient-text-cyan">Experience</span></h2>
      </motion.div>

      <div className="space-y-8 relative">
        <div className="hidden md:block absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-slate-800" />
        {experiences.map((exp, index) => {
          const isCurrent = exp.current;
          return (
            <motion.div
              key={exp.id}
              initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 40, x: -20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: isReduced ? 0 : index * 0.15, ease: "easeOut" }}
              className="relative md:pl-20"
            >
              <div className="hidden md:flex absolute left-5 top-8 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-400 items-center justify-center">
                <div className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-cyan-400 animate-ping-slow' : 'bg-slate-400'}`} />
              </div>
              <div className={`p-6 sm:p-8 rounded-2xl glass-panel border transition-all duration-300 ${isCurrent ? 'bg-slate-900/80 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'bg-slate-900/50 border-slate-800/80'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{exp.role}</h3>
                    <div className="text-base font-medium text-cyan-400">{exp.company}</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950/70 border border-slate-800"><Calendar className="w-3.5 h-3.5 text-cyan-400" /><span>{exp.period}</span></div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950/70 border border-slate-800"><MapPin className="w-3.5 h-3.5 text-cyan-400" /><span>{exp.location}</span></div>
                  </div>
                </div>
                <div className="py-4">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Primary Tech Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {exp.primaryStack.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-950/80 border border-slate-800 text-slate-300">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  {exp.achievements.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 p-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/40 shrink-0"><CheckCircle2 className="w-3.5 h-3.5" /></div>
                      <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
