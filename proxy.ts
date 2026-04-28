import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SLUG_TO_CANONICAL, CANONICAL_TO_LOCALIZED } from "@/lib/seo/serviceSlugMappings";

const nextIntlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal next.js paths, api, studio, and files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const locales = ["et", "en", "ru"];
  const segments = pathname.split("/");
  const firstHeader = segments[1];
  const hasLocale = locales.includes(firstHeader);

  if (hasLocale) {
    const secondSegment = segments[2];
    // Check if it's an orphaned slug (e.g. /en/disain OR /en/vannitoa-remont)
    const canonical = SLUG_TO_CANONICAL[decodeURIComponent(secondSegment)];
    const isOrphanedSlug = segments.length === 3 && canonical != null;

    if (isOrphanedSlug) {
      const locale = firstHeader as "en" | "et" | "ru";
      const servicePrefix = { en: "services", et: "teenused", ru: "услуги" }[locale];
      const localizedSlug = CANONICAL_TO_LOCALIZED[canonical][locale];

      return NextResponse.redirect(new URL(`/${locale}/${servicePrefix}/${localizedSlug}`, request.url), 301);
    }
  } else {
    // Handle orphaned service slug without locale prefix, otherwise delegate to next-intl.
    const acceptLanguage = request.headers.get("accept-language") || "";
    const lang = acceptLanguage.split(",")[0].split("-")[0].toLowerCase();
    const detected = (["en", "et", "ru"].includes(lang) ? lang : "et") as "en" | "et" | "ru";

    const canonical = SLUG_TO_CANONICAL[decodeURIComponent(firstHeader)];
    if (canonical) {
      const servicePrefix = { en: "services", et: "teenused", ru: "услуги" }[detected];
      const localizedSlug = CANONICAL_TO_LOCALIZED[canonical][detected];

      return NextResponse.redirect(new URL(`/${detected}/${servicePrefix}/${localizedSlug}`, request.url), 307);
    }
  }

  return nextIntlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|studio|.*\\..*).*)"],
};
