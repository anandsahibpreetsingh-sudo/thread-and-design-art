"use client";
import Link from "next/link";
import { imgUrl, listingUrl } from "./catalog";
import { useSaved } from "./saved";

export default function Card({ item }) {
  const { ids, toggle } = useSaved();
  const saved = ids.includes(item.id);
  const [a, b] = item.images;
  const href = listingUrl(item.id);
  return (
    <article className="card">
      <div className="thumb">
        <Link href={`/product/${item.id}`} aria-label={item.title}>
          <img className="i1" src={imgUrl(a)} alt={item.title} loading="lazy" />
          {b && <img className="i2" src={imgUrl(b)} alt="" loading="lazy" />}
        </Link>
        {item.isNew && <span className="badge">New</span>}
        <button
          type="button"
          className={"heart" + (saved ? " on" : "")}
          onClick={() => toggle(item.id)}
          aria-pressed={saved}
          aria-label={saved ? "Remove from saved" : "Save"}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M12 21s-7.5-4.6-9.6-9.2C1 8.6 2.9 5 6.3 5c2 0 3.5 1.1 4.2 2.4h3C14.2 6.1 15.700 5 17.700 5c3.400 0 5.300 3.600 3.900 6.800C19.500 16.400 12 21 12 21z" />
          </svg>
        </button>
      </div>
      <div className="meta">
        <h3><Link href={`/product/${item.id}`}>{item.name}</Link></h3>
        <p className="sub">{item.sub}</p>
        {item.size && <p className="size">{item.size}</p>}
        <a className="btn-line" href={href} target="_blank" rel="noopener noreferrer">
          View on Etsy
        </a>
      </div>
    </article>
  );
}
