"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

function useCountUp(target: number, duration = 900) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
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
  if (suffix.includes("Cr") || suffix.includes("mo")) return `${prefix}${n.toFixed(decimals)}${suffix}`;
  if (n >= 10000000) return `${prefix}${(n / 10000000).toFixed(1)} Cr`;
  if (n >= 100000)   return `${prefix}${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)     return `${prefix}${(n / 1000).toFixed(0)}K`;
  return `${prefix}${n.toFixed(decimals)}${suffix}`;
}

function Metric({ label, target, prefix, suffix, decimals, change, up, sub, index }:
  { label: string; target: number; prefix: string; suffix: string; decimals: number; change: string; up: boolean; sub: string; index: number }) {
  const { val, ref } = useCountUp(target);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      style={{
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14,
        padding: "16px 18px",
      }}
    >
      <p style={{ fontSize: 11, color: "#525252", marginBottom: 8, fontWeight: 500 }}>{label}</p>
      <p ref={ref} style={{ fontSize: 20, fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 6 }}>
        {fmt(val, prefix, suffix, decimals)}
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: up ? "#4ade80" : "#f87171" }}>{change}</span>
        <span style={{ fontSize: 10, color: "#525252" }}>{sub}</span>
      </div>
    </motion.div>
  );
}

const METRICS = [
  { label: "Monthly Revenue", target: 420000,  prefix: "₹", suffix: "",     decimals: 0, change: "+12%",    up: true,  sub: "vs last month" },
  { label: "Annual Run Rate", target: 5040000, prefix: "₹", suffix: "",     decimals: 0, change: "+12%",    up: true,  sub: "ARR"            },
  { label: "Customers",       target: 847,     prefix: "",  suffix: "",     decimals: 0, change: "+8%",     up: true,  sub: "+68 this month" },
  { label: "Burn Rate",       target: 280000,  prefix: "₹", suffix: "",     decimals: 0, change: "-4%",     up: false, sub: "per month"      },
  { label: "Runway",          target: 18,      prefix: "",  suffix: " mo",  decimals: 0, change: "healthy", up: true,  sub: "at current burn"},
  { label: "Valuation",       target: 3.2,     prefix: "₹", suffix: " Cr",  decimals: 1, change: "est.",    up: true,  sub: "AI estimated"   },
];

export function MetricRow() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
      {METRICS.map((m, i) => <Metric key={m.label} {...m} index={i} />)}
    </div>
  );
}
