import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MotionProvider from "@/components/providers/MotionProvider";
import CookieBanner from "@/components/layout/CookieBanner";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";
import type { Metadata, Viewport } from "next";
import { defaultOgImageAlt, openGraphPageUrl } from "@/lib/seo/pageMeta";
import { defaultLocale, type Locale } from "@/i18n/config";
import { sanityFetch } from "@/lib/sanity/client";
import { serviceCategoriesNavQuery, siteSettingsQuery, footerServicesQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { NavCategory } from "@/components/layout/Navbar";
import { Toaster } from "sonner";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3B6CF4" },
    { media: "(prefers-color-scheme: dark)", color: "#1a2a6c" },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : defaultLocale;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const meta = messages.meta;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.title,
      template: `%s | ${SITE_NAME}`,
    },
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: openGraphPageUrl(locale as Locale, ""),
      siteName: SITE_NAME,
      locale: locale === "et" ? "et_EE" : locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
      images: [
        {
          url: "/api/og",
          width: 1200,
          height: 630,
          alt: defaultOgImageAlt(locale),
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/api/og"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", type: "image/x-icon" },
        { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
        { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
        { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
        { url: "/favicon-512x512.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
    },
    category: "home services",
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const FOOTER_CANONICAL_SLUGS = [
    "24h-emergency-plumbing",
    "plumber-on-call",
    "drain-blockage-removal",
    "pipe-works",
    "boiler-installation",
    "tap-mixer-replacement",
    "24h-emergency-electrical",
    "bathroom-renovation",
  ];

  const [messages, navCategories, siteSettings, footerServices] = await Promise.all([
    getMessages(),
    sanityFetch<NavCategory[]>(serviceCategoriesNavQuery(locale as Locale)).catch(() => []),
    sanityFetch<any>(siteSettingsQuery(locale as Locale)).catch(() => null),
    sanityFetch<Array<{ canonicalSlug: string; slug: string; title: string }>>(
      footerServicesQuery(locale as Locale),
      { slugs: FOOTER_CANONICAL_SLUGS },
    ).catch(() => []),
  ]);

  const logoUrl = siteSettings?.logo?.asset
    ? urlFor(siteSettings.logo).url()
    : undefined;

  return (
    <NextIntlClientProvider messages={messages}>
      <MotionProvider>
        <Navbar navCategories={navCategories ?? []} logoUrl={logoUrl} />
        {children}
        <Footer logoUrl={logoUrl} serviceLinks={footerServices ?? []} />
        <Toaster position="top-right" expand={false} richColors />
        <CookieBanner />
      </MotionProvider>
    </NextIntlClientProvider>
  );
}
