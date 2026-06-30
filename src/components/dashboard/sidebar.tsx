"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, TrendingUp, BarChart3, DollarSign,
  Globe, Target, Mic, Bot, FileText, Settings, Zap,
} from "lucide-react";

const NAV = [
  { icon: LayoutDashboard, label: "Overview",    href: "/dashboard" },
  { icon: TrendingUp,      label: "Analysis",    href: "/dashboard/analysis" },
  { icon: BarChart3,       label: "Financials",  href: "/dashboard/finance" },
  { icon: DollarSign,      label: "Valuation",   href: "/dashboard/valuation" },
  { icon: Globe,           label: "Market",      href: "/dashboard/market" },
  { icon: Target,          label: "Competitors", href: "/dashboard/competitors" },
  { icon: Mic,             label: "Pitch",       href: "/dashboard/pitch" },
  { icon: Bot,             label: "AI Team",     href: "/dashboard/ai" },
  { icon: FileText,        label: "Reports",     href: "/dashboard/reports" },
  { icon: Settings,        label: "Settings",    href: "/dashboard/settings" },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const path = usePathname();

  return (
    <motion.nav
      animate={{ width: expanded ? 200 : 52 }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="flex-shrink-0 flex flex-col h-screen overflow-hidden"
      style={{ background: "#0a0a0a", borderRight: "1px solid rgba(255,255,255,0.05)" }}
      aria-label="Sidebar navigation"
    >
      {/* Logo */}
      <div className="flex items-center h-12 px-3.5 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ background: "#6366f1" }}>
          <Zap size={12} className="text-white" />
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="ml-2.5 text-white font-semibold text-sm whitespace-nowrap overflow-hidden"
            >
              FounderAI
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto scrollbar-none py-3 px-2 space-y-0.5">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = path === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="nav-item"
              style={{
                background: active ? "#161616" : "transparent",
                color: active ? "#f5f5f5" : "#525252",
                border: active ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
              }}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={15} style={{ flexShrink: 0 }} />
              <AnimatePresence>
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="text-[13px] whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </div>

      {/* User */}
      <div className="flex-shrink-0 p-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="nav-item" style={{ cursor: "default" }}>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
            style={{ background: "#6366f1" }}>
            PS
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="text-[12px] text-white font-medium whitespace-nowrap">Prince Sharma</p>
                <p className="text-[10px] whitespace-nowrap" style={{ color: "#525252" }}>Pro plan</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
