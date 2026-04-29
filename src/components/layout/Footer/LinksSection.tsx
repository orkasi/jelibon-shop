"use client";

import React from "react";
import { FooterLinks } from "./footer.types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CopyKey, useLanguage } from "@/lib/language";

const footerLinksData: FooterLinks[] = [
  {
    id: 1,
    title: "footerShop",
    children: [
      {
        id: 11,
        label: "newArrivals",
        url: "/shop?sort=newest",
      },
      {
        id: 12,
        label: "topSelling",
        url: "/shop?sort=most-popular",
      },
      {
        id: 13,
        label: "onSale",
        url: "/shop?sale=1",
      },
      {
        id: 14,
        label: "allProducts",
        url: "/shop",
      },
    ],
  },
  {
    id: 2,
    title: "support",
    children: [
      {
        id: 21,
        label: "customerSupport",
        url: "/cart",
      },
      {
        id: 22,
        label: "deliveryDetails",
        url: "/cart",
      },
      {
        id: 23,
        label: "terms",
        url: "/",
      },
      {
        id: 24,
        label: "privacy",
        url: "/",
      },
    ],
  },
];

const LinksSection = () => {
  const { t } = useLanguage();

  return (
    <>
      {footerLinksData.map((item) => (
        <section className="flex flex-col mt-5" key={item.id}>
          <h3 className="font-medium text-sm md:text-base uppercase tracking-widest mb-6">
            {t(item.title as CopyKey)}
          </h3>
          {item.children.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              className={cn([
                link.id !== 41 && link.id !== 43 && "capitalize",
                "text-black/60 text-sm md:text-base mb-4 w-fit",
              ])}
            >
              {t(link.label as CopyKey)}
            </Link>
          ))}
        </section>
      ))}
    </>
  );
};

export default LinksSection;
