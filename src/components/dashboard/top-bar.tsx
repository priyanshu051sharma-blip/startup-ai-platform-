"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Command } from "lucide-react";
import { useRouter } from "next/navigation";

const COMMANDS = [
  { label: "Run startup analysis",    shortcut: "A", href: "/dashboard/analysis" },
  { label: "View financial model",    shortcut: "F", href: "/dashboard/finance" },
  { label: "Practice investor pitch", shortcut: "P", href: "/dashboard/pitch" },
  { label: "Find grants",             shortcut: "G", href: "/dashboard/grants" },
  { label: "Competitor analysis",     shortcut: "C", href: "/dashboard/competitors" },
  { label: "Settings",                shortcut: "S", href: "/dashboard/settings" },
];

export function TopBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const close = useCallback(() => { setOpen(false); setQuery(""); }, []);

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
      <header style={{ height: 46, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px", background: "var(--surface-2)", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>My Startup</span>
          <span style={{ fontSize: 12, color: "var(--text-3)" }}>/ Overview</span>
        </div>

        <button onClick={() => { setOpen(true); setQuery(""); }}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 8, background: "var(--surface-3)", border: "1px solid var(--border)", color: "var(--text-3)", fontSize: 12, cursor: "pointer", minWidth: 200 }}
          aria-label="Open command palette (Ctrl+K)">
          <Search size={11} />
          <span style={{ flex: 1, textAlign: "left" }}>Search or jump to…</span>
          <kbd style={{ fontSize: 10, padding: "1px 5px", borderRadius: 4, background: "var(--bg)", color: "var(--text-3)", border: "1px solid var(--border)" }}>⌘K</kbd>
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, background: "transparent", border: "none", cursor: "pointer", color: "var(--text-3)", position: "relative" }} aria-label="Notifications">
            <Bell size={14} />
            <span style={{ position: "absolute", top: 7, right: 7, width: 5, height: 5, borderRadius: "50%", background: "var(--accent)" }} />
          </button>
          <button style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff", border: "none", cursor: "pointer" }} aria-label="Profile">
            PS
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "12vh", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
            onClick={close}>
            <motion.div initial={{ opacity: 0, scale: 0.96, y: -8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 500, damping: 34 }}
              style={{ width: "100%", maxWidth: 480, borderRadius: 14, overflow: "hidden", background: "var(--surface)", border: "1px solid var(--border-2)", boxShadow: "0 32px 80px rgba(0,0,0,0.4)" }}
              onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
                <Command size={13} style={{ color: "var(--accent)", flexShrink: 0 }} />
                <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && filtered[0]) go(filtered[0].href); }}
                  placeholder="Type a command or search…"
                  style={{ flex: 1, background: "transparent", fontSize: 14, color: "var(--text)", border: "none", outline: "none" }} />
                <kbd style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: "var(--surface-2)", color: "var(--text-3)", cursor: "pointer" }} onClick={close}>ESC</kbd>
              </div>
              <div style={{ padding: 6 }}>
                {filtered.length === 0
                  ? <p style={{ padding: "20px", textAlign: "center", fontSize: 13, color: "var(--text-3)" }}>No results</p>
                  : filtered.map(cmd => (
                    <button key={cmd.label} onClick={() => go(cmd.href)}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "9px 12px", borderRadius: 8, fontSize: 13, textAlign: "left", background: "transparent", border: "none", cursor: "pointer", color: "var(--text-2)", transition: "background 0.1s" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-2)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <div style={{ width: 26, height: 26, borderRadius: 7, background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Command size={10} style={{ color: "var(--text-3)" }} />
                      </div>
                      <span style={{ flex: 1, color: "var(--text)" }}>{cmd.label}</span>
                      <kbd style={{ fontSize: 10, padding: "1px 5px", borderRadius: 4, background: "var(--surface-2)", color: "var(--text-3)", border: "1px solid var(--border)" }}>⌘{cmd.shortcut}</kbd>
                    </button>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
