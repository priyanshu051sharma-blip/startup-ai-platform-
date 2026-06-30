"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const AGENTS = [
  { name: "CEO",     status: "thinking" as const },
  { name: "CFO",     status: "working"  as const },
  { name: "CTO",     status: "idle"     as const },
  { name: "CMO",     status: "working"  as const },
  { name: "Legal",   status: "idle"     as const },
  { name: "Investor",status: "idle"     as const },
];

const statusColor = { thinking: "#f59e0b", working: "#6366f1", idle: "#2a2a2a" };

export function PrimaryInsight() {
  const h = new Date().getHours();
  const greeting = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 18,
        padding: "24px 28px",
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 20 }}>

        {/* Left */}
        <div style={{ flex: 1, minWidth: 260 }}>
          <p style={{ fontSize: 12, color: "#525252", marginBottom: 8 }}>{greeting}, Prince</p>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: "#f5f5f5", lineHeight: 1.35, marginBottom: 10, letterSpacing: "-0.02em" }}>
            Your startup improved by{" "}
            <span style={{ color: "#6366f1" }}>4 points</span> since last week.
          </h1>
          <p style={{ fontSize: 13, lineHeight: 1.65, color: "#a0a0a0", maxWidth: 480 }}>
            One change can increase investment readiness by 12%. Your pricing is 23% below market — AI estimates a 2-day fix that adds ₹18L ARR.
          </p>
        </div>

        {/* Right — actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
          <Link href="/dashboard/analysis" className="btn btn-primary" style={{ fontSize: 13, padding: "9px 20px" }}>
            See recommendation →
          </Link>
          <Link href="/dashboard/analysis" className="btn btn-secondary" style={{ fontSize: 13, padding: "9px 20px", textAlign: "center" }}>
            Run full analysis
          </Link>
        </div>
      </div>

      {/* Agent strip */}
      <div
        style={{
          display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16,
          marginTop: 20, paddingTop: 18,
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <span style={{ fontSize: 11, color: "#525252" }}>AI team</span>
        {AGENTS.map((a) => (
          <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <motion.div
              animate={a.status !== "idle" ? { opacity: [1, 0.3, 1] } : {}}
              transition={{ duration: 1.3, repeat: Infinity }}
              style={{
                width: 5, height: 5, borderRadius: "50%",
                background: statusColor[a.status],
              }}
            />
            <span style={{ fontSize: 11, color: "#525252" }}>AI {a.name}</span>
          </div>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#525252" }}>
          Last updated · just now
        </span>
      </div>
    </motion.div>
  );
}
