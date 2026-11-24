import Link from "next/link";
import { notFound } from "next/navigation";
import Card from "../../Card";
import { LISTINGS, CONTACT } from "../../catalog";
import { SITE_URL } from "../../seo";

const PAGES = {
  "kashmiri-rugs": {
    h1: "Handmade Kashmiri Rugs",
    metaTitle: "Handmade Kashmiri Rugs | Chain Stitch, Hand-Tufted & Vintage",
    lede: "Hand-embroidered, hand-tufted and vintage rugs made by artisans in Kashmir, shipped to homes around the world.",
    filter: (l) => l.category === "Rugs",
    body: [
      "Every rug in this collection is made by hand in Kashmir. Many are chain-stitch rugs, embroidered loop by loop with a hooked needle in wool or silk; others are hand-tufted or hand-knotted, and a few are vintage pieces. You will find runners, small accent rugs and large room-size rugs in florals, medallions, Suzani, Aubusson, Kilim and modern abstract designs.",
      "Not sure which size or colour suits your room? Message us. We can make almost any design to order, in the size and colours you need, and we ship worldwide.",
    ],
    faq: [
      ["Are these rugs really handmade?", "Yes. Each rug is made by hand by artisans in Kashmir, whether it is chain-stitched, hand-tufted or hand-knotted."],
      ["Can I order a custom size or design?", "Yes. We can make almost any design on request, in custom sizes and colours. Message us on WhatsApp with your idea."],
      ["Do you ship internationally?", "Yes. We ship worldwide, and you check out securely on Etsy."],
    ],
  },
  "chain-stitch-rugs": {
    h1: "Chain Stitch Rugs",
    metaTitle: "Handmade Chain Stitch Rugs from Kashmir",
    lede: "Embroidered, not woven: chain-stitch rugs worked stitch by stitch in wool and silk.",
    filter: (l) => l.category === "Rugs" && l.technique === "Chain stitch",
    body: [
      "A chain-stitch rug is embroidered by hand. A hooked needle draws loop after loop of wool or silk through a cotton base cloth until the design fills in. The result is a soft, textured rug with a distinctive looped surface, a craft Kashmir has practised for generations.",
      "Anand Creations, the family business behind Thread and Design Art, has exported chain-stitch products since 2000. Read how a chain-stitch rug is made, or browse the designs below.",
    ],
    faq: [
      ["What is a chain-stitch rug?", "A rug embroidered by hand with a hooked needle, which forms a continuous chain of loops on a base cloth, instead of being woven on a loom."],
      ["What are chain-stitch rugs made of?", "Mostly wool, and some in silk or a wool and silk blend, worked on a cotton base."],
      ["Can chain-stitch rugs be made in custom designs?", "Yes. We make custom designs and sizes to order."],
    ],
    craft: true,
  },
  "chain-stitch-cushion-covers": {
    h1: "Chain Stitch Cushion Covers",
    metaTitle: "Handmade Kashmiri Chain Stitch Cushion Covers",
    lede: "Hand-embroidered Kashmiri cushion and pillow covers in silk and wool.",
    filter: (l) => l.category === "Cushion covers",
    body: [
      "These cushion covers are embroidered by hand in Kashmir in chain stitch, in florals, paisleys, cranes and abstract designs. They add colour and texture to a sofa, bed or reading chair, and they make a thoughtful gift.",
      "Looking for a set, a particular colour or a different size? Message us and we will make it for you.",
    ],
    faq: [
      ["Are the covers hand-embroidered?", "Yes. Each cover is embroidered by hand in chain stitch by artisans in Kashmir."],
      ["Can you make a set or custom colours?", "Yes. Send us a message with the colours and sizes you need."],
      ["Do you ship worldwide?", "Yes. We ship to customers all over the world, with secure checkout on Etsy."],
    ],
  },
  "pashmina-shawls": {
    h1: "Handcrafted Pashmina Shawls",
    metaTitle: "Handcrafted Kashmiri Pashmina Shawls & Scarves",
    lede: "Soft, light pashmina shawls and scarves from Kashmir, some with delicate embroidery.",
    filter: (l) => l.category === "Pashmina",
    body: [
      "Pashmina is the fine undercoat of mountain goats, spun and woven by hand in Kashmir. The result is a shawl that is very soft, light and warm. Some of our pieces are finished with embroidery.",
      "Learn how a pashmina shawl is made and how to care for it, or browse the pieces below.",
    ],
    faq: [
      ["What is pashmina?", "Pashmina is the fine, soft undercoat wool of mountain goats, traditionally spun and woven by hand in Kashmir."],
      ["How should I care for a pashmina shawl?", "Dry clean or hand wash gently in cool water, and store it folded in a breathable bag."],
      ["Do you ship pashmina worldwide?", "Yes, we ship worldwide, with secure checkout on Etsy."],
    ],
    craft: "pashmina",
  },
};

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const p = PAGES[params.slug];
  if (!p) return {};
  return {
    title: p.metaTitle,
    description: p.lede,
    alternates: { canonical: `/collections/${params.slug}` },
  };
}

export default function Collection({ params }) {
  const p = PAGES[params.slug];
  if (!p) notFound();
  const items = LISTINGS.filter(p.filter);
  const shown = items.slice(0, 48);
  const craftHref = p.craft === "pashmina" ? "/craft/pashmina" : "/craft/chain-stitch-rugs";
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  const listLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: p.h1,
    url: `${SITE_URL}/collections/${params.slug}`,
    description: p.lede,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([faqLd, listLd]) }} />
      <section className="page-head">
        <p className="eyebrow">Collection</p>
        <h1>{p.h1}</h1>
        <p className="lede">{p.lede}</p>
      </section>
      <section className="wrap prose">
        {p.body.map((t, i) => (
          <p key={i}>{t}</p>
        ))}
        {p.craft && (
          <p>
            <Link href={craftHref} className="btn-line">How it is made</Link>
          </p>
        )}
      </section>
      <section className="wrap section">
        <div className="grid">
          {shown.map((it) => (
            <Card key={it.id} item={it} />
          ))}
        </div>
        <p className="center mt">
          <Link href="/shop" className="btn">See all {LISTINGS.length} listings, with filters</Link>
        </p>
      </section>
      <section className="wrap prose">
        <h2>Frequently asked questions</h2>
        {p.faq.map(([q, a]) => (
          <div key={q}>
            <h3>{q}</h3>
            <p>{a}</p>
          </div>
        ))}
        <p>
          Questions? <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>.
        </p>
      </section>
    </>
  );
}
