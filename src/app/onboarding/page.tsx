"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getUser, setUser } from "@/lib/auth";

type Stage = "ideation" | "launched";

function OnboardCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let id: number, t = 0;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const pts = Array.from({ length: 45 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
    }));
    const draw = () => {
      t += 0.004;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const G = 90, off = (t * 10) % G;
      ctx.strokeStyle = "rgba(0,0,0,0.03)"; ctx.lineWidth = 1; ctx.beginPath();
      for (let x = off % G - G; x < W + G; x += G) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
      for (let y = off % G - G; y < H + G; y += G) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
      ctx.stroke();
      pts.forEach(p => {
        p.x = (p.x + p.vx + W) % W; p.y = (p.y + p.vy + H) % H;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.035)"; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(0,0,0,${(1-d/110)*0.03})`; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }} />;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", idea: "", stage: "" as Stage | "", industry: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!user) router.push("/auth/signup");
    else if (user.onboarded) router.push("/dashboard");
  }, [router]);

  const next = () => setStep(s => s + 1);

  const finish = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const user = getUser();
    if (user) {
      setUser({
        ...user, onboarded: true,
        startup: { name: data.name || "My Startup", idea: data.idea, stage: data.stage as Stage || "ideation", industry: data.industry || "B2B SaaS" },
      });
    }
    router.push("/dashboard");
  };

  const steps = [
    <StepWelcome key="w" onNext={next} />,
    <StepIdea key="i" value={data.idea} onChange={v => setData(d => ({ ...d, idea: v }))} onNext={next} />,
    <StepStage key="s" value={data.stage} onChange={v => setData(d => ({ ...d, stage: v as Stage }))} onNext={next} />,
    <StepDetails key="d" name={data.name} industry={data.industry}
      onName={v => setData(d => ({ ...d, name: v }))} onIndustry={v => setData(d => ({ ...d, industry: v }))}
      onFinish={finish} loading={loading} />,
  ];

  return (
    <div style={{ minHeight: "100svh", background: "var(--bg)", display: "flex", flexDirection: "column", position: "relative" }}>
      <OnboardCanvas />
      <div aria-hidden style={{ position: "fixed", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Progress bar */}
      <div style={{ height: 2, background: "var(--bg-3)", position: "relative", zIndex: 2 }}>
        <motion.div animate={{ width: `${((step + 1) / steps.length) * 100}%` }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: "100%", background: `linear-gradient(90deg, ${getComputedStyle(document.documentElement).getPropertyValue('--accent-mid') || '#475569'}, ${getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#111827'})`, borderRadius: 999, boxShadow: "0 10px 24px rgba(0,0,0,0.06)" }} />
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", position: "relative", zIndex: 2 }}>
        <AnimatePresence mode="wait">
          <motion.div key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.28 }}
            style={{ width: "100%", maxWidth: 560 }}>
            {steps[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, paddingBottom: 32, position: "relative", zIndex: 2 }}>
        {steps.map((_, i) => (
          <div key={i} style={{ width: i === step ? 24 : 6, height: 6, borderRadius: 999, background: i <= step ? "var(--accent)" : "var(--bg-3)", transition: "all 0.3s", boxShadow: i === step ? "0 8px 18px rgba(0,0,0,0.06)" : "none" }} />
        ))}
      </div>
    </div>
  );
}

/* ── Step components ── */

const cardStyle = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 16,
  padding: "32px",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
} as React.CSSProperties;

function StepWelcome({ onNext }: { onNext: () => void }) {
  const user = typeof window !== "undefined" ? getUser() : null;
  return (
    <div style={{ ...cardStyle, textAlign: "center" }}>
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, type: "spring" }}
        style={{ width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg, var(--accent), var(--accent-2))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 32, boxShadow: "0 8px 28px var(--accent-glow)" }}>
        👋
      </motion.div>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 12 }}>
        Welcome, {user?.name?.split(" ")[0] ?? "Founder"}!
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 32, maxWidth: 400, margin: "0 auto 32px" }}>
        Setting up your AI executive team. A few quick questions to personalize everything for your startup.
      </p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
        {["🧠 AI CEO", "💰 AI CFO", "⚙️ AI CTO", "📣 AI CMO", "📈 AI Investor", "⚖️ AI Legal"].map(a => (
          <span key={a} className="pill pill-accent" style={{ fontSize: 12, padding: "5px 12px" }}>{a}</span>
        ))}
      </div>
      <button onClick={onNext}
        style={{ fontSize: 15, padding: "13px 36px", borderRadius: 8, background: "linear-gradient(135deg, var(--accent), var(--accent-2))", color: "#fff", border: "none", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 12px 28px var(--accent-glow)", transition: "all 0.18s" }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 18px 36px var(--accent-glow)"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 28px var(--accent-glow)"}>
        Set up my workspace →
      </button>
    </div>
  );
}

function StepIdea({ value, onChange, onNext }: { value: string; onChange: (v: string) => void; onNext: () => void }) {
  return (
    <div style={cardStyle}>
      <span className="pill pill-accent" style={{ marginBottom: 20, display: "inline-block" }}>Step 1 of 3</span>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 8 }}>
        Tell us about your idea
      </h2>
      <p style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 24 }}>
        Describe your startup in 1–2 sentences. Your AI team uses this to personalize all analysis.
      </p>
      <textarea value={value} onChange={e => onChange(e.target.value)}
        placeholder="e.g. We're building an AI-powered HR platform that automates performance reviews..."
        style={{ width: "100%", minHeight: 120, background: "var(--surface-3)", border: "1px solid var(--border-2)", borderRadius: 8, padding: "14px 16px", fontSize: 14, color: "var(--text)", resize: "vertical", outline: "none", lineHeight: 1.6, fontFamily: "inherit", transition: "border-color 0.15s, box-shadow 0.15s" }}
        onFocus={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 0 4px var(--accent-glow)"; }}
        onBlur={e => { e.currentTarget.style.borderColor = "var(--border-2)"; e.currentTarget.style.boxShadow = "none"; }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
        <p style={{ fontSize: 12, color: "var(--text-3)" }}>{value.length} characters</p>
        <button onClick={onNext} disabled={value.length < 10}
          style={{ fontSize: 14, padding: "11px 24px", borderRadius: 8, background: value.length >= 10 ? "linear-gradient(135deg, var(--accent), var(--accent-2))" : "var(--bg-3)", color: value.length >= 10 ? "#fff" : "var(--text-3)", border: "none", fontWeight: 700, cursor: value.length >= 10 ? "pointer" : "not-allowed", fontFamily: "inherit", transition: "all 0.15s", boxShadow: value.length >= 10 ? "0 12px 28px var(--accent-glow)" : "none" }}>
          Continue →
        </button>
      </div>
    </div>
  );
}

function StepStage({ value, onChange, onNext }: { value: string; onChange: (v: string) => void; onNext: () => void }) {
  const opts = [
    { id: "ideation", label: "Ideation Stage", desc: "Validating idea, building MVP, or pre-revenue", icon: "💡" },
    { id: "launched", label: "Already Launched", desc: "Live product with customers, generating revenue", icon: "🚀" },
  ];
  return (
    <div style={cardStyle}>
      <span className="pill pill-accent" style={{ marginBottom: 20, display: "inline-block" }}>Step 2 of 3</span>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 8 }}>Where are you right now?</h2>
      <p style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 24 }}>This helps your AI team give relevant advice.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        {opts.map(opt => {
          const sel = value === opt.id;
          return (
            <button key={opt.id} onClick={() => onChange(opt.id)}
              style={{ padding: "18px 20px", borderRadius: 10, border: `1px solid ${sel ? "var(--accent-glow)" : "var(--border-2)"}`, background: sel ? "var(--accent-light)" : "var(--surface-3)", cursor: "pointer", textAlign: "left", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 14, boxShadow: sel ? "0 10px 28px var(--accent-glow)" : "none", fontFamily: "inherit" }}>
              <span style={{ fontSize: 28, width: 44, height: 44, background: sel ? "var(--accent-light)" : "var(--surface-3)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{opt.icon}</span>
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: sel ? "var(--accent-mid)" : "var(--text)", marginBottom: 3 }}>{opt.label}</p>
                <p style={{ fontSize: 13, color: "var(--text-3)" }}>{opt.desc}</p>
              </div>
              {sel && <div style={{ marginLeft: "auto", width: 22, height: 22, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5L4.5 8L9 3" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onNext} disabled={!value}
          style={{ fontSize: 14, padding: "11px 24px", borderRadius: 8, background: value ? "linear-gradient(135deg, var(--accent), var(--accent-2))" : "var(--bg-3)", color: value ? "#fff" : "var(--text-3)", border: "none", fontWeight: 700, cursor: value ? "pointer" : "not-allowed", fontFamily: "inherit", transition: "all 0.15s", boxShadow: value ? "0 12px 28px var(--accent-glow)" : "none" }}>
          Continue →
        </button>
      </div>
    </div>
  );
}

function StepDetails({ name, industry, onName, onIndustry, onFinish, loading }: {
  name: string; industry: string; onName: (v: string) => void; onIndustry: (v: string) => void;
  onFinish: () => void; loading: boolean;
}) {
  const INDUSTRIES = ["B2B SaaS","Consumer App","FinTech","HealthTech","EdTech","E-commerce","AI / ML","Deep Tech","CleanTech","Other"];
  return (
    <div style={cardStyle}>
      <span className="pill pill-accent" style={{ marginBottom: 20, display: "inline-block" }}>Step 3 of 3</span>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 8 }}>A few more details</h2>
      <p style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 28 }}>Almost there. These help us benchmark against similar companies.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 28 }}>
        <div>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-3)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Startup name <span style={{ color: "var(--text-2)", fontWeight: 400 }}>(optional)</span>
          </label>
          <input type="text" placeholder="e.g. TalentFlow" value={name} onChange={e => onName(e.target.value)}
            style={{ width: "100%", padding: "11px 14px", fontSize: 14, borderRadius: 8, border: "1px solid var(--border-2)", background: "var(--surface-3)", color: "var(--text)", outline: "none", transition: "border-color 0.15s, box-shadow 0.15s", fontFamily: "inherit" }}
            onFocus={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 0 4px var(--accent-glow)"; }}
            onBlur={e => { e.currentTarget.style.borderColor = "var(--border-2)"; e.currentTarget.style.boxShadow = "none"; }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#888888", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Industry</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {INDUSTRIES.map(ind => {
              const sel = industry === ind;
              return (
                  <button key={ind} onClick={() => onIndustry(ind)}
                    style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${sel ? "var(--accent-glow)" : "var(--border-2)"}`, background: sel ? "var(--accent-light)" : "var(--surface-3)", color: sel ? "var(--accent-mid)" : "var(--text-2)", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit" }}>
                  {ind}
                </button>
              );
            })}
          </div>
        </div>
      </div>
        <button onClick={onFinish} disabled={loading}
          style={{ width: "100%", padding: "14px", fontSize: 15, borderRadius: 8, background: loading ? "var(--accent-light)" : "linear-gradient(135deg, var(--accent), var(--accent-2))", color: "#fff", border: "none", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", transition: "all 0.18s", boxShadow: loading ? "none" : "0 12px 28px var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        {loading
          ? <><span className="spin" style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block" }} /> Setting up your AI team…</>
          : "Launch my workspace 🚀"
        }
      </button>
    </div>
  );
}
