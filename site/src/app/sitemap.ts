import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Update `modified` when a page's content actually changes, so lastmod stays meaningful.
const pages: { path: string; modified: string; priority: number }[] = [
  { path: "", modified: "2026-10-26", priority: 1 },
  { path: "/services", modified: "2026-10-26", priority: 0.9 },
  { path: "/solutions", modified: "2026-10-26", priority: 0.9 },
  { path: "/solutions/sms-switch", modified: "2026-10-26", priority: 0.9 },
  { path: "/start-project", modified: "2026-10-26", priority: 0.9 },
  { path: "/work", modified: "2026-10-26", priority: 0.7 },
  { path: "/how-we-work", modified: "2026-10-26", priority: 0.8 },
  { path: "/company", modified: "2026-10-26", priority: 0.7 },
  { path: "/contact", modified: "2026-10-26", priority: 0.8 },
  { path: "/privacy", modified: "2026-10-26", priority: 0.3 },
  { path: "/terms", modified: "2026-10-26", priority: 0.3 },
  { path: "/legal/refund", modified: "2026-10-26", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified: p.modified,
    priority: p.priority,
  }));
}
