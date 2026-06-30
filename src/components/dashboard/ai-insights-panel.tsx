"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ChevronRight, CheckCircle, Clock, Zap, Brain } from "lucide-react";

const insights = [
  {
    id: "1",
    priority: "HIGH",
    title: "Pricing Strategy Gap Detected",
    description: "Your SaaS pricing is 23% below market average. Increasing Professional Plan by ₹500/mo adds ₹18L ARR while remaining competitive. Confidence: 92%.",
    impact: "+8 Health", time: "2 days", effort: "Medium",
    color: "#EF4444", why: "Based on competitor pricing analysis of 14 similar SaaS products in your segment.",
    completed: false,
  },
  {
    id: "2",
    priority: "HIGH",
    title: "Pitch Deck Missing Financials",
    description: "Your deck lacks 24-month financial projections — the #1 reason investors request more information (78% of cases in your stage).",
    impact: "+6 Investor", time: "1 day", effort: "Low",
    color: "#EF4444", why: "Analysed 340 seed decks. 78% of rejected pitches at your stage lacked forward projections.",
    completed: false,
  },
  {
    id: "3",
    priority: "MEDIUM",
    title: "File Trademark Before Series A",
    description: "Found 2 similar brand names in adjacent markets. A ₹5,000 trademark application now prevents a costly dispute later.",
    impact: "+3 Legal", time: "1 week", effort: "Low",
    color: "#F59E0B", why: "IP conflict probability: 34% based on brand similarity score and market overlap.",
    completed: true,
  },
  {
    id: "4",
    priority: "MEDIUM",
    title: "CAC:LTV Ratio Below Benchmark",
    description: "Current 1:2.8 is below healthy 1:3+. Reducing onboarding drop-off by 15% could improve this without extra spend.",
    impact: "+5 Financial", time: "3 weeks", effort: "High",
    color: "#F59E0B", why: "Benchmarked against 80 similar SaaS startups at ₹3–8 Cr ARR range.",
    completed: false,
  },
  {
    id: "5",
    priority: "LOW",
    title: "Apply for DPIIT Recognition",
    description: "You qualify. Unlocks tax exemptions, self-certification, and access to ₹10,000 Cr Fund of Funds. Takes 1 hour online.",
    impact: "+2 Legal", time: "1 hour", effort: "Very Low",
    color: "#10B981", why: "All eligibility criteria met based on your incorporation date, revenue, and industry.",
    completed: false,
  },
];

const priorityStyle: Record<string, { bg: string; text: string }> = {
  HIGH:   { bg: "rgba(239,68,68,0.12)",   text: "#EF4444" },
  MEDIUM: { bg: "rgba(245,158,11,0.12)",  text: "#F59E0B" },
  LOW:    { bg: "rgba(16,185,129,0.12)",  text: "#10B981" },
};

export function AiInsightsPanel() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [done, setDone] = useState<Set<string>>(new Set(insights.filter(i => i.completed).map(i => i.id)));

  const open = insights.filter(i => !done.has(i.id));
  const closed = insights.filter(i => done.has(i.id));

  return (
    <div className="widget-elevated p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#4F8CFF]/15 flex items-center justify-center">
            <Brain size={13} className="text-[#4F8CFF]" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-[14px]">AI Recommendations</h3>
            <p className="text-[#737373] text-[11px]">{open.length} actions • sorted by impact</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap size={12} className="text-[#F59E0B]" />
          <span className="text-[11px] text-[#F59E0B] font-medium">+24 pts potential</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {open.map((insight, i) => {
          const ps = priorityStyle[insight.priority];
          const isOpen = expanded === insight.id;

          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
              className="rounded-[18px] border transition-all overflow-hidden cursor-pointer group"
              style={{
                background: isOpen ? `${insight.color}06` : "rgba(255,255,255,0.025)",
                borderColor: isOpen ? `${insight.color}25` : "rgba(255,255,255,0.06)",
              }}
              onClick={() => setExpanded(isOpen ? null : insight.id)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: ps.bg, color: ps.text }}
                  >
                    {insight.priority}
                  </span>
                  <div className="flex items-center gap-1">
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: `${insight.color}12`, color: insight.color }}
                    >
                      {insight.impact}
                    </span>
                    <ChevronRight
                      size={13}
                      className={`text-[#737373] transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                    />
                  </div>
                </div>

                <h4 className="text-white text-[13px] font-medium mb-1.5 leading-snug group-hover:text-[#4F8CFF] transition-colors">
                  {insight.title}
                </h4>
                <p className="text-[#737373] text-[11px] leading-relaxed line-clamp-2">
                  {insight.description}
                </p>

                <div className="flex items-center gap-3 mt-3 text-[11px] text-[#737373]">
                  <div className="flex items-center gap-1">
                    <Clock size={10} />
                    <span>{insight.time}</span>
                  </div>
                  <span>•</span>
                  <span>{insight.effort}</span>
                </div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-0 border-t border-white/[0.06]">
                      <p className="text-[11px] text-[#B4B4B4] leading-relaxed mt-3 mb-3">
                        <span className="text-[#4F8CFF] font-medium">Why: </span>
                        {insight.why}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); setDone(d => new Set([...d, insight.id])); }}
                          className="flex-1 text-[11px] py-2 rounded-xl font-medium transition-all"
                          style={{ background: `${insight.color}15`, color: insight.color }}
                        >
                          Mark Done
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 text-[11px] py-2 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-1"
                          style={{ background: "rgba(79,140,255,0.15)", color: "#4F8CFF" }}
                        >
                          <Sparkles size={11} />
                          Fix with AI
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {closed.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/[0.06]">
          <p className="label mb-3 flex items-center gap-2">
            <CheckCircle size={11} className="text-[#10B981]" /> Completed ({closed.length})
          </p>
          <div className="space-y-1">
            {closed.map((insight) => (
              <div key={insight.id} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.02] text-[#737373] text-[12px]">
                <CheckCircle size={12} className="text-[#10B981]" />
                <span className="line-through">{insight.title}</span>
                <span className="ml-auto text-[10px] text-[#10B981]">{insight.impact}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
