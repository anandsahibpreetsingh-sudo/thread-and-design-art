import { LISTINGS } from "./catalog";
import { SITE_URL } from "./seo";

export default function sitemap() {
  const now = new Date();
  const pages = [
    ["", 1],
    ["/shop", 0.9],
    ["/collections/kashmiri-rugs", 0.9],
    ["/collections/chain-stitch-rugs", 0.9],
    ["/collections/chain-stitch-cushion-covers", 0.8],
    ["/collections/pashmina-shawls", 0.9],
    ["/about", 0.7],
    ["/craft/chain-stitch-rugs", 0.8],
    ["/craft/pashmina", 0.8],
  ].map(([p, priority]) => ({ url: `${SITE_URL}${p}`, lastModified: now, priority }));
  const products = LISTINGS.map((l) => ({
    url: `${SITE_URL}/product/${l.id}`,
    lastModified: now,
    priority: 0.6,
  }));
  return [...pages, ...products];
}
