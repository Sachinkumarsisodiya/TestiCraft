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
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-brand-accent/30 selection:text-brand-accent overflow-x-hidden">
      
      {/* 🌌 Background Ambient Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-brand-accent/5 blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px]"></div>
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[1000px] h-[400px] rounded-[100%] bg-indigo-500/5 blur-[120px]"></div>
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg2MHY2MEgwekIiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMCAwTDYwIDYwTTAgNjBMNjAgMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-30 mix-blend-overlay"></div>
      </div>

      {/* 🧭 Navigation */}
      <nav className="relative z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#f59e0b"/><path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">TestiCraft</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#templates" className="hover:text-white transition-colors">Templates</a>
            <a href="#login" className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white">Sign In</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center">
        
        {/* 🏆 HERO SECTION */}
        <section className="w-full max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16">
          
          {/* Hero Left: Copy & Login */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-semibold mb-8 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
              Built for Modern Shopify Brands
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 drop-shadow-2xl">
              Turn Reviews Into <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-amber-300">Social Proof</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-400 leading-relaxed mb-10 max-w-lg">
              Beautiful testimonial widgets designed to increase trust, conversions, and sales. Seamlessly integrates with your store in one click.
            </p>
            
            {/* Embedded Login Form in Hero */}
            {showForm && (
              <div id="login" className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                  Install or Log In
                </h3>
                <Form method="post" action="/auth/login" className="flex flex-col gap-4 relative z-10">
                  <div className="relative">
                    <input
                      type="text"
                      name="shop"
                      value={shopUrl}
                      onChange={(e) => setShopUrl(e.currentTarget.value)}
                      placeholder="your-store.myshopify.com"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                      required
                    />
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-brand-accent to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-base py-3.5 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all active:scale-[0.98]">
                    Install TestiCraft
                  </button>
                </Form>
              </div>
            )}
            
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500 font-medium">
              <span className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> No Coding Required</span>
              <span className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 1-Click Install</span>
              <span className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Cancel Anytime</span>
            </div>
          </div>
          
          {/* Hero Right: Floating Previews */}
          <div className="w-full lg:w-1/2 relative min-h-[500px] flex justify-center lg:justify-end perspective-1000">
            {/* Top Floating Card */}
            <div className="absolute top-[10%] right-[15%] w-80 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl transform rotate-[-5deg] animate-[float_5s_ease-in-out_infinite] z-20">
              <div className="flex gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-slate-200 text-sm mb-4 line-clamp-3">"Since installing TestiCraft, our conversion rate jumped by 34%. The widgets look stunning on mobile and integrated perfectly with our theme."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-slate-800"></div>
                <div>
                  <div className="text-white text-sm font-semibold">Alex Rivera</div>
                  <div className="text-slate-400 text-xs">Founder, Lumina Glow</div>
                </div>
              </div>
            </div>
            
            {/* Bottom Floating Card */}
            <div className="absolute bottom-[20%] right-[35%] lg:right-[45%] w-72 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-[3deg] animate-[float_6s_ease-in-out_infinite_1s] z-10">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-2xl">📸</div>
                 <div>
                   <div className="text-white text-sm font-bold">Photo Reviews</div>
                   <div className="text-brand-accent text-xs">Authority Plus Tier</div>
                 </div>
              </div>
              <div className="w-full h-32 rounded-lg bg-slate-800/50 overflow-hidden relative">
                 <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" alt="Product" className="w-full h-full object-cover opacity-70"/>
              </div>
            </div>
            
            {/* Base UI Mockup */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-[450px] bg-slate-900 border border-slate-800 rounded-[30px] shadow-2xl p-2 hidden sm:block z-0 opacity-50 transform rotate-y-[-15deg] rotate-x-[5deg]">
              <div className="w-full h-full border border-slate-800 rounded-[22px] bg-slate-950 overflow-hidden relative">
                <div className="h-10 border-b border-slate-800 flex items-center px-4 gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                </div>
                <div className="p-4 space-y-4">
                   <div className="w-full h-24 bg-slate-900 rounded-xl"></div>
                   <div className="w-full h-32 bg-slate-900 rounded-xl"></div>
                   <div className="w-3/4 h-24 bg-slate-900 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ✨ FEATURES SECTION */}
        <section id="features" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-white/5 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Everything you need to scale</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Premium features designed to build instant credibility without writing a single line of code.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🎨", title: "High-Converting Templates", desc: "Professionally designed layouts that match your brand perfectly." },
              { icon: "📱", title: "Mobile Optimized Widgets", desc: "Flawless rendering on every device to capture mobile shoppers." },
              { icon: "💳", title: "Shopify Native Billing", desc: "Secure, one-click subscriptions integrated directly into your Shopify invoice." },
              { icon: "⚡", title: "Lightning Fast Performance", desc: "Zero impact on your store's page load speed or core web vitals." },
              { icon: "🔍", title: "SEO Friendly Reviews", desc: "Rich snippets that help your store stand out in Google search results." },
              { icon: "🎯", title: "One-Click Installation", desc: "No liquid coding required. Embed directly via Shopify Theme Editor." }
            ].map((feat, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-brand-accent/30 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 via-transparent to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🎠 TEMPLATE SHOWCASE SECTION */}
        <section id="templates" className="w-full bg-slate-900/50 border-t border-white/5 py-24 relative overflow-hidden">
           <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Premium Layouts</h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">From clean minimalist grids to robust visual galleries, pick the style that fits your store.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                   { name: "Starter Spark", tier: "FREE", color: "text-slate-300", bg: "bg-slate-800", desc: "Clean 3-column minimalist layout." },
                   { name: "Growth Boost", tier: "STARTER", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", desc: "Masonry grid with badge integration." },
                   { name: "Authority Plus", tier: "GROWTH", color: "text-brand-accent", bg: "bg-brand-accent/10 border-brand-accent/30", badge: "Most Popular", desc: "Robust photo galleries and Trust Scores." },
                   { name: "Elite Conversion", tier: "PREMIUM", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20", desc: "Video testimonials and carousel displays." }
                 ].map((tpl, i) => (
                   <div key={i} className={`relative p-6 rounded-3xl border ${tpl.bg ? tpl.bg : 'border-white/10 bg-white/5'} backdrop-blur-sm flex flex-col hover:scale-105 transition-transform duration-300 cursor-pointer`}>
                      {tpl.badge && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-accent text-slate-950 text-xs font-bold rounded-full uppercase tracking-wide">
                          {tpl.badge}
                        </div>
                      )}
                      <div className={`text-xs font-bold uppercase tracking-widest ${tpl.color} mb-2`}>{tpl.tier}</div>
                      <h4 className="text-xl font-bold text-white mb-3">{tpl.name}</h4>
                      <p className="text-sm text-slate-400 mb-6 flex-grow">{tpl.desc}</p>
                      
                      {/* Mini Skeleton Preview */}
                      <div className="w-full h-24 rounded-xl bg-slate-950/50 border border-white/5 p-3 flex flex-col gap-2">
                         <div className="flex gap-2">
                           <div className="w-6 h-6 rounded-full bg-white/10"></div>
                           <div className="flex-1 flex flex-col gap-1 justify-center">
                             <div className="w-1/2 h-1.5 rounded-full bg-white/20"></div>
                             <div className="w-1/3 h-1.5 rounded-full bg-white/10"></div>
                           </div>
                         </div>
                         <div className="w-full h-1.5 rounded-full bg-white/10 mt-1"></div>
                         <div className="w-4/5 h-1.5 rounded-full bg-white/10"></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* CTA Footer */}
        <section className="w-full max-w-4xl mx-auto px-6 py-24 text-center">
           <h2 className="text-4xl font-bold text-white mb-6">Ready to boost your credibility?</h2>
           <p className="text-slate-400 text-lg mb-10">Join modern Shopify brands using TestiCraft to convert visitors into loyal customers.</p>
           <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="px-8 py-4 rounded-xl bg-white text-slate-950 font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform">
             Get Started Now
           </button>
        </section>

      </main>

    </div>
  );
}
