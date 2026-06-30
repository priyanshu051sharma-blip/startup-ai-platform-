"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getUser } from "@/lib/auth";

const AGENTS = [
  { name: "CEO",      active: true  },
  { name: "CFO",      active: true  },
  { name: "CTO",      active: false },
  { name: "CMO",      active: true  },
  { name: "Legal",    active: false },
  { name: "Investor", active: false },
];

const TICKER_ITEMS = "MRR ₹4.2L  ·  HEALTH 81/100  ·  RUNWAY 18 MONTHS  ·  VALUATION ₹3.2Cr  ·  CUSTOMERS 847  ·  BURN ₹2.8L  ·  ARR ₹50.4L  ·  PITCH SCORE 94/100";

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
    ? "Your idea has strong potential."
    : "Your startup is up 4 points this week.";

  const sub = stage === "ideation"
    ? "Your AI team found 3 market opportunities and 2 key risks to address."
    : "Raising pricing 23% adds ₹18L ARR. Your AI team has the implementation plan ready.";

  return (
    <div style={{
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      background: "rgba(4,4,10,0.92)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
    }}>
      {/* Live ticker */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        overflow: "hidden", height: 34,
        display: "flex", alignItems: "center",
        background: "rgba(99,102,241,0.04)",
      }}>
        <div className="marquee" style={{ display: "flex", whiteSpace: "nowrap" }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} style={{
              fontSize: 11, fontWeight: 600, color: "rgba(165,180,252,0.5)",
              letterSpacing: "0.06em", paddingRight: 60,
            }}>
              {TICKER_ITEMS}
            </span>
          ))}
        </div>
      </div>

      <div style={{ padding: "32px 32px 28px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.35)", marginBottom: 10, letterSpacing: "0.02em" }}>
              {greeting}, <span style={{ color: "rgba(165,180,252,0.8)", fontWeight: 600 }}>{name}</span>
            </motion.p>

            {/* Main headline */}
            <div style={{ overflow: "hidden", marginBottom: 12 }}>
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: "clamp(22px, 2.8vw, 36px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                }}>
                {headline}
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, maxWidth: 520 }}>
              {sub}
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            style={{ display: "flex", gap: 10, flexShrink: 0, alignItems: "flex-start", paddingTop: 28 }}>
            <Link href="/dashboard/analysis" style={{
              padding: "10px 22px", borderRadius: 8,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#ffffff", fontSize: 14, fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 0 20px rgba(99,102,241,0.3)",
              display: "inline-flex", alignItems: "center", gap: 6,
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(99,102,241,0.5)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(99,102,241,0.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              {stage === "ideation" ? "Validate idea →" : "See recommendation →"}
            </Link>
            <Link href="/dashboard/analysis" style={{
              padding: "10px 22px", borderRadius: 8,
              background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)",
              fontSize: 14, fontWeight: 500,
              textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)",
              display: "inline-flex", alignItems: "center",
              transition: "border-color 0.15s, background 0.15s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}>
              Run analysis
            </Link>
          </motion.div>
        </div>

        {/* Agent status row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)", flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            AI Team
          </span>
          {AGENTS.map((a, i) => (
            <motion.div key={a.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 + i * 0.05 }}
              style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div className={a.active ? "pulse-dot" : ""} style={{
                width: 6, height: 6, borderRadius: "50%",
                background: a.active ? "#a5b4fc" : "rgba(255,255,255,0.12)",
              }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: a.active ? "rgba(165,180,252,0.8)" : "rgba(255,255,255,0.2)" }}>
                AI {a.name}
              </span>
            </motion.div>
          ))}
          <span style={{ marginLeft: "auto", fontSize: 12, color: "rgba(255,255,255,0.2)" }}>Just now</span>
        </motion.div>
      </div>
    </div>
  );
}
