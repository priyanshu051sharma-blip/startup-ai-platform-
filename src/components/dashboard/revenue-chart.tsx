"use client";

import { useState } from "react";
import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

const DATA = [
  { month: "Jan", revenue: 180000, expenses: 220000, customers: 420 },
  { month: "Feb", revenue: 220000, expenses: 225000, customers: 490 },
  { month: "Mar", revenue: 260000, expenses: 240000, customers: 560 },
  { month: "Apr", revenue: 300000, expenses: 250000, customers: 620 },
  { month: "May", revenue: 360000, expenses: 265000, customers: 710 },
  { month: "Jun", revenue: 420000, expenses: 280000, customers: 847 },
];

function fmt(v: number) {
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
  return `₹${(v / 1000).toFixed(0)}K`;
}

function Tip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 14px" }}>
      <p style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ fontSize: 12, color: p.color, marginBottom: 2 }}>
          {p.name}: {p.value > 999 ? fmt(p.value) : p.value}
        </p>
      ))}
    </div>
  );
}

export function RevenueChart() {
  const [tab, setTab] = useState<"Revenue" | "Customers">("Revenue");

  return (
    <div
      style={{
        borderRadius: 16,
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "20px 24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: "#f5f5f5" }}>Performance</p>
          <p style={{ fontSize: 11, color: "#444", marginTop: 2 }}>Jan – Jun 2025</p>
        </div>
        <div
          style={{
            display: "flex",
            gap: 2,
            padding: 3,
            background: "#141414",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 10,
          }}
        >
          {(["Revenue", "Customers"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "5px 14px",
                borderRadius: 7,
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                border: "none",
                background: tab === t ? "#0f0f0f" : "transparent",
                color: tab === t ? "#f5f5f5" : "#444",
                transition: "all 0.15s",
                outline: tab === t ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        {tab === "Revenue" ? (
          <AreaChart data={DATA} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.14} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gExp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.08} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fill: "#444", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#444", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={fmt} width={44} />
            <Tooltip content={<Tip />} />
            <Area type="monotone" dataKey="revenue"  name="Revenue"  stroke="#6366f1" strokeWidth={1.8} fill="url(#gRev)" dot={false} />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ef4444" strokeWidth={1.5} fill="url(#gExp)" dot={false} strokeDasharray="4 2" />
          </AreaChart>
        ) : (
          <LineChart data={DATA} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fill: "#444", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#444", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<Tip />} />
            <Line
              type="monotone"
              dataKey="customers"
              name="Customers"
              stroke="#6366f1"
              strokeWidth={1.8}
              dot={{ fill: "#6366f1", r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#6366f1", stroke: "rgba(99,102,241,0.3)", strokeWidth: 6 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
