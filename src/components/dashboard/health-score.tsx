"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const DIMS = [
  { label: "Business Model", score: 82 },
  { label: "Financial",      score: 74 },
  { label: "Market",         score: 88 },
  { label: "Technology",     score: 91 },
  { label: "Execution",      score: 67 },
  { label: "Legal",          score: 85 },
];

const overall = Math.round(DIMS.reduce((s, d) => s + d.score, 0) / DIMS.length);

export function HealthScore() {
  const [hovered, setHovered] = useState<string | null>(null);
  const size = 100;
  const sw = 7;
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;

  return (
    <div className="rounded-2xl p-5" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-medium text-sm">Health Score</h2>
        <span className="pill pill-accent text-[10px]" style={{ fontSize: 10 }}>
          {overall >= 80 ? "Strong" : overall >= 60 ? "Fair" : "At Risk"}
        </span>
      </div>

      <div className="flex items-center gap-5 mb-4">
        {/* Ring */}
        <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
            <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={sw} />
            <motion.circle
              cx={size/2} cy={size/2} r={r}
              fill="none" stroke="#6366f1" strokeWidth={sw} strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: circ - (overall / 100) * circ }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
              style={{ filter: "drop-shadow(0 0 5px rgba(99,102,241,0.5))" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white font-bold text-2xl leading-none">{overall}</span>
            <span className="text-[10px] mt-0.5" style={{ color: "#525252" }}>/ 100</span>
          </div>
        </div>

        {/* Bars */}
        <div className="flex-1 space-y-2.5 min-w-0">
          {DIMS.map((d, i) => (
            <div key={d.label}
              onMouseEnter={() => setHovered(d.label)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex justify-between text-[10px] mb-0.5">
                <span style={{ color: hovered === d.label ? "#f5f5f5" : "#525252", transition: "color 0.15s" }} className="truncate pr-2">
                  {d.label}
                </span>
                <span style={{ color: "#a0a0a0" }} className="flex-shrink-0">{d.score}</span>
              </div>
              <div style={{ height: 2.5, background: "rgba(255,255,255,0.06)", borderRadius: 999 }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${d.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: "easeOut" }}
                  style={{
                    height: "100%", borderRadius: 999,
                    background: d.score >= 80 ? "#6366f1" : d.score >= 70 ? "#f59e0b" : "#ef4444",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
