import React, { useEffect, useRef } from 'react';

export default function Cursor3D({ isReduced }) {
  const containerRef = useRef(null);
  const laserRef = useRef(null);
  const reticleRef = useRef(null);
  const rippleRef = useRef(null);
  const targetBadgeRef = useRef(null);

  useEffect(() => {
    // Disable on touch devices or if reduced motion is requested
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch || isReduced) {
      document.body.classList.remove('cursor-3d-active');
      return;
    }

    document.body.classList.add('cursor-3d-active');

    const container = containerRef.current;
    const laser = laserRef.current;
    const reticle = reticleRef.current;
    const ripple = rippleRef.current;
    const targetBadge = targetBadgeRef.current;
    if (!container || !laser || !reticle) return;

    let mouseX = -100;
    let mouseY = -100;
    let prevX = -100;
    let prevY = -100;
    let reticleX = -100;
    let reticleY = -100;
    let tiltX = 0;
    let tiltY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let isVisible = false;
    let isHovered = false;
    let isClicking = false;
    let animId = null;

    const onMouseMove = (e) => {
      const vx = e.clientX - (prevX === -100 ? e.clientX : prevX);
      const vy = e.clientY - (prevY === -100 ? e.clientY : prevY);
      prevX = e.clientX;
      prevY = e.clientY;

      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        reticleX = mouseX;
        reticleY = mouseY;
        container.style.opacity = '1';
      }

      // Dynamic 3D tilt based on cursor velocity
      targetTiltX = Math.max(-28, Math.min(28, vy * 1.2));
      targetTiltY = Math.max(-28, Math.min(28, -vx * 1.2));
    };

    const onMouseDown = () => {
      isClicking = true;
      if (ripple) {
        ripple.style.transition = 'none';
        ripple.style.transform = 'translate(-50%, -50%) scale(0.5)';
        ripple.style.opacity = '0.9';
        // Trigger reflow for clean re-triggering of CSS transition
        void ripple.offsetWidth;
        ripple.style.transition = 'transform 0.4s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 0.4s ease-out';
        ripple.style.transform = 'translate(-50%, -50%) scale(2.2)';
        ripple.style.opacity = '0';
      }
    };

    const onMouseUp = () => {
      isClicking = false;
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const inputEl = target.closest('input[type="text"], input[type="email"], textarea');
      if (inputEl) {
        reticle.style.opacity = '0.15';
        laser.style.opacity = '0.25';
        if (targetBadge) targetBadge.style.opacity = '0';
        return;
      } else {
        reticle.style.opacity = '1';
        laser.style.opacity = '1';
      }

      const interactive = target.closest(
        'a, button, [role="button"], input[type="submit"], input[type="button"], select, .cursor-pointer'
      );
      isHovered = Boolean(interactive);

      if (targetBadge) {
        targetBadge.style.opacity = isHovered ? '1' : '0';
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      container.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      container.style.opacity = '1';
    };

    // 60-144 FPS Hardware-Accelerated Animation Loop
    const render = () => {
      if (isVisible) {
        // Laser dot tracks mouse position instantaneously (0ms latency)
        const laserScale = isClicking ? 0.6 : isHovered ? 1.35 : 1;
        laser.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${laserScale})`;

        // HUD Reticle smooth physics tracking with responsive lerp
        const lerpFactor = isHovered ? 0.28 : 0.2;
        reticleX += (mouseX - reticleX) * lerpFactor;
        reticleY += (mouseY - reticleY) * lerpFactor;

        // Smooth 3D tilt interpolation
        tiltX += (targetTiltX - tiltX) * 0.12;
        tiltY += (targetTiltY - tiltY) * 0.12;
        targetTiltX *= 0.9;
        targetTiltY *= 0.9;

        const reticleScale = isClicking ? 0.85 : isHovered ? 1.45 : 1;
        reticle.style.transform = `translate3d(${reticleX}px, ${reticleY}px, 0) translate(-50%, -50%) perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${reticleScale})`;

        if (ripple) {
          ripple.style.left = `${mouseX}px`;
          ripple.style.top = `${mouseY}px`;
        }
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    animId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('cursor-3d-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isReduced]);

  if (isReduced) return null;

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[999999] opacity-0 transition-opacity duration-300">
      {/* Click Shockwave Ripple Pulse */}
      <div
        ref={rippleRef}
        className="pointer-events-none fixed w-12 h-12 rounded-full border border-cyan-400 opacity-0 will-change-transform shadow-[0_0_15px_rgba(6,182,212,0.6)]"
      />

      {/* Cyberpunk HUD Reticle */}
      <div
        ref={reticleRef}
        className="pointer-events-none fixed top-0 left-0 w-9 h-9 will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Outer Circular Ring with subtle glow */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all duration-200" />

        {/* Crosshair Ticks (12, 3, 6, 9 o'clock) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-cyan-400/80 rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-cyan-400/80 rounded-full" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-0.5 bg-cyan-400/80 rounded-full" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-0.5 bg-cyan-400/80 rounded-full" />

        {/* 4 Tactical Corner Brackets: [ ] */}
        <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400 transition-transform duration-200 shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400 transition-transform duration-200 shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
        <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400 transition-transform duration-200 shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400 transition-transform duration-200 shadow-[0_0_6px_rgba(34,211,238,0.6)]" />

        {/* Target Lock Hologram Badge (Appears when hovering buttons/links) */}
        <div
          ref={targetBadgeRef}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-200 px-1 py-0.2 rounded bg-cyan-950/90 border border-cyan-500/60 text-[8px] font-mono font-bold text-cyan-300 tracking-wider shadow-[0_0_8px_rgba(6,182,212,0.4)] whitespace-nowrap"
        >
          LOCK
        </div>
      </div>

      {/* High-Precision Center Laser Dot (Instantaneous 0ms tracking) */}
      <div
        ref={laserRef}
        className="pointer-events-none fixed top-0 left-0 w-2 h-2 rounded-full will-change-transform shadow-[0_0_8px_#22d3ee,0_0_16px_rgba(6,182,212,0.8)]"
        style={{
          background: '#22d3ee',
          transformStyle: 'preserve-3d',
        }}
      />
    </div>
  );
}
