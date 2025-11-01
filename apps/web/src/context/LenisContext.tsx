"use client";

import { createContext, useContext, type ReactNode } from "react";
import type Lenis from "lenis";

type LenisContextType = Lenis | null;

const LenisContext = createContext<LenisContextType>(null);

export const useLenis = () => {
  const context = useContext(LenisContext);
  if (!context) {
    console.warn("useLenis must be used within a LenisProvider");
  }
  return context;
};

export const LenisProvider = ({ value, children }: { value: Lenis | null, children: ReactNode }) => {
  return (
    <LenisContext.Provider value={value}>
      {children}
    </LenisContext.Provider>
  );
};