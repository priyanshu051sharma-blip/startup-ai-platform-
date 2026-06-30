"use client";

import { motion } from "framer-motion";

const STATS = [
  { stat: "90%",     label: "of startups fail",    body: "Not because the idea was bad. Because founders lacked the right expertise at the right moment." },
  { stat: "$500/hr", label: "consultant rate",      body: "The advice that changes outcomes is locked behind rates most early-stage founders can never afford." },
  { stat: "1 team",  label: "changes everything",   body: "FounderAI gives every founder a full AI executive team — always available, always working." },
];

export function LandingBelief() {
  return (
    <section style={{ minHeight: "100svh", display: "flex", alignItems: "center", padding: "0 24px", background: "var(--bg-2)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", width: "100%" }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: "clamp(30px, 4.5vw, 58px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "var(--text)", maxWidth: 620, marginBottom: 80 }}
        >
          The best ideas die from the wrong advice —{" "}
          <span style={{ color: "var(--text-3)" }}>or no advice at all.</span>
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", borderTop: "2px solid var(--border)" }}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.stat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                padding: "52px 0",
                paddingRight: i < STATS.length - 1 ? 48 : 0,
                paddingLeft: i > 0 ? 48 : 0,
                borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <p style={{ fontSize: "clamp(44px, 5.5vw, 68px)", fontWeight: 800, letterSpacing: "-0.05em", color: "var(--text)", lineHeight: 1, marginBottom: 10 }}>
                {s.stat}
              </p>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", marginBottom: 14, letterSpacing: "0.01em" }}>
                {s.label}
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-2)", maxWidth: 280 }}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
