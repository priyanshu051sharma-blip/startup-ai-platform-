"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `msg_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
}

interface Msg { id: string; role: "user" | "ai"; text: string; agent?: string; demo?: boolean; }

const INIT: Msg[] = [{
  id: "0", role: "ai",
  text: "Health score up 3 points overnight. Pricing is 23% below market — want me to model the revenue impact of a price increase?",
  agent: "default",
}];

const PROMPTS = ["Model price increase", "What's my runway?", "Find grants", "Review pitch deck"];

const AGENT_LABEL: Record<string, string> = {
  CFO: "AI CFO", CEO: "AI CEO", CTO: "AI CTO",
  CMO: "AI CMO", Investor: "AI Investor", Legal: "AI Legal", default: "FounderAI",
};
const AGENT_COLOR: Record<string, string> = {
  CFO: "#4ade80", CEO: "#fbbf24", CTO: "#a5b4fc",
  CMO: "#f472b6", Investor: "#34d399", Legal: "#94a3b8", default: "#a5b4fc",
};

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
    const userMsg: Msg = { id: createId(), role: "user", text: content };
    setMsgs(m => [...m, userMsg]);
    setThinking(true);

    const history = msgs
      .filter(m => m.role === "user" || m.role === "ai")
      .map(m => ({ role: m.role === "ai" ? "assistant" : "user" as const, content: m.text }))
      .slice(-6);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, history }),
      });
      if (!res.ok) throw new Error("API error");
      const contentType = res.headers.get("content-type") ?? "";

      if (contentType.includes("text/event-stream")) {
        const aiMsgId = createId();
        setMsgs(m => [...m, { id: aiMsgId, role: "ai", text: "", agent: "default" }]);
        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const lines = decoder.decode(value).split("\n").filter(l => l.startsWith("data: "));
          for (const line of lines) {
            try {
              const p = JSON.parse(line.slice(6));
              if (p.type === "agent") {
                setMsgs(m => m.map(msg => msg.id === aiMsgId ? { ...msg, agent: p.agent } : msg));
              }
              if (p.type === "text") {
                setMsgs(m => m.map(msg => msg.id === aiMsgId ? { ...msg, text: msg.text + p.text } : msg));
              }
            } catch { /* skip */ }
          }
        }
      } else {
        const json = await res.json();
        setMsgs(m => [...m, { id: (Date.now() + 1).toString(), role: "ai", text: json.text, agent: json.agent, demo: json.demo }]);
      }
    } catch {
      setMsgs(m => [...m, { id: (Date.now() + 1).toString(), role: "ai", text: "Something went wrong. Try again.", agent: "default" }]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", height: 400 }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 20px", borderBottom: "1px solid var(--border)", flexShrink: 0,
        background: "var(--surface)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>AI Assistant</p>
        </div>
        <span style={{ fontSize: 12, color: "var(--text-3)" }}>6 agents active</span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }} className="scrollbar-none">
        {msgs.map(m => (
          <motion.div key={m.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start", gap: 4 }}>
            {m.role === "ai" && (
              <p style={{ fontSize: 11, fontWeight: 700, color: AGENT_COLOR[m.agent ?? "default"], paddingLeft: 2, letterSpacing: "0.03em" }}>
                {AGENT_LABEL[m.agent ?? "default"] ?? "FounderAI"}
              </p>
            )}
            <div style={{
              maxWidth: "88%", padding: "10px 14px", borderRadius: 10,
              background: m.role === "user" ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "var(--surface-2)",
              border: m.role === "user" ? "none" : "1px solid var(--border)",
              fontSize: 13, color: "#ffffff", lineHeight: 1.65, fontWeight: m.role === "user" ? 500 : 400,
            }}>
              {m.text || <span style={{ opacity: 0.3 }}>…</span>}
            </div>
            {m.demo && (
              <p style={{ fontSize: 11, color: "var(--text-4)", paddingLeft: 2 }}>
                Demo mode · Add OPENAI_API_KEY for live AI
              </p>
            )}
          </motion.div>
        ))}

        <AnimatePresence>
          {thinking && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p style={{ fontSize: 11, color: AGENT_COLOR.default, fontWeight: 700, marginBottom: 4 }}>FounderAI</p>
              <div style={{ display: "flex", gap: 5, padding: "10px 14px", borderRadius: 10, background: "var(--surface-2)", border: "1px solid var(--border)", width: "fit-content" }}>
                {[0, 1, 2].map(i => (
                  <motion.div key={i}
                    style={{ width: 5, height: 5, borderRadius: "50%", background: "#6366f1" }}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      <div style={{ display: "flex", gap: 6, padding: "10px 20px", overflowX: "auto", flexShrink: 0, borderTop: "1px solid var(--border)" }} className="scrollbar-none">
        {PROMPTS.map(p => (
          <button key={p} onClick={() => send(p)} disabled={thinking}
            style={{
              fontSize: 12, padding: "5px 12px", borderRadius: 999,
              background: "var(--surface-2)", border: "1px solid var(--border)",
              color: "var(--text-3)", cursor: thinking ? "not-allowed" : "pointer",
              whiteSpace: "nowrap", flexShrink: 0, fontFamily: "inherit", fontWeight: 500,
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { if (!thinking) { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; }}}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
            {p}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
        <input value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Ask your AI team anything…"
          disabled={thinking}
          style={{
            flex: 1, background: "var(--surface-2)", border: "1px solid var(--border)",
            borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "var(--text)", outline: "none",
            fontFamily: "inherit", fontWeight: 400, transition: "border-color 0.15s",
          }}
          onFocus={e => (e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)")}
          onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")} />
        <button onClick={() => send()} disabled={thinking || !input.trim()}
          style={{
            width: 36, height: 36, borderRadius: 8, flexShrink: 0,
            background: input.trim() && !thinking ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "var(--surface-2)",
            border: "none", cursor: input.trim() && !thinking ? "pointer" : "not-allowed",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s",
            boxShadow: input.trim() && !thinking ? "0 0 16px rgba(99,102,241,0.3)" : "none",
          }}>
          <Send size={14} color={input.trim() && !thinking ? "#fff" : "var(--text-3)"} />
        </button>
      </div>
    </div>
  );
}
