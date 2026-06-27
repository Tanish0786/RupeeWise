"use client";

import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    { title: "FY 2025-26 Tax Loss Harvesting Summary", size: "1.2 MB", format: "PDF" },
    { title: "Q3 Asset Allocation & Rebalance Audit", size: "480 KB", format: "PDF" },
    { title: "Consolidated Wealth Statement (May 2026)", size: "2.4 MB", format: "PDF" }
  ];

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#3D4FE0]" />
          Financial & Tax Reports
        </h1>
        <p className="text-xs text-[#94A3B8] mt-1">Download official statements, capital gains logs, and rebalance audits.</p>
      </div>

      <div className="p-5 rounded-2xl border border-white/[0.05] bg-[#121826]/65 backdrop-blur-md flex flex-col gap-4">
        <h2 className="text-sm font-bold text-white mb-2">Available Statements</h2>
        <div className="flex flex-col gap-3">
          {reports.map((r, idx) => (
            <div key={idx} className="flex justify-between items-center p-3.5 rounded-xl border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#3D4FE0]/10 flex items-center justify-center text-[#3D4FE0]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white leading-normal">{r.title}</h3>
                  <p className="text-[10px] text-[#94A3B8] mt-0.5">{r.size} • {r.format}</p>
                </div>
              </div>
              <button className="text-[10px] font-bold text-white bg-[#3D4FE0] px-3.5 py-1.5 rounded-lg hover:scale-105 transition-transform flex items-center gap-1 cursor-pointer">
                Download
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
