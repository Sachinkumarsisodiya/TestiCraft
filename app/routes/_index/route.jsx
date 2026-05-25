import { redirect, Form, useLoaderData } from "react-router";
import { login } from "../../shopify.server";
import { useState } from "react";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function Index() {
  const { showForm } = useLoaderData();
  const [shopUrl, setShopUrl] = useState("");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-50 font-sans selection:bg-[#c084fc]/30 selection:text-[#c084fc] overflow-x-hidden">
      
      {/* Subtle Background Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-start justify-center">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-[#9333ea]/10 blur-[150px]"></div>
      </div>

      {/* 🧭 1. Premium Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.05]">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-lg font-bold tracking-tight text-white">TestiCraft</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#templates" className="hover:text-white transition-colors">Templates</a>
            <a href="#install" className="hover:text-white transition-colors">Install</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-28 pb-20 flex flex-col items-center">
        
        {/* 🏆 2. Hero Section */}
        <section className="w-full max-w-[1200px] mx-auto px-6 mb-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* LEFT: Copy */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-[1.15] tracking-tight mb-5">
              Elevate Your Shopify <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">Social Proof</span>
            </h1>
            
            <p className="text-[17px] text-[#8892b0] leading-relaxed mb-8 max-w-[480px]">
              Transform your store's credibility into a high-converting, professional testimonial experience in seconds.
            </p>

            <div className="flex items-center gap-4">
              <a href="#install" className="bg-white text-black font-semibold text-sm px-6 py-3 rounded-lg hover:bg-slate-200 transition-colors shadow-lg shadow-white/10">
                Install App
              </a>
              <a href="#templates" className="text-sm font-medium text-slate-300 hover:text-white px-4 py-3 transition-colors">
                View Templates →
              </a>
            </div>
          </div>
          
          {/* RIGHT: Mockup */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] flex justify-center lg:justify-end items-center">
            {/* Base Dashboard Mockup */}
            <div className="w-full max-w-[500px] h-[320px] bg-[#111111] border border-white/10 rounded-xl shadow-2xl relative overflow-hidden flex flex-col">
              {/* Header */}
              <div className="h-10 border-b border-white/10 bg-[#161616] flex items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
              </div>
              {/* Content area */}
              <div className="flex-1 p-6 relative">
                 <div className="w-1/3 h-4 bg-white/10 rounded mb-6"></div>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="h-24 bg-white/5 rounded-lg border border-white/5"></div>
                   <div className="h-24 bg-white/5 rounded-lg border border-white/5"></div>
                 </div>
              </div>
            </div>

            {/* Floating Review Card */}
            <div className="absolute top-1/2 left-[-20px] lg:left-[-40px] transform -translate-y-1/2 w-[280px] bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
              <div className="flex gap-1 text-[#fbbf24] mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-slate-300 text-[13px] leading-relaxed mb-4">"Conversion rates skyrocketed since we added these widgets. Absolute game changer for our store."</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a855f7] to-[#ec4899]"></div>
                <div>
                  <div className="text-white text-[13px] font-medium">Sarah Jenkins</div>
                  <div className="text-slate-500 text-[11px]">Verified Buyer</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🔐 3. Shopify Install Card */}
        {showForm && (
          <section id="install" className="w-full max-w-[1200px] mx-auto px-6 mb-32 flex justify-center">
            <div className="w-full max-w-[440px] bg-[#0f0f0f] border border-white-[0.08] rounded-xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
              <Form method="post" action="/auth/login" className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-slate-300">
                    Shopify Domain
                  </label>
                  <input
                    type="text"
                    name="shop"
                    value={shopUrl}
                    onChange={(e) => setShopUrl(e.currentTarget.value)}
                    placeholder="my-store.myshopify.com"
                    className="w-full bg-[#161616] border border-[#222] rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all text-sm shadow-inner"
                    required
                  />
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-[#9333ea] to-[#db2777] hover:opacity-90 text-white font-medium text-[15px] py-3 rounded-lg shadow-lg shadow-purple-900/20 transition-all active:scale-[0.98]">
                  Install App
                </button>
              </Form>
            </div>
          </section>
        )}

        {/* ✨ 4. Feature Grid */}
        <section id="features" className="w-full max-w-[1200px] mx-auto px-6 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Designed for Conversion</h2>
            <p className="text-[#8892b0] text-[15px] max-w-xl mx-auto">Everything you need to build trust without writing a single line of code.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "High-Converting Templates", desc: "Professionally designed layouts that match your brand perfectly." },
              { title: "Mobile Optimized", desc: "Flawless rendering on every device to capture mobile shoppers." },
              { title: "Shopify Native Billing", desc: "Secure, one-click subscriptions integrated directly into your invoice." }
            ].map((feat, i) => (
              <div key={i} className="p-6 rounded-xl bg-[#111] border border-white/[0.05] hover:border-white/10 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">{feat.title}</h3>
                <p className="text-[#8892b0] text-[14px] leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🎠 5. Template Showcase */}
        <section id="templates" className="w-full max-w-[1200px] mx-auto px-6 mb-20">
           <div className="text-center mb-16">
             <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Premium Layouts</h2>
             <p className="text-[#8892b0] text-[15px] max-w-xl mx-auto">Pick the style that fits your store.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Starter Spark", tier: "FREE", color: "text-slate-400" },
                { name: "Growth Boost", tier: "STARTER", color: "text-blue-400" },
                { name: "Authority Plus", tier: "GROWTH", color: "text-[#a855f7]", badge: "Most Popular" },
                { name: "Elite Suite", tier: "PREMIUM", color: "text-pink-400" }
              ].map((tpl, i) => (
                <div key={i} className="relative p-6 rounded-xl bg-[#111] border border-white/[0.05] hover:border-white/10 transition-colors cursor-pointer">
                   {tpl.badge && (
                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-[#a855f7] text-white text-[11px] font-bold rounded-full uppercase tracking-wide shadow-lg">
                       {tpl.badge}
                     </div>
                   )}
                   <div className={`text-[11px] font-bold uppercase tracking-wider ${tpl.color} mb-2`}>{tpl.tier}</div>
                   <h4 className="text-[17px] font-bold text-white mb-6">{tpl.name}</h4>
                   
                   {/* Skeleton Preview */}
                   <div className="w-full h-[100px] rounded-lg bg-[#161616] border border-white/5 p-3 flex flex-col gap-2.5">
                      <div className="flex gap-2">
                        <div className="w-5 h-5 rounded-full bg-white/10"></div>
                        <div className="flex-1 flex flex-col gap-1.5 justify-center">
                          <div className="w-1/2 h-1 rounded-full bg-white/20"></div>
                          <div className="w-1/3 h-1 rounded-full bg-white/10"></div>
                        </div>
                      </div>
                      <div className="w-full h-1 rounded-full bg-white/10 mt-1"></div>
                      <div className="w-4/5 h-1 rounded-full bg-white/10"></div>
                   </div>
                </div>
              ))}
           </div>
        </section>

      </main>
    </div>
  );
}
