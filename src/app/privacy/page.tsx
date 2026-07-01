"use client";

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100svh', background: 'var(--bg)', color: 'var(--text)', padding: 48 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', background: 'var(--surface)', padding: 36, borderRadius: 12, border: '1px solid var(--border)' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>This is a placeholder Privacy Policy. Replace with actual policy before publishing.</p>
        <h2 style={{ marginTop: 20, fontSize: 18, fontWeight: 700 }}>Data</h2>
        <p style={{ color: 'var(--text-2)' }}>Explain how user data is collected, used, and stored.</p>
        <div style={{ marginTop: 28 }}>
          <Link href="/" style={{ color: 'var(--accent)', fontWeight: 700 }}>Back to home</Link>
        </div>
      </div>
    </div>
  );
}
