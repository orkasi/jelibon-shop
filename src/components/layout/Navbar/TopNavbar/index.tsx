"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useLanguage } from "@/lib/language";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const TopNavbar = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(search.trim() ? `/shop?search=${encodeURIComponent(search.trim())}` : "/shop");
  };
  const data: NavMenu = [
    {
      id: 1,
      label: t("shop"),
      type: "MenuList",
      children: [
        {
          id: 11,
          label: t("tshirts"),
          url: "/shop?category=t-shirts",
          description: t("mensClothesDesc"),
        },
        {
          id: 12,
          label: t("shirts"),
          url: "/shop?category=shirts",
          description: t("womensClothesDesc"),
        },
        {
          id: 13,
          label: t("jeans"),
          url: "/shop?category=jeans",
          description: t("kidsClothesDesc"),
        },
        {
          id: 14,
          label: t("polos"),
          url: "/shop?category=polos",
          description: t("bagsShoesDesc"),
        },
      ],
    },
    {
      id: 2,
      type: "MenuItem",
      label: t("onSale"),
      url: "/shop?sale=1&sort=low-price",
      children: [],
    },
    {
      id: 3,
      type: "MenuItem",
      label: t("newArrivals"),
      url: "/shop?sort=newest",
      children: [],
    },
  ];

  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <Link
            href="/"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10",
            ])}
          >
            JELIBON
          </Link>
        </div>
        <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <MenuItem label={item.label} url={item.url} />
                )}
                {item.type === "MenuList" && (
                  <MenuList data={item.children} label={item.label} />
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <form className="hidden md:block flex-1 mr-3 lg:mr-10" onSubmit={handleSearch}>
        <InputGroup className="bg-[#F0F0F0]">
          <InputGroup.Text>
            <Image
              priority
              src="/icons/search.svg"
              height={20}
              width={20}
              alt="search"
              className="min-w-5 min-h-5"
            />
          </InputGroup.Text>
          <InputGroup.Input
            type="search"
            name="search"
            placeholder={t("searchProducts")}
            className="bg-transparent placeholder:text-black/40"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </InputGroup>
        </form>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link href="/shop" className="block md:hidden mr-[14px] p-1">
            <Image
              priority
              src="/icons/search-black.svg"
              height={22}
              width={22}
              alt="search"
              className="h-[22px] w-[22px]"
            />
          </Link>
          <CartBtn />
          <Link href="/account" className="p-1" aria-label={t("account")}>
            <Image
              priority
              src="/icons/user.svg"
              height={22}
              width={22}
              alt="user"
              className="h-[22px] w-[22px]"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
