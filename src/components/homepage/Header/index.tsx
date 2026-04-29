"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/lib/language";
import { publicPath } from "@/lib/paths";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as motion from "framer-motion/client";

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="bg-[#F2F0F1] pt-10 md:pt-24 overflow-hidden">
      <div className="md:max-w-frame mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <section className="max-w-frame px-4">
          <motion.h2
            initial={{ y: "100px", opacity: 0, rotate: 10 }}
            whileInView={{ y: "0", opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn([
              integralCF.className,
              "text-4xl lg:text-[64px] lg:leading-[64px] mb-5 lg:mb-8",
            ])}
          >
            {t("heroTitle")}
          </motion.h2>
          <motion.p
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-black/60 text-sm lg:text-base mb-6 lg:mb-8 max-w-[545px]"
          >
            {t("heroBody")}
          </motion.p>
          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Link
              href="/shop"
              className="w-full md:w-52 mb-5 md:mb-12 inline-block whitespace-nowrap text-center bg-black hover:bg-[#ff3d8b] transition-all text-white px-14 py-4 rounded-full hover:animate-pulse"
            >
              {t("shopNow")}
            </Link>
          </motion.div>
          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex md:h-full md:max-h-11 lg:max-h-[52px] xl:max-h-[68px] items-center justify-center md:justify-start flex-wrap sm:flex-nowrap md:space-x-3 lg:space-x-6 xl:space-x-8 md:mb-[116px]"
          >
            <div className="flex flex-col">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2 text-[#ff3d8b]">
                <AnimatedCounter from={0} to={10} />+
              </span>
              <span className="text-xs xl:text-base text-black/60 text-nowrap">
                {t("internationalBrands")}
              </span>
            </div>
            <Separator
              className="ml-6 md:ml-0 h-12 md:h-full bg-black/10"
              orientation="vertical"
            />
            <div className="flex flex-col ml-6 md:ml-0">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2 text-[#7c3aed]">
                <AnimatedCounter from={0} to={250} />+
              </span>
              <span className="text-xs xl:text-base text-black/60 text-nowrap">
                {t("highQualityProducts")}
              </span>
            </div>
            <Separator
              className="hidden sm:block sm:h-12 md:h-full ml-6 md:ml-0 bg-black/10"
              orientation="vertical"
            />
            <div className="flex flex-col w-full text-center sm:w-auto sm:text-left mt-3 sm:mt-0 sm:ml-6 md:ml-0">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2 text-[#06b6d4]">
                <AnimatedCounter from={0} to={1200} />+
              </span>
              <span className="text-xs xl:text-base text-black/60 text-nowrap">
                {t("happyCustomers")}
              </span>
            </div>
          </motion.div>
        </section>
        <motion.section
          initial={{ y: "100px", opacity: 0, rotate: 10 }}
          whileInView={{ y: "0", opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2.3, duration: 0.8 }}
          className="homepage-hero-visual relative md:px-4 min-h-[448px] md:min-h-[428px] bg-cover bg-top xl:bg-[center_top_-1.6rem] bg-no-repeat"
          style={
            {
              "--hero-mobile-image": `url('${publicPath("/images/header-res-homepage.png")}')`,
              "--hero-desktop-image": `url('${publicPath("/images/header-homepage.png")}')`,
            } as React.CSSProperties
          }
        >
          <Image
            priority
            src={publicPath("/icons/big-star.svg")}
            height={104}
            width={104}
            alt="big star"
            className="absolute right-7 xl:right-0 top-12 h-[76px] w-[76px] lg:h-24 lg:w-24 xl:h-[104px] xl:w-[104px] animate-[spin_4s_infinite]"
          />
          <Image
            priority
            src={publicPath("/icons/small-star.svg")}
            height={56}
            width={56}
            alt="small star"
            className="absolute left-7 md:left-0 top-36 sm:top-64 md:top-44 lg:top-56 h-11 w-11 md:h-14 md:w-14 animate-[spin_3s_infinite]"
          />
        </motion.section>
      </div>
    </header>
  );
};

export default Header;
