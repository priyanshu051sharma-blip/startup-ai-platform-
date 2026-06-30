"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Command } from "lucide-react";

const COMMANDS = [
  { label: "Run startup analysis",    shortcut: "A" },
  { label: "Generate pitch deck",     shortcut: "P" },
  { label: "Calculate valuation",     shortcut: "V" },
  { label: "Open financial model",    shortcut: "F" },
  { label: "Practice investor pitch", shortcut: "I" },
  { label: "Find grants",             shortcut: "G" },
];

export function TopBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const close = useCallback(() => { setOpen(false); setQuery(""); }, []);
  const openPalette = useCallback(() => { setOpen(true); }, []);

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
        style={{
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          background: "#080808",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 500, color: "#f5f5f5" }}>My Startup</span>

        <button
          onClick={openPalette}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 12px",
            borderRadius: 8,
            background: "#0f0f0f",
            border: "1px solid rgba(255,255,255,0.06)",
            color: "#444",
            fontSize: 12,
            cursor: "pointer",
          }}
          aria-label="Open command palette"
        >
          <Search size={11} />
          <span>Search…</span>
          <kbd
            style={{
              marginLeft: 8,
              fontSize: 10,
              padding: "2px 6px",
              borderRadius: 4,
              background: "#141414",
              color: "#444",
            }}
          >
            ⌘K
          </kbd>
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            style={{
              width: 28, height: 28,
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 8, background: "transparent", border: "none", cursor: "pointer",
              color: "#444", position: "relative",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#141414")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            aria-label="Notifications"
          >
            <Bell size={13} />
            <span
              style={{
                position: "absolute", top: 6, right: 6,
                width: 5, height: 5, borderRadius: "50%",
                background: "#6366f1",
              }}
            />
          </button>
          <button
            style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "#6366f1",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9, fontWeight: 700, color: "#fff",
              border: "none", cursor: "pointer",
            }}
            aria-label="Profile"
          >
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
            style={{
              position: "fixed", inset: 0, zIndex: 50,
              display: "flex", alignItems: "flex-start", justifyContent: "center",
              paddingTop: "14vh",
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(6px)",
            }}
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
              style={{
                width: "100%",
                maxWidth: 440,
                borderRadius: 16,
                overflow: "hidden",
                background: "#0f0f0f",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "14px 16px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Command size={13} style={{ color: "#6366f1", flexShrink: 0 }} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search…"
                  style={{
                    flex: 1, background: "transparent",
                    fontSize: 14, color: "#f5f5f5",
                    border: "none", outline: "none",
                  }}
                />
                <kbd
                  style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: "#1a1a1a", color: "#444", cursor: "pointer" }}
                  onClick={close}
                >
                  ESC
                </kbd>
              </div>

              <div style={{ padding: "6px" }}>
                {filtered.length === 0 ? (
                  <p style={{ padding: "20px", textAlign: "center", fontSize: 13, color: "#444" }}>No results</p>
                ) : filtered.map((cmd) => (
                  <button
                    key={cmd.label}
                    style={{
                      width: "100%",
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "10px 12px",
                      borderRadius: 10,
                      fontSize: 13, textAlign: "left",
                      background: "transparent", border: "none", cursor: "pointer",
                      color: "#888",
                      transition: "background 0.12s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#141414")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div
                      style={{
                        width: 24, height: 24, borderRadius: 7,
                        background: "#141414", border: "1px solid rgba(255,255,255,0.06)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Command size={10} />
                    </div>
                    <span style={{ flex: 1, color: "#f5f5f5" }}>{cmd.label}</span>
                    <kbd style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: "#141414", color: "#444" }}>
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
