"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
  status: "thinking" | "working" | "idle" | "complete";
  task: string;
  confidence: number;
  lastAction: string;
}

const AGENTS: Agent[] = [
  { id: "ceo",      name: "CEO",      role: "Strategy",     avatar: "🏛️", color: "#4F8CFF",  status: "thinking",  task: "Evaluating pivot strategy", confidence: 88, lastAction: "Reviewed Q2 roadmap" },
  { id: "cfo",      name: "CFO",      role: "Finance",      avatar: "📊", color: "#10B981",  status: "working",   task: "Building 18-month forecast", confidence: 94, lastAction: "Updated burn analysis" },
  { id: "investor", name: "Investor", role: "Fundraising",  avatar: "💰", color: "#F59E0B",  status: "idle",      task: "Matching investor profiles", confidence: 79, lastAction: "Scanned 240 investors" },
  { id: "cto",      name: "CTO",      role: "Technology",   avatar: "⚡", color: "#7C3AED",  status: "complete",  task: "Architecture review done",   confidence: 91, lastAction: "Flagged 2 tech risks" },
  { id: "cmo",      name: "CMO",      role: "Marketing",    avatar: "📣", color: "#4F8CFF",  status: "working",   task: "GTM strategy generation",    confidence: 83, lastAction: "Analyzed 5 channels" },
  { id: "legal",    name: "Legal",    role: "Compliance",   avatar: "⚖️", color: "#EF4444",  status: "idle",      task: "IP & compliance scan",       confidence: 96, lastAction: "Found patent opportunity" },
];

const statusConfig = {
  thinking: { label: "Thinking",  color: "#F59E0B", pulse: true  },
  working:  { label: "Working",   color: "#4F8CFF", pulse: true  },
  idle:     { label: "Standby",   color: "#737373", pulse: false },
  complete: { label: "Complete",  color: "#10B981", pulse: false },
};

export function AiExecutiveTeam() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [agents, setAgents] = useState(AGENTS);

  // Simulate live status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents((prev) =>
        prev.map((a) => {
          if (Math.random() > 0.85) {
            const statuses: Agent["status"][] = ["thinking", "working", "idle", "complete"];
            return { ...a, status: statuses[Math.floor(Math.random() * statuses.length)] };
          }
          return a;
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const active = agents.find((a) => a.id === activeAgent);

  return (
    <div className="widget-elevated p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-[14px]">AI Executive Team</h3>
          <p className="text-[#737373] text-[11px] mt-0.5">Live collaboration in progress</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[#10B981] text-[11px] font-medium">All Online</span>
        </div>
      </div>

      {/* Agent grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {agents.map((agent) => {
          const sc = statusConfig[agent.status];
          const isSelected = activeAgent === agent.id;

          return (
            <motion.button
              key={agent.id}
              onClick={() => setActiveAgent(isSelected ? null : agent.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative rounded-[16px] p-3 text-left transition-all border cursor-pointer focus-visible:outline-none overflow-hidden"
              style={{
                background: isSelected ? `${agent.color}12` : "var(--surface-3)",
                borderColor: isSelected ? `${agent.color}35` : "var(--border)",
              }}
              aria-pressed={isSelected}
            >
              {/* Ambient glow when active */}
              {isSelected && (
                <div
                  className="absolute inset-0 rounded-[16px] pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${agent.color}10, transparent 70%)` }}
                />
              )}

              <div className="relative flex items-start justify-between mb-2">
                <span className="text-xl">{agent.avatar}</span>
                <div className="flex items-center gap-1">
                  {sc.pulse && (
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: sc.color }}
                    />
                  )}
                  {!sc.pulse && (
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: sc.color }} />
                  )}
                </div>
              </div>

              <p className="text-white text-[12px] font-semibold">AI {agent.name}</p>
              <p className="text-[#737373] text-[10px] mt-0.5 truncate">{agent.task}</p>

              {/* Confidence bar */}
              <div className="mt-2 h-0.5 rounded-full overflow-hidden" style={{ background: "var(--surface-3)" }}>
                <motion.div
                  animate={{ width: `${agent.confidence}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: agent.color }}
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className="rounded-[14px] p-4 border"
              style={{
                background: `${active.color}08`,
                borderColor: `${active.color}20`,
              }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xl">{active.avatar}</span>
                <div>
                  <p className="text-white text-[13px] font-semibold">AI {active.name}</p>
                  <p className="text-[11px]" style={{ color: active.color }}>{active.role} Agent</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-white text-[13px] font-bold">{active.confidence}%</p>
                  <p className="text-[#737373] text-[10px]">Confidence</p>
                </div>
              </div>
              <p className="text-[#B4B4B4] text-[12px] leading-relaxed">{active.task}</p>
              <p className="text-[#737373] text-[11px] mt-2">Last: {active.lastAction}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collaboration activity */}
      {!active && (
        <div className="mt-auto space-y-1.5">
          <p className="label mb-2">Live Activity</p>
          {[
            { agent: "CFO",      action: "Calculating Q3 cash flow projections...", color: "#10B981" },
            { agent: "CEO",      action: "Evaluating market pivot opportunity...",  color: "#4F8CFF" },
            { agent: "CMO",      action: "Generating GTM strategy for SaaS...",     color: "#7C3AED" },
          ].map((item, i) => (
            <motion.div
              key={item.agent}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 text-[11px]"
            >
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: item.color }}
              />
              <span className="font-medium" style={{ color: item.color }}>AI {item.agent}</span>
              <span className="text-[#737373] truncate">{item.action}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
