"use client";

import { useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { formatINR, FinancialProfile, useFinancialData } from "@/components/financial-data";

type Message = { id: number; role: "assistant" | "user"; text: string };

function answer(question: string, profile: FinancialProfile) {
  const query = question.toLowerCase();
  const surplus = profile.monthlyIncome - profile.monthlyExpenses;
  const largestExpense = Object.entries(profile.expenses).sort((a,b)=>b[1]-a[1])[0];
  const labels: Record<string,string> = {housing:"housing",food:"food",transport:"transport",utilities:"utilities",lifestyle:"lifestyle",other:"other spending"};
  if (query.includes("budget") || query.includes("spend") || query.includes("expense")) return `You declared ${formatINR(profile.monthlyExpenses)} in monthly expenses. Your largest category is ${labels[largestExpense[0]]} at ${formatINR(largestExpense[1])}. Your current monthly ${surplus >= 0 ? "surplus" : "deficit"} is ${formatINR(Math.abs(surplus))}.`;
  if (query.includes("debt") || query.includes("loan") || query.includes("liabil")) return `You entered ${formatINR(profile.liabilities)} in liabilities. That equals ${profile.monthlyIncome ? (profile.liabilities/profile.monthlyIncome).toFixed(1) : "0"} months of your declared income. Consider repayment terms and interest rates before choosing a payoff order.`;
  if (query.includes("invest") || query.includes("portfolio")) return `Your declared portfolio totals ${formatINR(profile.investments)}: ${formatINR(profile.investmentAllocation.equity)} equity, ${formatINR(profile.investmentAllocation.fixedIncome)} fixed income, ${formatINR(profile.investmentAllocation.cash)} cash and deposits, and ${formatINR(profile.investmentAllocation.other)} other assets.`;
  if (query.includes("goal") || query.includes("save")) return profile.goalAmount ? `Your goal is ${profile.goalName || "your selected target"} at ${formatINR(profile.goalAmount)}. Your declared savings of ${formatINR(profile.savings)} represent ${Math.min(100,(profile.savings/profile.goalAmount)*100).toFixed(0)}% of that target.` : `You have declared ${formatINR(profile.savings)} in savings, but no goal amount yet. Add one in Settings and I can calculate progress.`;
  return `Based on your entries, income is ${formatINR(profile.monthlyIncome)}, expenses are ${formatINR(profile.monthlyExpenses)}, and estimated net worth is ${formatINR(profile.savings + profile.investments - profile.liabilities)}. Ask me about spending, debt, investments, savings, or your goal.`;
}

export default function BaniyaPage() {
  const { profile } = useFinancialData();
  const [input,setInput]=useState("");
  const [messages,setMessages]=useState<Message[]>([{id:1,role:"assistant",text:"I’m ready. Ask me anything about the financial information you entered."}]);
  if(!profile)return null;
  const send=(text:string)=>{const clean=text.trim();if(!clean)return;setMessages(current=>[...current,{id:Date.now(),role:"user",text:clean},{id:Date.now()+1,role:"assistant",text:answer(clean,profile)}]);setInput("")};
  const presets=["Review my spending","How is my debt?","Explain my portfolio","Am I on track for my goal?"];
  return <div className="h-[calc(100dvh-5rem)] flex flex-col overflow-hidden relative">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(61,79,224,.1),transparent_38%)] pointer-events-none" />
    <div className="relative app-container py-5 border-b border-white/[0.05] flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-[#3D4FE0] shadow-lg shadow-[#3D4FE0]/25 flex items-center justify-center"><Sparkles className="w-5 h-5 text-white"/></div><div><h1 className="text-sm font-bold text-white">Baniya</h1><p className="text-[10px] text-emerald-400">Ready · grounded in your entries</p></div></div>
    <div className="relative flex-1 overflow-y-auto"><div className="app-container max-w-4xl py-7 flex flex-col gap-6">{messages.map(message=><div key={message.id} className={`flex gap-3 ${message.role==="user"?"flex-row-reverse ml-auto":"mr-auto"} max-w-[88%]`}><div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center ${message.role==="user"?"bg-white/10":"bg-[#3D4FE0]/15 text-[#6475ff]"}`}>{message.role==="user"?<User className="w-4 h-4"/>:<Bot className="w-4 h-4"/>}</div><div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-xl ${message.role==="user"?"bg-[#3D4FE0] text-white rounded-tr-sm":"bg-[#121826]/85 border border-white/[0.06] text-[#CBD5E1] rounded-tl-sm"}`}>{message.text}</div></div>)}</div></div>
    <div className="relative border-t border-white/[0.05] bg-[#0B1020]/75 backdrop-blur-xl"><div className="app-container max-w-4xl py-4"><div className="flex gap-2 overflow-x-auto pb-3">{presets.map(preset=><button key={preset} onClick={()=>send(preset)} className="flex-shrink-0 px-3 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.02] text-[10px] text-[#CBD5E1] hover:border-[#3D4FE0]">{preset}</button>)}</div><form onSubmit={event=>{event.preventDefault();send(input)}} className="flex gap-3"><input value={input} onChange={event=>setInput(event.target.value)} placeholder="Ask Baniya about your finances…" className="flex-1 min-w-0 h-12 px-4 rounded-xl border border-white/[0.07] bg-[#050816] text-sm text-white focus:outline-none focus:border-[#3D4FE0]"/><button className="h-12 px-4 sm:px-6 rounded-xl bg-[#3D4FE0] text-xs font-bold text-white inline-flex items-center gap-2">Send <Send className="w-4 h-4"/></button></form><p className="text-[9px] text-[#64748B] text-center mt-2">Responses use only your declared data and are not financial advice.</p></div></div>
  </div>;
}
