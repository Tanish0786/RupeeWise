"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ArrowRight, UploadCloud, CheckCircle2, AlertTriangle, Sparkles, TrendingUp, RefreshCw, Star, Info, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReportsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  const reports = [
    { title: "FY 2025-26 Tax Loss Harvesting Summary", size: "1.2 MB", format: "PDF" },
    { title: "Q3 Asset Allocation & Rebalance Audit", size: "480 KB", format: "PDF" },
    { title: "Consolidated Wealth Statement (May 2026)", size: "2.4 MB", format: "PDF" }
  ];

  const categories = [
    { name: "Rent & Housing", amount: 35000, percentage: 38, color: "bg-emerald-400" },
    { name: "SIP & Mutual Funds", amount: 25000, percentage: 27, color: "bg-[#3D4FE0]" },
    { name: "Food & Lifestyle", amount: 18400, percentage: 20, color: "bg-amber-500" },
    { name: "Subscriptions & Leaks", amount: 8900, percentage: 10, color: "bg-purple-500" },
    { name: "Others", amount: 4500, percentage: 5, color: "bg-[#94A3B8]" }
  ];

  const topExpenses = [
    { title: "HDFC Home Loan EMI Sync", amount: "₹35,000", date: "June 25, 2026", category: "Rent & Housing" },
    { title: "Smart SIP Debit (Equity Mutual Fund)", amount: "₹25,000", date: "June 24, 2026", category: "SIP & Mutual Funds" },
    { title: "Unused Cloud SaaS Renewal", amount: "₹8,900", date: "June 22, 2026", category: "Subscriptions & Leaks" }
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext !== "pdf" && ext !== "csv" && ext !== "xlsx" && ext !== "xls") {
      setUploadState("error");
      setFileName(file.name);
      return;
    }

    setFileName(file.name);
    setFileSize((file.size / 1024).toFixed(1) + " KB");
    setUploadState("uploading");
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState("success");
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const triggerUploadInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#3D4FE0]" />
          Statements & AI Auditing
        </h1>
        <p className="text-xs text-[#94A3B8] mt-1">Upload files to isolate recurring fee hikes, subscription leakages, and asset allocations.</p>
      </div>

      {/* Upload Drag State panel */}
      <AnimatePresence mode="wait">
        {uploadState !== "success" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="p-6 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md">
                <h2 className="text-sm font-bold text-white mb-4">Upload Statement</h2>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.csv,.xlsx,.xls"
                  className="hidden"
                />

                <AnimatePresence mode="wait">
                  {uploadState === "idle" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={triggerUploadInput}
                      className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                        isDragging ? "border-[#3D4FE0] bg-[#3D4FE0]/5" : "border-white/[0.05] hover:border-[#3D4FE0]/50 hover:bg-white/[0.01]"
                      }`}
                    >
                      <UploadCloud className="w-10 h-10 text-[#94A3B8] group-hover:text-white" />
                      <div className="text-center">
                        <p className="text-xs font-bold text-white">Drag & drop bank statement here</p>
                        <p className="text-[10px] text-[#94A3B8] mt-1">Accepts PDF, CSV, Excel formats up to 10MB</p>
                      </div>
                    </motion.div>
                  )}

                  {uploadState === "uploading" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border border-white/[0.05] rounded-xl p-8 flex flex-col items-center justify-center gap-4"
                    >
                      <div className="w-full flex justify-between items-center text-xs">
                        <span className="font-semibold text-[#CBD5E1] truncate max-w-xs">{fileName}</span>
                        <span className="text-[#94A3B8] font-mono">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-[#3D4FE0]" style={{ width: `${uploadProgress}%` }} />
                      </div>
                      <span className="text-[10px] text-[#94A3B8]">Analyzing transactions and rebalance leaks...</span>
                    </motion.div>
                  )}

                  {uploadState === "error" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border border-rose-500/20 bg-rose-500/5 rounded-xl p-8 flex flex-col items-center justify-center gap-4 text-center"
                    >
                      <AlertTriangle className="w-10 h-10 text-rose-400" />
                      <div>
                        <h3 className="text-xs font-bold text-white">Invalid Format</h3>
                        <p className="text-[10px] text-[#94A3B8] mt-1">File &quot;{fileName}&quot; must be in PDF, CSV, or Excel formatting.</p>
                      </div>
                      <button
                        onClick={() => setUploadState("idle")}
                        className="px-3.5 py-1.5 rounded-lg border border-rose-500/20 text-[10px] text-[#CBD5E1] hover:bg-rose-500/10 transition-colors cursor-pointer"
                      >
                        Try Again
                  </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sidebar reports list */}
            <div className="flex flex-col gap-6">
              <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-4">
                <h2 className="text-sm font-bold text-white mb-2">Available Reports</h2>
                <div className="flex flex-col gap-3">
                  {reports.map((r, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3.5 rounded-xl border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#3D4FE0]/10 flex items-center justify-center text-[#3D4FE0]">
                          <FileText className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h3 className="text-[10px] font-bold text-white leading-normal truncate max-w-[120px]">{r.title}</h3>
                          <p className="text-[9px] text-[#94A3B8] mt-0.5">{r.size} • {r.format}</p>
                        </div>
                      </div>
                      <button className="text-[9px] font-bold text-white bg-[#3D4FE0] px-2.5 py-1 rounded-lg hover:scale-105 transition-transform flex items-center gap-1 cursor-pointer">
                        Get
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Enriched AI Statement Analysis View Success State */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Top Analysis Status Banner */}
            <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Statement Audited Successfully</h3>
                  <p className="text-xs text-[#94A3B8] mt-0.5">{fileName} • {fileSize} • 94 Transactions Indexed</p>
                </div>
              </div>
              <button
                onClick={() => setUploadState("idle")}
                className="px-3 py-1.5 rounded-xl border border-white/[0.05] hover:bg-white/[0.02] text-xs font-semibold text-[#CBD5E1] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Upload New
              </button>
            </div>

            {/* Main analysis grids */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Health score and trends */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                
                {/* Health Score & High-level cash flow summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Gauge */}
                  <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider mb-3">Financial Health</span>
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="48" cy="48" r="38" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="transparent" />
                        <motion.circle
                          cx="48"
                          cy="48"
                          r="38"
                          stroke="#3D4FE0"
                          strokeWidth="6"
                          fill="transparent"
                          strokeDasharray={238}
                          initial={{ strokeDashoffset: 238 }}
                          animate={{ strokeDashoffset: 238 - (238 * 74) / 100 }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </svg>
                      <span className="absolute text-xl font-bold text-white font-mono">74<span className="text-[10px] text-[#94A3B8]">/100</span></span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full mt-3">Moderate Health</span>
                  </div>

                  {/* Cash Flow Summary */}
                  <div className="sm:col-span-2 p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Statement Cash Flow</span>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <span className="text-[10px] text-[#94A3B8]">Total Income</span>
                          <h4 className="text-xl font-bold text-emerald-400 mt-0.5">₹2,42,000</h4>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#94A3B8]">Total Outflow</span>
                          <h4 className="text-xl font-bold text-white mt-0.5">₹1,84,200</h4>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-white/[0.03] pt-3 flex justify-between items-center text-[10px] text-[#94A3B8]">
                      <span>Savings Rate: <span className="font-bold text-white">23.8%</span></span>
                      <span>Target: <span className="font-bold text-[#3D4FE0]">30%</span></span>
                    </div>
                  </div>

                </div>

                {/* Categories breakdown & distribution curves */}
                <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Spending breakdown by category</h3>
                  <div className="flex flex-col gap-4 mt-1">
                    {categories.map((c, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-bold text-[#CBD5E1] flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${c.color}`} />
                            {c.name}
                          </span>
                          <span className="text-[#94A3B8] font-mono">
                            ₹{c.amount.toLocaleString()} ({c.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${c.percentage}%` }}
                            transition={{ duration: 0.6, delay: idx * 0.05 }}
                            className={`h-full ${c.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Monthly Trends SVG Line Graph */}
                <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-4">
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Monthly Cash Flow Trend</h3>
                    <p className="text-[10px] text-[#94A3B8] mt-1">Relative income vs. spending index over previous quarters.</p>
                  </div>
                  <div className="w-full h-32 flex items-end mt-4">
                    <svg viewBox="0 0 100 30" className="w-full h-full text-[#3D4FE0]" preserveAspectRatio="none">
                      {/* Income curve */}
                      <path
                        d="M0,5 Q20,8 40,3 T80,10 T100,2"
                        fill="none"
                        stroke="rgba(52, 211, 153, 0.4)"
                        strokeWidth="1.5"
                        strokeDasharray="2"
                      />
                      {/* Outflow curve */}
                      <path
                        d="M0,25 Q20,12 40,22 T80,15 T100,12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M0,25 Q20,12 40,22 T80,15 T100,12 L100,30 L0,30 Z"
                        fill="currentColor"
                        fillOpacity="0.08"
                      />
                    </svg>
                  </div>
                </div>

              </div>

              {/* Right Column: AI insights and Top expenses */}
              <div className="flex flex-col gap-6">
                
                {/* Witty AI Advice Box from Baniya */}
                <div className="p-5 rounded-2xl border border-[#3D4FE0]/35 bg-[#3D4FE0]/5 relative overflow-hidden flex flex-col gap-4">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#3D4FE0]/10 blur-[40px] rounded-full pointer-events-none" />
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#3D4FE0]" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Baniya AI Audit Summary</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-xs text-[#CBD5E1] leading-relaxed">
                      &quot;Okay Tanish, looking at your statement, you&apos;re bleeding money on subscription auto-renewals. I isolated three software tools you paid for that haven&apos;t logged a single API request in 90 days. That&apos;s ₹8,900 of pure capital loss.&quot;
                    </p>
                    <p className="text-xs text-[#CBD5E1] leading-relaxed">
                      &quot;Also, your dining allocations exceeded target caps by 20%. Let&apos;s clean this up before you decide to buy another asset.&quot;
                    </p>
                  </div>
                  
                  <button
                    onClick={() => router.push("/dashboard/baniya?q=Analyse my bank statement leaks.")}
                    className="w-full py-2.5 rounded-xl bg-[#3D4FE0] hover:scale-102 active:scale-98 transition-all text-xs font-bold text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-[#3D4FE0]/25"
                  >
                    Ask Baniya about this statement
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Top Expenses */}
                <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Top Expenditures</h3>
                  <div className="flex flex-col gap-3">
                    {topExpenses.map((ex, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 rounded-xl border border-white/[0.03] bg-white/[0.01]">
                        <div>
                          <h4 className="text-[10px] font-bold text-white truncate max-w-[140px]">{ex.title}</h4>
                          <span className="text-[9px] text-[#94A3B8] block mt-0.5">{ex.category} • {ex.date}</span>
                        </div>
                        <span className="text-xs font-bold text-white font-mono">{ex.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
