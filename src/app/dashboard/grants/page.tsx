"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const GRANTS = [
  {
    name: "DPIIT Startup India Seed Fund",
    amount: "₹25L",
    deadline: "Aug 31, 2025",
    category: "Government",
    eligibility: "DPIIT-recognised startup, <2 years old, not funded by VC",
    effort: "1 hour",
    status: "eligible",
    steps: ["Register on Startup India portal", "Complete DPIIT recognition (if not done)", "Submit scheme application with pitch deck and financials"],
    url: "https://seedfund.startupindia.gov.in",
    icon: "🇮🇳",
  },
  {
    name: "DST NIDHI Prayas Grant",
    amount: "₹10–50L",
    deadline: "Rolling",
    category: "Government",
    eligibility: "Technology startup, proof of concept stage, team with technical co-founder",
    effort: "3 hours",
    status: "eligible",
    steps: ["Identify nearest NIDHI-PRAYAS centre", "Submit concept note (2 pages)", "Present prototype to evaluation committee"],
    url: "https://dst.gov.in/nidhi",
    icon: "🔬",
  },
  {
    name: "MSME Technology Upgrade Fund",
    amount: "₹15L",
    deadline: "Sep 15, 2025",
    category: "Government",
    eligibility: "Registered MSME, manufacturing/tech focus, <250 employees",
    effort: "2 hours",
    status: "eligible",
    steps: ["Register on MSME portal", "Get Udyam certificate", "Apply through state nodal agency"],
    url: "https://msme.gov.in",
    icon: "🏭",
  },
  {
    name: "Google for Startups Cloud Credits",
    amount: "$200,000 in credits",
    deadline: "Rolling",
    category: "Corporate",
    eligibility: "Seed to Series A startup, building on Google Cloud, not prior recipient",
    effort: "30 min",
    status: "eligible",
    steps: ["Apply at cloud.google.com/startup", "Describe your use case", "Credits activated within 5 business days"],
    url: "https://cloud.google.com/startup",
    icon: "☁️",
  },
  {
    name: "AWS Activate Founders",
    amount: "$25,000 in credits",
    deadline: "Rolling",
    category: "Corporate",
    eligibility: "Early-stage startup, not raised Series B+",
    effort: "20 min",
    status: "eligible",
    steps: ["Apply at aws.amazon.com/activate", "Provide company details", "Credits activated within 2 weeks"],
    url: "https://aws.amazon.com/activate",
    icon: "⚡",
  },
  {
    name: "Startup India MAARG Mentorship",
    amount: "Free + network access",
    deadline: "Rolling",
    category: "Mentorship",
    eligibility: "DPIIT-recognised startup at any stage",
    effort: "45 min",
    status: "partial",
    steps: ["Complete DPIIT recognition first", "Apply on MAARG portal", "Match with mentor from network"],
    url: "https://maarg.startupindia.gov.in",
    icon: "🤝",
  },
];

const statusColor: Record<string, string> = { eligible: "var(--green)", partial: "var(--amber)", ineligible: "var(--red)" };
const statusBg: Record<string, string>    = { eligible: "var(--green-light)", partial: "var(--amber-light)", ineligible: "var(--red-light)" };
const statusLabel: Record<string, string> = { eligible: "You qualify", partial: "Partial match", ineligible: "Not eligible" };

const totalPotential = "₹1.15Cr+";

export default function GrantsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Government", "Corporate", "Mentorship"];
  const filtered = filter === "All" ? GRANTS : GRANTS.filter(g => g.category === filter);
  const eligible = GRANTS.filter(g => g.status === "eligible").length;

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text)" }}>Grant Finder</h1>
        <p style={{ fontSize: 14, color: "var(--text-2)", marginTop: 4 }}>AI-matched grants, credits, and schemes · Updated weekly</p>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total available",   value: totalPotential, color: "var(--green)", sub: "across all schemes" },
          { label: "You qualify for",   value: `${eligible} schemes`, color: "var(--accent)", sub: "out of 6 found" },
          { label: "Quickest win",      value: "30 min", color: "var(--amber)", sub: "AWS Activate credits" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            style={{ padding: "18px 20px", borderRadius: 14, background: "var(--surface)", border: "1px solid var(--border)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{s.label}</p>
            <p style={{ fontSize: 22, fontWeight: 900, color: s.color, letterSpacing: "-0.03em" }}>{s.value}</p>
            <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            style={{ padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "1px solid var(--border)", cursor: "pointer", background: filter === c ? "var(--accent)" : "var(--surface)", color: filter === c ? "#fff" : "var(--text-2)", transition: "all 0.15s" }}>
            {c}
          </button>
        ))}
      </div>

      {/* Grant cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map((g, i) => (
          <motion.div key={g.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
            <button onClick={() => setExpanded(expanded === g.name ? null : g.name)}
              style={{ width: "100%", padding: "18px 22px", display: "flex", alignItems: "center", gap: 14, background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{g.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{g.name}</p>
                  <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: "var(--surface-2)", color: "var(--text-3)", border: "1px solid var(--border)" }}>{g.category}</span>
                </div>
                <p style={{ fontSize: 12, color: "var(--text-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{g.eligibility}</p>
              </div>
              <div style={{ display: "flex", gap: 16, flexShrink: 0, alignItems: "center" }}>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>{g.amount}</p>
                  <p style={{ fontSize: 11, color: "var(--text-3)" }}>Deadline: {g.deadline}</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999, background: statusBg[g.status], color: statusColor[g.status], flexShrink: 0 }}>
                  {statusLabel[g.status]}
                </span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "var(--text-3)", transform: expanded === g.name ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>
                  <path d="M2 5L7 10L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </button>

            {expanded === g.name && (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} style={{ overflow: "hidden" }}>
                <div style={{ padding: "0 22px 20px", borderTop: "1px solid var(--border)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 18 }}>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>How to apply</p>
                      {g.steps.map((s, si) => (
                        <div key={si} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--accent-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "var(--accent)", flexShrink: 0 }}>{si + 1}</div>
                          <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{s}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>Details</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <p style={{ fontSize: 13, color: "var(--text-2)" }}><strong style={{ color: "var(--text)" }}>Amount:</strong> {g.amount}</p>
                        <p style={{ fontSize: 13, color: "var(--text-2)" }}><strong style={{ color: "var(--text)" }}>Deadline:</strong> {g.deadline}</p>
                        <p style={{ fontSize: 13, color: "var(--text-2)" }}><strong style={{ color: "var(--text)" }}>Effort:</strong> {g.effort}</p>
                      </div>
                      <a href={g.url} target="_blank" rel="noopener noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16, padding: "9px 18px", borderRadius: 10, background: "var(--accent)", color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                        Apply now →
                      </a>
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
