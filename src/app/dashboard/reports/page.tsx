"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ArrowRight, UploadCloud, CheckCircle2, AlertTriangle, Sparkles, TrendingUp, RefreshCw, Download, Share2, Filter, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReportsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [activeTab, setActiveTab] = useState<"upload" | "generate">("upload");
  const [reportPeriod, setReportPeriod] = useState<"monthly" | "yearly">("monthly");
  
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);

  // Dummy reports list
  const reports = [
    { title: "FY 2025-26 Tax Loss Harvesting Summary", size: "1.2 MB", format: "PDF" },
    { title: "Q3 Asset Allocation & Rebalance Audit", size: "480 KB", format: "PDF" },
    { title: "Consolidated Wealth Statement (May 2026)", size: "2.4 MB", format: "PDF" }
  ];

  // Dummy monthly/yearly report values
  const reportData = {
    monthly: {
      income: 180000,
      expenses: 128400,
      savings: 51600,
      savingsRate: 28.6,
      yieldReturn: 14200,
      yieldReturnPct: 8.4,
      healthScore: 78,
      categories: [
        { name: "Rent & Housing", amount: 35000, percentage: 27, color: "bg-emerald-400" },
        { name: "Food & Dining", amount: 24200, percentage: 19, color: "bg-amber-500" },
        { name: "SIP Mutual Funds", amount: 25000, percentage: 20, color: "bg-[#3D4FE0]" },
        { name: "SaaS & Subscriptions", amount: 8900, percentage: 7, color: "bg-purple-500" },
        { name: "Lifestyle & Retail", amount: 35300, percentage: 27, color: "bg-[#94A3B8]" }
      ]
    },
    yearly: {
      income: 2160000,
      expenses: 1440000,
      savings: 720000,
      savingsRate: 33.3,
      yieldReturn: 288400,
      yieldReturnPct: 18.2,
      healthScore: 86,
      categories: [
        { name: "Rent & Housing", amount: 420000, percentage: 29, color: "bg-emerald-400" },
        { name: "Food & Dining", amount: 284000, percentage: 20, color: "bg-amber-500" },
        { name: "SIP Mutual Funds", amount: 300000, percentage: 21, color: "bg-[#3D4FE0]" },
        { name: "SaaS & Subscriptions", amount: 106800, percentage: 7, color: "bg-purple-500" },
        { name: "Lifestyle & Retail", amount: 329200, percentage: 23, color: "bg-[#94A3B8]" }
      ]
    }
  };

  const handleActionClick = (type: string) => {
    setIsActionLoading(type);
    setTimeout(() => {
      setIsActionLoading(null);
      alert(`${type === "download" ? "PDF Report downloaded successfully!" : "Report link copied to clipboard!"}`);
    }, 1500);
  };

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

  const currentReport = reportData[reportPeriod];

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Title */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#3D4FE0]" />
            Reports & Statements
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">Audit capital leakages via bank statement uploads or generate tax reports.</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-[#0B1020] p-1 border border-white/[0.05] rounded-xl self-start">
          <button
            onClick={() => setActiveTab("upload")}
            className={`text-[10px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === "upload" ? "bg-[#3D4FE0] text-white" : "text-[#94A3B8] hover:text-white"
            }`}
          >
            Upload Statement
          </button>
          <button
            onClick={() => setActiveTab("generate")}
            className={`text-[10px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === "generate" ? "bg-[#3D4FE0] text-white" : "text-[#94A3B8] hover:text-white"
            }`}
          >
            Generate Reports
          </button>
        </div>
      </div>

      {/* Main dashboard body layouts based on tabs */}
      <AnimatePresence mode="wait">
        {activeTab === "upload" ? (
          /* Statement Audit Tab content */
          <motion.div
            key="upload-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
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
                    <div
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
                    </div>
                  )}

                  {uploadState === "uploading" && (
                    <div className="border border-white/[0.05] rounded-xl p-8 flex flex-col items-center justify-center gap-4">
                      <div className="w-full flex justify-between items-center text-xs">
                        <span className="font-semibold text-[#CBD5E1] truncate max-w-xs">{fileName}</span>
                        <span className="text-[#94A3B8] font-mono">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-[#3D4FE0]" style={{ width: `${uploadProgress}%` }} />
                      </div>
                    </div>
                  )}

                  {uploadState === "success" && (
                    <div className="flex flex-col gap-5">
                      <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <div>
                            <h4 className="text-xs font-bold text-white">Analysis Complete</h4>
                            <p className="text-[10px] text-[#94A3B8] mt-0.5">{fileName} ({fileSize})</p>
                          </div>
                        </div>
                        <button onClick={() => setUploadState("idle")} className="p-1 text-[#94A3B8] hover:text-white">
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="p-5 rounded-xl border border-white/[0.04] bg-[#0B1020]/70 flex flex-col gap-4">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Statement Analytics Summary</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-[10px] text-[#94A3B8] uppercase">Total Inflow</span>
                            <div className="text-base font-bold text-emerald-400 mt-1">+₹2,42,000</div>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#94A3B8] uppercase">Total Outflow</span>
                            <div className="text-base font-bold text-white mt-1">-₹1,84,200</div>
                          </div>
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => router.push("/dashboard/baniya?q=Analyse my spending.")}
                            className="px-4 py-2 rounded-xl bg-[#3D4FE0] hover:scale-105 transition-all text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#3D4FE0]/25"
                          >
                            Ask Baniya about this statement
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {uploadState === "error" && (
                    <div className="border border-rose-500/20 bg-rose-500/5 rounded-xl p-8 flex flex-col items-center justify-center gap-4 text-center">
                      <AlertTriangle className="w-10 h-10 text-rose-400" />
                      <div>
                        <h3 className="text-xs font-bold text-white">Invalid Format</h3>
                        <p className="text-[10px] text-[#94A3B8] mt-1">File must be PDF, CSV, or Excel formatting.</p>
                      </div>
                      <button onClick={() => setUploadState("idle")} className="px-3.5 py-1.5 rounded-lg border border-rose-500/20 text-[10px] text-[#CBD5E1]">
                        Try Again
                      </button>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

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
          </motion.div>
        ) : (
          /* Generate Financial Reports Tab content */
          <motion.div
            key="generate-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left Content column: report summaries & visual distributions */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Period Filter bar and Download/Share actions */}
              <div className="p-4 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <Filter className="w-4 h-4 text-[#3D4FE0]" />
                  <div className="flex gap-1.5 bg-[#0B1020] p-1 border border-white/[0.05] rounded-xl">
                    <button
                      onClick={() => setReportPeriod("monthly")}
                      className={`text-[9px] font-bold uppercase px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                        reportPeriod === "monthly" ? "bg-[#3D4FE0] text-white" : "text-[#94A3B8] hover:text-white"
                      }`}
                    >
                      Monthly Report
                    </button>
                    <button
                      onClick={() => setReportPeriod("yearly")}
                      className={`text-[9px] font-bold uppercase px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                        reportPeriod === "yearly" ? "bg-[#3D4FE0] text-white" : "text-[#94A3B8] hover:text-white"
                      }`}
                    >
                      Yearly Audit
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={isActionLoading !== null}
                    onClick={() => handleActionClick("download")}
                    className="px-3.5 py-1.5 rounded-xl bg-[#3D4FE0] text-xs font-bold text-white flex items-center gap-1.5 hover:scale-105 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isActionLoading === "download" ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                    Download PDF
                  </button>
                  <button
                    disabled={isActionLoading !== null}
                    onClick={() => handleActionClick("share")}
                    className="px-3 py-1.5 rounded-xl border border-white/[0.05] text-xs font-semibold text-[#CBD5E1] hover:bg-white/[0.02] transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isActionLoading === "share" ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Share2 className="w-3.5 h-3.5" />}
                    Share
                  </button>
                </div>
              </div>

              {/* KPI Summary Headers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md">
                  <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Income vs Expenses</span>
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-xs text-emerald-400 font-bold">Inflow: ₹{currentReport.income.toLocaleString()}</span>
                    <span className="text-xs text-[#CBD5E1] font-bold">Outflow: ₹{currentReport.expenses.toLocaleString()}</span>
                  </div>
                </div>
                <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md">
                  <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Savings Rate</span>
                  <h3 className="text-xl font-bold text-[#3D4FE0] mt-2">{currentReport.savingsRate}%</h3>
                  <span className="text-[9px] text-[#94A3B8]">Saved: ₹{currentReport.savings.toLocaleString()}</span>
                </div>
                <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md">
                  <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Asset Yield Returns</span>
                  <h3 className="text-xl font-bold text-emerald-400 mt-2">+{currentReport.yieldReturnPct}%</h3>
                  <span className="text-[9px] text-[#94A3B8]">Yield: ₹{currentReport.yieldReturn.toLocaleString()}</span>
                </div>
              </div>

              {/* Category Breakdown & Progress bars */}
              <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Spending Distributions</h3>
                <div className="flex flex-col gap-4">
                  {currentReport.categories.map((c, idx) => (
                    <div key={idx} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-xs">
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

            </div>

            {/* Sidebar Right Column: Baniya insights and radial score */}
            <div className="flex flex-col gap-6">
              
              {/* Financial Health Score Circle Gauge */}
              <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider mb-4">Financial Health Rating</span>
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="56" cy="56" r="44" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="transparent" />
                    <motion.circle
                      cx="56"
                      cy="56"
                      r="44"
                      stroke="#3D4FE0"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={276}
                      initial={{ strokeDashoffset: 276 }}
                      animate={{ strokeDashoffset: 276 - (276 * currentReport.healthScore) / 100 }}
                      transition={{ duration: 0.8 }}
                    />
                  </svg>
                  <span className="absolute text-2xl font-bold text-white font-mono">
                    {currentReport.healthScore}
                    <span className="text-[10px] text-[#94A3B8]">/100</span>
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full mt-4">
                  {currentReport.healthScore > 80 ? "Optimal Efficiency" : "Satisfactory Yield"}
                </span>
              </div>

              {/* Baniya AI Report insights */}
              <div className="p-5 rounded-2xl border border-[#3D4FE0]/35 bg-[#3D4FE0]/5 relative overflow-hidden flex flex-col gap-3">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#3D4FE0]/10 blur-[40px] rounded-full pointer-events-none" />
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#3D4FE0]" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Baniya Report Summary</h3>
                </div>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  {reportPeriod === "monthly" ? (
                    `" Tanish, your savings rate is at 28.6% this month. Good progress, but you lost ₹8,900 to inactive subscription packages. Let's sweep this surplus to Equity index portfolios before next month starts."`
                  ) : (
                    `"Looking at your FY 2025-26 annual audits, you rebalanced ₹7.2L successfully into smart liquid debt sweeps. Total net portfolio return hit +18.2%, beating traditional FD rates by 11.2%. Very efficient."`
                  )}
                </p>
                <button
                  onClick={() => router.push(`/dashboard/baniya?q=Audit my ${reportPeriod} statements.`)}
                  className="w-full py-2 rounded-xl bg-[#3D4FE0] hover:scale-102 transition-transform text-xs font-bold text-white mt-1 cursor-pointer flex items-center justify-center gap-1.5"
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
