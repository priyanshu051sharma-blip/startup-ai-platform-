"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const VERBS = ["Build.", "Validate.", "Raise.", "Scale."];

export function LandingHero() {
  const [vi, setVi] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setVi((x) => (x + 1) % VERBS.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 24px",
        position: "relative",
      }}
    >
      {/* Subtle radial glow behind headline */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="pill pill-accent"
        style={{ marginBottom: 48 }}
      >
        <span className="dot-online pulse-dot" style={{ display: "inline-block" }} />
        6 AI agents running
      </motion.div>

      {/* Main headline */}
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{
          fontSize: "clamp(44px, 8vw, 96px)",
          fontWeight: 700,
          lineHeight: 1.02,
          letterSpacing: "-0.045em",
          color: "#f5f5f5",
          maxWidth: 840,
          marginBottom: 0,
        }}
      >
        The AI Operating System
        <br />
        for Startups.
      </motion.h1>

      {/* Cycling verb line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          height: "clamp(44px, 8vw, 96px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          marginBottom: 32,
        }}
        aria-live="polite"
        aria-label={VERBS[vi]}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={vi}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="grad-accent"
            style={{
              fontSize: "clamp(44px, 8vw, 96px)",
              fontWeight: 700,
              letterSpacing: "-0.045em",
              lineHeight: 1.02,
              display: "block",
            }}
          >
            {VERBS[vi]}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* Subline */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        style={{
          fontSize: 18,
          lineHeight: 1.7,
          color: "#888",
          maxWidth: 480,
          marginBottom: 48,
        }}
      >
        One AI team. One workspace. CEO, CFO, CTO, CMO, Investor, Legal — working on your startup in real time.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 64 }}
      >
        <Link href="/dashboard" className="btn btn-primary" style={{ fontSize: 15, padding: "11px 26px" }}>
          Start building free
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7H12M7.5 2.5L12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <Link href="#product" className="btn btn-secondary" style={{ fontSize: 15, padding: "11px 26px" }}>
          See how it works
        </Link>
      </motion.div>

      {/* Social proof — minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
          color: "#444",
          fontSize: 13,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span>12,000+ founders</span>
        <span style={{ color: "#2a2a2a" }}>·</span>
        <span>₹240Cr+ raised</span>
        <span style={{ color: "#2a2a2a" }}>·</span>
        <span>Free to start</span>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)" }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)",
            margin: "0 auto",
          }}
        />
      </motion.div>
    </section>
  );
}
