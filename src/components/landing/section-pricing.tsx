"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const PLANS = [
  { name: "Free", price: 0, yearlyPrice: 0, desc: "Get started", features: ["3 AI analyses / month", "Basic health score", "AI chat (limited)", "1 workspace"], cta: "Start free", accent: false },
  { name: "Starter", price: 999, yearlyPrice: 799, desc: "For solo founders", features: ["Unlimited AI chat", "Full startup analysis", "Business model tools", "Competitor analysis", "5 workspaces"], cta: "Get Starter", accent: false },
  { name: "Pro", price: 2499, yearlyPrice: 1999, desc: "For serious founders", features: ["Everything in Starter", "Financial modeling", "Valuation engine", "Pitch deck generator", "Investor simulator", "Grant finder"], cta: "Get Pro", accent: true },
  { name: "Business", price: 5999, yearlyPrice: 4799, desc: "For growing teams", features: ["Everything in Pro", "Team collaboration", "Advanced reports", "Mentor access", "Priority support"], cta: "Get Business", accent: false },
];

export function LandingPricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" style={{ minHeight: "100svh", display: "flex", alignItems: "center", padding: "120px 24px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", width: "100%" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 56 }}>
          <p className="eyebrow" style={{ marginBottom: 16, color: "var(--accent)" }}>Pricing</p>
          <h2 style={{ fontSize: "clamp(30px, 4.5vw, 58px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "var(--text)", marginBottom: 28 }}>
            Simple pricing.<br />
            <span className="grad-accent">No surprises.</span>
          </h2>
          {/* Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 14, color: yearly ? "var(--text-3)" : "var(--text)", fontWeight: 500, transition: "color 0.15s" }}>Monthly</span>
            <button onClick={() => setYearly(y => !y)} role="switch" aria-checked={yearly}
              style={{ width: 42, height: 24, borderRadius: 999, background: yearly ? "var(--accent)" : "var(--bg-3)", border: "1.5px solid var(--border-2)", position: "relative", cursor: "pointer", transition: "background 0.2s" }}>
              <motion.div animate={{ x: yearly ? 19 : 2 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{ position: "absolute", top: 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
            </button>
            <span style={{ fontSize: 14, color: yearly ? "var(--text)" : "var(--text-3)", fontWeight: 500, transition: "color 0.15s" }}>
              Yearly <span style={{ fontSize: 12, color: "var(--green)", fontWeight: 600 }}>save 20%</span>
            </span>
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {PLANS.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              style={{ padding: "24px 20px", borderRadius: 18, background: plan.accent ? "var(--ink)" : "var(--surface)", border: plan.accent ? "none" : "1.5px solid var(--border)", display: "flex", flexDirection: "column", boxShadow: plan.accent ? "0 8px 40px rgba(10,10,15,0.2)" : "0 2px 12px rgba(0,0,0,0.04)" }}>
              <p style={{ fontWeight: 700, color: plan.accent ? "#fff" : "var(--text)", marginBottom: 3, fontSize: 15 }}>{plan.name}</p>
              <p style={{ fontSize: 12, color: plan.accent ? "rgba(255,255,255,0.5)" : "var(--text-3)", marginBottom: 20 }}>{plan.desc}</p>
              <motion.p key={yearly ? "y" : "m"} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: 32, fontWeight: 800, color: plan.accent ? "#fff" : "var(--text)", letterSpacing: "-0.05em", marginBottom: 20, lineHeight: 1 }}>
                {plan.price === 0 ? "Free" : `₹${yearly ? plan.yearlyPrice : plan.price}`}
                {plan.price > 0 && <span style={{ fontSize: 13, fontWeight: 400, color: plan.accent ? "rgba(255,255,255,0.4)" : "var(--text-3)" }}> /mo</span>}
              </motion.p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9, flex: 1, marginBottom: 20 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: plan.accent ? "rgba(255,255,255,0.75)" : "var(--text-2)" }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ marginTop: 1, flexShrink: 0 }}>
                      <path d="M2.5 6.5L5 9L10.5 3.5" stroke={plan.accent ? "#fff" : "var(--accent)"} strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup" className="pricing-cta"
                style={{ display: "block", textAlign: "center", padding: "11px 0", borderRadius: 11, fontSize: 13, fontWeight: 600, color: plan.accent ? "var(--ink)" : "var(--text)", textDecoration: "none", background: plan.accent ? "var(--yellow)" : "var(--bg-3)", border: plan.accent ? "none" : "1.5px solid var(--border-2)" }}>
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
