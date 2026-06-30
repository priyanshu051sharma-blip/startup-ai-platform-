"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Rec {
  id: string;
  priority: "high" | "medium" | "low";
  title: string;
  desc: string;
  impact: string;
  effort: string;
  why: string;
  done: boolean;
}

const INIT: Rec[] = [
  {
    id: "1", priority: "high",
    title: "Increase pricing by ₹500/mo",
    desc: "Your Pro plan is 23% below market. Raising it adds ₹18L ARR while keeping you competitive.",
    impact: "+8 health pts", effort: "2 days",
    why: "Benchmarked against 14 comparable SaaS products at your stage. Confidence: 92%.",
    done: false,
  },
  {
    id: "2", priority: "high",
    title: "Add 24-month financial projections to deck",
    desc: "Your pitch deck is missing forward financials — the #1 reason investors request more info.",
    impact: "+6 investor score", effort: "1 day",
    why: "Based on analysis of 340 seed decks. 78% of rejections at your stage cited missing financials.",
    done: false,
  },
  {
    id: "3", priority: "medium",
    title: "File trademark application",
    desc: "Two similar brand names found in adjacent markets. A ₹5K application protects your brand now.",
    impact: "+3 legal score", effort: "1 week",
    why: "IP conflict probability: 34% based on brand similarity and market overlap.",
    done: false,
  },
  {
    id: "4", priority: "medium",
    title: "Improve CAC:LTV ratio",
    desc: "Current 1:2.8 is below the healthy 1:3+ benchmark. Reducing onboarding drop-off by 15% fixes this.",
    impact: "+5 financial score", effort: "3 weeks",
    why: "Benchmarked against 80 SaaS startups at ₹3–8Cr ARR.",
    done: false,
  },
  {
    id: "5", priority: "low",
    title: "Apply for DPIIT recognition",
    desc: "You qualify. Unlocks tax exemptions and access to ₹10,000Cr Fund of Funds. Takes 1 hour.",
    impact: "+2 legal score", effort: "1 hour",
    why: "All eligibility criteria met based on incorporation date, revenue, and industry.",
    done: false,
  },
];

const priorityLabel = { high: "High", medium: "Medium", low: "Low" };
const priorityColor = {
  high:   { bg: "rgba(239,68,68,0.1)",   text: "#f87171",  border: "rgba(239,68,68,0.2)"   },
  medium: { bg: "rgba(245,158,11,0.1)",  text: "#fbbf24",  border: "rgba(245,158,11,0.2)"  },
  low:    { bg: "rgba(34,197,94,0.08)",  text: "#4ade80",  border: "rgba(34,197,94,0.15)"  },
};

export function Recommendations() {
  const [recs, setRecs] = useState<Rec[]>(INIT);
  const [expanded, setExpanded] = useState<string | null>(null);

  const open = recs.filter((r) => !r.done);
  const done = recs.filter((r) => r.done);

  const markDone = (id: string) => {
    setRecs((prev) => prev.map((r) => r.id === id ? { ...r, done: true } : r));
    setExpanded(null);
  };

  return (
    <div className="card" style={{ padding: "18px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>AI Recommendations</p>
          <p style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>{open.length} actions · sorted by impact</p>
        </div>
        <span style={{ fontSize: 11, color: "var(--amber)", fontWeight: 600 }}>+24 pts potential</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {open.map((rec, i) => {
          const isOpen = expanded === rec.id;
          const pc = priorityColor[rec.priority];
          return (
            <motion.div key={rec.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              style={{ borderRadius: 10, overflow: "hidden", background: isOpen ? "var(--surface-2)" : "var(--surface-3)", border: `1px solid ${isOpen ? "var(--border-2)" : "var(--border)"}` }}>
              <button onClick={() => setExpanded(isOpen ? null : rec.id)}
                style={{ width: "100%", display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", textAlign: "left", background: "transparent", border: "none", cursor: "pointer" }}>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 999, background: pc.bg, color: pc.text, border: `1px solid ${pc.border}`, flexShrink: 0, marginTop: 1, whiteSpace: "nowrap" }}>
                  {priorityLabel[rec.priority]}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", lineHeight: 1.3, marginBottom: 2 }}>{rec.title}</p>
                  <p style={{ fontSize: 11, color: "var(--text-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{rec.desc}</p>
                </div>
                <span style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, flexShrink: 0 }}>{rec.impact}</span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }} style={{ overflow: "hidden" }}>
                    <div style={{ padding: "0 14px 14px", borderTop: "1px solid var(--border)" }}>
                      <p style={{ fontSize: 11, color: "var(--text-2)", lineHeight: 1.6, marginTop: 10, marginBottom: 8 }}>
                        <span style={{ color: "var(--accent)" }}>Why: </span>{rec.why}
                      </p>
                      <p style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 10 }}>Effort: {rec.effort}</p>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => markDone(rec.id)}
                          style={{ flex: 1, fontSize: 11, padding: "8px", borderRadius: 8, fontWeight: 600, background: "var(--accent-light)", color: "var(--accent)", border: "1px solid rgba(79,70,229,0.2)", cursor: "pointer" }}>
                          Mark done
                        </button>
                        <button style={{ flex: 1, fontSize: 11, padding: "8px", borderRadius: 8, fontWeight: 600, background: "var(--accent)", color: "#fff", border: "none", cursor: "pointer" }}>
                          Fix with AI →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      {done.length > 0 && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
            Completed ({done.length})
          </p>
          {done.map(rec => (
            <div key={rec.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", fontSize: 11, color: "var(--text-3)" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="var(--green)" strokeWidth="1" opacity="0.4" />
                <path d="M3 6L5 8L9 4" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textDecoration: "line-through" }}>{rec.title}</span>
              <span style={{ color: "var(--green)", flexShrink: 0 }}>{rec.impact}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
