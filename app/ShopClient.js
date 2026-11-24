"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Card from "./Card";
import { LISTINGS } from "./catalog";
import { useSaved } from "./saved";

const GROUPS = [
  { key: "category", label: "Category", opts: ["Rugs", "Cushion covers", "Pashmina"] },
  { key: "technique", label: "Technique", opts: ["Chain stitch", "Hand-tufted", "Hand-knotted", "Other handmade"] },
  { key: "sizeBucket", label: "Rug size", opts: ["Small · up to 3×5 ft", "Medium · 4×6 to 5×8 ft", "Large · 6×9 ft and up"] },
  { key: "material", label: "Material", opts: ["Wool", "Silk", "Wool & silk", "Wool & bamboo silk", "Bamboo silk", "Viscose"] },
  { key: "era", label: "Style", opts: ["Vintage & antique"] },
];

const EMPTY = { category: [], technique: [], sizeBucket: [], material: [], era: [] };
const STEP = 24;

export default function ShopClient() {
  const [sel, setSel] = useState(EMPTY);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("new");
  const [savedOnly, setSavedOnly] = useState(false);
  const [shown, setShown] = useState(STEP);
  const [panel, setPanel] = useState(false);
  const { ids } = useSaved();

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setSel({
      ...EMPTY,
      category: p.get("cat") ? [p.get("cat")] : [],
      technique: p.get("tech") ? [p.get("tech")] : [],
    });
    setQ(p.get("q") || "");
    setSavedOnly(p.get("saved") === "1");
  }, []);

  const counts = useMemo(() => {
    const c = {};
    for (const g of GROUPS) for (const o of g.opts) c[g.key + o] = LISTINGS.filter((l) => l[g.key] === o).length;
    return c;
  }, []);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let out = LISTINGS.filter((l) => {
      for (const g of GROUPS) if (sel[g.key].length && !sel[g.key].includes(l[g.key])) return false;
      if (needle && !l.title.toLowerCase().includes(needle)) return false;
      if (savedOnly && !ids.includes(l.id)) return false;
      return true;
    });
    if (sort === "az") out = [...out].sort((a, b) => a.name.localeCompare(b.name) || a.order - b.order);
    return out;
  }, [sel, q, sort, savedOnly, ids]);

  useEffect(() => setShown(STEP), [sel, q, sort, savedOnly]);

  const toggle = (key, opt) =>
    setSel((s) => ({ ...s, [key]: s[key].includes(opt) ? s[key].filter((x) => x !== opt) : [...s[key], opt] }));

  const active = GROUPS.flatMap((g) => sel[g.key].map((o) => ({ key: g.key, opt: o })));
  const clear = () => {
    setSel(EMPTY);
    setQ("");
    setSavedOnly(false);
  };

  const title =
    sel.category.length === 1 && !savedOnly
      ? sel.category[0]
      : savedOnly
      ? "Saved pieces"
      : "All handmade pieces";

  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> <span>/</span> <Link href="/shop">Shop</Link>
        {sel.category.length === 1 && (
          <>
            {" "}
            <span>/</span> <b>{sel.category[0]}</b>
          </>
        )}
      </nav>
      <h1 className="page-title">{title}</h1>
      <p className="lede center">
        {LISTINGS.length} handmade designs from Kashmir. Tap any piece to see full details, sizes and
        availability, and to check out securely on Etsy.
      </p>

      <div className="shop">
        <aside className={"filters" + (panel ? " open" : "")}>
          <div className="filters-head">
            <span>FILTER BY</span>
            <button className="icon-btn only-sm" onClick={() => setPanel(false)} aria-label="Close filters">✕</button>
          </div>
          <label className="search">
            <input
              type="search"
              placeholder="Search designs (e.g. Aubusson)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
          {GROUPS.map((g) => (
            <fieldset key={g.key}>
              <legend>{g.label}</legend>
              {g.opts.map((o) => (
                <label key={o} className="check">
                  <input type="checkbox" checked={sel[g.key].includes(o)} onChange={() => toggle(g.key, o)} />
                  <span>{o}</span>
                  <em>({counts[g.key + o]})</em>
                </label>
              ))}
            </fieldset>
          ))}
          <label className="check saved-toggle">
            <input type="checkbox" checked={savedOnly} onChange={(e) => setSavedOnly(e.target.checked)} />
            <span>Saved only</span>
            <em>({ids.length})</em>
          </label>
        </aside>

        <section>
          <div className="topbar">
            <button className="btn ghost only-sm" onClick={() => setPanel(true)}>Filters{active.length ? ` (${active.length})` : ""}</button>
            <div className="chips">
              {active.map((a) => (
                <button key={a.key + a.opt} className="chip" onClick={() => toggle(a.key, a.opt)}>
                  {a.opt} <span aria-hidden="true">✕</span>
                </button>
              ))}
              {(active.length > 0 || q || savedOnly) && (
                <button className="link" onClick={clear}>Clear all</button>
              )}
            </div>
            <label className="sort">
              <span className="sr">Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="new">Newest first</option>
                <option value="az">Name A–Z</option>
              </select>
            </label>
          </div>

          <p className="result-count">{list.length} {list.length === 1 ? "piece" : "pieces"}</p>

          {list.length === 0 ? (
            <div className="empty">
              <p>No pieces match those filters.</p>
              <button className="btn" onClick={clear}>Clear filters</button>
            </div>
          ) : (
            <div className="grid g3">
              {list.slice(0, shown).map((it) => (
                <Card key={it.id} item={it} />
              ))}
            </div>
          )}

          {shown < list.length && (
            <p className="center mt">
              <button className="btn" onClick={() => setShown((n) => n + STEP)}>
                Load more ({list.length - shown} left)
              </button>
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
