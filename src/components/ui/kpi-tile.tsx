"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

// Format for display — keeps numbers short
function fmtValue(num: number, prefix: string, suffix: string, decimals: number): string {
  if (suffix.includes("Cr") || suffix.includes("mo") || suffix.includes("%")) {
    return `${prefix}${num.toFixed(decimals)}${suffix}`;
  }
  if (num >= 10000000) return `${prefix}${(num / 10000000).toFixed(1)} Cr`;
  if (num >= 100000)   return `${prefix}${(num / 100000).toFixed(1)}L`;
  if (num >= 1000)     return `${prefix}${(num / 1000).toFixed(1)}K`;
  return `${prefix}${num.toFixed(decimals)}${suffix}`;
}

function AnimatedValue({ to, prefix, suffix, decimals }: { to: number; prefix: string; suffix: string; decimals: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    const dur = 1200;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(to * ease(p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return <span ref={ref}>{fmtValue(val, prefix, suffix, decimals)}</span>;
}

const colorMap = {
  blue:    { text: "#4F8CFF",  glow: "rgba(79,140,255,0.15)"   },
  purple:  { text: "#7C3AED",  glow: "rgba(124,58,237,0.15)"  },
  emerald: { text: "#10B981",  glow: "rgba(16,185,129,0.15)"  },
  warning: { text: "#F59E0B",  glow: "rgba(245,158,11,0.15)"  },
  error:   { text: "#EF4444",  glow: "rgba(239,68,68,0.15)"   },
};

interface KpiTileProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  change?: number;
  color?: "blue" | "purple" | "emerald" | "warning" | "error";
  className?: string;
  index?: number;
  sublabel?: string;
}

export function KpiTile({ label, value, prefix = "", suffix = "", decimals = 0, change, color = "blue", className, index = 0, sublabel }: KpiTileProps) {
  const c = colorMap[color];
  const isPos = change !== undefined && change > 0;
  const isNeg = change !== undefined && change < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      whileHover={{ y: -3 }}
      className={cn("relative rounded-[20px] p-4 flex flex-col gap-2 overflow-hidden", className)}
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 18px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Colour bleed */}
      <div className="absolute top-0 right-0 w-16 h-16 rounded-full pointer-events-none"
        style={{ background: c.glow, filter: "blur(24px)", transform: "translate(30%,-30%)" }} />

      <p className="text-[#737373] text-[11px] font-medium uppercase tracking-wider truncate relative">{label}</p>

      <p className="text-xl font-bold leading-none relative truncate" style={{ color: c.text }}>
        <AnimatedValue to={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </p>

      {sublabel && <p className="text-[#737373] text-[10px] truncate relative">{sublabel}</p>}

      {change !== undefined && (
        <div className="flex items-center gap-1 text-[10px] font-semibold rounded-full px-2 py-0.5 w-fit relative"
          style={{
            background: isPos ? "rgba(16,185,129,0.12)" : isNeg ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.05)",
            color: isPos ? "#10B981" : isNeg ? "#EF4444" : "#737373",
          }}
        >
          {isPos && <TrendingUp size={9} />}
          {isNeg && <TrendingDown size={9} />}
          {!isPos && !isNeg && <Minus size={9} />}
          <span>{isPos ? "+" : ""}{change}%</span>
        </div>
      )}
    </motion.div>
  );
}
