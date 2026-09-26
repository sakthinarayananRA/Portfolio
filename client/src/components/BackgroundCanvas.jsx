import React, { useEffect, useRef } from 'react';

export default function BackgroundCanvas({ isReduced }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse parallax tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX - width / 2) * 0.4;
      mouse.targetY = (e.clientY - height / 2) * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 1. 3D Stars in spatial depth
    const starCount = Math.min(Math.floor((width * height) / 12000), 110);
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 1.8,
        y: (Math.random() - 0.5) * height * 1.8,
        z: Math.random() * 900 + 100,
        speed: Math.random() * 0.8 + 0.3,
        color: i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#3b82f6' : '#93c5fd',
        baseRadius: Math.random() * 1.5 + 0.8
      });
    }

    // 2. 3D Geometric Polyhedron (Icosahedron Core)
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseVertices = [
      [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
      [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
      [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
    ];
    const polyScale = Math.min(width, height) * 0.22;
    const vertices = baseVertices.map(v => [v[0] * polyScale, v[1] * polyScale, v[2] * polyScale]);

    const edges = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const d2 = Math.pow(baseVertices[i][0] - baseVertices[j][0], 2) +
                   Math.pow(baseVertices[i][1] - baseVertices[j][1], 2) +
                   Math.pow(baseVertices[i][2] - baseVertices[j][2], 2);
        if (Math.abs(d2 - 4) < 0.1) edges.push([i, j]);
      }
    }

    let rotX = 0.2;
    let rotY = 0.3;
    let rotZ = 0.1;

    // 3D Rotation helper
    const rotate3D = (x, y, z, rx, ry, rz) => {
      const y1 = y * Math.cos(rx) - z * Math.sin(rx);
      const z1 = y * Math.sin(rx) + z * Math.cos(rx);
      const x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
      const z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
      const x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
      const y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);
      return [x3, y3, z2];
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const cx = width / 2;
      const cy = height / 2;
      const fov = 450;

      // 1. Draw 3D Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.z -= s.speed;
        if (s.z <= 10) {
          s.z = 1000;
          s.x = (Math.random() - 0.5) * width * 1.8;
          s.y = (Math.random() - 0.5) * height * 1.8;
        }

        const k = fov / s.z;
        const px = cx + (s.x - mouse.x * 0.3) * k;
        const py = cy + (s.y - mouse.y * 0.3) * k;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const depthAlpha = Math.max(0.1, Math.min(0.85, (1000 - s.z) / 800));
          const r = Math.max(0.6, s.baseRadius * k * 1.4);

          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = depthAlpha;
          ctx.fill();

          // Soft glow on closer stars
          if (s.z < 400) {
            ctx.beginPath();
            ctx.arc(px, py, r * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.globalAlpha = depthAlpha * 0.25;
            ctx.fill();
          }
        }
      }

      // 2. Draw 3D Rotating Polyhedron Core (Icosahedron)
      rotX += 0.0025 + (mouse.y * 0.00003);
      rotY += 0.004 + (mouse.x * 0.00003);
      rotZ += 0.0015;

      const projectedVertices = [];
      const polyCenterZ = 650;

      for (let i = 0; i < vertices.length; i++) {
        const [vx, vy, vz] = rotate3D(vertices[i][0], vertices[i][1], vertices[i][2], rotX, rotY, rotZ);
        const zTotal = polyCenterZ + vz;
        const k = fov / zTotal;
        const sx = cx + (vx + mouse.x * 0.25) * k;
        const sy = cy + (vy + mouse.y * 0.25) * k;
        projectedVertices.push([sx, sy, zTotal]);
      }

      // Draw Edges with depth alpha
      ctx.lineWidth = 1;
      for (let i = 0; i < edges.length; i++) {
        const [idx1, idx2] = edges[i];
        const v1 = projectedVertices[idx1];
        const v2 = projectedVertices[idx2];
        const avgZ = (v1[2] + v2[2]) / 2;
        const edgeAlpha = Math.max(0.04, Math.min(0.22, (800 - avgZ) / 600));

        ctx.beginPath();
        ctx.moveTo(v1[0], v1[1]);
        ctx.lineTo(v2[0], v2[1]);
        ctx.strokeStyle = '#06b6d4';
        ctx.globalAlpha = edgeAlpha;
        ctx.stroke();
      }

      // Draw Vertices
      for (let i = 0; i < projectedVertices.length; i++) {
        const [vx, vy, vz] = projectedVertices[i];
        const vertAlpha = Math.max(0.1, Math.min(0.5, (800 - vz) / 500));
        ctx.beginPath();
        ctx.arc(vx, vy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.globalAlpha = vertAlpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isReduced]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full opacity-60"
    />
  );
}
