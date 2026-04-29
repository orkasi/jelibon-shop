"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import * as motion from "framer-motion/client";
import DressStyleCard from "./DressStyleCard";
import { useLanguage } from "@/lib/language";
import { publicPath } from "@/lib/paths";

const DressStyle = () => {
  const { t } = useLanguage();

  return (
    <div className="px-4 xl:px-0">
      <section className="max-w-frame mx-auto bg-[linear-gradient(135deg,#fff4f8_0%,#f3f0ff_48%,#edfbff_100%)] px-6 pb-6 pt-10 md:p-[70px] rounded-[40px] text-center">
        <motion.h2
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn([
            integralCF.className,
            "text-[32px] leading-[36px] md:text-5xl mb-8 md:mb-14 capitalize",
          ])}
        >
          {t("browseByDressStyle")}
        </motion.h2>
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row md:h-[289px] space-y-4 sm:space-y-0 sm:space-x-5 mb-4 sm:mb-5"
        >
          <DressStyleCard
            title={t("casual")}
            url="/shop?style=casual"
            imageUrl={publicPath("/images/optimized/dress-style-1.webp")}
            className="md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px] h-[190px]"
          />
          <DressStyleCard
            title={t("formal")}
            url="/shop?style=formal"
            imageUrl={publicPath("/images/optimized/dress-style-2.webp")}
            className="md:max-w-[684px] h-[190px]"
          />
        </motion.div>
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row md:h-[289px] space-y-5 sm:space-y-0 sm:space-x-5"
        >
          <DressStyleCard
            title={t("party")}
            url="/shop?style=party"
            imageUrl={publicPath("/images/optimized/dress-style-3.webp")}
            className="md:max-w-[684px] h-[190px]"
          />
          <DressStyleCard
            title={t("gym")}
            url="/shop?style=gym"
            imageUrl={publicPath("/images/optimized/dress-style-4.webp")}
            className="md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px] h-[190px]"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default DressStyle;
