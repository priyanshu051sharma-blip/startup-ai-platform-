import { Sidebar } from "@/components/dashboard/sidebar";
import { TopBar } from "@/components/dashboard/top-bar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", height: "100svh", overflow: "hidden", background: "var(--black)" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <TopBar />
        <main
          className="scrollbar-none"
          style={{ flex: 1, overflowY: "auto", background: "var(--black)" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
