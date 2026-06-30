"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";

interface Msg { id: string; role: "user" | "ai"; text: string; agent?: string; demo?: boolean; }

const INIT: Msg[] = [{
  id: "0", role: "ai",
  text: "Good morning. Your health score improved 3 points overnight. Pricing is 23% below market — want me to model the revenue impact of a price increase?",
  agent: "default",
}];

const PROMPTS = ["Model price increase", "What's my runway?", "Find grants", "Review pitch deck"];

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

    const userMsg: Msg = { id: Date.now().toString(), role: "user", text: content };
    setMsgs((m) => [...m, userMsg]);
    setThinking(true);

    // Build history for context
    const history = msgs
      .filter((m) => m.role === "user" || m.role === "ai")
      .map((m) => ({ role: m.role === "ai" ? "assistant" : "user" as const, content: m.text }))
      .slice(-6); // last 6 messages

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, history }),
      });

      if (!res.ok) throw new Error("API error");

      const contentType = res.headers.get("content-type") ?? "";

      if (contentType.includes("text/event-stream")) {
        // Streaming response (real OpenAI)
        const aiMsgId = (Date.now() + 1).toString();
        let agent = "default";
        let accumulated = "";

        setMsgs((m) => [...m, { id: aiMsgId, role: "ai", text: "", agent }]);

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));
          for (const line of lines) {
            try {
              const parsed = JSON.parse(line.slice(6));
              if (parsed.type === "agent") { agent = parsed.agent; }
              if (parsed.type === "text") {
                accumulated += parsed.text;
                setMsgs((m) => m.map((msg) => msg.id === aiMsgId ? { ...msg, text: accumulated, agent } : msg));
              }
            } catch { /* skip malformed lines */ }
          }
        }
      } else {
        // JSON demo response (no API key)
        const json = await res.json();
        setMsgs((m) => [...m, { id: (Date.now() + 1).toString(), role: "ai", text: json.text, agent: json.agent, demo: json.demo }]);
      }
    } catch {
      setMsgs((m) => [...m, { id: (Date.now() + 1).toString(), role: "ai", text: "Something went wrong. Please try again.", agent: "default" }]);
    } finally {
      setThinking(false);
    }
  };

  const agentLabel: Record<string, string> = {
    CFO: "AI CFO", CEO: "AI CEO", CTO: "AI CTO",
    CMO: "AI CMO", Investor: "AI Investor", Legal: "AI Legal", default: "FounderAI",
  };
  const agentColor: Record<string, string> = {
    CFO: "#4ade80", CEO: "#f59e0b", CTO: "#6366f1",
    CMO: "#ec4899", Investor: "#22c55e", Legal: "#a5b4fc", default: "#6366f1",
  };

  return (
    <div style={{ borderRadius: 16, display: "flex", flexDirection: "column", overflow: "hidden", background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)", height: 440 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.05)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1" }} className="pulse-dot" />
          <p style={{ fontSize: 13, fontWeight: 500, color: "#f5f5f5" }}>AI Assistant</p>
        </div>
        <span style={{ fontSize: 11, color: "#444" }}>6 agents active</span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }} className="scrollbar-none">
        {msgs.map((m) => (
          <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start", gap: 4 }}>
            {m.role === "ai" && (
              <p style={{ fontSize: 10, color: agentColor[m.agent ?? "default"] ?? "#6366f1", fontWeight: 600, paddingLeft: 2 }}>
                {agentLabel[m.agent ?? "default"] ?? "FounderAI"}
              </p>
            )}
            <div style={{
              maxWidth: "85%",
              padding: "10px 14px",
              borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "4px 14px 14px 14px",
              background: m.role === "user" ? "#6366f1" : "#141414",
              border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.06)",
              fontSize: 13,
              color: "#f5f5f5",
              lineHeight: 1.6,
            }}>
              {m.text || <span style={{ opacity: 0.4 }}>…</span>}
            </div>
            {m.demo && (
              <p style={{ fontSize: 10, color: "#2a2a2a", paddingLeft: 2 }}>Demo mode · Add OPENAI_API_KEY for live AI</p>
            )}
          </div>
        ))}

        <AnimatePresence>
          {thinking && (
            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <p style={{ fontSize: 10, color: "#6366f1", fontWeight: 600, marginBottom: 4 }}>FounderAI</p>
              <div style={{ display: "flex", gap: 4, padding: "10px 14px", borderRadius: "4px 14px 14px 14px", background: "#141414", border: "1px solid rgba(255,255,255,0.06)", width: "fit-content" }}>
                {[0, 1, 2].map((i) => (
                  <motion.div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#444" }}
                    animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Prompts */}
      <div style={{ display: "flex", gap: 6, padding: "8px 18px", overflowX: "auto", flexShrink: 0 }} className="scrollbar-none">
        {PROMPTS.map((p) => (
          <button key={p} onClick={() => send(p)} disabled={thinking}
            style={{ fontSize: 11, padding: "5px 12px", borderRadius: 999, background: "#141414", border: "1px solid rgba(255,255,255,0.07)", color: "#888", cursor: thinking ? "not-allowed" : "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "all 0.15s" }}>
            {p}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Ask your AI team anything…"
          disabled={thinking}
          style={{ flex: 1, background: "#141414", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "9px 14px", fontSize: 13, color: "#f5f5f5", outline: "none" }}
        />
        <button onClick={() => send()} disabled={thinking || !input.trim()}
          style={{ width: 34, height: 34, borderRadius: 10, background: input.trim() && !thinking ? "#6366f1" : "#141414", border: "none", cursor: input.trim() && !thinking ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.15s" }}>
          <Send size={13} color={input.trim() && !thinking ? "#fff" : "#444"} />
        </button>
      </div>
    </div>
  );
}
