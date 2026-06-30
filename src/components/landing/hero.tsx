"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Activity, TrendingUp, DollarSign, Target, Zap, Star, ArrowRight, Play, Brain } from "lucide-react";

const ROLES = ["Co-Founder", "CFO", "Investor", "Strategist", "Mentor", "AI Team", "Advisor"];

const METRICS = [
  { label: "Startup Health",    value: "92%",      color: "#10B981", icon: Activity   },
  { label: "Investment Score",  value: "88%",      color: "#4F8CFF", icon: TrendingUp },
  { label: "Valuation",         value: "₹3.2 Cr",  color: "#7C3AED", icon: DollarSign },
  { label: "Funding Prob.",     value: "81%",      color: "#F59E0B", icon: Target     },
];

const AGENTS = ["AI CEO", "AI CFO", "AI CTO", "AI CMO", "AI Investor", "AI Legal"];

/* ── Particle canvas ── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number; c: string; a: number };
    const PALETTE = ["#4F8CFF", "#7C3AED", "#10B981"];
    const particles: P[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: 1 + Math.random() * 2,
      c: PALETTE[Math.floor(Math.random() * 3)],
      a: Math.random(),
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        p.a = 0.4 + 0.6 * Math.sin(Date.now() * 0.001 + p.x);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + Math.floor(p.a * 80).toString(16).padStart(2, "0");
        ctx.fill();
      });
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(79,140,255,${0.06 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
}

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [metricIdx, setMetricIdx] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rX = useTransform(mouseY, [-400, 400], [10, -10]);
  const rY = useTransform(mouseX, [-400, 400], [-10, 10]);

  useEffect(() => {
    const t1 = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2000);
    const t2 = setInterval(() => setMetricIdx((i) => (i + 1) % METRICS.length), 2500);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - r.left - r.width / 2);
    mouseY.set(e.clientY - r.top - r.height / 2);
  };

  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[#050505]"
      onMouseMove={onMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      aria-label="Hero"
    >
      <ParticleField />

      {/* Radial centre glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(ellipse,rgba(79,140,255,0.06) 0%,transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

        {/* ── Left ── */}
        <div className="flex flex-col gap-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 w-fit glass rounded-full px-4 py-2"
          >
            <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#4F8CFF,#7C3AED)" }}>
              <Zap size={9} className="text-white" />
            </div>
            <span className="text-[#B4B4B4] text-[12px]">AI Startup Operating System v2.0</span>
            <span className="text-[10px] bg-[#10B981]/15 text-[#10B981] px-2 py-0.5 rounded-full font-medium">LIVE</span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <h1 className="heading-hero text-white">
              Your AI{" "}
              <span className="relative inline-block" style={{ minWidth: "4ch" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIdx}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-110%", opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="gradient-text-blue inline-block"
                    aria-live="polite"
                  >
                    {ROLES[roleIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              is Ready.
            </h1>
          </motion.div>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="body-lg max-w-lg"
          >
            Stop guessing. Validate your startup, calculate valuation, build investor-ready financials, practice your pitch — all in one AI OS.
          </motion.p>

          {/* Agents row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap gap-2"
          >
            {AGENTS.map((a, i) => (
              <motion.span
                key={a}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                style={{ background: "rgba(79,140,255,0.1)", color: "#4F8CFF", border: "1px solid rgba(79,140,255,0.2)" }}
              >
                {a}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap gap-3"
          >
            <Button variant="gradient" size="lg" className="group">
              Start Building Free
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="secondary" size="lg" className="gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                <Play size={11} fill="white" className="text-white ml-0.5" />
              </div>
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-4"
          >
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="text-[#F59E0B] fill-[#F59E0B]" style={{ marginLeft: i ? "-2px" : 0 }} />
              ))}
            </div>
            <span className="text-[#737373] text-[13px]">
              Trusted by <span className="text-white font-semibold">12,000+</span> founders
            </span>
            <span className="text-[#737373] text-[13px]">
              <span className="text-white font-semibold">₹240Cr+</span> raised
            </span>
          </motion.div>
        </div>

        {/* ── Right — Floating Dashboard ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="hidden lg:flex items-center justify-center"
          style={{ perspective: 1200 }}
        >
          <motion.div
            style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
            className="relative w-full max-w-[420px]"
          >
            {/* Main card */}
            <div
              className="rounded-[32px] p-6 relative overflow-hidden"
              style={{
                background: "linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))",
                backdropFilter: "blur(40px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 40px 120px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* Inner glow */}
              <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(79,140,255,0.1),transparent 70%)" }} />

              {/* Header */}
              <div className="flex items-center justify-between mb-5 relative">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#4F8CFF,#7C3AED)", boxShadow: "0 0 12px rgba(79,140,255,0.4)" }}>
                    <Zap size={11} className="text-white" />
                  </div>
                  <span className="text-[13px] font-semibold text-white">Command Center</span>
                </div>
                <div className="flex gap-1.5">
                  {["#EF4444", "#F59E0B", "#10B981"].map((c) => (
                    <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2.5 relative">
                {METRICS.map((m, i) => {
                  const Icon = m.icon;
                  const isActive = i === metricIdx;
                  return (
                    <motion.div
                      key={m.label}
                      animate={{ borderColor: isActive ? `${m.color}40` : "rgba(255,255,255,0.06)" }}
                      className="rounded-2xl p-3.5 relative overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.04)", border: `1px solid rgba(255,255,255,0.06)` }}
                    >
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: `radial-gradient(circle at 50% 0%,${m.color}15,transparent 70%)` }}
                        />
                      )}
                      <div className="flex items-start justify-between mb-1.5 relative">
                        <span className="text-[#737373] text-[11px]">{m.label}</span>
                        <Icon size={12} style={{ color: m.color }} />
                      </div>
                      <p className="text-xl font-bold relative" style={{ color: m.color }}>{m.value}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* AI Status bar */}
              <div className="mt-3 rounded-2xl p-3 relative" style={{ background: "rgba(79,140,255,0.06)", border: "1px solid rgba(79,140,255,0.12)" }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <Brain size={12} className="text-[#4F8CFF]" />
                  <span className="text-[11px] text-[#4F8CFF] font-medium">AI is working...</span>
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="ml-auto text-[10px] text-[#737373]"
                  >
                    6 agents active
                  </motion.div>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: ["15%", "85%", "45%", "70%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg,#4F8CFF,#7C3AED)" }}
                  />
                </div>
              </div>
            </div>

            {/* Floating badge — top right */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-8 rounded-2xl px-3.5 py-2 shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
              style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.25)", backdropFilter: "blur(20px)" }}
            >
              <div className="flex items-center gap-1.5">
                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span className="text-[11px] text-[#10B981] font-semibold">Analysis Complete</span>
              </div>
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-8 rounded-2xl px-3.5 py-2 shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
              style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", backdropFilter: "blur(20px)" }}
            >
              <div className="flex items-center gap-1.5">
                <Zap size={11} className="text-[#F59E0B]" />
                <span className="text-[11px] text-[#F59E0B] font-semibold">Pitch Score: 94/100</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-[#4F8CFF]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
