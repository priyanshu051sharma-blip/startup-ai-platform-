"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "AI Agents", href: "#agents" },
  { label: "Pricing", href: "#pricing" },
  { label: "Demo", href: "#demo" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => setScrolled(y > 40));
    return unsub;
  }, [scrollY]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-all duration-500",
          scrolled
            ? "glass border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        )}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="FounderAI home">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#7C3AED] flex items-center justify-center shadow-[0_0_20px_rgba(79,140,255,0.4)]">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            Founder<span className="gradient-text-blue">AI</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-[#B4B4B4] hover:text-white text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" magnetic={false}>
            Sign In
          </Button>
          <Button variant="primary" size="sm">
            Start Free →
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 left-0 right-0 z-40 glass border-b border-white/5 px-6 py-6 flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[#B4B4B4] hover:text-white text-base font-medium transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <Button variant="secondary" size="md" magnetic={false}>
              Sign In
            </Button>
            <Button variant="primary" size="md" magnetic={false}>
              Start Free →
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
}
