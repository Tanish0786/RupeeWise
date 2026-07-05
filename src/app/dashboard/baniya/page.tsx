"use client";

import { Bot, LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function BaniyaPage() {
  return <div className="dashboard-page min-h-[calc(100dvh-5rem)] justify-center">
    <div className="max-w-2xl mx-auto text-center">
      <div className="w-14 h-14 rounded-2xl bg-[#3D4FE0]/10 text-[#3D4FE0] flex items-center justify-center mx-auto"><Bot className="w-7 h-7" /></div>
      <h1 className="text-2xl font-bold text-white mt-6">Baniya needs your financial context</h1>
      <p className="text-sm text-[#94A3B8] leading-relaxed mt-3">AI guidance is intentionally disabled until you provide sufficient transaction, investment, and liability information. This prevents generic or fabricated advice from appearing as personal insight.</p>
      <Link href="/dashboard/reports" className="inline-flex items-center h-11 px-5 rounded-xl bg-[#3D4FE0] text-xs font-bold text-white mt-7">Upload financial information</Link>
      <p className="flex items-center justify-center gap-2 text-[11px] text-[#64748B] mt-5"><LockKeyhole className="w-3.5 h-3.5" /> No prompt is sent and no insight is generated without your data.</p>
    </div>
  </div>;
}
