"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "thinking" | "working" | "complete" | "idle";

const AGENTS: { name: string; role: string; status: Status; task: string; initial: string; color: string }[] = [
  { name: "AI CEO",      role: "Strategy",    status: "thinking",  task: "Evaluating market positioning",  initial: "C", color: "#f59e0b" },
  { name: "AI CFO",      role: "Finance",     status: "working",   task: "Building 18-month forecast",     initial: "F", color: "#4f46e5" },
  { name: "AI CTO",      role: "Technology",  status: "complete",  task: "Architecture review complete",   initial: "T", color: "#16a34a" },
  { name: "AI CMO",      role: "Marketing",   status: "working",   task: "GTM strategy in progress",       initial: "M", color: "#ec4899" },
  { name: "AI Investor", role: "Fundraising", status: "idle",      task: "Ready for pitch simulation",     initial: "I", color: "#0891b2" },
  { name: "AI Legal",    role: "Compliance",  status: "idle",      task: "Compliance scan complete",       initial: "L", color: "#7c3aed" },
];

const STATUS_LABEL: Record<Status, string> = { thinking: "Thinking…", working: "Working…", complete: "Done", idle: "Standby" };

export function LandingAgents() {
  const [selected, setSelected] = useState(0);
  const agent = AGENTS[selected];

  return (
    <section style={{ minHeight: "100svh", display: "flex", alignItems: "center", padding: "120px 24px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", width: "100%" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 72 }}>
          <p className="eyebrow" style={{ marginBottom: 16, color: "var(--accent)" }}>Your AI executive team</p>
          <h2 style={{ fontSize: "clamp(30px, 4.5vw, 58px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "var(--text)", maxWidth: 520 }}>
            Six specialists.<br />
            <span className="grad-accent">Always collaborating.</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          {/* Agent list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {AGENTS.map((a, i) => (
              <motion.button key={a.name} onClick={() => setSelected(i)}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", borderRadius: 12, textAlign: "left", cursor: "pointer", border: selected === i ? `1.5px solid ${a.color}30` : "1.5px solid transparent", background: selected === i ? `${a.color}08` : "transparent", transition: "all 0.15s", width: "100%" }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: selected === i ? "#fff" : a.color, background: selected === i ? a.color : `${a.color}15`, flexShrink: 0, transition: "all 0.15s" }}>
                  {a.initial}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{a.name}</p>
                  <p style={{ fontSize: 12, color: "var(--text-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.task}</p>
                </div>
                <span style={{ fontSize: 11, color: a.status === "idle" ? "var(--text-3)" : a.color, fontWeight: 500, flexShrink: 0 }}>
                  {STATUS_LABEL[a.status]}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Detail card */}
          <AnimatePresence mode="wait">
            <motion.div key={selected} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              style={{ padding: 28, borderRadius: 18, background: "var(--surface)", border: "1.5px solid var(--border)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: agent.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "#fff" }}>
                  {agent.initial}
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{agent.name}</p>
                  <p style={{ fontSize: 13, color: "var(--text-2)" }}>{agent.role} Agent</p>
                </div>
                <span style={{ marginLeft: "auto", fontSize: 12, color: agent.color, fontWeight: 600, background: `${agent.color}12`, padding: "4px 10px", borderRadius: 999 }}>
                  {STATUS_LABEL[agent.status]}
                </span>
              </div>
              <div style={{ padding: "14px 16px", borderRadius: 12, background: "var(--bg-2)", border: "1px solid var(--border)", marginBottom: 16 }}>
                <p style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Current task</p>
                <p style={{ fontSize: 14, color: "var(--text)", fontWeight: 500 }}>{agent.task}</p>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.65 }}>
                All agents share memory. When the CFO updates financials, the CEO and Investor automatically receive that insight.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
