import Link from "next/link";
import { notFound } from "next/navigation";
import { byId, imgUrl } from "../../catalog";

const PAGES = {
  "chain-stitch-rugs": {
    metaTitle: "How Kashmiri chain-stitch rugs are made",
    eyebrow: "Our craft",
    title: "How Kashmiri chain-stitch rugs are made",
    lede:
      "A chain-stitch rug is embroidered, not woven. A hooked needle draws loops of yarn through a base cloth, one chain at a time, until the whole design is filled in.",
    steps: [
      ["The base cloth", "A tightly woven base cloth is stretched on a frame so the surface stays taut while it is stitched."],
      ["The design", "The pattern is drawn or printed onto the cloth. Traditional motifs include Aubusson florals, tree of life, kilim geometry and modern art."],
      ["The hooked needle", "The artisan works with a short hooked needle, often called an aari. Each pull creates a loop that locks into the one before, forming a continuous chain."],
      ["Filling in colour", "Rows of chain stitch are laid side by side in wool, silk or crewel yarn. Tight rows give the rug its dense, textured surface and sharp colour detail."],
      ["Finishing", "The rug is trimmed and pressed, then backed and edged so it lies flat and wears well."],
      ["Checked and shipped", "Every piece is inspected for stitch evenness and colour before it is packed and sent."],
    ],
    compare: {
      head: ["", "Chain stitch", "Hand-knotted", "Hand-tufted"],
      rows: [
        ["How it is made", "Embroidered loops on a base cloth", "Individual knots tied on a loom", "Yarn punched through a backing"],
        ["Look and feel", "Dense, textured, painterly detail", "Dense pile, very durable", "Plush, modern designs"],
        ["Typical use", "Living rooms, bedrooms, hallways, wall hangings", "Heavy-traffic rooms", "Bedrooms, lounges"],
      ],
    },
    care: [
      "Vacuum gently without a beater bar, in the direction of the stitches.",
      "Blot spills straight away with a clean cloth. Do not rub or soak.",
      "Rotate the rug now and then so wear and sunlight are even.",
      "For deep cleaning, use a professional who handles wool and silk rugs.",
    ],
    gallery: [
      ["4332018119", 1],
      ["4331608121", 2],
      ["4338424780", 1],
      ["4411348850", 2],
    ],
    cta: ["Shop chain-stitch rugs", "/shop?cat=Rugs&tech=Chain%20stitch"],
  },
  pashmina: {
    metaTitle: "Handcrafted pashmina shawls",
    eyebrow: "Our craft",
    title: "Handcrafted pashmina shawls",
    lede:
      "Pashmina is the fine, warm undercoat of mountain goats from the high Himalayas. Traditionally it is combed, spun and woven by hand, then finished with embroidery.",
    steps: [
      ["The fibre", "Pashmina comes from the soft undercoat of goats that live at high altitude. The fibre is gathered by combing when the goats shed in spring."],
      ["Cleaning and sorting", "The fibre is cleaned by hand and sorted so only the finest, softest strands go forward."],
      ["Hand-spinning", "Spinners draw the fibre into very fine thread on a traditional spinning wheel. The thread has to be strong enough to weave yet stay light."],
      ["Hand-weaving", "The thread is woven on a handloom into a soft, light cloth. A single shawl takes patience, and slight variations are the mark of handwork."],
      ["Dyeing and washing", "The cloth is dyed and washed in soft water to give it a smooth hand and even colour."],
      ["Embroidery and finishing", "Many shawls are decorated with fine needlework, such as paisley motifs in golden zari thread, then fringed and checked by hand."],
    ],
    care: [
      "Keep it dry-clean only or hand wash gently in cool water with a mild wool wash.",
      "Do not wring or twist. Press out water in a towel and dry flat in the shade.",
      "Store folded in a breathable cotton bag, away from damp.",
      "Pilling on a soft fibre is normal. A gentle hand brush smooths it away.",
    ],
    gallery: [
      ["4486232059", 0],
      ["4486232059", 1],
      ["4479508801", 0],
      ["4479514904", 1],
    ],
    cta: ["Shop pashmina", "/shop?cat=Pashmina"],
  },
};

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const p = PAGES[params.slug];
  return p ? { title: p.metaTitle, description: p.lede } : {};
}

export default function Craft({ params }) {
  const p = PAGES[params.slug];
  if (!p) notFound();
  const photos = p.gallery
    .map(([id, i]) => {
      const it = byId[id];
      const code = it && it.images[i];
      return code ? { src: imgUrl(code), alt: it.name } : null;
    })
    .filter(Boolean);

  return (
    <>
      <section className="page-head">
        <p className="eyebrow">{p.eyebrow}</p>
        <h1>{p.title}</h1>
        <p className="lede">{p.lede}</p>
      </section>

      {photos.length > 0 && (
        <section className="wrap photo-strip">
          {photos.map((ph, i) => (
            <img key={i} src={ph.src} alt={ph.alt} loading="lazy" />
          ))}
        </section>
      )}

      <section className="wrap section">
        <h2 className="center">From start to finish</h2>
        <ol className="steps">
          {p.steps.map(([h, t], i) => (
            <li key={h}>
              <span className="num">{i + 1}</span>
              <div>
                <h3>{h}</h3>
                <p>{t}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {p.compare && (
        <section className="wrap section">
          <h2 className="center">Chain stitch compared</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>{p.compare.head.map((h, i) => <th key={i}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {p.compare.rows.map((r) => (
                  <tr key={r[0]}>
                    {r.map((c, i) => (i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i}>{c}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="wrap section narrow">
        <h2>Caring for yours</h2>
        <ul className="ticks">
          {p.care.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p className="mt">
          <Link href={p.cta[1]} className="btn">{p.cta[0]}</Link>{" "}
          <Link href="/about" className="btn ghost">About us</Link>
        </p>
      </section>
    </>
  );
}
