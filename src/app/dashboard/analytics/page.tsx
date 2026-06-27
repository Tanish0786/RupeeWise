"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, ArrowUpRight, Search, Plus, Trash2, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

interface Transaction {
  id: string;
  title: string;
  category: "income" | "expense" | "investment";
  amount: number;
  date: string;
}

export default function AnalyticsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", title: "Smart SIP Debit (Equity Mutual Fund)", category: "investment", amount: -25000, date: "Today, 10:15 AM" },
    { id: "2", title: "Primary Salary Credit (RupeeWise Ltd)", category: "income", amount: 180000, date: "Yesterday, 6:00 PM" },
    { id: "3", title: "HDFC Home Loan EMI Sync", category: "expense", amount: -35000, date: "June 24, 2026" },
    { id: "4", title: "Organic Groceries Delivery", category: "expense", amount: -2400, date: "June 22, 2026" },
    { id: "5", title: "Baniya Arbitrage Dividend Sweep", category: "income", amount: 12040, date: "June 20, 2026" }
  ]);

  const [activeTab, setActiveTab] = useState<"all" | "income" | "expense" | "investment">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<"income" | "expense" | "investment">("expense");
  const [newAmount, setNewAmount] = useState(1000);

  const handleAddTx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsLoading(true);
    setShowAddForm(false);

    setTimeout(() => {
      const newTx: Transaction = {
        id: Math.random().toString(),
        title: newName,
        category: newCategory,
        amount: newCategory === "income" ? Math.abs(newAmount) : -Math.abs(newAmount),
        date: "Just now"
      };

      setTransactions((prev) => [newTx, ...prev]);
      setNewName("");
      setNewAmount(1000);
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteTx = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTx = transactions.filter((t) => {
    const matchesTab = activeTab === "all" || t.category === activeTab;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#3D4FE0]" />
            Expense & Yield Analytics
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">Deep analysis of capital flows, recurring payments, and transaction history.</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 rounded-xl bg-[#3D4FE0] hover:scale-105 transition-all text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main transaction ledger list */}
        <div className="md:col-span-2 flex flex-col gap-4">
          
          {/* Add transaction form */}
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 rounded-2xl border border-[#3D4FE0]/30 bg-[#3D4FE0]/5 backdrop-blur-md mb-2"
            >
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Record Transaction</h3>
              <form onSubmit={handleAddTx} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-[#94A3B8] font-bold">Transaction Label</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Salary Credit, Coffee"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="h-10 px-3.5 rounded-xl border border-white/[0.05] bg-[#050816] text-xs text-white focus:outline-none focus:border-[#3D4FE0]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-[#94A3B8] font-bold">Type</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="h-10 px-3 rounded-xl border border-white/[0.05] bg-[#050816] text-xs text-white focus:outline-none focus:border-[#3D4FE0]"
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                      <option value="investment">Investment</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-[#94A3B8] font-bold">Amount (₹)</label>
                    <input
                      type="number"
                      required
                      value={newAmount}
                      onChange={(e) => setNewAmount(Number(e.target.value))}
                      className="h-10 px-3.5 rounded-xl border border-white/[0.05] bg-[#050816] text-xs text-white focus:outline-none focus:border-[#3D4FE0]"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1.5 rounded-lg border border-white/[0.05] text-[10px] text-[#CBD5E1] hover:bg-white/[0.02]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg bg-[#3D4FE0] text-[10px] font-bold text-white hover:scale-105 transition-transform"
                  >
                    Save Record
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Loader */}
          {isLoading && (
            <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-3">
              <div className="h-4 bg-white/5 rounded-full animate-pulse w-full" />
              <div className="h-4 bg-white/5 rounded-full animate-pulse w-5/6" />
            </div>
          )}

          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 items-center">
            {/* Tabs */}
            <div className="flex gap-1.5 bg-[#0B1020] p-1 border border-white/[0.05] rounded-xl self-start">
              {["all", "income", "expense", "investment"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`text-[10px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTab === tab ? "bg-[#3D4FE0] text-white" : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="flex items-center gap-2 px-3 h-10 w-full sm:w-60 rounded-xl border border-white/[0.05] bg-[#121826]/60">
              <Search className="w-3.5 h-3.5 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search ledger..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-xs text-white focus:outline-none w-full"
              />
            </div>
          </div>

          {/* Empty state */}
          {filteredTx.length === 0 && !isLoading && (
            <div className="p-10 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md text-center flex flex-col items-center gap-4">
              <AlertCircle className="w-10 h-10 text-[#94A3B8]" />
              <div>
                <h3 className="text-sm font-bold text-white">No transactions found</h3>
                <p className="text-xs text-[#94A3B8] mt-1">Refine your search parameter or category filters.</p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
                className="px-3 py-1.5 rounded-lg border border-[#3D4FE0]/30 hover:bg-[#3D4FE0]/5 text-xs text-[#CBD5E1] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Ledger List */}
          {filteredTx.length > 0 && (
            <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-3">
              {filteredTx.map((tx) => (
                <div key={tx.id} className="flex justify-between items-center p-3 rounded-xl border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.02] transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      tx.category === "income" ? "bg-emerald-500/10 text-emerald-400" : tx.category === "investment" ? "bg-[#3D4FE0]/15 text-[#3D4FE0]" : "bg-white/5 text-[#CBD5E1]"
                    }`}>
                      {tx.category.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white leading-normal">{tx.title}</h4>
                      <span className="text-[10px] text-[#94A3B8] mt-0.5">{tx.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold ${
                      tx.amount > 0 ? "text-emerald-400" : "text-white"
                    }`}>
                      {tx.amount > 0 ? "+" : ""}₹{tx.amount.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleDeleteTx(tx.id)}
                      className="text-[#94A3B8] hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Sidebar right columns */}
        <div className="flex flex-col gap-6">
          <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#3D4FE0]/5 blur-[60px] rounded-full pointer-events-none" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Trend Chart</h2>
            <svg viewBox="0 0 100 35" className="w-full h-20 text-[#3D4FE0] mt-2" preserveAspectRatio="none">
              <path
                d="M0,28 Q15,10 30,22 T60,12 T80,2 T100,8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
