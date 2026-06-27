"use client";

const LOGOS = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "TypeScript",
  "Groq AI",
  "Supabase",
  "Vercel",
  "Framer Motion",
];

export function Trusted() {
  // Duplicate logs to make infinite scrolling seamless
  const duplicatedLogos = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section className="relative py-12 bg-[#0B1020]/40 border-y border-white/[0.03] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
          Powered by Industry-Leading Core Tech
        </h2>
      </div>

      <div className="relative flex w-full overflow-hidden">
        {/* Left and Right glass gradient overlays to fade out the logos at edges */}
        <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />

        {/* Auto Scrolling Track */}
        <div className="flex gap-16 animate-scroll whitespace-nowrap">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo}-${index}`}
              className="flex items-center justify-center text-lg font-bold font-sans tracking-wide text-[#94A3B8] hover:text-white hover:text-glow transition-all duration-300 select-none cursor-default"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
