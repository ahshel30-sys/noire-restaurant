import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://noire-demo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NOIRÉ — Contemporary Dining in Cairo",
    template: "%s · NOIRÉ",
  },
  description:
    "NOIRÉ is a contemporary dining room on the Nile in Zamalek, Cairo. Seasonal cooking, quiet service and long evenings — an experience beyond dining.",
  keywords: [
    "NOIRÉ",
    "contemporary dining",
    "Cairo restaurant",
    "Zamalek restaurant",
    "fine dining Cairo",
    "tasting menu",
    "Nile dining",
  ],
  authors: [{ name: "NOIRÉ Contemporary Dining" }],
  creator: "NOIRÉ",
  openGraph: {
    type: "website",
    locale: "en_EG",
    url: siteUrl,
    siteName: "NOIRÉ — Contemporary Dining",
    title: "NOIRÉ — An experience beyond dining.",
    description:
      "Contemporary culinary artistry meets timeless hospitality on the Nile in Zamalek, Cairo.",
    images: [
      {
        url: "/images/hero-room.webp",
        width: 2000,
        height: 1333,
        alt: "A candlelit table at NOIRÉ overlooking the Nile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOIRÉ — An experience beyond dining.",
    description:
      "Contemporary culinary artistry meets timeless hospitality on the Nile in Zamalek, Cairo.",
    images: ["/images/hero-room.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a08",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
