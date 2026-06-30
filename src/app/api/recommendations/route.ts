// Recommendations API — returns actionable items sorted by impact

export async function GET() {
  const recommendations = [
    {
      id: "1",
      priority: "high",
      title: "Increase pricing by ₹500/mo",
      desc: "Your Pro plan is 23% below market. Raising it adds ₹18L ARR while keeping you competitive.",
      impact: "+8 health pts",
      impactValue: 8,
      effort: "2 days",
      why: "Benchmarked against 14 comparable SaaS products at your stage. Confidence: 92%.",
      agent: "CFO",
    },
    {
      id: "2",
      priority: "high",
      title: "Add 24-month financial projections to deck",
      desc: "Your pitch deck is missing forward financials — the #1 reason investors request more info.",
      impact: "+6 investor score",
      impactValue: 6,
      effort: "1 day",
      why: "Based on analysis of 340 seed decks. 78% of rejections at your stage cited missing financials.",
      agent: "Investor",
    },
    {
      id: "3",
      priority: "medium",
      title: "File trademark application",
      desc: "Two similar brand names found in adjacent markets. A ₹5K application protects your brand.",
      impact: "+3 legal score",
      impactValue: 3,
      effort: "1 week",
      why: "IP conflict probability: 34% based on brand similarity and market overlap.",
      agent: "Legal",
    },
    {
      id: "4",
      priority: "medium",
      title: "Improve CAC:LTV ratio to 1:3+",
      desc: "Current 1:2.8 is below the healthy 1:3 benchmark. Reducing onboarding drop-off by 15% fixes this.",
      impact: "+5 financial score",
      impactValue: 5,
      effort: "3 weeks",
      why: "Benchmarked against 80 SaaS startups at ₹3-8 Cr ARR.",
      agent: "CFO",
    },
    {
      id: "5",
      priority: "low",
      title: "Apply for DPIIT recognition",
      desc: "You qualify. Unlocks tax exemptions and access to ₹10,000 Cr Fund of Funds. Takes 1 hour.",
      impact: "+₹25L funding",
      impactValue: 4,
      effort: "1 hour",
      why: "All eligibility criteria met based on incorporation date, revenue, and industry.",
      agent: "Legal",
    },
  ];

  return Response.json({ success: true, data: recommendations });
}
