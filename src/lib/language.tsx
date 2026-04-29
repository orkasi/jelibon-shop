"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "tr";

export const copy = {
  en: {
    signUpOffer: "Sign up and get 20% off to your first order.",
    signUpNow: "Sign Up Now",
    shop: "Shop",
    mensClothes: "Men's clothes",
    mensClothesDesc: "In attractive and spectacular colors and designs",
    womensClothes: "Women's clothes",
    womensClothesDesc: "Ladies, your style and tastes are important to us",
    kidsClothes: "Kids clothes",
    kidsClothesDesc: "For all ages, with happy and beautiful colors",
    bagsShoes: "Bags and Shoes",
    bagsShoesDesc: "Suitable for men, women and all tastes and styles",
    onSale: "On Sale",
    newArrivals: "New Arrivals",
    brands: "Brands",
    brand: "Brand",
    searchProducts: "Search for products...",
    heroTitle: "FIND CLOTHES THAT MATCHES YOUR STYLE",
    heroBody:
      "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.",
    shopNow: "Shop Now",
    internationalBrands: "International Brands",
    highQualityProducts: "Products",
    happyCustomers: "Happy Customers",
    topSelling: "top selling",
    viewAll: "View All",
    browseByDressStyle: "BROWSE BY DRESS STYLE",
    casual: "Casual",
    formal: "Formal",
    party: "Party",
    gym: "Gym",
    ourHappyCustomers: "OUR HAPPY CUSTOMERS",
    home: "Home",
    cart: "Cart",
    filters: "Filters",
    showingProducts: "Showing 1-10 of 100 Products",
    products: "Products",
    search: "Search",
    searchResults: "Search results",
    page: "Page",
    previous: "Previous",
    next: "Next",
    newest: "Newest",
    sortBy: "Sort by:",
    mostPopular: "Most Popular",
    lowPrice: "Low Price",
    highPrice: "High Price",
    all: "All",
    noProducts: "No products match these filters.",
    showAll: "Show All",
    price: "Price",
    colors: "Colors",
    size: "Size",
    dressStyle: "Dress Style",
    applyFilter: "Apply Filter",
    tshirts: "T-shirts",
    shorts: "Shorts",
    shirts: "Shirts",
    hoodie: "Hoodie",
    polos: "Polos",
    jeans: "Jeans",
    productDescription:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    selectColors: "Select Colors",
    chooseSize: "Choose Size",
    addToCart: "Add to Cart",
    outOfStock: "Out of stock",
    stock: "Stock",
    productDetails: "Product Details",
    ratingReviews: "Rating & Reviews",
    faqs: "FAQs",
    productSpecs: "Product specifications",
    material: "Material composition",
    materialValue: "100% Cotton",
    care: "Care instructions",
    careValue: "Machine wash warm, tumble dry",
    fit: "Fit type",
    fitValue: "Classic Fit",
    pattern: "Pattern",
    patternValue: "Solid",
    allReviews: "All Reviews",
    latest: "Latest",
    mostRelevant: "Most Relevant",
    oldest: "Oldest",
    writeReview: "Write a Review",
    loadMoreReviews: "Load More Reviews",
    postedOn: "Posted on",
    frequentlyAsked: "Frequently asked questions",
    related: "You might also like",
    cartTitle: "your cart",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    discount: "Discount",
    deliveryFee: "Delivery Fee",
    free: "Free",
    total: "Total",
    promoPlaceholder: "Add promo code",
    apply: "Apply",
    checkout: "Go to Checkout",
    contactInformation: "Contact Information",
    fullName: "Full name",
    email: "Email",
    address: "Address",
    placeOrder: "Place Order",
    orderConfirmed: "Order confirmed.",
    orderConfirmedBody: "Your demo order has been received.",
    requiredField: "Please fill in this field.",
    invalidEmail: "Please enter a valid email.",
    emptyCart: "Your shopping cart is empty.",
    itemSize: "Size:",
    itemColor: "Color:",
    newsletter: "STAY UP TO DATE ABOUT OUR LATEST OFFERS",
    emailPlaceholder: "Enter your email address",
    subscribeNewsletter: "Subscribe to Newsletter",
    newsletterSuccess: "You're on the list.",
    footerAbout:
      "We have clothes that suits your style and which you’re proud to wear. From women to men.",
    footerShop: "shop",
    support: "support",
    customerSupport: "customer support",
    deliveryDetails: "delivery details",
    terms: "terms & conditions",
    privacy: "privacy policy",
    allProducts: "all products",
    brown: "Brown",
    green: "Green",
    blue: "Blue",
    small: "Small",
    medium: "Medium",
    large: "Large",
    xlarge: "X-Large",
  },
  tr: {
    signUpOffer: "İlk siparişine özel %20 indirim için kaydol.",
    signUpNow: "Hemen Kaydol",
    shop: "Mağaza",
    mensClothes: "Erkek giyim",
    mensClothesDesc: "Dikkat çeken renkler ve tasarımlarla",
    womensClothes: "Kadın giyim",
    womensClothesDesc: "Tarzına ve zevkine uyacak parçalar",
    kidsClothes: "Çocuk giyim",
    kidsClothesDesc: "Her yaş için canlı ve keyifli seçenekler",
    bagsShoes: "Çanta ve ayakkabı",
    bagsShoesDesc: "Farklı tarzlara kolayca uyum sağlar",
    onSale: "İndirim",
    newArrivals: "Yeni Gelenler",
    brands: "Markalar",
    brand: "Marka",
    searchProducts: "Ürün ara...",
    heroTitle: "TARZINA UYAN KIYAFETLERİ BUL",
    heroBody:
      "Özenle hazırlanmış geniş ürün seçkimizi keşfet; tarzını yansıtan, rahat ve dikkat çekici parçalar seni bekliyor.",
    shopNow: "Alışverişe Başla",
    internationalBrands: "Uluslararası Marka",
    highQualityProducts: "Ürün",
    happyCustomers: "Mutlu Müşteri",
    topSelling: "çok satanlar",
    viewAll: "Tümünü Gör",
    browseByDressStyle: "TARZA GÖRE KEŞFET",
    casual: "Günlük",
    formal: "Şık",
    party: "Parti",
    gym: "Spor",
    ourHappyCustomers: "MUTLU MÜŞTERİLERİMİZ",
    home: "Ana Sayfa",
    cart: "Sepet",
    filters: "Filtreler",
    showingProducts: "100 üründen 1-10 arası gösteriliyor",
    products: "Ürün",
    search: "Ara",
    searchResults: "Arama sonuçları",
    page: "Sayfa",
    previous: "Önceki",
    next: "Sonraki",
    newest: "En Yeni",
    sortBy: "Sırala:",
    mostPopular: "En Popüler",
    lowPrice: "Düşük Fiyat",
    highPrice: "Yüksek Fiyat",
    all: "Tümü",
    noProducts: "Bu filtrelere uygun ürün bulunamadı.",
    showAll: "Tümünü Göster",
    price: "Fiyat",
    colors: "Renkler",
    size: "Beden",
    dressStyle: "Giyim Tarzı",
    applyFilter: "Filtreyi Uygula",
    tshirts: "Tişörtler",
    shorts: "Şortlar",
    shirts: "Gömlekler",
    hoodie: "Hoodie",
    polos: "Pololar",
    jeans: "Jean",
    productDescription:
      "Her ortama rahatça uyum sağlayan bu grafik tişört, yumuşak ve nefes alan kumaşıyla konforu ve stili bir araya getirir.",
    selectColors: "Renk Seç",
    chooseSize: "Beden Seç",
    addToCart: "Sepete Ekle",
    outOfStock: "Stokta yok",
    stock: "Stok",
    productDetails: "Ürün Detayları",
    ratingReviews: "Puan ve Yorumlar",
    faqs: "SSS",
    productSpecs: "Ürün özellikleri",
    material: "Kumaş içeriği",
    materialValue: "%100 Pamuk",
    care: "Bakım talimatları",
    careValue: "Ilık suda makinede yıkayın, düşük ısıda kurutun",
    fit: "Kalıp",
    fitValue: "Klasik kalıp",
    pattern: "Desen",
    patternValue: "Düz",
    allReviews: "Tüm Yorumlar",
    latest: "En Yeni",
    mostRelevant: "En İlgili",
    oldest: "En Eski",
    writeReview: "Yorum Yaz",
    loadMoreReviews: "Daha Fazla Yorum",
    postedOn: "Yayınlanma tarihi",
    frequentlyAsked: "Sıkça sorulan sorular",
    related: "Bunları da beğenebilirsin",
    cartTitle: "sepetin",
    orderSummary: "Sipariş Özeti",
    subtotal: "Ara Toplam",
    discount: "İndirim",
    deliveryFee: "Kargo",
    free: "Ücretsiz",
    total: "Toplam",
    promoPlaceholder: "Promosyon kodu ekle",
    apply: "Uygula",
    checkout: "Ödemeye Geç",
    contactInformation: "İletişim Bilgileri",
    fullName: "Ad Soyad",
    email: "E-posta",
    address: "Adres",
    placeOrder: "Siparişi Tamamla",
    orderConfirmed: "Sipariş onaylandı.",
    orderConfirmedBody: "Demo siparişin alındı.",
    requiredField: "Lütfen bu alanı doldur.",
    invalidEmail: "Geçerli bir e-posta gir.",
    emptyCart: "Sepetin boş.",
    itemSize: "Beden:",
    itemColor: "Renk:",
    newsletter: "EN YENİ TEKLİFLERDEN HABERDAR OL",
    emailPlaceholder: "E-posta adresini gir",
    subscribeNewsletter: "Bültene Abone Ol",
    newsletterSuccess: "Listeye eklendin.",
    footerAbout:
      "Tarzına uyan, rahatça giyebileceğin ve severek kombinleyebileceğin parçalar sunuyoruz.",
    footerShop: "mağaza",
    support: "destek",
    customerSupport: "müşteri desteği",
    deliveryDetails: "teslimat bilgileri",
    terms: "kullanım koşulları",
    privacy: "gizlilik politikası",
    allProducts: "tüm ürünler",
    brown: "Kahverengi",
    green: "Yeşil",
    blue: "Mavi",
    small: "Small",
    medium: "Medium",
    large: "Large",
    xlarge: "X-Large",
  },
} as const;

export type CopyKey = keyof typeof copy.en;

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: CopyKey) => string;
} | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("jelibon-language");
    if (saved === "en" || saved === "tr") setLanguageState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("jelibon-language", nextLanguage);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: CopyKey) => copy[language][key],
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
};

export const T = ({ k }: { k: CopyKey }) => {
  const { t } = useLanguage();
  return <>{t(k)}</>;
};

export const productTitle = (
  language: Language,
  product: { title: string; titleTr?: string }
) => (language === "tr" && product.titleTr ? product.titleTr : product.title);

export const reviewText = (
  language: Language,
  review: { content: string; contentTr?: string }
) => (language === "tr" && review.contentTr ? review.contentTr : review.content);

export const labelByLanguage = (
  language: Language,
  english: string,
  translations: Record<string, string>
) => (language === "tr" ? translations[english] ?? english : english);
