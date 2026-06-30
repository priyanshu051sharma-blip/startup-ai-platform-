import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://founderai.app"),
  title: { default: "FounderAI — AI Startup Operating System", template: "%s | FounderAI" },
  description: "The AI operating system for startups. Validate, build, fund, and scale with a full AI executive team.",
  openGraph: {
    title: "FounderAI",
    description: "Your AI Co-Founder, CFO, Investor & Strategist. All in one.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
