"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  LayoutDashboard,
  Sparkles,
  Wallet,
  BarChart3,
  FileText,
  Target,
  Settings,
  Menu,
  Bell,
  Search,
  Sun,
  Moon,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight,
  X,
  CreditCard,
  Lock,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

const SIDEBAR_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Baniya", href: "/dashboard/baniya", icon: Sparkles },
  { name: "Budget", href: "/dashboard/budget", icon: Wallet },
  { name: "Investments", href: "/dashboard/investments", icon: TrendingUp },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Goals", href: "/dashboard/goals", icon: Target },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize theme from localStorage on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.add("light");
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.remove("light");
    }
  }, []);

  // Update theme on state change
  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  // Close dropdowns on click outside (simplified for code size)
  useEffect(() => {
    const handleClose = () => {
      setNotificationsOpen(false);
      setProfileOpen(false);
    };
    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, []);

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#050816] flex text-[#F8FAFC]">
      {/* 1. Sidebar - Desktop */}
      <aside
        className={`hidden md:flex flex-col bg-[#0B1020] border-r border-white/[0.04] transition-all duration-300 relative z-30 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Toggle Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-6 -right-3 w-6 h-6 rounded-full bg-[#121826] border border-white/[0.08] flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#3D4FE0] transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>

        {/* Brand/Logo Section */}
        <div className="h-20 flex items-center px-6 border-b border-white/[0.04]">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-[#3D4FE0] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#3D4FE0]/20">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <span className="font-sans font-bold text-lg tracking-tight text-white group-hover:text-[#3D4FE0] transition-colors">
                Rupee<span className="font-semibold text-white/90">Wise</span>
              </span>
            )}
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5 overflow-y-auto">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3.5 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? "bg-[#3D4FE0]/15 text-white font-bold border-l-2 border-[#3D4FE0]"
                    : "text-[#94A3B8] hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-[#3D4FE0]" : "group-hover:text-white"}`} />
                {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                
                {/* Collapsed Tooltip */}
                {isCollapsed && (
                  <div className="absolute left-20 bg-[#121826] border border-white/[0.08] text-xs px-2.5 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Segment */}
        <div className="p-4 border-t border-white/[0.04]">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3.5 px-3 py-3 rounded-xl text-[#94A3B8] hover:text-rose-400 hover:bg-rose-500/5 transition-all group ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-semibold">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* 2. Mobile Sidebar Slideover Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-64 bg-[#0B1020] border-r border-white/[0.04] z-50 flex flex-col md:hidden"
            >
              <div className="h-20 flex items-center justify-between px-6 border-b border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#3D4FE0] flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-sans font-bold text-lg text-white">
                    Rupee<span className="font-semibold text-white/90">Wise</span>
                  </span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-[#94A3B8] hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5 overflow-y-auto">
                {SIDEBAR_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3.5 px-3 py-3 rounded-xl transition-all ${
                        isActive ? "bg-[#3D4FE0]/15 text-white font-bold" : "text-[#94A3B8] hover:text-white"
                      }`}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-[#3D4FE0]" : ""}`} />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-white/[0.04]">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3.5 px-3 py-3 rounded-xl text-[#94A3B8] hover:text-rose-400 hover:bg-rose-500/5 transition-all"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-semibold">Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 3. Main Dashboard Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Navigation */}
        <header className="h-20 border-b border-white/[0.04] bg-[#0B1020]/45 backdrop-blur-md relative z-20">
          <div className="app-container h-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-[#94A3B8] hover:text-white md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Search Bar */}
            <div
              className={`hidden sm:flex items-center gap-2.5 px-3.5 h-11 w-64 md:w-80 rounded-xl border transition-all duration-300 ${
                searchFocused ? "border-[#3D4FE0] bg-[#050816]" : "border-white/[0.05] bg-[#050816]/50"
              }`}
            >
              <Search className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
              <input
                type="text"
                placeholder="Search metrics, reports, Baniya AI rules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="bg-transparent border-none text-xs text-white placeholder-[#94A3B8] focus:outline-none w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Mock Dark/Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-white/[0.05] bg-[#121826]/40 hover:bg-[#121826]/80 text-[#94A3B8] hover:text-white transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setNotificationsOpen(!notificationsOpen);
                  setProfileOpen(false);
                }}
                className="p-2.5 rounded-xl border border-white/[0.05] bg-[#121826]/40 hover:bg-[#121826]/80 text-[#94A3B8] hover:text-white transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#3D4FE0]" />
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-[min(20rem,calc(100vw-2rem))] bg-[#121826] border border-white/[0.08] rounded-2xl shadow-2xl p-4 overflow-hidden z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center pb-3 border-b border-white/[0.04] mb-3">
                      <span className="text-xs font-bold text-white">Notifications</span>
                      <span className="text-[10px] text-[#3D4FE0] font-semibold cursor-pointer">Mark all read</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.03] flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-[#3D4FE0] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] font-bold text-white leading-normal">Baniya AI Recommendation</p>
                          <p className="text-[10px] text-[#94A3B8] mt-0.5">Opportunity detected: Save ₹4,200 on loan restructuring.</p>
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.03] flex items-start gap-2.5">
                        <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] font-bold text-white leading-normal">Deposit Successful</p>
                          <p className="text-[10px] text-[#94A3B8] mt-0.5">₹50,000 added to Liquid Assets core balance.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileOpen(!profileOpen);
                  setNotificationsOpen(false);
                }}
                className="flex items-center gap-2.5 p-1 rounded-full border border-white/[0.05] bg-[#121826]/40 hover:bg-[#121826]/80 text-[#94A3B8] hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#3D4FE0]/25 flex items-center justify-center font-bold text-white text-xs">
                  T
                </div>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-[min(14rem,calc(100vw-2rem))] bg-[#121826] border border-white/[0.08] rounded-2xl shadow-2xl p-2.5 z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-3.5 py-3 border-b border-white/[0.04] mb-2">
                      <p className="text-xs font-bold text-white">Tanish</p>
                      <p className="text-[10px] text-[#94A3B8] mt-0.5">tanish@rupeewise.com</p>
                    </div>
                    <div className="flex flex-col">
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs text-[#CBD5E1] hover:text-white hover:bg-white/[0.02]"
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs text-[#CBD5E1] hover:text-white hover:bg-white/[0.02]"
                      >
                        <CreditCard className="w-4 h-4" />
                        Billing & Plan
                      </Link>
                      <hr className="border-white/[0.04] my-2" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs text-rose-400 hover:bg-rose-500/5"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          </div>
        </header>

        {/* Content Body Pane */}
        <main className="flex-grow overflow-y-auto bg-[#050816]">
          {children}
        </main>
      </div>
    </div>
  );
}
