import { T, RAW } from "../data/listings";

export const SHOP_URL = "https://www.etsy.com/shop/ThreadAndDesignArt";
export const listingUrl = (id) => `https://www.etsy.com/listing/${id}`;

const IMG = "https://i.etsystatic.com/60754467/";

// code = "hash/imageid_suffix" (or "G..." raw path from the shop grid)
export function imgUrl(code, size = "794xN") {
  if (code[0] === "G") return IMG + code.slice(1).replace(/il_\d+x\d+/, "il_600x600");
  const [h, rest] = code.split("/");
  const [id, suf] = rest.split("_");
  return `${IMG}r/il/${h}/${id}/il_${size}.${id}_${suf}.jpg`;
}

const KEYWORDS = [
  ["Tree of Life", /tree of life/i],
  ["Kandinsky", /kandin?sky|kandisky/i],
  ["Aubusson", /aubusson/i],
  ["Kilim", /kil+im/i],
  ["Suzani", /suzani/i],
  ["Paisley", /paisley/i],
  ["Heraldic", /heraldic/i],
  ["Hunting scene", /hunting/i],
  ["Bukhara", /bukhara/i],
  ["Zebra", /zebra/i],
  ["Floral", /floral|lotus|sakura|petales|medallion|crane/i],
  ["Abstract", /abstract|modern art|art deco|organic/i],
];

function classify(id, title, images, index) {
  const t = title;
  const category = /cushion|pillow/i.test(t)
    ? "Cushion covers"
    : /pashmina|shawl|scarf/i.test(t)
    ? "Pashmina"
    : "Rugs";
  const vintage = /vintage|antique/i.test(t);
  const technique = /hand[- ]?tufted/i.test(t)
    ? "Hand-tufted"
    : /hand[- ]?knotted/i.test(t)
    ? "Hand-knotted"
    : /chain ?stitch|chainstitch|crewel/i.test(t)
    ? "Chain stitch"
    : "Other handmade";

  const silk = /silk/i.test(t);
  const wool = /wool|pashmina|crewel/i.test(t);
  const bamboo = /bamboo/i.test(t);
  const material = bamboo && wool
    ? "Wool & bamboo silk"
    : bamboo
    ? "Bamboo silk"
    : /viscose/i.test(t)
    ? "Viscose"
    : silk && wool
    ? "Wool & silk"
    : silk
    ? "Silk"
    : wool
    ? "Wool"
    : "";

  let size = "";
  let area = 0;
  const m = t.match(/(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)/i);
  if (m) {
    const a = +m[1];
    const b = +m[2];
    if (category === "Cushion covers") size = `${a} × ${b} in`;
    else {
      size = `${a} × ${b} ft`;
      area = a * b;
    }
  } else if (/round/i.test(t)) {
    const r = t.match(/(\d+)\s*ft/i);
    if (r) {
      size = `${r[1]} ft round`;
      area = Math.PI * (r[1] / 2) ** 2;
    }
  }
  const sizeBucket =
    category !== "Rugs" || !area
      ? ""
      : area <= 15
      ? "Small · up to 3×5 ft"
      : area <= 40
      ? "Medium · 4×6 to 5×8 ft"
      : "Large · 6×9 ft and up";

  const kw = (KEYWORDS.find(([, re]) => re.test(t)) || [])[0];
  const noun =
    category === "Rugs"
      ? /runner/i.test(t) || /hall runner/i.test(t)
        ? "runner"
        : "rug"
      : category === "Cushion covers"
      ? /pair/i.test(t)
        ? "cushion covers (pair)"
        : "cushion cover"
      : /scarf/i.test(t)
      ? "scarf"
      : "shawl";
  const lead = kw || (technique === "Other handmade" ? "Handmade" : technique);
  const name = `${lead} ${noun}`;
  const sub = [
    vintage ? "Vintage" : technique === "Other handmade" ? "Handmade" : technique,
    material,
  ]
    .filter(Boolean)
    .join(" · ");

  return {
    id,
    title: t.replace(/\s*\|\s*/g, " · ").replace(/\s*·\s*$/, ""),
    name,
    sub,
    size,
    category,
    technique,
    sizeBucket,
    material,
    era: vintage ? "Vintage & antique" : "",
    images,
    isNew: index < 12,
    order: index,
  };
}

export const LISTINGS = RAW.split("\n")
  .filter(Boolean)
  .map((line, i) => {
    const [id, ti, ...rest] = line.split("|");
    return classify(id, T[+ti], rest.join("|").split(";"), i);
  });

export const byId = Object.fromEntries(LISTINGS.map((l) => [l.id, l]));
export const pick = (ids) => ids.map((id) => byId[id]).filter(Boolean);
