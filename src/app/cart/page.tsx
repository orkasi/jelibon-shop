"use client";

import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import ProductCard from "@/components/cart-page/ProductCard";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TbBasketExclamation } from "react-icons/tb";
import React, { FormEvent, useState } from "react";
import { RootState } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import Link from "next/link";
import { T, useLanguage } from "@/lib/language";
import { clearCart } from "@/lib/features/carts/cartsSlice";

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

export default function CartPage() {
  const { cart, totalPrice, adjustedTotalPrice } = useAppSelector(
    (state: RootState) => state.carts
  );
  const { t } = useLanguage();
  const dispatch = useAppDispatch();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [form, setForm] = useState(emptyCheckoutForm);
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});

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

    setIsOrderConfirmed(true);
    setIsCheckoutOpen(false);
    setForm(emptyCheckoutForm);
    dispatch(clearCart());
  };

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        {cart && cart.items.length > 0 ? (
          <>
            <BreadcrumbCart />
            <h2
              className={cn([
                integralCF.className,
                "font-bold text-[32px] md:text-[40px] text-black uppercase mb-5 md:mb-6",
              ])}
            >
              <T k="cartTitle" />
            </h2>
            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start">
              <div className="w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                {cart?.items.map((product, idx, arr) => (
                  <React.Fragment key={idx}>
                    <ProductCard data={product} />
                    {arr.length - 1 !== idx && (
                      <hr className="border-t-black/10" />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                <h6 className="text-xl md:text-2xl font-bold text-black">
                  <T k="orderSummary" />
                </h6>
                <div className="flex flex-col space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">
                      <T k="subtotal" />
                    </span>
                    <span className="md:text-xl font-bold">${totalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">
                      <T k="discount" /> (-
                      {Math.round(
                        ((totalPrice - adjustedTotalPrice) / totalPrice) * 100
                      )}
                      %)
                    </span>
                    <span className="md:text-xl font-bold text-red-600">
                      -${Math.round(totalPrice - adjustedTotalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">
                      <T k="deliveryFee" />
                    </span>
                    <span className="md:text-xl font-bold">
                      <T k="free" />
                    </span>
                  </div>
                  <hr className="border-t-black/10" />
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black">
                      <T k="total" />
                    </span>
                    <span className="text-xl md:text-2xl font-bold">
                      ${Math.round(adjustedTotalPrice)}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <InputGroup className="bg-[#F0F0F0]">
                    <InputGroup.Text>
                      <MdOutlineLocalOffer className="text-black/40 text-2xl" />
                    </InputGroup.Text>
                    <InputGroup.Input
                      type="text"
                      name="code"
                      placeholder={t("promoPlaceholder")}
                      className="bg-transparent placeholder:text-black/40"
                    />
                  </InputGroup>
                  <Button
                    type="button"
                    className="bg-black rounded-full w-full max-w-[119px] h-[48px]"
                  >
                    <T k="apply" />
                  </Button>
                </div>
                <Button
                  type="button"
                  className="text-sm md:text-base font-medium bg-black rounded-full w-full py-4 h-[54px] md:h-[60px] group"
                  onClick={() => setIsCheckoutOpen(true)}
                >
                  <T k="checkout" />{" "}
                  <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                </Button>
                {isCheckoutOpen && (
                  <form
                    className="space-y-3 rounded-[20px] border border-black/10 p-4"
                    onSubmit={handleSubmit}
                  >
                    <h6 className="text-base font-bold text-black">
                      <T k="contactInformation" />
                    </h6>
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
                    <Button
                      type="submit"
                      className="h-12 w-full rounded-full bg-[#ff3d8b] text-white hover:bg-black"
                    >
                      <T k="placeOrder" />
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center flex-col text-gray-300 mt-32">
            {isOrderConfirmed ? (
              <>
                <span className="block mb-2 text-xl font-bold text-black">
                  <T k="orderConfirmed" />
                </span>
                <span className="block mb-4 text-black/60">
                  <T k="orderConfirmedBody" />
                </span>
              </>
            ) : (
              <>
                <TbBasketExclamation strokeWidth={1} className="text-6xl" />
                <span className="block mb-4">
                  <T k="emptyCart" />
                </span>
              </>
            )}
            <Button className="rounded-full w-24" asChild>
              <Link href="/shop">
                <T k="shop" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
