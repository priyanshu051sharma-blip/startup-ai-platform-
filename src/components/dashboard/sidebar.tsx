"use client";

import { useEffect, useState } from "react";
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
  const [userName, setUserName] = useState("PS");
  const [displayName, setDisplayName] = useState("Founder");
  const path = usePathname();

  useEffect(() => {
    const user = getUser();
    if (user) {
      const initials = user.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
      setUserName(initials);
      setDisplayName(user.name);
    }
  }, []);

  return (
    <motion.nav
      animate={{ width: expanded ? 220 : 56 }}
      transition={{ type: "spring", stiffness: 340, damping: 30 }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        flexShrink: 0, display: "flex", flexDirection: "column",
        height: "100vh", overflow: "hidden",
        background: "rgba(2,2,10,0.95)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
      aria-label="Sidebar navigation"
    >
      {/* Logo */}
      <div style={{
        height: 56, display: "flex", alignItems: "center",
        paddingLeft: 16, flexShrink: 0,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: 8, flexShrink: 0,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 12px rgba(99,102,241,0.35)",
        }}>
          <Zap size={13} color="white" fill="white" />
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
                color: "#ffffff", whiteSpace: "nowrap", letterSpacing: "-0.02em",
              }}>
              FounderAI
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 6px", display: "flex", flexDirection: "column", gap: 2 }} className="scrollbar-none">
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
                  padding: "9px 10px", borderRadius: 8,
                  color: active ? "#ffffff" : "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                  fontSize: 13, fontWeight: active ? 600 : 500,
                  transition: "all 0.12s",
                  whiteSpace: "nowrap", overflow: "hidden",
                  background: active ? "rgba(99,102,241,0.15)" : "transparent",
                  borderLeft: active ? "2px solid #6366f1" : "2px solid transparent",
                  paddingLeft: active ? "8px" : "10px",
                }}
                onMouseEnter={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }
                }}
                aria-current={active ? "page" : undefined}>
                <Icon size={16} style={{ flexShrink: 0, color: active ? "#a5b4fc" : undefined }} />
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
      <div style={{ padding: "8px 6px", borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 10px", borderRadius: 8 }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: "#fff",
            boxShadow: "0 0 10px rgba(99,102,241,0.3)",
          }}>
            {userName}
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ overflow: "hidden", minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {displayName}
                </p>
                <p style={{ fontSize: 11, color: "rgba(165,180,252,0.6)", whiteSpace: "nowrap", fontWeight: 500 }}>
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
