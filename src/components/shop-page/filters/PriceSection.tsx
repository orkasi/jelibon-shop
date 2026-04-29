import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { T } from "@/lib/language";

type PriceSectionProps = {
  value: [number, number];
  onChange: (value: [number, number]) => void;
};

const PriceSection = ({ value, onChange }: PriceSectionProps) => {
  return (
    <Accordion type="single" collapsible defaultValue="filter-price">
      <AccordionItem value="filter-price" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          <T k="price" />
        </AccordionTrigger>
        <AccordionContent className="pt-4" contentClassName="overflow-visible">
          <Slider
            value={value}
            min={0}
            max={250}
            step={1}
            label="$"
            onValueChange={(newValue) => onChange([newValue[0], newValue[1]])}
          />
          <div className="mb-3" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;
