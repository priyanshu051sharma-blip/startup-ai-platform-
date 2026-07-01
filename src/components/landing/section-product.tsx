"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const TABS = [
  {
    id: "analysis",
    label: "Analysis",
    headline: "20+ modules. Evidence-backed.",
    body: "SWOT, TAM/SAM/SOM, competitor mapping, risk heatmap — all generated from your data. Each insight shows its confidence score and recommended next step.",
    preview: <AnalysisPreview />,
  },
  {
    id: "financial",
    label: "Financials",
    headline: "Investor-grade models in minutes.",
    body: "Revenue forecasts, burn modeling, 6-method valuation, cash flow, unit economics. Built from your numbers. Exportable as a professional report.",
    preview: <FinancialPreview />,
  },
  {
    id: "pitch",
    label: "Pitch Sim",
    headline: "Practice with an AI that thinks like a VC.",
    body: "Live Q&A scored on clarity, market knowledge, and confidence. Detailed feedback after every session. Walk in ready.",
    preview: <PitchPreview />,
  },
];

export function LandingProduct() {
  const [active, setActive] = useState("analysis");
  const cur = TABS.find((t) => t.id === active)!;

  return (
    <section
      id="product"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        background: "var(--bg-2)",
      padding: "120px 24px",
      }}
    >
      <div style={{ maxWidth: 1040, margin: "0 auto", width: "100%" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 80 }}
        >
          <p className="eyebrow" style={{ marginBottom: 20 }}>The platform</p>
          <h2
            style={{
              fontSize: "clamp(30px, 4.5vw, 58px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              color: "var(--text)",
            }}
          >
            Everything your startup needs.
            <br />
            <span className="grad-accent">One workspace.</span>
          </h2>
        </motion.div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 2, marginBottom: 64, width: "fit-content" }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              style={{
                padding: "8px 20px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                border: "none",
                transition: "all 0.18s",
                background: active === t.id ? "var(--surface-3)" : "transparent",
                color: active === t.id ? "var(--text)" : "var(--text-3)",
                outline: active === t.id ? "1px solid var(--border-2)" : "none",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
          className="max-md:grid-cols-1"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.22 }}
            >
              <h3
                style={{
                  fontSize: "clamp(20px, 2.2vw, 28px)",
                  fontWeight: 700,
                  color: "var(--text)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.25,
                  marginBottom: 16,
                }}
              >
                {cur.headline}
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--text-2)", marginBottom: 32 }}>
                {cur.body}
              </p>
              <Link href="/dashboard" className="btn btn-secondary" style={{ fontSize: 13 }}>
                Try it free →
              </Link>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={active + "p"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              style={{
                borderRadius: 20,
                overflow: "hidden",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
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
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>Startup Analysis</p>
        <span className="pill pill-green" style={{ fontSize: 10 }}>94% confidence</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {bars.map((b, i) => (
          <motion.div key={b.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: "var(--text-3)" }}>{b.label}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: b.ok ? "#f5f5f5" : "#f87171" }}>{b.score}</span>
            </div>
            <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 999 }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${b.score}%` }}
                transition={{ duration: 0.8, delay: i * 0.06 }}
                style={{ height: "100%", borderRadius: 999, background: b.ok ? "#6366f1" : "#ef4444" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div style={{ marginTop: 20, padding: "12px 14px", borderRadius: 12, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.12)" }}>
        <p style={{ fontSize: 12, color: "#a5b4fc", lineHeight: 1.6 }}>
          Execution risk is your weakest dimension. Recommend building a clear accountability framework.
        </p>
      </div>
    </div>
  );
}

function FinancialPreview() {
  return (
    <div style={{ padding: 28 }}>
      <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", marginBottom: 24 }}>Financial Forecast · 12 months</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        {[
          { label: "MRR",       value: "₹4.2L",  color: "#4ade80" },
          { label: "Runway",    value: "18 mo",  color: "#6366f1" },
          { label: "Burn Rate", value: "₹2.8L",  color: "#f59e0b" },
          { label: "Valuation", value: "₹3.2Cr", color: "#a5b4fc" },
        ].map((m) => (
          <div key={m.label} style={{ padding: "16px 14px", borderRadius: 12, background: "var(--surface-2)", border: "1px solid var(--border)" }}>
            <p style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 6 }}>{m.label}</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: m.color, letterSpacing: "-0.02em" }}>{m.value}</p>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.12)" }}>
        <p style={{ fontSize: 12, color: "#4ade80", lineHeight: 1.6 }}>
          At 8%/mo growth you reach ₹1Cr ARR in 8 months — without additional funding.
        </p>
      </div>
    </div>
  );
}

function PitchPreview() {
  return (
    <div style={{ padding: 28 }}>
      <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", marginBottom: 24 }}>Investor Simulator · Live session</p>
      <div style={{ padding: "16px", borderRadius: 14, background: "var(--surface)", border: "1px solid var(--border)", marginBottom: 20 }}>
        <p style={{ fontSize: 10, color: "var(--text-3)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>AI Investor asks</p>
        <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.6 }}>
          {`"What makes you 10× better than existing players? Be specific."`}
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { label: "Clarity",         pct: 92 },
          { label: "Market knowledge", pct: 78 },
          { label: "Confidence",      pct: 85 },
        ].map((s) => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 12, color: "#888", width: 128, flexShrink: 0 }}>{s.label}</span>
            <div style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 999 }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.pct}%` }}
                transition={{ duration: 0.8 }}
                style={{ height: "100%", borderRadius: 999, background: "#6366f1" }}
              />
            </div>
            <span style={{ fontSize: 12, color: "#f5f5f5", fontWeight: 600, width: 28, textAlign: "right" }}>{s.pct}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
