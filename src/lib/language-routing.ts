type Language = "en" | "tr";

export const turkishRouteMap = {
  "/terms-and-conditions": "/kullanim-kosullari",
  "/privacy-policy": "/gizlilik-politikasi",
} as const;

const englishRouteMap = Object.fromEntries(
  Object.entries(turkishRouteMap).map(([englishPath, turkishPath]) => [
    turkishPath,
    englishPath,
  ])
) as Record<(typeof turkishRouteMap)[keyof typeof turkishRouteMap], keyof typeof turkishRouteMap>;

export const isTurkishOnlyPath = (pathname: string) =>
  Object.values(turkishRouteMap).some((path) => pathname.startsWith(path));

export const resolveLanguageFromPath = (
  pathname: string,
  cookieLanguage?: string | null
): Language => {
  if (isTurkishOnlyPath(pathname)) return "tr";
  return cookieLanguage === "tr" ? "tr" : "en";
};

export const sanitizeLanguageForPath = (
  pathname: string,
  requestedLanguage: Language
): Language => {
  if (isTurkishOnlyPath(pathname)) return "tr";
  return requestedLanguage;
};

export const getLocalizedPathname = (
  pathname: string,
  nextLanguage: Language
) => {
  if (nextLanguage === "tr") {
    const turkishPath = turkishRouteMap[pathname as keyof typeof turkishRouteMap];
    return turkishPath ?? pathname;
  }

  const englishPath = englishRouteMap[pathname as keyof typeof englishRouteMap];
  return englishPath ?? pathname;
};
