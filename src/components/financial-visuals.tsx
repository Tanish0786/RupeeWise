import { formatINR } from "./financial-data";

export const chartColors = ["#3D4FE0", "#22C55E", "#F59E0B", "#06B6D4", "#F43F5E", "#8B5CF6"];

export function Breakdown({ items }: { items: Array<{ label: string; value: number }> }) {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  if (!total) return <p className="text-xs text-[#94A3B8]">No amounts entered for this breakdown.</p>;
  return <div className="flex flex-col gap-4">{items.filter(item=>item.value>0).map((item,index)=>{const percentage=(item.value/total)*100;return <div key={item.label}><div className="flex justify-between gap-4 text-xs mb-2"><span className="text-[#CBD5E1]">{item.label}</span><span className="text-[#94A3B8]">{formatINR(item.value)} · {percentage.toFixed(0)}%</span></div><div className="h-2 rounded-full bg-white/5 overflow-hidden"><div className="h-full rounded-full" style={{width:`${percentage}%`,backgroundColor:chartColors[index%chartColors.length]}} /></div></div>})}</div>;
}

export function Donut({ items, centerLabel }: { items: Array<{ label: string; value: number }>; centerLabel: string }) {
  const total=items.reduce((sum,item)=>sum+item.value,0); let cursor=0;
  const stops=items.filter(item=>item.value>0).map((item,index)=>{const start=cursor;cursor+=(item.value/total)*100;return `${chartColors[index%chartColors.length]} ${start}% ${cursor}%`});
  return <div className="relative w-44 h-44 rounded-full mx-auto" style={{background:total?`conic-gradient(${stops.join(",")})`:"rgba(255,255,255,.05)"}}><div className="absolute inset-5 rounded-full bg-[#121826] flex flex-col items-center justify-center text-center"><span className="text-[10px] text-[#94A3B8]">{centerLabel}</span><span className="text-sm font-bold text-white mt-1">{formatINR(total)}</span></div></div>;
}

export function CashFlowChart({ income, expenses }: { income: number; expenses: number }) {
  const max=Math.max(income,expenses,1); const surplus=income-expenses;
  return <div className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#121826]/65 p-6">
    <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#3D4FE0]/10 blur-[70px] rounded-full" />
    <div className="relative flex justify-between items-start gap-4"><div><h2 className="text-sm font-bold text-white">Monthly cash flow</h2><p className="text-[11px] text-[#94A3B8] mt-1">Income compared with declared spending</p></div><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${surplus>=0?"text-emerald-400 bg-emerald-500/10":"text-rose-400 bg-rose-500/10"}`}>{surplus>=0?"Surplus":"Deficit"} {formatINR(Math.abs(surplus))}</span></div>
    <div className="h-52 flex items-end justify-center gap-10 sm:gap-16 pt-8 relative"><div className="absolute inset-x-0 bottom-7 border-b border-white/[0.06]" />{[{label:"Income",value:income,color:"linear-gradient(180deg,#6475ff,#3D4FE0)"},{label:"Expenses",value:expenses,color:"linear-gradient(180deg,#2dd4bf,#0f766e)"}].map(item=><div key={item.label} className="h-full w-20 sm:w-28 flex flex-col justify-end items-center gap-2"><span className="text-[10px] font-semibold text-[#CBD5E1]">{formatINR(item.value)}</span><div className="w-full rounded-t-xl shadow-lg transition-all duration-700" style={{height:`${Math.max(8,(item.value/max)*145)}px`,background:item.color,boxShadow:`0 0 30px ${item.label==="Income"?"rgba(61,79,224,.22)":"rgba(45,212,191,.16)"}`}} /><span className="text-[10px] text-[#94A3B8]">{item.label}</span></div>)}</div>
  </div>;
}

export function HealthGauge({ income, expenses, liabilities }: { income:number; expenses:number; liabilities:number }) {
  const savingsRate=income>0?Math.max(0,(income-expenses)/income):0; const debtPenalty=income>0?Math.min(.4,liabilities/(income*36)):0; const score=Math.round(Math.max(0,Math.min(100,(savingsRate*140+0.45-debtPenalty)*100)));
  return <div className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#121826]/65 p-6 flex flex-col items-center"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(61,79,224,.14),transparent_48%)]"/><h2 className="relative text-sm font-bold text-white self-start">Financial health</h2><p className="relative text-[11px] text-[#94A3B8] mt-1 self-start">Calculated from cash flow and debt</p><div className="relative w-44 h-44 mt-5 flex items-center justify-center"><svg viewBox="0 0 120 120" className="w-full h-full -rotate-90"><circle cx="60" cy="60" r="49" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="9"/><circle cx="60" cy="60" r="49" fill="none" stroke="url(#gauge)" strokeWidth="9" strokeLinecap="round" pathLength="100" strokeDasharray={`${score} 100`}/><defs><linearGradient id="gauge"><stop stopColor="#3D4FE0"/><stop offset="1" stopColor="#22D3EE"/></linearGradient></defs></svg><div className="absolute text-center"><span className="text-3xl font-bold text-white">{score}</span><p className="text-[10px] text-[#94A3B8]">out of 100</p></div></div></div>;
}
