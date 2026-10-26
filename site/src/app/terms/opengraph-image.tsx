import { ogAlt, renderOg, ogSize } from "@/lib/og";

// Share image for /terms, rendered at build time (see lib/og.tsx).
export const alt = ogAlt("/terms");
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("/terms");
}
