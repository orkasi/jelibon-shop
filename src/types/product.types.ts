export type Discount = {
  amount: number;
  percentage: number;
};

export type Product = {
  id: number;
  title: string;
  titleTr?: string;
  slug?: string;
  brand?: string;
  description?: string;
  descriptionTr?: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
  category?: string;
  style?: string;
  colors?: string[];
  sizes?: string[];
  variants?: ProductVariant[];
};

export type ProductVariant = {
  color: string;
  colorTr: string;
  colorCode: string;
  image: string;
  gallery: string[];
  sizes: ProductVariantSize[];
};

export type ProductVariantSize = {
  size: string;
  stock: number;
};
