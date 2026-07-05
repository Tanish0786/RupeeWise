"use client";

import { ArrowUpRight, Landmark, PiggyBank, Receipt, WalletCards } from "lucide-react";
import Link from "next/link";
import { formatINR, useFinancialData } from "@/components/financial-data";
import { CashFlowChart, HealthGauge } from "@/components/financial-visuals";

export default function DashboardPage() {
  const { profile } = useFinancialData();
  if (!profile) return null;
  const monthlySurplus = profile.monthlyIncome - profile.monthlyExpenses;
  const netWorth = profile.savings + profile.investments - profile.liabilities;
  const metrics = [
    { label: "Monthly income", value: profile.monthlyIncome, icon: Landmark },
    { label: "Monthly expenses", value: profile.monthlyExpenses, icon: Receipt },
    { label: "Monthly surplus", value: monthlySurplus, icon: PiggyBank },
    { label: "Estimated net worth", value: netWorth, icon: WalletCards },
  ];

  return (
    <div className="dashboard-page">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-white">Your financial overview</h1><p className="text-xs text-[#94A3B8] mt-2">Calculated only from the information you provided.</p></div>
        <Link href="/dashboard/settings" className="text-xs font-semibold text-[#3D4FE0] inline-flex items-center gap-1">Update financial profile <ArrowUpRight className="w-4 h-4" /></Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {metrics.map(({ label, value, icon: Icon }) => <div key={label} className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65"><Icon className="w-5 h-5 text-[#3D4FE0]" /><p className="text-xs text-[#94A3B8] mt-5">{label}</p><p className="text-xl font-bold text-white mt-1">{formatINR(value)}</p></div>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><div className="lg:col-span-2"><CashFlowChart income={profile.monthlyIncome} expenses={profile.monthlyExpenses}/></div><HealthGauge income={profile.monthlyIncome} expenses={profile.monthlyExpenses} liabilities={profile.liabilities}/></div>
      <div className="rounded-2xl border border-white/[0.05] bg-[#121826]/45 p-6 sm:p-8 text-center"><h2 className="text-sm font-bold text-white">Everything here comes from your entries</h2><p className="text-xs text-[#94A3B8] mt-2">Update your declared figures at any time and every chart, report, and insight will recalculate automatically.</p><Link href="/dashboard/settings" className="inline-flex mt-5 h-10 px-4 items-center rounded-xl bg-[#3D4FE0] text-xs font-bold text-white">Review my data</Link></div>
    </div>
  );
}
