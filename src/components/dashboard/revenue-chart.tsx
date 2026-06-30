"use client";

import { useState } from "react";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DATA = [
  { month: "JAN", revenue: 180000, expenses: 220000, customers: 420 },
  { month: "FEB", revenue: 220000, expenses: 225000, customers: 490 },
  { month: "MAR", revenue: 260000, expenses: 240000, customers: 560 },
  { month: "APR", revenue: 300000, expenses: 250000, customers: 620 },
  { month: "MAY", revenue: 360000, expenses: 265000, customers: 710 },
  { month: "JUN", revenue: 420000, expenses: 280000, customers: 847 },
];

const fmt = (v: number) => v >= 100000 ? `₹${(v / 100000).toFixed(1)}L` : `₹${(v / 1000).toFixed(0)}K`;

function Tip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(8,8,22,0.98)",
      border: "1px solid rgba(99,102,241,0.2)",
      borderRadius: 10, padding: "12px 16px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    }}>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 8, fontWeight: 600, letterSpacing: "0.04em" }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ fontSize: 13, color: "#ffffff", marginBottom: 3, fontWeight: 600 }}>
          <span style={{ color: p.color, marginRight: 6 }}>●</span>
          {p.name}: {p.value > 999 ? fmt(p.value) : p.value}
        </p>
      ))}
    </div>
  );
}

export function RevenueChart() {
  const [tab, setTab] = useState<"Revenue" | "Customers">("Revenue");

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 10 }}>
            Performance
          </p>
          <div style={{ display: "flex", gap: 28 }}>
            {[
              { label: "MRR", val: "₹4.2L", change: "+12%", up: true },
              { label: "Burn", val: "₹2.8L", change: "-4%", up: false },
              { label: "Net",  val: "₹1.4L", change: "Positive", up: true },
            ].map((m, idx) => (
              <div key={m.label} style={{ borderLeft: idx > 0 ? "1px solid rgba(255,255,255,0.07)" : "none", paddingLeft: idx > 0 ? 28 : 0 }}>
                <p style={{ fontSize: 26, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1 }}>{m.val}</p>
                <p style={{ fontSize: 12, color: m.up ? "#4ade80" : "#f87171", marginTop: 5, fontWeight: 600 }}>{m.label} {m.change}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 2, padding: 3, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8 }}>
          {(["Revenue", "Customers"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{
                padding: "5px 14px", borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: "pointer",
                border: "none", fontFamily: "inherit", transition: "all 0.15s",
                background: tab === t ? "rgba(99,102,241,0.2)" : "transparent",
                color: tab === t ? "#a5b4fc" : "rgba(255,255,255,0.35)",
              }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={165}>
        {tab === "Revenue" ? (
          <AreaChart data={DATA} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gE" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#f87171" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#f87171" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={fmt} width={44} />
            <Tooltip content={<Tip />} />
            <Area type="monotone" dataKey="revenue"  name="Revenue"  stroke="#6366f1" strokeWidth={2} fill="url(#gR)" dot={false} />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#f87171" strokeWidth={1.5} fill="url(#gE)" dot={false} strokeDasharray="4 3" />
          </AreaChart>
        ) : (
          <LineChart data={DATA} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<Tip />} />
            <Line type="monotone" dataKey="customers" name="Customers" stroke="#a5b4fc" strokeWidth={2}
              dot={{ fill: "#a5b4fc", r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#a5b4fc", stroke: "rgba(165,180,252,0.3)", strokeWidth: 6 }} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
