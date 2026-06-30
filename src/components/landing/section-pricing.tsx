"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const PLANS = [
  {
    name: "Free",
    price: 0,
    yearlyPrice: 0,
    desc: "Get started",
    features: ["3 AI analyses / month", "Basic health score", "AI chat (limited)", "1 workspace"],
    cta: "Start free",
    accent: false,
  },
  {
    name: "Starter",
    price: 999,
    yearlyPrice: 799,
    desc: "For solo founders",
    features: ["Unlimited AI chat", "Full startup analysis", "Business model tools", "Competitor analysis", "5 workspaces"],
    cta: "Get Starter",
    accent: false,
  },
  {
    name: "Pro",
    price: 2499,
    yearlyPrice: 1999,
    desc: "For serious founders",
    features: ["Everything in Starter", "Financial modeling", "Valuation engine", "Pitch deck generator", "Investor simulator", "Grant finder"],
    cta: "Get Pro",
    accent: true,
  },
  {
    name: "Business",
    price: 5999,
    yearlyPrice: 4799,
    desc: "For growing teams",
    features: ["Everything in Pro", "Team collaboration", "Advanced reports", "Mentor access", "Priority support"],
    cta: "Get Business",
    accent: false,
  },
];

export function LandingPricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section
      id="pricing"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        padding: "120px 24px",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto", width: "100%" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 64 }}
        >
          <p className="eyebrow" style={{ marginBottom: 20 }}>Pricing</p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
              color: "#f5f5f5",
              marginBottom: 32,
            }}
          >
            Simple pricing.
            <br />
            <span className="grad-accent">No surprises.</span>
          </h2>

          {/* Billing toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 14, color: yearly ? "#444" : "#f5f5f5", transition: "color 0.15s" }}>Monthly</span>
            <button
              onClick={() => setYearly((y) => !y)}
              role="switch"
              aria-checked={yearly}
              style={{
                width: 40, height: 22, borderRadius: 999,
                background: yearly ? "#6366f1" : "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.08)",
                position: "relative",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              <motion.div
                animate={{ x: yearly ? 18 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{ position: "absolute", top: 2, width: 16, height: 16, borderRadius: "50%", background: "#fff" }}
              />
            </button>
            <span style={{ fontSize: 14, color: yearly ? "#f5f5f5" : "#444", transition: "color 0.15s" }}>
              Yearly{" "}
              <span style={{ fontSize: 12, color: "#4ade80" }}>save 20%</span>
            </span>
          </div>
        </motion.div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="max-lg:grid-cols-2 max-sm:grid-cols-1">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              style={{
                padding: "28px 24px",
                borderRadius: 20,
                background: plan.accent ? "#6366f1" : "#0f0f0f",
                border: plan.accent ? "none" : "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p style={{ fontWeight: 600, color: "#fff", marginBottom: 4, fontSize: 15 }}>{plan.name}</p>
              <p style={{ fontSize: 12, color: plan.accent ? "rgba(255,255,255,0.55)" : "#444", marginBottom: 24 }}>
                {plan.desc}
              </p>

              <motion.p
                key={yearly ? "y" : "m"}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.04em",
                  marginBottom: 24,
                  lineHeight: 1,
                }}
              >
                {plan.price === 0 ? "Free" : `₹${yearly ? plan.yearlyPrice : plan.price}`}
                {plan.price > 0 && (
                  <span style={{ fontSize: 13, fontWeight: 400, color: plan.accent ? "rgba(255,255,255,0.5)" : "#444" }}> /mo</span>
                )}
              </motion.p>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flex: 1, marginBottom: 24 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: plan.accent ? "rgba(255,255,255,0.8)" : "#888" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginTop: 1, flexShrink: 0 }} aria-hidden="true">
                      <path d="M2 6L5 9L10 3" stroke={plan.accent ? "#fff" : "#6366f1"} strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/dashboard"
                className="pricing-cta"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "10px 0",
                  borderRadius: 12,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#fff",
                  textDecoration: "none",
                  background: plan.accent ? "rgba(255,255,255,0.18)" : "#1a1a1a",
                  border: plan.accent ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
