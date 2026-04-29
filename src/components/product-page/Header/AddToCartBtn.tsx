"use client";

import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useAppDispatch } from "@/lib/hooks/redux";
import { Product, ProductVariant } from "@/types/product.types";
import React from "react";
import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";

const AddToCartBtn = ({
  data,
  variant,
  selectedSize,
  disabled,
}: {
  data: Product & { quantity: number };
  variant?: ProductVariant;
  selectedSize: string;
  disabled?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "bg-black w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white hover:bg-black/80 transition-all",
        disabled && "cursor-not-allowed bg-black/30 hover:bg-black/30"
      )}
      onClick={() =>
        variant &&
        dispatch(
          addToCart({
            id: data.id,
            name: data.title,
            nameTr: data.titleTr,
            srcUrl: variant.image,
            price: data.price,
            attributes: [selectedSize, variant.color],
            colorTr: variant.colorTr,
            discount: data.discount,
            quantity: data.quantity,
          })
        )
      }
    >
      {t("addToCart")}
    </button>
  );
};

export default AddToCartBtn;
