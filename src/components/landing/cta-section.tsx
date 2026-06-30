"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-32 relative overflow-hidden" aria-labelledby="cta-heading">
      {/* Galaxy background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-radial from-[#7C3AED]/20 via-[#4F8CFF]/10 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.15) 0%, rgba(79,140,255,0.08) 40%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[#7C3AED] text-sm font-semibold uppercase tracking-widest mb-6">
            Ready to Build?
          </p>
          <h2 id="cta-heading" className="text-[clamp(40px,6vw,80px)] font-bold text-white leading-tight mb-6">
            Ready to Build Your
            <br />
            <span className="gradient-text">Billion-Dollar Startup?</span>
          </h2>
          <p className="text-[#B4B4B4] text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Join 12,000+ founders using AI to validate, build, fund, and scale
            their startups. Start free — no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gradient" size="xl" className="group">
              Start Building Free
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
            <Button variant="secondary" size="xl">
              <Calendar size={18} />
              Book a Demo
            </Button>
          </div>

          <p className="mt-6 text-[#737373] text-sm">
            Free plan forever. No credit card. Upgrade anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
