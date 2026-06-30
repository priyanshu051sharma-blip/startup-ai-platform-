"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { createUser } from "@/lib/auth";

const FEATURES = [
  { icon: "💡", text: "Validates your idea with market data" },
  { icon: "📊", text: "Builds investor-grade financials" },
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

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 14px", fontSize: 14, borderRadius: 10,
    border: "1.5px solid rgba(0,0,0,0.12)", background: "#f7f8fc", color: "#0a0a0f",
    outline: "none", transition: "border-color 0.15s",
  };

  return (
    <div style={{ minHeight: "100svh", display: "flex", background: "#ffffff" }}>
      {/* Left panel — clean white form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", background: "#ffffff" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: "100%", maxWidth: 400 }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 40, textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7H12M7.5 2.5L12 7L7.5 11.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#0a0a0f", letterSpacing: "-0.02em" }}>FounderAI</span>
          </Link>

          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0a0a0f", letterSpacing: "-0.04em", marginBottom: 8 }}>
            Create your account
          </h1>
          <p style={{ fontSize: 15, color: "#52526b", marginBottom: 32 }}>
            Your AI startup team is ready. Let&apos;s get started.
          </p>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#52526b", marginBottom: 6 }}>Full name</label>
              <input style={inputStyle} type="text" placeholder="Prince Sharma" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} autoComplete="name" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#52526b", marginBottom: 6 }}>Email</label>
              <input style={inputStyle} type="email" placeholder="you@startup.com" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} autoComplete="email" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#52526b", marginBottom: 6 }}>Password</label>
              <input style={inputStyle} type="password" placeholder="Min. 6 characters" value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))} autoComplete="new-password" />
            </div>

            {error && (
              <p style={{ fontSize: 13, color: "#dc2626", background: "#fee2e2", padding: "10px 14px", borderRadius: 8 }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "13px", fontSize: 15, marginTop: 4,
                background: "#0a0a0f", color: "#fff", border: "none", borderRadius: 10,
                fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1, transition: "opacity 0.15s",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {loading
                ? <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                : "Create account →"
              }
            </button>
          </form>

          <p style={{ marginTop: 24, fontSize: 14, color: "#9898b0", textAlign: "center" }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{ color: "#4f46e5", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
          </p>

          <p style={{ marginTop: 16, fontSize: 12, color: "#9898b0", textAlign: "center", lineHeight: 1.5 }}>
            By creating an account you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>

      {/* Right panel — dark gradient */}
      <div
        className="hidden lg:flex"
        style={{
          width: 480,
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 48,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow orb */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{ textAlign: "center", position: "relative", zIndex: 1 }}
        >
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white"/></svg>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em", marginBottom: 12 }}>
            Your AI team,<br/>always working.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 40 }}>
            CEO, CFO, CTO, CMO, Investor and Legal — all working on your startup in real time.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
            {FEATURES.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>{item.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Social proof numbers */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 48 }}>
            {[
              { v: "12,000+", l: "Founders" },
              { v: "240Cr+", l: "Capital raised" },
              { v: "94/100", l: "Avg pitch score" },
              { v: "4.9★", l: "User rating" },
            ].map(s => (
              <div key={s.l} style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p style={{ fontSize: 20, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1 }}>{s.v}</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
