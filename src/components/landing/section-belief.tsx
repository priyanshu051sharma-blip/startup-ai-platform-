"use client";

import { motion } from "framer-motion";

const STATS = [
  { stat: "90%",    label: "of startups fail",      body: "Not because the idea was bad. Because founders lacked the right expertise at the right moment." },
  { stat: "$500/hr", label: "consultant rate",       body: "The advice that changes outcomes is locked behind rates most early-stage founders can never afford." },
  { stat: "1 team", label: "changes everything",     body: "FounderAI gives every founder a full AI executive team — always available, always working." },
];

export function LandingBelief() {
  return (
    <section
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto", width: "100%" }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.08,
            color: "#f5f5f5",
            maxWidth: 640,
            marginBottom: 96,
          }}
        >
          The best ideas die from the wrong advice —{" "}
          <span style={{ color: "#444" }}>or no advice at all.</span>
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.stat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                padding: "56px 0 56px",
                paddingRight: i < STATS.length - 1 ? 48 : 0,
                borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                paddingLeft: i > 0 ? 48 : 0,
              }}
            >
              <p
                style={{
                  fontSize: "clamp(48px, 6vw, 72px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: "#f5f5f5",
                  lineHeight: 1,
                  marginBottom: 12,
                }}
              >
                {s.stat}
              </p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#6366f1", marginBottom: 16, letterSpacing: "0.02em" }}>
                {s.label}
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#888", maxWidth: 280 }}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
