"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AgentStatus = "thinking" | "working" | "complete" | "idle";

const agents: { name: string; role: string; status: AgentStatus; task: string; initial: string }[] = [
  { name: "AI CEO",     role: "Strategy",    status: "thinking",  task: "Evaluating market positioning", initial: "C" },
  { name: "AI CFO",     role: "Finance",     status: "working",   task: "Building 18-month forecast",     initial: "F" },
  { name: "AI CTO",     role: "Technology",  status: "complete",  task: "Architecture review complete",   initial: "T" },
  { name: "AI CMO",     role: "Marketing",   status: "working",   task: "GTM strategy in progress",       initial: "M" },
  { name: "AI Investor",role: "Fundraising", status: "idle",      task: "Ready for pitch simulation",     initial: "I" },
  { name: "AI Legal",   role: "Compliance",  status: "idle",      task: "Compliance scan complete",       initial: "L" },
];

const statusColors: Record<AgentStatus, string> = { thinking: "#f59e0b", working: "#6366f1", complete: "#22c55e", idle: "#525252" };
const statusLabels: Record<AgentStatus, string> = { thinking: "Thinking", working: "Working", complete: "Complete", idle: "Standby" };

export function LandingAgents() {
  const [selected, setSelected] = useState(0);

  return (
    <section className="min-h-screen flex items-center px-6 py-32">
      <div className="max-w-5xl mx-auto w-full">

        <div className="text-center mb-20">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="eyebrow mb-4">
            Your AI executive team
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="headline text-white"
          >
            Six specialists.<br />
            <span className="grad-accent">Always collaborating.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg mt-4 max-w-lg mx-auto"
          >
            Each agent has deep domain expertise and shares memory with every other agent. They work together, not in isolation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Agent list */}
          <div className="space-y-1">
            {agents.map((a, i) => (
              <motion.button
                key={a.name}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setSelected(i)}
                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all"
                style={{
                  background: selected === i ? "#161616" : "transparent",
                  border: selected === i ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
                }}
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: selected === i ? "#6366f1" : "#1c1c1c" }}>
                  {a.initial}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">{a.name}</p>
                  <p className="text-xs truncate" style={{ color: "#525252" }}>{a.task}</p>
                </div>

                {/* Status */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <motion.div
                    animate={a.status === "thinking" || a.status === "working" ? { opacity: [1, 0.3, 1] } : {}}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: "50%", background: statusColors[a.status] }}
                  />
                  <span className="text-xs" style={{ color: statusColors[a.status] }}>
                    {statusLabels[a.status]}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="card-elevated rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white"
                  style={{ background: "#6366f1" }}>
                  {agents[selected].initial}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{agents[selected].name}</h3>
                  <p className="text-sm" style={{ color: "#525252" }}>{agents[selected].role} Agent</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <motion.div
                    animate={["thinking","working"].includes(agents[selected].status) ? { opacity: [1,0.3,1] } : {}}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: "50%", background: statusColors[agents[selected].status] }}
                  />
                  <span className="text-xs font-medium" style={{ color: statusColors[agents[selected].status] }}>
                    {statusLabels[agents[selected].status]}
                  </span>
                </div>
              </div>

              {/* Live activity */}
              <div className="rounded-xl p-4 mb-5" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-xs mb-2" style={{ color: "#525252" }}>Current task</p>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={["thinking","working"].includes(agents[selected].status) ? { opacity: [1,0.3,1] } : {}}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: "50%", background: statusColors[agents[selected].status], flexShrink: 0 }}
                  />
                  <p className="text-white text-sm">{agents[selected].task}</p>
                </div>
              </div>

              <p className="text-xs" style={{ color: "#525252" }}>
                All agents share memory and context. When the CFO updates financials, the CEO and Investor automatically receive that insight.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
