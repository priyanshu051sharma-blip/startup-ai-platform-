"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getUser } from "@/lib/auth";

const AGENTS = [
  { name: "CEO",      status: "thinking" as const },
  { name: "CFO",      status: "working"  as const },
  { name: "CTO",      status: "idle"     as const },
  { name: "CMO",      status: "working"  as const },
  { name: "Legal",    status: "idle"     as const },
  { name: "Investor", status: "idle"     as const },
];
const DOT = { thinking: "#f59e0b", working: "var(--accent)", idle: "var(--surface-3)" };

export function PrimaryInsight() {
  const [name, setName] = useState("Founder");
  const [stage, setStage] = useState("launched");

  useEffect(() => {
    const user = getUser();
    if (user) {
      setName(user.name.split(" ")[0]);
      setStage(user.startup?.stage ?? "launched");
    }
  }, []);

  const h = new Date().getHours();
  const greeting = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";

  const headline = stage === "ideation"
    ? <>Your idea <span style={{ color: "var(--accent)" }}>has strong potential.</span> Let&apos;s validate it.</>
    : <>Your startup improved by <span style={{ color: "var(--accent)" }}>4 points</span> since last week.</>;

  const sub = stage === "ideation"
    ? "Your AI team is analyzing your idea. We found 3 market opportunities and 2 risks to address first."
    : "One change could raise investment readiness by 12%. Pricing is 23% below market — a 2-day fix adding ₹18L ARR.";

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
      style={{ padding: "24px 28px 20px", borderBottom: "1px solid var(--border)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <p style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 7, fontWeight: 500 }}>{greeting}, {name}</p>
          <h1 style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.025em", lineHeight: 1.3, marginBottom: 7 }}>
            {headline}
          </h1>
          <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--text-2)", maxWidth: 500 }}>{sub}</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <Link href="/dashboard/analysis" className="btn btn-primary" style={{ fontSize: 13, padding: "8px 16px" }}>
            {stage === "ideation" ? "Validate idea →" : "See recommendation →"}
          </Link>
          <Link href="/dashboard/analysis" className="btn btn-secondary" style={{ fontSize: 13, padding: "8px 16px" }}>
            Run analysis
          </Link>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--border)", flexWrap: "wrap" }}>
        <p style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" }}>AI Team</p>
        {AGENTS.map(a => (
          <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <motion.div animate={a.status !== "idle" ? { opacity: [1, 0.2, 1] } : {}} transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 5, height: 5, borderRadius: "50%", background: DOT[a.status] }} />
            <span style={{ fontSize: 11, color: a.status === "idle" ? "var(--text-3)" : "var(--text-2)" }}>AI {a.name}</span>
          </div>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--text-3)" }}>just now</span>
      </div>
    </motion.div>
  );
}
