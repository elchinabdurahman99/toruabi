import { SITE_URL } from "@/lib/siteConfig";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

export default function BreadcrumbJsonLd({
  items,
  locale,
}: {
  items: BreadcrumbItem[];
  locale: string;
}) {
  const homeLabel =
    locale === "et" ? "Avaleht" : locale === "ru" ? "Главная" : "Home";

  const allItems = [{ name: homeLabel, href: `${SITE_URL}/${locale}` }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.href
        ? item.href.startsWith("http")
          ? item.href
          : `${SITE_URL}/${locale}${item.href}`
        : undefined,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
