import Card3D from './Card3D';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ArrowUpRight } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { soundFX } from '../utils/audio';

export default function Projects({ data, isReduced }) {
  const projectsList = data || [];
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filters = [
    { label: 'All Projects', value: 'ALL' },
    { label: 'B2B & Logistics', value: 'B2B COMMERCE & LOGISTICS' },
    { label: 'Event Systems', value: 'EVENT MANAGEMENT SYSTEMS' },
    { label: 'Supply Chain', value: 'RETAIL & ENTERPRISE SUPPLY CHAIN' },
    { label: 'Staffing & HR', value: 'STAFFING & HR TECH' },
  ];

  const filteredProjects = selectedFilter === 'ALL' ? projectsList : projectsList.filter(p => p.domain === selectedFilter);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <motion.div
        initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Production Systems</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Key Projects & <span className="gradient-text-cyan">Technical Implementations</span></h2>
      </motion.div>

      <motion.div
        initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap items-center justify-center gap-2 mb-12"
      >
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => { soundFX.playChirp(); setSelectedFilter(f.value); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${selectedFilter === f.value ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold' : 'glass-panel bg-slate-900/60 text-slate-400 border-slate-800'}`}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => {
          const techList = project.techStack || project.stack || [];
          return (
            <motion.div
              key={project.id}
              initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: isReduced ? 0 : index * 0.08, ease: "easeOut" }}
              className="h-full"
            >
              <Card3D isReduced={isReduced} maxTilt={12} className="h-full rounded-2xl glass-panel bg-gradient-to-b from-slate-900/85 to-[#090d18]/95 border border-slate-800/90 p-6 flex flex-col justify-between hover:border-cyan-500/50 shadow-xl group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3" style={{ transform: 'translateZ(15px)' }}>
                    <span className="text-[10px] font-mono text-cyan-400 px-2.5 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-800/40">{project.domain}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors" style={{ transform: 'translateZ(25px)' }}>
                    {project.subtitle}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3" style={{ transform: 'translateZ(15px)' }}>
                    {project.tagline}
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6" style={{ transform: 'translateZ(20px)' }}>
                    {techList.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950/80 text-slate-300 border border-slate-800/90">{tech}</span>
                    ))}
                    {techList.length > 4 && <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950/80 text-slate-500">+{techList.length - 4}</span>}
                  </div>
                  <button
                    onClick={() => { soundFX.playModalOpen(); setActiveModalProject(project); }}
                    onMouseEnter={() => soundFX.playHover()}
                    style={{ transform: 'translateZ(30px)' }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 text-xs font-mono font-semibold hover:bg-cyan-500 hover:text-slate-950 transition-all duration-200 cursor-pointer shadow-md"
                  >
                    <span>View Architecture & Metrics</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Card3D>
            </motion.div>
          );
        })}
      </div>

      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          isOpen={true}
          onClose={() => setActiveModalProject(null)}
          isReduced={isReduced}
        />
      )}
    </section>
  );
}
