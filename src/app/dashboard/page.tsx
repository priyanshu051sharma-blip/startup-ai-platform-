import { PrimaryInsight } from "@/components/dashboard/primary-insight";
import { MetricRow } from "@/components/dashboard/metric-row";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { HealthScore } from "@/components/dashboard/health-score";
import { Recommendations } from "@/components/dashboard/recommendations";
import { AiChat } from "@/components/dashboard/ai-chat";

export default function DashboardPage() {
  return (
    <div>
      {/* Greeting + primary insight — full width, no card */}
      <PrimaryInsight />

      {/* Content grid */}
      <div style={{ padding: "32px 36px", maxWidth: 1280, margin: "0 auto" }}>
        {/* KPI row */}
        <MetricRow />

        {/* Main 2-col grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: 24,
            marginTop: 24,
          }}
        >
          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>
            <RevenueChart />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <HealthScore />
              <Recommendations />
            </div>
          </div>

          {/* Right column — AI chat + activity */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>
            <AiChat />
            <AiSummaryCard />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}

function AiSummaryCard() {
  const items = [
    { agent: "AI CFO",      msg: "Burn rate reduced 4% this month. Runway extended to 18 months.",        time: "2m ago",  dot: "#6366f1" },
    { agent: "AI CEO",      msg: "Market positioning analysis complete. 3 growth vectors identified.",      time: "18m ago", dot: "#f59e0b" },
    { agent: "AI Investor", msg: "Investment readiness improved to 84/100. One action can hit 92.",         time: "1h ago",  dot: "#22c55e" },
    { agent: "AI CMO",      msg: "GTM strategy draft ready. Review recommended before next sprint.",        time: "3h ago",  dot: "#888" },
  ];

  return (
    <div
      style={{
        borderRadius: 16,
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: "#f5f5f5" }}>AI Team · Today</p>
      </div>
      <div>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              padding: "14px 20px",
              borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.dot, flexShrink: 0, marginTop: 5 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#888", marginBottom: 3 }}>{item.agent}</p>
              <p style={{ fontSize: 12, color: "#f5f5f5", lineHeight: 1.55 }}>{item.msg}</p>
            </div>
            <span style={{ fontSize: 11, color: "#2a2a2a", flexShrink: 0, marginTop: 1 }}>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentActivity() {
  const items = [
    { label: "Startup analysis run",       sub: "Score: 84/100",   time: "Today",      color: "#6366f1" },
    { label: "Pitch simulation completed", sub: "Score: 91/100",   time: "Yesterday",  color: "#22c55e" },
    { label: "Financial model updated",    sub: "18mo runway",     time: "2 days ago", color: "#f59e0b" },
    { label: "Competitor scan done",       sub: "4 gaps found",    time: "3 days ago", color: "#888" },
  ];

  return (
    <div
      style={{
        borderRadius: 16,
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: "#f5f5f5" }}>Recent Activity</p>
      </div>
      <div>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              padding: "13px 20px",
              borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 12, color: "#f5f5f5", fontWeight: 500 }}>{item.label}</p>
              <p style={{ fontSize: 11, color: "#444" }}>{item.sub}</p>
            </div>
            <span style={{ fontSize: 11, color: "#2a2a2a", flexShrink: 0 }}>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
