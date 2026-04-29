"use client";

import { brands } from "@/data/products";
import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type BrandSectionProps = {
  selected: string;
  onChange: (brand: string) => void;
};

const BrandSection = ({ selected, onChange }: BrandSectionProps) => {
  const { t } = useLanguage();

  return (
    <Accordion id="brands" type="single" collapsible defaultValue="filter-brand">
      <AccordionItem value="filter-brand" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          {t("brand")}
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex flex-col text-black/60 space-y-0.5 max-h-48 overflow-y-auto pr-1">
            <button
              type="button"
              className={cn([
                "py-2 text-left",
                selected === "all" && "font-medium text-black",
              ])}
              onClick={() => onChange("all")}
            >
              {t("all")}
            </button>
            {brands.map((brand) => (
              <button
                key={brand}
                type="button"
                className={cn([
                  "py-2 text-left",
                  selected === brand && "font-medium text-black",
                ])}
                onClick={() => onChange(brand)}
              >
                {brand}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default BrandSection;
