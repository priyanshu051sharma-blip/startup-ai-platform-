"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Founder, MedAI",
    startup: "Healthcare AI startup",
    funding: "Raised ₹1.5 Cr Seed",
    avatar: "PS",
    color: "#4F8CFF",
    quote:
      "FounderAI gave me an entire team in one platform. The investor simulator prepared me so well that my first real pitch went almost exactly like the practice sessions.",
  },
  {
    name: "Rahul Mehta",
    role: "CEO, FinStack",
    startup: "FinTech SaaS",
    funding: "Raised ₹3 Cr Series A",
    avatar: "RM",
    color: "#10B981",
    quote:
      "The financial modeling engine saved us weeks of spreadsheet work. We walked into investor meetings with McKinsey-quality reports generated in hours.",
  },
  {
    name: "Ananya Singh",
    role: "Student Founder, EduBot",
    startup: "EdTech AI",
    funding: "Accepted into accelerator",
    avatar: "AS",
    color: "#7C3AED",
    quote:
      "As a student with no business background, FounderAI was literally like having a co-founder who had done 10 startups. The AI CEO and CFO agents are incredible.",
  },
  {
    name: "Vikram Nair",
    role: "Founder, AgriSense",
    startup: "AgriTech Platform",
    funding: "Government Grant ₹50L",
    avatar: "VN",
    color: "#F59E0B",
    quote:
      "The grant finder alone paid for years of subscription. Found 3 government schemes I didn't know existed, and the AI helped me write the entire application.",
  },
  {
    name: "Deepa Krishna",
    role: "Co-Founder, LogiAI",
    startup: "Logistics AI",
    funding: "Angel round ₹80L",
    avatar: "DK",
    color: "#EF4444",
    quote:
      "The competitor analysis is frighteningly accurate. It found competitors we didn't even know existed and helped us position ourselves to avoid direct conflict.",
  },
  {
    name: "Arjun Patel",
    role: "Founder, CleanBuild",
    startup: "CleanTech SaaS",
    funding: "Pre-seed closed",
    avatar: "AP",
    color: "#10B981",
    quote:
      "The startup health score gave us a clear north star. Every week we could see our score improving and knew exactly which lever to pull next.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#F59E0B] text-sm font-semibold uppercase tracking-widest mb-4">
            Success Stories
          </p>
          <h2 id="testimonials-heading" className="text-[clamp(32px,4vw,56px)] font-bold text-white leading-tight">
            Real Founders.
            <br />
            <span className="gradient-text">Real Results.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass rounded-[24px] p-6 border border-white/[0.06] hover:border-white/10 transition-all shadow-ambient flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={12} className="fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#B4B4B4] text-sm leading-relaxed flex-1">
                {`"${t.quote}"`}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: `${t.color}20`, color: t.color }}
                >
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{t.name}</p>
                  <p className="text-[#737373] text-xs truncate">{t.role}</p>
                </div>
                <div
                  className="ml-auto text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-medium"
                  style={{ background: `${t.color}15`, color: t.color }}
                >
                  {t.funding}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
