"use client";

import Link from "next/link";

export function LandingFooter() {
  return (
    <footer style={{ background: "var(--bg)", padding: "64px 24px 40px", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40, flexWrap: "wrap", marginBottom: 56 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px rgba(99,102,241,0.35)" }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5H11M7 2L11 6.5L7 11" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em" }}>FounderAI</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--text-3)", maxWidth: 220 }}>
              The AI operating system for startups.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
              <Link href="/auth/signup" className="btn btn-primary" style={{ fontSize: 13, padding: "8px 18px" }}>Start free →</Link>
            </div>
          </div>

          <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
            {[
              { title: "Product",   links: ["Features", "Pricing", "Changelog"] },
              { title: "Resources", links: ["Docs", "Blog", "Guides"] },
              { title: "Company",   links: ["About", "Privacy", "Terms"] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-3)", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.08em" }}>{col.title}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map(l => (
                    <li key={l}>
                      <Link href="#" className="footer-link" style={{ fontSize: 14 }}>{l}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", paddingTop: 24, borderTop: "1px solid var(--border)" }}>
          <p style={{ fontSize: 13, color: "var(--text-3)" }}>© 2025 FounderAI. All rights reserved.</p>
          <div style={{ display: "flex", gap: 20 }}>
            {['Twitter', 'GitHub', 'LinkedIn'].map(s => (
              <Link key={s} href="#" className="footer-link" style={{ fontSize: 13 }}>{s}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
