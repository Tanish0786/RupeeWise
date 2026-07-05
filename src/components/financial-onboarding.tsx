"use client";

import { useState } from "react";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { FinancialProfile, useFinancialData } from "./financial-data";

const fields: Array<{ key: keyof FinancialProfile; label: string; hint: string; optional?: boolean }> = [
  { key: "monthlyIncome", label: "Monthly income", hint: "Salary, business income, and other regular inflows" },
  { key: "monthlyExpenses", label: "Monthly expenses", hint: "Your typical total monthly spending" },
  { key: "savings", label: "Current savings", hint: "Cash, bank deposits, and emergency funds" },
  { key: "investments", label: "Current investments", hint: "Funds, stocks, bonds, retirement accounts, and other assets" },
  { key: "liabilities", label: "Outstanding liabilities", hint: "Loans, credit cards, and other debt" },
  { key: "goalAmount", label: "Primary goal amount", hint: "The amount you want to build toward", optional: true },
];

export function FinancialOnboarding() {
  const { saveProfile } = useFinancialData();
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const required = fields.filter((field) => !field.optional);
    if (required.some((field) => values[field.key] === undefined || Number(values[field.key]) < 0)) {
      setError("Please enter a valid amount for every required field.");
      return;
    }

    saveProfile({
      monthlyIncome: Number(values.monthlyIncome || 0),
      monthlyExpenses: Number(values.monthlyExpenses || 0),
      savings: Number(values.savings || 0),
      investments: Number(values.investments || 0),
      liabilities: Number(values.liabilities || 0),
      goalName: values.goalName?.trim() || "",
      goalAmount: Number(values.goalAmount || 0),
    });
  };

  return (
    <div className="dashboard-page max-w-5xl">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#3D4FE0] mb-3">
          <Sparkles className="w-4 h-4" /> Your workspace starts here
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Build your financial baseline</h1>
        <p className="text-sm text-[#94A3B8] mt-3 leading-relaxed">
          Add your own figures to unlock dashboards and personalized insights. RupeeWise never pre-fills financial examples.
        </p>
      </div>

      <form onSubmit={submit} className="rounded-2xl border border-white/[0.06] bg-[#121826]/65 p-5 sm:p-7 flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {fields.map((field) => (
            <label key={field.key} className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-[#CBD5E1]">
                {field.label}{field.optional ? " (optional)" : ""}
              </span>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">₹</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={values[field.key] || ""}
                  onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))}
                  className="w-full h-12 pl-9 pr-4 rounded-xl border border-white/[0.06] bg-[#050816] text-sm text-white focus:outline-none focus:border-[#3D4FE0]"
                />
              </div>
              <span className="text-[11px] text-[#64748B]">{field.hint}</span>
            </label>
          ))}
          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className="text-xs font-semibold text-[#CBD5E1]">Primary financial goal (optional)</span>
            <input
              type="text"
              value={values.goalName || ""}
              onChange={(event) => setValues((current) => ({ ...current, goalName: event.target.value }))}
              placeholder="e.g. Emergency fund, home deposit, education"
              className="w-full h-12 px-4 rounded-xl border border-white/[0.06] bg-[#050816] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#3D4FE0]"
            />
          </label>
        </div>
        {error && <p className="text-xs text-rose-400">{error}</p>}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <p className="flex items-center gap-2 text-[11px] text-[#64748B]">
            <ShieldCheck className="w-4 h-4" /> Stored only in this browser for this prototype.
          </p>
          <button className="h-11 px-5 rounded-xl bg-[#3D4FE0] text-xs font-bold text-white inline-flex items-center justify-center gap-2">
            Create my workspace <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
