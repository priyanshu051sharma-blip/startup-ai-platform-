import { PrimaryInsight } from "@/components/dashboard/primary-insight";
import { MetricRow } from "@/components/dashboard/metric-row";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { HealthScore } from "@/components/dashboard/health-score";
import { AiActivity } from "@/components/dashboard/ai-activity";
import { AiChat } from "@/components/dashboard/ai-chat";
import { InvestorChecklist } from "@/components/dashboard/investor-checklist";
import { Recommendations } from "@/components/dashboard/recommendations";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto pb-12">
      <PrimaryInsight />
      <MetricRow />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">
        <div className="space-y-5 min-w-0">
          <RevenueChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <HealthScore />
            <InvestorChecklist />
          </div>
          <Recommendations />
        </div>
        <div className="space-y-5 min-w-0">
          <AiChat />
          <AiActivity />
        </div>
      </div>
    </div>
  );
}
