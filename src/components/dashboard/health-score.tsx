"use client";
import { motion } from "framer-motion";

const DIMS = [
  { label: "Business Model", score: 82 },
  { label: "Financial",      score: 74 },
  { label: "Market",         score: 88 },
  { label: "Technology",     score: 91 },
  { label: "Execution",      score: 67 },
  { label: "Legal",          score: 85 },
];

const overall = Math.round(DIMS.reduce((s, d) => s + d.score, 0) / DIMS.length);
const SZ = 88, SW = 6, RR = (88 - 6) / 2, CC = 2 * Math.PI * ((88 - 6) / 2);

function sc(s: number) { return s >= 80 ? "#6366f1" : s >= 68 ? "#f59e0b" : "#ef4444"; }

export function HealthScore() {
  return (
    <div className="card" style={{ padding: "18px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>Health Score</p>
        <span className="pill pill-accent" style={{ fontSize: 10 }}>
          {overall >= 80 ? "Strong" : overall >= 65 ? "Fair" : "At Risk"}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
        <div style={{ position: "relative", width: SZ, height: SZ, flexShrink: 0 }}>
          <svg width={SZ} height={SZ} style={{ transform: "rotate(-90deg)" }}>
            <circle cx={SZ / 2} cy={SZ / 2} r={RR} fill="none" stroke="var(--border)" strokeWidth={SW} />
            <motion.circle cx={SZ / 2} cy={SZ / 2} r={RR} fill="none" stroke="#6366f1" strokeWidth={SW}
              strokeLinecap="round" strokeDasharray={CC}
              initial={{ strokeDashoffset: CC }}
              animate={{ strokeDashoffset: CC - (overall / 100) * CC }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>{overall}</span>
            <span style={{ fontSize: 9, color: "var(--text-3)", marginTop: 2 }}>/ 100</span>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
          {DIMS.map((d, i) => (
            <div key={d.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 10, color: "var(--text-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 6 }}>{d.label}</span>
                <span style={{ fontSize: 10, color: "var(--text-2)", fontWeight: 600, flexShrink: 0 }}>{d.score}</span>
              </div>
              <div style={{ height: 2, background: "var(--surface-3)", borderRadius: 999 }}>
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${d.score}%` }} viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: "easeOut" }}
                  style={{ height: "100%", borderRadius: 999, background: sc(d.score) }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ paddingTop: 12, borderTop: "1px solid var(--border)" }}>
        <p style={{ fontSize: 11, color: "var(--text-3)", lineHeight: 1.6 }}>Execution (67) is your weakest dimension.</p>
      </div>
    </div>
  );
}
