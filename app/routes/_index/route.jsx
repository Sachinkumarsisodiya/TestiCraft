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
    <div className="min-h-screen bg-[#050505] text-slate-50 font-sans selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden flex flex-col">
      
      {/* 🌌 Subtle Background Glow (Top Left) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-900/20 blur-[150px]"></div>
      </div>

      {/* 🧭 Navigation */}
      <nav className="relative z-50 p-6 w-full">
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-xl font-bold tracking-tight text-white">TestiCraft</span>
        </div>
      </nav>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 py-12 lg:py-24">
        
        {/* 🏆 HERO SECTION */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center mb-12">
          
          <h1 className="text-5xl md:text-6xl lg:text-[80px] font-bold text-white leading-[1.1] tracking-tight mb-4">
            Elevate Your Shopify <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b51e0] to-[#e13a9d]">Social Proof</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mt-6 max-w-2xl font-light">
            Transform your store's credibility into a high-converting, professional experience in seconds.
          </p>
          
        </div>

        {/* 🔐 AUTH CARD */}
        {showForm && (
          <div className="w-full max-w-md bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 shadow-2xl relative z-20">
            <Form method="post" action="/auth/login" className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-300">
                  Shopify Domain
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="shop"
                    value={shopUrl}
                    onChange={(e) => setShopUrl(e.currentTarget.value)}
                    placeholder="my-store.myshopify.com"
                    className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-base"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-[#9b51e0] to-[#e13a9d] hover:opacity-90 text-white font-bold text-base py-3.5 rounded-lg shadow-lg shadow-purple-900/20 transition-all active:scale-[0.98]">
                Install App
              </button>
              
            </Form>
          </div>
        )}

      </main>

    </div>
  );
}
