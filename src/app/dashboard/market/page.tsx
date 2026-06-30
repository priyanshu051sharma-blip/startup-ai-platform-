"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

const TAM_DATA = [
  { segment: "India B2B SaaS", value: 4200, color: "var(--accent)" },
  { segment: "AI Tools",       value: 1800, color: "var(--amber)" },
  { segment: "Startup Tools",  value: 840,  color: "var(--green)" },
  { segment: "Your SOM",       value: 42,   color: "var(--red)" },
];

const RADAR_DATA = [
  { subject: "Market Size",    you: 88, avg: 60 },
  { subject: "Growth Rate",    you: 92, avg: 55 },
  { subject: "Competition",    you: 65, avg: 70 },
  { subject: "Margins",        you: 78, avg: 65 },
  { subject: "Retention",      you: 94, avg: 60 },
  { subject: "NPS",            you: 82, avg: 58 },
];

const COMPETITORS = [
  { name: "Notion",       mrr: "₹12Cr+", users: "30M+", focus: "General workspace",  threat: "low",    score: 42 },
  { name: "Zoho",         mrr: "₹80Cr+", users: "80M+", focus: "Business suite",     threat: "medium", score: 58 },
  { name: "Freshworks",   mrr: "₹120Cr+",users: "50M+", focus: "CRM & support",      threat: "medium", score: 55 },
  { name: "Leher.ai",     mrr: "₹2Cr",   users: "50K",  focus: "Startup community",  threat: "low",    score: 38 },
  { name: "Startup Buddy",mrr: "₹50L",   users: "8K",   focus: "Startup resources",  threat: "high",   score: 72 },
];

const TRENDS = [
  { trend: "AI-first products growing 340% YoY in India",    impact: "high",   icon: "🚀" },
  { trend: "DPIIT recognised startups up 28% in FY24",       impact: "medium", icon: "📋" },
  { trend: "Seed funding down 18% — founders need more DIY", impact: "high",   icon: "💡" },
  { trend: "B2B SaaS multiples compressing (8–10× ARR)",     impact: "medium", icon: "📉" },
  { trend: "Vernacular-first products showing 2× retention",  impact: "low",    icon: "🌐" },
];

const impactColor: Record<string, string> = { high: "var(--green)", medium: "var(--amber)", low: "var(--text-3)" };
const threatBg:   Record<string, string> = { low: "var(--green-light)", medium: "var(--amber-light)", high: "var(--red-light)" };
const threatText: Record<string, string> = { low: "var(--green)",      medium: "var(--amber)",        high: "var(--red)" };

function Tip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 14px" }}>
      <p style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 4 }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>₹{p.value}Cr</p>
      ))}
    </div>
  );
}

export default function MarketPage() {
  return (
    <div style={{ padding: "28px 32px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text)" }}>Market Intelligence</h1>
        <p style={{ fontSize: 14, color: "var(--text-2)", marginTop: 4 }}>TAM/SAM/SOM · Competitor map · Market trends</p>
      </div>

      {/* Market sizing */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "TAM", value: "₹4,200Cr", sub: "India B2B SaaS", color: "var(--accent)" },
          { label: "SAM", value: "₹840Cr",   sub: "AI startup tools", color: "var(--amber)" },
          { label: "SOM", value: "₹42Cr",    sub: "3yr target capture", color: "var(--green)" },
          { label: "Growth", value: "38%",   sub: "Market CAGR 2025–28", color: "var(--accent)" },
        ].map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            style={{ padding: "20px 22px", borderRadius: 14, background: "var(--surface)", border: "1px solid var(--border)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: m.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{m.label}</p>
            <p style={{ fontSize: 26, fontWeight: 900, color: "var(--text)", letterSpacing: "-0.04em", lineHeight: 1 }}>{m.value}</p>
            <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 6 }}>{m.sub}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        {/* Bar chart */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>Market Sizing (₹Cr)</h2>
          <p style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 20 }}>Total addressable down to your serviceable share</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={TAM_DATA} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <XAxis dataKey="segment" tick={{ fontSize: 11, fill: "var(--text-3)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--text-3)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="value" name="₹Cr" fill="var(--accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>Competitive Position</h2>
          <p style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 20 }}>You vs. market average across 6 dimensions</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "var(--text-3)" }} />
              <Radar name="You" dataKey="you" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.18} strokeWidth={2} />
              <Radar name="Market Avg" dataKey="avg" stroke="var(--amber)" fill="var(--amber)" fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="4 2" />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Competitors */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, marginBottom: 24 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>Competitor Landscape</h2>
        <p style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 20 }}>Direct and indirect competitors — threat-scored by AI</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {COMPETITORS.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", borderRadius: 12, background: "var(--surface-2)", border: "1px solid var(--border)" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--surface-3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "var(--accent)", flexShrink: 0 }}>
                {c.name[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{c.name}</p>
                <p style={{ fontSize: 12, color: "var(--text-3)" }}>{c.focus}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>{c.mrr}</p>
                <p style={{ fontSize: 11, color: "var(--text-3)" }}>{c.users} users</p>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: threatBg[c.threat], color: threatText[c.threat], flexShrink: 0 }}>
                {c.threat} threat
              </span>
              <div style={{ width: 80, flexShrink: 0 }}>
                <div style={{ height: 4, background: "var(--border)", borderRadius: 999 }}>
                  <div style={{ height: "100%", width: `${c.score}%`, background: threatText[c.threat], borderRadius: 999 }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trends */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>Market Trends</h2>
        <p style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 20 }}>Macro signals relevant to your startup</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {TRENDS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, background: "var(--surface-2)", border: "1px solid var(--border)" }}>
              <span style={{ fontSize: 20 }}>{t.icon}</span>
              <p style={{ flex: 1, fontSize: 13, color: "var(--text)", lineHeight: 1.5 }}>{t.trend}</p>
              <span style={{ fontSize: 11, fontWeight: 700, color: impactColor[t.impact], flexShrink: 0 }}>{t.impact} impact</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
