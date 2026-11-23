"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, PRODUCTS, SHOP_URL, listingUrl } from "../data/products";

const img = (file) => `/images/${file}`;
const display = { fontFamily: "var(--font-display), Georgia, serif" };

function Motif() {
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M27 4l10 10-10 10-10-10zM27 30l10 10-10 10-10-10zM4 27l8-8 8 8-8 8zM34 27l8-8 8 8-8 8z" />
    </svg>
  );
}

function Heart() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.1 3 4.5 6.6 4.5c2 0 3.7 1 5.4 3 1.7-2 3.4-3 5.4-3 3.6 0 5.7 3.6 4.2 7.2C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}

function Thumb({ product }) {
  const first = product.images[0];
  return first ? (
    <img loading="lazy" src={img(first)} alt={product.title} />
  ) : (
    <div className="ph">
      <div>
        <Motif />
        Photos on Etsy
      </div>
    </div>
  );
}

export default function Home() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("feat");
  const [saved, setSaved] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [mainImg, setMainImg] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dialogRef = useRef(null);

  // Saved items live in the visitor's own browser.
  useEffect(() => {
    try {
      setSaved(JSON.parse(localStorage.getItem("tda-saved") || "[]"));
    } catch (e) {}
  }, []);
  const toggleSaved = (id) =>
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem("tda-saved", JSON.stringify(next));
      } catch (e) {}
      return next;
    });

  const list = useMemo(() => {
    let out = PRODUCTS.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        `${p.title} ${p.subtitle} ${p.category} ${p.use || ""}`.toLowerCase().includes(query.toLowerCase())
    );
    if (sort === "az") out = [...out].sort((a, b) => a.title.localeCompare(b.title));
    return out;
  }, [category, query, sort]);

  const open = PRODUCTS.find((p) => p.id === openId) || null;

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const openProduct = (id) => {
    setMainImg(0);
    setOpenId(id);
  };

  const heroImg = PRODUCTS[0].images[0];
  const craftImg = PRODUCTS[1].images[1];

  return (
    <>
      <header className="top">
        <div className="wrap bar">
          <a className="brand" href="#top">
            Thread &amp; Design Art<small>Kashmiri chain-stitch</small>
          </a>
          <nav>
            <a className="btn ghost hide-s" href="#shop">Shop</a>
            <a className="btn ghost hide-s" href="#craft">The craft</a>
            <button className="btn ghost" onClick={() => setDrawerOpen(true)} aria-label="Saved items">
              Saved <span className="count">{saved.length}</span>
            </button>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap">
            <div>
              <span className="eyebrow">Handmade in Kashmir</span>
              <h1>
                Rugs, cushions and pashmina, <em>stitched loop by loop.</em>
              </h1>
              <p>
                Every piece is worked by hand in chain stitch by artisans in Kashmir. Browse the collection here, then
                check out safely on Etsy. We ship to the US, UK and across Europe with tracking.
              </p>
              <div className="cta">
                <a className="btn primary" href="#shop">Shop the collection</a>
                <a className="btn ghost" href={SHOP_URL} target="_blank" rel="noopener noreferrer">Visit our Etsy shop</a>
              </div>
              <div className="meta">
                <span>Custom sizes on request</span>
                <span>Secure Etsy checkout</span>
                <span>Tracked worldwide shipping</span>
              </div>
            </div>
            <figure>
              <img src={img(heroImg)} alt="Navy hand-embroidered runner in a sunlit entryway" />
              <figcaption>Navy medallion runner, 2.5 x 8 ft (75 x 240 cm)</figcaption>
            </figure>
          </div>
        </section>
        <hr className="stitch" aria-hidden="true" />

        <section className="block" id="shop">
          <div className="wrap">
            <div className="head">
              <div>
                <h2>The collection</h2>
                <p>Tap any piece for details, then buy on Etsy.</p>
              </div>
            </div>
            <div className="tools">
              <div className="chips" role="group" aria-label="Filter by category">
                {CATEGORIES.map((c) => (
                  <button key={c} className="chip" aria-pressed={c === category} onClick={() => setCategory(c)}>
                    {c}
                  </button>
                ))}
              </div>
              <span className="spacer" />
              <label className="sr" htmlFor="q">Search</label>
              <input
                className="field"
                id="q"
                type="search"
                placeholder="Search rugs, cushions, pashmina"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <select className="field" aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="feat">Featured</option>
                <option value="az">Name A to Z</option>
              </select>
            </div>

            <div className="grid">
              {list.map((p) => (
                <article className="card" key={p.id}>
                  <div style={{ position: "relative" }}>
                    <button className="thumb" onClick={() => openProduct(p.id)} aria-label={`Quick view: ${p.title}`}>
                      <Thumb product={p} />
                      {p.badge && <span className="tag hot">{p.badge}</span>}
                    </button>
                    <button
                      className="fav"
                      aria-pressed={saved.includes(p.id)}
                      aria-label={`Save ${p.title}`}
                      onClick={() => toggleSaved(p.id)}
                    >
                      <Heart />
                    </button>
                  </div>
                  <div className="info">
                    <span className="cat">{p.category}</span>
                    <h3>{p.title}</h3>
                    <span className="sub">{p.subtitle}</span>
                    <div className="row">
                      <button className="btn ghost" onClick={() => openProduct(p.id)}>Quick view</button>
                      <a className="btn primary" href={listingUrl(p.id)} target="_blank" rel="noopener noreferrer">
                        Buy on Etsy
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {list.length === 0 && (
              <p className="empty">Nothing matches that search. Try another word or clear the filter.</p>
            )}
            <p style={{ textAlign: "center", marginTop: 34 }}>
              <a className="btn ghost" href={SHOP_URL} target="_blank" rel="noopener noreferrer">
                See all 400+ pieces on Etsy
              </a>
            </p>
          </div>
        </section>

        <section className="trust">
          <div className="wrap">
            <div><h3>Made by hand</h3><p>Chain stitch is worked with a hooked needle, one loop at a time. A single rug takes weeks.</p></div>
            <div><h3>Ships worldwide</h3><p>Tracked delivery to the US, UK and Europe. Duties are shown at Etsy checkout for your country.</p></div>
            <div><h3>Custom sizes</h3><p>Need a different length or colour? Message us on Etsy and we will quote it.</p></div>
            <div><h3>Safe checkout</h3><p>Payment and buyer protection are handled by Etsy. We never see your card details.</p></div>
          </div>
        </section>

        <section className="block" id="craft">
          <div className="wrap story">
            <img src={img(craftImg)} alt="Hand-embroidered orange floral runner on a wooden floor" />
            <div>
              <span className="eyebrow">The craft</span>
              <h2 style={{ margin: "12px 0 14px", fontSize: "clamp(1.5rem,3vw,2.1rem)" }}>
                Loops of wool and silk, row after row
              </h2>
              <p>
                Kashmiri chain stitch, known locally as <i>kashida</i> work, is done with an <i>aari</i> hook on cotton.
                Wool or silk thread is pulled through in tiny interlocking loops until the whole pattern is filled in.
                Our designs range from Persian medallions to Aubusson florals.
              </p>
              <ul>
                <li>Wool and silk thread on a cotton base</li>
                <li>Hand-embroidered, not machine made</li>
                <li>Each piece can differ slightly in shade and size</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div>
            <b style={{ ...display, fontSize: "1.05rem" }}>Thread &amp; Design Art</b>
            <br />
            <span style={{ opacity: 0.75 }}>Handmade Kashmiri rugs, cushion covers and pashmina.</span>
          </div>
          <div className="links">
            <a href={SHOP_URL} target="_blank" rel="noopener noreferrer">Etsy shop</a>
            <a href="https://www.instagram.com/thread_and_design_art/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://in.pinterest.com/Threadandesignart/" target="_blank" rel="noopener noreferrer">Pinterest</a>
          </div>
        </div>
      </footer>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenId(null)}
        onClick={(e) => e.target === dialogRef.current && setOpenId(null)}
      >
        {open && (
          <div className="mwrap">
            <button className="x" onClick={() => setOpenId(null)} aria-label="Close">&times;</button>
            <div className="modal">
              <div className="gal">
                <div className="main">
                  {open.images.length ? (
                    <img src={img(open.images[mainImg])} alt={open.title} />
                  ) : (
                    <div className="ph" style={{ height: "100%", minHeight: 300 }}>
                      <div><Motif />Photos on Etsy</div>
                    </div>
                  )}
                </div>
                {open.images.length > 1 && (
                  <div className="thumbs">
                    {open.images.map((f, i) => (
                      <button key={f} aria-current={i === mainImg} aria-label={`Photo ${i + 1}`} onClick={() => setMainImg(i)}>
                        <img src={img(f)} alt="" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="body">
                <span className="eyebrow" style={{ color: "var(--accent)" }}>{open.category}</span>
                <h2>{open.title}</h2>
                <p style={{ margin: 0, color: "var(--muted)" }}>{open.subtitle}</p>
                <dl className="specs">
                  {open.size && (<><dt>Size</dt><dd>{open.size}</dd></>)}
                  <dt>Made</dt><dd>Hand-embroidered in chain stitch, Kashmir</dd>
                  {open.use && (<><dt>Great for</dt><dd>{open.use}</dd></>)}
                  <dt>Shipping</dt><dd>US, UK and Europe, with tracking</dd>
                  <dt>Custom</dt><dd>Other sizes on request</dd>
                </dl>
                {open.note && <p style={{ margin: 0, fontSize: ".8rem", color: "var(--muted)" }}>{open.note}</p>}
                <div className="actions">
                  <a className="btn primary" href={listingUrl(open.id)} target="_blank" rel="noopener noreferrer">Buy on Etsy</a>
                  <button className="btn ghost" onClick={() => toggleSaved(open.id)} aria-pressed={saved.includes(open.id)}>
                    {saved.includes(open.id) ? "Saved" : "Save for later"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>

      {drawerOpen && <div className="scrim" onClick={() => setDrawerOpen(false)} />}
      <aside className={`drawer${drawerOpen ? " open" : ""}`} aria-label="Saved items" aria-hidden={!drawerOpen}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "1.3rem" }}>Saved pieces</h2>
          <button className="btn ghost" onClick={() => setDrawerOpen(false)}>Close</button>
        </div>
        {saved.length === 0 && <p style={{ color: "var(--muted)" }}>Tap the heart on any piece to save it here.</p>}
        {saved.map((id) => {
          const p = PRODUCTS.find((x) => x.id === id);
          if (!p) return null;
          return (
            <div className="item" key={id}>
              <div className="im">{p.images[0] && <img src={img(p.images[0])} alt="" />}</div>
              <div>
                <b>{p.title}</b>
                <a href={listingUrl(p.id)} target="_blank" rel="noopener noreferrer">Buy on Etsy</a>
              </div>
              <button className="btn ghost" onClick={() => toggleSaved(id)} aria-label={`Remove ${p.title}`} style={{ padding: "6px 12px" }}>
                &times;
              </button>
            </div>
          );
        })}
      </aside>
    </>
  );
}
