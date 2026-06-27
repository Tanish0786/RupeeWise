"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Plus, ArrowUpRight, ArrowDownRight, Info, AlertCircle, RefreshCw } from "lucide-react";

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

export default function InvestmentsPage() {
  const [assets, setAssets] = useState<Asset[]>([
    { id: "1", name: "Direct Equity", value: 2450000, share: "57.6%", trend: "+16.8% YoY", isPositive: true, color: "bg-[#3D4FE0]", percentage: 57.6 },
    { id: "2", name: "Arbitrage & Debt", value: 1200000, share: "28.2%", trend: "+6.5% YoY", isPositive: true, color: "bg-emerald-400", percentage: 28.2 },
    { id: "3", name: "Baniya Liquid Assets", value: 600910, share: "14.2%", trend: "+7.8% YoY", isPositive: true, color: "bg-purple-500", percentage: 14.2 }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [showAddAsset, setShowAddAsset] = useState(false);
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState(100000);
  const [activeDetailsId, setActiveDetailsId] = useState<string | null>(null);

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsLoading(true);
    setShowAddAsset(false);

    setTimeout(() => {
      const totalValue = assets.reduce((sum, a) => sum + a.value, 0) + newValue;
      const newPct = (newValue / totalValue) * 100;
      
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
    }, 1200);
  };

  const handleClearAssets = () => {
    setAssets([]);
  };

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#3D4FE0]" />
            Investments & Portfolios
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">Consolidated multi-asset summary tracking total capital allocations.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleClearAssets}
            className="px-3 py-2 rounded-xl border border-white/[0.05] hover:bg-rose-500/5 hover:text-rose-400 text-xs font-semibold text-[#CBD5E1] transition-all cursor-pointer"
          >
            Clear List
          </button>
          <button
            onClick={() => setShowAddAsset(true)}
            className="px-4 py-2 rounded-xl bg-[#3D4FE0] hover:scale-105 transition-all text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Link Asset
          </button>
        </div>
      </div>

      {/* Allocation visual segments bar */}
      {assets.length > 0 && (
        <div className="w-full h-4 rounded-full overflow-hidden flex bg-white/5">
          {assets.map((a) => (
            <div
              key={a.id}
              className={`h-full ${a.color}`}
              style={{ width: `${a.percentage}%` }}
              title={`${a.name}: ${a.share}`}
            />
          ))}
        </div>
      )}

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main List */}
        <div className="md:col-span-2 flex flex-col gap-4">
          
          {/* Add form */}
          {showAddAsset && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 rounded-2xl border border-[#3D4FE0]/30 bg-[#3D4FE0]/5 backdrop-blur-md mb-2"
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
                  <label className="text-[10px] text-[#94A3B8] font-bold">Invested Capital (₹{newValue.toLocaleString()})</label>
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

          {/* Loader */}
          {isLoading && (
            <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-4">
              <div className="h-4 bg-white/5 rounded-full animate-pulse w-1/3" />
              <div className="h-2.5 bg-white/5 rounded-full animate-pulse w-full" />
            </div>
          )}

          {/* Empty state */}
          {assets.length === 0 && !isLoading && (
            <div className="p-10 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md text-center flex flex-col items-center gap-4">
              <AlertCircle className="w-10 h-10 text-[#94A3B8]" />
              <div>
                <h3 className="text-sm font-bold text-white">No assets linked</h3>
                <p className="text-xs text-[#94A3B8] mt-1">Connect your mutual funds or bank aggregators to compute advisory allocations.</p>
              </div>
              <button
                onClick={() => setAssets([
                  { id: "1", name: "Direct Equity", value: 2450000, share: "57.6%", trend: "+16.8% YoY", isPositive: true, color: "bg-[#3D4FE0]", percentage: 57.6 },
                  { id: "2", name: "Baniya Liquid Assets", value: 600910, share: "14.2%", trend: "+7.8% YoY", isPositive: true, color: "bg-purple-500", percentage: 14.2 }
                ])}
                className="px-3 py-1.5 rounded-lg border border-[#3D4FE0]/30 hover:bg-[#3D4FE0]/5 text-xs text-[#CBD5E1] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reload Demo Data
              </button>
            </div>
          )}

          {/* List panel */}
          {assets.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {assets.map((a) => (
                <div
                  key={a.id}
                  onClick={() => setActiveDetailsId(activeDetailsId === a.id ? null : a.id)}
                  className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col justify-between h-40 cursor-pointer hover:border-[#3D4FE0] transition-colors relative group"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-[#94A3B8] font-bold uppercase tracking-wider">{a.name}</span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <ArrowUpRight className="w-3 h-3" />
                        {a.trend}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mt-3">₹{a.value.toLocaleString()}</h2>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-[#94A3B8] border-t border-white/[0.03] pt-3">
                    <span>Share: {a.share}</span>
                    <span className="text-[#3D4FE0] font-semibold flex items-center gap-0.5 group-hover:underline">
                      <Info className="w-3 h-3" />
                      Details
                    </span>
                  </div>

                  {/* Expanded Detail Panel Overlay */}
                  <AnimatePresence>
                    {activeDetailsId === a.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-0 bg-[#121826] border border-[#3D4FE0] rounded-2xl p-4 flex flex-col justify-between z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div>
                          <h3 className="text-xs font-bold text-white">{a.name} Parameters</h3>
                          <p className="text-[10px] text-[#94A3B8] mt-2">Active rebalancing rules are harvesting liquid bond dividends in this portfolio class automatically.</p>
                        </div>
                        <button
                          onClick={() => setActiveDetailsId(null)}
                          className="w-full py-1.5 rounded-lg bg-[#3D4FE0] text-[10px] font-bold text-white text-center cursor-pointer"
                        >
                          Close Details
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Sidebar right */}
        <div className="flex flex-col gap-6">
          <div className="p-5 rounded-2xl border border-[#3D4FE0]/35 bg-[#3D4FE0]/5 relative overflow-hidden">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Portfolio Yield Advisory</h3>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              Based on market spreads, rotating 12% equity into debt arbitrage locks in capital protection yields.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
