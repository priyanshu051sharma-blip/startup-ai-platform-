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
        background: scrolled ? "rgba(255,255,255,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.25s ease",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 6.5H11M7 2L11 6.5L7 11" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 15, letterSpacing: "-0.025em" }}>FounderAI</span>
      </Link>

      <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <Link href="#product" className="nav-text-link">Product</Link>
        <Link href="#pricing" className="nav-text-link">Pricing</Link>
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/auth/login" className="nav-text-link">Sign in</Link>
        <Link href="/auth/signup" className="btn btn-black" style={{ fontSize: 13, padding: "8px 18px" }}>
          Start free →
        </Link>
      </div>
    </motion.header>
  );
}
