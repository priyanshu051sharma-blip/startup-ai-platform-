"use client";

import { motion } from "framer-motion";

const EVENTS = [
  { time: "09:14", title: "Market Research Complete",  detail: "Identified 3 new segments, TAM ₹840Cr",  color: "#6366f1", dot: "working" },
  { time: "06:30", title: "Overnight AI Analysis",     detail: "Health score +3, pricing flagged",        color: "#6366f1", dot: "working" },
  { time: "Yesterday", title: "Financial Model Updated",  detail: "Burn reduced 8% after renegotiation",  color: "#22c55e", dot: "complete" },
  { time: "Yesterday", title: "Investor Report Ready",     detail: "24-page report generated",             color: "#f59e0b", dot: "complete" },
  { time: "Jun 28",    title: "Pitch Score 94/100",        detail: "Best score yet — 3 intros unlocked",   color: "#22c55e", dot: "complete" },
];

export function AiActivity() {
  return (
    <div className="rounded-2xl p-5" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-medium text-sm">AI Activity</h2>
        <span className="text-[10px]" style={{ color: "#525252" }}>{EVENTS.length} events</span>
      </div>

      <div className="space-y-3">
        {EVENTS.map((ev, i) => (
          <motion.div
            key={ev.title}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-start gap-3"
          >
            {/* Dot + line */}
            <div className="flex flex-col items-center flex-shrink-0 pt-1">
              <motion.div
                animate={ev.dot === "working" ? { opacity: [1, 0.4, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                  background: ev.dot === "working" ? "#6366f1" : ev.dot === "complete" ? "#22c55e" : "#525252",
                }}
              />
              {i < EVENTS.length - 1 && (
                <div style={{ width: 1, flex: 1, background: "rgba(255,255,255,0.05)", marginTop: 4, minHeight: 16 }} />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pb-2">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-medium text-white leading-snug">{ev.title}</p>
                <span className="text-[10px] flex-shrink-0 mt-0.5" style={{ color: "#525252" }}>{ev.time}</span>
              </div>
              <p className="text-[11px] mt-0.5 truncate" style={{ color: "#525252" }}>{ev.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
