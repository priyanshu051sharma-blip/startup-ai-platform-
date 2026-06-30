import { openai, AGENT_PERSONAS, detectAgent } from "@/lib/openai";
import { getStartupContextString } from "@/lib/startup-data";
import { z } from "zod";

const RequestSchema = z.object({
  message: z.string().min(1).max(2000),
  history: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string(),
  })).optional().default([]),
  agentOverride: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const { message, history, agentOverride } = parsed.data;
    const agent = agentOverride ?? detectAgent(message);
    const persona = AGENT_PERSONAS[agent] ?? AGENT_PERSONAS.default;
    const context = getStartupContextString();

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_openai_api_key_here") {
      // Return a structured demo response when no API key is set
      return getDemoResponse(message, agent);
    }

    const systemPrompt = `${persona}\n\nStartup context:\n${context}`;

    const stream = openai.beta.chat.completions.stream({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...history,
        { role: "user", content: message },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          // Send agent info first
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ agent, type: "agent" })}\n\n`));

          for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta?.content ?? "";
            if (delta) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: delta, type: "text" })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Demo responses when no API key is configured
function getDemoResponse(message: string, agent: string) {
  const lower = message.toLowerCase();
  let text = "";

  if (/price|pricing/.test(lower)) {
    text = "Your Pro plan at ₹1,999/mo is 23% below market rate. At 220 Pro users, raising to ₹2,499 adds ₹13.2L ARR annually. Estimated churn at this delta: 3-5%. Net gain: ~₹12.5L ARR. Confidence: 92%.";
  } else if (/runway|burn/.test(lower)) {
    text = "At ₹2.8L/mo burn and ₹4.2L MRR, you have 18 months of runway. At 8%/mo growth you reach cash-flow positive in month 7 — no additional funding needed. If growth drops to 4%, extend runway by cutting burn 15%.";
  } else if (/grant|fund/.test(lower)) {
    text = "3 grants you qualify for: DPIIT Startup India (₹25L, deadline Aug 31), DST NIDHI (₹50L, rolling applications), MSME Tech Upgrade Fund (₹15L). All have <30 day application cycles. Want me to draft the DPIIT application?";
  } else if (/pitch|deck|invest/.test(lower)) {
    text = "Your deck scores 84/100. Top 3 gaps: (1) No 24-month financial projections — cited in 78% of seed rejections. (2) Missing unit economics slide. (3) No advisor credentials. Fixing (1) alone raises investor readiness by 8 points.";
  } else if (/health|score/.test(lower)) {
    text = "Health score: 81/100. Strongest: Technology (91) and Market (88). Weakest: Execution (67) — you lack a documented OKR framework and accountability structure. One hire or process change here could add 10+ points.";
  } else if (/compet|market/.test(lower)) {
    text = "In B2B SaaS at your stage, your 3 primary competitors are priced 20-30% above you with similar feature sets. Your differentiation is AI depth — lean into that in positioning. TAM is ₹4,200 Cr in India alone.";
  } else {
    text = `Based on your current metrics (MRR ₹4.2L, 847 customers, 18mo runway), your startup is in a strong position. The highest-leverage action right now is increasing pricing by ₹500/mo — adds ₹18L ARR with low churn risk. Want me to model specific scenarios?`;
  }

  // Return SSE-style but as JSON for demo mode
  return Response.json({ text, agent, demo: true });
}
