"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ROLES = ["validate", "raise funding", "build financials", "pitch investors", "find PMF"];

export function LandingHero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % ROLES.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-6"
      style={{ minHeight: "100svh", paddingTop: 80, paddingBottom: 80 }}
    >
      {/* Eyebrow badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="pill pill-accent mb-10"
      >
        <span className="dot-online pulse-dot" style={{ display: "inline-block" }} />
        AI Startup Operating System · 6 agents active
      </motion.div>

      {/* Main headline */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.55 }}
        style={{
          fontSize: "clamp(40px, 7vw, 88px)",
          fontWeight: 700,
          lineHeight: 1.04,
          letterSpacing: "-0.04em",
          color: "#f5f5f5",
          maxWidth: 900,
        }}
      >
        The AI team that helps
        <br />
        you{" "}
        <span
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            height: "1.1em",
            position: "relative",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={i}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              exit={{ y: "-110%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="grad-accent"
              style={{ display: "block", paddingRight: 4 }}
              aria-live="polite"
            >
              {ROLES[i]}
            </motion.span>
          </AnimatePresence>
        </span>
        .
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{ fontSize: 18, lineHeight: 1.7, color: "#a0a0a0", maxWidth: 520, marginTop: 24 }}
      >
        One platform. AI CEO, CFO, Investor, CTO, CMO and Legal — all working on your startup, in real time.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.48 }}
        style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap", justifyContent: "center" }}
      >
        <Link href="/dashboard" className="btn btn-primary" style={{ fontSize: 15, padding: "11px 24px" }}>
          Start building free
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path d="M2 7.5H13M8 2.5L13 7.5L8 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <Link href="#product" className="btn btn-secondary" style={{ fontSize: 15, padding: "11px 24px" }}>
          See how it works
        </Link>
      </motion.div>

      {/* Social proof row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 40, color: "#525252", fontSize: 13 }}
      >
        <span style={{ color: "#f59e0b" }}>★★★★★</span>
        <span>12,000+ founders</span>
        <span>₹240Cr+ raised</span>
        <span>Free to start</span>
      </motion.div>

      {/* Hero UI preview */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        style={{ marginTop: 64, width: "100%", maxWidth: 760 }}
      >
        <HeroCard />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)" }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{ width: 1, height: 36, background: "linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)" }}
        />
      </motion.div>
    </section>
  );
}

function HeroCard() {
  const [score, setScore] = useState(82);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setScore((s) => (s === 82 ? 89 : 82)), 3200);
    const t2 = setInterval(() => setActiveIdx((x) => (x + 1) % 4), 1800);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  const metrics = [
    { label: "MRR",     value: "₹4.2L",  change: "+12%",   up: true  },
    { label: "Runway",  value: "18 mo",  change: "healthy", up: true  },
    { label: "Burn",    value: "₹2.8L",  change: "-4%",    up: false },
    { label: "Score",   value: "88/100", change: "ready",   up: true  },
  ];

  const r = 33;
  const circ = 2 * Math.PI * r;

  return (
    <div
      style={{
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "#0f0f0f",
        boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05) inset",
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="dot-online pulse-dot" style={{ display: "inline-block" }} />
          <span style={{ fontSize: 12, color: "#a0a0a0", fontWeight: 500 }}>FounderAI · Command Center</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.5 }} />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 160px" }}>
        {/* Left */}
        <div style={{ padding: "22px 24px", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ fontSize: 11, color: "#525252", marginBottom: 6 }}>Good morning, Prince</p>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#f5f5f5", marginBottom: 14, lineHeight: 1.4 }}>
            Your startup improved by 4% overnight.
          </p>
          <div
            style={{
              padding: "12px 14px", borderRadius: 12, marginBottom: 16,
              background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)",
              display: "flex", gap: 8, alignItems: "flex-start",
            }}
          >
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#6366f1", flexShrink: 0, marginTop: 3 }} />
            <p style={{ fontSize: 11, color: "#a5b4fc", lineHeight: 1.5 }}>
              Increasing your Pro plan by ₹500/mo could raise investment readiness by 12%. Confidence: 92%.
            </p>
          </div>
          <button
            className="btn btn-primary"
            style={{ fontSize: 12, padding: "7px 14px", borderRadius: 10 }}
          >
            See recommendation →
          </button>
        </div>

        {/* Right — health ring */}
        <div
          style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 8, padding: "22px 0",
          }}
        >
          <p style={{ fontSize: 10, color: "#525252", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Health Score
          </p>
          <div style={{ position: "relative", width: 76, height: 76 }}>
            <svg width="76" height="76" style={{ position: "absolute", transform: "rotate(-90deg)" }}>
              <circle cx="38" cy="38" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
              <motion.circle
                cx="38" cy="38" r={r}
                fill="none" stroke="#6366f1" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={circ}
                animate={{ strokeDashoffset: circ - (score / 100) * circ }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                style={{ filter: "drop-shadow(0 0 5px rgba(99,102,241,0.6))" }}
              />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <motion.span
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: 22, fontWeight: 700, color: "#f5f5f5", lineHeight: 1 }}
              >
                {score}
              </motion.span>
              <span style={{ fontSize: 9, color: "#525252" }}>/100</span>
            </div>
          </div>
          <p style={{ fontSize: 10, color: "#525252" }}>6 agents active</p>
        </div>
      </div>

      {/* Metrics strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        {metrics.map((m, idx) => (
          <motion.div
            key={m.label}
            animate={{ background: idx === activeIdx ? "rgba(99,102,241,0.05)" : "transparent" }}
            transition={{ duration: 0.4 }}
            style={{
              padding: "12px 16px",
              borderRight: idx < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}
          >
            <p style={{ fontSize: 10, color: "#525252", marginBottom: 3 }}>{m.label}</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#f5f5f5" }}>{m.value}</p>
            <p style={{ fontSize: 10, marginTop: 2, color: m.up ? "#4ade80" : "#f87171" }}>{m.change}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
