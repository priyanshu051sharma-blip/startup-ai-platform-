"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, TrendingUp, FileText, Brain, DollarSign, Target, ChevronDown } from "lucide-react";

interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  category: "analysis" | "financial" | "report" | "insight" | "milestone";
  title: string;
  detail: string;
  impact?: string;
  color: string;
  icon: React.ElementType;
}

const events: TimelineEvent[] = [
  { id: "1", date: "Today",     time: "09:14",  category: "analysis",   title: "Market Research Complete",       detail: "Identified 3 new market segments with combined TAM of ₹840 Cr", impact: "+4 Market Score",    color: "#4F8CFF",  icon: Brain },
  { id: "2", date: "Today",     time: "06:30",  category: "insight",    title: "Overnight AI Analysis",          detail: "Health Score improved 3 points. Pricing opportunity flagged.",    impact: "+3 Health Score",    color: "#7C3AED",  icon: Brain },
  { id: "3", date: "Yesterday", time: "16:45",  category: "financial",  title: "Financial Model Updated",        detail: "Burn rate reduced by 8% after vendor renegotiation model applied", impact: "+2 mo Runway",       color: "#10B981",  icon: DollarSign },
  { id: "4", date: "Yesterday", time: "14:20",  category: "report",     title: "Investor Report Generated",      detail: "Created 24-page investor-grade report with valuation analysis",    impact: "Deck ready",          color: "#F59E0B",  icon: FileText },
  { id: "5", date: "Jun 28",    time: "11:10",  category: "milestone",  title: "Pitch Score: 94/100",            detail: "Highest pitch simulation score to date. 3 investor intros unlocked", impact: "Milestone",          color: "#10B981",  icon: Target },
  { id: "6", date: "Jun 27",    time: "09:00",  category: "analysis",   title: "Competitor Funding Detected",    detail: "TechRival raised ₹15Cr. AI updated competitive positioning.", impact: "Strategy updated",    color: "#EF4444",  icon: TrendingUp },
];

const categoryColors: Record<TimelineEvent["category"], string> = {
  analysis: "#4F8CFF", financial: "#10B981", report: "#F59E0B", insight: "#7C3AED", milestone: "#10B981",
};

export function AiMemoryTimeline() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? events : events.slice(0, 4);

  return (
    <div className="widget-elevated p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Clock size={15} className="text-[#4F8CFF]" />
          <h3 className="text-white font-semibold text-[14px]">AI Memory Timeline</h3>
        </div>
        <span className="text-[11px] text-[#737373] px-2 py-1 rounded-full" style={{ background: "var(--surface-3)", border: "1px solid var(--border)" }}>
          {events.length} events stored
        </span>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[18px] top-0 bottom-0 w-px bg-white/[0.07]" />

        <div className="space-y-2">
          {visible.map((event, i) => {
            const Icon = event.icon;
            const isOpen = expanded === event.id;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : event.id)}
                  className="w-full flex items-start gap-3 text-left group focus-visible:outline-none"
                >
                  {/* Node */}
                  <div
                    className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-105"
                    style={{
                      background: `${event.color}15`,
                      border: `1px solid ${event.color}30`,
                      boxShadow: isOpen ? `0 0 12px ${event.color}30` : "none",
                    }}
                  >
                    <Icon size={13} style={{ color: event.color }} />
                  </div>

                  <div className="flex-1 min-w-0 py-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-white text-[12px] font-medium truncate group-hover:text-[#4F8CFF] transition-colors">
                        {event.title}
                      </p>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {event.impact && (
                          <span
                            className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                            style={{ background: `${event.color}15`, color: event.color }}
                          >
                            {event.impact}
                          </span>
                        )}
                        <span className="text-[#737373] text-[10px]">{event.time}</span>
                        <span className="text-[10px] text-[#737373] bg-white/[0.04] px-1.5 py-0.5 rounded-full">{event.date}</span>
                      </div>
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="ml-12 mb-2 rounded-[12px] p-3 text-[11px] text-[#B4B4B4] leading-relaxed"
                        style={{ background: `${event.color}08`, border: `1px solid ${event.color}15` }}
                      >
                        {event.detail}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {!showAll && events.length > 4 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowAll(true)}
            className="w-full mt-3 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[#737373] hover:text-white text-[12px] transition-all"
            style={{ background: "var(--surface-3)", border: "1px solid var(--border)" }}
          >
            <ChevronDown size={13} />
            Show {events.length - 4} more events
          </motion.button>
        )}
      </div>
    </div>
  );
}
