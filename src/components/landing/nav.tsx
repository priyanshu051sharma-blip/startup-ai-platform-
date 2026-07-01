"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16"
      style={{
        background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.25s ease",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <div style={{
          width: 30, height: 30, borderRadius: 9,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 16px rgba(99,102,241,0.4)",
        }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 6.5H11M7 2L11 6.5L7 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 15, letterSpacing: "-0.025em" }}>FounderAI</span>
      </Link>

      <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <Link href="#product" className="nav-text-link" style={{ fontSize: 14, fontWeight: 500 }}>
          Product
        </Link>
        <Link href="#pricing" className="nav-text-link" style={{ fontSize: 14, fontWeight: 500 }}>
          Pricing
        </Link>
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/auth/login" className="nav-text-link" style={{ fontSize: 14, fontWeight: 500 }}>
          Sign in
        </Link>
        <Link href="/auth/signup" className="btn btn-primary" style={{ fontSize: 13, padding: "8px 18px" }}>
          Start free →
        </Link>
      </div>
    </motion.header>
  );
}
