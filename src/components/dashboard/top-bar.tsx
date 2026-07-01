"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, X, Zap, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const DynamicThemeToggle = dynamic(() => import("@/components/ui/theme-toggle"), { ssr: false });

const COMMANDS = [
  { label: "Run Startup Analysis",    shortcut: "A", href: "/dashboard/analysis",   tag: "Analysis", icon: "⚡" },
  { label: "View Financial Model",    shortcut: "F", href: "/dashboard/finance",     tag: "Finance",  icon: "💰" },
  { label: "Practice Investor Pitch", shortcut: "P", href: "/dashboard/pitch",       tag: "Pitch",    icon: "🎯" },
  { label: "Find Grants",             shortcut: "G", href: "/dashboard/grants",      tag: "Grants",   icon: "🎁" },
  { label: "Competitor Analysis",     shortcut: "C", href: "/dashboard/competitors", tag: "Market",   icon: "🌍" },
  { label: "Settings",                shortcut: "S", href: "/dashboard/settings",    tag: "Config",   icon: "⚙️" },
];

export function TopBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<string>(() => {
    try { return localStorage.getItem("founderai_theme") || "light"; } catch { return "light"; }
  });
  const router = useRouter();
  const close = useCallback(() => { setOpen(false); setQuery(""); }, []);

  const toggleTheme = () => {
    try {
      const next = theme === "dark" ? "light" : "dark";
      localStorage.setItem("founderai_theme", next);
      // update first element with data-theme (dashboard root)
      const root = document.querySelector('[data-theme]');
      if (root) root.setAttribute('data-theme', next);
      setTheme(next);
    } catch (e) { /* ignore */ }
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen(o => !o); setQuery(""); }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [close]);

  const filtered = COMMANDS.filter(c => query === "" || c.label.toLowerCase().includes(query.toLowerCase()));
  const go = (href: string) => { close(); router.push(href); };

  return (
    <>
      <header style={{
        height: 56, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px",
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        flexShrink: 0,
      }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Zap size={14} color="var(--accent)" />
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>My Startup</span>
          <span style={{ fontSize: 14, color: "var(--text-3)" }}>/</span>
          <span style={{ fontSize: 14, fontWeight: 400, color: "var(--text-3)" }}>Overview</span>
        </div>

        {/* Search trigger */}
        <motion.button
          onClick={() => { setOpen(true); setQuery(""); }}
          whileHover={{ borderColor: "var(--border)" }}
          whileTap={{ scale: 0.98 }}
          style={{
              display: "flex", alignItems: "center", gap: 10, padding: "8px 16px",
              background: "var(--bg-3)",
              border: "1px solid var(--border-2)",
              borderRadius: 8,
              color: "var(--text-3)", fontSize: 14, cursor: "pointer", minWidth: 240,
              fontWeight: 400, fontFamily: "inherit",
              transition: "all 0.15s",
            }}
          aria-label="Open command palette (Ctrl+K)"
        >
          <Search size={14} style={{ color: "var(--text-3)", flexShrink: 0 }} />
          <span style={{ flex: 1, textAlign: "left", color: "var(--text-3)" }}>Search or jump to…</span>
          <kbd style={{
            fontSize: 11, padding: "2px 7px", borderRadius: 5,
            background: "var(--bg-3)", color: "var(--text-3)",
            border: "1px solid var(--border-2)",
            fontFamily: "inherit",
          }}>⌘K</kbd>
        </motion.button>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Live indicator */}
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "5px 12px", borderRadius: 999,
            background: "var(--green-light)",
            border: "1px solid rgba(5,150,105,0.12)",
          }}>
            <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)" }} />
            <span style={{ fontSize: 12, color: "var(--green)", fontWeight: 600 }}>Live</span>
          </div>

          <button style={{
            width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
            background: "var(--bg-3)", border: "1px solid var(--border-2)",
            borderRadius: 8, cursor: "pointer", color: "var(--text-3)",
            position: "relative", transition: "all 0.15s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; }}
          aria-label="Notifications">
            <Bell size={15} />
            <span style={{ position: "absolute", top: 8, right: 8, width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", border: "1.5px solid var(--bg-2)" }} />
          </button>

          <div style={{ width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Theme toggle extracted to a small UI component */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <DynamicThemeToggle />
          </div>
        </div>
      </header>

      {/* Command palette */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            style={{
              position: "fixed", inset: 0, zIndex: 50,
              display: "flex", alignItems: "flex-start", justifyContent: "center",
              paddingTop: "10vh",
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(6px)",
            }}
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{
                width: "100%", maxWidth: 540, borderRadius: 14, overflow: "hidden",
                background: "rgba(8,8,20,0.98)",
                border: "1px solid rgba(99,102,241,0.2)",
                boxShadow: "0 0 0 1px rgba(99,102,241,0.08), 0 32px 64px rgba(0,0,0,0.7)",
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Top accent */}
              <div style={{ height: 2, background: "linear-gradient(90deg, transparent, #6366f1, #8b5cf6, transparent)" }} />

<div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderBottom: "1px solid var(--border)" }}>
                  <Search size={16} style={{ color: "#6366f1", flexShrink: 0 }} />
                  <input
                    autoFocus value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && filtered[0]) go(filtered[0].href); }}
                    placeholder="Search commands…"
                    style={{ flex: 1, background: "transparent", fontSize: 15, color: "var(--text)", border: "none", outline: "none", fontFamily: "inherit", fontWeight: 400 }}
                  />
                  <button onClick={close} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 6, padding: "3px 8px", cursor: "pointer", color: "var(--text-3)", fontSize: 11, fontFamily: "inherit" }}>
                  ESC
                </button>
              </div>

              <div style={{ maxHeight: 380, overflowY: "auto" }} className="scrollbar-none">
                {filtered.length === 0
                  ? <p style={{ padding: "28px", textAlign: "center", fontSize: 14, color: "var(--text-4)" }}>No results found</p>
                  : filtered.map((cmd, i) => (
                    <motion.button
                      key={cmd.label}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => go(cmd.href)}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", gap: 14,
                        padding: "12px 18px", fontSize: 14, textAlign: "left",
                        background: "transparent", border: "none",
                        borderBottom: "1px solid var(--border)",
                        cursor: "pointer", color: "var(--text-3)",
                        fontFamily: "inherit", fontWeight: 500,
                        transition: "all 0.1s",
                      }}
                      whileHover={{ background: "rgba(99,102,241,0.08)", color: "#fff" } as object}
                    >
                      <span style={{ fontSize: 18, flexShrink: 0, width: 28 }}>{cmd.icon}</span>
                      <span style={{ flex: 1 }}>{cmd.label}</span>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: "var(--surface-2)", color: "var(--text-4)", border: "1px solid var(--border)" }}>
                        {cmd.tag}
                      </span>
                      <kbd style={{ fontSize: 11, padding: "2px 7px", borderRadius: 5, background: "rgba(99,102,241,0.1)", color: "rgba(165,180,252,0.7)", border: "1px solid rgba(99,102,241,0.2)", fontFamily: "inherit" }}>
                        ⌘{cmd.shortcut}
                      </kbd>
                    </motion.button>
                  ))
                }
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
