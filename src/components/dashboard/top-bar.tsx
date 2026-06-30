"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Command, ChevronDown } from "lucide-react";

const COMMANDS = [
  { label: "Run startup analysis",     shortcut: "A" },
  { label: "Generate pitch deck",      shortcut: "P" },
  { label: "Calculate valuation",      shortcut: "V" },
  { label: "Open financial model",     shortcut: "F" },
  { label: "Practice investor pitch",  shortcut: "I" },
  { label: "Find grants",              shortcut: "G" },
  { label: "View health score",        shortcut: "H" },
];

export function TopBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const close = useCallback(() => { setOpen(false); setQuery(""); }, []);
  const openPalette = useCallback(() => { setOpen(true); setQuery(""); }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); open ? close() : openPalette(); }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, close, openPalette]);

  const filtered = COMMANDS.filter((c) =>
    query === "" || c.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <header
        className="h-12 flex items-center justify-between px-5 flex-shrink-0"
        style={{ background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* Workspace */}
        <button className="flex items-center gap-1.5 text-sm text-white">
          My Startup
          <ChevronDown size={12} style={{ color: "#525252" }} />
        </button>

        {/* Search pill */}
        <button
          onClick={openPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
          style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)", color: "#525252" }}
          aria-label="Open command palette"
        >
          <Search size={12} />
          <span>Search…</span>
          <kbd className="ml-2 text-[10px] px-1.5 py-0.5 rounded" style={{ background: "#1c1c1c", color: "#525252" }}>⌘K</kbd>
        </button>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button className="relative w-7 h-7 flex items-center justify-center rounded-lg transition-colors hover:bg-[#161616]"
            style={{ color: "#525252" }} aria-label="Notifications">
            <Bell size={14} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: "#6366f1" }} />
          </button>
          <button className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
            style={{ background: "#6366f1" }} aria-label="Profile">
            PS
          </button>
        </div>
      </header>

      {/* Command palette */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center"
            style={{ paddingTop: "14vh", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -12 }}
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
              className="w-full max-w-md rounded-2xl overflow-hidden"
              style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <Command size={14} style={{ color: "#6366f1", flexShrink: 0 }} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search…"
                  className="flex-1 bg-transparent text-sm text-white placeholder-[#525252] outline-none"
                />
                <kbd className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "#1c1c1c", color: "#525252" }} onClick={close}>ESC</kbd>
              </div>

              <div className="py-1.5">
                {filtered.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm" style={{ color: "#525252" }}>No results</p>
                ) : filtered.map((cmd) => (
                  <button key={cmd.label}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors hover:bg-[#161616]"
                    style={{ color: "#a0a0a0" }}
                  >
                    <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <Command size={11} />
                    </div>
                    <span className="flex-1">{cmd.label}</span>
                    <kbd className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "#161616", color: "#525252" }}>
                      ⌘{cmd.shortcut}
                    </kbd>
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
