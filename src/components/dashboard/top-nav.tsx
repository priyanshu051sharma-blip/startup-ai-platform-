"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Command, ChevronDown, Mic, Zap, ArrowRight, FileText, BarChart3, Target } from "lucide-react";
const commands = [
  { icon: Zap,       label: "Analyze my startup",       category: "AI" },
  { icon: FileText,  label: "Generate pitch deck",      category: "Generate" },
  { icon: BarChart3, label: "Run financial forecast",   category: "Finance" },
  { icon: Target,    label: "Calculate valuation",      category: "Finance" },
  { icon: Search,    label: "Find investors",           category: "Research" },
  { icon: Mic,       label: "Practice my pitch",        category: "AI" },
];
const notifications = [
  { id: 1, title: "AI Analysis Complete", desc: "Market research report is ready",  time: "2m ago", color: "#10B981" },
  { id: 2, title: "Competitor Alert",     desc: "TechRival raised Rs 15 Cr",        time: "1h ago", color: "#EF4444" },
  { id: 3, title: "Grant Opportunity",    desc: "Startup India FFS available",       time: "3h ago", color: "#F59E0B" },
];
export function DashboardTopNav() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [micActive, setMicActive] = useState(false);
  const filtered = commands.filter((c) => query === "" || c.label.toLowerCase().includes(query.toLowerCase()));
  const openCmd = useCallback(() => { setCmdOpen(true); setQuery(""); }, []);
  const closeCmd = useCallback(() => { setCmdOpen(false); setQuery(""); }, []);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); cmdOpen ? closeCmd() : openCmd(); }
      if (e.key === "Escape") { closeCmd(); setNotifOpen(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [cmdOpen, openCmd, closeCmd]);
  return (
    <>
      <header className="h-14 flex items-center justify-between px-5 flex-shrink-0 relative z-20"
        style={{ background: "rgba(5,5,5,0.85)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", borderBottom: "1px solid var(--border)" }}>
        <motion.button whileHover={{ scale: 1.02 }} className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-colors"
          style={{ background: "var(--surface-3)" }}>
          <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg,#4F8CFF,#7C3AED)" }}>
            <Zap size={10} className="text-white" />
          </div>
          <span className="text-white text-xs font-semibold">My Startup</span>
          <ChevronDown size={11} className="text-gray-500" />
        </motion.button>
        <motion.button onClick={openCmd} whileHover={{ scale: 1.01 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-gray-500 hover:text-white transition-colors w-52"
          style={{ background: "var(--surface-3)", border: "1px solid var(--border)" }}>
          <Search size={12} /><span className="flex-1 text-left">Search or command...</span>
          <kbd className="text-xs" style={{ background: "var(--surface)", color: "var(--text-3)", padding: "0.125rem 0.35rem", borderRadius: 6 }}>Ctrl+K</kbd>
        </motion.button>
        <div className="flex items-center gap-1.5">
          <motion.button whileTap={{ scale: 0.92 }} onClick={() => setMicActive((a) => !a)}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${micActive ? "bg-blue-500/20 text-blue-400" : "text-gray-500 hover:text-white"}`}
            style={{ background: micActive ? undefined : "var(--surface-3)" }}>
            <Mic size={14} />
          </motion.button>
          <div className="relative">
            <motion.button whileTap={{ scale: 0.92 }} onClick={() => setNotifOpen((o) => !o)}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-500 hover:text-white relative"
              style={{ background: "var(--surface-3)" }}>
              <Bell size={14} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
            </motion.button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div initial={{ opacity: 0, scale: 0.95, y: -8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  className="absolute right-0 top-10 w-72 rounded-2xl overflow-hidden z-50"
                  style={{ background: "rgba(12,12,14,0.98)", backdropFilter: "blur(40px)", border: "1px solid var(--border)", boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>
                  <div className="flex items-center justify-between px-4 py-3"
                    style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-3)" }}>
                    <p className="text-white text-xs font-semibold">Notifications</p>
                    <button className="text-blue-400 text-xs">Mark all read</button>
                  </div>
                  {notifications.map((n, i) => (
                    <motion.div key={n.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 px-4 py-3 cursor-pointer last:border-0"
                      style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-3)" }}>
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium">{n.title}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{n.desc}</p>
                      </div>
                      <span className="text-gray-500 text-xs whitespace-nowrap">{n.time}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: "linear-gradient(135deg,#4F8CFF,#7C3AED)" }}>
            PS
          </motion.button>
        </div>
      </header>
      <AnimatePresence>
        {cmdOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-48"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
            onClick={closeCmd}>
            <motion.div initial={{ opacity: 0, scale: 0.96, y: -16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: -16 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="w-full max-w-lg rounded-3xl overflow-hidden"
              style={{ background: "rgba(8,8,10,0.99)", backdropFilter: "blur(60px)", border: "1px solid var(--border)", boxShadow: "0 40px 120px rgba(0,0,0,0.7)" }}
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3 px-5 py-4"
                style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-3)" }}>
                <Command size={15} className="text-blue-400 flex-shrink-0" />
                <input autoFocus type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search or type a command..." className="flex-1 bg-transparent text-white text-sm placeholder:text-gray-500 focus:outline-none" />
                <kbd className="text-xs text-gray-500 rounded-lg px-2 py-1 cursor-pointer" style={{ background: "var(--surface)", color: "var(--text-3)" }} onClick={closeCmd}>ESC</kbd>
              </div>
              <div className="p-2 max-h-80 overflow-y-auto">
                {filtered.map((cmd, i) => {
                  const Icon = cmd.icon;
                  return (
                    <motion.button key={cmd.label} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white text-left transition-all group"
                      style={{ background: "var(--surface-3)", border: "1px solid var(--border)" }}>
                      <div className="w-7 h-7 rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
                        style={{ background: "var(--surface-3)" }}>
                        <Icon size={13} className="group-hover:text-blue-400 transition-colors" />
                      </div>
                      <span className="flex-1">{cmd.label}</span>
                      <span className="text-xs rounded px-1.5 py-0.5" style={{ background: "var(--surface)", color: "var(--text-3)" }}>{cmd.category}</span>
                      <ArrowRight size={12} className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 px-5 py-2.5 text-xs text-gray-500"
                style={{ borderTop: "1px solid var(--border)", background: "var(--surface-3)" }}>
                <span>Esc to close</span>
                <span className="ml-auto text-blue-400 font-medium">FounderAI OS</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
