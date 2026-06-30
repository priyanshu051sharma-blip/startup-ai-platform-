"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Is FounderAI a chatbot or an actual platform?",
    a: "FounderAI is a full AI Startup Operating System — not a chatbot. It combines specialized AI agents, machine learning models, financial intelligence, RAG-powered research, and real-time market data to act as your entire executive team. Think of it as hiring a CFO, CMO, Product Manager, Legal Advisor, and Investor Coach — all powered by AI.",
  },
  {
    q: "How accurate are the financial projections and valuations?",
    a: "Our financial models use industry benchmarks, comparable startup data, and multiple valuation methodologies (DCF, VC Method, Scorecard, Berkus, and more). Each output includes a confidence score and the assumptions used. They're built for investor-grade presentations, not just rough estimates.",
  },
  {
    q: "Can I use FounderAI without a business plan or financial data?",
    a: "Absolutely. You can start with just an idea. FounderAI will generate an initial startup profile, health score, and recommendations from a text description alone. As you add more data — financials, documents, website, pitch deck — the analysis becomes progressively more detailed.",
  },
  {
    q: "How does the Investor Simulator work?",
    a: "The Investor Simulator puts you in a live Q&A with an AI that behaves like a venture capitalist. It asks tough questions, scores your answers in real-time on clarity, market knowledge, financial understanding, and confidence, then gives you a detailed feedback report with areas to improve.",
  },
  {
    q: "Is my data secure and private?",
    a: "Yes. All documents and data are encrypted at rest and in transit. We use role-based access controls, support MFA, and maintain audit logs. We never train our models on your private startup data. Enterprise plans include dedicated infrastructure options.",
  },
  {
    q: "Can I collaborate with my co-founders and team?",
    a: "Yes. Business and Enterprise plans support team workspaces with role-based permissions — Admin, Editor, Viewer, and specialized roles like Finance and Product. Team members can comment on reports, assign tasks, and access shared AI conversations.",
  },
  {
    q: "What's the difference between the AI agents?",
    a: "Each AI agent is specialized with domain-specific knowledge. The AI CFO focuses on financials, burn rate, and valuation. The AI CTO reviews tech architecture. The AI Legal Advisor handles compliance and IP. They share memory through a central orchestrator so each agent knows context from the others.",
  },
  {
    q: "Do you offer a free plan?",
    a: "Yes. The free plan includes 3 AI analyses per month, a basic startup health score, limited AI chat, and essential reports — enough to explore the platform and see its value before upgrading.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 id="faq-heading" className="text-[clamp(32px,4vw,48px)] font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#737373]">
            Still have questions?{" "}
            <button className="text-[#4F8CFF] hover:underline">Chat with AI →</button>
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="glass rounded-[18px] border border-white/[0.06] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group"
                aria-expanded={openIndex === i}
              >
                <span className="text-white text-sm font-medium group-hover:text-[#4F8CFF] transition-colors">
                  {faq.q}
                </span>
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                  {openIndex === i ? (
                    <Minus size={12} className="text-[#4F8CFF]" />
                  ) : (
                    <Plus size={12} className="text-[#737373]" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <p className="px-5 pb-5 text-sm text-[#B4B4B4] leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
