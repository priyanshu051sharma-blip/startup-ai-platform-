"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

function useCountUp(target: number, duration = 1000) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true });
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    const ease = (t: number) => 1 - (1 - t) ** 3;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(target * ease(p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return { val, ref };
}

function fmt(n: number, prefix: string, suffix: string, decimals: number): string {
  if (suffix === " mo" || suffix === " Cr") return `${prefix}${n.toFixed(decimals)}${suffix}`;
  if (n >= 10000000) return `${prefix}${(n / 10000000).toFixed(1)} Cr`;
  if (n >= 100000)   return `${prefix}${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)     return `${prefix}${(n / 1000).toFixed(0)}K`;
  return `${prefix}${n.toFixed(decimals)}${suffix}`;
}

function Tile({ label, target, prefix, suffix, decimals, change, up, index }:
  { label: string; target: number; prefix: string; suffix: string; decimals: number; change: string; up: boolean; index: number }) {
  const { val, ref } = useCountUp(target);
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.28 }}
      style={{ padding: "16px 18px" }}
    >
      <p style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 8, fontWeight: 500, letterSpacing: "0.01em" }}>{label}</p>
      <p ref={ref} style={{ fontSize: 21, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 6 }}>
        {fmt(val, prefix, suffix, decimals)}
      </p>
      <p style={{ fontSize: 11, color: up ? "#4ade80" : "#f87171", fontWeight: 500 }}>{change}</p>
    </motion.div>
  );
}

const METRICS = [
  { label: "MRR",       target: 420000,  prefix: "₹", suffix: "",    decimals: 0, change: "+12% mo/mo", up: true  },
  { label: "ARR",       target: 5040000, prefix: "₹", suffix: "",    decimals: 0, change: "+12% mo/mo", up: true  },
  { label: "Customers", target: 847,     prefix: "",  suffix: "",    decimals: 0, change: "+68 this mo", up: true  },
  { label: "Burn",      target: 280000,  prefix: "₹", suffix: "",    decimals: 0, change: "-4% mo/mo",  up: false },
  { label: "Runway",    target: 18,      prefix: "",  suffix: " mo", decimals: 0, change: "healthy",    up: true  },
  { label: "Valuation", target: 3.2,     prefix: "₹", suffix: " Cr", decimals: 1, change: "AI est.",    up: true  },
];

export function MetricRow() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
      {METRICS.map((m, i) => (
        <div key={m.label} style={{ borderRight: i < METRICS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
          <Tile {...m} index={i} />
        </div>
      ))}
    </div>
  );
}
