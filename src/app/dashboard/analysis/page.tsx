"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AnalysisType = "full" | "financial" | "market" | "pitch" | "swot" | "health";

const TYPES: { id: AnalysisType; label: string; desc: string; agent: string; icon: string }[] = [
  { id: "full",      label: "Full Analysis",  desc: "360° assessment across all 6 dimensions", agent: "All Agents",  icon: "⚡" },
  { id: "financial", label: "Financial",      desc: "Revenue, burn, runway, unit economics",    agent: "AI CFO",      icon: "💰" },
  { id: "market",    label: "Market",         desc: "TAM/SAM/SOM, competitors, positioning",    agent: "AI CEO",      icon: "🌍" },
  { id: "pitch",     label: "Pitch Deck",     desc: "Score your deck slide by slide",           agent: "AI Investor", icon: "🎯" },
  { id: "swot",      label: "SWOT",           desc: "Evidence-backed strategic analysis",       agent: "AI CEO",      icon: "🧠" },
  { id: "health",    label: "Health Score",   desc: "Detailed breakdown with quick wins",       agent: "All Agents",  icon: "💚" },
];

export default function AnalysisPage() {
  const [selected, setSelected] = useState<AnalysisType>("full");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await fetch("/api/analysis", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: selected }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Analysis failed");
      setResult(json.data);
    } catch (e) { setError(e instanceof Error ? e.message : "Something went wrong"); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "32px 28px 48px" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>AI Analysis Engine</p>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 6 }}>Run Startup Analysis</h1>
        <p style={{ fontSize: 14, color: "var(--text-2)" }}>Choose a type and your AI team generates insights in seconds.</p>
      </div>

      {/* Type selector */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 24 }}>
        {TYPES.map(t => (
          <motion.button key={t.id} onClick={() => { setSelected(t.id); setResult(null); setError(null); }} whileTap={{ scale: 0.98 }}
            style={{ padding: "16px 18px", borderRadius: 12, textAlign: "left", cursor: "pointer", border: selected === t.id ? "1.5px solid var(--accent)" : "1.5px solid var(--border)", background: selected === t.id ? "var(--accent-light)" : "var(--surface)", transition: "all 0.15s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <span style={{ fontSize: 18 }}>{t.icon}</span>
              <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, background: selected === t.id ? "var(--accent)" : "var(--surface-2)", color: selected === t.id ? "#fff" : "var(--text-3)", fontWeight: 600 }}>{t.agent}</span>
            </div>
            <p style={{ fontSize: 13, fontWeight: 700, color: selected === t.id ? "var(--accent)" : "var(--text)", marginBottom: 3 }}>{t.label}</p>
            <p style={{ fontSize: 11, color: "var(--text-3)", lineHeight: 1.5 }}>{t.desc}</p>
          </motion.button>
        ))}
      </div>

      {/* Run button */}
      <button onClick={run} disabled={loading}
        style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 28px", borderRadius: 12, background: loading ? "var(--surface-3)" : "var(--accent)", color: loading ? "var(--text-3)" : "#fff", fontSize: 14, fontWeight: 700, border: "none", cursor: loading ? "not-allowed" : "pointer", marginBottom: 32, transition: "all 0.15s" }}>
        {loading ? (
          <><span className="spin" style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block" }} />Analyzing…</>
        ) : (
          <><span>⚡</span> Run {TYPES.find(t => t.id === selected)?.label}</>
        )}
      </button>

      {error && (
        <div style={{ padding: "14px 18px", borderRadius: 12, background: "var(--red-light)", border: "1px solid rgba(220,38,38,0.2)", color: "var(--red)", fontSize: 14, marginBottom: 24 }}>{error}</div>
      )}

      <AnimatePresence mode="wait">
        {result && (
          <motion.div key={selected} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <AnalysisResult type={selected} data={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AnalysisResult({ type, data }: { type: AnalysisType; data: any }) {
  if (type === "full")      return <FullResult data={data} />;
  if (type === "financial") return <FinancialResult data={data} />;
  if (type === "health")    return <HealthResult data={data} />;
  if (type === "pitch")     return <PitchResult data={data} />;
  if (type === "swot")      return <SwotResult data={data} />;
  if (type === "market")    return <MarketResult data={data} />;
  return null;
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ padding: 22, borderRadius: 14, background: "var(--surface)", border: "1px solid var(--border)", ...style }}>{children}</div>;
}
function Label({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 10, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>{children}</p>;
}
function ScoreRing({ score, label }: { score: number; label: string }) {
  const r = 26, circ = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ position: "relative", width: 64, height: 64 }}>
        <svg width="64" height="64" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="32" cy="32" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="5" />
          <circle cx="32" cy="32" r={r} fill="none" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={circ - (score / 100) * circ} style={{ transition: "stroke-dashoffset 1s ease" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: "var(--text)" }}>{score}</span>
        </div>
      </div>
      <p style={{ fontSize: 10, color: "var(--text-3)", textAlign: "center" }}>{label}</p>
    </div>
  );
}
function scoreColor(s: number) { return s >= 80 ? "var(--accent)" : s >= 65 ? "var(--amber)" : "var(--red)"; }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FullResult({ data }: { data: any }) {
  const pc: Record<string, string> = { high: "var(--red)", medium: "var(--amber)", low: "var(--green)" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card>
        <Label>Executive Summary</Label>
        <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.7, marginBottom: 20 }}>{data.summary}</p>
        <div style={{ display: "flex", gap: 24 }}>
          <ScoreRing score={data.overallScore} label="Overall" />
          {data.investorReadiness && <ScoreRing score={data.investorReadiness.score} label="Investor Ready" />}
        </div>
      </Card>
      {data.dimensions && (
        <Card>
          <Label>Dimension Scores</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {data.dimensions.map((d: { name: string; score: number; insight: string; recommendation: string }) => (
              <div key={d.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{d.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: scoreColor(d.score) }}>{d.score}/100</span>
                </div>
                <div style={{ height: 3, background: "var(--surface-2)", borderRadius: 999, marginBottom: 5 }}>
                  <div style={{ height: "100%", width: `${d.score}%`, borderRadius: 999, background: scoreColor(d.score), transition: "width 0.8s ease" }} />
                </div>
                <p style={{ fontSize: 12, color: "var(--text-2)" }}>{d.insight}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
      {data.swot && (
        <Card>
          <Label>SWOT Overview</Label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[{ k: "strengths", l: "Strengths", c: "var(--green)" }, { k: "weaknesses", l: "Weaknesses", c: "var(--red)" }, { k: "opportunities", l: "Opportunities", c: "var(--accent)" }, { k: "threats", l: "Threats", c: "var(--amber)" }].map(({ k, l, c }) => (
              <div key={k} style={{ padding: 14, borderRadius: 10, background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: c, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</p>
                {(data.swot[k] as string[]).map((s: string, i: number) => (
                  <p key={i} style={{ fontSize: 12, color: "var(--text-2)", marginBottom: 4, display: "flex", gap: 6 }}><span style={{ color: c }}>·</span>{s}</p>
                ))}
              </div>
            ))}
          </div>
        </Card>
      )}
      {data.topRecommendations && (
        <Card>
          <Label>Top Recommendations</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {data.topRecommendations.map((r: { priority: string; title: string; impact: string; effort: string; rationale: string }, i: number) => (
              <div key={i} style={{ padding: "12px 14px", borderRadius: 10, background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", gap: 12 }}>
                <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, background: "transparent", color: pc[r.priority], border: `1px solid ${pc[r.priority]}`, fontWeight: 700, height: "fit-content", flexShrink: 0, whiteSpace: "nowrap" }}>{r.priority}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{r.title}</p>
                  <p style={{ fontSize: 12, color: "var(--text-2)", marginBottom: 5 }}>{r.rationale}</p>
                  <div style={{ display: "flex", gap: 16, fontSize: 11, color: "var(--text-3)" }}>
                    <span>Impact: <span style={{ color: "var(--accent)", fontWeight: 600 }}>{r.impact}</span></span>
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
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card><Label>Summary</Label><p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.7 }}>{data.summary}</p></Card>
      {data.metrics && (
        <Card>
          <Label>Key Metrics</Label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {Object.entries(data.metrics).map(([k, v]) => (
              <div key={k} style={{ padding: 14, borderRadius: 10, background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                <p style={{ fontSize: 10, color: "var(--text-3)", marginBottom: 5, textTransform: "capitalize" }}>{k.replace(/([A-Z])/g, " $1").trim()}</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.03em" }}>{String(v)}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
      {data.insights && <Card><Label>Insights</Label>{(data.insights as string[]).map((s, i) => <p key={i} style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 8, paddingLeft: 12, borderLeft: "2px solid var(--accent)" }}>{s}</p>)}</Card>}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function HealthResult({ data }: { data: any }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <Label>Health Score</Label>
            <p style={{ fontSize: 44, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.06em", lineHeight: 1 }}>{data.overall}<span style={{ fontSize: 16, color: "var(--text-3)", fontWeight: 400 }}>/100</span></p>
            <p style={{ fontSize: 13, color: "var(--green)", marginTop: 4, fontWeight: 600 }}>{data.trend} · {data.nextMilestone}</p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {data.dimensions?.map((d: { name: string; score: number; status: string; keyInsight: string; quickWin: string }) => (
            <div key={d.name}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{d.name}</span>
                <span style={{ fontSize: 12, color: scoreColor(d.score), fontWeight: 700 }}>{d.score} · {d.status}</span>
              </div>
              <div style={{ height: 3, background: "var(--surface-2)", borderRadius: 999, marginBottom: 6 }}>
                <div style={{ height: "100%", width: `${d.score}%`, borderRadius: 999, background: scoreColor(d.score) }} />
              </div>
              <p style={{ fontSize: 12, color: "var(--text-2)", marginBottom: 2 }}>{d.keyInsight}</p>
              <p style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600 }}>→ {d.quickWin}</p>
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
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <Label>Pitch Deck Score</Label>
          <ScoreRing score={data.overallScore} label="Overall" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.sections?.map((s: { name: string; score: number; feedback: string; suggestion: string }) => (
            <div key={s.name} style={{ padding: "12px 14px", borderRadius: 10, background: "var(--surface-2)", border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{s.name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: scoreColor(s.score) }}>{s.score}/100</span>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-2)", marginBottom: 3 }}>{s.feedback}</p>
              <p style={{ fontSize: 12, color: "var(--accent)", fontWeight: 500 }}>→ {s.suggestion}</p>
            </div>
          ))}
        </div>
      </Card>
      {data.criticalGaps && <Card><Label>Critical Gaps</Label>{(data.criticalGaps as string[]).map((g, i) => <p key={i} style={{ fontSize: 13, color: "var(--red)", marginBottom: 6, display: "flex", gap: 8 }}><span>⚠</span>{g}</p>)}</Card>}
      {data.investorQuestions && <Card><Label>Expect These Questions</Label>{(data.investorQuestions as string[]).map((q, i) => <p key={i} style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 8, paddingLeft: 12, borderLeft: "2px solid var(--amber)" }}>&ldquo;{q}&rdquo;</p>)}</Card>}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SwotResult({ data }: { data: any }) {
  const q = [{ k: "strengths", l: "Strengths", c: "var(--green)", f: "evidence" }, { k: "weaknesses", l: "Weaknesses", c: "var(--red)", f: "evidence" }, { k: "opportunities", l: "Opportunities", c: "var(--accent)", f: "potential" }, { k: "threats", l: "Threats", c: "var(--amber)", f: "mitigation" }];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {q.map(({ k, l, c, f }) => (
        <Card key={k}>
          <p style={{ fontSize: 11, fontWeight: 700, color: c, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</p>
          {(data[k] ?? []).map((item: Record<string, string>, i: number) => (
            <div key={i} style={{ paddingBottom: 10, marginBottom: 10, borderBottom: "1px solid var(--border)" }}>
              <p style={{ fontSize: 13, color: "var(--text)", fontWeight: 600, marginBottom: 3 }}>{item.point}</p>
              <p style={{ fontSize: 12, color: "var(--text-2)" }}>{item[f]}</p>
            </div>
          ))}
        </Card>
      ))}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MarketResult({ data }: { data: any }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card>
        <Label>Market Sizing</Label>
        <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 20 }}>{data.summary}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[{ l: "TAM", v: data.tam }, { l: "SAM", v: data.sam }, { l: "SOM", v: data.som }].map(({ l, v }) => (
            <div key={l} style={{ padding: 16, borderRadius: 10, background: "var(--accent-light)", border: "1px solid rgba(79,70,229,0.15)", textAlign: "center" }}>
              <p style={{ fontSize: 11, color: "var(--accent)", fontWeight: 700, marginBottom: 6 }}>{l}</p>
              <p style={{ fontSize: 14, color: "var(--text)", fontWeight: 700 }}>{v}</p>
            </div>
          ))}
        </div>
      </Card>
      {data.competitiveLandscape && (
        <Card>
          <Label>Competitive Landscape</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {data.competitiveLandscape.map((c: { competitor: string; strength: string; weakness: string }) => (
              <div key={c.competitor} style={{ padding: "12px 14px", borderRadius: 10, background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 5 }}>{c.competitor}</p>
                <p style={{ fontSize: 12, color: "var(--green)", marginBottom: 2 }}>+ {c.strength}</p>
                <p style={{ fontSize: 12, color: "var(--red)" }}>− {c.weakness}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
      {data.positioning && (
        <Card>
          <Label>Recommended Positioning</Label>
          <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.7, fontStyle: "italic" }}>&ldquo;{data.positioning}&rdquo;</p>
        </Card>
      )}
    </div>
  );
}
