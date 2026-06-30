"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";

const stages = [
  {
    id: 0,
    label: "Idea",
    icon: "💡",
    color: "#4F8CFF",
    features: ["Idea Validation AI", "Problem-Solution Fit", "Market Size Estimator", "Early Adopter Finder"],
  },
  {
    id: 1,
    label: "Validation",
    icon: "✅",
    color: "#7C3AED",
    features: ["Customer Interview Coach", "Survey Generator", "PMF Score", "Competitor Mapping"],
  },
  {
    id: 2,
    label: "Research",
    icon: "🔍",
    color: "#10B981",
    features: ["TAM/SAM/SOM Analysis", "Industry Report", "Trend Analysis", "Customer Personas"],
  },
  {
    id: 3,
    label: "Financial Planning",
    icon: "📊",
    color: "#F59E0B",
    features: ["Revenue Projections", "Burn Rate Analysis", "Cash Flow Model", "Break-even Calculator"],
  },
  {
    id: 4,
    label: "Investor Ready",
    icon: "🎯",
    color: "#4F8CFF",
    features: ["Pitch Deck Generator", "Valuation Engine", "Due Diligence Pack", "Investment Readiness Score"],
  },
  {
    id: 5,
    label: "Funding",
    icon: "💰",
    color: "#7C3AED",
    features: ["Investor Simulator", "Grant Finder", "Pitch Practice AI", "Term Sheet Analyzer"],
  },
  {
    id: 6,
    label: "Growth",
    icon: "🚀",
    color: "#10B981",
    features: ["GTM Strategy", "KPI Dashboard", "Growth Hacking AI", "Retention Analysis"],
  },
  {
    id: 7,
    label: "Scale",
    icon: "🌍",
    color: "#F59E0B",
    features: ["International Expansion", "Hiring Plan", "M&A Analysis", "IPO Readiness"],
  },
];

export function StartupJourney() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 relative" aria-labelledby="journey-heading">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#4F8CFF] text-sm font-semibold uppercase tracking-widest mb-4">
            Your Complete Journey
          </p>
          <h2 id="journey-heading" className="text-[clamp(36px,5vw,64px)] font-bold text-white leading-tight">
            From Idea to Scale —<br />
            <span className="gradient-text">AI Guides Every Step</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-12">
          <div className="hidden md:flex items-center justify-between relative">
            {/* Line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-white/10" />
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-[#4F8CFF] to-[#7C3AED]"
              initial={{ width: "0%" }}
              whileInView={{ width: `${(active / (stages.length - 1)) * 100}%` }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {stages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => setActive(stage.id)}
                className="relative z-10 flex flex-col items-center gap-2 group focus-visible:outline-none"
                aria-pressed={active === stage.id}
                aria-label={`Stage: ${stage.label}`}
              >
                <motion.div
                  animate={{
                    scale: active === stage.id ? 1.2 : 1,
                    backgroundColor:
                      active >= stage.id ? stage.color : "rgba(255,255,255,0.1)",
                    boxShadow:
                      active === stage.id
                        ? `0 0 20px ${stage.color}60`
                        : "none",
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all cursor-pointer"
                >
                  {stage.icon}
                </motion.div>
                <span
                  className={`text-xs font-medium transition-colors ${
                    active >= stage.id ? "text-white" : "text-[#737373]"
                  }`}
                >
                  {stage.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active stage features */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <GlassCard hover={false} className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: `${stages[active].color}20` }}
              >
                {stages[active].icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Stage {active + 1}: {stages[active].label}
                </h3>
                <p className="text-[#737373] text-sm">
                  AI features unlocked at this stage
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stages[active].features.map((feat, i) => (
                <motion.div
                  key={feat}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-2.5 text-sm text-[#B4B4B4]"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: stages[active].color }}
                  />
                  {feat}
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
