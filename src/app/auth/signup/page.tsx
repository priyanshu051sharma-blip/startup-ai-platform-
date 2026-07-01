"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { createUser } from "@/lib/auth";

function AuthCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let id: number, t = 0;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
    }));
    const draw = () => {
      t += 0.004;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const G = 80, off = (t * 12) % G;
      ctx.strokeStyle = "rgba(99,102,241,0.04)"; ctx.lineWidth = 1; ctx.beginPath();
      for (let x = off % G - G; x < W + G; x += G) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
      for (let y = off % G - G; y < H + G; y += G) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
      ctx.stroke();
      pts.forEach(p => {
        p.x = (p.x + p.vx + W) % W; p.y = (p.y + p.vy + H) % H;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(165,180,252,0.35)"; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(99,102,241,${(1-d/120)*0.08})`; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

const FEATURES = [
  { icon: "💡", text: "Validates your idea with real market data" },
  { icon: "📊", text: "Builds investor-grade financial models" },
  { icon: "🎯", text: "Preps you for any investor question" },
  { icon: "⚡", text: "Available 24/7, costs 1% of a consultant" },
];

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError("Please fill in all fields."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    createUser(form.name, form.email);
    router.push("/onboarding");
  };

  const inputStyle = (field: string) => ({
    width: "100%", padding: "11px 14px", fontSize: 14, borderRadius: 8,
    border: "1px solid var(--border-2)",
    background: "var(--bg-3)", color: "var(--text)",
    outline: "none", transition: "border-color 0.15s, box-shadow 0.15s",
    fontFamily: "inherit",
  });

  return (
    <div style={{ minHeight: "100svh", background: "var(--bg)", display: "flex", position: "relative" }}>
      <AuthCanvas />

      {/* Glow */}
      <div aria-hidden style={{ position: "fixed", top: "50%", left: "35%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Left — form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: "100%", maxWidth: 520 }}
        >
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 36, textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px rgba(99,102,241,0.35)" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7H12M7.5 2.5L12 7L7.5 11.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em" }}>FounderAI</span>
          </Link>

          <h1 style={{ fontSize: 30, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 8 }}>
            Create your account
          </h1>
          <p style={{ fontSize: 15, color: "var(--text-2)", marginBottom: 32 }}>
            Your AI startup team is ready. Let&apos;s go.
          </p>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { key: "name",     label: "Full name",   type: "text",     placeholder: "Prince Sharma",    autoComplete: "name"         },
              { key: "email",    label: "Email",        type: "email",    placeholder: "you@startup.com",  autoComplete: "email"        },
              { key: "password", label: "Password",     type: "password", placeholder: "Min. 6 characters", autoComplete: "new-password" },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#888888", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {f.label}
                </label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  autoComplete={f.autoComplete}
                  style={inputStyle(f.key)}
                  onFocus={e => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.18)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>
            ))}

            {error && (
              <div style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(255,23,68,0.1)", border: "1px solid rgba(255,23,68,0.2)", color: "#ff6b6b", fontSize: 13 }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              style={{
                width: "100%", padding: "13px", fontSize: 14, marginTop: 4, borderRadius: 8,
                background: loading ? "var(--accent-light)" : "var(--accent-light)",
                color: "var(--text)", border: "none", fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.18s",
                boxShadow: loading ? "none" : "0 20px 40px rgba(0,0,0,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                fontFamily: "inherit",
              }}>
              {loading
                ? <><span className="spin" style={{ width: 16, height: 16, border: "2px solid rgba(0,0,0,0.08)", borderTopColor: "var(--text)", borderRadius: "50%", display: "inline-block" }} /> Creating account…</>
                : "Create account →"
              }
            </button>
          </form>

          <p style={{ marginTop: 24, fontSize: 14, color: "#555555", textAlign: "center" }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{ color: "#a5b4fc", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
          </p>
            <p style={{ marginTop: 12, fontSize: 12, color: "#333333", textAlign: "center", lineHeight: 1.5 }}>
              By creating an account you agree to our <Link href="/terms" style={{ color: "var(--accent)", fontWeight: 600 }}>Terms</Link> and <Link href="/privacy" style={{ color: "var(--accent)", fontWeight: 600 }}>Privacy Policy</Link>.
            </p>
        </motion.div>
      </div>

      {/* Right — features panel */}
      <div style={{
        width: 460, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: 48,
        position: "relative", zIndex: 1,
        borderLeft: "1px solid var(--border)",
        background: "var(--surface)",
      }} className="hidden lg:flex">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          style={{ textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 0 32px rgba(99,102,241,0.35)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white"/></svg>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em", marginBottom: 10 }}>
            Your AI team,<br />always working.
          </h2>
          <p style={{ fontSize: 14, color: "#555555", lineHeight: 1.7, marginBottom: 36 }}>
            CEO, CFO, CTO, CMO, Investor & Legal — all working on your startup in real time.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left", marginBottom: 40 }}>
            {FEATURES.map((item, i) => (
              <motion.div key={item.text}
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 10, background: "var(--bg-3)", border: "1px solid var(--border)" }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 13, color: "var(--text-2)" }}>{item.text}</span>
              </motion.div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[["12,000+","Founders"],["₹240Cr+","Raised"],["94/100","Pitch score"],["4.9★","Rating"]].map(([v, l]) => (
              <div key={l} style={{ padding: "14px", borderRadius: 10, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.12)", textAlign: "center" }}>
                <p style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", lineHeight: 1 }}>{v}</p>
                <p style={{ fontSize: 11, color: "var(--text-3)", marginTop: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
