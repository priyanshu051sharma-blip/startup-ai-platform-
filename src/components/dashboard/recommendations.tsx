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
    <div className="rounded-2xl p-5" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-white font-medium text-sm">AI Recommendations</h2>
          <p className="text-xs mt-0.5" style={{ color: "#525252" }}>{open.length} actions · sorted by impact</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b" }} />
          <span className="text-xs font-medium" style={{ color: "#f59e0b" }}>
            +{open.reduce((s, r) => s + parseInt(r.impact), 0)} pts potential
          </span>
        </div>
      </div>

      {/* Open recs */}
      <div className="space-y-2">
        {open.map((rec, i) => {
          const pc = priorityColor[rec.priority];
          const isOpen = expanded === rec.id;

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl overflow-hidden"
              style={{
                background: isOpen ? "#161616" : "#0a0a0a",
                border: `1px solid ${isOpen ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)"}`,
              }}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : rec.id)}
                className="w-full flex items-start gap-3 px-4 py-3.5 text-left"
              >
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
                  style={{ background: pc.bg, color: pc.text, border: `1px solid ${pc.border}` }}>
                  {priorityLabel[rec.priority]}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium leading-snug">{rec.title}</p>
                  <p className="text-xs mt-0.5 truncate" style={{ color: "#525252" }}>{rec.desc}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span className="text-xs font-medium" style={{ color: "#6366f1" }}>{rec.impact}</span>
                  <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{ color: "#525252", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                  >
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      <p className="text-xs leading-relaxed mt-3 mb-1" style={{ color: "#a0a0a0" }}>
                        <span style={{ color: "#6366f1" }}>Why: </span>{rec.why}
                      </p>
                      <div className="flex items-center gap-3 mt-3 text-xs" style={{ color: "#525252" }}>
                        <span>Effort: {rec.effort}</span>
                        <span>·</span>
                        <span>Impact: {rec.impact}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => markDone(rec.id)}
                          className="flex-1 text-xs py-2 rounded-lg font-medium transition-colors"
                          style={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.2)" }}
                        >
                          Mark done
                        </button>
                        <button
                          className="flex-1 text-xs py-2 rounded-lg font-medium transition-colors"
                          style={{ background: "#6366f1", color: "#fff" }}
                        >
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

      {/* Done */}
      {done.length > 0 && (
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "#525252" }}>
            Completed ({done.length})
          </p>
          {done.map((rec) => (
            <div key={rec.id} className="flex items-center gap-2 py-1.5 text-xs" style={{ color: "#525252" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="rgba(34,197,94,0.4)" strokeWidth="1" />
                <path d="M3 6L5 8L9 4" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="line-through truncate">{rec.title}</span>
              <span className="ml-auto flex-shrink-0" style={{ color: "#4ade80" }}>{rec.impact}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
