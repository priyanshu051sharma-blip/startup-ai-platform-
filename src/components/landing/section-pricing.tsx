"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: 0,
    yearlyPrice: 0,
    desc: "Get started",
    features: ["3 AI analyses / month", "Basic health score", "AI chat (limited)", "1 workspace"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Starter",
    price: 999,
    yearlyPrice: 799,
    desc: "For solo founders",
    features: ["Unlimited AI chat", "Full startup analysis", "Business model tools", "Competitor analysis", "5 workspaces"],
    cta: "Start Starter",
    highlight: false,
  },
  {
    name: "Pro",
    price: 2499,
    yearlyPrice: 1999,
    desc: "For serious founders",
    features: ["Everything in Starter", "Financial modeling", "Valuation engine", "Pitch deck generator", "Investor simulator", "Grant finder"],
    cta: "Start Pro",
    highlight: true,
  },
  {
    name: "Business",
    price: 5999,
    yearlyPrice: 4799,
    desc: "For growing teams",
    features: ["Everything in Pro", "Team collaboration", "Advanced reports", "Mentor access", "Priority support"],
    cta: "Start Business",
    highlight: false,
  },
];

export function LandingPricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="px-6 py-32">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="eyebrow mb-4">
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="headline text-white mb-6"
          >
            Simple pricing.<br /><span className="grad-accent">No surprises.</span>
          </motion.h2>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="text-sm" style={{ color: yearly ? "#525252" : "#f5f5f5" }}>Monthly</span>
            <button
              onClick={() => setYearly((y) => !y)}
              className="relative transition-colors"
              style={{ width: 44, height: 24, borderRadius: 999, background: yearly ? "#6366f1" : "#1c1c1c", border: "1px solid rgba(255,255,255,0.1)" }}
              role="switch"
              aria-checked={yearly}
            >
              <motion.div
                animate={{ x: yearly ? 20 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{ position: "absolute", top: 3, width: 16, height: 16, borderRadius: "50%", background: "#fff" }}
              />
            </button>
            <span className="text-sm" style={{ color: yearly ? "#f5f5f5" : "#525252" }}>
              Yearly <span style={{ color: "#4ade80", fontSize: 11 }}>save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 flex flex-col"
              style={{
                background: plan.highlight ? "#6366f1" : "#0f0f0f",
                border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p className="font-semibold text-white mb-1">{plan.name}</p>
              <p className="text-xs mb-5" style={{ color: plan.highlight ? "rgba(255,255,255,0.65)" : "#525252" }}>
                {plan.desc}
              </p>

              <div className="mb-5">
                <motion.span
                  key={yearly ? "y" : "m"}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white font-bold"
                  style={{ fontSize: 28, letterSpacing: "-0.04em" }}
                >
                  {plan.price === 0 ? "Free" : `₹${yearly ? plan.yearlyPrice : plan.price}`}
                </motion.span>
                {plan.price > 0 && (
                  <span className="text-xs ml-1" style={{ color: plan.highlight ? "rgba(255,255,255,0.5)" : "#525252" }}>/mo</span>
                )}
              </div>

              <ul className="space-y-2 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs"
                    style={{ color: plan.highlight ? "rgba(255,255,255,0.8)" : "#a0a0a0" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginTop: 1, flexShrink: 0 }}>
                      <path d="M2 6L5 9L10 3" stroke={plan.highlight ? "#fff" : "#6366f1"} strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/dashboard"
                className="btn text-sm text-center"
                style={{
                  background: plan.highlight ? "rgba(255,255,255,0.2)" : "#161616",
                  color: "#fff",
                  border: plan.highlight ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10,
                  padding: "9px 0",
                  display: "block",
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
