import { ogAlt, renderOg, ogSize } from "@/lib/og";

// Share image for /legal/refund, rendered at build time (see lib/og.tsx).
export const alt = ogAlt("/legal/refund");
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("/legal/refund");
}
