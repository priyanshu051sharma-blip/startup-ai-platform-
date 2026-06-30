"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, TrendingUp, Users, DollarSign, AlertTriangle } from "lucide-react";

const analysisSteps = [
  { label: "Understanding your idea...", duration: 800 },
  { label: "Analyzing market size...", duration: 700 },
  { label: "Mapping competitors...", duration: 600 },
  { label: "Evaluating business model...", duration: 700 },
  { label: "Generating financial forecast...", duration: 900 },
  { label: "Calculating risk score...", duration: 500 },
  { label: "Building your report...", duration: 600 },
];

interface AnalysisResult {
  startup: string;
  scores: { label: string; value: number; color: string }[];
  insight: string;
}

const sampleResults: AnalysisResult = {
  startup: "",
  scores: [
    { label: "Market Opportunity", value: 84, color: "#4F8CFF" },
    { label: "Innovation Score", value: 78, color: "#7C3AED" },
    { label: "Revenue Potential", value: 91, color: "#10B981" },
    { label: "Risk Level", value: 32, color: "#F59E0B" },
  ],
  insight:
    "Strong market opportunity detected. Your startup addresses a real pain point with high demand. Primary risk is competition — recommend differentiating through superior UX and AI-native features.",
};

export function InteractiveDemo() {
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const runAnalysis = async () => {
    if (!input.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    setStepIndex(0);

    for (let i = 0; i < analysisSteps.length; i++) {
      setStepIndex(i);
      await new Promise((r) => setTimeout(r, analysisSteps[i].duration));
    }

    setResult({ ...sampleResults, startup: input });
    setIsAnalyzing(false);
    setStepIndex(-1);
  };

  const reset = () => {
    setResult(null);
    setInput("");
    setStepIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <section id="demo" className="py-24 relative" aria-labelledby="demo-heading">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#10B981] text-sm font-semibold uppercase tracking-widest mb-4">
            Try It Now — No Sign Up Required
          </p>
          <h2 id="demo-heading" className="text-[clamp(32px,4vw,56px)] font-bold text-white leading-tight mb-4">
            Describe Your Startup.
            <br />
            <span className="gradient-text">Watch AI Analyze It Live.</span>
          </h2>
          <p className="text-[#B4B4B4] text-lg">
            Enter your startup idea and see what a full AI analysis looks like in seconds.
          </p>
        </motion.div>

        <GlassCard hover={false} className="p-6 md:p-8">
          {/* Input */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !isAnalyzing && runAnalysis()}
                placeholder='e.g. "An AI platform that helps doctors diagnose rare diseases"'
                className="w-full bg-white/5 border border-white/10 rounded-[18px] px-5 py-3.5 text-white placeholder:text-[#737373] text-sm focus:outline-none focus:border-[#4F8CFF]/50 focus:bg-white/8 transition-all"
                disabled={isAnalyzing}
                aria-label="Describe your startup idea"
              />
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={runAnalysis}
              disabled={isAnalyzing || !input.trim()}
              className="flex-shrink-0"
            >
              {isAnalyzing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={18} />
                </motion.div>
              ) : (
                <Send size={18} />
              )}
            </Button>
          </div>

          {/* Analysis thinking */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-3 h-3 rounded-full bg-[#4F8CFF]"
                    />
                    <span className="text-[#4F8CFF] text-sm font-medium">
                      AI is analyzing...
                    </span>
                  </div>
                  <div className="space-y-2">
                    {analysisSteps.map((step, i) => (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: i <= stepIndex ? 1 : 0.3 }}
                        className="flex items-center gap-2.5 text-sm"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            i < stepIndex
                              ? "bg-[#10B981]"
                              : i === stepIndex
                              ? "bg-[#4F8CFF] animate-pulse"
                              : "bg-white/20"
                          }`}
                        />
                        <span
                          className={
                            i <= stepIndex ? "text-[#B4B4B4]" : "text-[#737373]"
                          }
                        >
                          {step.label}
                        </span>
                        {i < stepIndex && (
                          <span className="text-[#10B981] text-xs ml-auto">
                            ✓
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-white font-semibold">
                    Analysis: <span className="gradient-text-blue">"{result.startup}"</span>
                  </h3>
                  <button
                    onClick={reset}
                    className="text-[#737373] hover:text-white text-xs transition-colors"
                    aria-label="Reset demo"
                  >
                    Try another →
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  {result.scores.map((score, i) => (
                    <motion.div
                      key={score.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center"
                    >
                      <p className="text-[#737373] text-xs mb-2">{score.label}</p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                        className="text-2xl font-bold"
                        style={{ color: score.color }}
                      >
                        {score.value}
                        <span className="text-sm">%</span>
                      </motion.p>
                      <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${score.value}%` }}
                          transition={{ delay: i * 0.1 + 0.4, duration: 0.8, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: score.color }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 rounded-2xl p-4 text-sm text-[#B4B4B4] leading-relaxed"
                >
                  <span className="text-[#4F8CFF] font-medium">AI Insight: </span>
                  {result.insight}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-5 flex gap-3 justify-center"
                >
                  <Button variant="primary" size="md">
                    Get Full Analysis →
                  </Button>
                  <Button variant="secondary" size="md">
                    View Sample Report
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Placeholder */}
          {!isAnalyzing && !result && (
            <div className="flex items-center justify-center gap-8 py-6 text-[#737373] text-xs">
              {[
                { icon: TrendingUp, label: "Market Analysis" },
                { icon: Users, label: "Customer Personas" },
                { icon: DollarSign, label: "Revenue Model" },
                { icon: AlertTriangle, label: "Risk Score" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <Icon size={18} className="text-[#737373]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </section>
  );
}
