"use client";

import CartCounter from "@/components/ui/CartCounter";
import React, { useState } from "react";
import AddToCartBtn from "./AddToCartBtn";
import { Product, ProductVariant } from "@/types/product.types";
import { useLanguage } from "@/lib/language";

const AddToCardSection = ({
  data,
  variant,
  selectedSize,
  stock,
}: {
  data: Product;
  variant?: ProductVariant;
  selectedSize: string;
  stock: number;
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { t } = useLanguage();
  const maxQuantity = Math.max(1, Math.min(quantity, stock || 1));

  return (
    <div className="fixed md:relative w-full bg-white border-t md:border-none border-black/5 bottom-0 left-0 p-4 md:p-0 z-10 flex items-center justify-between sm:justify-start md:justify-center">
      <CartCounter onAdd={setQuantity} onRemove={setQuantity} />
      <AddToCartBtn
        data={{ ...data, quantity: maxQuantity }}
        variant={variant}
        selectedSize={selectedSize}
        disabled={!variant || !selectedSize || stock <= 0}
      />
      {stock <= 0 && (
        <span className="absolute -top-6 left-4 md:left-0 text-xs font-medium text-red-600">
          {t("outOfStock")}
        </span>
      )}
    </div>
  );
};

export default AddToCardSection;
