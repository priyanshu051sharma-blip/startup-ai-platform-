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
    <div style={{ background: "var(--bg)" }}>
      <div className="noise" aria-hidden="true" />
      <LandingNav />
      <main>
        <LandingHero />
        <LandingBelief />
        <LandingProduct />
        <LandingAgents />
        <LandingMetrics />
        <LandingPricing />
      </main>
      <LandingFooter />
    </div>
  );
}
