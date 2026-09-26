import Card3D from './Card3D';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Database, Server, ShieldCheck, Layout, Cpu, Bot, Workflow } from 'lucide-react';
import { soundFX } from '../utils/audio';

export default function Skills({ data, isReduced }) {
  const skillsData = data || {};
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = [
    { key: 'all', label: 'All Technologies', icon: Layers },
    { key: 'backend', label: 'Backend (PHP & Python)', icon: Server },
    { key: 'mernStack', label: 'MERN & Full-Stack', icon: Cpu },
    { key: 'databases', label: 'Databases & Caching', icon: Database },
    { key: 'apiEngineering', label: 'API Engineering', icon: ShieldCheck },
    { key: 'testingQuality', label: 'Testing & Quality', icon: Bot },
    { key: 'frontendUI', label: 'Frontend & UI', icon: Layout },
    { key: 'workflowTools', label: 'Tools & AI Workflows', icon: Workflow },
  ];

  const getSkillsToDisplay = () => {
    if (selectedCategory === 'all') {
      return Object.entries(skillsData).flatMap(([, catVal]) =>
        catVal.skills.map(s => ({ ...s, categoryName: catVal.category }))
      );
    }
    const cat = skillsData[selectedCategory];
    return cat ? cat.skills.map(s => ({ ...s, categoryName: cat.category })) : [];
  };

  const displayedSkills = getSkillsToDisplay();

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <motion.div
        initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Technical Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Technical Expertise & <span className="gradient-text-cyan">Tech Stacks</span>
        </h2>
        
        {/* Blue color legend for >85% proficiency */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono mt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/50 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)] animate-pulse"></span>
            <span className="font-semibold">&gt; 85% Core Expertise (Blue Highlight)</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
            <span>&le; 85% Working Proficiency</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap items-center justify-center gap-2 mb-10"
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => { soundFX.playChirp(); setSelectedCategory(cat.key); }}
              onMouseEnter={() => soundFX.playHover()}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-semibold shadow-md shadow-blue-500/20'
                  : 'glass-panel bg-slate-900/60 text-slate-400 hover:text-slate-200 border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedSkills.map((skill, index) => {
          const isMoreThan85 = skill.level > 85;

          return (
            <motion.div
              key={skill.name}
              initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.45,
                delay: isReduced ? 0 : Math.min(index * 0.04, 0.4),
                ease: "easeOut"
              }}
            >
              <Card3D
                isReduced={isReduced}
                maxTilt={8}
                className={`p-4 rounded-xl border transition-all duration-200 h-full ${
                  isMoreThan85
                    ? 'glass-panel bg-gradient-to-br from-blue-950/50 via-slate-900/90 to-[#0a1124] border-blue-500/50 shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:border-blue-400'
                    : 'glass-panel bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                }`}
              >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className={`text-sm font-semibold ${isMoreThan85 ? 'text-white' : 'text-slate-200'}`}>
                      {skill.name}
                    </h4>
                    {isMoreThan85 && (
                      <span className="inline-flex items-center text-[10px] font-mono font-medium text-blue-300 bg-blue-500/20 border border-blue-400/40 px-1.5 py-0.2 rounded">
                        &gt;85%
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{skill.categoryName}</div>
                </div>

                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded border transition-colors ${
                    isMoreThan85
                      ? 'text-blue-300 bg-blue-950/80 border-blue-500/60 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                      : 'text-slate-400 bg-slate-900/60 border-slate-800'
                  }`}
                >
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden mt-3">
                <div
                  style={{ width: `${skill.level}%` }}
                  className={`h-full rounded-full transition-all duration-500 ${
                    isMoreThan85
                      ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 shadow-[0_0_10px_rgba(59,130,246,0.7)]'
                      : 'bg-slate-600'
                  }`}
                />
              </div>
            </Card3D>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
