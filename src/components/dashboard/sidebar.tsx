"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, TrendingUp, BarChart3, DollarSign,
  Globe, Target, Mic, Bot, Settings, Zap, Gift
} from "lucide-react";
import { getUser } from "@/lib/auth";

const NAV = [
  { icon: LayoutDashboard, label: "Overview",    href: "/dashboard" },
  { icon: TrendingUp,      label: "Analysis",    href: "/dashboard/analysis" },
  { icon: BarChart3,       label: "Financials",  href: "/dashboard/finance" },
  { icon: DollarSign,      label: "Valuation",   href: "/dashboard/valuation" },
  { icon: Globe,           label: "Market",      href: "/dashboard/market" },
  { icon: Target,          label: "Competitors", href: "/dashboard/competitors" },
  { icon: Mic,             label: "Pitch",       href: "/dashboard/pitch" },
  { icon: Gift,            label: "Grants",      href: "/dashboard/grants" },
  { icon: Bot,             label: "AI Team",     href: "/dashboard/ai" },
  { icon: Settings,        label: "Settings",    href: "/dashboard/settings" },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const user = getUser();
  const userName = user ? user.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2) : "PS";
  const displayName = user?.name ?? "Founder";
  const path = usePathname();

  return (
    <motion.nav
      animate={{ width: expanded ? 220 : 56 }}
      transition={{ type: "spring", stiffness: 340, damping: 30 }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
          flexShrink: 0, display: "flex", flexDirection: "column",
          height: "100vh", overflow: "hidden",
          background: "var(--bg-2)",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          borderRight: "1px solid var(--border)",
        }}
      aria-label="Sidebar navigation"
    >
      {/* Logo */}
      <div style={{
        height: 56, display: "flex", alignItems: "center",
        paddingLeft: 16, flexShrink: 0,
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: 8, flexShrink: 0,
          background: "linear-gradient(135deg, rgba(0,0,0,0.06), rgba(0,0,0,0.02))",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "none",
        }}>
          <Zap size={13} color="var(--text)" />
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
                style={{
                marginLeft: 12, fontSize: 15, fontWeight: 800,
                color: "var(--text)", whiteSpace: "nowrap", letterSpacing: "-0.02em",
              }}>
              FounderAI
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 8px", display: "flex", flexDirection: "column", gap: 6 }} className="scrollbar-none">
        {NAV.map((item, i) => {
          const Icon = item.icon;
          const active = path === item.href;
          return (
            <motion.div key={item.href}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.02 }}>
              <Link href={item.href}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "9px 10px", borderRadius: 10,
                  color: active ? "var(--text)" : "var(--text-3)",
                  textDecoration: "none",
                  fontSize: 13, fontWeight: active ? 700 : 500,
                  transition: "transform 0.12s, background 0.12s, color 0.12s",
                  whiteSpace: "nowrap", overflow: "hidden",
                  background: active ? "var(--accent-light)" : "transparent",
                  borderLeft: active ? "3px solid var(--accent)" : "3px solid transparent",
                  paddingLeft: active ? "8px" : "10px",
                }}
                onMouseEnter={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.color = "var(--text)";
                    (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-3)";
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-3)";
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }
                }}
                aria-current={active ? "page" : undefined}>
                <Icon size={16} style={{ flexShrink: 0, color: active ? "var(--accent-mid)" : "var(--text-3)" }} />
                <AnimatePresence>
                  {expanded && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* User */}
      <div style={{ padding: "10px 8px", borderTop: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 10px", borderRadius: 8 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
            background: "var(--bg-3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: "var(--text)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
          }}>
            {userName}
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ overflow: "hidden", minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {displayName}
                </p>
                <p style={{ fontSize: 11, color: "var(--text-3)", whiteSpace: "nowrap", fontWeight: 600 }}>
                  Pro plan
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
