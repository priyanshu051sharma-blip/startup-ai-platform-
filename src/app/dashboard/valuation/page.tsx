"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const VALUATION_METHODS = [
  {
    id: "dcf",
    name: "DCF Analysis",
    shortName: "DCF",
    value: "₹42Cr",
    numericValue: 42,
    confidence: 68,
    tag: "Most rigorous",
    tagColor: "var(--accent)",
    tagBg: "var(--accent-light)",
    description: "Discounts projected future cash flows at a 22% WACC. Based on 5-year projections with 3.5x terminal multiple.",
    assumptions: ["Revenue CAGR: 38%", "EBITDA margin: 24% by Y5", "Discount rate: 22%", "Terminal growth: 5%"],
    icon: "📉",
  },
  {
    id: "revenue",
    name: "Revenue Multiple",
    shortName: "Rev ×",
    value: "₹55Cr",
    numericValue: 55,
    confidence: 82,
    tag: "Most common",
    tagColor: "var(--green)",
    tagBg: "var(--green-light)",
    description: "ARR of ₹5.5Cr × 10x multiple. Comparable SaaS companies in India are trading at 8–12× forward ARR.",
    assumptions: ["ARR: ₹5.5Cr", "Multiple: 10×", "Sector: B2B SaaS", "Stage: Series A"],
    icon: "📊",
  },
  {
    id: "comparable",
    name: "Comparable Cos.",
    shortName: "Comps",
    value: "₹48Cr",
    numericValue: 48,
    confidence: 75,
    tag: "Market-based",
    tagColor: "var(--amber)",
    tagBg: "var(--amber-light)",
    description: "Analysis of 12 comparable seed/Series A SaaS startups in India. Median valuation at similar revenue stage was ₹48Cr.",
    assumptions: ["12 comps analyzed", "Median EV/ARR: 8.7×", "Size-adjusted premium", "Recency: Q4 2024"],
    icon: "🏢",
  },
  {
    id: "berkus",
    name: "Berkus Method",
    shortName: "Berkus",
    value: "₹25Cr",
    numericValue: 25,
    confidence: 55,
    tag: "Pre-revenue tool",
    tagColor: "var(--text-2)",
    tagBg: "var(--surface-2)",
    description: "Scores 5 risk factors up to ₹5Cr each. More conservative; better suited for pre-revenue stage analysis.",
    assumptions: ["Sound idea: ₹5Cr", "Prototype: ₹5Cr", "Quality team: ₹5Cr", "Strategic relationships: ₹5Cr", "Product rollout: ₹5Cr"],
    icon: "🎯",
  },
  {
    id: "scorecard",
    name: "Scorecard Method",
    shortName: "Scorecard",
    value: "₹38Cr",
    numericValue: 38,
    confidence: 72,
    tag: "Angel standard",
    tagColor: "var(--accent)",
    tagBg: "var(--accent-light)",
    description: "Weights team, market, product, competition, and financials against a ₹30Cr regional baseline.",
    assumptions: ["Team: 130% (great)", "Market: 120%", "Product: 110%", "Competition: 90%", "Financial: 115%"],
    icon: "✅",
  },
  {
    id: "riskfactor",
    name: "Risk Factor Summation",
    shortName: "Risk",
    value: "₹33Cr",
    numericValue: 33,
    confidence: 65,
    tag: "Risk-adjusted",
    tagColor: "var(--red)",
    tagBg: "var(--red-light)",
    description: "Starts at ₹30Cr baseline, adjusts for 12 risk factors. Strong tech and team but regulatory risk elevated.",
    assumptions: ["Base: ₹30Cr", "+₹5Cr tech risk (low)", "-₹2Cr regulatory", "+₹1Cr team strength", "-₹1Cr competition"],
    icon: "⚠️",
  },
];

const READINESS_BREAKDOWN = [
  { label: "Financial Model",   score: 88, max: 100, color: "var(--green)" },
  { label: "Traction & KPIs",  score: 82, max: 100, color: "var(--green)" },
  { label: "Team Credentials", score: 79, max: 100, color: "var(--accent)" },
  { label: "Market Size",      score: 75, max: 100, color: "var(--accent)" },
  { label: "Pitch Deck",       score: 91, max: 100, color: "var(--green)" },
  { label: "Legal / Cap Table",score: 64, max: 100, color: "var(--amber)" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const consensusValue = Math.round(
  VALUATION_METHODS.reduce((s, m) => s + m.numericValue * m.confidence, 0) /
  VALUATION_METHODS.reduce((s, m) => s + m.confidence, 0)
);

const overallReadiness = Math.round(
  READINESS_BREAKDOWN.reduce((s, r) => s + r.score, 0) / READINESS_BREAKDOWN.length
);

// ─── Component ────────────────────────────────────────────────────────────────

export default function ValuationPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = VALUATION_METHODS.find(m => m.id === selected);

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1200, margin: "0 auto", color: "var(--text)" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text)" }}>Valuation Dashboard</h1>
        <p style={{ fontSize: 14, color: "var(--text-2)", marginTop: 4 }}>6 methods · Confidence-weighted consensus · Updated today</p>
      </div>

      {/* Consensus Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-mid) 100%)",
          borderRadius: 18,
          padding: "28px 32px",
          marginBottom: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
            Consensus Valuation
          </p>
          <p style={{ fontSize: 48, fontWeight: 900, letterSpacing: "-0.05em", color: "#ffffff", lineHeight: 1 }}>
            ₹{consensusValue}Cr
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>
            Confidence-weighted average across 6 methodologies · Range: ₹25Cr – ₹55Cr
          </p>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "Floor",   v: "₹25Cr", desc: "Berkus (conservative)" },
            { label: "Target",  v: `₹${consensusValue}Cr`, desc: "Weighted consensus" },
            { label: "Ceiling", v: "₹55Cr", desc: "Revenue multiple" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center", padding: "12px 18px", borderRadius: 12, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", marginTop: 2 }}>{s.v}</p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Methods Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
        {VALUATION_METHODS.map((method, i) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => setSelected(selected === method.id ? null : method.id)}
            style={{
              padding: "20px 22px",
              borderRadius: 14,
              background: "var(--surface)",
              border: selected === method.id ? "1.5px solid var(--accent)" : "1px solid var(--border)",
              cursor: "pointer",
              transition: "all 0.18s",
              boxShadow: selected === method.id ? "0 0 0 3px var(--accent-glow)" : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>{method.icon}</span>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{method.name}</p>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999,
                    background: method.tagBg, color: method.tagColor, textTransform: "uppercase", letterSpacing: "0.06em",
                  }}>{method.tag}</span>
                </div>
              </div>
              <p style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.04em", color: "var(--text)", textAlign: "right" }}>{method.value}</p>
            </div>

            <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.55, marginBottom: 14 }}>{method.description}</p>

            {/* Confidence bar */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 600 }}>Confidence</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text)" }}>{method.confidence}%</span>
              </div>
              <div style={{ height: 5, borderRadius: 999, background: "var(--border)", overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 999,
                  width: `${method.confidence}%`,
                  background: method.confidence >= 80 ? "var(--green)" : method.confidence >= 65 ? "var(--accent)" : "var(--amber)",
                  transition: "width 0.6s ease",
                }} />
              </div>
            </div>

            {/* Expanded assumptions */}
            {selected === method.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)" }}
              >
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-2)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Key Assumptions
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {method.assumptions.map(a => (
                    <div key={a} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent)", flexShrink: 0, display: "inline-block" }} />
                      <span style={{ fontSize: 12, color: "var(--text-2)" }}>{a}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Investment Readiness */}
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20 }}>
        {/* Score circle */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>
            Investment Readiness
          </p>
          <div style={{ position: "relative", width: 140, height: 140, marginBottom: 20 }}>
            <svg viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)", width: "100%", height: "100%" }}>
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="50" fill="none"
                stroke={overallReadiness >= 80 ? "var(--green)" : overallReadiness >= 65 ? "var(--accent)" : "var(--amber)"}
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - overallReadiness / 100)}`}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
            </svg>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
              <p style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.05em", color: "var(--text)", lineHeight: 1 }}>{overallReadiness}</p>
              <p style={{ fontSize: 12, color: "var(--text-3)" }}>/ 100</p>
            </div>
          </div>
          <p style={{ fontSize: 14, fontWeight: 700, color: "var(--green)", marginBottom: 4 }}>Series A Ready</p>
          <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>
            Strong across most dimensions. Improve cap table and legal to unlock best terms.
          </p>
        </div>

        {/* Breakdown bars */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>Readiness Breakdown</h2>
          <p style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 24 }}>Score improvement areas for investor readiness</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {READINESS_BREAKDOWN.map(r => (
              <div key={r.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{r.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: r.color }}>{r.score}%</span>
                </div>
                <div style={{ height: 8, borderRadius: 999, background: "var(--border)", overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${r.score}%` }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    style={{ height: "100%", borderRadius: 999, background: r.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, padding: "14px 16px", borderRadius: 12, background: "var(--surface-2)", border: "1px solid var(--border)" }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>💡 Top Recommendation</p>
            <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.55 }}>
              Your Legal / Cap Table score (64%) is the biggest gap. Completing a proper cap table, IP assignment, and standard SHA agreements could add 15–20 points and unlock institutional investors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
