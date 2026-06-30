"use client";

import { motion } from "framer-motion";

const DATA = [
  {
    stat: "90%",
    label: "of startups fail",
    body: "Not because the idea was bad. Because founders lacked the right expertise at the right moment.",
  },
  {
    stat: "$500/hr",
    label: "consultant rate",
    body: "The advice that changes outcomes is locked behind rates most early-stage founders can never afford.",
  },
  {
    stat: "1 platform",
    label: "changes everything",
    body: "FounderAI gives every founder a full AI executive team — always available, zero billing by the hour.",
  },
];

export function LandingBelief() {
  return (
    <section style={{ padding: "120px 0" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow"
          style={{ marginBottom: 20 }}
        >
          Why FounderAI exists
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          style={{
            fontSize: "clamp(28px, 4.5vw, 56px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#f5f5f5",
            maxWidth: 640,
            marginBottom: 80,
          }}
        >
          The best ideas die because of the wrong advice — or no advice at all.
        </motion.h2>

        {/* Grid with hairline borders */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {DATA.map((d, i) => (
            <motion.div
              key={d.stat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: "40px 36px",
                background: "#080808",
                borderRight: i < DATA.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <p style={{ fontSize: 52, fontWeight: 700, letterSpacing: "-0.04em", color: "#f5f5f5", lineHeight: 1, marginBottom: 8 }}>
                {d.stat}
              </p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#6366f1", marginBottom: 14, letterSpacing: "0.02em" }}>
                {d.label}
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "#a0a0a0" }}>{d.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
