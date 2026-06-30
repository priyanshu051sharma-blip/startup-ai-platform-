"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

const DIMS = [
  { label: "Business Model", score: 82, weight: 20, color: "#4F8CFF", rec: "Refine pricing tiers" },
  { label: "Financial",      score: 74, weight: 20, color: "#10B981", rec: "Improve CAC:LTV ratio" },
  { label: "Market",         score: 88, weight: 15, color: "#7C3AED", rec: "Target Tier-2 cities" },
  { label: "Technology",     score: 91, weight: 15, color: "#F59E0B", rec: "Add API documentation" },
  { label: "Execution",      score: 67, weight: 10, color: "#EF4444", rec: "Hire a COO or equivalent" },
  { label: "Competition",    score: 79, weight: 10, color: "#4F8CFF", rec: "Deepen moat via network effects" },
  { label: "Legal",          score: 85, weight:  5, color: "#10B981", rec: "File trademark application" },
  { label: "Innovation",     score: 94, weight:  5, color: "#7C3AED", rec: "Apply for 2 patents" },
];

function Ring({ score, size = 140 }: { score: number; size?: number }) {
  const sw = 9;
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const color = score >= 80 ? "#10B981" : score >= 60 ? "#F59E0B" : "#EF4444";

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        {/* Track */}
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={sw} />
        {/* Glow ring */}
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={sw + 4} strokeDasharray={circ}
          strokeDashoffset={circ - (score / 100) * circ} strokeLinecap="round"
          style={{ filter: `blur(6px)`, opacity: 0.25 }} />
        {/* Progress */}
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={sw}
          strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (score / 100) * circ }}
          transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          style={{ filter: `drop-shadow(0 0 6px ${color}70)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="text-3xl font-bold text-white leading-none"
        >
          {score}
        </motion.span>
        <span className="text-[#737373] text-[11px] mt-0.5">/ 100</span>
      </div>
    </div>
  );
}

export function StartupHealthRing() {
  const overall = Math.round(DIMS.reduce((s, d) => s + (d.score * d.weight) / 100, 0));
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredDim = DIMS.find((d) => d.label === hovered);

  return (
    <div className="widget-elevated p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold text-[14px]">Startup Health Score</h3>
          <p className="text-[#737373] text-[11px] mt-0.5">Updated just now · 8 dimensions</p>
        </div>
        <span
          className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
          style={{ background: "rgba(16,185,129,0.12)", color: "#10B981" }}
        >
          {overall >= 80 ? "Strong" : overall >= 60 ? "Fair" : "At Risk"}
        </span>
      </div>

      <div className="flex items-center gap-5">
        <Ring score={overall} />

        {/* Mini bars */}
        <div className="flex-1 space-y-2">
          {DIMS.map((dim) => (
            <div
              key={dim.label}
              className="group"
              onMouseEnter={() => setHovered(dim.label)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex justify-between text-[11px] mb-0.5">
                <span className="text-[#737373] group-hover:text-white transition-colors cursor-default">{dim.label}</span>
                <span className="font-medium" style={{ color: dim.color }}>{dim.score}</span>
              </div>
              <div className="h-1 bg-white/[0.07] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${dim.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: DIMS.indexOf(dim) * 0.05 }}
                  className="h-full rounded-full"
                  style={{ background: dim.color, boxShadow: `0 0 4px ${dim.color}` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hoveredDim && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="flex items-start gap-2 rounded-xl p-3 text-[11px]"
            style={{ background: `${hoveredDim.color}10`, border: `1px solid ${hoveredDim.color}20` }}
          >
            <Info size={12} style={{ color: hoveredDim.color, flexShrink: 0, marginTop: 1 }} />
            <div>
              <span className="font-medium text-white">{hoveredDim.label}: </span>
              <span className="text-[#B4B4B4]">AI recommends — {hoveredDim.rec}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
