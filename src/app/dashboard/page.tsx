import { PrimaryInsight } from "@/components/dashboard/primary-insight";
import { MetricRow } from "@/components/dashboard/metric-row";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { HealthScore } from "@/components/dashboard/health-score";
import { Recommendations } from "@/components/dashboard/recommendations";
import { AiChat } from "@/components/dashboard/ai-chat";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      {/* Full-width insight header */}
      <PrimaryInsight />

      {/* Page content */}
      <div style={{ padding: "24px 28px 40px" }}>
        {/* KPI strip */}
        <MetricRow />

        {/* Main grid */}
        <div className="dash-grid" style={{ marginTop: 20 }}>
          {/* Left — charts + health */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>
            <RevenueChart />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <HealthScore />
              <Recommendations />
            </div>
          </div>

          {/* Right — AI chat + feed */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>
            <AiChat />
            <AgentFeed />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentFeed() {
  const items = [
    { agent: "AI CFO",      msg: "Burn rate reduced 4% this month. Runway extended to 18 months.", time: "2m",  color: "#6366f1" },
    { agent: "AI CEO",      msg: "Market positioning complete. 3 growth vectors identified.",       time: "18m", color: "#f59e0b" },
    { agent: "AI Investor", msg: "Readiness improved to 84/100. One action can reach 92.",          time: "1h",  color: "#22c55e" },
    { agent: "AI CMO",      msg: "GTM strategy draft ready. Review before next sprint.",            time: "3h",  color: "#888" },
  ];
  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>AI Team · Today</p>
        <Link href="/dashboard/analysis" style={{ fontSize: 11, color: "var(--accent)", textDecoration: "none" }}>View all →</Link>
      </div>
      {items.map((item, i) => (
        <div key={i} style={{ padding: "12px 18px", borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: item.color, flexShrink: 0, marginTop: 5 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: item.color, marginBottom: 2 }}>{item.agent}</p>
            <p style={{ fontSize: 12, color: "var(--text)", lineHeight: 1.55 }}>{item.msg}</p>
          </div>
          <span style={{ fontSize: 11, color: "var(--text-3)", flexShrink: 0 }}>{item.time}</span>
        </div>
      ))}
    </div>
  );
}

function QuickActions() {
  const actions = [
    { label: "Run Analysis",     href: "/dashboard/analysis", color: "#6366f1" },
    { label: "Pitch Simulator",  href: "/dashboard/pitch",    color: "#22c55e" },
    { label: "Financial Model",  href: "/dashboard/finance",  color: "#f59e0b" },
    { label: "Find Grants",      href: "/dashboard/grants",   color: "#a5b4fc" },
  ];
  return (
    <div className="card" style={{ padding: "14px 18px" }}>
      <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", marginBottom: 12 }}>Quick Actions</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {actions.map((a) => (
          <Link key={a.label} href={a.href} style={{ padding: "10px 12px", borderRadius: 10, background: "var(--surface-2)", border: "1px solid var(--border)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "border-color 0.15s" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: a.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "var(--text-2)", fontWeight: 500 }}>{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
