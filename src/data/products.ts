import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";
import { publicPath } from "@/lib/paths";

export const brands = [
  "Jelibon Studio",
  "Nova Thread",
  "Urban Loom",
  "Candy Riot",
  "Metro Mode",
  "Pulse Wear",
  "Northline",
  "Vivid Lab",
  "Mono Club",
  "Arc Supply",
  "Streetform",
  "Luma Goods",
];

const categoryImages = {
  "t-shirts": [
    { color: "black", gallery: [publicPath("/images/pic1.png")] },
    { color: "orange", gallery: [publicPath("/images/pic4.png")] },
    { color: "red", gallery: [publicPath("/images/pic6.png")] },
    { color: "green", gallery: [publicPath("/images/pic9.png"), publicPath("/images/pic10.png"), publicPath("/images/pic11.png")] },
    { color: "purple", gallery: [publicPath("/images/pic13.png")] },
    { color: "white", gallery: [publicPath("/images/pic15.png")] },
  ],
  shirts: [
    { color: "red", gallery: [publicPath("/images/pic3.png")] },
    { color: "green", gallery: [publicPath("/images/pic5.png")] },
  ],
  polos: [
    { color: "blue", gallery: [publicPath("/images/pic12.png")] },
    { color: "pink", gallery: [publicPath("/images/pic14.png")] },
  ],
  jeans: [
    { color: "blue", gallery: [publicPath("/images/pic2.png")] },
    { color: "black", gallery: [publicPath("/images/pic8.png")] },
  ],
  shorts: [
    { color: "blue", gallery: [publicPath("/images/pic7.png")] },
  ],
} as const;

export const colorOptions = [
  { value: "black", label: "Black", labelTr: "Siyah", code: "#000000" },
  { value: "white", label: "White", labelTr: "Beyaz", code: "#FFFFFF" },
  { value: "pink", label: "Pink", labelTr: "Pembe", code: "#DB2777" },
  { value: "blue", label: "Blue", labelTr: "Mavi", code: "#2563EB" },
  { value: "green", label: "Green", labelTr: "Yeşil", code: "#16A34A" },
  { value: "purple", label: "Purple", labelTr: "Mor", code: "#9333EA" },
  { value: "orange", label: "Orange", labelTr: "Turuncu", code: "#EA580C" },
  { value: "brown", label: "Brown", labelTr: "Kahverengi", code: "#4F4631" },
  { value: "cyan", label: "Cyan", labelTr: "Cam Göbeği", code: "#22D3EE" },
  { value: "red", label: "Red", labelTr: "Kırmızı", code: "#DC2626" },
];

export const sizeOptions = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

const productFamilies = [
  {
    category: "t-shirts",
    style: "casual",
    names: [
      ["Minimal Logo T-shirt", "Minimal Logolu Tişört"],
      ["Graphic Street T-shirt", "Grafik Street Tişört"],
      ["Oversized Cotton T-shirt", "Oversize Pamuk Tişört"],
      ["Striped Raglan T-shirt", "Çizgili Raglan Tişört"],
      ["Washed Graphic T-shirt", "Yıkamalı Grafik Tişört"],
    ],
  },
  {
    category: "shirts",
    style: "formal",
    names: [
      ["Checked Flannel Shirt", "Ekose Flanel Gömlek"],
      ["Striped Overshirt", "Çizgili Overshirt"],
      ["Relaxed Button-Up Shirt", "Rahat Düğmeli Gömlek"],
      ["Everyday Street Shirt", "Günlük Street Gömlek"],
      ["Soft Cotton Shirt", "Yumuşak Pamuk Gömlek"],
    ],
  },
  {
    category: "polos",
    style: "casual",
    names: [
      ["Color Block Polo Shirt", "Color Block Polo Yaka Tişört"],
      ["Textured Polo Shirt", "Dokulu Polo Yaka Tişört"],
      ["Contrast Collar Polo", "Kontrast Yakalı Polo"],
      ["Relaxed Knit Polo", "Rahat Örgü Polo"],
      ["Everyday Polo Shirt", "Günlük Polo Yaka Tişört"],
    ],
  },
  {
    category: "jeans",
    style: "casual",
    names: [
      ["Skinny Fit Jeans", "Dar Kalıp Jean"],
      ["Faded Denim Jeans", "Soluk Denim Jean"],
      ["Straight Leg Denim", "Düz Paça Denim"],
      ["Washed Blue Jeans", "Yıkamalı Mavi Jean"],
      ["Loose Fit Denim", "Bol Kalıp Denim"],
    ],
  },
  {
    category: "shorts",
    style: "gym",
    names: [
      ["Loose Denim Shorts", "Bol Denim Şort"],
      ["Everyday Denim Shorts", "Günlük Denim Şort"],
      ["Light Wash Shorts", "Açık Yıkama Şort"],
      ["Relaxed Street Shorts", "Rahat Street Şort"],
      ["Summer Denim Shorts", "Yazlık Denim Şort"],
    ],
  },
];

const styleCycle = ["casual", "formal", "party", "gym"];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const pick = <T,>(list: T[], index: number) => list[index % list.length];
type CategoryImageOption = {
  color: string;
  gallery: readonly string[];
};
type CategoryImageSet = readonly CategoryImageOption[];

export const getSalePrice = (product: Product) => {
  if (product.discount.percentage > 0) {
    return Math.round(product.price - (product.price * product.discount.percentage) / 100);
  }

  if (product.discount.amount > 0) return Math.round(product.price - product.discount.amount);

  return product.price;
};

const generatedProducts: Product[] = Array.from({ length: 250 }, (_, index) => {
  const family = pick(productFamilies, index);
  const [baseName, baseNameTr] = pick(family.names, Math.floor(index / productFamilies.length));
  const brand = pick(brands, index);
  const title = `${brand} ${baseName}`;
  const titleTr = `${brand} ${baseNameTr}`;
  const price = 48 + ((index * 13) % 178);
  const discountPercentage = index % 5 === 0 ? 30 : index % 3 === 0 ? 20 : 0;
  const sizes = sizeOptions.slice(2 + (index % 2), 6 + (index % 3));
  const imageSet = categoryImages[
    family.category as keyof typeof categoryImages
  ] as CategoryImageSet;
  const imageOption = pick(Array.from(imageSet), Math.floor(index / productFamilies.length));
  const color = colorOptions.find((item) => item.value === imageOption.color) ?? colorOptions[0];
  const gallery = Array.from(imageOption.gallery);
  const image = gallery[0];
  const variants = [
    {
      color: color.value,
      colorTr: color.labelTr,
      colorCode: color.code,
      image,
      gallery,
      sizes: sizes.map((size, sizeIndex) => ({
        size,
        stock: (index + sizeIndex) % 11 === 0 ? 0 : 3 + ((index + sizeIndex) % 9),
      })),
    },
  ];

  return {
    id: index + 1,
    title,
    titleTr,
    slug: slugify(title),
    brand,
    description:
      "A versatile piece designed for everyday outfits, built with soft fabric, easy styling, and a clean streetwear attitude.",
    descriptionTr:
      "Günlük kombinlere kolayca uyum sağlayan, yumuşak kumaşı ve sade streetwear duruşuyla rahat bir parça.",
    srcUrl: image,
    gallery,
    price,
    discount: {
      amount: 0,
      percentage: discountPercentage,
    },
    rating: Number((3.6 + ((index * 7) % 14) / 10).toFixed(1)),
    category: family.category,
    style: pick(styleCycle, index + productFamilies.indexOf(family)),
    colors: [color.value],
    sizes,
    variants,
  };
});

const uniqueProductsByImage = new Map<string, Product>();

generatedProducts.forEach((product) => {
  if (!uniqueProductsByImage.has(product.srcUrl)) {
    uniqueProductsByImage.set(product.srcUrl, product);
  }
});

export const products: Product[] = Array.from(uniqueProductsByImage.values());

export const newArrivalsData = products.slice(0, 12);
export const topSellingData = [...products].sort((a, b) => b.rating - a.rating).slice(0, 12);
export const relatedProductData = products.slice(8);

export const getProductById = (id: number) => products.find((product) => product.id === id);

export const getRelatedProducts = (product: Product) =>
  products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 8);

export const reviewsData: Review[] = [
  {
    id: 1,
    user: "Alex K.",
    content:
      '"Finding clothes that align with my personal style used to be a challenge until I discovered Jelibon. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”',
    contentTr:
      '"Kendi tarzıma uyan parçalar bulmak eskiden zordu; Jelibon’u keşfettikten sonra bu değişti. Farklı zevklere ve ortamlara hitap eden seçenekleri gerçekten başarılı.”',
    rating: 5,
    date: "August 14, 2023",
    dateTr: "14 Ağustos 2023",
  },
  {
    id: 2,
    user: "Sarah M.",
    content:
      '"I am blown away by the quality and style of the clothes I received from Jelibon. Every piece I bought has exceeded my expectations.”',
    contentTr:
      '"Jelibon’dan aldığım ürünlerin kalitesi ve tarzı beni gerçekten etkiledi. Aldığım her ürün beklentimin üstüne çıktı.”',
    rating: 5,
    date: "August 15, 2023",
    dateTr: "15 Ağustos 2023",
  },
  {
    id: 3,
    user: "Ethan R.",
    content:
      '"This t-shirt is a must-have for anyone who appreciates good design. The fit is perfect and the details feel considered."',
    contentTr:
      '"İyi tasarımı seven herkesin dolabında olmalı. Kalıbı tam istediğim gibi, detayları da özenli hissettiriyor."',
    rating: 5,
    date: "August 16, 2023",
    dateTr: "16 Ağustos 2023",
  },
  {
    id: 4,
    user: "Olivia P.",
    content:
      '"Simple, comfortable, and easy to style. It has quickly become one of the pieces I reach for the most."',
    contentTr:
      '"Sade, rahat ve kombinlemesi kolay. Kısa sürede en sık giydiğim parçalardan biri oldu."',
    rating: 5,
    date: "August 17, 2023",
    dateTr: "17 Ağustos 2023",
  },
  {
    id: 5,
    user: "Liam K.",
    content:
      '"The fabric is soft, the color is strong, and it looks good without trying too hard."',
    contentTr:
      '"Kumaşı yumuşak, rengi güçlü ve fazla uğraşmadan iyi görünüyor."',
    rating: 5,
    date: "August 18, 2023",
    dateTr: "18 Ağustos 2023",
  },
  {
    id: 6,
    user: "Samantha D.",
    content:
      '"I love the shape and the finish. It feels like a proper wardrobe staple with a little more personality."',
    contentTr:
      '"Kalıbını ve bitişini çok sevdim. Gardırobun temel parçası gibi ama daha karakterli duruyor."',
    rating: 5,
    date: "August 19, 2023",
    dateTr: "19 Ağustos 2023",
  },
];
