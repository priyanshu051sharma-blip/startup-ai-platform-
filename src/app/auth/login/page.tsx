"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { getUser, setUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));

    // Check if user exists in localStorage
    const existing = getUser();
    if (existing && existing.email === form.email) {
      setUser(existing);
      router.push(existing.onboarded ? "/dashboard" : "/onboarding");
    } else {
      // Demo: accept any credentials and create a session
      setUser({ id: crypto.randomUUID(), name: form.email.split("@")[0], email: form.email, createdAt: new Date().toISOString(), onboarded: false });
      router.push("/onboarding");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100svh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)",
      padding: "24px",
    }}>
      {/* Background orb */}
      <div aria-hidden="true" style={{
        position: "fixed", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          width: "100%", maxWidth: 420,
          background: "#ffffff",
          borderRadius: 20,
          padding: "40px 36px",
          boxShadow: "0 8px 48px rgba(0,0,0,0.4)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 32, textDecoration: "none" }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7H12M7.5 2.5L12 7L7.5 11.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#0a0a0f", letterSpacing: "-0.02em" }}>FounderAI</span>
        </Link>

        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0a0a0f", letterSpacing: "-0.04em", marginBottom: 6 }}>Welcome back</h1>
        <p style={{ fontSize: 14, color: "#52526b", marginBottom: 28 }}>Sign in to your workspace.</p>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#52526b", marginBottom: 6 }}>Email</label>
            <input
              style={{
                width: "100%", padding: "10px 14px", fontSize: 14, borderRadius: 10,
                border: "1.5px solid rgba(0,0,0,0.12)", background: "#f7f8fc", color: "#0a0a0f",
                outline: "none", transition: "border-color 0.15s",
              }}
              type="email" placeholder="you@startup.com" value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))} autoComplete="email" />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#52526b" }}>Password</label>
              <Link href="#" style={{ fontSize: 12, color: "#4f46e5", textDecoration: "none" }}>Forgot?</Link>
            </div>
            <input
              style={{
                width: "100%", padding: "10px 14px", fontSize: 14, borderRadius: 10,
                border: "1.5px solid rgba(0,0,0,0.12)", background: "#f7f8fc", color: "#0a0a0f",
                outline: "none", transition: "border-color 0.15s",
              }}
              type="password" placeholder="Your password" value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))} autoComplete="current-password" />
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
              : "Sign in →"
            }
          </button>
        </form>

        <p style={{ marginTop: 24, fontSize: 14, color: "#9898b0", textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" style={{ color: "#4f46e5", fontWeight: 600, textDecoration: "none" }}>Create one free</Link>
        </p>
      </motion.div>
    </div>
  );
}
