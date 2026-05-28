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
  const [shopUrl, setShopUrl] = useState("");
  const { errors } = actionData || loaderData || {};

  return (
    <div className="min-h-screen overflow-hidden bg-[#05050b] font-sans text-white selection:bg-[#b866ff]/25 selection:text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-170px] top-[-190px] h-[540px] w-[540px] rounded-full bg-[#6e3cff]/20 blur-[135px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_22%,rgba(142,95,255,0.13),transparent_28%),linear-gradient(180deg,#070711_0%,#05050b_68%)]" />
      </div>

      <header className="relative z-10 mx-auto flex h-[72px] max-w-[1230px] items-center px-6 sm:px-8 lg:px-10">
        <a href="/" className="flex items-center gap-3" aria-label="TestiCraft home">
          <img src="/logo.png" alt="TestiCraft Logo" className="h-14 w-auto object-contain" />
        </a>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] max-w-[1230px] flex-col items-center px-5 pb-16 pt-[9vh] sm:px-8 sm:pt-[13vh]">
        <section className="w-full text-center">
          <h1 className="mx-auto max-w-[850px] text-[clamp(3rem,7.7vw,4.7rem)] font-extrabold leading-[1.05] tracking-[-0.055em] text-white">
            Elevate Your Shopify
            <span className="block bg-gradient-to-r from-[#9561f2] via-[#be58df] to-[#ea4e98] bg-clip-text text-transparent">
              Social Proof
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[570px] text-[clamp(1.02rem,2.4vw,1.35rem)] font-medium leading-[1.55] text-[#9ca8bd]">
            Transform your store's reviews into a high-converting,
            <span className="block sm:inline"> premium testimonial experience in seconds.</span>
          </p>
        </section>

        <section className="mt-11 w-full max-w-[584px] rounded-[18px] border border-white/[0.14] bg-[#101018]/72 p-6 shadow-[0_28px_95px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:mt-12 sm:p-10">
          <Form method="post" className="space-y-6">
            <div>
              <label htmlFor="shop" className="mb-2.5 block text-left text-[15px] font-bold text-[#d8deea]">
                Shopify Domain
              </label>
              <input
                id="shop"
                type="text"
                name="shop"
                value={shopUrl}
                onChange={(event) => setShopUrl(event.currentTarget.value)}
                placeholder="my-store.myshopify.com"
                className={`h-[54px] w-full rounded-[11px] border bg-[#111625] px-5 text-[16px] font-medium text-white outline-none transition placeholder:text-[#68758b] focus:ring-4 ${
                  errors?.shop
                    ? "border-red-500/80 focus:border-red-400 focus:ring-red-500/10"
                    : "border-[#263047] focus:border-[#9d6cff] focus:ring-[#9d6cff]/12"
                }`}
                required
              />
              {errors?.shop && (
                <p className="mt-2.5 text-left text-[13px] font-medium text-red-400">{errors.shop}</p>
              )}
            </div>

            <button
              type="submit"
              className="h-[54px] w-full rounded-[11px] bg-gradient-to-r from-[#9358ea] to-[#e74da0] text-[16px] font-extrabold text-white shadow-[0_18px_55px_rgba(196,82,207,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_68px_rgba(196,82,207,0.36)] active:translate-y-0"
            >
              Install App
            </button>
          </Form>
        </section>
      </main>
    </div>
  );
}
