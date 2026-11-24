import Link from "next/link";
import Card from "./Card";
import { LISTINGS, byId, imgUrl, pick, SHOP_URL } from "./catalog";

const FEATURED = [
  "4357753898", "4468765230", "4373949875", "4373929598",
  "4508913109", "4495914846", "4486232059", "4361892195",
];

export default function Home() {
  const featured = pick(FEATURED);
  const rugs = LISTINGS.filter((l) => l.category === "Rugs").length;
  const cushions = LISTINGS.filter((l) => l.category === "Cushion covers").length;
  const pash = LISTINGS.filter((l) => l.category === "Pashmina").length;
  const cushionImg = byId["4508913109"]?.images[0];
  const pashImg = byId["4486232059"]?.images[0];

  return (
    <>
      <section className="hero">
        <img src="/images/navy-hallway.jpg" alt="Navy medallion chain-stitch runner in a sunlit hallway" />
        <div className="hero-text">
          <p className="eyebrow">Handmade in Kashmir</p>
          <h1>Rugs, cushions &amp; pashmina, stitched loop by loop</h1>
          <p>
            Every piece is worked by hand in chain stitch by artisans in Kashmir. Browse the
            collection, then check out safely on Etsy.
          </p>
          <div className="row">
            <Link href="/shop" className="btn">Shop the collection</Link>
            <Link href="/craft/chain-stitch-rugs" className="btn ghost">How it&apos;s made</Link>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <h2 className="center">Shop by category</h2>
        <div className="tiles">
          <Link href="/shop?cat=Rugs" className="tile">
            <img src="/images/orange-hallway.jpg" alt="" loading="lazy" />
            <span>Rugs <small>{rugs} designs</small></span>
          </Link>
          <Link href="/shop?cat=Cushion%20covers" className="tile">
            {cushionImg && <img src={imgUrl(cushionImg)} alt="" loading="lazy" />}
            <span>Cushion covers <small>{cushions} designs</small></span>
          </Link>
          <Link href="/shop?cat=Pashmina" className="tile">
            {pashImg && <img src={imgUrl(pashImg)} alt="" loading="lazy" />}
            <span>Pashmina <small>{pash} pieces</small></span>
          </Link>
        </div>
      </section>

      <section className="wrap section">
        <h2 className="center">Featured pieces</h2>
        <div className="grid">
          {featured.map((it) => (
            <Card key={it.id} item={it} />
          ))}
        </div>
        <p className="center mt">
          <Link href="/shop" className="btn">View all {LISTINGS.length} listings</Link>
        </p>
      </section>

      <section className="split">
        <img src="/images/navy-real.jpg" alt="Close view of a chain-stitch rug" loading="lazy" />
        <div>
          <p className="eyebrow">Our craft</p>
          <h2>One continuous chain, thousands of stitches</h2>
          <p>
            A chain-stitch rug is embroidered, not woven: a hooked needle draws loop after loop of
            wool or silk through a base cloth until the design fills in. Learn how a rug goes from
            drawing to finished piece.
          </p>
          <Link href="/craft/chain-stitch-rugs" className="btn-line big">How chain-stitch rugs are made</Link>
        </div>
      </section>

      <section className="split rev">
        <div>
          <p className="eyebrow">Pashmina</p>
          <h2>Soft, light and made to last</h2>
          <p>
            Pashmina is the fine undercoat of mountain goats, spun and woven by hand and often
            finished with delicate embroidery. See how a shawl is made, and how to care for it.
          </p>
          <Link href="/craft/pashmina" className="btn-line big">Handcrafted pashmina shawls</Link>
        </div>
        {pashImg && <img src={imgUrl(pashImg)} alt="Handcrafted pashmina shawl" loading="lazy" />}
      </section>

      <section className="wrap section about-strip">
        <h2>About Thread and Design Art</h2>
        <p>
          A small business bringing Kashmiri handicraft to homes around the world.
          Custom sizes are available on request.
        </p>
        <p>
          <Link href="/about" className="btn-line big">Our story</Link>{" "}
          <a href={SHOP_URL} target="_blank" rel="noopener noreferrer" className="btn-line big">Visit our Etsy shop ↗</a>
        </p>
      </section>
    </>
  );
}
