"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoMdCheckmark } from "react-icons/io";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language";
import { colorOptions } from "@/data/products";

export type ColorFilter = {
  label: string;
  value: string;
  code: string;
};

export const colorFilters: ColorFilter[] = [
  ...colorOptions.map((color) => ({
    label: color.label,
    value: color.value,
    code: color.code,
  })),
];

type ColorsSectionProps = {
  selected: string;
  onChange: (color: string) => void;
};

const ControlledColorsSection = ({ selected, onChange }: ColorsSectionProps) => {
  const { language, t } = useLanguage();

  return (
    <Accordion type="single" collapsible defaultValue="filter-colors">
      <AccordionItem value="filter-colors" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          {t("colors")}
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex space-2.5 flex-wrap md:grid grid-cols-5 gap-2.5">
            <button
              type="button"
              className={cn([
                "rounded-full w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center border border-black/20 text-[10px] font-medium box-border",
                selected === "all" && "border-2 border-black",
              ])}
              onClick={() => onChange("all")}
            >
              {t("all")}
            </button>
            {colorFilters.map((color) => (
              <button
                key={color.value}
                type="button"
                aria-label={
                  language === "tr"
                    ? colorOptions.find((item) => item.value === color.value)?.labelTr ??
                      color.label
                    : color.label
                }
                className={cn([
                  "rounded-full w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center border border-black/20",
                  color.value === "white" && "border-black/20",
                ])}
                style={{ backgroundColor: color.code }}
                onClick={() => onChange(color.value)}
              >
                {selected === color.value && (
                  <IoMdCheckmark
                    className={cn(
                      "text-base",
                      color.value === "white" || color.value === "cyan"
                        ? "text-black"
                        : "text-white"
                    )}
                  />
                )}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ControlledColorsSection;
