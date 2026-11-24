import { LISTINGS, imgUrl } from "./catalog";

// Switch this to the custom domain once it is connected in Vercel.
export const SITE_URL = "https://threadanddesignart.com";
export const SITE_NAME = "Thread and Design Art";

const TECH = {
  "Chain stitch":
    "Every loop is hand-worked with a hooked needle (ari) on a cotton base cloth, so the design is embroidered stitch by stitch rather than machine-woven.",
  "Hand-tufted":
    "It is hand-tufted by artisans, then carved and sheared by hand to give the pattern its soft, sculpted relief.",
  "Hand-knotted":
    "It is hand-knotted, one knot at a time, which gives a dense pile, crisp pattern detail and years of wear.",
  "Other handmade":
    "It is made by hand by skilled Kashmiri artisans using traditional methods.",
};

const CATEGORY_USE = {
  Rugs: "Suitable for living rooms, bedrooms, hallways and entryways; a handmade piece that adds warmth and texture to the floor.",
  "Cushion covers":
    "A hand-embroidered cover that adds colour and texture to a sofa, bed or reading chair.",
  Pashmina:
    "Light, soft and warm, to wear as a wrap, scarf or shawl through the cooler months.",
};

export function describe(item) {
  const bits = [];
  bits.push(
    `${item.title}. A handmade ${item.name.toLowerCase()} from Kashmir${
      item.material ? `, in ${item.material.toLowerCase()}` : ""
    }${item.size ? `, size ${item.size}` : ""}.`
  );
  bits.push(TECH[item.technique] || TECH["Other handmade"]);
  if (item.era) bits.push("A vintage or antique-style piece with established character.");
  bits.push(CATEGORY_USE[item.category] || "");
  bits.push(
    "Custom sizes and colours are available on request. We ship worldwide and you check out securely on Etsy."
  );
  return bits.filter(Boolean).join(" ");
}

export function shortTitle(item) {
  return [item.name, item.size, item.sub && `(${item.sub})`].filter(Boolean).join(" ");
}

export function related(item, n = 4) {
  const same = LISTINGS.filter(
    (l) => l.id !== item.id && l.category === item.category && l.technique === item.technique
  );
  const pool = same.length >= n ? same : LISTINGS.filter((l) => l.id !== item.id && l.category === item.category);
  // deterministic spread so each page links to different neighbours
  const start = item.order % Math.max(pool.length, 1);
  const out = [];
  for (let i = 0; i < Math.min(n, pool.length); i++) out.push(pool[(start + i * 7) % pool.length]);
  return [...new Map(out.map((o) => [o.id, o])).values()];
}

export const productImage = (item) => imgUrl(item.images[0], "794xN");
