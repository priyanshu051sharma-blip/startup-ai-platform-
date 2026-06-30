"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

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

const Tip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 14px" }}>
      <p className="text-xs font-medium text-white mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-xs" style={{ color: p.color }}>{p.name}: {typeof p.value === "number" && p.value > 999 ? fmt(p.value) : p.value}</p>
      ))}
    </div>
  );
};

const TABS = ["Revenue", "Customers"];

export function RevenueChart() {
  const [tab, setTab] = useState("Revenue");

  return (
    <div className="rounded-2xl p-5" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-white font-medium text-sm">Performance</h2>
          <p className="text-xs mt-0.5" style={{ color: "#525252" }}>Jan – Jun 2025</p>
        </div>
        <div className="flex gap-1 p-1 rounded-lg" style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.06)" }}>
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className="px-3 py-1 rounded-md text-xs font-medium transition-all"
              style={{ background: tab === t ? "#0f0f0f" : "transparent", color: tab === t ? "#f5f5f5" : "#525252" }}>
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
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gExp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fill: "#525252", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#525252", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={fmt} width={44} />
            <Tooltip content={<Tip />} />
            <Area type="monotone" dataKey="revenue"  name="Revenue"  stroke="#6366f1" strokeWidth={1.8} fill="url(#gRev)" dot={false} />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ef4444" strokeWidth={1.5} fill="url(#gExp)" dot={false} strokeDasharray="4 2" />
          </AreaChart>
        ) : (
          <LineChart data={DATA} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fill: "#525252", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#525252", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<Tip />} />
            <Line type="monotone" dataKey="customers" name="Customers" stroke="#6366f1" strokeWidth={1.8}
              dot={{ fill: "#6366f1", r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#6366f1", stroke: "rgba(99,102,241,0.3)", strokeWidth: 6 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
