"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, MessageSquare, ArrowRight } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "AI Agents", href: "#agents" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Changelog", href: "/changelog" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Blog", href: "/blog" },
    { label: "API Reference", href: "/api" },
    { label: "Startup Guide", href: "/guide" },
    { label: "Case Studies", href: "/cases" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Partners", href: "/partners" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Security", href: "/security" },
  ],
};

const socials = [
  { label: "X / Twitter", href: "#", symbol: "𝕏" },
  { label: "GitHub", href: "#", symbol: "GH" },
  { label: "LinkedIn", href: "#", symbol: "in" },
  { label: "Discord", href: "#", symbol: "DS" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="FounderAI home">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#7C3AED] flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                Founder<span className="gradient-text-blue">AI</span>
              </span>
            </Link>
            <p className="text-[#737373] text-sm leading-relaxed mb-6 max-w-xs">
              The AI Operating System for startups. Validate, build, fund, and
              scale — with an AI executive team by your side.
            </p>

            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-[999px] px-4 py-2 text-sm text-white placeholder:text-[#737373] focus:outline-none focus:border-[#4F8CFF]/50 transition-colors"
                aria-label="Newsletter email"
              />
              <button
                className="w-9 h-9 rounded-full bg-[#4F8CFF] flex items-center justify-center flex-shrink-0 hover:bg-[#3a7aee] transition-colors"
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight size={14} className="text-white" />
              </button>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white text-sm font-semibold mb-4">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#737373] hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-[#737373] text-sm">
            © 2025 FounderAI. Built for founders who think big.
          </p>
          <div className="flex items-center gap-4">
            {socials.map(({ label, href, symbol }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 glass rounded-full flex items-center justify-center text-[#737373] hover:text-white hover:border-white/20 transition-all text-xs font-bold"
              >
                {symbol}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
