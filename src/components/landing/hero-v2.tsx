"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const VERBS = ["Build.", "Validate.", "Raise.", "Scale."];

const HEADLINE_WORDS = ["The", "AI", "Operating", "System", "for", "Startups."];

const FLOATING_BADGES = [
  { label: "847 customers", icon: "👥", x: "8%",  y: "28%", delay: 0.9 },
  { label: "₹4.2L MRR",    icon: "📈", x: "82%", y: "22%", delay: 1.1 },
  { label: "18mo runway",  icon: "🛤️",  x: "5%",  y: "68%", delay: 1.3 },
  { label: "94 pitch score", icon: "🎯", x: "80%", y: "65%", delay: 1.0 },
  { label: "3Cr raised",   icon: "💰", x: "88%", y: "44%", delay: 1.5 },
];

export function LandingHero() {
  const [vi, setVi] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setVi((x) => (x + 1) % VERBS.length), 1800);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
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
        background: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* Pulsing gradient orb */}
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "18%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,70,229,0.08) 0%, rgba(129,140,248,0.04) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Secondary orb */}
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        style={{
          position: "absolute",
          top: "60%",
          left: "30%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,197,24,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating stat badges */}
      {FLOATING_BADGES.map((badge) => (
        <motion.div
          key={badge.label}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.7, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { delay: badge.delay, duration: 0.4 },
            scale:   { delay: badge.delay, duration: 0.4 },
            y: { delay: badge.delay + 0.5, duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            position: "absolute",
            left: badge.x,
            top: badge.y,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 14px",
            borderRadius: 999,
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            fontSize: 13,
            fontWeight: 600,
            color: "#0a0a0f",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 2,
          }}
          className="hidden lg:flex"
        >
          <span style={{ fontSize: 14 }}>{badge.icon}</span>
          {badge.label}
        </motion.div>
      ))}

      {/* Eyebrow pill */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="pill pill-accent"
        style={{ marginBottom: 40, position: "relative", zIndex: 3 }}
      >
        <span className="dot-online pulse-dot" style={{ display: "inline-block" }} />
        6 AI agents running
      </motion.div>

      {/* Headline — word-by-word stagger */}
      <div
        style={{
          fontSize: "clamp(44px, 8vw, 96px)",
          fontWeight: 800,
          lineHeight: 1.02,
          letterSpacing: "-0.05em",
          color: "#0a0a0f",
          maxWidth: 840,
          marginBottom: 0,
          position: "relative",
          zIndex: 3,
        }}
        aria-label="The AI Operating System for Startups."
      >
        {HEADLINE_WORDS.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.18 + i * 0.07, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ display: "inline-block", marginRight: "0.25em" }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* Cycling verb — big & dramatic */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          height: "clamp(56px, 9vw, 108px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          marginBottom: 32,
          position: "relative",
          zIndex: 3,
        }}
        aria-live="polite"
        aria-label={VERBS[vi]}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={vi}
            initial={{ y: "110%", opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "-110%", opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            className="grad-accent"
            style={{
              fontSize: "clamp(56px, 9vw, 108px)",
              fontWeight: 900,
              letterSpacing: "-0.05em",
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
        transition={{ delay: 0.6 }}
        style={{
          fontSize: 18,
          lineHeight: 1.7,
          color: "#52526b",
          maxWidth: 480,
          marginBottom: 48,
          position: "relative",
          zIndex: 3,
        }}
      >
        One AI team. One workspace. CEO, CFO, CTO, CMO, Investor, Legal — working on your startup in real time.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 64, position: "relative", zIndex: 3 }}
      >
        <Link href="/auth/signup" className="btn btn-primary" style={{ fontSize: 15, padding: "11px 26px" }}>
          Start building free
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7H12M7.5 2.5L12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <Link href="#product" className="btn btn-secondary" style={{ fontSize: 15, padding: "11px 26px" }}>
          See how it works
        </Link>
      </motion.div>

      {/* Social proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          color: "#9898b0",
          fontSize: 13,
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
          zIndex: 3,
        }}
      >
        <span>12,000+ founders</span>
        <span style={{ color: "rgba(0,0,0,0.15)" }}>·</span>
        <span>₹240Cr+ raised</span>
        <span style={{ color: "rgba(0,0,0,0.15)" }}>·</span>
        <span>Free to start</span>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", zIndex: 3 }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.12), transparent)",
            margin: "0 auto",
          }}
        />
      </motion.div>
    </section>
  );
}
