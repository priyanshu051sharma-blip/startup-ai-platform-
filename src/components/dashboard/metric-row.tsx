"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

function useCountUp(target: number, duration = 1100) {
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
  if (suffix === " mo" || suffix === " Cr") return `${prefix}${n.toFixed(decimals)}${suffix}`;
  if (n >= 10000000) return `${prefix}${(n / 10000000).toFixed(1)} Cr`;
  if (n >= 100000)   return `${prefix}${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)     return `${prefix}${(n / 1000).toFixed(0)}K`;
  return `${prefix}${n.toFixed(decimals)}${suffix}`;
}

const ACCENT_COLORS = [
  "rgba(99,102,241,0.6)",   // indigo
  "rgba(139,92,246,0.6)",   // violet
  "rgba(34,211,238,0.6)",   // cyan
  "rgba(255,23,68,0.5)",    // red
  "rgba(0,230,118,0.6)",    // green
  "rgba(251,191,36,0.6)",   // amber
];

function Tile({ label, target, prefix, suffix, decimals, change, up, index }: {
  label: string; target: number; prefix: string; suffix: string;
  decimals: number; change: string; up: boolean; index: number;
}) {
  const { val, ref } = useCountUp(target);
  const [hovered, setHovered] = useState(false);
  const color = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        padding: "24px 22px",
        background: hovered ? "var(--surface-3)" : "var(--surface-2)",
        backdropFilter: "blur(12px)",
        transition: "background 0.2s",
        cursor: "default", position: "relative", overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: hovered ? color : "transparent", transition: "background 0.2s" }} />

      <p style={{
        fontSize: 11, fontWeight: 600,
        color: "var(--text-3)",
        letterSpacing: "0.07em", textTransform: "uppercase",
        marginBottom: 12,
      }}>
        {label}
      </p>
      <span
        ref={ref}
        style={{
          display: "block",
          fontSize: 30, fontWeight: 800, color: "var(--text)",
          letterSpacing: "-0.04em", lineHeight: 1,
          marginBottom: 10,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {fmt(val, prefix, suffix, decimals)}
      </span>
      <span style={{
        fontSize: 12, fontWeight: 600,
        color: up ? "#4ade80" : "#f87171",
        display: "flex", alignItems: "center", gap: 3,
      }}>
        <span style={{ fontSize: 10 }}>{up ? "▲" : "▼"}</span>
        {change}
      </span>
    </motion.div>
  );
}

const METRICS = [
  { label: "MRR",         target: 420000,  prefix: "₹", suffix: "",    decimals: 0, change: "+12% this month", up: true  },
  { label: "ARR",         target: 5040000, prefix: "₹", suffix: "",    decimals: 0, change: "+12% this month", up: true  },
  { label: "Customers",   target: 847,     prefix: "",  suffix: "",    decimals: 0, change: "+68 this month",  up: true  },
  { label: "Burn Rate",   target: 280000,  prefix: "₹", suffix: "",    decimals: 0, change: "-4% this month",  up: false },
  { label: "Runway",      target: 18,      prefix: "",  suffix: " mo", decimals: 0, change: "Healthy",         up: true  },
  { label: "Valuation",   target: 3.2,     prefix: "₹", suffix: " Cr", decimals: 1, change: "AI estimate",     up: true  },
];

export function MetricRow() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      borderRadius: 12,
      border: "1px solid var(--border)",
      background: "var(--surface)",
      gap: "1px",
      overflow: "hidden",
    }}>
      {METRICS.map((m, i) => (
        <Tile key={m.label} {...m} index={i} />
      ))}
    </div>
  );
}
