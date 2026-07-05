"use client";

import { useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { formatINR, FinancialProfile, useFinancialData } from "@/components/financial-data";

type Message = { id: number; role: "assistant" | "user"; text: string };

function parseAmount(query: string) {
  const match = query.replace(/,/g, "").match(/(?:₹|rs\.?\s*)?(\d+(?:\.\d+)?)\s*(crore|cr|lakh|lac|k|thousand)?/i);
  if (!match) return null;
  const multipliers: Record<string, number> = { crore: 10000000, cr: 10000000, lakh: 100000, lac: 100000, k: 1000, thousand: 1000 };
  return Number(match[1]) * (multipliers[match[2]?.toLowerCase()] || 1);
}

function answer(question: string, profile: FinancialProfile, history: Message[]) {
  const query = question.toLowerCase();
  const surplus = profile.monthlyIncome - profile.monthlyExpenses;
  const largestExpense = Object.entries(profile.expenses).sort((a,b)=>b[1]-a[1])[0];
  const labels: Record<string,string> = {housing:"housing",food:"food",transport:"transport",utilities:"utilities",lifestyle:"lifestyle",other:"other spending"};
  const amount = parseAmount(query);
  const previousQuestion = [...history].reverse().find(message => message.role === "user")?.text.toLowerCase() || "";
  const contextualQuery = /^(and |what about|how long|can i|is it|why|how )/.test(query) ? `${previousQuestion} ${query}` : query;

  if (/^(hi|hello|hey|yo|namaste|good (morning|afternoon|evening))\b/.test(query)) return `Hi! I’m Baniya. I can help you reason through purchases, savings goals, budgets, debt, and investments using the figures you entered. What are you planning?`;
  if (/thank|thanks|thx/.test(query)) return "You’re welcome. If you give me a target amount or a financial decision, I can work through it with your numbers.";
  if (/who are you|what can you do|help me/.test(query)) return "I’m Baniya, your financial planning assistant. Try questions like “Can I afford a ₹45 lakh car?”, “How long will my goal take?”, “Where am I spending most?”, or “Explain my portfolio.”";

  if (amount && /(buy|afford|purchase|cost|car|home|house|bike|property)/.test(contextualQuery)) {
    const liquidFunds = profile.savings + profile.investmentAllocation.cash;
    const shortfall = Math.max(0, amount - liquidFunds);
    const months = surplus > 0 ? Math.ceil(shortfall / surplus) : null;
    const downPayment = amount * 0.2;
    const loan = amount - downPayment;
    const monthlyRate = 0.09 / 12;
    const payments = 60;
    const emi = loan * monthlyRate * Math.pow(1 + monthlyRate, payments) / (Math.pow(1 + monthlyRate, payments) - 1);
    if (shortfall === 0) return `You could cover ${formatINR(amount)} from your declared liquid funds of ${formatINR(liquidFunds)}, but that may drain your safety buffer. Keeping at least 3–6 months of expenses (${formatINR(profile.monthlyExpenses * 3)}–${formatINR(profile.monthlyExpenses * 6)}) untouched would be safer.`;
    return `For a ${formatINR(amount)} purchase, your declared savings plus cash investments are ${formatINR(liquidFunds)}, leaving a ${formatINR(shortfall)} gap. At your current monthly surplus of ${formatINR(Math.max(0, surplus))}, saving the full gap would take ${months ? `about ${months} months` : "an ongoing surplus first"}. As a rough illustration, 20% down is ${formatINR(downPayment)}; financing the rest for 5 years at 9% would be about ${formatINR(emi)}/month—${emi > surplus ? "above" : "within"} your current surplus. Actual rates and affordability checks will differ.`;
  }

  if (query.includes("budget") || query.includes("spend") || query.includes("expense")) return `You declared ${formatINR(profile.monthlyExpenses)} in monthly expenses. Your largest category is ${labels[largestExpense[0]]} at ${formatINR(largestExpense[1])}. Your current monthly ${surplus >= 0 ? "surplus" : "deficit"} is ${formatINR(Math.abs(surplus))}.`;
  if (query.includes("debt") || query.includes("loan") || query.includes("liabil")) return `You entered ${formatINR(profile.liabilities)} in liabilities. That equals ${profile.monthlyIncome ? (profile.liabilities/profile.monthlyIncome).toFixed(1) : "0"} months of your declared income. Consider repayment terms and interest rates before choosing a payoff order.`;
  if (query.includes("invest") || query.includes("portfolio")) return `Your declared portfolio totals ${formatINR(profile.investments)}: ${formatINR(profile.investmentAllocation.equity)} equity, ${formatINR(profile.investmentAllocation.fixedIncome)} fixed income, ${formatINR(profile.investmentAllocation.cash)} cash and deposits, and ${formatINR(profile.investmentAllocation.other)} other assets.`;
  if (query.includes("income") || query.includes("earn")) return `You declared monthly income of ${formatINR(profile.monthlyIncome)} and monthly expenses of ${formatINR(profile.monthlyExpenses)}, leaving ${formatINR(Math.abs(surplus))} as a ${surplus >= 0 ? "surplus" : "deficit"}.`;
  if (query.includes("net worth") || query.includes("worth")) return `Your estimated net worth from entered values is ${formatINR(profile.savings + profile.investments - profile.liabilities)}: savings plus investments, minus liabilities.`;
  if (query.includes("goal") || query.includes("save") || contextualQuery.includes("how long")) {
    if (!profile.goalAmount) return `You have declared ${formatINR(profile.savings)} in savings, but no goal amount yet. Add one in Settings and I can calculate progress.`;
    const remaining = Math.max(0, profile.goalAmount - profile.savings);
    const months = surplus > 0 ? Math.ceil(remaining / surplus) : null;
    const validGoalName = profile.goalName && Number.isNaN(Number(profile.goalName)) ? profile.goalName : "your target";
    return `For ${validGoalName} at ${formatINR(profile.goalAmount)}, your declared savings of ${formatINR(profile.savings)} cover ${Math.min(100,(profile.savings/profile.goalAmount)*100).toFixed(0)}%. ${remaining === 0 ? "You have reached the amount." : months ? `At your current ${formatINR(surplus)} monthly surplus, the remaining ${formatINR(remaining)} would take about ${months} months.` : "Your current cash flow does not show a surplus, so there is no reliable completion timeline yet."}`;
  }
  const definitions: Array<[RegExp,string]> = [
    [/emergency fund/, "An emergency fund is accessible money reserved for unexpected costs. A common planning range is 3–6 months of essential expenses."],
    [/\bemi\b/, "EMI means equated monthly instalment: the fixed monthly payment on a loan, combining principal and interest."],
    [/\bsip\b/, "A SIP is a systematic investment plan—investing a fixed amount into a mutual fund at regular intervals."],
    [/mutual fund/, "A mutual fund pools investors’ money into a managed portfolio. Returns and risk depend on the fund’s assets and costs."],
    [/credit score/, "A credit score summarizes credit repayment history and borrowing behavior. Lenders use it as one input when assessing applications."],
  ];
  const definition = definitions.find(([pattern]) => pattern.test(query));
  if (definition) return definition[1];
  return `Based on your entries, income is ${formatINR(profile.monthlyIncome)}, expenses are ${formatINR(profile.monthlyExpenses)}, and estimated net worth is ${formatINR(profile.savings + profile.investments - profile.liabilities)}. Ask me about spending, debt, investments, savings, or your goal.`;
}

export default function BaniyaPage() {
  const { profile } = useFinancialData();
  const [input,setInput]=useState("");
  const [messages,setMessages]=useState<Message[]>([{id:1,role:"assistant",text:"I’m ready. Ask me anything about the financial information you entered."}]);
  if(!profile)return null;
  const send=(text:string)=>{const clean=text.trim();if(!clean)return;setMessages(current=>[...current,{id:Date.now(),role:"user",text:clean},{id:Date.now()+1,role:"assistant",text:answer(clean,profile,current)}]);setInput("")};
  const presets=["Review my spending","How is my debt?","Explain my portfolio","Am I on track for my goal?"];
  return <div className="h-[calc(100dvh-5rem)] flex flex-col overflow-hidden relative">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(61,79,224,.1),transparent_38%)] pointer-events-none" />
    <div className="relative app-container py-5 border-b border-white/[0.05] flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-[#3D4FE0] shadow-lg shadow-[#3D4FE0]/25 flex items-center justify-center"><Sparkles className="w-5 h-5 text-white"/></div><div><h1 className="text-sm font-bold text-white">Baniya</h1><p className="text-[10px] text-emerald-400">Ready · grounded in your entries</p></div></div>
    <div className="relative flex-1 overflow-y-auto"><div className="app-container max-w-4xl py-7 flex flex-col gap-6">{messages.map(message=><div key={message.id} className={`flex gap-3 ${message.role==="user"?"flex-row-reverse ml-auto":"mr-auto"} max-w-[88%]`}><div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center ${message.role==="user"?"bg-white/10":"bg-[#3D4FE0]/15 text-[#6475ff]"}`}>{message.role==="user"?<User className="w-4 h-4"/>:<Bot className="w-4 h-4"/>}</div><div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-xl ${message.role==="user"?"bg-[#3D4FE0] text-white rounded-tr-sm":"bg-[#121826]/85 border border-white/[0.06] text-[#CBD5E1] rounded-tl-sm"}`}>{message.text}</div></div>)}</div></div>
    <div className="relative border-t border-white/[0.05] bg-[#0B1020]/75 backdrop-blur-xl"><div className="app-container max-w-4xl py-4"><div className="flex gap-2 overflow-x-auto pb-3">{presets.map(preset=><button key={preset} onClick={()=>send(preset)} className="flex-shrink-0 px-3 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.02] text-[10px] text-[#CBD5E1] hover:border-[#3D4FE0]">{preset}</button>)}</div><form onSubmit={event=>{event.preventDefault();send(input)}} className="flex gap-3"><input value={input} onChange={event=>setInput(event.target.value)} placeholder="Ask Baniya about your finances…" className="flex-1 min-w-0 h-12 px-4 rounded-xl border border-white/[0.07] bg-[#050816] text-sm text-white focus:outline-none focus:border-[#3D4FE0]"/><button className="h-12 px-4 sm:px-6 rounded-xl bg-[#3D4FE0] text-xs font-bold text-white inline-flex items-center gap-2">Send <Send className="w-4 h-4"/></button></form><p className="text-[9px] text-[#64748B] text-center mt-2">Responses use only your declared data and are not financial advice.</p></div></div>
  </div>;
}
