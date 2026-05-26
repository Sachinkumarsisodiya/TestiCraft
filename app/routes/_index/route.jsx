import { redirect, Form, useLoaderData } from "react-router";
import { useState } from "react";
import { login } from "../../shopify.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

const StarRating = ({ compact = false }) => (
  <div className="flex items-center gap-1 text-[#facc15]">
    {Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        aria-hidden="true"
        className={compact ? "h-3.5 w-3.5" : "h-4 w-4"}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.16 2.64c.3-.92 1.6-.92 1.9 0l1.11 3.42a1 1 0 0 0 .95.69h3.6c.96 0 1.36 1.23.58 1.8l-2.91 2.12a1 1 0 0 0-.36 1.11l1.11 3.42c.3.92-.76 1.68-1.54 1.11l-2.91-2.11a1 1 0 0 0-1.18 0L6.6 16.31c-.78.57-1.84-.19-1.54-1.11l1.11-3.42a1 1 0 0 0-.36-1.11L2.9 8.55c-.78-.57-.38-1.8.58-1.8h3.6a1 1 0 0 0 .95-.69l1.13-3.42Z" />
      </svg>
    ))}
  </div>
);

const FeatureIcon = ({ children }) => (
  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#d980ff] shadow-[0_16px_40px_rgba(151,86,255,0.15)]">
    {children}
  </div>
);

const features = [
  {
    title: "Stunning Testimonial Templates",
    desc: "Deploy premium, professionally crafted layouts that perfectly match your store's aesthetic.",
    icon: <path d="M4 5h16M4 10h7M4 15h16M15 10h5" />,
  },
  {
    title: "Mobile Optimized Widgets",
    desc: "Every design is built mobile-first to ensure conversions on all devices and screen sizes.",
    icon: <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />,
  },
  {
    title: "Shopify Native Billing",
    desc: "Seamlessly integrated directly into your Shopify dashboard with secure native billing.",
    icon: <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />,
  },
  {
    title: "High Conversion Layouts",
    desc: "Strategic trust placements designed specifically to reduce bounce rates and increase sales.",
    icon: <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
  },
  {
    title: "Lightning Fast Performance",
    desc: "Zero layout shift and asynchronous loading to keep your storefront speed scores perfect.",
    icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" />,
  },
  {
    title: "Premium SaaS Design",
    desc: "Dark mode, glassmorphism, and cinematic depth standard on all of our premium templates.",
    icon: <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />,
  },
];

export default function Index() {
  const { showForm } = useLoaderData();
  const [shopUrl, setShopUrl] = useState("");

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#05050c] font-sans text-white selection:bg-[#c55cf3]/30 selection:text-white">
      {/* Dynamic Ambient Background Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[600px] w-[600px] rounded-full bg-[#8b5cf6]/10 blur-[150px]" />
        <div className="absolute right-[10%] top-[30%] h-[500px] w-[500px] rounded-full bg-[#ec4899]/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[700px] w-[700px] rounded-full bg-[#3b82f6]/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,12,0)_0%,#05050c_80%)]" />
      </div>

      <nav className="relative z-50 border-b border-white/[0.06] bg-[#05050c]/60 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6 sm:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="TestiCraft home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#8d61ff] to-[#ec4899] shadow-[0_12px_35px_rgba(151,86,255,0.3)]">
              <svg className="h-[20px] w-[20px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
            <span className="text-[22px] font-extrabold tracking-[-0.03em] text-white">TestiCraft</span>
          </a>

          <div className="hidden items-center gap-8 text-[14px] font-semibold text-slate-300 md:flex">
            <a className="transition-colors hover:text-white" href="#features">Features</a>
            <a className="transition-colors hover:text-white" href="#install">Install</a>
          </div>

          <a
            href="#install"
            className="hidden rounded-lg border border-white/10 bg-white/[0.05] px-5 py-2.5 text-[14px] font-bold text-white shadow-[0_12px_35px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-0.5 hover:bg-white/[0.08] sm:inline-flex"
          >
            Get Started
          </a>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="mx-auto flex min-h-[750px] w-full max-w-[1280px] flex-col items-center justify-center px-6 py-20 lg:flex-row lg:justify-between lg:py-0">
          <div className="mb-16 max-w-[620px] text-center lg:mb-0 lg:text-left">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.1em] text-[#d980ff] shadow-[0_16px_50px_rgba(0,0,0,0.2)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#facc15] shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
              Shopify Review Widgets
            </div>

            <h1 className="text-[clamp(2.8rem,6vw,5.5rem)] font-black leading-[1.05] tracking-[-0.04em] text-white">
              Turn Customer <br />
              <span className="bg-gradient-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] bg-clip-text text-transparent">
                Reviews Into Sales
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-[540px] text-[clamp(1.1rem,2vw,1.3rem)] leading-relaxed text-[#94a3b8] lg:mx-0">
              Create beautiful, high-converting testimonial widgets for your Shopify store in minutes. Boost trust and drive conversions with premium social proof.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#install"
                className="inline-flex h-14 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] px-8 text-[15px] font-bold text-white shadow-[0_20px_60px_rgba(217,70,239,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(217,70,239,0.4)] sm:w-auto"
              >
                Install TestiCraft
              </a>
              <a
                href="#features"
                className="inline-flex h-14 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-8 text-[15px] font-bold text-white backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/[0.08] sm:w-auto"
              >
                Explore Features
              </a>
            </div>
          </div>

          <div className="relative w-full max-w-[560px]">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-[#8b5cf6]/20 to-[#ec4899]/20 blur-3xl" />
            <div className="relative flex flex-col gap-5 rounded-[2rem] border border-white/10 bg-[#0d0f1a]/80 p-6 shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-8">
              
              <div className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                <div className="flex items-center justify-between">
                  <StarRating />
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold tracking-wider text-emerald-400">VERIFIED</span>
                </div>
                <p className="text-[15px] leading-relaxed text-slate-300">
                  "Since installing TestiCraft, our conversion rate jumped by 24%. The templates blend perfectly with our premium store aesthetic."
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-[2px]">
                    <div className="h-full w-full rounded-full border border-black bg-[#1e293b]" />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-white">Sarah M.</p>
                    <p className="text-[12px] text-slate-500">Store Owner</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                <div className="flex items-center justify-between">
                  <StarRating />
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-bold tracking-wider text-blue-400">TRUSTED</span>
                </div>
                <p className="text-[15px] leading-relaxed text-slate-300">
                  "The Floating Trust Wall is incredible. Customers can read reviews directly from the product page without scrolling down."
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 p-[2px]">
                    <div className="h-full w-full rounded-full border border-black bg-[#1e293b]" />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-white">James T.</p>
                    <p className="text-[12px] text-slate-500">Marketing Director</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 top-10 rounded-2xl border border-white/10 bg-[#0a0a14]/90 p-4 shadow-[0_30px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Conversion Lift</p>
                <p className="mt-1 bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-3xl font-black text-transparent">+24%</p>
              </div>

            </div>
          </div>
        </section>

        {showForm && (
          <section id="install" className="relative mx-auto w-full max-w-[1280px] px-6 py-24 sm:px-8">
            <div className="absolute inset-0 top-1/2 -z-10 h-64 -translate-y-1/2 bg-[#8b5cf6]/5 blur-[120px]" />
            <div className="mx-auto max-w-[600px] overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-gradient-to-b from-[#0d0f1a]/90 to-[#07080e]/90 shadow-[0_40px_100px_rgba(0,0,0,0.4),0_0_80px_rgba(139,92,246,0.1)] backdrop-blur-2xl">
              <div className="border-b border-white/[0.05] p-8 sm:p-10">
                <h2 className="mb-2 text-center text-2xl font-bold text-white">Connect Your Store</h2>
                <p className="text-center text-[15px] text-slate-400">Enter your Shopify domain to install TestiCraft</p>
              </div>
              <div className="p-8 sm:p-10">
                <Form method="post" action="/auth/login" className="flex flex-col gap-5">
                  <div className="group relative">
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] opacity-20 blur transition duration-500 group-hover:opacity-40" />
                    <input
                      id="shop"
                      type="text"
                      name="shop"
                      value={shopUrl}
                      onChange={(event) => setShopUrl(event.currentTarget.value)}
                      placeholder="your-store.myshopify.com"
                      className="relative h-14 w-full rounded-xl border border-white/[0.08] bg-[#05050c] px-5 text-[16px] text-white outline-none transition placeholder:text-slate-600 focus:border-[#d946ef] focus:ring-1 focus:ring-[#d946ef]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="relative h-14 w-full rounded-xl bg-white text-[16px] font-bold text-black transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(255,255,255,0.15)] active:translate-y-0"
                  >
                    Install TestiCraft
                  </button>
                </Form>
              </div>
            </div>
          </section>
        )}

        <section id="features" className="mx-auto w-full max-w-[1280px] px-6 py-24 sm:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-[-0.03em] text-white">Built for Elite Merchants</h2>
            <p className="mx-auto mt-5 max-w-[600px] text-[16px] leading-relaxed text-slate-400">
              Everything you need to showcase social proof beautifully without compromising your store's aesthetic or load speed.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="group relative overflow-hidden rounded-[2rem] border border-white/[0.05] bg-[#0a0a14]/50 p-8 transition duration-500 hover:-translate-y-2 hover:border-white/[0.1] hover:bg-[#0d0f1a]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#ec4899]/5 opacity-0 transition duration-500 group-hover:opacity-100" />
                <FeatureIcon>
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {feature.icon}
                  </svg>
                </FeatureIcon>
                <h3 className="relative z-10 text-[20px] font-bold tracking-tight text-white">{feature.title}</h3>
                <p className="relative z-10 mt-4 text-[15px] leading-relaxed text-slate-400">{feature.desc}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
