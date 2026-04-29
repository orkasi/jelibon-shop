"use client";

import React from "react";
import CategoriesSection from "@/components/shop-page/filters/CategoriesSection";
import ColorsSection from "@/components/shop-page/filters/ColorsSection";
import DressStyleSection from "@/components/shop-page/filters/DressStyleSection";
import PriceSection from "@/components/shop-page/filters/PriceSection";
import SizeSection from "@/components/shop-page/filters/SizeSection";
import BrandSection from "@/components/shop-page/filters/BrandSection";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language";

export type ShopFiltersState = {
  category: string;
  brand: string;
  price: [number, number];
  color: string;
  size: string;
  style: string;
};

type FiltersProps = {
  filters: ShopFiltersState;
  onChange: <K extends keyof ShopFiltersState>(
    key: K,
    value: ShopFiltersState[K]
  ) => void;
  onReset: () => void;
};

const Filters = ({ filters, onChange, onReset }: FiltersProps) => {
  const { t } = useLanguage();

  return (
    <>
      <hr className="border-t-black/10" />
      <CategoriesSection
        selected={filters.category}
        onChange={(category) => onChange("category", category)}
      />
      <hr className="border-t-black/10" />
      <BrandSection
        selected={filters.brand}
        onChange={(brand) => onChange("brand", brand)}
      />
      <hr className="border-t-black/10" />
      <PriceSection
        value={filters.price}
        onChange={(price) => onChange("price", price)}
      />
      <hr className="border-t-black/10" />
      <ColorsSection
        selected={filters.color}
        onChange={(color) => onChange("color", color)}
      />
      <hr className="border-t-black/10" />
      <SizeSection
        selected={filters.size}
        onChange={(size) => onChange("size", size)}
      />
      <hr className="border-t-black/10" />
      <DressStyleSection
        selected={filters.style}
        onChange={(style) => onChange("style", style)}
      />
      <Button
        type="button"
        className="bg-black w-full rounded-full text-sm font-medium py-4 h-12"
        onClick={onReset}
      >
        {t("showAll")}
      </Button>
    </>
  );
};

export default Filters;
