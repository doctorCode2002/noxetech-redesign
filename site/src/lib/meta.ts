import type { Metadata } from "next";

/**
 * Per-page metadata with a correct absolute canonical (resolved against metadataBase).
 * Titles are the original site's wording, used as-is (the original's duplicated
 * "| NoxeTech | NoxeTech" suffix is not repeated).
 */
export function pageMeta(path: string, title: string, description: string): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}
