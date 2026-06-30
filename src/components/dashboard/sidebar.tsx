"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, TrendingUp, BarChart3, DollarSign,
  Globe, Target, Mic, Bot, Settings, Zap,
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
  { icon: Settings,        label: "Settings",    href: "/dashboard/settings" },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const path = usePathname();

  return (
    <motion.nav
      animate={{ width: expanded ? 196 : 48 }}
      transition={{ type: "spring", stiffness: 400, damping: 38 }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        background: "#0a0a0a",
        borderRight: "1px solid rgba(255,255,255,0.04)",
      }}
      aria-label="Sidebar navigation"
    >
      {/* Logo */}
      <div
        style={{
          height: 48,
          display: "flex",
          alignItems: "center",
          paddingLeft: 12,
          flexShrink: 0,
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div
          style={{
            width: 24, height: 24, borderRadius: 7,
            background: "#6366f1",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Zap size={11} color="white" />
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              style={{ marginLeft: 10, fontSize: 14, fontWeight: 600, color: "#f5f5f5", whiteSpace: "nowrap" }}
            >
              FounderAI
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 6px", display: "flex", flexDirection: "column", gap: 2 }} className="scrollbar-none">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = path === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="nav-item"
              style={{
                color: active ? "#f5f5f5" : "#444",
                background: active ? "#141414" : "transparent",
                border: active ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
                padding: "7px 10px",
              }}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={14} style={{ flexShrink: 0 }} />
              <AnimatePresence>
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    style={{ fontSize: 13, whiteSpace: "nowrap" }}
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
      <div style={{ padding: "6px", borderTop: "1px solid rgba(255,255,255,0.04)", flexShrink: 0 }}>
        <div className="nav-item" style={{ cursor: "default", padding: "7px 10px" }}>
          <div
            style={{
              width: 24, height: 24, borderRadius: "50%",
              background: "#6366f1",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9, fontWeight: 700, color: "#fff", flexShrink: 0,
            }}
          >
            PS
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ overflow: "hidden" }}
              >
                <p style={{ fontSize: 12, fontWeight: 500, color: "#f5f5f5", whiteSpace: "nowrap" }}>Prince Sharma</p>
                <p style={{ fontSize: 10, color: "#444", whiteSpace: "nowrap" }}>Pro</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
