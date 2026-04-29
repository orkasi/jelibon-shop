"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language";
import { publicPath } from "@/lib/paths";
import Image from "next/image";
import React from "react";

const TopBanner = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#ff3d8b] text-white text-center py-2 px-2 sm:px-4 xl:px-0">
      <div className="relative max-w-frame mx-auto">
        <p className="text-xs sm:text-sm">{t("signUpOffer")}</p>
        <Button
          variant="ghost"
          className="hover:bg-transparent absolute right-0 top-1/2 -translate-y-1/2 w-fit h-fit p-1 hidden sm:flex"
          size="icon"
          type="button"
          aria-label="close banner"
        >
          <Image
            priority
            src={publicPath("/icons/times.svg")}
            height={13}
            width={13}
            alt="close banner"
          />
        </Button>
      </div>
    </div>
  );
};

export default TopBanner;
