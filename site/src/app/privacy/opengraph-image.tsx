import { ogAlt, renderOg, ogSize } from "@/lib/og";

// Share image for /privacy, rendered at build time (see lib/og.tsx).
export const alt = ogAlt("/privacy");
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("/privacy");
}
