"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const VERBS = ["Build.", "Validate.", "Raise.", "Scale."];

const HEADLINE_WORDS = ["The", "AI", "Operating", "System", "for", "Startups."];

const STATS = [
  { label: "847 Customers", x: "8%",  y: "28%", delay: 0.9  },
  { label: "₹4.2L MRR",    x: "81%", y: "22%", delay: 1.1  },
  { label: "18mo Runway",  x: "5%",  y: "68%", delay: 1.3  },
  { label: "94/100 Pitch", x: "79%", y: "64%", delay: 1.0  },
  { label: "₹3Cr Raised",  x: "87%", y: "44%", delay: 1.5  },
];

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let id: number;
    let t = 0;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    // Particles
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.3,
    }));

    const draw = () => {
      t += 0.005;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Grid
      const G = 90, off = (t * 15) % G;
      ctx.strokeStyle = "rgba(99,102,241,0.04)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = -G + off % G; x < W + G; x += G) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
      for (let y = -G + off % G; y < H + G; y += G) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
      ctx.stroke();

      // Diagonal lines
      ctx.strokeStyle = "rgba(139,92,246,0.025)";
      const D = 200, doff = (t * 25) % D;
      ctx.beginPath();
      for (let d = -H + doff; d < W + H; d += D) { ctx.moveTo(d, 0); ctx.lineTo(d + H, H); }
      ctx.stroke();

      // Particles + connections
      pts.forEach(p => {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(165,180,252,0.5)";
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${(1 - dist / 130) * 0.1})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }

      // Pulsing rings
      [[W * 0.15, H * 0.25], [W * 0.85, H * 0.65], [W * 0.5, H * 0.1]].forEach(([rx, ry], ri) => {
        for (let s = 0; s < 3; s++) {
          const rad = 50 + s * 70 + ((t * 20 + ri * 40) % 80);
          const a = Math.max(0, 0.07 - rad / 1200);
          ctx.beginPath();
          ctx.arc(rx, ry, rad, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(99,102,241,${a})`; ctx.lineWidth = 1; ctx.stroke();
        }
      });

      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

export function LandingHero() {
  const [vi, setVi] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setVi(x => (x + 1) % VERBS.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{
      minHeight: "100svh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center",
      padding: "100px 24px 80px",
      position: "relative",
      background: "var(--bg)",
      overflow: "hidden",
      color: "var(--text)",
    }}>
      {/* Animated canvas */}
      <HeroCanvas />

      {/* Big radial glow */}
      <div aria-hidden style={{
        position: "absolute", top: "30%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 900, height: 900, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Floating stat badges */}
      {STATS.map(s => (
        <motion.div key={s.label}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
          transition={{
            opacity: { delay: s.delay, duration: 0.4 },
            scale:   { delay: s.delay, duration: 0.4 },
            y: { delay: s.delay + 0.4, duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            position: "absolute", left: s.x, top: s.y,
            padding: "7px 14px", borderRadius: 999,
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.25)",
            backdropFilter: "blur(10px)",
            fontSize: 12, fontWeight: 700, color: "#a5b4fc",
            whiteSpace: "nowrap", pointerEvents: "none", zIndex: 2,
          }}
          className="hidden lg:flex"
        >
          {s.label}
        </motion.div>
      ))}

      {/* Eyebrow */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="pill pill-accent" style={{ marginBottom: 36, position: "relative", zIndex: 3 }}>
        <span className="dot-online pulse-dot" style={{ display: "inline-block" }} />
        6 AI Agents Running
      </motion.div>

      {/* Headline */}
      <div style={{
        fontSize: "clamp(40px, 7vw, 88px)", fontWeight: 900,
        lineHeight: 1.0, letterSpacing: "-0.05em",
        maxWidth: 880, marginBottom: 0,
        position: "relative", zIndex: 3,
      }}>
        {HEADLINE_WORDS.map((w, i) => (
          <motion.span key={i}
            initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "inline-block", marginRight: "0.22em", color: "var(--text)" }}>
            {w}
          </motion.span>
        ))}
      </div>

      {/* Cycling verb */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        style={{ height: "clamp(52px,8vw,100px)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: 28, position: "relative", zIndex: 3 }}>
        <AnimatePresence mode="wait">
          <motion.span key={vi}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grad-accent"
            style={{ fontSize: "clamp(52px,8vw,100px)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1, display: "block" }}>
            {VERBS[vi]}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* Sub */}
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
        style={{ fontSize: 17, lineHeight: 1.75, color: "var(--text-2)", maxWidth: 460, marginBottom: 44, position: "relative", zIndex: 3 }}>
        One AI team. One workspace. CEO, CFO, CTO, CMO, Investor & Legal — working on your startup 24/7.
      </motion.p>

      {/* CTAs */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
        style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 56, position: "relative", zIndex: 3 }}>
        <Link href="/auth/signup" className="btn btn-primary" style={{ fontSize: 15, padding: "13px 28px" }}>
          Start building free →
        </Link>
        <Link href="#product" className="btn btn-secondary" style={{ fontSize: 15, padding: "13px 28px" }}>
          See how it works
        </Link>
      </motion.div>

      {/* Social proof */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        style={{ display: "flex", alignItems: "center", gap: 24, color: "var(--text-3)", fontSize: 13, flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 3 }}>
        <span>12,000+ founders</span>
        <span>·</span>
        <span>₹240Cr+ raised</span>
        <span>·</span>
        <span>Free to start</span>
      </motion.div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 3 }}>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ width: 1, height: 44, background: "linear-gradient(to bottom, rgba(99,102,241,0.5), transparent)", margin: "0 auto" }} />
      </motion.div>
    </section>
  );
}
