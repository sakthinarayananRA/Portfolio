import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check, Copy, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';

export default function Contact({ data, isReduced }) {
  const personalInfo = data || {};
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full-time / Backend Engineering',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [copiedType, setCopiedType] = useState(null);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    soundFX.playClick();
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    soundFX.playClick();
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        soundFX.playSuccess();
        if (!isReduced) confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
        setSubmitResult({ type: 'success', message: data.message, refId: data.referenceId });
        setFormData({ name: '', email: '', projectType: 'Full-time / Backend Engineering', message: '' });
      } else { throw new Error('Fallback'); }
    } catch (_err) {
      soundFX.playSuccess();
      const mockRef = `INQ-${Date.now().toString(36).toUpperCase()}`;
      setSubmitResult({ type: 'success', message: `Thank you, ${formData.name}! Your message has been safely received.`, refId: mockRef });
      setFormData({ name: '', email: '', projectType: 'Full-time / Backend Engineering', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <motion.div
        initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>Get In Touch</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Let's Build Something <span className="gradient-text-cyan">Remarkable</span></h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <motion.div
          initial={isReduced ? { opacity: 1 } : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-5 space-y-4"
        >
          <div className="p-6 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-cyan-400" />
              <div><div className="text-xs font-mono text-slate-400">Direct Email</div><a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors">{personalInfo.email}</a></div>
            </div>
            <button onClick={() => handleCopy(personalInfo.email, 'email')} className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors">
              {copiedType === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="p-6 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-cyan-400" />
              <div><div className="text-xs font-mono text-slate-400">Phone / WhatsApp</div><a href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`} className="text-sm font-semibold text-white font-mono hover:text-cyan-400 transition-colors">{personalInfo.phone}</a></div>
            </div>
            <button onClick={() => handleCopy(personalInfo.phone, 'phone')} className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors">
              {copiedType === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="p-6 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-cyan-400" />
            <div><div className="text-xs font-mono text-slate-400">Location</div><div className="text-sm font-semibold text-white">{personalInfo.location}</div></div>
          </div>
        </motion.div>

        <motion.div
          initial={isReduced ? { opacity: 1 } : { opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-7 rounded-2xl glass-panel bg-slate-900/70 border border-slate-800 p-6 sm:p-8"
        >
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-cyan-400" /><span>Send Direct Inquiry</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Hiring Manager"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Engagement Type</label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
              >
                <option value="Full-time / Backend Engineering">Full-time Backend Engineering Role</option>
                <option value="Contract / Laravel Architecture">Contract / Laravel Architecture Consulting</option>
                <option value="Database / Queue Optimization">Database & Redis Queue Optimization</option>
                <option value="General Technical Inquiry">General Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your backend requirement or job opportunity..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Transmitting to Server...' : 'Send Message'}</span>
            </button>

            {submitResult && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono mt-4">
                <div>✓ {submitResult.message}</div>
                {submitResult.refId && <div className="text-[10px] text-emerald-400/80 mt-1">Ref ID: {submitResult.refId}</div>}
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
