"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { getUser, setUser, findRegisteredUser, createUser } from "@/lib/auth";

function AuthCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let id: number, t = 0;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
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
      const cx = W / 2, cy = H / 2;
      for (let s = 0; s < 3; s++) {
        const r = 100 + s * 120 + ((t * 18) % 80);
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99,102,241,${Math.max(0, 0.05 - r/3000)})`; ctx.lineWidth = 1; ctx.stroke();
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

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
    // Check registered users first
    const registered = findRegisteredUser(form.email);
    if (registered) {
      // load preserved profile (may include onboarded: true)
      setUser(registered);
      router.push(registered.onboarded ? "/dashboard" : "/onboarding");
    } else {
      // create a new user and send to onboarding
      const newUser = createUser(form.email.split("@")[0], form.email);
      router.push("/onboarding");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100svh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative" }}>
      <AuthCanvas />

      {/* Glow */}
      <div aria-hidden style={{ position: "fixed", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          width: "100%", maxWidth: 640, position: "relative", zIndex: 1,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16, padding: "36px",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 32, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px rgba(99,102,241,0.35)" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7H12M7.5 2.5L12 7L7.5 11.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em" }}>FounderAI</span>
        </Link>

        <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 6 }}>Welcome back</h1>
        <p style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 28 }}>Sign in to your workspace.</p>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {["email", "password"].map(field => (
            <div key={field}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#888888", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {field === "email" ? "Email" : "Password"}
              </label>
              <input
                type={field}
                placeholder={field === "email" ? "you@startup.com" : "Your password"}
                value={form[field as keyof typeof form]}
                onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                autoComplete={field === "email" ? "email" : "current-password"}
                style={{
                  width: "100%", padding: "11px 14px", fontSize: 14, borderRadius: 8,
                  border: "1px solid var(--border-2)",
                  background: "var(--bg-3)", color: "var(--text)",
                  outline: "none", transition: "border-color 0.15s, box-shadow 0.15s",
                  fontFamily: "inherit",
                }}
                onFocus={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-light)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "var(--border-2)"; e.currentTarget.style.boxShadow = "none"; }}
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
              background: loading ? "var(--accent-light)" : "linear-gradient(135deg, #f8fafc, #ffffff)",
              color: "var(--text)", border: "none",
              fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.18s",
              boxShadow: loading ? "none" : "0 20px 40px rgba(0,0,0,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontFamily: "inherit",
            }}>
            {loading
              ? <><span className="spin" style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block" }} /> Signing in…</>
              : "Sign in →"
            }
          </button>
        </form>

        <p style={{ marginTop: 24, fontSize: 14, color: "var(--text-3)", textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" style={{ color: "#a5b4fc", fontWeight: 600, textDecoration: "none" }}>Create one free</Link>
        </p>
      </motion.div>
    </div>
  );
}
