import { LucideIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinancialEmptyState({ icon: Icon, title, description, action, href = "/dashboard/settings" }: {
  icon: LucideIcon;
  title: string;
  description: string;
  action: string;
  href?: string;
}) {
  return (
    <div className="min-h-[22rem] rounded-2xl border border-dashed border-white/[0.1] bg-[#121826]/35 flex flex-col items-center justify-center text-center p-6 sm:p-10">
      <div className="w-12 h-12 rounded-2xl bg-[#3D4FE0]/10 text-[#3D4FE0] flex items-center justify-center mb-5">
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-base font-bold text-white">{title}</h2>
      <p className="text-xs text-[#94A3B8] leading-relaxed mt-2 max-w-md">{description}</p>
      <Link href={href} className="mt-6 h-10 px-4 rounded-xl bg-[#3D4FE0] text-xs font-bold text-white inline-flex items-center gap-2">
        {action} <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
