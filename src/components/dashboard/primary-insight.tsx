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

const DOT_COLOR = { thinking: "#f59e0b", working: "#6366f1", idle: "#2a2a2a" };

export function PrimaryInsight() {
  const h = new Date().getHours();
  const greeting = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        padding: "32px 36px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <p style={{ fontSize: 12, color: "#444", marginBottom: 10 }}>{greeting}, Prince</p>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <h1
            style={{
              fontSize: "clamp(22px, 2.5vw, 32px)",
              fontWeight: 700,
              color: "#f5f5f5",
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              marginBottom: 12,
            }}
          >
            Your startup improved by{" "}
            <span style={{ color: "#6366f1" }}>4 points</span> since last week.
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#888", maxWidth: 520 }}>
            One change could raise investment readiness by 12%. Your pricing is 23% below market — a 2-day fix that adds ₹18L ARR.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexShrink: 0, flexWrap: "wrap" }}>
          <Link href="/dashboard/analysis" className="btn btn-primary" style={{ fontSize: 13, padding: "9px 20px" }}>
            See recommendation →
          </Link>
          <Link href="/dashboard/analysis" className="btn btn-secondary" style={{ fontSize: 13, padding: "9px 20px" }}>
            Run full analysis
          </Link>
        </div>
      </div>

      {/* Agent strip */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 24, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, color: "#2a2a2a", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>AI Team</span>
        {AGENTS.map((a) => (
          <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <motion.div
              animate={a.status !== "idle" ? { opacity: [1, 0.2, 1] } : {}}
              transition={{ duration: 1.4, repeat: Infinity }}
              style={{ width: 5, height: 5, borderRadius: "50%", background: DOT_COLOR[a.status] }}
            />
            <span style={{ fontSize: 12, color: "#444" }}>AI {a.name}</span>
          </div>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 12, color: "#2a2a2a" }}>Updated just now</span>
      </div>
    </motion.div>
  );
}
