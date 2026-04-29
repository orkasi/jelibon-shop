"use client";

import React from "react";
import { CopyKey, useLanguage } from "@/lib/language";

export type SpecItem = {
  labelKey: CopyKey;
  valueKey: CopyKey;
};

const specsData: SpecItem[] = [
  {
    labelKey: "material",
    valueKey: "materialValue",
  },
  {
    labelKey: "care",
    valueKey: "careValue",
  },
  {
    labelKey: "fit",
    valueKey: "fitValue",
  },
  {
    labelKey: "pattern",
    valueKey: "patternValue",
  },
];

const ProductDetails = () => {
  const { t } = useLanguage();

  return (
    <>
      {specsData.map((item, i) => (
        <div className="grid grid-cols-3" key={i}>
          <div>
            <p className="text-sm py-3 w-full leading-7 lg:py-4 pr-2 text-neutral-500">
              {t(item.labelKey)}
            </p>
          </div>
          <div className="col-span-2 py-3 lg:py-4 border-b">
            <p className="text-sm w-full leading-7 text-neutral-800 font-medium">
              {t(item.valueKey)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductDetails;
