import { ogAlt, renderOg, ogSize } from "@/lib/og";

// Share image for /how-we-work, rendered at build time (see lib/og.tsx).
export const alt = ogAlt("/how-we-work");
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("/how-we-work");
}
