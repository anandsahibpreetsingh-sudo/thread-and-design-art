import "./globals.css";
import { Jost } from "next/font/google";
import Header from "./Header";
import Footer from "./Footer";

const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-jost" });

export const metadata = {
  title: "Thread and Design Art | Handmade Kashmiri Rugs, Cushion Covers & Pashmina",
  description:
    "Handmade Kashmiri chain-stitch rugs, embroidered cushion covers and pashmina shawls. Browse the full collection and check out securely on Etsy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jost.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
