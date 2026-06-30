"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Gift, Calendar, Sparkles, ArrowRight } from "lucide-react";

const ITEMS = [
  { icon: TrendingUp,  color: "#10B981", text: "Revenue ↑ 12% this week",           action: "View details" },
  { icon: TrendingDown,color: "#EF4444", text: "TechRival raised ₹20 Cr",            action: "Analyze threat" },
  { icon: Gift,        color: "#F59E0B", text: "New grant: ₹15L Healthcare",          action: "Apply now" },
  { icon: Calendar,    color: "#4F8CFF", text: "Investor meeting tomorrow 11 AM",     action: "Prep pitch" },
];

export function DailyBrief() {
  const h = new Date().getHours();
  const greeting = h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-[22px] p-4 flex items-start justify-between gap-6 flex-wrap"
      style={{
        background: "linear-gradient(135deg,rgba(79,140,255,0.06) 0%,rgba(124,58,237,0.04) 100%)",
        border: "1px solid rgba(79,140,255,0.12)",
        backdropFilter: "blur(40px)",
      }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 5 }}
          className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: "linear-gradient(135deg,rgba(79,140,255,0.2),rgba(124,58,237,0.15))", border: "1px solid rgba(79,140,255,0.2)" }}
        >
          <Sparkles size={18} className="text-[#4F8CFF]" />
        </motion.div>
        <div>
          <h2 className="text-white font-bold text-[15px]">{greeting}, Founder 👋</h2>
          <p className="text-[#737373] text-[11px]">Today's AI Startup Brief · {new Date().toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.text}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              whileHover={{ scale: 1.03, y: -1 }}
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] text-[#B4B4B4] hover:text-white transition-all group cursor-pointer"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <Icon size={11} style={{ color: item.color }} />
              <span>{item.text}</span>
              <span
                className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] flex items-center gap-0.5"
                style={{ color: item.color }}
              >
                {item.action} <ArrowRight size={9} />
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
