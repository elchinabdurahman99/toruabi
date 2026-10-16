import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { sanityFetch } from "@/lib/sanity/client";
import { allBlogPostsForSitemapQuery, allServicesForSitemapQuery } from "@/lib/sanity/queries";
import { buildI18nAlternates } from "@/lib/seo/pageMeta";
import { alternatesForBlogPostPage, alternatesForServicePage, segmentTripleFromSanity } from "@/lib/seo/localeSegments";
import type { Locale } from "@/i18n/config";
import { DUPLICATE_SERVICE_OF } from "@/lib/seo/duplicateServices";

const staticPaths = [
  "",
  "/services",
  "/blog",
  "/partners",
  "/price-list",
  "/terms",
  "/contact",
  "/privacy-policy",
  "/works",
];

/** Regenerate periodically; avoids hammering Sanity on every crawl */
export const revalidate = 3600;

function pushCluster(
  entries: MetadataRoute.Sitemap,
  pathAfterLocale: string,
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"],
  priority: number,
) {
  for (const locale of locales) {
    const { canonical, languages } = buildI18nAlternates(locale as Locale, pathAfterLocale);
    entries.push({
      url: canonical,
      changeFrequency,
      priority,
      alternates: { languages },
    });
  }
}

type SitemapRow = {
  canonicalSlug: string;
  pathSegment?: { et?: string; en?: string; ru?: string } | null;
  _updatedAt?: string;
};

function pushServiceOrBlogClusters(
  entries: MetadataRoute.Sitemap,
  rows: SitemapRow[],
  kind: "services" | "blog",
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"],
  priority: number,
) {
  for (const row of rows) {
    const seg = segmentTripleFromSanity(row.canonicalSlug, row.pathSegment);
    for (const loc of locales) {
      const { canonical, languages } =
        kind === "services"
          ? alternatesForServicePage(seg, loc as Locale)
          : alternatesForBlogPostPage(seg, loc as Locale);
      entries.push({
        url: canonical,
        ...(row._updatedAt ? { lastModified: row._updatedAt } : {}),
        changeFrequency,
        priority,
        alternates: { languages },
      });
    }
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    pushCluster(entries, path, path === "" ? "daily" : "weekly", path === "" ? 1 : 0.8);
  }

  const [serviceRows, blogRows] = await Promise.all([
    sanityFetch<SitemapRow[]>(allServicesForSitemapQuery),
    sanityFetch<SitemapRow[]>(allBlogPostsForSitemapQuery),
  ]);

  const services = (Array.isArray(serviceRows) ? serviceRows : []).filter(
    (row) => !DUPLICATE_SERVICE_OF[row.canonicalSlug],
  );
  const blogs = Array.isArray(blogRows) ? blogRows : [];

  pushServiceOrBlogClusters(entries, services, "services", "weekly", 0.75);
  pushServiceOrBlogClusters(entries, blogs, "blog", "monthly", 0.65);

  // The same localized URL can come from more than one Sanity document; list it once.
  const seen = new Set<string>();
  return entries.filter((e) => (seen.has(e.url) ? false : (seen.add(e.url), true)));
}
