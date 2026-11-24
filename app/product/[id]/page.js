import Link from "next/link";
import { notFound } from "next/navigation";
import Card from "../../Card";
import { LISTINGS, byId, imgUrl, listingUrl, CONTACT } from "../../catalog";
import { SITE_URL, SITE_NAME, describe, shortTitle, related, productImage } from "../../seo";

export function generateStaticParams() {
  return LISTINGS.map((l) => ({ id: l.id }));
}

export function generateMetadata({ params }) {
  const item = byId[params.id];
  if (!item) return {};
  const title = shortTitle(item);
  const description = describe(item).slice(0, 300);
  return {
    title,
    description,
    alternates: { canonical: `/product/${item.id}` },
    openGraph: {
      type: "website",
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `/product/${item.id}`,
      images: [{ url: productImage(item), alt: item.title }],
    },
  };
}

export default function Product({ params }) {
  const item = byId[params.id];
  if (!item) notFound();
  const desc = describe(item);
  const more = related(item, 4);
  const facts = [
    ["Type", item.name],
    ["Technique", item.technique === "Other handmade" ? "Handmade" : item.technique],
    ["Material", item.material],
    ["Size", item.size],
    ["Style", item.era],
    ["Origin", "Kashmir, India"],
  ].filter(([, v]) => v);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: item.title,
        description: desc,
        image: item.images.map((c) => imgUrl(c)),
        brand: { "@type": "Brand", name: SITE_NAME },
        category: item.category,
        material: item.material || undefined,
        countryOfOrigin: "IN",
        url: `${SITE_URL}/product/${item.id}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: item.category, item: `${SITE_URL}/shop?cat=${encodeURIComponent(item.category)}` },
          { "@type": "ListItem", position: 3, name: shortTitle(item) },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="wrap pd">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link> / <Link href={`/shop?cat=${encodeURIComponent(item.category)}`}>{item.category}</Link>
        </nav>
        <div className="pd-grid">
          <div className="pd-gallery">
            {item.images.map((c, i) => (
              <img key={c} src={imgUrl(c)} alt={i === 0 ? item.title : `${item.name}, view ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} />
            ))}
          </div>
          <div className="pd-info">
            <p className="eyebrow">{item.category}</p>
            <h1>{item.name}</h1>
            <p className="pd-title">{item.title}</p>
            <p>{desc}</p>
            <dl className="pd-facts">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="row">
              <a className="btn" href={listingUrl(item.id)} target="_blank" rel="noopener noreferrer">Buy on Etsy</a>
              <a
                className="btn ghost dark"
                href={`${CONTACT.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in this: ${item.title} (${SITE_URL}/product/${item.id})`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask on WhatsApp
              </a>
              <a
                className="btn ghost dark"
                href={`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(`${SITE_URL}/product/${item.id}`)}&media=${encodeURIComponent(imgUrl(item.images[0]))}&description=${encodeURIComponent(item.title)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Save to Pinterest
              </a>
            </p>
            <p className="muted">Secure checkout on Etsy. Shipping worldwide. Custom sizes and designs on request.</p>
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="wrap section">
          <h2 className="center">You may also like</h2>
          <div className="grid">
            {more.map((m) => (
              <Card key={m.id} item={m} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
