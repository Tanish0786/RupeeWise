"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, ArrowUpRight, ArrowRight, Search, Plus, Trash2, CheckCircle2, AlertCircle, RefreshCw, Sparkles, ShieldCheck, ShieldAlert, Award } from "lucide-react";

interface Transaction {
  id: string;
  title: string;
  category: "income" | "expense" | "investment";
  amount: number;
  date: string;
}

interface ActionTask {
  id: string;
  title: string;
  points: number;
  completed: boolean;
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"ledger" | "health">("ledger");

  // Ledger state
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", title: "Smart SIP Debit (Equity Mutual Fund)", category: "investment", amount: -25000, date: "Today, 10:15 AM" },
    { id: "2", title: "Primary Salary Credit (RupeeWise Ltd)", category: "income", amount: 180000, date: "Yesterday, 6:00 PM" },
    { id: "3", title: "HDFC Home Loan EMI Sync", category: "expense", amount: -35000, date: "June 24, 2026" },
    { id: "4", title: "Organic Groceries Delivery", category: "expense", amount: -2400, date: "June 22, 2026" },
    { id: "5", title: "Baniya Arbitrage Dividend Sweep", category: "income", amount: 12040, date: "June 20, 2026" }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [ledgerFilter, setLedgerFilter] = useState<"all" | "income" | "expense" | "investment">("all");
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<"income" | "expense" | "investment">("expense");
  const [newAmount, setNewAmount] = useState(1000);

  // Health Center checklist state
  const [tasks, setTasks] = useState<ActionTask[]>([
    { id: "t1", title: "Cancel unused Cloud SaaS trial (Save ₹8,900)", points: 10, completed: false },
    { id: "t2", title: "Sweep ₹2L surplus cash into Liquid Assets", points: 10, completed: false },
    { id: "t3", title: "Set budget alert threshold limit for Food & Dining", points: 10, completed: false }
  ]);

  // Base score is 70. Each completed task adds its points.
  const completedPoints = tasks.reduce((sum, t) => sum + (t.completed ? t.points : 0), 0);
  const healthScore = Math.min(100, 70 + completedPoints);

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

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
    const matchesTab = ledgerFilter === "all" || t.category === ledgerFilter;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Title */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#3D4FE0]" />
            Expense & Yield Analytics
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">Deep analysis of capital flows, recurring payments, and transaction history.</p>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-[#0B1020] p-1 border border-white/[0.05] rounded-xl self-start">
          <button
            onClick={() => setActiveTab("ledger")}
            className={`text-[10px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === "ledger" ? "bg-[#3D4FE0] text-white" : "text-[#94A3B8] hover:text-white"
            }`}
          >
            Ledger
          </button>
          <button
            onClick={() => setActiveTab("health")}
            className={`text-[10px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === "health" ? "bg-[#3D4FE0] text-white" : "text-[#94A3B8] hover:text-white"
            }`}
          >
            Health Center
          </button>
        </div>
      </div>

      {/* Main content conditional rendering */}
      <AnimatePresence mode="wait">
        {activeTab === "ledger" ? (
          /* Transaction Ledger Tab */
          <motion.div
            key="ledger-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="md:col-span-2 flex flex-col gap-4">
              
              {/* Record form */}
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
                          className="h-10 px-3 rounded-xl border border-white/[0.05] bg-[#050816] text-xs text-white focus:outline-none"
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
                        className="px-3.5 py-1.5 rounded-lg bg-[#3D4FE0] text-[10px] font-bold text-white"
                      >
                        Save Record
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Loader */}
              {isLoading && (
                <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-3 animate-pulse">
                  <div className="h-4 bg-white/5 rounded-full w-full" />
                  <div className="h-4 bg-white/5 rounded-full w-5/6" />
                </div>
              )}

              {/* Filters */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 items-center">
                <div className="flex gap-1.5 bg-[#0B1020] p-1 border border-white/[0.05] rounded-xl self-start">
                  {["all", "income", "expense", "investment"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setLedgerFilter(tab as any)}
                      className={`text-[10px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        ledgerFilter === tab ? "bg-[#3D4FE0] text-white" : "text-[#94A3B8] hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

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

              {/* Ledger list */}
              {filteredTx.length > 0 ? (
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
                          <h4 className="text-xs font-bold text-white">{tx.title}</h4>
                          <span className="text-[10px] text-[#94A3B8] mt-0.5">{tx.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-xs font-bold ${tx.amount > 0 ? "text-emerald-400" : "text-white"}`}>
                          {tx.amount > 0 ? "+" : ""}₹{tx.amount.toLocaleString("en-IN")}
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
              ) : (
                <div className="p-10 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md text-center flex flex-col items-center gap-4">
                  <AlertCircle className="w-10 h-10 text-[#94A3B8]" />
                  <span className="text-xs text-[#94A3B8]">No matching records found.</span>
                </div>
              )}

            </div>

            {/* Sidebar trend graph */}
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
          </motion.div>
        ) : (
          /* Enriched Financial Health Center View Tab */
          <motion.div
            key="health-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left Main Areas */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Dynamic Score and improvement status headers */}
              <div className="p-6 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col sm:flex-row justify-between items-center gap-6">
                
                {/* Progress Gauge */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="50" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="50"
                      stroke="#3D4FE0"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={314}
                      initial={{ strokeDashoffset: 314 }}
                      animate={{ strokeDashoffset: 314 - (314 * healthScore) / 100 }}
                      transition={{ duration: 0.8 }}
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-3xl font-bold text-white font-mono">{healthScore}</span>
                    <span className="text-[10px] text-[#94A3B8] block">Health Score</span>
                  </div>
                </div>

                {/* Score Status */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white">
                      {healthScore >= 90 ? "Excellent Allocation Health" : "Satisfactory Efficiency"}
                    </h3>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Check off Baniya&apos;s recommended tasks below to improve your score. Completing each task sweeps leakages and updates your gauge in real-time.
                  </p>
                </div>

              </div>

              {/* Actionable Checklists Tasks */}
              <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Improvement Tasks</h3>
                <div className="flex flex-col gap-3">
                  {tasks.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => handleToggleTask(t.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                        t.completed ? "border-emerald-500/30 bg-emerald-500/5" : "border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          t.completed ? "border-emerald-400 bg-emerald-400 text-white" : "border-white/20"
                        }`}>
                          {t.completed && <span className="text-[10px] font-bold">✓</span>}
                        </div>
                        <span className={`text-xs ${t.completed ? "text-[#94A3B8] line-through" : "text-[#CBD5E1]"}`}>
                          {t.title}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold ${t.completed ? "text-emerald-400" : "text-[#3D4FE0]"}`}>
                        {t.completed ? "+10 Pts" : "+10 Pts"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Weaknesses audit columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Strengths */}
                <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Allocations Strengths</span>
                  </div>
                  <ul className="text-xs text-[#CBD5E1] flex flex-col gap-2.5 list-disc pl-4 mt-2">
                    <li>Rent-to-income is highly efficient (12.5% of salary).</li>
                    <li>Consistently matching 25% SIP equity allocations.</li>
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Allocation Leaks</span>
                  </div>
                  <ul className="text-xs text-[#CBD5E1] flex flex-col gap-2.5 list-disc pl-4 mt-2">
                    <li>Surplus cash reserves yield-leak at 3% interest.</li>
                    <li>Discretionary dining bills exceed caps by 14%.</li>
                  </ul>
                </div>

              </div>

            </div>

            {/* Sidebar columns: Baniya Advice */}
            <div className="flex flex-col gap-6">
              <div className="p-5 rounded-2xl border border-[#3D4FE0]/35 bg-[#3D4FE0]/5 relative overflow-hidden flex flex-col gap-3">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#3D4FE0]/10 blur-[40px] rounded-full pointer-events-none" />
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#3D4FE0]" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Baniya Health Audit</h3>
                </div>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  &quot;Tanish, your allocation health score is currently at {healthScore}/100. The major cap leakages occur in your inactive SaaS subscription payments. Cancel them immediately to hit a 90+ rating index.&quot;
                </p>
                <button
                  onClick={() => router.push("/dashboard/baniya?q=How to improve my financial health score.")}
                  className="w-full py-2.5 rounded-xl bg-[#3D4FE0] hover:scale-102 transition-transform text-xs font-bold text-white flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                >
                  Discuss with Baniya
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
