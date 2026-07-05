"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { formatINR, useFinancialData } from "@/components/financial-data";
import { Breakdown, CashFlowChart, HealthGauge, SparklineMetric } from "@/components/financial-visuals";

export default function DashboardPage() {
  const { profile } = useFinancialData();
  if (!profile) return null;
  const monthlySurplus = profile.monthlyIncome - profile.monthlyExpenses;
  const netWorth = profile.savings + profile.investments - profile.liabilities;
  const project=(start:number,change:number)=>Array.from({length:7},(_,index)=>start+change*index);
  const expenseItems=Object.entries(profile.expenses).map(([key,value])=>({label:({housing:"Housing",food:"Food",transport:"Transport",utilities:"Utilities",lifestyle:"Lifestyle",other:"Other"} as Record<string,string>)[key],value}));
  const expenseFlow=expenseItems.reduce<number[]>((values,item)=>[...values,(values.at(-1)||0)+item.value],[0]);

  return (
    <div className="dashboard-page">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-white">Your financial overview</h1><p className="text-xs text-[#94A3B8] mt-2">Calculated only from the information you provided.</p></div>
        <Link href="/dashboard/settings" className="text-xs font-semibold text-[#3D4FE0] inline-flex items-center gap-1">Update financial profile <ArrowUpRight className="w-4 h-4" /></Link>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-[#3D4FE0]/35 bg-[#3D4FE0]/[0.06] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div className="absolute right-0 top-0 w-64 h-40 bg-[#3D4FE0]/10 blur-[60px] rounded-full"/><div className="relative flex items-center gap-4"><div className="w-11 h-11 rounded-xl bg-[#3D4FE0]/20 text-[#6475ff] flex items-center justify-center"><Sparkles className="w-5 h-5"/></div><div><h2 className="text-sm font-bold text-white">Your declared finances, visualized</h2><p className="text-xs text-[#94A3B8] mt-1">Projection lines use your current monthly surplus—not invented market history.</p></div></div><Link href="/dashboard/baniya" className="relative text-xs font-bold text-white bg-[#3D4FE0] px-4 py-2 rounded-xl">Ask Baniya</Link></div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6"><div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5"><SparklineMetric label="Estimated net worth" value={formatINR(netWorth)} note="6-month projection" values={project(netWorth,monthlySurplus)} /><SparklineMetric label="Monthly income" value={formatINR(profile.monthlyIncome)} note="Declared flow" values={project(0,profile.monthlyIncome/6)} color="#16D9A6"/><SparklineMetric label="Expenses tracked" value={formatINR(profile.monthlyExpenses)} note="Category flow" values={expenseFlow} color="#5367FF"/><SparklineMetric label="Smart savings" value={formatINR(profile.savings)} note={monthlySurplus>=0?"Projected growth":"Deficit impact"} values={project(profile.savings,monthlySurplus)} color="#16D9A6"/></div><div className="rounded-2xl border border-white/[0.06] bg-[#101625] p-6"><div className="flex justify-between items-start gap-3 mb-6"><div><h2 className="text-sm font-bold text-white">Budget allocation</h2><p className="text-[10px] text-[#94A3B8] mt-1">Declared monthly limits</p></div><span className="text-xs font-bold text-white">{formatINR(profile.monthlyExpenses)}</span></div><Breakdown items={expenseItems}/></div></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><div className="lg:col-span-2"><CashFlowChart income={profile.monthlyIncome} expenses={profile.monthlyExpenses}/></div><HealthGauge income={profile.monthlyIncome} expenses={profile.monthlyExpenses} liabilities={profile.liabilities}/></div>
      <div className="rounded-2xl border border-white/[0.05] bg-[#121826]/45 p-6 sm:p-8 text-center"><h2 className="text-sm font-bold text-white">Everything here comes from your entries</h2><p className="text-xs text-[#94A3B8] mt-2">Update your declared figures at any time and every chart, report, and insight will recalculate automatically.</p><Link href="/dashboard/settings" className="inline-flex mt-5 h-10 px-4 items-center rounded-xl bg-[#3D4FE0] text-xs font-bold text-white">Review my data</Link></div>
    </div>
  );
}
