"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-14"
      style={{
        background: scrolled ? "rgba(8,8,8,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "#6366f1" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L13 7L7 13M1 7H13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-white font-semibold text-[15px] tracking-tight">FounderAI</span>
      </Link>

      {/* Links */}
      <nav className="hidden md:flex items-center gap-8" aria-label="Navigation">
        {["Product", "Pricing", "Blog"].map((l) => (
          <Link key={l} href="#" className="text-sm text-[#a0a0a0] hover:text-white transition-colors">{l}</Link>
        ))}
      </nav>

      {/* CTA */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="text-sm text-[#a0a0a0] hover:text-white transition-colors">
          Sign in
        </Link>
        <Link href="/dashboard" className="btn btn-primary text-sm" style={{ padding: "7px 16px" }}>
          Start free
        </Link>
      </div>
    </motion.header>
  );
}
