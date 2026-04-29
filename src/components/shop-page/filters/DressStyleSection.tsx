"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CopyKey, useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";

type DressStyle = {
  titleKey: CopyKey;
  value: string;
};

const dressStylesData: DressStyle[] = [
  {
    titleKey: "casual",
    value: "casual",
  },
  {
    titleKey: "formal",
    value: "formal",
  },
  {
    titleKey: "party",
    value: "party",
  },
  {
    titleKey: "gym",
    value: "gym",
  },
];

type DressStyleSectionProps = {
  selected: string;
  onChange: (style: string) => void;
};

const DressStyleSection = ({ selected, onChange }: DressStyleSectionProps) => {
  const { t } = useLanguage();

  return (
    <Accordion type="single" collapsible defaultValue="filter-style">
      <AccordionItem value="filter-style" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          {t("dressStyle")}
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex flex-col text-black/60 space-y-0.5">
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
            {dressStylesData.map((dStyle, idx) => (
              <button
                key={idx}
                type="button"
                className={cn([
                  "flex items-center justify-between py-2 text-left",
                  selected === dStyle.value && "font-medium text-black",
                ])}
                onClick={() => onChange(dStyle.value)}
              >
                {t(dStyle.titleKey)} <MdKeyboardArrowRight />
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DressStyleSection;
