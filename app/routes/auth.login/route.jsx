
import { useState } from "react";
import { Form, useActionData, useLoaderData } from "react-router";
import { login } from "../../shopify.server";
import { loginErrorMessage } from "./error.server";

export const loader = async ({ request }) => {
  const errors = loginErrorMessage(await login(request));

  return { errors };
};

export const action = async ({ request }) => {
  const errors = loginErrorMessage(await login(request));

  return {
    errors,
  };
};

export default function Auth() {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const [shop, setShop] = useState("");
  const { errors } = actionData || loaderData;

  return (
    <div className="min-h-screen flex w-full bg-[#f8fafc] font-sans">
      {/* LEFT PANEL - Marketing / Hero */}
      <div className="hidden lg:flex w-1/2 relative bg-brand-dark overflow-hidden flex-col justify-between p-16">
        {/* Animated Gradient Background Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[150px] mix-blend-screen"></div>

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-white p-2 rounded-xl">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0f172a"/><path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span className="text-white text-2xl font-bold tracking-tight">TestiCraft</span>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-lg mt-12">
          <h1 className="text-5xl font-extrabold text-white leading-[1.1] mb-6">
            Turn Customer Reviews Into <span className="text-brand-accent">Sales</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-12">
            Beautiful, high-converting testimonial widgets for Shopify stores. Build trust instantly and watch your conversion rates soar.
          </p>

          {/* Floating Glass Testimonial */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl animate-float shadow-2xl">
            <div className="flex text-brand-accent mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <p className="text-white font-medium text-lg mb-4">"The best investment I've made for my store. The premium feel is unmatched by competitors."</p>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" className="w-10 h-10 rounded-full border-2 border-white/30" alt="Sarah J." />
              <div>
                <div className="text-white font-semibold text-sm">Sarah Jenkins</div>
                <div className="text-slate-400 text-xs">Founder, TechFlow</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="relative z-10 text-slate-400 text-sm mt-12">
          © {new Date().getFullYear()} TestiCraft. Designed for Shopify.
        </div>
      </div>

      {/* RIGHT PANEL - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
        <div className="w-full max-w-[440px]">
          
          {/* Mobile Logo Header */}
          <div className="lg:hidden flex justify-center mb-10">
            <div className="flex items-center gap-3">
              <div className="bg-brand-dark p-2 rounded-xl">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#ffffff"/><path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span className="text-slate-900 text-3xl font-bold tracking-tight">TestiCraft</span>
            </div>
          </div>

          <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-500 mb-8">Enter your Shopify store domain to log in or install the app.</p>

            <Form method="post" className="space-y-6">
              <div>
                <label htmlFor="shop" className="block text-sm font-semibold text-slate-700 mb-2">
                  Shop Domain
                </label>
                <div className="relative">
                  <input
                    id="shop"
                    name="shop"
                    type="text"
                    value={shop}
                    onChange={(e) => setShop(e.currentTarget.value)}
                    placeholder="example.myshopify.com"
                    autoComplete="on"
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                      errors?.shop ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 focus:border-brand-dark focus:ring-brand-dark/10"
                    }`}
                  />
                  {/* Shopify Logo Icon inside input */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 7.2L16.2 3.8C15.6 3.4 14.8 3.6 14.4 4.1C14 4.7 14.1 5.5 14.7 5.9L17.7 8L15.3 10.3C14.8 10.8 14.8 11.6 15.3 12.1C15.8 12.6 16.6 12.6 17.1 12.1L21.3 7.9C21.6 7.6 21.6 7.2 21 7.2ZM3 7.2L7.8 3.8C8.4 3.4 9.2 3.6 9.6 4.1C10 4.7 9.9 5.5 9.3 5.9L6.3 8L8.7 10.3C9.2 10.8 9.2 11.6 8.7 12.1C8.2 12.6 7.4 12.6 6.9 12.1L2.7 7.9C2.4 7.6 2.4 7.2 3 7.2ZM12 1.5C11.5 1.5 11 1.9 11 2.5V21.5C11 22.1 11.5 22.5 12 22.5C12.5 22.5 13 22.1 13 21.5V2.5C13 1.9 12.5 1.5 12 1.5Z" /></svg>
                  </div>
                </div>
                {errors?.shop && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {errors.shop}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-brand-dark hover:bg-slate-800 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-brand-dark/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Log in with Shopify
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </Form>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Secure Shopify Authentication
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
