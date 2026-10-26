import { ogAlt, renderOg, ogSize } from "@/lib/og";

// Share image for /contact, rendered at build time (see lib/og.tsx).
export const alt = ogAlt("/contact");
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("/contact");
}
