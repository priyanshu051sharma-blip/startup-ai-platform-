"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "The investor simulator alone was worth the subscription. I walked into my seed round having already answered every tough question.",
    name: "Priya Sharma",
    role: "Founder, MedAI",
    raised: "Raised ₹1.5 Cr",
  },
  {
    quote: "I had no financial background. The AI CFO built a complete 24-month model in minutes that investors said was one of the best they'd seen.",
    name: "Rahul Mehta",
    role: "CEO, FinStack",
    raised: "Raised ₹3 Cr",
  },
  {
    quote: "The grant finder found three schemes I didn't know existed. One of them covered our entire infrastructure cost for the year.",
    name: "Vikram Nair",
    role: "Founder, AgriSense",
    raised: "₹50L grant received",
  },
];

export function LandingMetrics() {
  return (
    <section className="px-6 py-32">
      <div className="max-w-5xl mx-auto">

        {/* Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-32" style={{ background: "rgba(255,255,255,0.06)" }}>
          {[
            { value: "12,000+", label: "Founders" },
            { value: "₹240Cr+", label: "Capital raised" },
            { value: "94/100", label: "Avg pitch score" },
            { value: "4.9/5",  label: "Rating" },
          ].map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-10 text-center"
              style={{ background: "#080808" }}
            >
              <p className="text-white font-bold mb-1" style={{ fontSize: 36, letterSpacing: "-0.04em" }}>{s.value}</p>
              <p className="text-sm" style={{ color: "#525252" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="eyebrow mb-16 text-center"
        >
          From founders who built with FounderAI
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-elevated rounded-2xl p-6"
            >
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#a0a0a0" }}>"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: "#6366f1" }}>
                  {t.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">{t.name}</p>
                  <p className="text-xs truncate" style={{ color: "#525252" }}>{t.role}</p>
                </div>
                <span className="ml-auto text-xs px-2 py-1 rounded-full whitespace-nowrap font-medium"
                  style={{ background: "rgba(34,197,94,0.1)", color: "#4ade80" }}>
                  {t.raised}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
