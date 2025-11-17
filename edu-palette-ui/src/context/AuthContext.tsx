import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Role = "student" | "instructor" | "admin";
type User = { role: Role; id?: number; name?: string; email?: string } | null;

type AuthContextType = {
  user: User;
  login: (u: NonNullable<User>) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(() => {
    const raw = localStorage.getItem("auth:user");
    console.log("Auth init localStorage auth:user:", raw);
    return raw ? JSON.parse(raw) : null;
  });
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "auth:user") {
        try {
          console.log("Auth storage event newValue:", e.newValue);
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setUser(null);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  const login = (u: NonNullable<User>) => {
    setUser(u);
    localStorage.setItem("auth:user", JSON.stringify(u));
    console.log("Auth login set user:", u);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth:user");
    console.log("Auth logout clear user");
  };
  useEffect(() => {
    console.log("Auth user changed:", user);
  }, [user]);
  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};