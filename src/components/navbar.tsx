"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Menu, X, ArrowRight, Sun, Moon } from "lucide-react";

const NAV_LINKS = [
  { name: "Features", href: "#features" },
  { name: "AI", href: "#ai" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize theme from localStorage on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDarkMode(savedTheme !== "light");
  }, []);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Intersection Observer to highlight active sections on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: "-15% 0px -60% 0px" }
    );

    const sections = ["features", "ai", "pricing", "faq"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[#050816]/80 backdrop-blur-lg border-b border-white/[0.04] shadow-lg shadow-black/20"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D4FE0] rounded-xl p-1">
          <div className="w-9 h-9 rounded-xl bg-[#3D4FE0] flex items-center justify-center shadow-lg shadow-[#3D4FE0]/20 transition-transform duration-300 group-hover:scale-105">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="font-sans font-bold text-xl tracking-tight text-white transition-colors duration-300 group-hover:text-[#3D4FE0]">
            Rupee<span className="font-semibold text-white/90">Wise</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative py-2 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D4FE0] rounded-md ${
                  isActive ? "text-white text-glow" : "text-[#CBD5E1] hover:text-white"
                }`}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.name}
                {/* Premium Hover or Active Indicator */}
                {(hoveredLink === link.name || isActive) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3D4FE0] rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-white/[0.05] bg-[#121826]/40 hover:bg-[#121826]/80 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <a
            href="#login"
            className="text-sm font-semibold text-[#CBD5E1] hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D4FE0] rounded-md px-2 py-1"
          >
            Login
          </a>
          <a
            href="#get-started"
            className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3D4FE0] focus-visible:ring-offset-[#050816]"
          >
            {/* Button Background & Border */}
            <span className="absolute inset-0 w-full h-full bg-[#3D4FE0] transition-transform duration-300 group-hover:scale-105" />
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative flex items-center gap-1.5 z-10">
              Get Started
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#CBD5E1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D4FE0] rounded-lg"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-haspopup="true"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-b border-white/[0.05] bg-[#050816]/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-[#CBD5E1] hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-white/[0.05]" />
              <div className="flex flex-col gap-4">
                <a
                  href="#login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center rounded-xl border border-white/[0.05] text-[#CBD5E1] hover:text-white hover:bg-white/[0.02]"
                >
                  Login
                </a>
                <a
                  href="#get-started"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center rounded-xl bg-[#3D4FE0] text-white font-semibold flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
