"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RootState } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { T, productTitle, useLanguage } from "@/lib/language";
import { clearCart } from "@/lib/features/carts/cartsSlice";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { saveCompletedOrder } from "@/lib/checkout-storage";

type CheckoutForm = {
  name: string;
  email: string;
  address: string;
};

const emptyCheckoutForm: CheckoutForm = {
  name: "",
  email: "",
  address: "",
};

const generateOrderNumber = () =>
  `JL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

export default function CheckoutPage() {
  const { cart, totalPrice, adjustedTotalPrice } = useAppSelector(
    (state: RootState) => state.carts
  );
  const { language, t } = useLanguage();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form, setForm] = useState(emptyCheckoutForm);
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<CheckoutForm> = {};
    if (!form.name.trim()) nextErrors.name = t("requiredField");
    if (!form.email.trim()) nextErrors.email = t("requiredField");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = t("invalidEmail");
    }
    if (!form.address.trim()) nextErrors.address = t("requiredField");

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    const orderNumber = generateOrderNumber();
    saveCompletedOrder({
      orderNumber,
      email: form.email.trim(),
      total: Math.round(adjustedTotalPrice),
    });

    dispatch(clearCart());
    router.push("/checkout/success");
  };

  if (!cart || cart.items.length === 0) {
    return (
      <main className="pb-20">
        <div className="max-w-frame mx-auto px-4 xl:px-0 pt-10">
          <div className="rounded-[32px] border border-black/10 bg-white px-6 py-10 text-center shadow-sm md:px-10">
            <h1 className={cn([integralCF.className, "text-3xl text-black md:text-4xl"])}>
              <T k="checkoutTitle" />
            </h1>
            <p className="mt-4 text-base text-black/60 md:text-lg">
              <T k="emptyCart" />
            </p>
            <Button asChild className="mt-6 rounded-full bg-black px-6">
              <Link href="/shop">
                <T k="shop" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F2F0F1] pb-20 pt-10 md:pt-16">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <section className="rounded-[32px] bg-white px-6 py-10 shadow-sm md:px-10 md:py-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#ff3d8b]">
            <T k="checkoutEyebrow" />
          </p>
          <h1 className={cn([integralCF.className, "text-3xl leading-tight text-black md:text-5xl"])}>
            <T k="checkoutTitle" />
          </h1>
          <p className="mt-5 w-full text-base leading-8 text-black/60 md:text-lg">
            <T k="checkoutIntro" />
          </p>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <form
            className="rounded-[28px] bg-white px-6 py-7 shadow-sm"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-bold text-black">
              <T k="contactInformation" />
            </h2>
            <div className="mt-5 space-y-4">
              {(
                [
                  ["name", "fullName"],
                  ["email", "email"],
                  ["address", "address"],
                ] as const
              ).map(([field, label]) => (
                <label key={field} className="block text-sm font-medium text-black">
                  {t(label)}
                  <input
                    type={field === "email" ? "email" : "text"}
                    value={form[field]}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        [field]: event.target.value,
                      }))
                    }
                    className="mt-1 h-11 w-full rounded-full bg-[#F0F0F0] px-4 text-sm outline-none focus:ring-2 focus:ring-black/20"
                  />
                  {errors[field] && (
                    <span className="mt-1 block text-xs text-red-600">
                      {errors[field]}
                    </span>
                  )}
                </label>
              ))}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 h-12 w-full rounded-full bg-[#ff3d8b] text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? t("placingOrder") : t("placeOrder")}
            </Button>
          </form>

          <aside className="rounded-[28px] bg-white px-6 py-7 shadow-sm">
            <h2 className="text-xl font-bold text-black">
              <T k="orderSummary" />
            </h2>
            <div className="mt-5 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={`${item.id}-${item.attributes.join("-")}`}
                  className="flex items-start justify-between gap-4 border-b border-black/10 pb-4"
                >
                  <div>
                    <p className="font-medium text-black">
                      {productTitle(language, {
                        title: item.name,
                        titleTr: item.nameTr,
                      })}
                    </p>
                    <p className="mt-1 text-sm text-black/60">
                      {item.quantity} x ${item.price}
                    </p>
                  </div>
                  <p className="font-bold text-black">
                    ${item.quantity * item.price}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-black/60">
                  <T k="subtotal" />
                </span>
                <span className="font-bold text-black">${totalPrice}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-black/60">
                  <T k="discount" />
                </span>
                <span className="font-bold text-red-600">
                  -${Math.round(totalPrice - adjustedTotalPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-black/60">
                  <T k="deliveryFee" />
                </span>
                <span className="font-bold text-black">
                  <T k="free" />
                </span>
              </div>
              <hr className="border-t-black/10" />
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-black">
                  <T k="total" />
                </span>
                <span className="text-2xl font-bold text-black">
                  ${Math.round(adjustedTotalPrice)}
                </span>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
