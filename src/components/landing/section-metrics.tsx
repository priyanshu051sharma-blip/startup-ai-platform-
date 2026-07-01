"use client";

import { motion } from "framer-motion";

const NUMBERS = [
  { value: "12,000+", label: "Founders" },
  { value: "240Cr+",  label: "Capital raised" },
  { value: "94/100",  label: "Avg pitch score" },
  { value: "4.9/5",   label: "Rating" },
];

const TESTIMONIALS = [
  {
    quote: "The investor simulator alone was worth it. I walked into my seed round having already answered every tough question.",
    name: "Priya Sharma",
    role: "Founder, MedAI",
    result: "Raised 1.5 Cr",
  },
  {
    quote: "I had no financial background. The AI CFO built a 24-month model that investors said was one of the best they had seen.",
    name: "Rahul Mehta",
    role: "CEO, FinStack",
    result: "Raised 3 Cr",
  },
  {
    quote: "The grant finder found three schemes I didn't know existed. One covered our entire infrastructure cost for the year.",
    name: "Vikram Nair",
    role: "Founder, AgriSense",
    result: "50L grant",
  },
];

export function LandingMetrics() {
  return (
    <section
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        padding: "120px 24px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto", width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            marginBottom: 96,
          }}
        >
          {NUMBERS.map((n, i) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{
                padding: "48px 0",
                textAlign: "center",
                borderRight: i < NUMBERS.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <p style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 8 }}>
                {n.value}
              </p>
              <p style={{ fontSize: 13, color: "var(--text-3)" }}>{n.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="eyebrow"
          style={{ marginBottom: 48, textAlign: "center" }}
        >
          From founders who built with FounderAI
        </motion.p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ padding: 28, borderRadius: 20, background: "var(--surface)", border: "1px solid var(--border)", display: "flex", flexDirection: "column" }}
            >
              <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text-2)", marginBottom: 28, flex: 1 }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                  {t.name[0]}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.name}</p>
                  <p style={{ fontSize: 12, color: "var(--text-3)" }}>{t.role}</p>
                </div>
                <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, background: "rgba(34,197,94,0.12)", color: "#4ade80", fontWeight: 500, flexShrink: 0 }}>
                  {t.result}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}