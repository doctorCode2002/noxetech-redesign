import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { FloatingControls } from "@/components/floating-controls";
import { Header } from "@/components/header";
import { Loader } from "@/components/loader";
import { MotionProvider } from "@/components/motion/motion-provider";
import { site } from "@/lib/site";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Custom Software & Technology Solutions | NoxeTech",
    template: "%s | NoxeTech",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "/",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f5" },
    { media: "(prefers-color-scheme: dark)", color: "#15171b" },
  ],
};

// Runs before first paint: applies the saved theme (the system setting only picks the first one),
// and skips the loader after its first showing in this session.
const themeScript = `(function(){var h=document.documentElement;try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);h.dataset.theme=d?'dark':'light'}catch(e){}try{if(sessionStorage.getItem('nx-intro'))h.dataset.skipLoader='';else sessionStorage.setItem('nx-intro','1')}catch(e){}})()`;

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo.svg`,
  description: site.description,
  email: site.email,
  contactPoint: { "@type": "ContactPoint", contactType: "sales", email: site.email },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${plexSans.variable} ${plexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <a
          href="#main"
          className="sr-only z-[80] rounded-md bg-redline-solid px-4 py-2 font-semibold text-on-redline focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Loader />
        <MotionProvider>
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 outline-none pt-[4.75rem] sm:pt-[5.25rem]">
            <div id="page">{children}</div>
          </main>
          <Footer />
          <FloatingControls />
          <CustomCursor />
        </MotionProvider>
      </body>
    </html>
  );
}
