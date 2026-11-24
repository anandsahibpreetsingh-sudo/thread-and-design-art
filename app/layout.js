import "./globals.css";
import { Jost, Cormorant_Garamond } from "next/font/google";
import Header from "./Header";
import Footer from "./Footer";
import { SITE_URL, SITE_NAME } from "./seo";
import { CONTACT, SHOP_URL } from "./catalog";

const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-jost" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-serif" });

const DESC =
  "Handmade Kashmiri chain-stitch rugs, embroidered cushion covers and pashmina shawls, made by artisans and shipped worldwide. Custom sizes and designs on request.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Thread and Design Art | Handmade Kashmiri Rugs, Cushion Covers & Pashmina",
    template: "%s | Thread and Design Art",
  },
  description: DESC,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Thread and Design Art | Handmade Kashmiri Rugs, Cushion Covers & Pashmina",
    description: DESC,
    url: "/",
    images: [{ url: "/images/navy-hallway.jpg", alt: "Handmade Kashmiri chain-stitch rug" }],
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: SITE_URL,
      description: DESC,
      email: CONTACT.email,
      telephone: CONTACT.phone,
      foundingDate: "2000",
      areaServed: "Worldwide",
      sameAs: [CONTACT.instagram, SHOP_URL, "https://in.pinterest.com/Threadandesignart/"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#org` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jost.variable} ${serif.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
