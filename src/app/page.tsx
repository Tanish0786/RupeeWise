"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Trusted } from "@/components/trusted";
import { Baniya } from "@/components/baniya";
import { Features } from "@/components/features";
import { DashboardShowcase } from "@/components/dashboard-showcase";
import { Statistics } from "@/components/statistics";
import { Testimonials } from "@/components/testimonials";
import { Pricing } from "@/components/pricing";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050816] text-[#F8FAFC]">
      {/* 1. Sticky Navigation */}
      <Navbar />

      {/* 2. Page Content Cascade */}
      <main className="flex-grow">
        {/* Cinematic landing hero */}
        <Hero />

        {/* Core technology list scrolling strip */}
        <Trusted />

        {/* Six premium glass feature cards */}
        <Features />

        {/* Realistic dashboard preview wrapped inside device frame */}
        <DashboardShowcase />

        {/* Counter statistics overview */}
        <Statistics />

        {/* Interactive Baniya chat engine simulator */}
        <Baniya />

        {/* Scrolling testimonial marquee */}
        <Testimonials />

        {/* Subscription cards */}
        <Pricing />

        {/* Accordion FAQ list */}
        <FAQ />
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}
