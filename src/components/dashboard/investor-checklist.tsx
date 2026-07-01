"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ITEMS = [
  { label: "Pitch Deck",          done: true  },
  { label: "Financial Model",     done: true  },
  { label: "Market Research",     done: true  },
  { label: "Customer Traction",   done: true  },
  { label: "Cap Table",           done: false },
  { label: "Legal Documents",     done: false },
  { label: "Term Sheet Template", done: false },
];

export function InvestorChecklist() {
  const [items, setItems] = useState(ITEMS);
  const done = items.filter((i) => i.done).length;
  const pct = Math.round((done / items.length) * 100);

  return (
    <div className="rounded-2xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-medium text-sm">Investor Readiness</h2>
        <span className="text-white font-semibold text-sm">{pct}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full mb-5" style={{ background: "var(--surface-3)" }}>
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: "#6366f1", boxShadow: "0 0 8px rgba(99,102,241,0.4)" }}
        />
      </div>

      {/* Items */}
      <ul className="space-y-2">
        {items.map((item, i) => (
          <motion.li
            key={item.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => setItems((prev) => prev.map((p, j) => j === i ? { ...p, done: !p.done } : p))}
          >
            <div
              className="w-4 h-4 rounded-md flex items-center justify-center flex-shrink-0 transition-all"
              style={{
                background: item.done ? "rgba(99,102,241,0.15)" : "transparent",
                border: item.done ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {item.done && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3.5 6L6.5 2" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <span className="text-xs transition-colors"
              style={{ color: item.done ? "#a0a0a0" : "#525252", textDecoration: item.done ? "none" : "none" }}>
              {item.label}
            </span>
            {!item.done && (
              <span className="ml-auto text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#6366f1" }}>
                Add →
              </span>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
