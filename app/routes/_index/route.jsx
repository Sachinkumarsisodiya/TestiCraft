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
    <div className="min-h-screen bg-[#030303] text-slate-50 font-sans selection:bg-[#e13a9d]/30 selection:text-[#e13a9d] overflow-x-hidden flex flex-col relative">
      
      {/* 🌌 Premium Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwekIiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMCAwTDQwIDQwTTAgNDBMNDAgMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvc3ZnPg==')] opacity-[0.15]"></div>
        
        {/* Animated Glowing Orbs */}
        <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] rounded-full bg-[#9b51e0]/10 blur-[120px] animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#e13a9d]/10 blur-[120px] animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>
        
        {/* Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)]"></div>
      </div>

      {/* 🧭 Navigation */}
      <nav className="relative z-50 p-6 w-full max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9b51e0] to-[#e13a9d] p-[1px] group-hover:shadow-[0_0_20px_rgba(225,58,157,0.4)] transition-all">
            <div className="w-full h-full bg-[#0a0a0a] rounded-[7px] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#grad)"/><defs><linearGradient id="grad" x1="2" y1="2" x2="22" y2="22"><stop stopColor="#9b51e0"/><stop offset="1" stopColor="#e13a9d"/></linearGradient></defs></svg>
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">TestiCraft</span>
        </div>
      </nav>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 py-12 lg:py-24">
        
        {/* 🏆 HERO SECTION */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-white/60 text-xs font-medium mb-8 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e13a9d] animate-pulse"></span>
            Shopify App Store Native
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-[84px] font-extrabold text-white leading-[1.05] tracking-tight mb-6 drop-shadow-2xl">
            Elevate Your Shopify <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b51e0] via-[#c646b1] to-[#e13a9d] animate-gradient-x">Social Proof</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400/90 mt-4 max-w-2xl font-light leading-relaxed">
            Transform your store's credibility into a high-converting, professional experience in seconds.
          </p>
        </div>

        {/* 🔐 PREMIUM AUTH CARD */}
        {showForm && (
          <div className="w-full max-w-[420px] relative group">
            {/* Ambient card glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9b51e0]/30 to-[#e13a9d]/30 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            
            <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl relative z-20 flex flex-col gap-8">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-white mb-1">Welcome back</h2>
                <p className="text-sm text-slate-500">Enter your domain to log in or install</p>
              </div>

              <Form method="post" action="/auth/login" className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                    Shopify Domain
                  </label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-[#e13a9d] transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    </div>
                    <input
                      type="text"
                      name="shop"
                      value={shopUrl}
                      onChange={(e) => setShopUrl(e.currentTarget.value)}
                      placeholder="your-store.myshopify.com"
                      className="w-full bg-[#111111]/80 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#e13a9d]/50 focus:ring-1 focus:ring-[#e13a9d]/50 focus:bg-[#151515] transition-all text-sm shadow-inner"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="relative w-full overflow-hidden rounded-xl group/btn mt-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#9b51e0] to-[#e13a9d] opacity-90 group-hover/btn:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)]"></div>
                  <div className="relative flex items-center justify-center gap-2 py-3.5 text-white font-bold text-sm shadow-[0_0_20px_rgba(225,58,157,0.3)] group-hover/btn:shadow-[0_0_30px_rgba(225,58,157,0.5)] transition-shadow">
                    Install App
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>
                </button>
              </Form>
            </div>
          </div>
        )}
      </main>

    </div>
  );
}
