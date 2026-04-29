"use client";

import React, { useEffect, useMemo, useState } from "react";
import PhotoSection from "./PhotoSection";
import { Product } from "@/types/product.types";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
import ColorSelection from "./ColorSelection";
import SizeSelection from "./SizeSelection";
import AddToCardSection from "./AddToCardSection";
import { productTitle, useLanguage } from "@/lib/language";
import { getSalePrice } from "@/data/products";

const Header = ({ data }: { data: Product }) => {
  const { language, t } = useLanguage();
  const title = productTitle(language, data);
  const variants = useMemo(() => data.variants ?? [], [data.variants]);
  const hasColorOptions = variants.length > 1;
  const [selectedColor, setSelectedColor] = useState(variants[0]?.color ?? "");
  const selectedVariant =
    variants.find((variant) => variant.color === selectedColor) ?? variants[0];
  const firstAvailableSize =
    selectedVariant?.sizes.find((size) => size.stock > 0)?.size ??
    selectedVariant?.sizes[0]?.size ??
    "";
  const [selectedSize, setSelectedSize] = useState(firstAvailableSize);
  const selectedSizeStock =
    selectedVariant?.sizes.find((size) => size.size === selectedSize)?.stock ?? 0;
  const salePrice = getSalePrice(data);

  useEffect(() => {
    setSelectedSize(firstAvailableSize);
  }, [firstAvailableSize, selectedColor]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <PhotoSection data={data} variant={selectedVariant} />
        </div>
        <div>
          <h1
            className={cn([
              integralCF.className,
              "text-2xl md:text-[40px] md:leading-[40px] mb-3 md:mb-3.5 capitalize",
            ])}
          >
            {title}
          </h1>
          <div className="flex items-center mb-3 sm:mb-3.5">
            <Rating
              initialValue={data.rating}
              allowFraction
              SVGclassName="inline-block"
              emptyClassName="fill-gray-50"
              size={25}
              readonly
            />
            <span className="text-black text-xs sm:text-sm ml-[11px] sm:ml-[13px] pb-0.5 sm:pb-0">
              {data.rating.toFixed(1)}
              <span className="text-black/60">/5</span>
            </span>
          </div>
          <div className="flex items-center space-x-2.5 sm:space-x-3 mb-5">
            {data.discount.percentage > 0 ? (
              <span className="font-bold text-black text-2xl sm:text-[32px]">
                ${salePrice}
              </span>
            ) : data.discount.amount > 0 ? (
              <span className="font-bold text-black text-2xl sm:text-[32px]">
                ${salePrice}
              </span>
            ) : (
              <span className="font-bold text-black text-2xl sm:text-[32px]">
                ${data.price}
              </span>
            )}
            {data.discount.percentage > 0 && (
              <span className="font-bold text-black/40 line-through text-2xl sm:text-[32px]">
                ${data.price}
              </span>
            )}
            {data.discount.amount > 0 && (
              <span className="font-bold text-black/40 line-through text-2xl sm:text-[32px]">
                ${data.price}
              </span>
            )}
            {data.discount.percentage > 0 ? (
              <span className="font-medium text-[10px] sm:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                {`-${data.discount.percentage}%`}
              </span>
            ) : (
              data.discount.amount > 0 && (
                <span className="font-medium text-[10px] sm:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                  {`-$${data.discount.amount}`}
                </span>
              )
            )}
          </div>
          <p className="text-sm sm:text-base text-black/60 mb-5">
            {language === "tr" && data.descriptionTr
              ? data.descriptionTr
              : data.description ?? t("productDescription")}
          </p>
          {hasColorOptions && (
            <>
              <hr className="h-[1px] border-t-black/10 mb-5" />
              <ColorSelection
                variants={variants}
                selectedColor={selectedColor}
                onSelect={setSelectedColor}
              />
              <hr className="h-[1px] border-t-black/10 my-5" />
            </>
          )}
          <SizeSelection
            sizes={selectedVariant?.sizes ?? []}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
          />
          <p className="mt-3 text-xs text-black/50">
            {t("stock")}: {selectedSizeStock}
          </p>
          <hr className="hidden md:block h-[1px] border-t-black/10 my-5" />
          <AddToCardSection
            data={data}
            variant={selectedVariant}
            selectedSize={selectedSize}
            stock={selectedSizeStock}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
