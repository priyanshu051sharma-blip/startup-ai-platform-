"use client";

import { useEffect, useRef } from "react";
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

    // Particles
    const PARTICLE_COUNT = 60;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      t += 0.004;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // ── 1. Subtle animated grid ──
      const GRID = 80;
      const offset = (t * 12) % GRID; // scrolling grid
      ctx.strokeStyle = "rgba(255,255,255,0.025)";
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
      ctx.strokeStyle = "rgba(255,255,255,0.015)";
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

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      });

      // Connection lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
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
          const alpha = Math.max(0, 0.06 - radius / 2000);
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
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
        zIndex: 0,
        pointerEvents: "none",
        opacity: 1,
      }}
    />
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    if (!user) { router.push("/auth/signup"); return; }
    if (!user.onboarded) { router.push("/onboarding"); }
  }, [router]);

  return (
    <div data-theme="dark" style={{ display: "flex", height: "100svh", overflow: "hidden", background: "#000000", position: "relative" }}>
      {/* Canvas animated background */}
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
