// In-memory startup data store
// In production this would be a database (Prisma + Postgres)

export const STARTUP_CONTEXT = {
  name: "My Startup",
  stage: "Early Seed",
  industry: "B2B SaaS",
  founded: "2024",
  metrics: {
    mrr: 420000,          // ₹4.2L
    arr: 5040000,         // ₹50.4L
    customers: 847,
    burnRate: 280000,     // ₹2.8L/mo
    runway: 18,           // months
    valuation: 32000000,  // ₹3.2 Cr
    growthRate: 0.08,     // 8% MoM
    churnRate: 0.03,      // 3%
    ltv: 84000,           // ₹84K
    cac: 30000,           // ₹30K
    cacLtvRatio: 2.8,
  },
  healthScore: {
    overall: 81,
    dimensions: [
      { name: "Business Model", score: 82, weight: 0.2 },
      { name: "Financial",      score: 74, weight: 0.2 },
      { name: "Market",         score: 88, weight: 0.15 },
      { name: "Technology",     score: 91, weight: 0.15 },
      { name: "Execution",      score: 67, weight: 0.2 },
      { name: "Legal",          score: 85, weight: 0.1 },
    ],
  },
  performance: [
    { month: "Jan", revenue: 180000, expenses: 220000, customers: 420 },
    { month: "Feb", revenue: 220000, expenses: 225000, customers: 490 },
    { month: "Mar", revenue: 260000, expenses: 240000, customers: 560 },
    { month: "Apr", revenue: 300000, expenses: 250000, customers: 620 },
    { month: "May", revenue: 360000, expenses: 265000, customers: 710 },
    { month: "Jun", revenue: 420000, expenses: 280000, customers: 847 },
  ],
  investorReadiness: {
    score: 84,
    gaps: [
      "Missing 24-month financial projections",
      "No documented unit economics slide",
      "Team slide lacks advisor credentials",
    ],
  },
};

export function getStartupContextString(): string {
  const d = STARTUP_CONTEXT;
  return `
Startup: ${d.name} | Stage: ${d.stage} | Industry: ${d.industry}
MRR: ₹${(d.metrics.mrr / 100000).toFixed(1)}L | ARR: ₹${(d.metrics.arr / 100000).toFixed(1)}L
Customers: ${d.metrics.customers} | Growth: ${(d.metrics.growthRate * 100).toFixed(0)}%/mo | Churn: ${(d.metrics.churnRate * 100).toFixed(0)}%
Burn: ₹${(d.metrics.burnRate / 100000).toFixed(1)}L/mo | Runway: ${d.metrics.runway} months
CAC: ₹${(d.metrics.cac / 1000).toFixed(0)}K | LTV: ₹${(d.metrics.ltv / 1000).toFixed(0)}K | CAC:LTV = 1:${d.metrics.cacLtvRatio}
Valuation: ₹${(d.metrics.valuation / 10000000).toFixed(1)} Cr (AI estimated)
Health Score: ${d.healthScore.overall}/100
Investor Readiness: ${d.investorReadiness.score}/100
Key gaps: ${d.investorReadiness.gaps.join("; ")}
`.trim();
}
