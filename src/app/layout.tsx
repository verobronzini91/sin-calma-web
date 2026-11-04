import type { Metadata, Viewport } from "next";
import { PortadaFooter } from "@/components/home/PortadaFooter";
import { Header } from "@/components/layout/Header";
import { HideOnHome } from "@/components/layout/HideOnHome";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { hand, sans, serif } from "@/lib/fonts";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { defaultSocialImage } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: site.titleTemplate },
  description: site.description,
  applicationName: site.name,
  authors: site.founders.map((f) => ({ name: f.name })),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: "/",
    title: site.title,
    description: site.description,
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [defaultSocialImage],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={site.lang} className={`${serif.variable} ${sans.variable} ${hand.variable}`}>
      <body className="min-h-dvh bg-canvas font-sans text-ink antialiased">
        <a
          href="#contenido"
          className="eyebrow sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:px-5 focus:py-3 focus:text-ivory"
        >
          Saltar al contenido
        </a>
        <HideOnHome>
          <Header />
        </HideOnHome>
        <main id="contenido">{children}</main>
        <HideOnHome>
          <PortadaFooter />
        </HideOnHome>
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
      </body>
    </html>
  );
}
