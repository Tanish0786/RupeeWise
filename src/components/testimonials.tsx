"use client";

const TESTIMONIALS = [
  {
    quote: "Baniya AI restructured my equity loan portfolio in minutes, saving me over ₹4.2 Lakhs in unnecessary interest fees.",
    author: "Rohan Verma",
    role: "Founder, PeakScale",
    avatar: "RV",
  },
  {
    quote: "Finally, a wealth platform that actually computes opportunity cost correctly instead of just listing static mutual funds.",
    author: "Sneha Nair",
    role: "VP of Product, Quantify",
    avatar: "SN",
  },
  {
    quote: "The auto-rebalance features feel completely self-driving. I spent years trying to track this on custom spreadsheets.",
    author: "Anish Gupta",
    role: "Tech Lead, Google",
    avatar: "AG",
  },
  {
    quote: "Absolute game-changer for tax harvesting. The system automatically notified me of an arbitrage loss opportunity.",
    author: "Pooja Malhotra",
    role: "Product Manager, Stripe",
    avatar: "PM",
  },
];

export function Testimonials() {
  // Duplicate testimonials for continuous scrolling marquee effect
  const doubleTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="relative py-28 bg-[#050816] overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#3D4FE0]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="inline-block px-3.5 py-1.5 rounded-full border border-[#3D4FE0]/20 bg-[#3D4FE0]/5 text-xs font-semibold text-[#3D4FE0] uppercase tracking-wider mb-4">
          Testimonials
          </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
          Advisory Trusted by Builders
        </h2>
        <p className="text-base sm:text-lg text-[#CBD5E1] max-w-xl mx-auto">
          See how founders, engineers, and financial professionals are automating their capital allocation.
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden">
        {/* Left and Right edge gradients */}
        <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />

        {/* Testimonial Marquee Track */}
        <div className="flex gap-6 animate-scroll whitespace-nowrap">
          {doubleTestimonials.map((t, index) => (
            <div
              key={`${t.author}-${index}`}
              className="inline-block w-80 md:w-96 flex-shrink-0 glass-panel p-6 md:p-8 rounded-2xl whitespace-normal select-none"
            >
              {/* Stars representation */}
              <div className="flex gap-1 mb-4 text-[#3D4FE0]">
                {"★".repeat(5)}
              </div>

              {/* Quote */}
              <p className="text-sm md:text-base text-[#CBD5E1] leading-relaxed mb-6 font-medium italic">
                "{t.quote}"
              </p>

              {/* User details */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#3D4FE0]/25 flex items-center justify-center font-extrabold text-white text-xs md:text-sm">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-white leading-none">{t.author}</h4>
                  <span className="text-[10px] md:text-xs text-[#94A3B8] mt-1 block">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
