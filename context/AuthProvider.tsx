"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthProvider {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const AuthContext = createContext<AuthProvider | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check the initial value from localStorage
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "false";
    setIsLoggedIn(storedIsLoggedIn);
  }, []);

  const toggleLogin = () => {
    const newIsLoggedIn = !isLoggedIn;
    setIsLoggedIn(newIsLoggedIn);
    localStorage.setItem("isLoggedIn", newIsLoggedIn.toString());
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}
