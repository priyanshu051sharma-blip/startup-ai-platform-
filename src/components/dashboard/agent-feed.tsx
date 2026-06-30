"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const AGENT_COLORS: Record<string, string> = {
  "AI CFO":      "#a5b4fc",
  "AI CEO":      "#fbbf24",
  "AI Investor": "#4ade80",
  "AI CMO":      "#f472b6",
};

const items = [
  { agent: "AI CFO",      msg: "Burn rate reduced 4% this month. Runway extended to 18 months.", time: "2m"  },
  { agent: "AI CEO",      msg: "Market positioning complete. 3 growth vectors identified.",       time: "18m" },
  { agent: "AI Investor", msg: "Investment readiness improved to 84/100. One action can reach 92.", time: "1h"  },
  { agent: "AI CMO",      msg: "GTM strategy draft ready. Review before next sprint begins.",     time: "3h"  },
];

export function AgentFeed() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div>
      <div style={{
        padding: "16px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>AI Team · Today</p>
        <Link href="/dashboard/analysis" style={{ fontSize: 13, color: "#a5b4fc", textDecoration: "none", fontWeight: 500 }}>
          View all →
        </Link>
      </div>
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          onHoverStart={() => setHovered(i)}
          onHoverEnd={() => setHovered(null)}
          style={{
            padding: "14px 20px",
            borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            display: "flex", gap: 12, alignItems: "flex-start",
            background: hovered === i ? "rgba(255,255,255,0.03)" : "transparent",
            transition: "background 0.15s", cursor: "default",
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: AGENT_COLORS[item.agent] ?? "#6366f1", flexShrink: 0, marginTop: 5 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: AGENT_COLORS[item.agent] ?? "#a5b4fc", marginBottom: 4 }}>
              {item.agent}
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.55 }}>{item.msg}</p>
          </div>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", flexShrink: 0, fontWeight: 500 }}>{item.time}</span>
        </motion.div>
      ))}
    </div>
  );
}
