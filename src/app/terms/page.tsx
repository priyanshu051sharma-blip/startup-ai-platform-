"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100svh', background: 'var(--bg)', color: 'var(--text)', padding: 48 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', background: 'var(--surface)', padding: 36, borderRadius: 12, border: '1px solid var(--border)' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Terms & Conditions</h1>
        <p style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>These are placeholder terms and conditions for FounderAI. Replace with your legal text before publishing.</p>
        <h2 style={{ marginTop: 20, fontSize: 18, fontWeight: 700 }}>Usage</h2>
        <p style={{ color: 'var(--text-2)' }}>By using the service you agree to the terms. This page should include your data handling, account rules, and liability clauses.</p>
        <div style={{ marginTop: 28 }}>
          <Link href="/" style={{ color: 'var(--accent)', fontWeight: 700 }}>Back to home</Link>
        </div>
      </div>
    </div>
  );
}
