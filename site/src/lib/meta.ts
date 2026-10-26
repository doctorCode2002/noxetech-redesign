import type { Metadata } from "next";
import { site } from "./site";

/**
 * Per-page metadata with an absolute canonical on the real domain (site.url).
 * Titles are the original site's wording, used as-is (the original's duplicated
 * "| NoxeTech | NoxeTech" suffix is not repeated).
 */
export function pageMeta(path: string, title: string, description: string): Metadata {
  return {
    title: { absolute: title },
    description,
    // Always the real domain, so a preview deployment never competes with noxetech.com in search.
    alternates: { canonical: `${site.url}${path === "/" ? "" : path}` },
    openGraph: { title, description, url: path },
  };
}
