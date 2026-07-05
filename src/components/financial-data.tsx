"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type FinancialProfile = {
  monthlyIncome: number;
  monthlyExpenses: number;
  savings: number;
  investments: number;
  liabilities: number;
  goalName: string;
  goalAmount: number;
};

type FinancialDataContextValue = {
  profile: FinancialProfile | null;
  ready: boolean;
  saveProfile: (profile: FinancialProfile) => void;
  clearProfile: () => void;
};

const STORAGE_KEY = "rupeewise-financial-profile";
const FinancialDataContext = createContext<FinancialDataContextValue | null>(null);

export function FinancialDataProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<FinancialProfile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setProfile(JSON.parse(stored) as FinancialProfile);
        } catch {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const value = useMemo<FinancialDataContextValue>(() => ({
    profile,
    ready,
    saveProfile(nextProfile) {
      setProfile(nextProfile);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProfile));
    },
    clearProfile() {
      setProfile(null);
      window.localStorage.removeItem(STORAGE_KEY);
    },
  }), [profile, ready]);

  return <FinancialDataContext.Provider value={value}>{children}</FinancialDataContext.Provider>;
}

export function useFinancialData() {
  const context = useContext(FinancialDataContext);
  if (!context) throw new Error("useFinancialData must be used inside FinancialDataProvider");
  return context;
}

export function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
