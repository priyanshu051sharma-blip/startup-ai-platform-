"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Get started with the basics",
    color: "#737373",
    features: [
      "3 AI analyses/month",
      "Basic startup health score",
      "Limited AI chat",
      "1 workspace",
      "Basic reports",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Starter",
    monthlyPrice: 999,
    yearlyPrice: 799,
    description: "For solo founders getting started",
    color: "#4F8CFF",
    features: [
      "Unlimited AI chat",
      "Full startup analysis",
      "Business model tools",
      "Competitor analysis",
      "SWOT & PESTLE",
      "Customer personas",
      "5 workspaces",
    ],
    cta: "Start Starter",
    popular: false,
  },
  {
    name: "Pro",
    monthlyPrice: 2499,
    yearlyPrice: 1999,
    description: "For serious founders raising funding",
    color: "#7C3AED",
    features: [
      "Everything in Starter",
      "Financial modeling & forecasts",
      "Valuation engine (6 methods)",
      "Pitch deck AI generator",
      "Investor simulator",
      "AI pitch coach",
      "Grant finder",
      "Unlimited workspaces",
    ],
    cta: "Start Pro",
    popular: true,
  },
  {
    name: "Business",
    monthlyPrice: 5999,
    yearlyPrice: 4799,
    description: "For growing startup teams",
    color: "#10B981",
    features: [
      "Everything in Pro",
      "Team collaboration (10 seats)",
      "Multiple projects",
      "Mentor marketplace access",
      "Advanced AI reports",
      "Custom KPI dashboards",
      "Priority support",
    ],
    cta: "Start Business",
    popular: false,
  },
  {
    name: "Enterprise",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "For accelerators & corporates",
    color: "#F59E0B",
    features: [
      "White-label platform",
      "Custom AI models",
      "API access",
      "Unlimited seats",
      "Dedicated AI training",
      "SLA & dedicated support",
      "Custom integrations",
    ],
    cta: "Contact Us",
    popular: false,
    custom: true,
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 relative" aria-labelledby="pricing-heading">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#4F8CFF] text-sm font-semibold uppercase tracking-widest mb-4">
            Pricing
          </p>
          <h2 id="pricing-heading" className="text-[clamp(32px,4vw,56px)] font-bold text-white leading-tight mb-4">
            One Platform.
            <br />
            <span className="gradient-text">Every Tool You Need.</span>
          </h2>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className={`text-sm ${!yearly ? "text-white" : "text-[#737373]"}`}>
              Monthly
            </span>
            <button
              onClick={() => setYearly((y) => !y)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                yearly ? "bg-[#4F8CFF]" : "bg-white/20"
              }`}
              role="switch"
              aria-checked={yearly}
              aria-label="Toggle yearly pricing"
            >
              <motion.div
                animate={{ x: yearly ? 24 : 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
              />
            </button>
            <span className={`text-sm ${yearly ? "text-white" : "text-[#737373]"}`}>
              Yearly
              <span className="ml-2 text-xs text-[#10B981] font-medium">Save 20%</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`relative glass rounded-[24px] p-5 flex flex-col gap-4 border transition-shadow ${
                plan.popular
                  ? "border-[#7C3AED]/50 shadow-[0_0_40px_rgba(124,58,237,0.2)]"
                  : "border-white/[0.06]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#7C3AED] to-[#4F8CFF] text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                  <Zap size={10} />
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                <p className="text-[#737373] text-xs mt-1">{plan.description}</p>
              </div>

              <div className="border-t border-white/10 pt-3">
                {plan.custom ? (
                  <p className="text-2xl font-bold text-white">Custom</p>
                ) : (
                  <div>
                    <motion.p
                      key={yearly ? "yearly" : "monthly"}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl font-bold"
                      style={{ color: plan.color }}
                    >
                      {plan.monthlyPrice === 0
                        ? "Free"
                        : `₹${(yearly ? plan.yearlyPrice : plan.monthlyPrice).toLocaleString()}`}
                    </motion.p>
                    {plan.monthlyPrice > 0 && (
                      <p className="text-[#737373] text-xs">per month</p>
                    )}
                  </div>
                )}
              </div>

              <ul className="space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-[#B4B4B4]">
                    <Check size={12} className="mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "gradient" : "secondary"}
                size="sm"
                magnetic={false}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
