import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const lora = Lora({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata = {
  title: "Thread and Design Art | Handmade Kashmiri Rugs, Cushions & Pashmina",
  description:
    "Hand-embroidered Kashmiri chain-stitch rugs, cushion covers and pashmina. Made by artisans in Kashmir, shipped to the US, UK and Europe with tracking. Buy securely on Etsy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
