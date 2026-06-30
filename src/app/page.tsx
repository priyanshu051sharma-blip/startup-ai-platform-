import { LandingNav } from "@/components/landing/nav";
import { LandingHero } from "@/components/landing/hero-v2";
import { LandingBelief } from "@/components/landing/section-belief";
import { LandingProduct } from "@/components/landing/section-product";
import { LandingAgents } from "@/components/landing/section-agents";
import { LandingMetrics } from "@/components/landing/section-metrics";
import { LandingPricing } from "@/components/landing/section-pricing";
import { LandingFooter } from "@/components/landing/footer-v2";

export default function Home() {
  return (
    <div style={{ background: "#080808" }}>
      <div className="noise" aria-hidden="true" />
      <div className="aurora" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
      </div>
      <div className="relative z-10">
        <LandingNav />
        <LandingHero />
        <LandingBelief />
        <LandingProduct />
        <LandingAgents />
        <LandingMetrics />
        <LandingPricing />
        <LandingFooter />
      </div>
    </div>
  );
}
