"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { createUser } from "@/lib/auth";

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

  return (
    <div style={{ minHeight: "100svh", display: "flex", background: "var(--bg)" }}>
      {/* Left panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: "100%", maxWidth: 400 }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 40, textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7H12M7.5 2.5L12 7L7.5 11.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em" }}>FounderAI</span>
          </Link>

          <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 8 }}>
            Create your account
          </h1>
          <p style={{ fontSize: 15, color: "var(--text-2)", marginBottom: 32 }}>
            Your AI startup team is ready. Let&apos;s get started.
          </p>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-2)", marginBottom: 6 }}>Full name</label>
              <input className="input" type="text" placeholder="Prince Sharma" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} autoComplete="name" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-2)", marginBottom: 6 }}>Email</label>
              <input className="input" type="email" placeholder="you@startup.com" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} autoComplete="email" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-2)", marginBottom: 6 }}>Password</label>
              <input className="input" type="password" placeholder="Min. 6 characters" value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))} autoComplete="new-password" />
            </div>

            {error && <p style={{ fontSize: 13, color: "var(--red)", background: "var(--red-light)", padding: "10px 14px", borderRadius: 8 }}>{error}</p>}

            <button type="submit" className="btn btn-black" disabled={loading}
              style={{ width: "100%", padding: "13px", fontSize: 15, marginTop: 4 }}>
              {loading ? <span className="spin" style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block" }} /> : "Create account →"}
            </button>
          </form>

          <p style={{ marginTop: 24, fontSize: 14, color: "var(--text-3)", textAlign: "center" }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
          </p>

          <p style={{ marginTop: 16, fontSize: 12, color: "var(--text-3)", textAlign: "center", lineHeight: 1.5 }}>
            By creating an account you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>

      {/* Right panel */}
      <div style={{ width: 480, background: "var(--ink)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 48 }} className="hidden lg:flex">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} style={{ textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white"/></svg>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 12 }}>
            Your AI team,<br/>always working.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 40 }}>
            CEO, CFO, CTO, CMO, Investor and Legal — all working on your startup in real time.
          </p>
          {[
            { icon: "💡", text: "Validates your idea with market data" },
            { icon: "📊", text: "Builds investor-grade financials" },
            { icon: "🎯", text: "Preps you for any investor question" },
            { icon: "⚡", text: "Available 24/7, costs 1% of a consultant" },
          ].map((item) => (
            <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, textAlign: "left" }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
