"use client";

import Link from "next/link";

export function LandingFooter() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#6366f1" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1L13 7L7 13M1 7H13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-white font-semibold text-[15px] tracking-tight">FounderAI</span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#525252", maxWidth: 240 }}>
              The AI operating system for startups. Validate, build, fund, and scale.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="input text-sm flex-1"
                style={{ maxWidth: 200, padding: "8px 12px", borderRadius: 8 }}
              />
              <button className="btn btn-primary text-xs" style={{ padding: "8px 14px", borderRadius: 8, flexShrink: 0 }}>
                Subscribe
              </button>
            </div>
          </div>

          {/* Links */}
          {[
            { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
            { title: "Resources", links: ["Docs", "Blog", "Guides", "API"] },
            { title: "Company", links: ["About", "Careers", "Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold text-white mb-4 uppercase tracking-wider">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-sm transition-colors hover:text-white" style={{ color: "#525252" }}>
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-xs" style={{ color: "#525252" }}>© 2025 FounderAI. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {["Twitter", "GitHub", "LinkedIn", "Discord"].map((s) => (
              <Link key={s} href="#" className="text-xs transition-colors hover:text-white" style={{ color: "#525252" }}>
                {s}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
