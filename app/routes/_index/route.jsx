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
  <div className="flex items-center gap-1 text-[#f6c46a]">
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

const Icon = ({ children }) => (
  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.045] text-[#d687ff] shadow-[0_16px_40px_rgba(127,76,255,0.12)]">
    {children}
  </div>
);

const features = [
  {
    title: "Review Widgets",
    desc: "Show polished testimonials, ratings, and buyer stories in conversion-focused layouts.",
    icon: (
      <path d="M5 5h14v10H9l-4 4V5Zm4 4h6M9 12h4" />
    ),
  },
  {
    title: "Template Control",
    desc: "Launch compact grids, premium sliders, quote cards, and high-trust showcase sections.",
    icon: (
      <path d="M4 5h16M4 10h7M4 15h16M15 10h5" />
    ),
  },
  {
    title: "Shopify Native",
    desc: "Install through Shopify, manage plans cleanly, and keep storefront performance light.",
    icon: (
      <path d="M8 8V6a4 4 0 0 1 8 0v2m-9 0h10l-1 11H8L7 8Z" />
    ),
  },
];

const templates = [
  { tier: "FREE", name: "Clean Trust", accent: "from-slate-300 to-white", layout: "list" },
  { tier: "STARTER", name: "Social Strip", accent: "from-[#77d7ff] to-[#8d9cff]", layout: "strip" },
  {
    tier: "GROWTH",
    name: "Authority Wall",
    accent: "from-[#a879ff] to-[#f15aa8]",
    badge: "Most Popular",
    layout: "grid",
  },
  { tier: "PREMIUM", name: "Luxury Carousel", accent: "from-[#f3c96b] to-[#f06cae]", layout: "carousel" },
];

export default function Index() {
  const { showForm } = useLoaderData();
  const [shopUrl, setShopUrl] = useState("");

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#05050c] font-sans text-white selection:bg-[#bd65ff]/25 selection:text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-180px] top-[-190px] h-[520px] w-[520px] rounded-full bg-[#6e3dff]/18 blur-[125px]" />
        <div className="absolute right-[-220px] top-[250px] h-[500px] w-[500px] rounded-full bg-[#e34a9e]/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035)_0,transparent_34%),linear-gradient(180deg,rgba(7,7,18,0)_0%,#05050c_78%)]" />
      </div>

      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#060611]/72 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1230px] items-center justify-between px-5 sm:px-7">
          <a href="/" className="flex items-center gap-3" aria-label="TestiCraft home">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#7f55ff] to-[#ef5b9e] shadow-[0_12px_35px_rgba(151,86,255,0.3)]">
              <svg className="h-[18px] w-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M7 9h10M7 13h6" />
                <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7l-5 3v-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
              </svg>
            </span>
            <span className="text-[19px] font-bold tracking-[-0.02em] text-white">TestiCraft</span>
          </a>

          <div className="hidden items-center gap-8 text-[13px] font-medium text-slate-400 md:flex">
            <a className="transition hover:text-white" href="#features">Features</a>
            <a className="transition hover:text-white" href="#install">Install</a>
            <a className="transition hover:text-white" href="#templates">Templates</a>
          </div>

          <a
            href="#install"
            className="hidden rounded-lg border border-white/10 bg-white/[0.055] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition hover:border-white/18 hover:bg-white/[0.085] sm:inline-flex"
          >
            Get Started
          </a>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="mx-auto grid min-h-[640px] w-full max-w-[1230px] items-center gap-11 px-5 pb-16 pt-16 sm:px-7 sm:pt-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-9 lg:pb-20">
          <div className="mx-auto max-w-[590px] text-center lg:mx-0 lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.045] px-3.5 py-2 text-[12px] font-semibold text-slate-300 shadow-[0_16px_50px_rgba(0,0,0,0.22)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#80ffaa] shadow-[0_0_18px_rgba(128,255,170,0.8)]" />
              Shopify testimonial widgets
            </div>

            <h1 className="text-[clamp(2.35rem,7vw,4.65rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-white">
              Elevate Your Shopify
              <span className="block bg-gradient-to-r from-[#8d61ff] via-[#c55cf3] to-[#ef579e] bg-clip-text pt-2 text-transparent">
                Social Proof
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-[540px] text-[clamp(1rem,2.4vw,1.18rem)] leading-8 text-[#9da7bd] lg:mx-0">
              Turn customer reviews into polished, high-converting testimonial sections that feel native to premium Shopify stores.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <a
                href="#install"
                className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-white px-6 text-[14px] font-bold text-[#090912] shadow-[0_18px_55px_rgba(255,255,255,0.14)] transition hover:-translate-y-0.5 hover:bg-[#f3f4ff] sm:w-auto"
              >
                Install TestiCraft
              </a>
              <a
                href="#templates"
                className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-white/10 bg-white/[0.045] px-6 text-[14px] font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.075] sm:w-auto"
              >
                View Templates
              </a>
            </div>
          </div>

          <div className="relative mx-auto flex min-h-[430px] w-full max-w-[580px] items-center justify-center lg:min-h-[500px]">
            <div className="absolute inset-x-10 top-12 h-72 rounded-full bg-gradient-to-r from-[#7d5cff]/18 to-[#ec5a9d]/16 blur-3xl" />

            <div className="relative w-full rounded-2xl border border-white/[0.095] bg-[#0c0d18]/82 p-3 shadow-[0_32px_90px_rgba(0,0,0,0.46)] backdrop-blur-xl">
              <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#080913]">
                <div className="flex h-11 items-center justify-between border-b border-white/[0.07] bg-white/[0.035] px-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b82]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffc85e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#63df91]" />
                  </div>
                  <div className="h-2 w-28 rounded-full bg-white/10" />
                </div>

                <div className="grid gap-4 p-5 sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.04] p-4">
                    <p className="text-[12px] font-semibold text-slate-400">Reviews collected</p>
                    <div className="mt-4 flex items-end gap-2">
                      <span className="text-4xl font-extrabold tracking-[-0.04em]">2,486</span>
                      <span className="pb-1 text-[12px] font-bold text-[#83f3aa]">+28%</span>
                    </div>
                    <div className="mt-5 flex h-24 items-end gap-2">
                      {[42, 58, 36, 76, 64, 92, 82].map((height, index) => (
                        <span
                          key={index}
                          className="flex-1 rounded-t-md bg-gradient-to-t from-[#8a61ff]/45 to-[#f05aa0]/80"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      ["Maya A.", "The reviews look custom-built for our theme.", "Verified buyer"],
                      ["Daniel K.", "Setup took minutes and the carousel is beautiful.", "Repeat customer"],
                    ].map(([name, text, tag]) => (
                      <div key={name} className="rounded-xl border border-white/[0.075] bg-[#111321]/80 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <StarRating compact />
                          <span className="rounded-full bg-[#1c2a22] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#8ff0b0]">{tag}</span>
                        </div>
                        <p className="text-[13px] leading-5 text-slate-300">"{text}"</p>
                        <p className="mt-3 text-[13px] font-semibold text-white">{name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-1 bottom-8 w-[245px] rounded-2xl border border-white/[0.11] bg-[#111322]/88 p-4 shadow-[0_22px_65px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:-left-6 sm:bottom-10">
              <StarRating />
              <p className="mt-3 text-[13px] leading-6 text-slate-300">"Our store finally has social proof that looks as premium as the products."</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#8b68ff] to-[#f05b9f]" />
                <div>
                  <p className="text-[13px] font-bold text-white">Sarah Jenkins</p>
                  <p className="text-[11px] text-slate-500">Store owner</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-1 top-9 rounded-xl border border-white/[0.09] bg-[#101223]/90 px-4 py-3 shadow-[0_20px_55px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:right-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Trust lift</p>
              <p className="mt-1 text-2xl font-extrabold tracking-[-0.04em] text-white">31%</p>
            </div>
          </div>
        </section>

        {showForm && (
          <section id="install" className="mx-auto w-full max-w-[1230px] px-5 py-10 sm:px-7">
            <div className="mx-auto max-w-[540px] rounded-2xl border border-white/[0.1] bg-[#0d0e18]/86 p-5 shadow-[0_26px_85px_rgba(0,0,0,0.42),0_0_75px_rgba(141,97,255,0.11)] backdrop-blur-xl sm:p-7">
              <Form method="post" action="/auth/login" className="space-y-4">
                <label className="block text-[13px] font-bold text-slate-300" htmlFor="shop">
                  Shopify Domain
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="shop"
                    type="text"
                    name="shop"
                    value={shopUrl}
                    onChange={(event) => setShopUrl(event.currentTarget.value)}
                    placeholder="my-store.myshopify.com"
                    className="h-12 min-w-0 flex-1 rounded-lg border border-white/[0.09] bg-[#111426] px-4 text-[15px] text-white outline-none transition placeholder:text-slate-600 focus:border-[#a879ff]/80 focus:ring-4 focus:ring-[#a879ff]/10"
                    required
                  />
                  <button
                    type="submit"
                    className="h-12 rounded-lg bg-gradient-to-r from-[#875dff] to-[#ed579d] px-6 text-[14px] font-bold text-white shadow-[0_18px_45px_rgba(179,88,224,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_56px_rgba(179,88,224,0.32)] active:translate-y-0"
                  >
                    Install App
                  </button>
                </div>
              </Form>
            </div>
          </section>
        )}

        <section id="features" className="mx-auto w-full max-w-[1230px] px-5 py-16 sm:px-7 sm:py-20">
          <div className="mx-auto mb-10 max-w-[620px] text-center">
            <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-extrabold tracking-[-0.035em] text-white">Built for believable trust</h2>
            <p className="mt-4 text-[15px] leading-7 text-[#9da7bd]">Clean testimonial experiences that support purchase confidence without overpowering your storefront.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="group rounded-2xl border border-white/[0.075] bg-white/[0.035] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.16)] transition duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.055]"
              >
                <Icon>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    {feature.icon}
                  </svg>
                </Icon>
                <h3 className="text-[18px] font-bold tracking-[-0.015em] text-white">{feature.title}</h3>
                <p className="mt-3 text-[14px] leading-6 text-slate-400">{feature.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="templates" className="mx-auto w-full max-w-[1230px] px-5 pb-24 pt-10 sm:px-7">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-[clamp(1.8rem,4vw,2.65rem)] font-extrabold tracking-[-0.035em] text-white">Template showcase</h2>
              <p className="mt-3 max-w-[560px] text-[15px] leading-7 text-[#9da7bd]">Choose testimonial layouts that scale from a first review block to a premium proof engine.</p>
            </div>
            <div className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em] text-slate-400">
              Free to Premium
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {templates.map((template) => (
              <article
                key={template.name}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.075] bg-[#0d0f1a] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.23)] transition duration-300 hover:-translate-y-1.5 hover:border-white/[0.15]"
              >
                {template.badge && (
                  <div className="absolute right-4 top-4 rounded-full bg-white px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#15101d]">
                    {template.badge}
                  </div>
                )}
                <div className={`mb-3 inline-flex bg-gradient-to-r ${template.accent} bg-clip-text text-[11px] font-extrabold uppercase tracking-[0.15em] text-transparent`}>
                  {template.tier}
                </div>
                <h3 className="text-[17px] font-bold tracking-[-0.015em] text-white">{template.name}</h3>

                <div className="mt-5 rounded-xl border border-white/[0.07] bg-[#090b14] p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <StarRating compact />
                    <span className="h-2 w-10 rounded-full bg-white/10" />
                  </div>
                  <div className={template.layout === "grid" ? "grid grid-cols-2 gap-2" : "space-y-2"}>
                    {Array.from({ length: template.layout === "strip" ? 3 : 2 }).map((_, index) => (
                      <div key={index} className="rounded-lg border border-white/[0.055] bg-white/[0.045] p-3">
                        <div className="mb-2 flex items-center gap-2">
                          <span className={`h-6 w-6 rounded-full bg-gradient-to-br ${template.accent}`} />
                          <span className="h-2 w-14 rounded-full bg-white/[0.18]" />
                        </div>
                        <span className="block h-1.5 w-full rounded-full bg-white/10" />
                        <span className="mt-1.5 block h-1.5 w-4/5 rounded-full bg-white/10" />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
