"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ReferenceLine,
} from "recharts";

// ─── Data ────────────────────────────────────────────────────────────────────

const REVENUE_DATA = [
  { month: "Jan", revenue: 420000, expenses: 310000, profit: 110000 },
  { month: "Feb", revenue: 480000, expenses: 330000, profit: 150000 },
  { month: "Mar", revenue: 510000, expenses: 345000, profit: 165000 },
  { month: "Apr", revenue: 560000, expenses: 360000, profit: 200000 },
  { month: "May", revenue: 620000, expenses: 390000, profit: 230000 },
  { month: "Jun", revenue: 690000, expenses: 410000, profit: 280000 },
  { month: "Jul", revenue: 750000, expenses: 435000, profit: 315000 },
  { month: "Aug", revenue: 820000, expenses: 460000, profit: 360000 },
  { month: "Sep", revenue: 870000, expenses: 480000, profit: 390000 },
  { month: "Oct", revenue: 940000, expenses: 510000, profit: 430000 },
  { month: "Nov", revenue: 1010000, expenses: 540000, profit: 470000 },
  { month: "Dec", revenue: 1100000, expenses: 570000, profit: 530000 },
];

const CASHFLOW_DATA = [
  { month: "Jan", inflow: 950000, outflow: -680000, net: 270000 },
  { month: "Feb", inflow: 1020000, outflow: -720000, net: 300000 },
  { month: "Mar", inflow: 1100000, outflow: -740000, net: 360000 },
  { month: "Apr", inflow: 1180000, outflow: -790000, net: 390000 },
  { month: "May", inflow: 1250000, outflow: -820000, net: 430000 },
  { month: "Jun", inflow: 1340000, outflow: -860000, net: 480000 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number, unit = "₹") {
  if (n >= 10000000) return `${unit}${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000)   return `${unit}${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)     return `${unit}${(n / 1000).toFixed(0)}K`;
  return `${unit}${n}`;
}

const totalRevenue  = REVENUE_DATA.reduce((s, d) => s + d.revenue, 0);
const totalExpenses = REVENUE_DATA.reduce((s, d) => s + d.expenses, 0);
const grossProfit   = REVENUE_DATA.reduce((s, d) => s + d.profit, 0);
const cogs          = Math.round(totalRevenue * 0.38);
const netIncome     = Math.round(grossProfit * 0.68);
const grossMargin   = Math.round((grossProfit / totalRevenue) * 100);

const PNL = [
  { label: "Revenue",      value: totalRevenue,  delta: "+22%",  color: "var(--accent)" },
  { label: "COGS",         value: cogs,           delta: "+14%",  color: "var(--amber)" },
  { label: "Gross Profit", value: grossProfit,    delta: "+29%",  color: "var(--green)" },
  { label: "Net Income",   value: netIncome,      delta: "+31%",  color: "var(--green)" },
];

const BURN_MONTHS = [
  { month: "Jul", burn: 510000, runway: 18.2 },
  { month: "Aug", burn: 488000, runway: 19.4 },
  { month: "Sep", burn: 470000, runway: 20.1 },
  { month: "Oct", burn: 455000, runway: 21.3 },
  { month: "Nov", burn: 435000, runway: 22.8 },
  { month: "Dec", burn: 418000, runway: 24.1 },
];

const UNIT_ECONOMICS = [
  { label: "CAC",           value: "₹8,200",  sub: "Cost to acquire 1 customer",  color: "var(--amber)" },
  { label: "LTV",           value: "₹42,500", sub: "Lifetime value per customer", color: "var(--green)" },
  { label: "LTV : CAC",     value: "5.2x",    sub: "Target: >3x",                 color: "var(--accent)" },
  { label: "Payback Period",value: "7.4 mo",  sub: "Target: <12 months",          color: "var(--green)" },
  { label: "Churn Rate",    value: "2.1%",    sub: "Monthly, industry avg 3.2%",  color: "var(--green)" },
  { label: "NRR",           value: "118%",    sub: "Net revenue retention",       color: "var(--accent)" },
];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function RevenueTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 14px", fontSize: 13 }}>
      <p style={{ fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{label}</p>
      {payload.map(p => (
        <div key={p.name} style={{ display: "flex", justifyContent: "space-between", gap: 20, color: "var(--text-2)", marginBottom: 2 }}>
          <span style={{ color: p.color }}>{p.name}</span>
          <span style={{ fontWeight: 600, color: "var(--text)" }}>{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<"revenue" | "cashflow">("revenue");

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1200, margin: "0 auto", color: "var(--text)" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text)" }}>
          Financial Dashboard
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-2)", marginTop: 4 }}>
          FY 2024 · Last updated: Today at 09:41 AM
        </p>
      </div>

      {/* P&L Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        {PNL.map(card => (
          <div key={card.label} style={{ padding: "20px 22px", borderRadius: 14, background: "var(--surface)", border: "1px solid var(--border)" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-2)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>{card.label}</p>
            <p style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text)" }}>{fmt(card.value)}</p>
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--green)", background: "var(--green-light)", padding: "2px 8px", borderRadius: 999 }}>{card.delta}</span>
              <span style={{ fontSize: 12, color: "var(--text-3)" }}>vs last year</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "24px", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>Revenue &amp; Expenses</h2>
            <p style={{ fontSize: 13, color: "var(--text-2)", marginTop: 2 }}>12-month trailing · Gross margin {grossMargin}%</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {(["revenue", "cashflow"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                  border: "1px solid var(--border)", cursor: "pointer",
                  background: activeTab === tab ? "var(--accent)" : "transparent",
                  color: activeTab === tab ? "#fff" : "var(--text-2)",
                  transition: "all 0.15s",
                }}
              >
                {tab === "revenue" ? "Revenue" : "Cash Flow"}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "revenue" ? (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={REVENUE_DATA} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--accent)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--amber)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="var(--amber)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--green)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--green)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--text-3)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "var(--text-3)" }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v)} />
              <Tooltip content={<RevenueTooltip />} />
              <Area type="monotone" dataKey="revenue"  name="Revenue"  stroke="var(--accent)" strokeWidth={2} fill="url(#revGrad)" dot={false} />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="var(--amber)"  strokeWidth={2} fill="url(#expGrad)" dot={false} />
              <Area type="monotone" dataKey="profit"   name="Profit"   stroke="var(--green)"  strokeWidth={2} fill="url(#profGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={CASHFLOW_DATA} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--text-3)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "var(--text-3)" }} axisLine={false} tickLine={false} tickFormatter={v => fmt(Math.abs(v))} />
              <Tooltip content={<RevenueTooltip />} />
              <ReferenceLine y={0} stroke="var(--border-2)" />
              <Bar dataKey="inflow"  name="Inflow"  fill="var(--green)" radius={[4,4,0,0]} />
              <Bar dataKey="outflow" name="Outflow" fill="var(--red)"   radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Bottom row: Burn Rate + Unit Economics */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Burn Rate Tracker */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>Burn Rate Tracker</h2>
          <p style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 20 }}>Monthly burn declining — runway extending</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
            <div style={{ padding: "14px 16px", borderRadius: 12, background: "var(--surface-2)" }}>
              <p style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Current Burn</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", marginTop: 4 }}>₹4.2L</p>
              <p style={{ fontSize: 11, color: "var(--green)", marginTop: 2 }}>↓ 18% MoM</p>
            </div>
            <div style={{ padding: "14px 16px", borderRadius: 12, background: "var(--surface-2)" }}>
              <p style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Cash Balance</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", marginTop: 4 }}>₹9.8Cr</p>
              <p style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>as of today</p>
            </div>
            <div style={{ padding: "14px 16px", borderRadius: 12, background: "var(--surface-2)" }}>
              <p style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Runway</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: "var(--green)", letterSpacing: "-0.04em", marginTop: 4 }}>24 mo</p>
              <p style={{ fontSize: 11, color: "var(--green)", marginTop: 2 }}>↑ Healthy</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {BURN_MONTHS.map(b => (
              <div key={b.month} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, color: "var(--text-3)", width: 28, flexShrink: 0 }}>{b.month}</span>
                <div style={{ flex: 1, height: 6, borderRadius: 999, background: "var(--border)", overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 999,
                    width: `${(b.burn / 600000) * 100}%`,
                    background: b.burn > 480000 ? "var(--amber)" : "var(--green)",
                    transition: "width 0.5s ease",
                  }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", width: 52, textAlign: "right", flexShrink: 0 }}>{fmt(b.burn)}</span>
                <span style={{ fontSize: 11, color: "var(--text-3)", width: 44, flexShrink: 0 }}>{b.runway}mo</span>
              </div>
            ))}
          </div>
        </div>

        {/* Unit Economics */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>Unit Economics</h2>
          <p style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 20 }}>Key efficiency metrics at a glance</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {UNIT_ECONOMICS.map(u => (
              <div key={u.label} style={{ padding: "16px 18px", borderRadius: 12, background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                <p style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{u.label}</p>
                <p style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", color: u.color }}>{u.value}</p>
                <p style={{ fontSize: 11, color: "var(--text-3)", marginTop: 4, lineHeight: 1.4 }}>{u.sub}</p>
              </div>
            ))}
          </div>

          {/* LTV:CAC gauge hint */}
          <div style={{ marginTop: 20, padding: "14px 16px", borderRadius: 12, background: "var(--accent-light)", border: "1px solid var(--accent-glow)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)" }}>LTV:CAC Health</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: "var(--accent)" }}>5.2x</span>
            </div>
            <div style={{ height: 6, borderRadius: 999, background: "var(--border)", overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 999, width: "74%", background: "var(--accent)" }} />
            </div>
            <p style={{ fontSize: 11, color: "var(--text-2)", marginTop: 6 }}>Excellent — industry best practice is &gt;3x</p>
          </div>
        </div>
      </div>
    </div>
  );
}
