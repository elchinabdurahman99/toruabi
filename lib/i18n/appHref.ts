import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

export type AppLinkHref = ComponentProps<typeof Link>["href"];

/**
 * Converts an internal app path (filesystem / next-intl pathname) into a typed `Link` href.
 * Use for `/services/[slug]`, `/blog/[slug]`, and static routes.
 */
export function internalPathToLinkHref(path: string): AppLinkHref {
  if (path === "" || path === "/") return "/";
  const normalized = path.startsWith("/") ? path : `/${path}`;

  const svc = /^\/services\/([^/]+)$/.exec(normalized);
  if (svc) {
    return { pathname: "/services/[slug]", params: { slug: svc[1] } };
  }
  const blog = /^\/blog\/([^/]+)$/.exec(normalized);
  if (blog) {
    return { pathname: "/blog/[slug]", params: { slug: blog[1] } };
  }

  return normalized as AppLinkHref;
}
