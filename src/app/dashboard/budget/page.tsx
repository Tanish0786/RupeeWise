"use client";
import { Wallet } from "lucide-react";
import { FinancialEmptyState } from "@/components/financial-empty-state";
export default function BudgetPage(){return <div className="dashboard-page"><div><h1 className="text-2xl font-bold text-white">Budget</h1><p className="text-xs text-[#94A3B8] mt-2">Create categories and limits around your real spending.</p></div><FinancialEmptyState icon={Wallet} title="Your budget is ready to be built" description="No example categories have been added. Upload transactions first so you can create useful limits based on your actual expenses." action="Add transactions" href="/dashboard/reports" /></div>}
