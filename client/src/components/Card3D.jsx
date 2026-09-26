import React, { useState, useRef } from 'react';

export default function Card3D({ children, className = '', isReduced, maxTilt = 10 }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (isReduced) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalX = (x / rect.width) * 2 - 1; // -1 to 1
    const normalY = (y / rect.height) * 2 - 1; // -1 to 1

    setTilt({
      x: -normalY * maxTilt,
      y: normalX * maxTilt
    });

    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isReduced ? 'none' : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${glare.opacity > 0 ? 1.02 : 1}, ${glare.opacity > 0 ? 1.02 : 1}, 1)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.16s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* 3D Glass Glare Lighting Layer */}
      {!isReduced && (
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle 260px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.22) 0%, rgba(6, 182, 212, 0.1) 40%, transparent 80%)`,
            opacity: glare.opacity,
          }}
        />
      )}
      <div style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  );
}
