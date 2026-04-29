import { NextRequest, NextResponse } from "next/server";
import {
  LANGUAGE_COOKIE_KEY,
  LANGUAGE_HEADER_KEY,
} from "@/lib/language-constants";
import { isTurkishOnlyPath, resolveLanguageFromPath } from "@/lib/language-routing";

export function proxy(request: NextRequest) {
  const language = resolveLanguageFromPath(
    request.nextUrl.pathname,
    request.cookies.get(LANGUAGE_COOKIE_KEY)?.value
  );
  const currentCookieLanguage = request.cookies.get(LANGUAGE_COOKIE_KEY)?.value;

  if (
    language === "tr" &&
    isTurkishOnlyPath(request.nextUrl.pathname) &&
    currentCookieLanguage !== "tr"
  ) {
    const response = NextResponse.redirect(request.nextUrl);
    response.cookies.set(LANGUAGE_COOKIE_KEY, "tr", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LANGUAGE_HEADER_KEY, language);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (currentCookieLanguage !== language) {
    response.cookies.set(LANGUAGE_COOKIE_KEY, language, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\..*).*)"],
};
