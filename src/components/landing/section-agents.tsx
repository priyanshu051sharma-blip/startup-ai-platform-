"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "thinking" | "working" | "complete" | "idle";

const AGENTS: { name: string; role: string; status: Status; task: string; initial: string }[] = [
  { name: "AI CEO",      role: "Strategy",    status: "thinking",  task: "Evaluating market positioning",   initial: "C" },
  { name: "AI CFO",      role: "Finance",     status: "working",   task: "Building 18-month forecast",      initial: "F" },
  { name: "AI CTO",      role: "Technology",  status: "complete",  task: "Architecture review complete",    initial: "T" },
  { name: "AI CMO",      role: "Marketing",   status: "working",   task: "GTM strategy in progress",        initial: "M" },
  { name: "AI Investor", role: "Fundraising", status: "idle",      task: "Ready for pitch simulation",      initial: "I" },
  { name: "AI Legal",    role: "Compliance",  status: "idle",      task: "Compliance scan complete",        initial: "L" },
];

const STATUS_COLOR: Record<Status, string> = {
  thinking: "#f59e0b",
  working:  "#6366f1",
  complete: "#22c55e",
  idle:     "#2a2a2a",
};
const STATUS_LABEL: Record<Status, string> = {
  thinking: "Thinking",
  working:  "Working",
  complete: "Done",
  idle:     "Standby",
};

export function LandingAgents() {
  const [selected, setSelected] = useState(0);
  const agent = AGENTS[selected];

  return (
    <section
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
          style={{ marginBottom: 80 }}
        >
          <p className="eyebrow" style={{ marginBottom: 20 }}>Your AI executive team</p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
              color: "#f5f5f5",
              maxWidth: 560,
            }}
          >
            Six specialists.
            <br />
            <span className="grad-accent">Always collaborating.</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="max-md:grid-cols-1">
          {/* Agent list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {AGENTS.map((a, i) => (
              <motion.button
                key={a.name}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "14px 16px",
                  borderRadius: 12,
                  textAlign: "left",
                  cursor: "pointer",
                  border: selected === i ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
                  background: selected === i ? "#141414" : "transparent",
                  transition: "all 0.15s",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0,
                    background: selected === i ? "#6366f1" : "#1a1a1a",
                    transition: "background 0.15s",
                  }}
                >
                  {a.initial}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "#f5f5f5", marginBottom: 2 }}>{a.name}</p>
                  <p style={{ fontSize: 12, color: "#444", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.task}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                  <motion.div
                    animate={a.status === "thinking" || a.status === "working" ? { opacity: [1, 0.25, 1] } : {}}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: "50%", background: STATUS_COLOR[a.status] }}
                  />
                  <span style={{ fontSize: 11, color: STATUS_COLOR[a.status] }}>{STATUS_LABEL[a.status]}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Detail card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                padding: 32,
                borderRadius: 20,
                background: "#0f0f0f",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
                <div
                  style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: "#6366f1",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, fontWeight: 700, color: "#fff",
                  }}
                >
                  {agent.initial}
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#f5f5f5" }}>{agent.name}</p>
                  <p style={{ fontSize: 13, color: "#444" }}>{agent.role} Agent</p>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
                  <motion.div
                    animate={["thinking", "working"].includes(agent.status) ? { opacity: [1, 0.25, 1] } : {}}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: "50%", background: STATUS_COLOR[agent.status] }}
                  />
                  <span style={{ fontSize: 12, color: STATUS_COLOR[agent.status], fontWeight: 500 }}>
                    {STATUS_LABEL[agent.status]}
                  </span>
                </div>
              </div>

              <div style={{ padding: "16px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)", marginBottom: 20 }}>
                <p style={{ fontSize: 11, color: "#444", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Current task</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <motion.div
                    animate={["thinking", "working"].includes(agent.status) ? { opacity: [1, 0.25, 1] } : {}}
                    transition={{ duration: 0.9, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: "50%", background: STATUS_COLOR[agent.status], flexShrink: 0 }}
                  />
                  <p style={{ fontSize: 14, color: "#f5f5f5" }}>{agent.task}</p>
                </div>
              </div>

              <p style={{ fontSize: 13, color: "#444", lineHeight: 1.65 }}>
                All agents share memory. When the CFO updates financials, the CEO and Investor automatically receive that insight.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
