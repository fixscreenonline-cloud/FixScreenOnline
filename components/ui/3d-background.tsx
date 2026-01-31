"use client";

import { useEffect, useRef } from "react";

export function ThreeDBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 3D Grid properties
    const gridSize = 50;
    const perspective = 500;
    let rotationX = 0;
    let rotationY = 0;

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle rotation
      rotationX += 0.001;
      rotationY += 0.0005;

      // Draw 3D grid
      ctx.strokeStyle = "rgba(139, 92, 246, 0.1)"; // violet with low opacity
      ctx.lineWidth = 1;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Vertical lines
      for (let x = -10; x <= 10; x++) {
        const points = [];

        for (let z = -10; z <= 10; z++) {
          const px = x * gridSize;
          const py = 0;
          const pz = z * gridSize;

          // Rotate
          const cosX = Math.cos(rotationX);
          const sinX = Math.sin(rotationX);
          const cosY = Math.cos(rotationY);
          const sinY = Math.sin(rotationY);

          const y1 = py * cosX - pz * sinX;
          const z1 = py * sinX + pz * cosX;
          const x1 = px * cosY - z1 * sinY;
          const z2 = px * sinY + z1 * cosY;

          // Project to 2D
          const scale = perspective / (perspective + z2);
          const x2d = centerX + x1 * scale;
          const y2d = centerY + y1 * scale;

          points.push({ x: x2d, y: y2d, z: z2 });
        }

        // Draw line
        ctx.beginPath();
        points.forEach((point, i) => {
          if (point.z > -perspective) {
            if (i === 0) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          }
        });
        ctx.stroke();
      }

      // Horizontal lines
      for (let z = -10; z <= 10; z++) {
        const points = [];

        for (let x = -10; x <= 10; x++) {
          const px = x * gridSize;
          const py = 0;
          const pz = z * gridSize;

          // Rotate
          const cosX = Math.cos(rotationX);
          const sinX = Math.sin(rotationX);
          const cosY = Math.cos(rotationY);
          const sinY = Math.sin(rotationY);

          const y1 = py * cosX - pz * sinX;
          const z1 = py * sinX + pz * cosX;
          const x1 = px * cosY - z1 * sinY;
          const z2 = px * sinY + z1 * cosY;

          // Project to 2D
          const scale = perspective / (perspective + z2);
          const x2d = centerX + x1 * scale;
          const y2d = centerY + y1 * scale;

          points.push({ x: x2d, y: y2d, z: z2 });
        }

        // Draw line
        ctx.beginPath();
        points.forEach((point, i) => {
          if (point.z > -perspective) {
            if (i === 0) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          }
        });
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

export function FloatingShapes() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Floating geometric shapes with blur */}
      <div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-3xl blur-xl animate-float"
        style={{
          transform: "rotate3d(1, 1, 0, 45deg)",
          animationDelay: "0s",
          animationDuration: "8s",
        }}
      />

      <div
        className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-lg animate-float"
        style={{
          transform: "rotate3d(1, 0, 1, 60deg)",
          animationDelay: "1s",
          animationDuration: "10s",
        }}
      />

      <div
        className="absolute bottom-32 left-1/4 w-28 h-28 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl animate-float"
        style={{
          transform: "rotate3d(0, 1, 1, 30deg)",
          animationDelay: "2s",
          animationDuration: "12s",
        }}
      />

      <div
        className="absolute top-1/2 right-10 w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-2xl blur-lg animate-float"
        style={{
          transform: "rotate3d(1, 1, 1, 45deg)",
          animationDelay: "1.5s",
          animationDuration: "9s",
        }}
      />

      <div
        className="absolute bottom-20 right-1/3 w-36 h-36 bg-gradient-to-br from-violet-500/20 to-blue-500/20 rounded-3xl blur-2xl animate-float"
        style={{
          transform: "rotate3d(1, 0, 0, 50deg)",
          animationDelay: "0.5s",
          animationDuration: "11s",
        }}
      />

      {/* Additional blurred orbs for hero section */}
      <div
        className="absolute top-1/4 left-1/3 w-48 h-48 bg-gradient-to-br from-violet-400/15 to-purple-400/15 rounded-full blur-3xl animate-float"
        style={{
          animationDelay: "0.8s",
          animationDuration: "15s",
        }}
      />

      <div
        className="absolute top-1/3 right-1/4 w-40 h-40 bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-float"
        style={{
          animationDelay: "1.2s",
          animationDuration: "13s",
        }}
      />
    </div>
  );
}
