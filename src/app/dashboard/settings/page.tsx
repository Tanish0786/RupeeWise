"use client";

import { useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { FinancialProfile, useFinancialData } from "@/components/financial-data";

const numericFields: Array<{key: keyof FinancialProfile; label: string}> = [
  {key:"monthlyIncome",label:"Monthly income"},{key:"monthlyExpenses",label:"Monthly expenses"},{key:"savings",label:"Current savings"},{key:"investments",label:"Current investments"},{key:"liabilities",label:"Outstanding liabilities"},{key:"goalAmount",label:"Goal amount"}
];

export default function SettingsPage(){
  const {profile,saveProfile,clearProfile}=useFinancialData();
  const [draft,setDraft]=useState<FinancialProfile>(()=>profile || {monthlyIncome:0,monthlyExpenses:0,savings:0,investments:0,liabilities:0,goalName:"",goalAmount:0});
  if(!profile)return null;
  return <div className="dashboard-page max-w-5xl">
    <div><h1 className="text-2xl font-bold text-white">Financial profile</h1><p className="text-xs text-[#94A3B8] mt-2">Keep the baseline used throughout your workspace accurate.</p></div>
    <form onSubmit={(event)=>{event.preventDefault();saveProfile(draft)}} className="p-5 sm:p-7 rounded-2xl border border-white/[0.05] bg-[#121826]/65 flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{numericFields.map(field=><label key={field.key} className="flex flex-col gap-2"><span className="text-xs font-semibold text-[#CBD5E1]">{field.label}</span><div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">₹</span><input type="number" min="0" value={String(draft[field.key])} onChange={event=>setDraft(current=>({...current,[field.key]:Number(event.target.value)}))} className="w-full h-11 pl-9 pr-4 rounded-xl border border-white/[0.06] bg-[#050816] text-sm text-white focus:outline-none focus:border-[#3D4FE0]" /></div></label>)}</div>
      <label className="flex flex-col gap-2"><span className="text-xs font-semibold text-[#CBD5E1]">Primary goal</span><input value={draft.goalName} onChange={event=>setDraft(current=>({...current,goalName:event.target.value}))} className="w-full h-11 px-4 rounded-xl border border-white/[0.06] bg-[#050816] text-sm text-white focus:outline-none focus:border-[#3D4FE0]" /></label>
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-2"><button type="button" onClick={clearProfile} className="h-11 px-4 rounded-xl border border-rose-500/20 text-xs font-semibold text-rose-400 inline-flex items-center justify-center gap-2"><Trash2 className="w-4 h-4" /> Clear all financial data</button><button className="h-11 px-5 rounded-xl bg-[#3D4FE0] text-xs font-bold text-white inline-flex items-center justify-center gap-2"><Save className="w-4 h-4" /> Save profile</button></div>
    </form>
  </div>;
}
