"use client";

import { useState } from "react";
import { FileUp, LockKeyhole, Upload } from "lucide-react";

export default function ReportsPage() {
  const [file, setFile] = useState<File | null>(null);
  return <div className="dashboard-page">
    <div><h1 className="text-2xl font-bold text-white">Statements & reports</h1><p className="text-xs text-[#94A3B8] mt-2">Reports are created only from documents you provide.</p></div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <label className="lg:col-span-2 min-h-[22rem] rounded-2xl border border-dashed border-white/[0.12] bg-[#121826]/35 flex flex-col items-center justify-center text-center p-6 sm:p-10 cursor-pointer hover:border-[#3D4FE0]/60 transition-colors">
        <input type="file" accept=".pdf,.csv,.xlsx,.xls" className="sr-only" onChange={(event)=>setFile(event.target.files?.[0] || null)} />
        <div className="w-12 h-12 rounded-2xl bg-[#3D4FE0]/10 text-[#3D4FE0] flex items-center justify-center"><Upload className="w-6 h-6" /></div>
        <h2 className="text-sm font-bold text-white mt-5">{file ? file.name : "Upload your first statement"}</h2>
        <p className="text-xs text-[#94A3B8] mt-2 max-w-md">{file ? "Your file is selected. Connect a secure processing service before importing it into production." : "Choose a PDF, CSV, or spreadsheet. No sample statement or report is loaded."}</p>
        <span className="mt-5 h-10 px-4 rounded-xl bg-[#3D4FE0] text-xs font-bold text-white inline-flex items-center gap-2"><FileUp className="w-4 h-4" /> Choose file</span>
      </label>
      <div className="rounded-2xl border border-white/[0.05] bg-[#121826]/65 p-6 h-fit">
        <LockKeyhole className="w-5 h-5 text-[#3D4FE0]" /><h2 className="text-sm font-bold text-white mt-4">No generated reports</h2><p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">Monthly summaries, tax views, and downloadable reports will appear here after your own data is securely processed.</p>
      </div>
    </div>
  </div>;
}
