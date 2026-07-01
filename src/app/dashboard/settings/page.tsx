"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getUser, setUser, signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("openai_key") ?? "";
  });

  const u = typeof window !== "undefined" ? getUser() : null;
  const [user, setLocalUser] = useState(() => ({
    name: u?.name ?? "",
    email: u?.email ?? "",
    startup: {
      name: u?.startup?.name ?? "",
      idea: u?.startup?.idea ?? "",
      industry: u?.startup?.industry ?? "",
      stage: u?.startup?.stage ?? "",
    },
  }));

  const save = () => {
    const u = getUser();
    if (u) {
      setUser({ ...u, name: user.name, startup: { ...u.startup!, name: user.startup.name, idea: user.startup.idea, industry: user.startup.industry, stage: user.startup.stage as "ideation" | "launched" } });
    }
    if (apiKey) localStorage.setItem("openai_key", apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSignOut = () => { signOut(); router.push("/"); };

  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 14px", fontSize: 14, borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface-2)", color: "var(--text)", outline: "none", fontFamily: "inherit" };

  return (
    <div style={{ padding: "28px 32px", maxWidth: 720, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text)" }}>Settings</h1>
        <p style={{ fontSize: 14, color: "var(--text-2)", marginTop: 4 }}>Manage your account and startup profile</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Profile */}
        <Section title="Profile" desc="Your name and email">
          <Field label="Full name">
            <input style={inputStyle} value={user.name} onChange={e => setLocalUser(u => ({ ...u, name: e.target.value }))} />
          </Field>
          <Field label="Email">
            <input style={{ ...inputStyle, opacity: 0.6 }} value={user.email} readOnly />
          </Field>
        </Section>

        {/* Startup */}
        <Section title="Startup Profile" desc="Used by your AI team for all analysis">
          <Field label="Startup name">
            <input style={inputStyle} value={user.startup.name} onChange={e => setLocalUser(u => ({ ...u, startup: { ...u.startup, name: e.target.value } }))} placeholder="e.g. FounderAI" />
          </Field>
          <Field label="Your idea / description">
            <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={user.startup.idea} onChange={e => setLocalUser(u => ({ ...u, startup: { ...u.startup, idea: e.target.value } }))} placeholder="Describe your startup in 1-2 sentences…" />
          </Field>
          <Field label="Industry">
            <select style={inputStyle} value={user.startup.industry} onChange={e => setLocalUser(u => ({ ...u, startup: { ...u.startup, industry: e.target.value } }))}>
              {["B2B SaaS", "Consumer App", "FinTech", "HealthTech", "EdTech", "E-commerce", "AI / ML", "Deep Tech", "CleanTech", "Other"].map(i => <option key={i}>{i}</option>)}
            </select>
          </Field>
          <Field label="Stage">
            <select style={inputStyle} value={user.startup.stage} onChange={e => setLocalUser(u => ({ ...u, startup: { ...u.startup, stage: e.target.value } }))}>
              <option value="ideation">Ideation — validating idea</option>
              <option value="launched">Launched — live product</option>
            </select>
          </Field>
        </Section>

        {/* AI */}
        <Section title="AI Configuration" desc="Connect OpenAI for live AI responses">
          <Field label="OpenAI API Key">
            <input style={inputStyle} type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="sk-..." />
          </Field>
          <p style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.6 }}>
            Without an API key, FounderAI runs in smart demo mode — all features work with pre-generated responses. Add your key at{" "}
            <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>platform.openai.com</a> for live AI.
          </p>
        </Section>

        {/* Save */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8 }}>
          <button onClick={handleSignOut} style={{ fontSize: 13, color: "var(--red)", background: "transparent", border: "1px solid var(--red)", borderRadius: 10, padding: "9px 18px", cursor: "pointer", fontWeight: 600 }}>
            Sign out
          </button>
          <motion.button onClick={save}
            whileTap={{ scale: 0.97 }}
            style={{ fontSize: 14, fontWeight: 700, background: saved ? "var(--green)" : "var(--accent)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 28px", cursor: "pointer", transition: "background 0.2s" }}>
            {saved ? "✓ Saved!" : "Save changes"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "22px 24px" }}>
      <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 3 }}>{title}</p>
      <p style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 20 }}>{desc}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-2)", marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}
