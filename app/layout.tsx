import type { ReactNode } from "react";
import { Nunito, Outfit } from "next/font/google";
import { getLocale } from "next-intl/server";
import Script from "next/script";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], display: "swap", variable: "--font-nunito" });
const outfit = Outfit({ subsets: ["latin"], display: "swap", variable: "--font-outfit" });

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${nunito.variable} ${outfit.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="EE-37" />
        <meta name="geo.placename" content="Tallinn" />
        <meta name="geo.position" content="59.4370;24.7536" />
        <meta name="ICBM" content="59.4370, 24.7536" />
      </head>
      <body
        className="antialiased"
        suppressHydrationWarning
        style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
      >
        {children}

        {/* Google Ads — lazyOnload: loads after everything else, doesn't block TBT */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18102033273"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18102033273');
          `}
        </Script>
      </body>
    </html>
  );
}
