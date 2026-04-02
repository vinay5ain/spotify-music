import { createContext, useContext, useEffect, useMemo, useState } from "react";

const USERS_KEY = "spotify_clone_users";
const SESSION_KEY = "spotify_clone_session";

const AuthContext = createContext(null);

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (s && typeof s.email === "string" && typeof s.name === "string") return s;
    return null;
  } catch {
    return null;
  }
}

function writeSession(user) {
  if (!user) localStorage.removeItem(SESSION_KEY);
  else localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(readSession());
    setReady(true);
  }, []);

  const signup = useMemo(
    () => (name, email, password) => {
      const trimmedName = name?.trim();
      const trimmedEmail = email?.trim().toLowerCase();
      if (!trimmedName || !trimmedEmail || !password) {
        return { ok: false, message: "Please fill in all fields." };
      }
      if (password.length < 6) {
        return { ok: false, message: "Password must be at least 6 characters." };
      }
      const users = readUsers();
      if (users.some((u) => u.email === trimmedEmail)) {
        return { ok: false, message: "An account with this email already exists." };
      }
      users.push({ name: trimmedName, email: trimmedEmail, password });
      writeUsers(users);
      const session = { name: trimmedName, email: trimmedEmail };
      writeSession(session);
      setUser(session);
      return { ok: true };
    },
    []
  );

  const login = useMemo(
    () => (email, password) => {
      const trimmedEmail = email?.trim().toLowerCase();
      if (!trimmedEmail || !password) {
        return { ok: false, message: "Email and password are required." };
      }
      const users = readUsers();
      const found = users.find((u) => u.email === trimmedEmail);
      if (!found || found.password !== password) {
        return { ok: false, message: "Invalid email or password." };
      }
      const session = { name: found.name, email: found.email };
      writeSession(session);
      setUser(session);
      return { ok: true };
    },
    []
  );

  const logout = useMemo(
    () => () => {
      writeSession(null);
      setUser(null);
    },
    []
  );

  const value = useMemo(
    () => ({ user, ready, signup, login, logout }),
    [user, ready, signup, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
