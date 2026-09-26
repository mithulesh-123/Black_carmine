import type { Metadata, Viewport } from "next";
import { Syne, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Grain } from "@/components/Grain";
import { Cursor } from "@/components/Cursor";
import { Preloader } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HashHandler } from "@/components/HashHandler";
import { SkipLink } from "@/components/SkipLink";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://blackcarmine.studio";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BLACKCARMINE — Digital Products, Engineered With Intent",
    template: "%s — BLACKCARMINE",
  },
  description:
    "BLACKCARMINE is a full-service digital agency engineering web platforms, mobile apps, SaaS, brand systems and AI-driven products with cinematic craft.",
  keywords: [
    "digital agency",
    "web development",
    "mobile app development",
    "SaaS design",
    "UI/UX design",
    "branding",
    "e-commerce",
    "AI solutions",
    "automation",
    "BLACKCARMINE",
  ],
  authors: [{ name: "BLACKCARMINE" }],
  creator: "BLACKCARMINE",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "BLACKCARMINE — Digital Products, Engineered With Intent",
    description:
      "A full-service digital agency engineering web platforms, mobile apps, SaaS, brand systems and AI-driven products with cinematic craft.",
    siteName: "BLACKCARMINE",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "BLACKCARMINE — Digital Products, Engineered With Intent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BLACKCARMINE — Digital Products, Engineered With Intent",
    description:
      "A full-service digital agency engineering web platforms, mobile apps, SaaS, brand systems and AI-driven products with cinematic craft.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#08070a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BLACKCARMINE",
  url: SITE_URL,
  email: "hello@blackcarmine.studio",
  description:
    "A full-service digital agency engineering web platforms, mobile apps, SaaS, brand systems and AI-driven products with cinematic craft.",
  knowsAbout: [
    "Web development",
    "Mobile app development",
    "SaaS platforms",
    "UI/UX design",
    "Brand systems",
    "E-commerce",
    "AI solutions",
    "Automation",
  ],
  sameAs: [
    "https://x.com/",
    "https://instagram.com/",
    "https://linkedin.com/",
    "https://github.com/",
    "https://dribbble.com/",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/* Browser extensions (password managers, translation tools) inject
          attributes onto <body> before React hydrates, e.g.
          `__processed_<uuid>__="true"`. That is not an app bug, but React
          logs a hydration mismatch for the client-only attribute. This flag
          silences it for the element only — child hydration is untouched. */}
      <body className="min-h-full bg-bg text-ink antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Preloader />
          <Grain />
          <Cursor />
          <ScrollProgress />
          <SkipLink />
          <HashHandler />
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
