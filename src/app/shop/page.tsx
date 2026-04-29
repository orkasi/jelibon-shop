"use client";

import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MobileFilters from "@/components/shop-page/filters/MobileFilters";
import Filters, { ShopFiltersState } from "@/components/shop-page/filters";
import { FiSliders } from "react-icons/fi";
import ProductCard from "@/components/common/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useLanguage } from "@/lib/language";
import { publicPath } from "@/lib/paths";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Product } from "@/types/product.types";
import { getSalePrice, products } from "@/data/products";
import InputGroup from "@/components/ui/input-group";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const pageSize = 24;

const initialFilters: ShopFiltersState = {
  category: "all",
  brand: "all",
  price: [0, 250],
  color: "all",
  size: "all",
  style: "all",
};

const visiblePages = (currentPage: number, totalPages: number) => {
  const pages = new Set<number>([1, totalPages, currentPage]);
  if (currentPage > 1) pages.add(currentPage - 1);
  if (currentPage < totalPages) pages.add(currentPage + 1);
  return [...pages].filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b);
};

const productSearchText = (product: Product) =>
  [
    product.title,
    product.titleTr,
    product.brand,
    product.category,
    product.style,
    product.description,
    product.descriptionTr,
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("tr-TR");

const parseNumber = (value: string | null, fallback: number) => {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export default function ShopPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = useMemo<ShopFiltersState>(
    () => ({
      ...initialFilters,
      category: searchParams.get("category") ?? "all",
      brand: searchParams.get("brand") ?? "all",
      color: searchParams.get("color") ?? "all",
      size: searchParams.get("size") ?? "all",
      style: searchParams.get("style") ?? "all",
      price: [
        parseNumber(searchParams.get("minPrice"), initialFilters.price[0]),
        parseNumber(searchParams.get("maxPrice"), initialFilters.price[1]),
      ],
    }),
    [searchParams]
  );
  const sort = searchParams.get("sort") ?? "most-popular";
  const saleOnly = searchParams.get("sale") === "1";
  const submittedQuery = searchParams.get("search") ?? "";
  const currentPage = Math.max(1, parseNumber(searchParams.get("page"), 1));
  const [query, setQuery] = useState(submittedQuery);

  useEffect(() => {
    setQuery(submittedQuery);
  }, [submittedQuery]);

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const nextQuery = params.toString();
    router.replace(nextQuery ? `/shop?${nextQuery}` : "/shop", { scroll: false });
  };

  const filteredProducts = useMemo(() => {
    const normalizedQuery = submittedQuery.trim().toLocaleLowerCase("tr-TR");
    const filtered = products.filter((product) => {
      const price = getSalePrice(product);
      const hasColor =
        filters.color === "all" ||
        product.variants?.some((variant) => variant.color === filters.color);
      const hasSize =
        filters.size === "all" ||
        product.variants?.some((variant) =>
          variant.sizes.some((size) => size.size === filters.size && size.stock > 0)
        );

      return (
        (!normalizedQuery || productSearchText(product).includes(normalizedQuery)) &&
        (filters.category === "all" || product.category === filters.category) &&
        (filters.brand === "all" || product.brand === filters.brand) &&
        (!saleOnly || product.discount.percentage > 0 || product.discount.amount > 0) &&
        price >= filters.price[0] &&
        price <= filters.price[1] &&
        hasColor &&
        hasSize &&
        (filters.style === "all" || product.style === filters.style)
      );
    });

    return [...filtered].sort((a, b) => {
      const priceA = getSalePrice(a);
      const priceB = getSalePrice(b);

      if (sort === "low-price") return priceA - priceB;
      if (sort === "high-price") return priceB - priceA;
      if (sort === "newest") return b.id - a.id;
      return b.rating - a.rating;
    });
  }, [filters, sort, saleOnly, submittedQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const page = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);
  const startIndex = filteredProducts.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const endIndex = Math.min(page * pageSize, filteredProducts.length);

  const updateFilter = <K extends keyof ShopFiltersState>(
    key: K,
    value: ShopFiltersState[K]
  ) => {
    if (key === "price") {
      const [minPrice, maxPrice] = value as ShopFiltersState["price"];
      updateParams({
        minPrice: minPrice === initialFilters.price[0] ? null : String(minPrice),
        maxPrice: maxPrice === initialFilters.price[1] ? null : String(maxPrice),
        page: null,
      });
      return;
    }

    updateParams({
      [key]: value === initialFilters[key] ? null : String(value),
      page: null,
    });
  };

  const resetFilters = () => {
    setQuery("");
    router.replace("/shop", { scroll: false });
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextQuery = query.trim();
    updateParams({
      search: nextQuery || null,
      page: null,
    });
  };

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex md:space-x-5 items-start">
          <div className="hidden md:block min-w-[295px] max-w-[295px] border border-black/10 rounded-[20px] px-5 md:px-6 py-5 space-y-5 md:space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black text-xl">{t("filters")}</span>
              <FiSliders className="text-2xl text-black/40" />
            </div>
            <Filters filters={filters} onChange={updateFilter} onReset={resetFilters} />
          </div>
          <div className="flex flex-col w-full space-y-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h1 className="font-bold text-2xl md:text-[32px]">
                    {submittedQuery ? t("searchResults") : t("shop")}
                  </h1>
                  <MobileFilters filters={filters} onChange={updateFilter} onReset={resetFilters} />
                </div>
                <form onSubmit={handleSearch} className="flex gap-2">
                  <InputGroup className="bg-[#F0F0F0]">
                    <InputGroup.Text>
                      <Image
                        priority
                        src={publicPath("/icons/search.svg")}
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
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </InputGroup>
                  <Button type="submit" className="h-12 rounded-full bg-black px-6">
                    {t("search")}
                  </Button>
                </form>
              </div>
              <div className="flex flex-col sm:items-center sm:flex-row">
                <span className="text-sm md:text-base text-black/60 mr-3">
                  {startIndex}-{endIndex} / {filteredProducts.length} {t("products")}
                </span>
                <div className="flex items-center">
                  {t("sortBy")}{" "}
                  <Select
                    value={sort}
                    onValueChange={(value) => updateParams({ sort: value, page: null })}
                  >
                    <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most-popular">{t("mostPopular")}</SelectItem>
                      <SelectItem value="newest">{t("newest")}</SelectItem>
                      <SelectItem value="low-price">{t("lowPrice")}</SelectItem>
                      <SelectItem value="high-price">{t("highPrice")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="rounded-[20px] border border-black/10 py-12 text-center text-black/60">
                {t("noProducts")}
              </div>
            )}
            <hr className="border-t-black/10" />
            {filteredProducts.length > 0 && (
              <Pagination className="justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-lg border-black/10"
                  disabled={page === 1}
                  onClick={() => updateParams({ page: page <= 2 ? null : String(page - 1) })}
                >
                  {t("previous")}
                </Button>
                <PaginationContent>
                  {visiblePages(page, totalPages).map((pageNumber, index, list) => (
                    <PaginationItem key={pageNumber}>
                      {index > 0 && pageNumber - list[index - 1] > 1 ? (
                        <span className="px-2 text-black/50">...</span>
                      ) : null}
                      <PaginationLink
                        href="#"
                        className="text-black/50 font-medium text-sm"
                        isActive={pageNumber === page}
                        onClick={(event) => {
                          event.preventDefault();
                          updateParams({ page: pageNumber === 1 ? null : String(pageNumber) });
                        }}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </PaginationContent>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-lg border-black/10"
                  disabled={page === totalPages}
                  onClick={() => updateParams({ page: String(page + 1) })}
                >
                  {t("next")}
                </Button>
              </Pagination>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
