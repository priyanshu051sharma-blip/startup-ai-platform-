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
    <>
      <style>{`
        .nav-text-link { font-size: 14px; color: #888; text-decoration: none; transition: color 0.15s; }
        .nav-text-link:hover { color: #f5f5f5; }
      `}</style>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16"
        style={{
          background: scrolled ? "rgba(8,8,8,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label="FounderAI home">
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M2 6.5H11M7 2L11 6.5L7 11" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ color: "#f5f5f5", fontWeight: 600, fontSize: 15, letterSpacing: "-0.02em" }}>FounderAI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          <Link href="#product" className="nav-text-link">Product</Link>
          <Link href="#pricing" className="nav-text-link">Pricing</Link>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/dashboard" className="nav-text-link">Sign in</Link>
          <Link href="/dashboard" className="btn btn-primary" style={{ fontSize: 13, padding: "7px 16px" }}>
            Start free
          </Link>
        </div>
      </motion.header>
    </>
  );
}
