"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSaved } from "./saved";

const NAV = [
  { href: "/shop", label: "Shop all" },
  { href: "/shop?cat=Rugs", label: "Rugs" },
  { href: "/shop?cat=Cushion%20covers", label: "Cushion covers" },
  { href: "/shop?cat=Pashmina", label: "Pashmina" },
  { href: "/craft/chain-stitch-rugs", label: "Chain-stitch rugs" },
  { href: "/craft/pashmina", label: "Pashmina shawls" },
  { href: "/about", label: "About us" },
  { href: "/about#contact", label: "Contact us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { ids } = useSaved();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="announce">
        <span>Handmade in Kashmir</span>
        <span className="dot">·</span>
        <span>Ships to the US, UK &amp; Europe</span>
        <span className="dot hide-sm">·</span>
        <span className="hide-sm">Secure checkout on Etsy</span>
      </div>
      <header className="hdr">
        <button className="icon-btn" aria-label="Open menu" onClick={() => setOpen(true)}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.6" fill="none" />
          </svg>
        </button>
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          THREAD <i>&amp;</i> DESIGN ART
        </Link>
        <nav className="nav" aria-label="Main">
          {NAV.slice(0, 4).map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
          <Link href="/craft/chain-stitch-rugs">Our craft</Link>
          <Link href="/about">About</Link>
          <Link href="/about#contact">Contact</Link>
        </nav>
        <div className="hdr-right">
          <Link href="/shop?saved=1" className="icon-btn" aria-label={`Saved items (${ids.length})`}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                d="M12 20.500s-7-4.300-9-8.700C1.700 8.900 3.500 5.500 6.700 5.500c1.900 0 3.300 1 4 2.200h2.600c.7-1.200 2.100-2.200 4-2.200 3.200 0 5 3.400 3.700 6.300-2 4.400-9 8.700-9 8.700z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            {ids.length > 0 && <span className="count">{ids.length}</span>}
          </Link>
        </div>
      </header>

      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <aside className={"drawer" + (open ? " open" : "")} aria-hidden={!open}>
        <button className="icon-btn close" aria-label="Close menu" onClick={() => setOpen(false)}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
        <ul>
          {NAV.map((n) => (
            <li key={n.href}>
              <Link href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            </li>
          ))}
          <li>
            <a href="https://www.etsy.com/shop/ThreadAndDesignArt" target="_blank" rel="noopener noreferrer">
              Our Etsy shop ↗
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
}
