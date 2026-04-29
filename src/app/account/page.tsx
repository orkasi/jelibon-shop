"use client";

import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";

export default function AccountPage() {
  const { language } = useLanguage();
  const isTurkish = language === "tr";

  return (
    <main className="bg-[#F2F0F1] pb-20 pt-10 md:pt-16">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <section className="rounded-[32px] bg-white px-6 py-10 shadow-sm md:px-10 md:py-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#ff3d8b]">
            {isTurkish ? "Hesap" : "Account"}
          </p>
          <h1
            className={cn([
              integralCF.className,
              "text-3xl leading-tight text-black md:text-5xl",
            ])}
          >
            {isTurkish ? "Hesabım" : "My Account"}
          </h1>
          <p className="mt-5 w-full text-base leading-8 text-black/60 md:text-lg">
            {isTurkish
              ? "Giriş, sipariş geçmişi ve kayıtlı adresler gibi hesap özellikleri yakında burada yer alacak. Şimdilik siparişlerinizi sepet üzerinden tamamlayabilir ve destek için bizimle iletişime geçebilirsiniz."
              : "Account features like sign in, order history, and saved addresses will appear here soon. For now, you can complete orders through the cart and contact us if you need support."}
          </p>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <article className="rounded-[28px] bg-white px-6 py-7 shadow-sm">
            <h2 className="text-xl font-bold text-black">
              {isTurkish ? "Yakında eklenecek" : "Coming soon"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-black/60 md:text-base">
              {isTurkish
                ? "Giriş yapma, hesap oluşturma, sipariş takibi ve kayıtlı teslimat bilgileri gibi özellikler bu sayfada toplanacaktır."
                : "Sign in, account creation, order tracking, and saved delivery details will live on this page once account features are added."}
            </p>
          </article>

          <article className="rounded-[28px] bg-white px-6 py-7 shadow-sm">
            <h2 className="text-xl font-bold text-black">
              {isTurkish ? "Şimdi ne yapabilirsiniz" : "What you can do now"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-black/60 md:text-base">
              {isTurkish
                ? "Ürünleri inceleyebilir, sepetinize ekleyebilir ve destek, teslimat, gizlilik veya kullanım koşulları sayfalarından bilgi alabilirsiniz."
                : "You can continue browsing products, add items to your cart, and use the support, delivery, privacy, or terms pages for store information."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-[#ff3d8b]"
              >
                {isTurkish ? "Mağazaya Git" : "Go to Shop"}
              </Link>
              <Link
                href="/customer-support"
                className="rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-black transition hover:border-black"
              >
                {isTurkish ? "Destek Al" : "Get Support"}
              </Link>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
