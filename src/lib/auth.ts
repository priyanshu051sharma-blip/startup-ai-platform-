// Simple client-side auth using localStorage
// In production this would be NextAuth + database

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  onboarded: boolean;
  startup?: {
    name: string;
    idea: string;
    stage: "ideation" | "launched";
    industry: string;
  };
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("founderai_user");
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function setUser(user: User): void {
  localStorage.setItem("founderai_user", JSON.stringify(user));
}

export function signOut(): void {
  localStorage.removeItem("founderai_user");
}

export function isLoggedIn(): boolean {
  return getUser() !== null;
}

export function createUser(name: string, email: string): User {
  const user: User = {
    id: crypto.randomUUID(),
    name,
    email,
    createdAt: new Date().toISOString(),
    onboarded: false,
  };
  setUser(user);
  return user;
}
