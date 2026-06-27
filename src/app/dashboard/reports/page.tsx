"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ArrowRight, UploadCloud, CheckCircle2, AlertTriangle, Sparkles, TrendingUp, RefreshCw } from "lucide-react";
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

    // Simulate progress
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
          Statements & Tax Reports
        </h1>
        <p className="text-xs text-[#94A3B8] mt-1">Upload bank statements to audit capital leakages or download historical tax audits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main interactive Uploader Left area */}
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

              {uploadState === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5"
                >
                  <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <div>
                        <h4 className="text-xs font-bold text-white">Analysis Complete</h4>
                        <p className="text-[10px] text-[#94A3B8] mt-0.5">{fileName} ({fileSize})</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setUploadState("idle")}
                      className="p-1.5 rounded-lg border border-white/[0.05] text-[#94A3B8] hover:text-white"
                      title="Upload another statement"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Summary card visual breakdown */}
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

                    <div className="border-t border-white/[0.03] pt-4 flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-white font-bold text-xs">
                        <Sparkles className="w-4 h-4 text-[#3D4FE0]" />
                        <span>Baniya Statement Insights</span>
                      </div>
                      <p className="text-[11px] text-[#CBD5E1] leading-relaxed">
                        &quot;I audited your transactions. You paid ₹3,240 in recurring subscription renewals that haven't been active in 60 days. Also, your dining out pattern exceeded your default limits by 12%. Let's rebalance this.&quot;
                      </p>
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

        {/* Sidebar right columns: statements logs list */}
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
    </div>
  );
}
