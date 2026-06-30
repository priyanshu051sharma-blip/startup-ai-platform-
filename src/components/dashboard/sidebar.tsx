"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, TrendingUp, BarChart3, DollarSign, Globe, Target, Mic, Bot, Settings, Zap } from "lucide-react";
import { getUser } from "@/lib/auth";

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
      animate={{ width: expanded ? 200 : 48 }}
      transition={{ type: "spring", stiffness: 420, damping: 38 }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{ flexShrink: 0, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", background: "var(--surface-2)", borderRight: "1px solid var(--border)" }}
      aria-label="Sidebar navigation"
    >
      {/* Logo */}
      <div style={{ height: 46, display: "flex", alignItems: "center", paddingLeft: 12, flexShrink: 0, borderBottom: "1px solid var(--border)" }}>
        <div style={{ width: 24, height: 24, borderRadius: 7, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Zap size={11} color="white" />
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}
              style={{ marginLeft: 10, fontSize: 14, fontWeight: 700, color: "var(--text)", whiteSpace: "nowrap" }}>
              FounderAI
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 6px", display: "flex", flexDirection: "column", gap: 2 }} className="scrollbar-none">
        {NAV.map(item => {
          const Icon = item.icon;
          const active = path === item.href;
          return (
            <Link key={item.href} href={item.href} className={`nav-item${active ? " active" : ""}`}
              style={{ padding: "7px 10px" }} aria-current={active ? "page" : undefined}>
              <Icon size={14} style={{ flexShrink: 0 }} />
              <AnimatePresence>
                {expanded && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}
                    style={{ fontSize: 13, whiteSpace: "nowrap" }}>
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </div>

      {/* User */}
      <div style={{ padding: 6, borderTop: "1px solid var(--border)", flexShrink: 0 }}>
        <div className="nav-item" style={{ cursor: "default", padding: "7px 10px" }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
            {userName}
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ overflow: "hidden", minWidth: 0 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{displayName}</p>
                <p style={{ fontSize: 10, color: "var(--text-3)", whiteSpace: "nowrap" }}>Pro plan</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
