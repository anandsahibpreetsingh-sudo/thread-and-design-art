import Link from "next/link";
import { SHOP_URL } from "./catalog";

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap ftr-grid">
        <div>
          <p className="logo sm">
            THREAD <i>&amp;</i> DESIGN ART
          </p>
          <p className="muted">
            Handmade Kashmiri chain-stitch rugs, cushion covers and pashmina, made by artisans and
            shipped to your door.
          </p>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            <li><Link href="/shop?cat=Rugs">Rugs</Link></li>
            <li><Link href="/shop?cat=Cushion%20covers">Cushion covers</Link></li>
            <li><Link href="/shop?cat=Pashmina">Pashmina</Link></li>
            <li><Link href="/shop">Everything</Link></li>
          </ul>
        </div>
        <div>
          <h4>Our craft</h4>
          <ul>
            <li><Link href="/craft/chain-stitch-rugs">How chain-stitch rugs are made</Link></li>
            <li><Link href="/craft/pashmina">Handcrafted pashmina shawls</Link></li>
            <li><Link href="/about">About us</Link></li>
          </ul>
        </div>
        <div>
          <h4>Buy with confidence</h4>
          <ul>
            <li>Checkout and payment on Etsy</li>
            <li>Custom sizes on request</li>
            <li>
              <a href={SHOP_URL} target="_blank" rel="noopener noreferrer">Visit our Etsy shop ↗</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap fine">© {new Date().getFullYear()} Thread and Design Art. All rights reserved.</div>
    </footer>
  );
}
