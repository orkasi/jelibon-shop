import { cn } from "@/lib/utils";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { useLanguage } from "@/lib/language";
import { ProductVariant } from "@/types/product.types";

const ColorSelection = ({
  variants,
  selectedColor,
  onSelect,
}: {
  variants: ProductVariant[];
  selectedColor: string;
  onSelect: (color: string) => void;
}) => {
  const { language, t } = useLanguage();

  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-black/60 mb-4">
        {t("selectColors")}
      </span>
      <div className="flex items-center flex-wrap space-x-3 sm:space-x-4">
        {variants.map((variant, index) => (
          <button
            key={index}
            type="button"
            aria-label={language === "tr" ? variant.colorTr : variant.color}
            className={cn([
              variant.colorCode,
              "rounded-full w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center",
            ])}
            onClick={() => onSelect(variant.color)}
          >
            {selectedColor === variant.color && (
              <IoMdCheckmark className="text-base text-white" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelection;
