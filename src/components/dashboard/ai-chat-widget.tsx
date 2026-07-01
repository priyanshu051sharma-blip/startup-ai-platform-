"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip, Sparkles, Maximize2, Minimize2, Brain, RotateCcw } from "lucide-react";
import { NeuralThinking } from "./neural-thinking";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  type?: "text" | "insight" | "report" | "task";
  timestamp: Date;
}

const SUGGESTED = [
  "Why is my health score declining?",
  "What's my investor readiness?",
  "Run financial forecast",
  "Find grants for my startup",
  "Review my pitch deck",
];

const INIT_MESSAGES: Message[] = [
  {
    id: "1", role: "ai", type: "insight",
    content: "Good morning. I've been working overnight. Your Startup Health Score improved by 3 points to 82/100. I've identified 2 high-priority actions that could push you past 90 within 2 weeks. Want me to walk you through them?",
    timestamp: new Date(),
  },
];

const AI_RESPONSES: Record<string, string> = {
  default: "Based on your current metrics and uploaded documents, I've analysed the situation. Let me generate a detailed action plan with evidence and confidence scores...",
  health: "Your health score is 82/100. The main drag is your Financial score (74) due to high CAC vs LTV ratio. Improving pricing by 18% while tightening your onboarding funnel could add +8 points within 3 weeks. Confidence: 91%.",
  pitch:  "Your pitch deck is strong (8.4/10) but missing 24-month financials — which investors request 78% of the time. I've drafted the financial slides. Want me to insert them into your deck?",
  grant:  "Found 3 government grants you qualify for: DPIIT Startup India (₹25L), DST NIDHI (₹50L), and MSME Technology Upgrade Fund (₹15L). Combined deadline is Aug 31st. Want me to draft the applications?",
};

export function AiChatWidget() {
  const [messages, setMessages] = useState<Message[]>(INIT_MESSAGES);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const getResponse = (msg: string) => {
    const lower = msg.toLowerCase();
    if (lower.includes("health") || lower.includes("score")) return AI_RESPONSES.health;
    if (lower.includes("pitch") || lower.includes("deck")) return AI_RESPONSES.pitch;
    if (lower.includes("grant") || lower.includes("fund")) return AI_RESPONSES.grant;
    return AI_RESPONSES.default;
  };

  const sendMessage = async (text?: string) => {
    const content = text || input.trim();
    if (!content || thinking) return;

    setMessages((m) => [...m, { id: Date.now().toString(), role: "user", content, type: "text", timestamp: new Date() }]);
    setInput("");
    setThinking(true);

    await new Promise((r) => setTimeout(r, 2200));

    setMessages((m) => [...m, {
      id: (Date.now() + 1).toString(), role: "ai", type: "insight",
      content: getResponse(content), timestamp: new Date(),
    }]);
    setThinking(false);
  };

  return (
    <div
      className="flex flex-col h-full rounded-[24px] overflow-hidden"
      style={{
        background: "var(--surface-2)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        border: "1px solid var(--border)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#4F8CFF,#7C3AED)", boxShadow: "0 0 12px rgba(79,140,255,0.4)" }}
          >
            <Sparkles size={13} className="text-white" />
          </div>
          <div>
            <p className="text-white text-[13px] font-semibold">AI Co-Founder</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" style={{ boxShadow: "0 0 5px rgba(16,185,129,0.8)" }} />
              <span style={{ color: "var(--text-3)" }} className="text-[10px]">Always on • Has memory</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMessages(INIT_MESSAGES)}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:text-white transition-all"
            style={{ color: "var(--text-3)", background: "transparent" }}
            aria-label="Reset conversation"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface-3)" }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent" }}
          >
            <RotateCcw size={12} />
          </button>
          <button
            onClick={() => setExpanded((e) => !e)}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:text-white transition-all"
            style={{ color: "var(--text-3)", background: "transparent" }}
            aria-label={expanded ? "Collapse" : "Expand"}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface-3)" }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent" }}
          >
            {expanded ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "ai" && (
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#4F8CFF] to-[#7C3AED] flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
                  <Brain size={9} className="text-white" />
                </div>
              )}
              <div
                className={`max-w-[82%] rounded-[16px] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                  msg.role === "user"
                    ? "text-white rounded-tr-sm"
                    : "text-[#B4B4B4] rounded-tl-sm"
                }`}
                style={
                  msg.role === "user"
                    ? { background: "linear-gradient(135deg,#4F8CFF,#6366f1)" }
                    : msg.type === "insight"
                    ? { background: "rgba(79,140,255,0.07)", border: "1px solid rgba(79,140,255,0.12)" }
                    : { background: "var(--surface-2)", border: "1px solid var(--border)" }
                }
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Thinking state */}
        <AnimatePresence>
          {thinking && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex items-start gap-2"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#4F8CFF] to-[#7C3AED] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Brain size={9} className="text-white" />
              </div>
              <div
                className="rounded-[16px] rounded-tl-sm px-3 py-2.5"
                style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.18)" }}
              >
                <NeuralThinking width={200} height={80} active={true} label="Thinking..." />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Suggested prompts */}
      <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto scrollbar-none flex-shrink-0">
        {SUGGESTED.map((p) => (
          <button
            key={p}
            onClick={() => sendMessage(p)}
            disabled={thinking}
            className="flex-shrink-0 text-[10px] px-2.5 py-1.5 rounded-full hover:text-white transition-all disabled:opacity-40 whitespace-nowrap"
            style={{ color: "var(--text-3)", border: "1px solid var(--border)", background: "var(--surface-3)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.border = "1px solid var(--border-2)"; (e.currentTarget as HTMLElement).style.background = "var(--surface)" }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.border = "1px solid var(--border)"; (e.currentTarget as HTMLElement).style.background = "var(--surface-3)" }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-3 pb-3 flex-shrink-0">
        <div
          className="flex gap-2 items-end rounded-[16px] px-3 py-2"
          style={{ background: "var(--surface)", border: "1px solid var(--border-2)" }}
        >
          <button
            className="w-6 h-6 flex items-center justify-center hover:text-white transition-colors flex-shrink-0 mt-1"
            style={{ color: "var(--text-3)" }}
            aria-label="Attach file"
          >
            <Paperclip size={13} />
          </button>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Ask your AI Co-Founder..."
            rows={1}
            disabled={thinking}
            className="flex-1 bg-transparent text-[13px] text-white placeholder:text-[#737373] focus:outline-none resize-none disabled:opacity-50"
            style={{ minHeight: "24px", maxHeight: "80px" }}
            aria-label="Chat input"
          />
          <motion.button
            onClick={() => sendMessage()}
            disabled={!input.trim() || thinking}
            whileTap={{ scale: 0.9 }}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-30 flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#4F8CFF,#7C3AED)" }}
            aria-label="Send"
          >
            <Send size={12} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
