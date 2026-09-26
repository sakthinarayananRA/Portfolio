import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MapPin, Mail, Phone } from 'lucide-react';
import { soundFX } from '../utils/audio';

export default function Hero({ data, terminalStats, onOpenResume, isReduced }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const info = data || {};
  const stats = terminalStats || info.terminalStats || {};

  // 100% Dynamic: Prioritize info.metrics directly from /api/portfolio (data.personalInfo.metrics)
  const metricsList = (Array.isArray(info?.metrics) && info.metrics.length > 0)
    ? info.metrics
    : (Array.isArray(stats?.metrics) && stats.metrics.length > 0)
      ? stats.metrics
      : [
          { label: 'Years Experience', value: '3.7+', suffix: 'Years', subtext: 'Active Contributor', color: 'emerald' },
          { label: 'Core Technologies', value: '24+', suffix: 'Mastered', subtext: 'Verified Proficient', color: 'cyan' }
        ];

  const handleMouseMove = (e) => {
    if (isReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 16, y: -y * 16 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <motion.div initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-7 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-[11px] sm:text-xs font-mono w-fit max-w-full shadow-md">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="truncate">{info.role || "Software Developer"} • {info.experienceYears || "3.7 Years Experience"}</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Architecting <span className="gradient-text-cyan">High-Throughput</span> Backend Systems
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 font-medium">
              Hi, I'm <span className="text-cyan-400 font-semibold">{info.name}</span>.
            </p>
          </div>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            {info.tagline || (
              <>
                Specializing in high-throughput backend systems and modern full-stack architectures across <span className="text-slate-200 font-medium">PHP (Laravel)</span>, <span className="text-slate-200 font-medium">Python (FastAPI, Django, Flask)</span>, and the <span className="text-slate-200 font-medium">MERN stack</span> (MongoDB, Express, React, Node.js).
              </>
            )}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-800">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{info.location}</span>
            </div>
            <a href={`mailto:${info.email}`} onMouseEnter={() => soundFX.playHover()} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{info.email}</span>
            </a>
            <a href={`tel:${(info.phone || '').replace(/[^0-9+]/g, '')}`} onMouseEnter={() => soundFX.playHover()} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{info.phone}</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a href="#projects" onClick={() => soundFX.playClick()} onMouseEnter={() => soundFX.playHover()} className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-sm shadow-lg transition-all">
              <span>View Key Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button onClick={() => { soundFX.playModalOpen(); onOpenResume(); }} onMouseEnter={() => soundFX.playHover()} className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl glass-panel bg-slate-900/80 hover:bg-slate-800/80 border-slate-700/80 text-slate-200 font-semibold text-sm transition-all">
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Resume</span>
            </button>
            <a href="#contact" onClick={() => soundFX.playClick()} onMouseEnter={() => soundFX.playHover()} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-800/90 bg-slate-900/40 text-slate-300 text-sm font-medium hover:text-cyan-300 hover:border-cyan-500/40 transition-all">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Get In Touch</span>
            </a>
          </div>
        </motion.div>

        <motion.div initial={isReduced ? { opacity: 1 } : { opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="lg:col-span-5 flex justify-center perspective-[1400px] relative">
          {/* 3D Rotating Ambient Gyroscope Rings */}
          {!isReduced && (
            <>
              <div className="absolute -inset-6 sm:-inset-10 rounded-full border border-cyan-500/25 animate-orbit-ring pointer-events-none" style={{ transformStyle: 'preserve-3d' }} />
              <div className="absolute -inset-10 sm:-inset-14 rounded-full border border-blue-500/20 animate-orbit-ring-reverse pointer-events-none" style={{ transformStyle: 'preserve-3d' }} />
            </>
          )}

          {/* Floating 3D Telemetry Chip Top-Right */}
          {!isReduced && (
            <div
              className="hidden sm:flex absolute -top-4 -right-4 z-30 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/50 text-[10px] font-mono text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] items-center gap-1.5 animate-float-3d pointer-events-none"
              style={{ transform: 'translate3d(0, 0, 45px)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>{stats?.telemetry?.topRight?.badge || 'AI'}</span>
            </div>
          )}

          {/* Floating 3D Telemetry Chip Bottom-Left */}
          {!isReduced && (
            <div
              className="hidden sm:flex absolute -bottom-4 -left-4 z-30 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-emerald-500/50 text-[10px] font-mono text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.25)] items-center gap-1.5 animate-float-3d pointer-events-none"
              style={{ transform: 'translate3d(0, 0, 50px)', animationDelay: '-3s' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{stats?.telemetry?.bottomLeft?.label || 'PSR-12 ARCHITECTURE'}</span>
            </div>
          )}

          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: isReduced ? 'none' : `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateZ(20px)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.16s ease-out'
            }}
            className="w-full max-w-md rounded-2xl glass-panel bg-gradient-to-b from-slate-900/90 to-[#090d18]/95 border-cyan-500/30 p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)] relative group overflow-hidden"
          >
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-slate-400 font-medium">
                  {stats?.scriptName || `${(info.name || 'developer').split(' ')[0].toLowerCase()}_runtime_stats.sh`}
                </span>
              </div>
              <div className="font-mono text-[11px] text-cyan-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>{stats?.status || 'ONLINE'}</span>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {/* Dynamic Tech Stack Badges */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/90">
                <div className="text-slate-500">{stats?.headline || '// Polyglot & Full-Stack Core'}</div>
                <div className="text-slate-200 mt-1 flex flex-wrap gap-1.5">
                  {(stats?.stackBadges || [
                    { name: 'PHP / Laravel', bgClass: 'bg-cyan-950/60', textClass: 'text-cyan-300', borderClass: 'border-cyan-800/40' },
                    { name: 'Python (FastAPI / Django / Flask)', bgClass: 'bg-amber-950/60', textClass: 'text-amber-300', borderClass: 'border-amber-800/40' },
                    { name: 'MERN Stack', bgClass: 'bg-emerald-950/60', textClass: 'text-emerald-300', borderClass: 'border-emerald-800/40' },
                    { name: 'Redis & Queues', bgClass: 'bg-purple-950/60', textClass: 'text-purple-300', borderClass: 'border-purple-800/40' }
                  ]).map((badge, idx) => (
                    <span 
                      key={idx} 
                      className={`px-2 py-0.5 rounded border ${badge.bgClass || 'bg-slate-900'} ${badge.textClass || 'text-cyan-300'} ${badge.borderClass || 'border-slate-800'}`}
                    >
                      {badge.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dynamic Metrics Grid directly from /api/portfolio personalInfo.metrics */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {metricsList.map((metric, idx) => {
                  const isEmerald = metric.color ? metric.color === 'emerald' : idx % 2 === 0;
                  const unitText = metric.suffix || metric.unit || '';
                  const subText = metric.subtext || (unitText ? `Verified ${unitText}` : 'Active Contributor');

                  return (
                    <div key={idx} className="p-2.5 sm:p-3 rounded-xl bg-slate-950/70 border border-slate-800/90">
                      <div className="text-slate-500 text-[10px] uppercase tracking-wider truncate" title={metric.label}>
                        {metric.label}
                      </div>
                      <div className={`text-base sm:text-lg font-bold mt-0.5 ${isEmerald ? 'text-white' : 'text-cyan-400'}`}>
                        {metric.value} {unitText && <span className="text-xs font-normal text-slate-400">{unitText}</span>}
                      </div>
                      <div className={`text-[10px] mt-0.5 sm:mt-1 truncate ${isEmerald ? 'text-emerald-400' : 'text-cyan-300'}`}>
                        ● {subText}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Benchmarks / Progress Bars */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-2">
                {(stats?.benchmarks || [
                  { label: 'PSR Standards & SOLID Compliance', percentage: 95, gradientClass: 'from-cyan-500 to-blue-500' },
                  { label: 'Query & Redis Queue Optimization', percentage: 92, gradientClass: 'from-cyan-500 to-emerald-400' }
                ]).map((bench, idx) => (
                  <div key={idx} className={idx > 0 ? "pt-1" : ""}>
                    <div className="flex justify-between items-center text-slate-400 text-[11px] mb-1">
                      <span>{bench.label}</span>
                      <span className="text-cyan-400 font-bold">{bench.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${bench.percentage}%` }}
                        className={`bg-gradient-to-r ${bench.gradientClass || 'from-cyan-500 to-blue-500'} h-full rounded-full transition-all duration-500`} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
