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
  // persist active session
  localStorage.setItem("founderai_user", JSON.stringify(user));

  // keep registered users list in sync
  try {
    const raw = localStorage.getItem("founderai_registered_users");
    const list: User[] = raw ? JSON.parse(raw) : [];
    const idx = list.findIndex((u) => u.email === user.email);
    if (idx !== -1) {
      list[idx] = user;
    } else {
      list.push(user);
    }
    localStorage.setItem("founderai_registered_users", JSON.stringify(list));
  } catch (e) {
    // ignore storage errors
  }
}

export function findRegisteredUser(email: string): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("founderai_registered_users");
    if (!raw) return null;
    const list: User[] = JSON.parse(raw);
    return list.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  } catch (e) {
    return null;
  }
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
  // register and set as active
  setUser(user);
  return user;
}
