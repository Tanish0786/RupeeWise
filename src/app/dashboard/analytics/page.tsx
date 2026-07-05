"use client";
import { BarChart3 } from "lucide-react";
import { FinancialEmptyState } from "@/components/financial-empty-state";
export default function AnalyticsPage(){return <div className="dashboard-page"><div><h1 className="text-2xl font-bold text-white">Analytics</h1><p className="text-xs text-[#94A3B8] mt-2">Trends and charts generated from your transaction history.</p></div><FinancialEmptyState icon={BarChart3} title="No analytics to display" description="Add a bank statement or transaction history before RupeeWise calculates cash-flow trends, categories, and projections." action="Upload financial data" href="/dashboard/reports" /></div>}
