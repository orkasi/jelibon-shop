import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { headers } from "next/headers";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import { LanguageProvider } from "@/lib/language";
import {
  LANGUAGE_COOKIE_KEY,
  LANGUAGE_HEADER_KEY,
  Language,
} from "@/lib/language-constants";

export const metadata: Metadata = {
  title: "Jelibon",
  description: "E-commerce storefront demo",
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon.svg`,
    shortcut: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon.svg`,
    apple: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon.svg`,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const requestHeaders = await headers();
  const headerLanguage = requestHeaders.get(LANGUAGE_HEADER_KEY);
  const cookieLanguage = cookieStore.get(LANGUAGE_COOKIE_KEY)?.value;
  const initialLanguage: Language =
    headerLanguage === "tr" || cookieLanguage === "tr" ? "tr" : "en";

  return (
    <html lang={initialLanguage}>
      <body className={satoshi.className}>
        <HolyLoader color="#868686" />
        <LanguageProvider initialLanguage={initialLanguage}>
          <TopBanner />
          <Providers>
            <TopNavbar />
            {children}
          </Providers>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
