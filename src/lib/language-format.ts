type Language = "en" | "tr";

const translatedSizes: Record<string, string> = {
  Small: "Küçük",
  Medium: "Orta",
  Large: "Büyük",
  "X-Large": "Ekstra Büyük",
};

const sizeAbbreviations: Record<string, string> = {
  "XX-Small": "XXS",
  "X-Small": "XS",
  Small: "S",
  Medium: "M",
  Large: "L",
  "X-Large": "XL",
  "XX-Large": "XXL",
  "3X-Large": "3XL",
  "4X-Large": "4XL",
};

export const getTranslatedSizeLabel = (language: Language, size: string) => {
  if (language !== "tr") return size;
  return translatedSizes[size] ?? size;
};

export const getCompactSizeLabel = (language: Language, size: string) => {
  if (language !== "tr") return size;
  return sizeAbbreviations[size] ?? getTranslatedSizeLabel(language, size);
};
