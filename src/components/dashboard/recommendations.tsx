"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Rec {
  id: string; priority: "high" | "medium" | "low";
  title: string; desc: string; impact: string; effort: string; why: string; done: boolean;
}

const INIT: Rec[] = [
  { id: "1", priority: "high",   title: "Increase pricing by ₹500/mo",           desc: "Pro plan is 23% below market. Adds ₹18L ARR.",             impact: "+8 pts", effort: "2 days",  why: "Benchmarked against 14 comparable SaaS products. Confidence: 92%.",              done: false },
  { id: "2", priority: "high",   title: "Add 24-month financial projections",     desc: "Missing forward financials — the #1 investor ask.",         impact: "+6 pts", effort: "1 day",   why: "Based on analysis of 340 seed decks. 78% of rejections cited missing financials.", done: false },
  { id: "3", priority: "medium", title: "File trademark application",             desc: "Two similar brand names in adjacent markets.",              impact: "+3 pts", effort: "1 week",  why: "IP conflict probability: 34% based on brand similarity and market overlap.",       done: false },
  { id: "4", priority: "medium", title: "Improve CAC:LTV ratio",                 desc: "Current 1:2.8 is below the healthy 1:3+ benchmark.",        impact: "+5 pts", effort: "3 weeks", why: "Benchmarked against 80 SaaS startups at ₹3–8Cr ARR.",                            done: false },
  { id: "5", priority: "low",    title: "Apply for DPIIT recognition",            desc: "You qualify. Unlocks tax exemptions + ₹10,000Cr fund.",     impact: "+2 pts", effort: "1 hour",  why: "All eligibility criteria met based on incorporation date and revenue.",            done: false },
];

const P_STYLE = {
  high:   { bg: "rgba(248,113,113,0.1)", text: "#f87171", border: "rgba(248,113,113,0.2)" },
  medium: { bg: "rgba(251,191,36,0.1)",  text: "#fbbf24", border: "rgba(251,191,36,0.2)" },
  low:    { bg: "rgba(74,222,128,0.1)",  text: "#4ade80", border: "rgba(74,222,128,0.15)" },
};

export function Recommendations() {
  const [recs, setRecs] = useState<Rec[]>(INIT);
  const [expanded, setExpanded] = useState<string | null>(null);

  const open = recs.filter(r => !r.done);
  const done = recs.filter(r => r.done);

  const markDone = (id: string) => { setRecs(p => p.map(r => r.id === id ? { ...r, done: true } : r)); setExpanded(null); };

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 4 }}>
            AI Recommendations
          </p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>{open.length} actions · sorted by impact</p>
        </div>
        <span style={{ fontSize: 12, color: "#fbbf24", fontWeight: 600 }}>+24 pts potential</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {open.map((rec, i) => {
          const isOpen = expanded === rec.id;
          const pc = P_STYLE[rec.priority];
          return (
            <motion.div key={rec.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              style={{ borderRadius: 8, overflow: "hidden", background: isOpen ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)", border: `1px solid ${isOpen ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"}`, transition: "all 0.15s" }}>
              <button onClick={() => setExpanded(isOpen ? null : rec.id)}
                style={{ width: "100%", display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", textAlign: "left", background: "transparent", border: "none", cursor: "pointer" }}>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: pc.bg, color: pc.text, border: `1px solid ${pc.border}`, flexShrink: 0, marginTop: 2 }}>
                  {rec.priority.toUpperCase()}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", lineHeight: 1.35, marginBottom: 3 }}>{rec.title}</p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{rec.desc}</p>
                </div>
                <span style={{ fontSize: 12, color: "#4ade80", fontWeight: 700, flexShrink: 0 }}>{rec.impact}</span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }} style={{ overflow: "hidden" }}>
                    <div style={{ padding: "0 14px 14px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginTop: 10, marginBottom: 6 }}>{rec.why}</p>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginBottom: 12 }}>Effort: {rec.effort}</p>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => markDone(rec.id)}
                          style={{ flex: 1, fontSize: 13, padding: "8px", borderRadius: 6, fontWeight: 600, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"}>
                          Mark done
                        </button>
                        <button style={{ flex: 1, fontSize: 13, padding: "8px", borderRadius: 6, fontWeight: 600, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
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
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
            Completed ({done.length})
          </p>
          {done.map(rec => (
            <div key={rec.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
              <span style={{ color: "#4ade80", fontWeight: 700 }}>✓</span>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textDecoration: "line-through" }}>{rec.title}</span>
              <span style={{ color: "#4ade80", flexShrink: 0, fontWeight: 600, fontSize: 11 }}>{rec.impact}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
