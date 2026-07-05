"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Plus, ArrowUpRight, ArrowDownRight, Info, AlertCircle, RefreshCw, Briefcase, Bookmark, Sparkles } from "lucide-react";

interface Asset {
  id: string;
  name: string;
  value: number;
  share: string;
  trend: string;
  isPositive: boolean;
  color: string;
  percentage: number;
}

interface Holding {
  name: string;
  units: number;
  avgCost: number;
  value: number;
  returns: string;
  isPositive: boolean;
}

interface WatchlistItem {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
}

export default function InvestmentsPage() {
  const [assets, setAssets] = useState<Asset[]>([
    { id: "1", name: "Direct Equity", value: 2450000, share: "57.6%", trend: "+16.8% YoY", isPositive: true, color: "bg-[#3D4FE0]", percentage: 57.6 },
    { id: "2", name: "Arbitrage & Debt", value: 1200000, share: "28.2%", trend: "+6.5% YoY", isPositive: true, color: "bg-emerald-400", percentage: 28.2 },
    { id: "3", name: "Baniya Liquid Assets", value: 600910, share: "14.2%", trend: "+7.8% YoY", isPositive: true, color: "bg-purple-500", percentage: 14.2 }
  ]);

  const [holdings] = useState<Holding[]>([
    { name: "HDFC Bank Ltd", units: 180, avgCost: 1420, value: 288000, returns: "+12.4%", isPositive: true },
    { name: "Reliance Industries", units: 110, avgCost: 2340, value: 275000, returns: "+6.8%", isPositive: true },
    { name: "Nifty 50 Index Fund", units: 1200, avgCost: 125, value: 180000, returns: "+20.0%", isPositive: true }
  ]);

  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    { symbol: "NIFTY 50", price: "23,501.20", change: "+1.12%", isPositive: true },
    { symbol: "GOLD BEES", price: "64.80", change: "-0.45%", isPositive: false },
    { symbol: "S&P 500 ETF", price: "482.40", change: "+0.85%", isPositive: true }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [showAddAsset, setShowAddAsset] = useState(false);
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState(100000);
  const [activeDetailsId, setActiveDetailsId] = useState<string | null>(null);

  const totalValue = assets.reduce((sum, a) => sum + a.value, 0);
  const investedCapital = 3500000;
  const profitLoss = totalValue - investedCapital;
  const profitLossPct = (profitLoss / investedCapital) * 100;

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsLoading(true);
    setShowAddAsset(false);

    setTimeout(() => {
      const calculatedTotal = totalValue + newValue;
      const newPct = (newValue / calculatedTotal) * 100;
      
      const newAsset: Asset = {
        id: Math.random().toString(),
        name: newName,
        value: newValue,
        share: `${newPct.toFixed(1)}%`,
        trend: "+0.0% YoY",
        isPositive: true,
        color: "bg-amber-500",
        percentage: newPct
      };

      setAssets((prev) => [...prev, newAsset]);
      setNewName("");
      setNewValue(100000);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#3D4FE0]" />
            Investments & Portfolios
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">Consolidated multi-asset summary tracking total capital allocations.</p>
        </div>
        <button
          onClick={() => setShowAddAsset(true)}
          className="px-4 py-2 rounded-xl bg-[#3D4FE0] hover:scale-105 transition-all text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Link Asset
        </button>
      </div>

      {/* KPI Overview summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md">
          <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Portfolio Value</span>
          <h3 className="text-xl font-bold text-white mt-1">₹{totalValue.toLocaleString("en-IN")}</h3>
        </div>
        <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md">
          <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Invested Capital</span>
          <h3 className="text-xl font-bold text-white mt-1">₹{investedCapital.toLocaleString("en-IN")}</h3>
        </div>
        <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md">
          <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Net Returns</span>
          <div className="flex items-center gap-2 mt-1">
            <h3 className="text-xl font-bold text-emerald-400">
              +₹{profitLoss.toLocaleString("en-IN")}
            </h3>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" />
              {profitLossPct.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Asset Allocation visual bar */}
      {assets.length > 0 && (
        <div className="w-full h-4 rounded-full overflow-hidden flex bg-white/5 shadow-inner">
          {assets.map((a) => (
            <div
              key={a.id}
              className={`h-full ${a.color} transition-all duration-500`}
              style={{ width: `${a.percentage}%` }}
              title={`${a.name}: ${a.share}`}
            />
          ))}
        </div>
      )}

      {/* Grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main List Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Add form */}
          {showAddAsset && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 rounded-2xl border border-[#3D4FE0]/30 bg-[#3D4FE0]/5 backdrop-blur-md"
            >
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Add Asset Class</h3>
              <form onSubmit={handleAddAsset} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-[#94A3B8] font-bold">Asset Label</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gold ETFs, US Tech Equity"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="h-10 px-3.5 rounded-xl border border-white/[0.05] bg-[#050816] text-xs text-white focus:outline-none focus:border-[#3D4FE0]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-[#94A3B8] font-bold">Invested Capital (₹)</label>
                  <input
                    type="number"
                    required
                    value={newValue}
                    onChange={(e) => setNewValue(Number(e.target.value))}
                    className="h-10 px-3.5 rounded-xl border border-white/[0.05] bg-[#050816] text-xs text-white focus:outline-none focus:border-[#3D4FE0]"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddAsset(false)}
                    className="px-3 py-1.5 rounded-lg border border-white/[0.05] text-[10px] text-[#CBD5E1] hover:bg-white/[0.02]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg bg-[#3D4FE0] text-[10px] font-bold text-white hover:scale-105 transition-transform"
                  >
                    Link Asset
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Skeletons Loader */}
          {isLoading && (
            <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-4 animate-pulse">
              <div className="h-4 bg-white/5 rounded-full w-1/3" />
              <div className="h-2.5 bg-white/5 rounded-full w-full" />
            </div>
          )}

          {/* Allocation Details */}
          <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Asset Distribution</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {assets.map((a) => (
                <div
                  key={a.id}
                  onClick={() => setActiveDetailsId(activeDetailsId === a.id ? null : a.id)}
                  className="p-4 rounded-xl border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.02] cursor-pointer transition-all flex flex-col justify-between h-28 relative group"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">{a.name}</span>
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      {a.trend}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mt-1">₹{a.value.toLocaleString("en-IN")}</h4>
                  
                  <div className="flex justify-between items-center text-[9px] text-[#94A3B8] mt-2">
                    <span>Share: {a.share}</span>
                    <span className="text-[#3D4FE0] font-semibold group-hover:underline">Details &rarr;</span>
                  </div>

                  {/* Details Overlay */}
                  <AnimatePresence>
                    {activeDetailsId === a.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-[#121826] border border-[#3D4FE0] rounded-xl p-3.5 flex flex-col justify-between z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div>
                          <h4 className="text-[10px] font-bold text-white">{a.name} Allocation</h4>
                          <p className="text-[9px] text-[#94A3B8] leading-relaxed mt-1">Dynamic sweep policies reallocate surplus capital to liquid dividends daily.</p>
                        </div>
                        <button
                          onClick={() => setActiveDetailsId(null)}
                          className="w-full py-1 rounded bg-[#3D4FE0] text-[9px] font-bold text-white text-center cursor-pointer"
                        >
                          Close Details
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Top Holdings Ledger */}
          <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Top Portfolio Holdings</h3>
            <div className="flex flex-col gap-3">
              {holdings.map((h, idx) => (
                <div key={idx} className="flex justify-between items-center p-3.5 rounded-xl border border-white/[0.03] bg-white/[0.01]">
                  <div>
                    <h4 className="text-xs font-bold text-white leading-normal">{h.name}</h4>
                    <span className="text-[9px] text-[#94A3B8] mt-0.5">{h.units} Units • Avg ₹{h.avgCost}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-white block font-mono">₹{h.value.toLocaleString("en-IN")}</span>
                    <span className={`text-[9px] font-bold ${h.isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                      {h.returns} Returns
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar right */}
        <div className="flex flex-col gap-6">
          
          {/* Baniya AI Advice */}
          <div className="p-5 rounded-2xl border border-[#3D4FE0]/35 bg-[#3D4FE0]/5 relative overflow-hidden flex flex-col gap-3">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#3D4FE0]/10 blur-[40px] rounded-full pointer-events-none" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#3D4FE0]" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Baniya Investment Audit</h3>
            </div>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              &quot;Tanish, your equity exposure is at 57.6% which is fine for your profile. But your cash reserves are yield-leaking at 3% in savings. Swap at least ₹2L into liquid debt arbitrage sweeps to collect active protection dividends.&quot;
            </p>
          </div>

          {/* Watchlist */}
          <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Asset Watchlist</h3>
            <div className="flex flex-col gap-3">
              {watchlist.map((w, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-xl border border-white/[0.03] bg-white/[0.01]">
                  <div>
                    <span className="text-[10px] font-bold text-[#CBD5E1]">{w.symbol}</span>
                    <span className="text-[9px] text-[#94A3B8] block mt-0.5">₹{w.price}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    w.isPositive ? "text-emerald-400 bg-emerald-500/10" : "text-rose-400 bg-rose-500/10"
                  }`}>
                    {w.change}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
