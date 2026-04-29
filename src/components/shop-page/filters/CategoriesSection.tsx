"use client";

import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CopyKey, useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";

type Category = {
  titleKey: CopyKey;
  value: string;
};

const categoriesData: Category[] = [
  {
    titleKey: "tshirts",
    value: "t-shirts",
  },
  {
    titleKey: "shorts",
    value: "shorts",
  },
  {
    titleKey: "shirts",
    value: "shirts",
  },
  {
    titleKey: "polos",
    value: "polos",
  },
  {
    titleKey: "jeans",
    value: "jeans",
  },
];

type CategoriesSectionProps = {
  selected: string;
  onChange: (category: string) => void;
};

const CategoriesSection = ({ selected, onChange }: CategoriesSectionProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col space-y-0.5 text-black/60">
      <button
        type="button"
        className={cn([
          "flex items-center justify-between py-2 text-left",
          selected === "all" && "font-medium text-black",
        ])}
        onClick={() => onChange("all")}
      >
        {t("all")} <MdKeyboardArrowRight />
      </button>
      {categoriesData.map((category, idx) => (
        <button
          key={idx}
          type="button"
          className={cn([
            "flex items-center justify-between py-2 text-left",
            selected === category.value && "font-medium text-black",
          ])}
          onClick={() => onChange(category.value)}
        >
          {t(category.titleKey)} <MdKeyboardArrowRight />
        </button>
      ))}
    </div>
  );
};

export default CategoriesSection;
