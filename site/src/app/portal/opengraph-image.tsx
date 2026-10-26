import { ogAlt, renderOg, ogSize } from "@/lib/og";

// Share image for /portal, rendered at build time (see lib/og.tsx).
export const alt = ogAlt("/portal");
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("/portal");
}
