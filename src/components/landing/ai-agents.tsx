"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const agents = [
  {
    id: "ceo",
    name: "AI CEO",
    role: "Strategic Decisions",
    avatar: "🏛️",
    color: "#4F8CFF",
    description: "Makes high-level strategic decisions, analyses business risks, recommends pivots, and keeps the startup aligned with its vision and goals.",
    capabilities: ["Strategic planning", "Risk assessment", "Decision frameworks", "Business pivots"],
  },
  {
    id: "cfo",
    name: "AI CFO",
    role: "Finance & Budgeting",
    avatar: "📊",
    color: "#10B981",
    description: "Generates revenue forecasts, manages burn rate, builds cash flow models, calculates valuations, and prepares investor-grade financial reports.",
    capabilities: ["Financial modeling", "Valuation engine", "Burn analysis", "Tax planning"],
  },
  {
    id: "investor",
    name: "AI Investor",
    role: "Pitch & Fundraising",
    avatar: "💰",
    color: "#F59E0B",
    description: "Simulates real investor Q&A, scores pitch quality, identifies weaknesses in your deck, and prepares you for actual investor meetings.",
    capabilities: ["Pitch simulation", "Deck review", "Q&A coaching", "Term sheet analysis"],
  },
  {
    id: "cto",
    name: "AI CTO",
    role: "Technology Strategy",
    avatar: "⚡",
    color: "#7C3AED",
    description: "Evaluates your tech stack, identifies scalability risks, recommends architecture decisions, and assesses technical feasibility.",
    capabilities: ["Tech stack review", "Architecture advice", "Scalability analysis", "Build vs buy"],
  },
  {
    id: "cmo",
    name: "AI CMO",
    role: "Marketing & Growth",
    avatar: "📣",
    color: "#4F8CFF",
    description: "Builds GTM strategies, identifies marketing channels, creates customer acquisition funnels, and generates content frameworks.",
    capabilities: ["GTM strategy", "Channel analysis", "Content planning", "Brand positioning"],
  },
  {
    id: "pm",
    name: "AI Product Manager",
    role: "Roadmap & Features",
    avatar: "🗺️",
    color: "#10B981",
    description: "Generates product roadmaps, prioritises features using RICE and MoSCoW, and aligns product development with business goals.",
    capabilities: ["Roadmap planning", "Feature prioritisation", "User story writing", "Sprint planning"],
  },
  {
    id: "legal",
    name: "AI Legal Advisor",
    role: "Compliance & IP",
    avatar: "⚖️",
    color: "#EF4444",
    description: "Reviews legal compliance requirements, identifies IP opportunities, generates NDA templates, and guides incorporation strategy.",
    capabilities: ["Compliance check", "Patent research", "NDA generation", "Entity structure"],
  },
  {
    id: "analyst",
    name: "AI Market Analyst",
    role: "Research & Intelligence",
    avatar: "🔍",
    color: "#F59E0B",
    description: "Deep-dives into market trends, competitor intelligence, customer behaviour patterns, and industry forecasts using RAG-powered research.",
    capabilities: ["Market sizing", "Competitor maps", "Trend analysis", "Customer research"],
  },
];

export function AiAgents() {
  const [active, setActive] = useState(agents[0]);

  return (
    <section id="agents" className="py-28 relative" aria-labelledby="agents-heading">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-[#7C3AED] mb-4">
            AI Executive Team
          </p>
          <h2 id="agents-heading" className="text-[clamp(32px,4vw,56px)] font-bold text-white leading-tight mb-4">
            Meet Your AI Team.
            <br />
            <span className="gradient-text">Always On. Never Billed by the Hour.</span>
          </h2>
          <p className="text-[#B4B4B4] text-lg max-w-2xl mx-auto">
            8 specialised AI agents collaborating in real time — each with deep domain expertise, shared memory, and full context of your startup.
          </p>
        </motion.div>

        {/* Two-column: grid + detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Agent selector grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
            {agents.map((agent, i) => (
              <motion.button
                key={agent.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActive(agent)}
                className="rounded-2xl p-4 text-left border transition-all focus-visible:outline-none"
                style={{
                  background: active.id === agent.id ? `${agent.color}10` : "var(--surface)",
                  borderColor: active.id === agent.id ? `${agent.color}30` : "var(--border)",
                  backdropFilter: "blur(20px)",
                }}
                aria-pressed={active.id === agent.id}
              >
                {/* Active glow */}
                {active.id === agent.id && (
                  <div className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${agent.color}12, transparent 70%)` }} />
                )}
                <div className="text-2xl mb-2.5 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${agent.color}15` }}>
                  {agent.avatar}
                </div>
                <p className="text-white text-xs font-bold">{agent.name}</p>
                <p className="text-[#737373] text-[10px] mt-0.5">{agent.role}</p>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="rounded-[28px] p-8 border"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                borderColor: `${active.color}20`,
                boxShadow: `0 24px 80px rgba(0,0,0,0.3), 0 0 40px ${active.color}10`,
              }}
            >
              {/* Agent header */}
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl text-3xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${active.color}15`, boxShadow: `0 0 24px ${active.color}25` }}>
                  {active.avatar}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{active.name}</h3>
                  <p style={{ color: active.color }} className="text-sm font-medium">{active.role}</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: active.color, boxShadow: `0 0 6px ${active.color}` }} />
                  <span className="text-xs text-[#737373]">Online</span>
                </div>
              </div>

              <p className="text-[var(--text-2)] leading-relaxed mb-6">
                {active.description}
              </p>

              {/* Capabilities */}
              <div>
                <p className="text-[#737373] text-xs uppercase tracking-wider font-semibold mb-3">Capabilities</p>
                <div className="flex flex-wrap gap-2">
                  {active.capabilities.map((cap) => (
                    <span key={cap} className="text-xs px-3 py-1.5 rounded-full font-medium border"
                      style={{ background: `${active.color}10`, borderColor: `${active.color}25`, color: active.color }}>
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
