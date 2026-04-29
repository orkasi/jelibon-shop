import ProductListSec from "@/components/common/ProductListSec";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { newArrivalsData, reviewsData, topSellingData } from "@/data/products";

export default function Home() {
  return (
    <>
      <Header />
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="NEW ARRIVALS"
          titleKey="newArrivals"
          data={newArrivalsData}
          viewAllLink="/shop?sort=newest"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="top selling"
            titleKey="topSelling"
            data={topSellingData}
            viewAllLink="/shop?sort=most-popular"
          />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
