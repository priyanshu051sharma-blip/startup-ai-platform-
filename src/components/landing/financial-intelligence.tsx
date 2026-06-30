"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { formatCurrency } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function generateProjections(revenue: number, expenses: number, team: number) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let cur = revenue;
  let burn = expenses + team * 80000;
  return months.map((month) => {
    cur = cur * 1.08;
    burn = burn * 1.02;
    return {
      month,
      revenue: Math.round(cur),
      expenses: Math.round(burn),
      profit: Math.round(cur - burn),
    };
  });
}

export function FinancialIntelligence() {
  const [revenue, setRevenue] = useState(500000);
  const [expenses, setExpenses] = useState(300000);
  const [team, setTeam] = useState(5);

  const data = generateProjections(revenue, expenses, team);
  const valuation = Math.round(revenue * 12 * 4.5);
  const runway = Math.round((revenue * 3) / (expenses + team * 80000));
  const burnRate = expenses + team * 80000;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
      return (
        <div className="glass rounded-2xl p-3 border border-white/10 text-xs">
          <p className="text-white font-medium mb-1">{label}</p>
          {payload.map((p: any) => (
            <p key={p.dataKey} style={{ color: p.color }}>
              {p.name}: {formatCurrency(p.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-24 relative" aria-labelledby="finance-heading">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#10B981] text-sm font-semibold uppercase tracking-widest mb-4">
            Financial Intelligence
          </p>
          <h2 id="finance-heading" className="text-[clamp(32px,4vw,56px)] font-bold text-white leading-tight">
            Move Every Slider.
            <br />
            <span className="gradient-text">Watch Your Financials Update.</span>
          </h2>
        </motion.div>

        <GlassCard hover={false} className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sliders */}
            <div className="flex flex-col gap-6">
              <h3 className="text-white font-semibold text-lg">Input Parameters</h3>

              {[
                {
                  label: "Monthly Revenue",
                  value: revenue,
                  min: 50000,
                  max: 5000000,
                  step: 50000,
                  setter: setRevenue,
                  color: "#10B981",
                },
                {
                  label: "Monthly Expenses",
                  value: expenses,
                  min: 50000,
                  max: 3000000,
                  step: 50000,
                  setter: setExpenses,
                  color: "#EF4444",
                },
                {
                  label: "Team Size",
                  value: team,
                  min: 1,
                  max: 50,
                  step: 1,
                  setter: setTeam,
                  color: "#4F8CFF",
                  prefix: "",
                  isCurrency: false,
                },
              ].map((slider) => (
                <div key={slider.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#737373]">{slider.label}</span>
                    <span className="text-white font-medium">
                      {slider.isCurrency === false
                        ? `${slider.value} people`
                        : formatCurrency(slider.value)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    value={slider.value}
                    onChange={(e) => slider.setter(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${slider.color} 0%, ${slider.color} ${
                        ((slider.value - slider.min) / (slider.max - slider.min)) * 100
                      }%, rgba(255,255,255,0.1) ${
                        ((slider.value - slider.min) / (slider.max - slider.min)) * 100
                      }%, rgba(255,255,255,0.1) 100%)`,
                    }}
                    aria-label={slider.label}
                  />
                </div>
              ))}

              {/* Calculated metrics */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                {[
                  { label: "Est. Valuation", value: formatCurrency(valuation), color: "#7C3AED" },
                  { label: "Monthly Burn", value: formatCurrency(burnRate), color: "#EF4444" },
                  { label: "Runway", value: `${runway} months`, color: "#F59E0B" },
                ].map((m) => (
                  <div key={m.label} className="flex justify-between text-sm">
                    <span className="text-[#737373]">{m.label}</span>
                    <motion.span
                      key={m.value}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-bold"
                      style={{ color: m.color }}
                    >
                      {m.value}
                    </motion.span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-semibold text-lg mb-4">
                12-Month Projection
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EF4444" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#737373", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#737373", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => formatCurrency(v)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#10B981"
                    strokeWidth={2}
                    fill="url(#revenueGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    name="Expenses"
                    stroke="#EF4444"
                    strokeWidth={2}
                    fill="url(#expenseGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
