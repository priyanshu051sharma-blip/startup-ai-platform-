"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  DollarSign,
  Target,
  FileText,
  Search,
  Users,
  Map,
  Gift,
  Shield,
  Mic,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Startup Analysis",
    description: "20+ modules covering SWOT, Porter's 5 Forces, PESTLE, Business Model Canvas, and more.",
    color: "#4F8CFF",
  },
  {
    icon: Target,
    title: "Investor Simulator",
    description: "Practice with AI that behaves like a real VC partner. Live scoring, feedback, and coaching.",
    color: "#7C3AED",
  },
  {
    icon: DollarSign,
    title: "Financial Engine",
    description: "Revenue forecasts, burn rate, runway, P&L, cash flow, and 12-month projections.",
    color: "#10B981",
  },
  {
    icon: Mic,
    title: "Pitch Coach",
    description: "AI analyzes your pitch for clarity, confidence, structure, and investor-readiness.",
    color: "#F59E0B",
  },
  {
    icon: TrendingUp,
    title: "Valuation Engine",
    description: "6 valuation methods including DCF, VC Method, Berkus, and Scorecard with confidence scores.",
    color: "#4F8CFF",
  },
  {
    icon: FileText,
    title: "Document Generator",
    description: "Generate pitch decks, business plans, financial reports, and legal templates instantly.",
    color: "#7C3AED",
  },
  {
    icon: Search,
    title: "RAG Knowledge Base",
    description: "AI trained on YC, Startup India, MIT, and thousands of research papers and business books.",
    color: "#10B981",
  },
  {
    icon: Users,
    title: "AI Agent System",
    description: "8 specialized AI agents — CEO, CFO, CTO, CMO, PM, Legal, Investor, Analyst.",
    color: "#F59E0B",
  },
  {
    icon: Map,
    title: "Market Intelligence",
    description: "Industry trends, competitor funding, Google Trends, and real-time market data.",
    color: "#4F8CFF",
  },
  {
    icon: Gift,
    title: "Grant Finder",
    description: "Automatically matches your startup to government grants, schemes, and accelerators.",
    color: "#7C3AED",
  },
  {
    icon: Shield,
    title: "Legal Assistant",
    description: "IP protection, compliance checks, NDA generation, and entity structure guidance.",
    color: "#10B981",
  },
  {
    icon: BarChart3,
    title: "AI KPI Dashboard",
    description: "Track MRR, ARR, CAC, LTV, churn, retention, and all your key startup metrics in one place.",
    color: "#F59E0B",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 relative" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#4F8CFF] text-sm font-semibold uppercase tracking-widest mb-4">
            Everything You Need
          </p>
          <h2 id="features-heading" className="text-[clamp(32px,4vw,56px)] font-bold text-white leading-tight">
            One Platform.
            <br />
            <span className="gradient-text">Every Startup Tool.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass rounded-[24px] p-5 border border-white/[0.06] hover:border-white/10 transition-all shadow-ambient cursor-default group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: `${feature.color}20` }}
                >
                  <Icon size={18} style={{ color: feature.color }} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#737373] text-xs leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
