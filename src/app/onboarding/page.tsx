"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getUser, setUser } from "@/lib/auth";

type Stage = "ideation" | "launched";

const INDUSTRIES = [
  "B2B SaaS", "Consumer App", "FinTech", "HealthTech", "EdTech",
  "E-commerce", "AI / ML", "Deep Tech", "CleanTech", "Other",
];

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
        ...user,
        onboarded: true,
        startup: { name: data.name || "My Startup", idea: data.idea, stage: data.stage as Stage || "ideation", industry: data.industry || "B2B SaaS" },
      });
    }
    router.push("/dashboard");
  };

  const steps = [
    <StepWelcome key="welcome" onNext={next} />,
    <StepIdea key="idea" value={data.idea} onChange={v => setData(d => ({ ...d, idea: v }))} onNext={next} />,
    <StepStage key="stage" value={data.stage} onChange={v => setData(d => ({ ...d, stage: v as Stage }))} onNext={next} />,
    <StepDetails key="details" name={data.name} industry={data.industry}
      onName={v => setData(d => ({ ...d, name: v }))} onIndustry={v => setData(d => ({ ...d, industry: v }))}
      onFinish={finish} loading={loading} />,
  ];

  return (
    <div style={{ minHeight: "100svh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      {/* Progress bar */}
      <div style={{ height: 3, background: "var(--bg-3)" }}>
        <motion.div animate={{ width: `${((step + 1) / steps.length) * 100}%` }} transition={{ duration: 0.4 }}
          style={{ height: "100%", background: "var(--accent)", borderRadius: 999 }} />
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.28 }} style={{ width: "100%", maxWidth: 560 }}>
            {steps[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, paddingBottom: 32 }}>
        {steps.map((_, i) => (
          <div key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 999, background: i <= step ? "var(--accent)" : "var(--bg-3)", transition: "all 0.3s" }} />
        ))}
      </div>
    </div>
  );
}

function StepWelcome({ onNext }: { onNext: () => void }) {
  const user = typeof window !== "undefined" ? getUser() : null;
  return (
    <div style={{ textAlign: "center" }}>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}
        style={{ width: 72, height: 72, borderRadius: 20, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", fontSize: 32 }}>
        👋
      </motion.div>
      <h1 style={{ fontSize: 34, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 12 }}>
        Welcome, {user?.name?.split(" ")[0] ?? "Founder"}!
      </h1>
      <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 36, maxWidth: 420, margin: "0 auto 36px" }}>
        We&apos;re setting up your AI executive team. Answer a few quick questions so we can personalize everything for your startup.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
        {["🧠 AI CEO", "💰 AI CFO", "⚙️ AI CTO", "📣 AI CMO", "📈 AI Investor", "⚖️ AI Legal"].map(a => (
          <span key={a} className="pill pill-accent" style={{ fontSize: 13, padding: "5px 14px" }}>{a}</span>
        ))}
      </div>
      <button className="btn btn-black" onClick={onNext} style={{ fontSize: 16, padding: "14px 40px" }}>
        Let&apos;s set up your workspace →
      </button>
    </div>
  );
}

function StepIdea({ value, onChange, onNext }: { value: string; onChange: (v: string) => void; onNext: () => void }) {
  return (
    <div>
      <span className="pill pill-accent" style={{ marginBottom: 20, display: "inline-block" }}>Step 1 of 3</span>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 8 }}>
        Tell us about your idea
      </h2>
      <p style={{ fontSize: 15, color: "var(--text-2)", marginBottom: 28 }}>
        Describe your startup in 1-2 sentences. Your AI team will use this to personalize all analysis, advice, and recommendations.
      </p>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="e.g. We're building an AI-powered HR platform that automates performance reviews and helps managers give better feedback to their teams..."
        style={{ width: "100%", minHeight: 120, background: "var(--surface)", border: "1.5px solid var(--border-2)", borderRadius: 12, padding: "14px 16px", fontSize: 15, color: "var(--text)", resize: "vertical", outline: "none", lineHeight: 1.6, fontFamily: "inherit", transition: "border-color 0.15s" }}
        onFocus={e => (e.target.style.borderColor = "var(--accent)")}
        onBlur={e => (e.target.style.borderColor = "var(--border-2)")}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
        <p style={{ fontSize: 12, color: "var(--text-3)" }}>{value.length} characters</p>
        <button className="btn btn-black" onClick={onNext} disabled={value.length < 10}
          style={{ fontSize: 15, padding: "11px 28px" }}>
          Continue →
        </button>
      </div>
    </div>
  );
}

function StepStage({ value, onChange, onNext }: { value: string; onChange: (v: string) => void; onNext: () => void }) {
  const options = [
    { id: "ideation", label: "Ideation Stage", desc: "Still validating the idea, building MVP, or pre-revenue", icon: "💡", color: "var(--yellow)" },
    { id: "launched", label: "Already Launched", desc: "Live product with customers, generating revenue", icon: "🚀", color: "var(--accent)" },
  ];
  return (
    <div>
      <span className="pill pill-accent" style={{ marginBottom: 20, display: "inline-block" }}>Step 2 of 3</span>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 8 }}>
        Where are you right now?
      </h2>
      <p style={{ fontSize: 15, color: "var(--text-2)", marginBottom: 28 }}>
        This helps your AI team give relevant advice — ideation analysis vs growth optimization are very different.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
        {options.map(opt => (
          <button key={opt.id} onClick={() => { onChange(opt.id); }}
            style={{ padding: "20px 22px", borderRadius: 14, border: `2px solid ${value === opt.id ? "var(--accent)" : "var(--border-2)"}`, background: value === opt.id ? "var(--accent-light)" : "var(--surface)", cursor: "pointer", textAlign: "left", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 28, width: 44, height: 44, background: value === opt.id ? "var(--accent)" : "var(--bg-3)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{opt.icon}</span>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: value === opt.id ? "var(--accent)" : "var(--text)", marginBottom: 3 }}>{opt.label}</p>
              <p style={{ fontSize: 13, color: "var(--text-2)" }}>{opt.desc}</p>
            </div>
            {value === opt.id && (
              <div style={{ marginLeft: "auto", width: 22, height: 22, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5L4.5 8L9 3" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
            )}
          </button>
        ))}
      </div>
      <button className="btn btn-black" onClick={onNext} disabled={!value} style={{ fontSize: 15, padding: "11px 28px", float: "right" }}>
        Continue →
      </button>
    </div>
  );
}

function StepDetails({ name, industry, onName, onIndustry, onFinish, loading }: {
  name: string; industry: string; onName: (v: string) => void; onIndustry: (v: string) => void;
  onFinish: () => void; loading: boolean;
}) {
  return (
    <div>
      <span className="pill pill-accent" style={{ marginBottom: 20, display: "inline-block" }}>Step 3 of 3</span>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 8 }}>
        A few more details
      </h2>
      <p style={{ fontSize: 15, color: "var(--text-2)", marginBottom: 28 }}>Almost there. These help us benchmark against similar companies.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 32 }}>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-2)", marginBottom: 7 }}>Startup name <span style={{ color: "var(--text-3)", fontWeight: 400 }}>(optional)</span></label>
          <input className="input" type="text" placeholder="e.g. TalentFlow" value={name} onChange={e => onName(e.target.value)} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-2)", marginBottom: 7 }}>Industry</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["B2B SaaS", "Consumer App", "FinTech", "HealthTech", "EdTech", "E-commerce", "AI / ML", "Deep Tech", "CleanTech", "Other"].map(ind => (
              <button key={ind} onClick={() => onIndustry(ind)}
                style={{ padding: "7px 14px", borderRadius: 8, border: `1.5px solid ${industry === ind ? "var(--accent)" : "var(--border-2)"}`, background: industry === ind ? "var(--accent-light)" : "var(--surface)", color: industry === ind ? "var(--accent)" : "var(--text-2)", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}>
                {ind}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button className="btn btn-black" onClick={onFinish} disabled={loading}
        style={{ width: "100%", padding: "14px", fontSize: 16 }}>
        {loading ? (
          <span style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
            <span className="spin" style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block" }} />
            Setting up your AI team…
          </span>
        ) : "Launch my workspace 🚀"}
      </button>
    </div>
  );
}
