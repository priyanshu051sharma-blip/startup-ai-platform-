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
        <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>
          Key Metrics
        </p>

        <MetricRow />

        {/* Main 2-col layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, marginTop: 24 }}>

          {/* LEFT — charts + analysis */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>
            {/* Revenue chart */}
            <div className="card card-elevated" style={{ overflow: "hidden" }}>
              <RevenueChart />
            </div>

            {/* Health + Recommendations side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div className="card card-elevated" style={{ overflow: "hidden" }}>
                <HealthScore />
              </div>
              <div className="card card-elevated" style={{ overflow: "hidden" }}>
                <Recommendations />
              </div>
            </div>
          </div>

          {/* RIGHT — AI assistant + feed + actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            {/* AI Chat */}
            <div className="card card-elevated" style={{ overflow: "hidden" }}>
              <AiChat />
            </div>

            {/* Agent Feed */}
            <div className="card card-elevated" style={{ overflow: "hidden" }}>
              <AgentFeed />
            </div>

            {/* Quick Actions */}
            <div className="card card-elevated" style={{ overflow: "hidden" }}>
              <QuickActions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
