import { openai } from "@/lib/openai";
import { getStartupContextString, STARTUP_CONTEXT } from "@/lib/startup-data";
import { z } from "zod";

const RequestSchema = z.object({
  type: z.enum(["full", "financial", "market", "pitch", "swot", "health"]).default("full"),
  additionalContext: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const { type, additionalContext } = parsed.data;

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_openai_api_key_here") {
      return Response.json({ success: true, data: getDemoAnalysis(type) });
    }

    const context = getStartupContextString();
    const prompt = buildAnalysisPrompt(type, context, additionalContext);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.5,
      max_tokens: 1500,
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const data = JSON.parse(raw);

    return Response.json({ success: true, data, generatedAt: new Date().toISOString() });
  } catch (err) {
    console.error("Analysis API error:", err);
    return Response.json({ error: "Analysis failed" }, { status: 500 });
  }
}

function buildAnalysisPrompt(type: string, context: string, extra?: string): string {
  const base = `You are a senior startup analyst. Analyze this startup and return structured JSON.\n\nStartup data:\n${context}${extra ? `\n\nAdditional context: ${extra}` : ""}`;

  const schemas: Record<string, string> = {
    full: `${base}

Return JSON with this exact structure:
{
  "summary": "2-sentence executive summary",
  "overallScore": number (0-100),
  "dimensions": [
    { "name": string, "score": number, "insight": string, "recommendation": string }
  ],
  "swot": {
    "strengths": [string],
    "weaknesses": [string],
    "opportunities": [string],
    "threats": [string]
  },
  "topRecommendations": [
    { "priority": "high"|"medium"|"low", "title": string, "impact": string, "effort": string, "rationale": string }
  ],
  "investorReadiness": { "score": number, "gaps": [string], "nextSteps": [string] }
}`,

    financial: `${base}

Return JSON:
{
  "summary": string,
  "metrics": { "healthScore": number, "burnMultiple": number, "magicNumber": number, "paybackPeriod": string },
  "projections": [{ "month": string, "revenue": number, "expenses": number, "cumulative": number }],
  "insights": [string],
  "risks": [{ "risk": string, "severity": "high"|"medium"|"low", "mitigation": string }],
  "recommendations": [string]
}`,

    market: `${base}

Return JSON:
{
  "summary": string,
  "tam": string,
  "sam": string,
  "som": string,
  "competitiveLandscape": [{ "competitor": string, "strength": string, "weakness": string }],
  "positioning": string,
  "opportunities": [string],
  "threats": [string]
}`,

    pitch: `${base}

Return JSON:
{
  "overallScore": number,
  "sections": [{ "name": string, "score": number, "feedback": string, "suggestion": string }],
  "topStrengths": [string],
  "criticalGaps": [string],
  "investorQuestions": [string]
}`,

    swot: `${base}

Return JSON:
{
  "strengths": [{ "point": string, "evidence": string }],
  "weaknesses": [{ "point": string, "evidence": string }],
  "opportunities": [{ "point": string, "potential": string }],
  "threats": [{ "point": string, "mitigation": string }]
}`,

    health: `${base}

Return JSON:
{
  "overall": number,
  "dimensions": [
    { "name": string, "score": number, "weight": number, "status": "strong"|"fair"|"weak", "keyInsight": string, "quickWin": string }
  ],
  "trend": "improving"|"stable"|"declining",
  "nextMilestone": string
}`,
  };

  return schemas[type] ?? schemas.full;
}

function getDemoAnalysis(type: string) {
  const demos: Record<string, object> = {
    full: {
      summary: "Strong B2B SaaS with solid technology and market traction. Main lever is pricing optimization and financial model maturity.",
      overallScore: 81,
      dimensions: [
        { name: "Business Model",  score: 82, insight: "Subscription model with healthy retention. LTV:CAC of 2.8 is improving but below 3x benchmark.", recommendation: "Focus on reducing CAC through referral loops." },
        { name: "Financial",       score: 74, insight: "18 months runway is solid. Pricing is 23% below market creating revenue headroom.", recommendation: "Raise Pro plan by ₹500/mo immediately." },
        { name: "Market",          score: 88, insight: "TAM is ₹4,200 Cr in India. 8% MoM growth indicates strong PMF.", recommendation: "Double down on current ICP before expanding." },
        { name: "Technology",      score: 91, insight: "Clean architecture. Scalable to 10x current load without major rework.", recommendation: "Begin SOC2 compliance process for enterprise readiness." },
        { name: "Execution",       score: 67, insight: "Lack of documented OKRs creates accountability gaps. Biggest risk at this stage.", recommendation: "Implement OKR framework this quarter." },
        { name: "Legal",           score: 85, insight: "Incorporated correctly. IP is protected. Missing GDPR compliance.", recommendation: "Add privacy policy and data processing agreements." },
      ],
      swot: {
        strengths: ["Strong AI-first product differentiation", "High NPS (72) and low churn", "91/100 technology score — scalable foundation"],
        weaknesses: ["Pricing below market — leaving ₹18L+ ARR on table", "No documented OKRs or accountability structure", "Missing enterprise compliance (SOC2, GDPR)"],
        opportunities: ["₹4,200 Cr TAM in India B2B SaaS", "Government grants (₹75L+ available)", "Enterprise market entirely untapped"],
        threats: ["3 funded competitors with similar positioning", "Potential margin compression as market matures", "Key-person dependency risk"],
      },
      topRecommendations: [
        { priority: "high",   title: "Raise Pro plan by ₹500/mo",            impact: "+₹18L ARR", effort: "2 days",  rationale: "23% below market. At 220 Pro users, minimal churn risk." },
        { priority: "high",   title: "Add 24-month financials to pitch deck", impact: "+8 investor score", effort: "1 day",   rationale: "Cited in 78% of seed rejections at your stage." },
        { priority: "medium", title: "Implement OKR framework",              impact: "+10 execution score", effort: "2 weeks", rationale: "Execution at 67 is your biggest risk. Structure fixes this." },
        { priority: "medium", title: "Apply for DPIIT recognition",          impact: "+₹25L funding",      effort: "1 hour",  rationale: "All criteria met. Deadline Aug 31." },
        { priority: "low",    title: "Begin SOC2 Type I process",            impact: "Enterprise unlock",   effort: "3 months", rationale: "Required by 90% of enterprise prospects." },
      ],
      investorReadiness: {
        score: 84,
        gaps: ["No 24-month financial projections", "Missing unit economics slide", "Team slide lacks advisor credentials"],
        nextSteps: ["Add financial model to deck", "Document CAC/LTV/payback in one slide", "Add 2-3 named advisors"],
      },
    },

    financial: {
      summary: "Financially healthy with strong growth trajectory. Pricing adjustment is the single highest-ROI lever.",
      metrics: { healthScore: 74, burnMultiple: 0.67, magicNumber: 1.8, paybackPeriod: "9 months" },
      projections: [
        { month: "Jul", revenue: 453600, expenses: 285000, cumulative: 168600 },
        { month: "Aug", revenue: 489888, expenses: 290000, cumulative: 368488 },
        { month: "Sep", revenue: 529079, expenses: 295000, cumulative: 602567 },
        { month: "Oct", revenue: 571405, expenses: 300000, cumulative: 873972 },
        { month: "Nov", revenue: 617117, expenses: 305000, cumulative: 1186089 },
        { month: "Dec", revenue: 666487, expenses: 310000, cumulative: 1542576 },
      ],
      insights: [
        "Burn multiple of 0.67 is excellent (benchmark: <1.5 for seed)",
        "Revenue growing 8%/mo vs expenses growing ~1.8%/mo — widening margin",
        "At current trajectory, cash-flow positive in month 7",
      ],
      risks: [
        { risk: "Churn spike if pricing raised too aggressively", severity: "medium", mitigation: "Grandfather existing customers at old price for 6 months" },
        { risk: "Single revenue tier concentration", severity: "medium", mitigation: "Launch Enterprise tier at ₹8,999/mo" },
      ],
      recommendations: ["Raise pricing now — payback is immediate", "Model enterprise tier revenue potential", "Build 3-scenario financial model for investor deck"],
    },

    health: {
      overall: 81,
      dimensions: [
        { name: "Business Model", score: 82, weight: 0.2, status: "strong", keyInsight: "Subscription with 97% retention. LTV:CAC improving.", quickWin: "Add annual plan at 20% discount to boost LTV" },
        { name: "Financial",      score: 74, weight: 0.2, status: "fair",   keyInsight: "Good runway but underpriced vs market.", quickWin: "Raise Pro plan ₹500/mo this week" },
        { name: "Market",         score: 88, weight: 0.15, status: "strong", keyInsight: "Strong PMF signal. 8% MoM in a ₹4,200 Cr TAM.", quickWin: "Document ICP more precisely for sales" },
        { name: "Technology",     score: 91, weight: 0.15, status: "strong", keyInsight: "Scalable architecture. Minimal tech debt.", quickWin: "Start SOC2 for enterprise readiness" },
        { name: "Execution",      score: 67, weight: 0.2, status: "weak",   keyInsight: "No documented OKRs. Biggest risk at stage.", quickWin: "Set 3 company OKRs this quarter" },
        { name: "Legal",          score: 85, weight: 0.1, status: "strong", keyInsight: "Clean incorporation and IP. Minor compliance gaps.", quickWin: "Add GDPR data processing agreements" },
      ],
      trend: "improving",
      nextMilestone: "Reach 85/100 health score by Q3 — primarily by improving Execution (OKRs) and Financial (pricing) dimensions",
    },

    pitch: {
      overallScore: 84,
      sections: [
        { name: "Problem Statement",  score: 88, feedback: "Clear and compelling. Good market size context.", suggestion: "Add one founder story to make it personal." },
        { name: "Solution",           score: 86, feedback: "AI differentiation is clear. Demo is strong.", suggestion: "Lead with customer outcome, not feature." },
        { name: "Market Size",        score: 90, feedback: "TAM/SAM/SOM clearly defined.", suggestion: "Add bottom-up sizing to complement top-down." },
        { name: "Business Model",     score: 82, feedback: "Subscription model clear. Pricing shown.", suggestion: "Add cohort retention curve." },
        { name: "Traction",           score: 88, feedback: "MRR chart and growth rate are compelling.", suggestion: "Add logos of notable customers." },
        { name: "Team",               score: 72, feedback: "Founding team strong. Missing advisors.", suggestion: "Add 2-3 credible advisors with names." },
        { name: "Financials",         score: 68, feedback: "Missing 24-month projections — most common ask.", suggestion: "Add full P&L projection and assumptions." },
        { name: "Ask",                score: 80, feedback: "Raise amount clear. Use of funds vague.", suggestion: "Break down use of funds into hiring/product/marketing %" },
      ],
      topStrengths: ["Strong traction story with clear MoM growth", "AI differentiation well-articulated", "Market size well-researched"],
      criticalGaps: ["No 24-month financial projections (78% of investors ask)", "Team slide lacks advisors", "Use of funds not broken down"],
      investorQuestions: [
        "What happens to growth if you double CAC — is the market large enough?",
        "Why hasn't a well-funded competitor copied your core AI feature?",
        "What does month 18 look like if growth slows to 4%?",
        "Who owns the customer relationship — founder or product?",
      ],
    },

    market: {
      summary: "Strong market position in an underpenetrated segment. Primary risk is faster-moving funded competitors.",
      tam: "₹4,200 Cr (India B2B SaaS tools for SMBs, 2025)",
      sam: "₹840 Cr (AI-first startup tools, early-stage segment)",
      som: "₹42 Cr (achievable 5% SAM capture in 3 years)",
      competitiveLandscape: [
        { competitor: "Competitor A", strength: "Brand recognition, larger sales team", weakness: "Expensive, no AI-native features" },
        { competitor: "Competitor B", strength: "VC-funded, fast product velocity", weakness: "US-focused, poor India localization" },
        { competitor: "Competitor C", strength: "Low price point", weakness: "No AI, template-only approach" },
      ],
      positioning: "Only AI-native startup OS built for Indian founders — combining strategy, finance, legal, and fundraising in one workspace at 1/10th the cost of consultants.",
      opportunities: ["Government push for startup ecosystem (₹10,000 Cr Fund of Funds)", "DPIIT-recognized startups get tax exemptions, creating a natural referral incentive", "Enterprise tier completely untapped"],
      threats: ["Global AI tools expanding to India with lower prices", "Commoditization of base AI features", "Regulatory changes affecting data storage"],
    },

    swot: {
      strengths: [
        { point: "AI-first product differentiation", evidence: "Technology score 91/100. Competitors are template-based." },
        { point: "Strong retention (97%)", evidence: "Churn at 3% vs industry 8-12% average." },
        { point: "Scalable unit economics", evidence: "LTV:CAC of 2.8, improving toward 3x benchmark." },
      ],
      weaknesses: [
        { point: "Underpriced vs market", evidence: "Pro plan 23% below competitors — ₹18L+ ARR left on table." },
        { point: "Execution gaps (67/100)", evidence: "No documented OKRs, key-person dependency on 2 founders." },
        { point: "Missing enterprise compliance", evidence: "No SOC2 or GDPR — blocks enterprise deals." },
      ],
      opportunities: [
        { point: "Government grants ₹75L+ available", potential: "DPIIT, DST NIDHI qualify. 1-hour application each." },
        { point: "Enterprise tier untapped", potential: "10x revenue per seat vs SMB. No additional product work needed." },
        { point: "Referral flywheel possible", potential: "97% retention means strong NPS. Structured referral adds 30% organic growth." },
      ],
      threats: [
        { point: "3 funded competitors with similar positioning", mitigation: "Deepen AI moat — ship features competitors can't easily replicate." },
        { point: "Key-person risk (2 founders)", mitigation: "Hire 1-2 senior leaders this year. Document all founder-only processes." },
        { point: "Market commoditization", mitigation: "Move upmarket to enterprise before base features become table stakes." },
      ],
    },
  };

  return demos[type] ?? demos.full;
}
