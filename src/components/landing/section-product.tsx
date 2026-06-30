"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  {
    id: "analysis",
    label: "Startup Analysis",
    headline: "20+ analysis modules. Evidence-backed, confidence-scored.",
    body: "SWOT, Porter's 5 Forces, PESTLE, TAM/SAM/SOM, competitor mapping, risk heatmap — all generated from your startup data. Each insight shows its source, confidence score, and recommended next step.",
    preview: <AnalysisPreview />,
  },
  {
    id: "financial",
    label: "Financial Intelligence",
    headline: "Investor-grade financials in minutes, not weeks.",
    body: "Revenue forecasts, burn rate modeling, 6-method valuation engine, cash flow projections, unit economics, scenario analysis. Built from your numbers, exportable as a professional report.",
    preview: <FinancialPreview />,
  },
  {
    id: "pitch",
    label: "Investor Simulator",
    headline: "Practice with an AI that acts like a real VC.",
    body: "Live Q&A with an AI trained on investor patterns. Scores your answers on clarity, market knowledge, financial literacy, and confidence. Detailed feedback after every session.",
    preview: <PitchPreview />,
  },
];

export function LandingProduct() {
  const [active, setActive] = useState("analysis");
  const cur = TABS.find((t) => t.id === active)!;

  return (
    <section id="product" style={{ padding: "120px 0" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="eyebrow"
            style={{ marginBottom: 16 }}
          >
            The platform
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            style={{
              fontSize: "clamp(28px, 4.5vw, 56px)",
              fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em",
              color: "#f5f5f5",
            }}
          >
            Everything your startup needs.<br />
            <span className="grad-accent">In one workspace.</span>
          </motion.h2>
        </div>

        {/* Tab bar */}
        <div
          style={{
            display: "flex", justifyContent: "center", marginBottom: 56,
          }}
        >
          <div
            style={{
              display: "flex", gap: 2, padding: 3,
              background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
            }}
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                style={{
                  padding: "8px 20px", borderRadius: 11, fontSize: 13, fontWeight: 500,
                  cursor: "pointer", border: "none", transition: "all 0.18s",
                  background: active === t.id ? "#1c1c1c" : "transparent",
                  color: active === t.id ? "#f5f5f5" : "#525252",
                  outline: active === t.id ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.22 }}
            >
              <h3 style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 600, color: "#f5f5f5", letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: 16 }}>
                {cur.headline}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#a0a0a0", marginBottom: 28 }}>
                {cur.body}
              </p>
              <button className="btn btn-secondary" style={{ fontSize: 13 }}>
                Try it free →
              </button>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={active + "p"}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
              style={{
                borderRadius: 18, overflow: "hidden",
                background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {cur.preview}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function AnalysisPreview() {
  const bars = [
    { label: "Market Opportunity", score: 88, ok: true  },
    { label: "Business Model",     score: 82, ok: true  },
    { label: "Competition",        score: 74, ok: true  },
    { label: "Technology",         score: 91, ok: true  },
    { label: "Execution Risk",     score: 67, ok: false },
  ];
  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: "#f5f5f5" }}>Startup Analysis</p>
        <span className="pill pill-green" style={{ fontSize: 10 }}>Complete · 94% confidence</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {bars.map((b, i) => (
          <motion.div key={b.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 11, color: "#a0a0a0" }}>{b.label}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: b.ok ? "#f5f5f5" : "#f87171" }}>{b.score}</span>
            </div>
            <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 999 }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${b.score}%` }}
                transition={{ duration: 0.7, delay: i * 0.07 }}
                style={{ height: "100%", borderRadius: 999, background: b.ok ? "#6366f1" : "#ef4444" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div style={{ marginTop: 18, padding: "10px 12px", borderRadius: 10, background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.14)" }}>
        <p style={{ fontSize: 11, color: "#a5b4fc", lineHeight: 1.5 }}>
          AI insight: Execution risk is your weakest dimension. Recommend hiring a COO or building a clear accountability framework.
        </p>
      </div>
    </div>
  );
}

function FinancialPreview() {
  return (
    <div style={{ padding: "24px" }}>
      <p style={{ fontSize: 13, fontWeight: 500, color: "#f5f5f5", marginBottom: 20 }}>Financial Forecast · 12 months</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[
          { label: "MRR",       value: "₹4.2L",  color: "#4ade80" },
          { label: "Runway",    value: "18 mo",  color: "#6366f1" },
          { label: "Burn Rate", value: "₹2.8L",  color: "#f59e0b" },
          { label: "Valuation", value: "₹3.2Cr", color: "#a5b4fc" },
        ].map((m) => (
          <div key={m.label}
            style={{ padding: "14px 14px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontSize: 10, color: "#525252", marginBottom: 4 }}>{m.label}</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: m.color }}>{m.value}</p>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px", borderRadius: 10, background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)" }}>
        <p style={{ fontSize: 11, color: "#4ade80", lineHeight: 1.5 }}>
          At current 8%/mo growth, you reach ₹1Cr ARR in 8 months — without additional funding.
        </p>
      </div>
    </div>
  );
}

function PitchPreview() {
  return (
    <div style={{ padding: "24px" }}>
      <p style={{ fontSize: 13, fontWeight: 500, color: "#f5f5f5", marginBottom: 20 }}>Investor Simulator · Live session</p>
      <div style={{ padding: "14px", borderRadius: 12, background: "#161616", border: "1px solid rgba(255,255,255,0.07)", marginBottom: 16 }}>
        <p style={{ fontSize: 10, color: "#525252", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          AI Investor asks
        </p>
        <p style={{ fontSize: 13, color: "#f5f5f5", lineHeight: 1.55 }}>
          "What makes you 10× better than the existing players? Be specific."
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { label: "Clarity",        pct: 92 },
          { label: "Market knowledge",pct: 78 },
          { label: "Confidence",     pct: 85 },
        ].map((s) => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 11, color: "#525252", width: 120, flexShrink: 0 }}>{s.label}</span>
            <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 999 }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.pct}%` }}
                transition={{ duration: 0.8 }}
                style={{ height: "100%", borderRadius: 999, background: "#6366f1" }}
              />
            </div>
            <span style={{ fontSize: 11, color: "#f5f5f5", fontWeight: 600, width: 28, textAlign: "right" }}>{s.pct}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
