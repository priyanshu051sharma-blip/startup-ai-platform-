"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopBar } from "@/components/dashboard/top-bar";
import { getUser } from "@/lib/auth";

/* Animated canvas background — moving grid + particles */
function AnimatedBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particles (soft, low-opacity for light background)
    const PARTICLE_COUNT = 60;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.8 + 0.2,
      alpha: Math.random() * 0.02 + 0.03, // 0.03 - 0.05
    }));

    const draw = () => {
      t += 0.004;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // ── 1. Subtle animated grid ──
      const GRID = 80;
      const offset = (t * 12) % GRID; // scrolling grid
      // subtle grid lines for light theme
      ctx.strokeStyle = "rgba(0,0,0,0.03)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = -GRID + (offset % GRID); x < W + GRID; x += GRID) {
        ctx.moveTo(x, 0); ctx.lineTo(x, H);
      }
      for (let y = -GRID + (offset % GRID); y < H + GRID; y += GRID) {
        ctx.moveTo(0, y); ctx.lineTo(W, y);
      }
      ctx.stroke();

      // ── 2. Diagonal scan lines (Nike diagonal energy) ──
      ctx.strokeStyle = "rgba(0,0,0,0.02)";
      ctx.lineWidth = 1;
      const DIAG = 160;
      const diagOffset = (t * 20) % DIAG;
      ctx.beginPath();
      for (let d = -H + diagOffset; d < W + H; d += DIAG) {
        ctx.moveTo(d, 0);
        ctx.lineTo(d + H, H);
      }
      ctx.stroke();

      // ── 3. Moving particles + connection lines ──
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // Draw particle (very soft charcoal)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${p.alpha})`;
        ctx.fill();
      });

      // Connection lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.03;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // ── 4. Pulsing rings (4 anchor points) ──
      const rings = [
        { x: W * 0.15, y: H * 0.2 },
        { x: W * 0.85, y: H * 0.7 },
        { x: W * 0.6,  y: H * 0.15 },
        { x: W * 0.35, y: H * 0.85 },
      ];
      rings.forEach((ring, ri) => {
        const phase = t + ri * 1.1;
        for (let s = 0; s < 3; s++) {
          const radius = 40 + s * 55 + ((phase * 18) % 60);
          const alpha = Math.max(0, 0.05 - radius / 2000);
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        opacity: 1,
      }}
    />
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [theme] = useState(() => {
    if (typeof window === "undefined") return "light";
    try {
      const stored = localStorage.getItem("founderai_theme");
      if (stored === "dark" || stored === "light") return stored;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    const user = getUser();
    if (!user) { router.push("/auth/signup"); return; }
    if (!user.onboarded) { router.push("/onboarding"); }
  }, [router]);

  return (
    <div data-theme={theme} style={{ display: "flex", height: "100svh", overflow: "hidden", background: "var(--bg)", position: "relative" }}>
      {/* Background generated abstract gradient art (soft, increased opacity) */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.18, background: "linear-gradient(120deg, rgba(245,245,250,1) 0%, rgba(240,246,255,1) 40%, rgba(255,250,240,1) 100%)" }} />
      {/* Canvas animated background (particles on top of art) */}
      <AnimatedBg />

      {/* UI layer */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", width: "100%", height: "100%" }}>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          <TopBar />
          <main
            className="scrollbar-none"
            style={{ flex: 1, overflowY: "auto", background: "transparent" }}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
