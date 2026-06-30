import Link from "next/link";

export function LandingFooter() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "64px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40, flexWrap: "wrap", marginBottom: 64 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div
                style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: "#6366f1",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6H10M6.5 2L10 6L6.5 10" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#f5f5f5", letterSpacing: "-0.02em" }}>FounderAI</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: "#444", maxWidth: 220 }}>
              The AI operating system for startups.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
            {[
              { title: "Product",   links: ["Features", "Pricing", "Changelog"] },
              { title: "Resources", links: ["Docs", "Blog", "Guides"] },
              { title: "Company",   links: ["About", "Privacy", "Terms"] },
            ].map((col) => (
              <div key={col.title}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#f5f5f5", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {col.title}
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        href="#"
                        style={{ fontSize: 14, color: "#444", textDecoration: "none", transition: "color 0.15s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f5f5")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <p style={{ fontSize: 13, color: "#2a2a2a" }}>© 2025 FounderAI. All rights reserved.</p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Twitter", "GitHub", "LinkedIn"].map((s) => (
              <Link
                key={s}
                href="#"
                style={{ fontSize: 13, color: "#2a2a2a", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#888")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#2a2a2a")}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
