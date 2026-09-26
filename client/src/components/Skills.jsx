import Card3D from './Card3D';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, Database, Server, ShieldCheck, Layout, Cpu, Bot, Workflow, ChevronDown, ChevronUp } from 'lucide-react';
import { soundFX } from '../utils/audio';

export default function Skills({ data, isReduced }) {
  const skillsData = data || {};
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


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

  const allSkills = getSkillsToDisplay();
  // Only paginate on mobile screen view; desktop/laptop shows all skills
  const displayedSkills = isMobile ? allSkills.slice(0, visibleCount) : allSkills;
  const hasMore = isMobile && visibleCount < allSkills.length;

  const handleLoadMore = () => {
    soundFX.playClick();
    setVisibleCount(prev => Math.min(prev + 6, allSkills.length));
  };

  const handleShowLess = () => {
    soundFX.playClick();
    setVisibleCount(6);
    const skillsEl = document.getElementById('skills');
    if (skillsEl) {
      const topPos = skillsEl.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <motion.div
        initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Technical Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Technical Expertise & <span className="gradient-text-cyan">Tech Stacks</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm font-mono mt-3 max-w-xl mx-auto">
          Production-hardened technical capabilities across enterprise backends, modern full-stack architectures, databases, and DevOps.
        </p>
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
              onClick={() => {
                soundFX.playChirp();
                setSelectedCategory(cat.key);
                setVisibleCount(6);
              }}
              onMouseEnter={() => soundFX.playHover()}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-semibold shadow-md shadow-blue-500/20 ring-1 ring-cyan-400/40'
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
          return (
            <motion.div
              key={`${selectedCategory}-${skill.name}`}
              initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: isReduced ? 0 : Math.min(index * 0.03, 0.3),
                ease: "easeOut"
              }}
            >
              <Card3D
                isReduced={isReduced}
                maxTilt={8}
                className="p-4 rounded-xl border border-slate-800/80 hover:border-cyan-500/50 glass-panel bg-slate-900/60 transition-all duration-200 h-full hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {skill.name}
                    </h4>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{skill.categoryName}</div>
                  </div>

                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded border text-cyan-300 bg-cyan-950/80 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.25)]">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden mt-3">
                  <div
                    style={{ width: `${skill.level}%` }}
                    className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                  />
                </div>
              </Card3D>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile-Only "Load More" / "Show Less" Controls */}
      {isMobile && hasMore && (
        <div className="flex flex-col items-center justify-center mt-8 md:hidden">
          <button
            onClick={handleLoadMore}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all cursor-pointer"
          >
            <ChevronDown className="w-4 h-4 animate-bounce" />
            <span>Load More Technologies ({allSkills.length - visibleCount} remaining)</span>
          </button>
          <span className="text-[10px] text-slate-400 font-mono mt-2">
            Showing {visibleCount} of {allSkills.length} technologies
          </span>
        </div>
      )}

      {isMobile && !hasMore && allSkills.length > 6 && (
        <div className="flex justify-center mt-8 md:hidden">
          <button
            onClick={handleShowLess}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs text-slate-300 bg-slate-900/80 border border-slate-700/80 hover:border-cyan-500/50 hover:text-white transition-all cursor-pointer"
          >
            <ChevronUp className="w-4 h-4" />
            <span>Show Less</span>
          </button>
        </div>
      )}
    </section>
  );
}
