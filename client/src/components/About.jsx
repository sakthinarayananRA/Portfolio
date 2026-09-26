import Card3D from './Card3D';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Terminal, Cpu, Workflow } from 'lucide-react';
import { soundFX } from '../utils/audio';

export default function About({ data, isReduced }) {
  const info = data || {};
  const [activePillar, setActivePillar] = useState(0);

  const yearsExp = info.experienceYears ? info.experienceYears.split(' ')[0] : '3.7';
  const roleTitle = info.role || 'Software Developer';
  const expText = info.experienceYears || '3.7 Years Experience';

  const pillars = [
    { 
      title: "Backend Architecture & High-Throughput", 
      icon: Cpu, 
      subtitle: `${expText} of Enterprise Engineering`, 
      content: "Architecting scalable web applications, asynchronous workers, and high-throughput backend services capable of handling demanding transaction volumes." 
    },
    { 
      title: "Polyglot Microservices & APIs", 
      icon: Terminal, 
      subtitle: "Python (FastAPI, Django, Flask) & PHP (Laravel)", 
      content: "Engineering low-latency RESTful APIs and asynchronous microservices using FastAPI, Django REST Framework, Flask, and Laravel with Pydantic and Eloquent." 
    },
    { 
      title: "MERN & Full-Stack Systems", 
      icon: Workflow, 
      subtitle: "MongoDB, Express.js, React.js, Node.js", 
      content: "Building reactive Single-Page Applications and end-to-end full-stack solutions with React hooks, Express middlewares, and MongoDB document schemas." 
    },
    { 
      title: "Database Optimization & Cache Invalidation", 
      icon: Database, 
      subtitle: "MySQL, MongoDB & Redis Caching", 
      content: "Diagnosing performance bottlenecks by tuning complex MySQL queries, NoSQL indexing, structuring normalized schemas, and Redis cache clusters." 
    }
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <motion.div
        initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <Workflow className="w-3.5 h-3.5" />
          <span>Core Engineering DNA</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">About <span className="gradient-text-cyan">My Self</span></h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <motion.div
          initial={isReduced ? { opacity: 1 } : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-6 flex flex-col gap-6 p-6 sm:p-8 rounded-2xl glass-panel bg-slate-900/60 border-slate-800"
        >
          <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-mono font-bold">
              {yearsExp}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Professional Trajectory</h3>
              <p className="text-xs text-slate-400 font-mono">{roleTitle} • {info.location}</p>
            </div>
          </div>
          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              I am a results-driven <strong className="text-white">{roleTitle}</strong> with {info.experienceYears ? info.experienceYears.toLowerCase() : '3.7 years of experience'} engineering scalable web applications, microservices, and high-throughput backend systems.
            </p>
            <p className="text-slate-400 text-sm">
              My technical expertise spans polyglot ecosystems including <span className="text-cyan-300">PHP (Laravel, CodeIgniter)</span>, <span className="text-cyan-300">Python (FastAPI, Django, Flask)</span>, and the <span className="text-cyan-300">MERN stack</span> (MongoDB, Express, React, Node.js), backed by robust relational and NoSQL database optimization (MySQL, Redis, MongoDB).
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={isReduced ? { opacity: 1 } : { opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-6 flex flex-col gap-3"
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isSelected = activePillar === idx;
            return (
              <Card3D
                key={idx}
                isReduced={isReduced}
                maxTilt={6}
                className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 ${isSelected ? 'glass-panel bg-slate-800/80 border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.25)]' : 'glass-panel bg-slate-900/40 border-slate-800/80 hover:border-slate-700'}`}
              >
                <div onClick={() => { soundFX.playClick(); setActivePillar(idx); }} onMouseEnter={() => soundFX.playHover()}>
                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-slate-200'}`}>{pillar.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{pillar.content}</p>
                  </div>
                </div>
              </div>
              </Card3D>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
