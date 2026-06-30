"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const COMPETITORS = [
  {
    name: "Startup Buddy", url: "startupbuddy.in", category: "Direct",
    funding: "Pre-seed", users: "8,000", mrr: "₹50L", founded: "2023",
    strengths: ["Simple onboarding", "Good grant database", "Regional language support"],
    weaknesses: ["No AI features", "Very limited analysis", "No financial modeling"],
    gap: "No AI backbone — purely template-based. You win on depth of intelligence.",
    threat: "high", score: 72,
  },
  {
    name: "GrowthX", url: "growthx.co", category: "Adjacent",
    funding: "Series A (₹40Cr)", users: "25,000", mrr: "₹1.8Cr", founded: "2021",
    strengths: ["Strong community", "Expert network", "B2B SaaS focus"],
    weaknesses: ["Human-dependent (not AI)", "High pricing", "No real-time analysis"],
    gap: "Education/community play — not an operating system. Different use case.",
    threat: "medium", score: 55,
  },
  {
    name: "Zoho One", url: "zoho.com", category: "Indirect",
    funding: "Bootstrapped (₹7,000Cr+ revenue)", users: "80M+", mrr: "₹120Cr+", founded: "1996",
    strengths: ["Mature product suite", "Strong India presence", "Competitive pricing"],
    weaknesses: ["Not startup-focused", "No AI CEO/CFO concept", "Complex for early-stage"],
    gap: "Business operations tool — not a startup intelligence layer. You serve founders, not operators.",
    threat: "low", score: 38,
  },
  {
    name: "Notion AI", url: "notion.so", category: "Indirect",
    funding: "Series C ($275M)", users: "30M+", mrr: "₹12Cr+ India", founded: "2016",
    strengths: ["Excellent UX", "Massive user base", "Strong AI integration"],
    weaknesses: ["Horizontal tool", "No startup-specific intelligence", "No financial modeling"],
    gap: "Document/workspace tool. No domain expertise in fundraising, valuation, or pitch prep.",
    threat: "low", score: 42,
  },
];

const threatColor = (t: string) => t === "high" ? "var(--red)" : t === "medium" ? "var(--amber)" : "var(--green)";
const threatBg    = (t: string) => t === "high" ? "var(--red-light)" : t === "medium" ? "var(--amber-light)" : "var(--green-light)";

export default function CompetitorsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text)" }}>Competitor Analysis</h1>
        <p style={{ fontSize: 14, color: "var(--text-2)", marginTop: 4 }}>AI-researched competitive landscape · Updated today</p>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Direct threats",   value: "1",  color: "var(--red)",    sub: "Startup Buddy" },
          { label: "Adjacent players", value: "1",  color: "var(--amber)",  sub: "GrowthX" },
          { label: "Your moat",        value: "AI", color: "var(--accent)", sub: "Depth of intelligence" },
        ].map(s => (
          <div key={s.label} style={{ padding: "18px 20px", borderRadius: 14, background: "var(--surface)", border: "1px solid var(--border)" }}>
            <p style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{s.label}</p>
            <p style={{ fontSize: 28, fontWeight: 900, color: s.color, letterSpacing: "-0.04em" }}>{s.value}</p>
            <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Competitor cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {COMPETITORS.map((c, i) => (
          <motion.div key={c.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
            <button onClick={() => setExpanded(expanded === c.name ? null : c.name)}
              style={{ width: "100%", padding: "20px 24px", display: "flex", alignItems: "center", gap: 16, background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "var(--accent)", flexShrink: 0 }}>
                {c.name[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{c.name}</p>
                  <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: "var(--surface-2)", color: "var(--text-3)", border: "1px solid var(--border)" }}>{c.category}</span>
                </div>
                <p style={{ fontSize: 12, color: "var(--text-3)" }}>{c.url} · Founded {c.founded} · {c.funding}</p>
              </div>
              <div style={{ display: "flex", gap: 24, flexShrink: 0 }}>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{c.mrr}</p>
                  <p style={{ fontSize: 11, color: "var(--text-3)" }}>{c.users} users</p>
                </div>
                <span style={{ padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700, background: threatBg(c.threat), color: threatColor(c.threat), flexShrink: 0, alignSelf: "center" }}>
                  {c.threat} threat
                </span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "var(--text-3)", transform: expanded === c.name ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, alignSelf: "center" }}>
                  <path d="M2 5L7 10L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </button>

            {expanded === c.name && (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} style={{ overflow: "hidden" }}>
                <div style={{ padding: "0 24px 24px", borderTop: "1px solid var(--border)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 20 }}>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--green)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Strengths</p>
                      {c.strengths.map(s => <p key={s} style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 6, display: "flex", gap: 8 }}><span style={{ color: "var(--green)" }}>+</span>{s}</p>)}
                    </div>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--red)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Weaknesses</p>
                      {c.weaknesses.map(w => <p key={w} style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 6, display: "flex", gap: 8 }}><span style={{ color: "var(--red)" }}>−</span>{w}</p>)}
                    </div>
                    <div style={{ padding: 16, borderRadius: 12, background: "var(--accent-light)", border: "1px solid rgba(79,70,229,0.15)" }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Your gap to exploit</p>
                      <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6 }}>{c.gap}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
