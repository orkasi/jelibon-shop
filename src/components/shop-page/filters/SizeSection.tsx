"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language";
import { getCompactSizeLabel } from "@/lib/language-format";
import { sizeOptions } from "@/data/products";

type ControlledSizeSectionProps = {
  selected: string;
  onChange: (size: string) => void;
};

const ControlledSizeSection = ({ selected, onChange }: ControlledSizeSectionProps) => {
  const { language, t } = useLanguage();

  return (
    <Accordion type="single" collapsible defaultValue="filter-size">
      <AccordionItem value="filter-size" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          {t("size")}
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex items-center flex-wrap">
            <button
              type="button"
              className={cn([
                "bg-[#F0F0F0] m-1 flex items-center justify-center px-5 py-2.5 text-sm rounded-full max-h-[39px]",
                selected === "all" && "bg-black font-medium text-white",
              ])}
              onClick={() => onChange("all")}
            >
              {t("all")}
            </button>
            {sizeOptions.map((size, index) => (
              <button
                key={index}
                type="button"
                className={cn([
                  "bg-[#F0F0F0] m-1 flex items-center justify-center px-5 py-2.5 text-sm rounded-full max-h-[39px]",
                  selected === size && "bg-black font-medium text-white",
                ])}
                onClick={() => onChange(size)}
              >
                {getCompactSizeLabel(language, size)}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ControlledSizeSection;
