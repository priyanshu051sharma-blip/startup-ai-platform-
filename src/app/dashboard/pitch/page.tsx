"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  { id: 1, text: "What problem are you solving and for whom? Give me a specific customer.",           category: "Problem" },
  { id: 2, text: "Why now? What has changed in the market that makes this the right time?",           category: "Timing" },
  { id: 3, text: "What makes you 10x better than existing alternatives? Be specific.",                category: "Differentiation" },
  { id: 4, text: "Walk me through your unit economics — CAC, LTV, payback period.",                  category: "Financials" },
  { id: 5, text: "How big is your market and how do you size it bottom-up?",                          category: "Market" },
  { id: 6, text: "What does your go-to-market strategy look like for the next 12 months?",           category: "GTM" },
  { id: 7, text: "How much are you raising and what milestones will it achieve?",                     category: "Ask" },
  { id: 8, text: "Who else is on your team and what makes you uniquely qualified to win?",           category: "Team" },
];

const FEEDBACK_TEMPLATES = [
  "Strong answer. Your specificity on customer type is exactly what investors want to hear. Consider adding a memorable stat or customer quote to make it stickier.",
  "Good framing of the timing argument. To strengthen this: cite a specific regulation change, tech shift, or behavioral trend with a date. Investors remember specific triggers.",
  "Your differentiation is clear but '10x' needs quantification. Replace phrases like 'better AI' with 'our model achieves 94% accuracy vs 71% industry average'. Numbers close deals.",
  "Excellent unit economics — LTV:CAC of 5.2x is above benchmark. Lead with this number upfront. Add your payback period trend (improving MoM) to show operational leverage.",
  "Market sizing is solid. Strengthen the bottom-up: show (customers × ARPU × addressable %) = your SOM. Investors trust bottom-up more than top-down reports.",
];

interface Message { role: "investor" | "user" | "feedback"; text: string; score?: number; }

export default function PitchPage() {
  const [qIndex, setQIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "investor", text: QUESTIONS[0].text }
  ]);
  const [thinking, setThinking] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const submitAnswer = async () => {
    if (!answer.trim() || thinking) return;
    const userMsg: Message = { role: "user", text: answer };
    setMessages(m => [...m, userMsg]);
    setAnswer("");
    setThinking(true);

    await new Promise(r => setTimeout(r, 1800));

    const score = 68 + Math.floor(Math.random() * 25);
    setScores(s => [...s, score]);

    const feedback = FEEDBACK_TEMPLATES[qIndex % FEEDBACK_TEMPLATES.length];
    setMessages(m => [...m, { role: "feedback", text: feedback, score }]);

    if (qIndex + 1 < QUESTIONS.length) {
      await new Promise(r => setTimeout(r, 600));
      const nextQ = QUESTIONS[qIndex + 1];
      setMessages(m => [...m, { role: "investor", text: nextQ.text }]);
      setQIndex(i => i + 1);
    } else {
      setSessionDone(true);
    }
    setThinking(false);
  };

  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, height: "calc(100vh - 46px)" }}>
      {/* Chat area */}
      <div style={{ display: "flex", flexDirection: "column", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg, var(--accent), #818cf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
            🎯
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>AI Investor Simulator</p>
            <p style={{ fontSize: 12, color: "var(--text-3)" }}>Question {Math.min(qIndex + 1, QUESTIONS.length)} of {QUESTIONS.length} · {QUESTIONS[Math.min(qIndex, QUESTIONS.length - 1)].category}</p>
          </div>
          {scores.length > 0 && (
            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <p style={{ fontSize: 20, fontWeight: 900, color: "var(--accent)", letterSpacing: "-0.04em" }}>{avgScore}</p>
              <p style={{ fontSize: 10, color: "var(--text-3)" }}>avg score</p>
            </div>
          )}
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 14 }} className="scrollbar-none">
          {messages.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start", gap: 4 }}>
              {m.role === "investor" && <p style={{ fontSize: 10, color: "var(--accent)", fontWeight: 700, marginBottom: 2 }}>AI INVESTOR</p>}
              {m.role === "feedback" && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <p style={{ fontSize: 10, color: "var(--green)", fontWeight: 700 }}>FEEDBACK</p>
                  {m.score && <span style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", background: "var(--accent-light)", padding: "1px 8px", borderRadius: 999 }}>{m.score}/100</span>}
                </div>
              )}
              <div style={{
                maxWidth: "86%",
                padding: "12px 16px",
                borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "4px 14px 14px 14px",
                background: m.role === "user" ? "var(--accent)" : m.role === "feedback" ? "rgba(22,163,74,0.08)" : "var(--surface-2)",
                border: m.role === "feedback" ? "1px solid rgba(22,163,74,0.2)" : "1px solid var(--border)",
                fontSize: 14, color: m.role === "user" ? "#fff" : "var(--text)", lineHeight: 1.6,
              }}>
                {m.text}
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            {thinking && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", gap: 6, padding: "12px 16px", background: "var(--surface-2)", borderRadius: "4px 14px 14px 14px", border: "1px solid var(--border)", width: "fit-content" }}>
                {[0, 1, 2].map(i => (
                  <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
                    style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {sessionDone && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{ padding: 20, borderRadius: 14, background: "var(--accent-light)", border: "1px solid rgba(79,70,229,0.2)", textAlign: "center" }}>
              <p style={{ fontSize: 20, marginBottom: 8 }}>🎉</p>
              <p style={{ fontSize: 16, fontWeight: 800, color: "var(--accent)", marginBottom: 4 }}>Session Complete!</p>
              <p style={{ fontSize: 13, color: "var(--text-2)" }}>Average score: <strong>{avgScore}/100</strong></p>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        {!sessionDone && (
          <div style={{ padding: "14px 16px", borderTop: "1px solid var(--border)", display: "flex", gap: 10 }}>
            <textarea
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitAnswer(); } }}
              placeholder="Type your answer… (Enter to submit, Shift+Enter for new line)"
              rows={2}
              style={{ flex: 1, background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "var(--text)", resize: "none", outline: "none", fontFamily: "inherit", lineHeight: 1.5 }}
            />
            <button onClick={submitAnswer} disabled={!answer.trim() || thinking}
              style={{ padding: "0 20px", borderRadius: 10, background: answer.trim() && !thinking ? "var(--accent)" : "var(--surface-3)", color: answer.trim() && !thinking ? "#fff" : "var(--text-3)", border: "none", cursor: answer.trim() && !thinking ? "pointer" : "not-allowed", fontSize: 13, fontWeight: 700, transition: "all 0.15s", flexShrink: 0 }}>
              Send →
            </button>
          </div>
        )}
      </div>

      {/* Right panel — progress */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Score card */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 20 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Session Scores</p>
          {scores.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--text-3)" }}>Scores appear after each answer</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {scores.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11, color: "var(--text-3)", width: 80, flexShrink: 0 }}>Q{i + 1}: {QUESTIONS[i]?.category}</span>
                  <div style={{ flex: 1, height: 5, background: "var(--border)", borderRadius: 999 }}>
                    <div style={{ height: "100%", width: `${s}%`, background: s >= 85 ? "var(--green)" : s >= 70 ? "var(--accent)" : "var(--amber)", borderRadius: 999 }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", width: 28, textAlign: "right", flexShrink: 0 }}>{s}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Question list */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, flex: 1 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Questions</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {QUESTIONS.map((q, i) => (
              <div key={q.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", borderRadius: 8, background: i === qIndex ? "var(--accent-light)" : "transparent" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, flexShrink: 0, background: scores[i] ? "var(--green)" : i === qIndex ? "var(--accent)" : "var(--surface-3)", color: scores[i] || i === qIndex ? "#fff" : "var(--text-3)" }}>
                  {scores[i] ? "✓" : i + 1}
                </div>
                <p style={{ fontSize: 11, color: i === qIndex ? "var(--accent)" : scores[i] ? "var(--green)" : "var(--text-3)", lineHeight: 1.4, fontWeight: i === qIndex ? 600 : 400 }}>
                  {q.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
