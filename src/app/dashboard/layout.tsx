"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopBar } from "@/components/dashboard/top-bar";
import { getUser } from "@/lib/auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    if (!user) { router.push("/auth/signup"); return; }
    if (!user.onboarded) { router.push("/onboarding"); }
  }, [router]);

  return (
    <div data-theme="dark" style={{ display: "flex", height: "100svh", overflow: "hidden", background: "var(--bg)" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <TopBar />
        <main className="scrollbar-none" style={{ flex: 1, overflowY: "auto", background: "var(--bg)" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
