"use client";

import { useState } from "react";
import Link from "next/link";

const actions = [
  { label: "Run Analysis",    href: "/dashboard/analysis", desc: "Full 360° startup assessment",  color: "#6366f1" },
  { label: "Pitch Simulator", href: "/dashboard/pitch",    desc: "Practice with AI investors",     color: "#4ade80" },
  { label: "Financial Model", href: "/dashboard/finance",  desc: "Revenue & runway projections",   color: "#fbbf24" },
  { label: "Find Grants",     href: "/dashboard/grants",   desc: "Discover funding opportunities", color: "#a5b4fc" },
];

export function QuickActions() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ padding: "16px 20px" }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 14 }}>
        Quick Actions
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {actions.map((a) => (
          <Link key={a.label} href={a.href}
            onMouseEnter={() => setHovered(a.label)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: "14px 14px",
              borderRadius: 10,
              background: hovered === a.label ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${hovered === a.label ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)"}`,
              textDecoration: "none",
              transition: "all 0.15s",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, marginBottom: 8 }} />
            <p style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", marginBottom: 3 }}>{a.label}</p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.4 }}>{a.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
