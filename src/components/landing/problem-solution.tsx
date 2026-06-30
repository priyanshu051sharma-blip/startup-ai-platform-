"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const problems = [
  "No experienced mentor or advisor",
  "Bad or inaccurate valuation",
  "Weak, unpolished investor pitch",
  "Poor financial planning & modeling",
  "No market research or validation",
  "Wrong customer targeting",
  "No competitor analysis",
  "Startup failure without warning",
];

const solutions = [
  "AI Mentor — always available, expert-level",
  "AI Valuation Engine with 6+ methods",
  "AI Pitch Coach & Investor Simulator",
  "AI CFO with full financial modeling",
  "AI Market Analyst — TAM/SAM/SOM + trends",
  "AI Customer Persona Generator",
  "Real-time competitor intelligence",
  "Startup Health Score — monitored 24/7",
];

export function ProblemSolution() {
  return (
    <section className="py-24 relative" aria-labelledby="problem-solution-heading">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#EF4444] text-sm font-semibold uppercase tracking-widest mb-4">
            The Problem
          </p>
          <h2 id="problem-solution-heading" className="text-[clamp(32px,4vw,56px)] font-bold text-white leading-tight">
            90% of Startups Fail.
            <br />
            <span className="gradient-text">FounderAI Changes That.</span>
          </h2>
          <p className="text-[#B4B4B4] text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            Professional consultants charge $500/hr. Expert advisors are hard to reach.
            FounderAI gives every founder access to an entire executive team — for a
            fraction of the cost.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-[24px] p-6 border border-[#EF4444]/20"
          >
            <h3 className="text-[#EF4444] font-semibold text-lg mb-5 flex items-center gap-2">
              <X size={20} className="bg-[#EF4444]/20 rounded-full p-0.5" />
              Without FounderAI
            </h3>
            <ul className="space-y-3">
              {problems.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 text-[#B4B4B4] text-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-[#EF4444]/20 flex items-center justify-center flex-shrink-0">
                    <X size={10} className="text-[#EF4444]" />
                  </div>
                  {p}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-[24px] p-6 border border-[#10B981]/20"
          >
            <h3 className="text-[#10B981] font-semibold text-lg mb-5 flex items-center gap-2">
              <Check size={20} className="bg-[#10B981]/20 rounded-full p-0.5" />
              With FounderAI
            </h3>
            <ul className="space-y-3">
              {solutions.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 text-[#B4B4B4] text-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-[#10B981]/20 flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-[#10B981]" />
                  </div>
                  {s}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
