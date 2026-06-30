"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AnalysisType = "full" | "financial" | "market" | "pitch" | "swot" | "health";

const ANALYSIS_TYPES: { id: AnalysisType; label: string; desc: string; agent: string }[] = [
  { id: "full",      label: "Full Analysis",    desc: "Complete 360° startup assessment across all dimensions", agent: "All Agents" },
  { id: "financial", label: "Financial",        desc: "Revenue, burn, runway, projections and unit economics",  agent: "AI CFO" },
  { id: "market",    label: "Market",           desc: "TAM/SAM/SOM, competitive landscape, positioning",       agent: "AI CEO" },
  { id: "pitch",     label: "Pitch Deck",       desc: "Score your deck slide-by-slide with investor feedback",  agent: "AI Investor" },
  { id: "swot",      label: "SWOT",             desc: "Evidence-backed strengths, weaknesses, opportunities",  agent: "AI CEO" },
  { id: "health",    label: "Health Score",     desc: "Detailed health score breakdown with quick wins",       agent: "All Agents" },
];

export default function AnalysisPage() {
  const [selected, setSelected] = useState<AnalysisType>("full");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: selected }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Analysis failed");
      setResult(json.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 36px" }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 11, color: "#444", marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          AI Analysis Engine
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.03em", marginBottom: 8 }}>
          Run Startup Analysis
        </h1>
        <p style={{ fontSize: 14, color: "#888" }}>
          Choose an analysis type and get AI-powered insights in seconds.
        </p>
      </div>

      {/* Analysis type grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 32 }} className="max-md:grid-cols-2 max-sm:grid-cols-1">
        {ANALYSIS_TYPES.map((t) => (
          <motion.button
            key={t.id}
            onClick={() => { setSelected(t.id); setResult(null); setError(null); }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            style={{
              padding: "20px 20px",
              borderRadius: 14,
              textAlign: "left",
              cursor: "pointer",
              border: selected === t.id ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.06)",
              background: selected === t.id ? "rgba(99,102,241,0.08)" : "#0f0f0f",
              transition: "all 0.15s",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: selected === t.id ? "#a5b4fc" : "#f5f5f5" }}>{t.label}</p>
              <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, background: selected === t.id ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.06)", color: selected === t.id ? "#a5b4fc" : "#444", fontWeight: 500 }}>
                {t.agent}
              </span>
            </div>
            <p style={{ fontSize: 12, color: "#888", lineHeight: 1.55 }}>{t.desc}</p>
          </motion.button>
        ))}
      </div>

      {/* Run button */}
      <button
        onClick={runAnalysis}
        disabled={loading}
        style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 28px", borderRadius: 12,
          background: loading ? "#1a1a1a" : "#6366f1",
          color: "#fff", fontSize: 14, fontWeight: 600,
          border: "none", cursor: loading ? "not-allowed" : "pointer",
          marginBottom: 40, transition: "all 0.15s",
        }}
      >
        {loading ? (
          <>
            <span style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
            Analyzing with AI...
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L9.5 6.5H13L9.5 9.5L11 13L7 10.5L3 13L4.5 9.5L1 6.5H4.5L7 1Z" fill="currentColor"/></svg>
            Run {ANALYSIS_TYPES.find(t => t.id === selected)?.label}
          </>
        )}
      </button>

      {error && (
        <div style={{ padding: "16px 20px", borderRadius: 12, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", fontSize: 14, marginBottom: 24 }}>
          {error}
        </div>
      )}

      {/* Results */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnalysisResult type={selected} data={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AnalysisResult({ type, data }: { type: AnalysisType; data: any }) {
  if (type === "full") return <FullAnalysisResult data={data} />;
  if (type === "financial") return <FinancialResult data={data} />;
  if (type === "health") return <HealthResult data={data} />;
  if (type === "pitch") return <PitchResult data={data} />;
  if (type === "swot") return <SwotResult data={data} />;
  if (type === "market") return <MarketResult data={data} />;
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FullAnalysisResult({ data }: { data: any }) {
  const priorityColor: Record<string, string> = { high: "#f87171", medium: "#fbbf24", low: "#4ade80" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Summary */}
      <Card>
        <Label>Executive Summary</Label>
        <p style={{ fontSize: 15, color: "#f5f5f5", lineHeight: 1.7, marginBottom: 12 }}>{data.summary}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ScoreRing score={data.overallScore} label="Overall Score" />
          {data.investorReadiness && <ScoreRing score={data.investorReadiness.score} label="Investor Readiness" />}
        </div>
      </Card>

      {/* Dimensions */}
      {data.dimensions && (
        <Card>
          <Label>Dimension Scores</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {data.dimensions.map((d: { name: string; score: number; insight: string; recommendation: string }) => (
              <div key={d.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: "#f5f5f5", fontWeight: 500 }}>{d.name}</span>
                  <span style={{ fontSize: 13, color: d.score >= 80 ? "#4ade80" : d.score >= 65 ? "#fbbf24" : "#f87171", fontWeight: 600 }}>{d.score}/100</span>
                </div>
                <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 999, marginBottom: 6 }}>
                  <div style={{ height: "100%", width: `${d.score}%`, borderRadius: 999, background: d.score >= 80 ? "#6366f1" : d.score >= 65 ? "#f59e0b" : "#ef4444", transition: "width 0.8s ease" }} />
                </div>
                <p style={{ fontSize: 12, color: "#888" }}>{d.insight}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* SWOT */}
      {data.swot && (
        <Card>
          <Label>SWOT Overview</Label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { key: "strengths",    label: "Strengths",    color: "#4ade80" },
              { key: "weaknesses",   label: "Weaknesses",   color: "#f87171" },
              { key: "opportunities",label: "Opportunities",color: "#6366f1" },
              { key: "threats",      label: "Threats",      color: "#fbbf24" },
            ].map(({ key, label, color }) => (
              <div key={key} style={{ padding: "16px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <p style={{ fontSize: 11, fontWeight: 600, color, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                  {(data.swot[key] as string[]).map((s: string, i: number) => (
                    <li key={i} style={{ fontSize: 12, color: "#888", display: "flex", gap: 8 }}>
                      <span style={{ color, flexShrink: 0 }}>·</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recommendations */}
      {data.topRecommendations && (
        <Card>
          <Label>Top Recommendations</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {data.topRecommendations.map((r: { priority: string; title: string; impact: string; effort: string; rationale: string }, i: number) => (
              <div key={i} style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 12 }}>
                <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, background: `rgba(${r.priority === "high" ? "239,68,68" : r.priority === "medium" ? "245,158,11" : "34,197,94"},0.1)`, color: priorityColor[r.priority], fontWeight: 600, height: "fit-content", flexShrink: 0, whiteSpace: "nowrap" }}>
                  {r.priority}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "#f5f5f5", marginBottom: 4 }}>{r.title}</p>
                  <p style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>{r.rationale}</p>
                  <div style={{ display: "flex", gap: 16, fontSize: 11, color: "#444" }}>
                    <span>Impact: <span style={{ color: "#6366f1" }}>{r.impact}</span></span>
                    <span>Effort: {r.effort}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FinancialResult({ data }: { data: any }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Card>
        <Label>Financial Summary</Label>
        <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7, marginBottom: 20 }}>{data.summary}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {Object.entries(data.metrics ?? {}).map(([k, v]) => (
            <div key={k} style={{ padding: "14px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <p style={{ fontSize: 10, color: "#444", marginBottom: 6, textTransform: "capitalize" }}>{k.replace(/([A-Z])/g, " $1").trim()}</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#6366f1" }}>{String(v)}</p>
            </div>
          ))}
        </div>
      </Card>
      {data.insights && <InsightsList items={data.insights} title="Key Insights" />}
      {data.risks && <RiskList risks={data.risks} />}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function HealthResult({ data }: { data: any }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <Label>Health Score</Label>
            <p style={{ fontSize: 40, fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.04em", lineHeight: 1 }}>{data.overall}<span style={{ fontSize: 16, color: "#444" }}>/100</span></p>
            <p style={{ fontSize: 12, color: "#4ade80", marginTop: 4 }}>{data.trend} · {data.nextMilestone}</p>
          </div>
          <span style={{ padding: "6px 16px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: "rgba(34,197,94,0.1)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)" }}>
            {data.trend}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {data.dimensions?.map((d: { name: string; score: number; status: string; keyInsight: string; quickWin: string }) => (
            <div key={d.name}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#f5f5f5" }}>{d.name}</span>
                <span style={{ fontSize: 12, color: d.status === "strong" ? "#4ade80" : d.status === "fair" ? "#fbbf24" : "#f87171", fontWeight: 600 }}>{d.score} · {d.status}</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 999, marginBottom: 8 }}>
                <div style={{ height: "100%", width: `${d.score}%`, borderRadius: 999, background: d.status === "strong" ? "#6366f1" : d.status === "fair" ? "#f59e0b" : "#ef4444" }} />
              </div>
              <p style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>{d.keyInsight}</p>
              <p style={{ fontSize: 11, color: "#6366f1" }}>Quick win: {d.quickWin}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PitchResult({ data }: { data: any }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <Label>Pitch Deck Score</Label>
          <ScoreRing score={data.overallScore} label="Overall" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {data.sections?.map((s: { name: string; score: number; feedback: string; suggestion: string }) => (
            <div key={s.name} style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#f5f5f5" }}>{s.name}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: s.score >= 80 ? "#4ade80" : s.score >= 70 ? "#fbbf24" : "#f87171" }}>{s.score}/100</span>
              </div>
              <p style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>{s.feedback}</p>
              <p style={{ fontSize: 12, color: "#6366f1" }}>→ {s.suggestion}</p>
            </div>
          ))}
        </div>
      </Card>
      {data.criticalGaps && <InsightsList items={data.criticalGaps} title="Critical Gaps" color="#f87171" />}
      {data.investorQuestions && <InsightsList items={data.investorQuestions} title="Expect These Investor Questions" color="#fbbf24" />}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SwotResult({ data }: { data: any }) {
  const quadrants = [
    { key: "strengths",    label: "Strengths",    color: "#4ade80", field: "evidence" },
    { key: "weaknesses",   label: "Weaknesses",   color: "#f87171", field: "evidence" },
    { key: "opportunities",label: "Opportunities",color: "#6366f1", field: "potential" },
    { key: "threats",      label: "Threats",      color: "#fbbf24", field: "mitigation" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {quadrants.map(({ key, label, color, field }) => (
        <Card key={key}>
          <p style={{ fontSize: 12, fontWeight: 700, color, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {(data[key] ?? []).map((item: Record<string, string>, i: number) => (
              <div key={i} style={{ paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <p style={{ fontSize: 13, color: "#f5f5f5", marginBottom: 4 }}>{item.point}</p>
                <p style={{ fontSize: 12, color: "#888" }}>{item[field]}</p>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MarketResult({ data }: { data: any }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Card>
        <Label>Market Sizing</Label>
        <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7, marginBottom: 20 }}>{data.summary}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[{ l: "TAM", v: data.tam }, { l: "SAM", v: data.sam }, { l: "SOM", v: data.som }].map(({ l, v }) => (
            <div key={l} style={{ padding: "16px", borderRadius: 12, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.12)", textAlign: "center" }}>
              <p style={{ fontSize: 11, color: "#6366f1", fontWeight: 600, marginBottom: 6 }}>{l}</p>
              <p style={{ fontSize: 14, color: "#f5f5f5", fontWeight: 600 }}>{v}</p>
            </div>
          ))}
        </div>
      </Card>
      {data.competitiveLandscape && (
        <Card>
          <Label>Competitive Landscape</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {data.competitiveLandscape.map((c: { competitor: string; strength: string; weakness: string }) => (
              <div key={c.competitor} style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: "#f5f5f5", marginBottom: 6 }}>{c.competitor}</p>
                <p style={{ fontSize: 12, color: "#4ade80", marginBottom: 2 }}>+ {c.strength}</p>
                <p style={{ fontSize: 12, color: "#f87171" }}>− {c.weakness}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
      {data.positioning && (
        <Card>
          <Label>Recommended Positioning</Label>
          <p style={{ fontSize: 14, color: "#f5f5f5", lineHeight: 1.7, fontStyle: "italic" }}>&ldquo;{data.positioning}&rdquo;</p>
        </Card>
      )}
    </div>
  );
}

// Shared primitives
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: "24px", borderRadius: 16, background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 11, fontWeight: 600, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>{children}</p>;
}

function ScoreRing({ score, label }: { score: number; label: string }) {
  const r = 28; const circ = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ position: "relative", width: 70, height: 70 }}>
        <svg width="70" height="70" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="35" cy="35" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
          <circle cx="35" cy="35" r={r} fill="none" stroke="#6366f1" strokeWidth="5" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={circ - (score / 100) * circ} style={{ transition: "stroke-dashoffset 1s ease" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#f5f5f5" }}>{score}</span>
        </div>
      </div>
      <p style={{ fontSize: 10, color: "#444", textAlign: "center" }}>{label}</p>
    </div>
  );
}

function InsightsList({ items, title, color = "#a5b4fc" }: { items: string[]; title: string; color?: string }) {
  return (
    <Card>
      <Label>{title}</Label>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item: string, i: number) => (
          <li key={i} style={{ display: "flex", gap: 10, fontSize: 13, color: "#888", lineHeight: 1.55 }}>
            <span style={{ color, flexShrink: 0, fontWeight: 700 }}>·</span>{item}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function RiskList({ risks }: { risks: Array<{ risk: string; severity: string; mitigation: string }> }) {
  const c: Record<string, string> = { high: "#f87171", medium: "#fbbf24", low: "#4ade80" };
  return (
    <Card>
      <Label>Risk Assessment</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {risks.map((r, i) => (
          <div key={i} style={{ padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <p style={{ fontSize: 13, color: "#f5f5f5", fontWeight: 500 }}>{r.risk}</p>
              <span style={{ fontSize: 10, color: c[r.severity], fontWeight: 600 }}>{r.severity}</span>
            </div>
            <p style={{ fontSize: 12, color: "#888" }}>Mitigation: {r.mitigation}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
