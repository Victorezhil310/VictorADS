"use client";

import { useEffect, useRef } from 'react';

export default function ThreeDCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = [];
    const particleCount = 70;
    const maxDistance = 110;
    const focalLength = 300;

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    // Create particles in 3D coordinate space
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        z: (Math.random() - 0.5) * 400,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '#00f2fe' : '#4facfe',
      });
    }

    const rotateX = (particle, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y = particle.y * cos - particle.z * sin;
      const z = particle.z * cos + particle.y * sin;
      return { ...particle, y, z };
    };

    const rotateY = (particle, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x = particle.x * cos - particle.z * sin;
      const z = particle.z * cos + particle.x * sin;
      return { ...particle, x, z };
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left - width / 2;
      mouseY = e.clientY - rect.top - height / 2;
      targetRotationY = (mouseX / (width / 2)) * 0.5;
      targetRotationX = -(mouseY / (height / 2)) * 0.5;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Dampened rotation adjustment
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      // Base slow rotation
      const baseRotationAngle = 0.002;

      // Process, project, and store particle screens
      const projectedParticles = particles.map((p) => {
        // Rotate base
        let rotated = rotateY(p, baseRotationAngle + currentRotationY * 0.03);
        rotated = rotateX(rotated, baseRotationAngle / 2 + currentRotationX * 0.03);

        // Update coordinate back to original
        p.x = rotated.x;
        p.y = rotated.y;
        p.z = rotated.z;

        // Push forward in depth view
        const depth = rotated.z + 300;

        if (depth <= 0) return null;

        // 3D to 2D projection
        const scale = focalLength / depth;
        const screenX = width / 2 + rotated.x * scale;
        const screenY = height / 2 + rotated.y * scale;

        return {
          sx: screenX,
          sy: screenY,
          size: rotated.size * scale,
          color: rotated.color,
          depth: depth,
        };
      }).filter(p => p !== null);

      // Draw connection lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedParticles.length; i++) {
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const p1 = projectedParticles[i];
          const p2 = projectedParticles[j];

          const dx = p1.sx - p2.sx;
          const dy = p1.sy - p2.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Transparency based on distance and depth
            const alpha = (1 - dist / maxDistance) * 0.25;
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      projectedParticles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.shadowBlur = p.size * 2;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.8,
      }}
    />
  );
}
