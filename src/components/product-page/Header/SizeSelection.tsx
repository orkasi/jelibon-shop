import { cn } from "@/lib/utils";
import React from "react";
import { useLanguage } from "@/lib/language";
import { ProductVariantSize } from "@/types/product.types";

const SizeSelection = ({
  sizes,
  selectedSize,
  onSelect,
}: {
  sizes: ProductVariantSize[];
  selectedSize: string;
  onSelect: (size: string) => void;
}) => {
  const { language, t } = useLanguage();
  const sizeLabel = (size: string) => {
    if (language !== "tr") return size;
    return {
      Small: "S",
      Medium: "M",
      Large: "L",
      "X-Large": "XL",
    }[size] ?? size;
  };

  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-black/60 mb-4">
        {t("chooseSize")}
      </span>
      <div className="flex items-center flex-wrap lg:space-x-3">
        {sizes.map((size, index) => (
          <button
            key={index}
            type="button"
            disabled={size.stock <= 0}
            className={cn([
              "bg-[#F0F0F0] flex items-center justify-center px-5 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base rounded-full m-1 lg:m-0 max-h-[46px]",
              selectedSize === size.size && "bg-black font-medium text-white",
              size.stock <= 0 && "cursor-not-allowed opacity-40 line-through",
            ])}
            onClick={() => onSelect(size.size)}
          >
            {sizeLabel(size.size)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelection;
