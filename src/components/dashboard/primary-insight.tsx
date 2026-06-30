"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const AGENTS = [
  { name: "CEO",      status: "thinking" as const },
  { name: "CFO",      status: "working"  as const },
  { name: "CTO",      status: "idle"     as const },
  { name: "CMO",      status: "working"  as const },
  { name: "Legal",    status: "idle"     as const },
  { name: "Investor", status: "idle"     as const },
];
const DOT = { thinking: "#f59e0b", working: "#6366f1", idle: "#222" };

export function PrimaryInsight() {
  const h = new Date().getHours();
  const greeting = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{ padding: "28px 28px 24px", borderBottom: "1px solid var(--border)" }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <p style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 8, fontWeight: 500 }}>{greeting}, Prince</p>
          <h1 style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.025em", lineHeight: 1.25, marginBottom: 8 }}>
            Your startup improved by{" "}
            <span style={{ color: "var(--accent)" }}>4 points</span> since last week.
          </h1>
          <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--text-2)", maxWidth: 500 }}>
            Pricing is 23% below market — a 2-day fix that adds ₹18L ARR and raises investment readiness by 12%.
          </p>
        </div>

        <div style={{ display: "flex", gap: 8, flexShrink: 0, alignItems: "center" }}>
          <Link href="/dashboard/analysis" className="btn btn-primary" style={{ fontSize: 13, padding: "8px 18px" }}>
            See recommendation
          </Link>
          <Link href="/dashboard/analysis" className="btn btn-secondary" style={{ fontSize: 13, padding: "8px 18px" }}>
            Run analysis
          </Link>
        </div>
      </div>

      {/* Agent status strip */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.04)", flexWrap: "wrap" }}>
        <p style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>AI Team</p>
        {AGENTS.map((a) => (
          <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <motion.div
              animate={a.status !== "idle" ? { opacity: [1, 0.2, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 5, height: 5, borderRadius: "50%", background: DOT[a.status] }}
            />
            <span style={{ fontSize: 11, color: a.status === "idle" ? "var(--text-3)" : "var(--text-2)" }}>AI {a.name}</span>
          </div>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--text-3)" }}>just now</span>
      </div>
    </motion.div>
  );
}
