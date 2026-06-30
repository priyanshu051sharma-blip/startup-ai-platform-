import { PrimaryInsight } from "@/components/dashboard/primary-insight";
import { MetricRow } from "@/components/dashboard/metric-row";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { HealthScore } from "@/components/dashboard/health-score";
import { Recommendations } from "@/components/dashboard/recommendations";
import { AiChat } from "@/components/dashboard/ai-chat";
import { AgentFeed } from "@/components/dashboard/agent-feed";
import { QuickActions } from "@/components/dashboard/quick-actions";

export default function DashboardPage() {
  return (
    <div style={{ maxWidth: 1440, margin: "0 auto" }}>
      <PrimaryInsight />

      <div style={{ padding: "28px 32px 48px" }}>
        {/* Section label */}
        <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>
          Key Metrics
        </p>

        <MetricRow />

        {/* Main 2-col layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, marginTop: 24 }}>

          {/* LEFT — charts + analysis */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>
            {/* Revenue chart */}
            <div style={{
              borderRadius: 12, overflow: "hidden",
              background: "rgba(6,6,18,0.85)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
            }}>
              <RevenueChart />
            </div>

            {/* Health + Recommendations side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{
                borderRadius: 12, overflow: "hidden",
                background: "rgba(6,6,18,0.85)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
              }}>
                <HealthScore />
              </div>
              <div style={{
                borderRadius: 12, overflow: "hidden",
                background: "rgba(6,6,18,0.85)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
              }}>
                <Recommendations />
              </div>
            </div>
          </div>

          {/* RIGHT — AI assistant + feed + actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            {/* AI Chat */}
            <div style={{
              borderRadius: 12, overflow: "hidden",
              background: "rgba(6,6,18,0.85)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
            }}>
              <AiChat />
            </div>

            {/* Agent Feed */}
            <div style={{
              borderRadius: 12, overflow: "hidden",
              background: "rgba(6,6,18,0.85)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
            }}>
              <AgentFeed />
            </div>

            {/* Quick Actions */}
            <div style={{
              borderRadius: 12, overflow: "hidden",
              background: "rgba(6,6,18,0.85)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
            }}>
              <QuickActions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
