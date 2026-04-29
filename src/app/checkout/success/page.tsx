"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { CompletedOrder, readCompletedOrder } from "@/lib/checkout-storage";
import { T } from "@/lib/language";

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<CompletedOrder | null>(null);

  useEffect(() => {
    setOrder(readCompletedOrder());
  }, []);

  return (
    <main className="bg-[#F2F0F1] pb-20 pt-10 md:pt-16">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <section className="rounded-[32px] bg-white px-6 py-10 shadow-sm md:px-10 md:py-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#ff3d8b]">
            <T k="orderConfirmed" />
          </p>
          <h1 className={cn([integralCF.className, "text-3xl leading-tight text-black md:text-5xl"])}>
            <T k="thankYouOrder" />
          </h1>
          <p className="mt-5 w-full text-base leading-8 text-black/60 md:text-lg">
            <T k="checkoutSuccessIntro" />
          </p>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <article className="rounded-[28px] bg-white px-6 py-7 shadow-sm">
            <h2 className="text-xl font-bold text-black">
              <T k="orderDetails" />
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-black/70 md:text-base">
              <p>
                <span className="font-medium text-black">
                  <T k="orderNumber" />
                </span>{" "}
                {order?.orderNumber ?? "JL-DEMO"}
              </p>
              <p>
                <span className="font-medium text-black">
                  <T k="email" />
                </span>{" "}
                {order?.email ?? "-"}
              </p>
              <p>
                <span className="font-medium text-black">
                  <T k="total" />
                </span>{" "}
                ${order?.total ?? 0}
              </p>
            </div>
          </article>

          <article className="rounded-[28px] bg-white px-6 py-7 shadow-sm">
            <h2 className="text-xl font-bold text-black">
              <T k="whatsNext" />
            </h2>
            <p className="mt-3 text-sm leading-7 text-black/60 md:text-base">
              <T k="checkoutSuccessNext" />
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-black px-6">
                <Link href="/shop">
                  <T k="continueShopping" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-black/10 px-6 text-black"
              >
                <Link href="/customer-support">
                  <T k="customerSupportCta" />
                </Link>
              </Button>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
