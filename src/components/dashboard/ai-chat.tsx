"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip, RotateCcw } from "lucide-react";

interface Msg { id: string; role: "user" | "ai"; text: string; }

const INIT: Msg[] = [{
  id: "0", role: "ai",
  text: "Good morning. Your health score improved 3 points overnight. I flagged one high-priority action — your pricing is 23% below competitors. Want me to model the revenue impact of a price increase?",
}];

const PROMPTS = ["Model price increase", "What's my runway?", "Find grants", "Review pitch deck"];

const RESPONSES: Record<string, string> = {
  default: "Based on your current metrics, I've identified 3 actionable steps. The highest-impact change is your pricing — raising the Pro plan by ₹500/mo adds an estimated ₹18L ARR annually. Confidence: 92%.",
  pricing: "Raising your Pro plan from ₹1,999 to ₹2,499/mo is still 14% below market average. At your current 220 Pro customers, that's +₹13.2L ARR annually. Churn risk at this level is low — estimated at 3–5%. Want me to model different scenarios?",
  runway: "At ₹2.8L/month burn and ₹4.2L MRR, you have 18 months of runway. If MRR growth continues at 8%/month, you reach profitability in month 7 without additional funding.",
  grant: "Found 3 grants you qualify for: DPIIT Startup India (₹25L, apply by Aug 31), DST NIDHI (₹50L, rolling), MSME Tech Upgrade (₹15L). Want me to draft the DPIIT application?",
  pitch: "Your deck scores 8.4/10. The main gap: no 24-month financial projections — investors ask for this in 78% of seed rounds. I can generate the financial slides in about 2 minutes. Shall I?",
};

function getReply(msg: string): string {
  const l = msg.toLowerCase();
  if (l.includes("price") || l.includes("pricing") || l.includes("model")) return RESPONSES.pricing;
  if (l.includes("runway") || l.includes("burn")) return RESPONSES.runway;
  if (l.includes("grant") || l.includes("fund")) return RESPONSES.grant;
  if (l.includes("pitch") || l.includes("deck")) return RESPONSES.pitch;
  return RESPONSES.default;
}

export function AiChat() {
  const [msgs, setMsgs] = useState<Msg[]>(INIT);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, thinking]);

  const send = async (text?: string) => {
    const content = text ?? input.trim();
    if (!content || thinking) return;
    setInput("");
    setMsgs((m) => [...m, { id: Date.now().toString(), role: "user", text: content }]);
    setThinking(true);
    await new Promise((r) => setTimeout(r, 1600));
    setMsgs((m) => [...m, { id: (Date.now() + 1).toString(), role: "ai", text: getReply(content) }]);
    setThinking(false);
  };

  return (
    <div className="rounded-2xl flex flex-col overflow-hidden" style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)", height: 420 }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.2)" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4" stroke="#a5b4fc" strokeWidth="1.5"/>
              <path d="M6 4V6L7.5 7.5" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="text-white text-xs font-medium">AI Co-Founder</p>
            <div className="flex items-center gap-1">
              <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="dot-online" style={{ width: 5, height: 5 }} />
              <span className="text-[10px]" style={{ color: "#525252" }}>Has full context</span>
            </div>
          </div>
        </div>
        <button onClick={() => setMsgs(INIT)}
          className="w-6 h-6 flex items-center justify-center rounded-md transition-colors hover:bg-[#161616]"
          style={{ color: "#525252" }} aria-label="Reset">
          <RotateCcw size={11} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-none min-h-0">
        <AnimatePresence initial={false}>
          {msgs.map((m) => (
            <motion.div key={m.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed"
                style={m.role === "user"
                  ? { background: "#6366f1", color: "#fff", borderRadius: "16px 16px 4px 16px" }
                  : { background: "#161616", color: "#a0a0a0", borderRadius: "16px 16px 16px 4px", border: "1px solid rgba(255,255,255,0.06)" }
                }
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Thinking */}
        <AnimatePresence>
          {thinking && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex justify-start">
              <div className="rounded-2xl px-3.5 py-3" style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      style={{ width: 4, height: 4, borderRadius: "50%", background: "#6366f1" }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Suggested prompts */}
      <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto scrollbar-none flex-shrink-0">
        {PROMPTS.map((p) => (
          <button key={p} onClick={() => send(p)} disabled={thinking}
            className="flex-shrink-0 text-[10px] px-2.5 py-1.5 rounded-full whitespace-nowrap transition-colors disabled:opacity-40"
            style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.07)", color: "#525252" }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#f5f5f5"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#525252"; }}>
            {p}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5"
          style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.07)" }}>
          <button className="flex-shrink-0" style={{ color: "#525252" }} aria-label="Attach">
            <Paperclip size={13} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            placeholder="Ask your AI Co-Founder…"
            className="flex-1 bg-transparent text-xs text-white placeholder-[#525252] outline-none"
            disabled={thinking}
            aria-label="Chat input"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => send()}
            disabled={!input.trim() || thinking}
            className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-30"
            style={{ background: "#6366f1" }}
            aria-label="Send"
          >
            <Send size={11} className="text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
