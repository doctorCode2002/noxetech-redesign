import { ogAlt, renderOg, ogSize } from "@/lib/og";

// Share image for /solutions/sms-switch, rendered at build time (see lib/og.tsx).
export const alt = ogAlt("/solutions/sms-switch");
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("/solutions/sms-switch");
}
