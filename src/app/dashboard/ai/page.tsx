"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AGENTS = [
  {
    id: "ceo", name: "AI CEO", role: "Strategy & Vision", initial: "C", color: "#f59e0b",
    status: "thinking" as const,
    currentTask: "Evaluating market positioning against 3 growth vectors",
    recentWork: [
      { text: "Completed SWOT analysis — Execution (67/100) is biggest risk", time: "2h ago" },
      { text: "Identified 3 growth vectors: enterprise upsell, geographic expansion, API layer", time: "5h ago" },
      { text: "Generated 12-month strategic roadmap — review recommended", time: "1d ago" },
    ],
    stats: { tasksCompleted: 24, insightsGenerated: 87, avgConfidence: "91%" },
    bio: "Trained on 500+ startup case studies and business strategy frameworks. Specialises in go-to-market strategy, competitive moats, and growth prioritisation.",
  },
  {
    id: "cfo", name: "AI CFO", role: "Finance & Fundraising", initial: "F", color: "#6366f1",
    status: "working" as const,
    currentTask: "Building 18-month cash flow projection",
    recentWork: [
      { text: "Burn rate reduced 4% — runway extended to 18 months", time: "2m ago" },
      { text: "Identified pricing gap: Pro plan 23% below market", time: "3h ago" },
      { text: "Updated financial model with Q2 actuals", time: "1d ago" },
    ],
    stats: { tasksCompleted: 31, insightsGenerated: 104, avgConfidence: "94%" },
    bio: "Expert in SaaS unit economics, fundraising strategy, and financial modeling. Has analysed 10,000+ startup financial profiles.",
  },
  {
    id: "cto", name: "AI CTO", role: "Technology & Product", initial: "T", color: "#16a34a",
    status: "idle" as const,
    currentTask: "Architecture review complete — awaiting next task",
    recentWork: [
      { text: "Tech stack audit complete — no critical debt identified", time: "6h ago" },
      { text: "Recommended moving to edge-first architecture for 3× performance", time: "2d ago" },
      { text: "SOC2 readiness check — 4 gaps to close for enterprise sales", time: "3d ago" },
    ],
    stats: { tasksCompleted: 18, insightsGenerated: 56, avgConfidence: "88%" },
    bio: "Specialises in scalable architecture, technical debt assessment, and product-engineering alignment. Recommends based on your specific stack.",
  },
  {
    id: "cmo", name: "AI CMO", role: "Marketing & Growth", initial: "M", color: "#ec4899",
    status: "working" as const,
    currentTask: "Drafting GTM strategy for Q3",
    recentWork: [
      { text: "GTM strategy draft ready — founder review needed", time: "1h ago" },
      { text: "Content calendar for next 30 days generated", time: "4h ago" },
      { text: "ICP refined: B2B SaaS founders, seed–Series A, India", time: "2d ago" },
    ],
    stats: { tasksCompleted: 22, insightsGenerated: 78, avgConfidence: "86%" },
    bio: "GTM specialist with deep knowledge of PLG, SLG, and community-led growth. Trained on 300+ SaaS go-to-market playbooks.",
  },
  {
    id: "investor", name: "AI Investor", role: "Fundraising & Pitch", initial: "I", color: "#0891b2",
    status: "idle" as const,
    currentTask: "Ready for pitch simulation",
    recentWork: [
      { text: "Investment readiness score: 84/100 (+3 this week)", time: "3h ago" },
      { text: "Identified 12 investors matching your profile", time: "1d ago" },
      { text: "Pitch deck scored 84/100 — 3 critical gaps found", time: "2d ago" },
    ],
    stats: { tasksCompleted: 15, insightsGenerated: 62, avgConfidence: "89%" },
    bio: "Simulates Series A investor thinking. Trained on 1,000+ pitch decks and investor Q&A transcripts. Gives brutally honest feedback.",
  },
  {
    id: "legal", name: "AI Legal", role: "Compliance & IP", initial: "L", color: "#7c3aed",
    status: "idle" as const,
    currentTask: "Compliance scan complete",
    recentWork: [
      { text: "DPIIT recognition application eligibility confirmed", time: "5h ago" },
      { text: "Cap table review: no issues found", time: "2d ago" },
      { text: "GDPR compliance gap identified — 2 items to fix", time: "3d ago" },
    ],
    stats: { tasksCompleted: 11, insightsGenerated: 39, avgConfidence: "92%" },
    bio: "Startup legal specialist covering incorporation, IP, fundraising docs, compliance, and employment law. Always flags when human counsel is needed.",
  },
];

const STATUS_LABEL = { thinking: "Thinking…", working: "Working…", idle: "Standby" };

export default function AITeamPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const agent = AGENTS.find(a => a.id === selected);

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text)" }}>AI Executive Team</h1>
        <p style={{ fontSize: 14, color: "var(--text-2)", marginTop: 4 }}>6 specialised agents · Shared memory · Always on</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 380px" : "repeat(3, 1fr)", gap: 16, transition: "grid-template-columns 0.3s" }}>
        {/* Agent cards */}
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "repeat(3, 1fr)", gap: 14, alignContent: "start" }}>
          {AGENTS.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              onClick={() => setSelected(selected === a.id ? null : a.id)}
              style={{ padding: "20px 20px", borderRadius: 14, background: "var(--surface)", border: selected === a.id ? `1.5px solid ${a.color}` : "1px solid var(--border)", cursor: "pointer", transition: "all 0.15s", boxShadow: selected === a.id ? `0 0 0 3px ${a.color}18` : "none" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 13, background: `${a.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 800, color: a.color }}>
                  {a.initial}
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: a.status === "idle" ? "var(--text-3)" : a.color, background: a.status === "idle" ? "var(--surface-2)" : `${a.color}15`, padding: "3px 9px", borderRadius: 999 }}>
                  {STATUS_LABEL[a.status]}
                </span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 3 }}>{a.name}</p>
              <p style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 10 }}>{a.role}</p>
              <p style={{ fontSize: 11, color: "var(--text-2)", lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{a.currentTask}</p>
            </motion.div>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {agent && (
            <motion.div key={agent.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, height: "fit-content" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 52, height: 52, borderRadius: 15, background: agent.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#fff" }}>
                  {agent.initial}
                </div>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 800, color: "var(--text)" }}>{agent.name}</p>
                  <p style={{ fontSize: 13, color: "var(--text-2)" }}>{agent.role}</p>
                </div>
              </div>

              <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.65, marginBottom: 20 }}>{agent.bio}</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 20 }}>
                {Object.entries(agent.stats).map(([k, v]) => (
                  <div key={k} style={{ padding: "10px 12px", borderRadius: 10, background: "var(--surface-2)", textAlign: "center" }}>
                    <p style={{ fontSize: 16, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em" }}>{v}</p>
                    <p style={{ fontSize: 10, color: "var(--text-3)", marginTop: 2 }}>{k.replace(/([A-Z])/g, " $1").trim()}</p>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>Recent Work</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {agent.recentWork.map((w, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, padding: "10px 12px", borderRadius: 10, background: "var(--surface-2)" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: agent.color, flexShrink: 0, marginTop: 5 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 12, color: "var(--text)", lineHeight: 1.5 }}>{w.text}</p>
                      <p style={{ fontSize: 10, color: "var(--text-3)", marginTop: 2 }}>{w.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
