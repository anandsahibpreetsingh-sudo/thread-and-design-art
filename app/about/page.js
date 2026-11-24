import Link from "next/link";
import { SHOP_URL } from "../catalog";

export const metadata = {
  title: "About us | Thread and Design Art",
  description: "The story behind Thread and Design Art: handmade Kashmiri chain-stitch rugs, cushion covers and pashmina.",
};

export default function About() {
  return (
    <>
      <section className="page-head">
        <p className="eyebrow">About us</p>
        <h1>Handmade Kashmiri textiles, sent to your home</h1>
        <p className="lede">
          Thread and Design Art is a small business that brings the chain-stitch rugs, embroidered
          cushion covers and pashmina of Kashmir to homes in the US, UK and Europe.
        </p>
      </section>

      <section className="wrap prose two">
        <div>
          <h2>Our story</h2>
          <p>
            Kashmir has a long tradition of embroidery, and chain stitch is one of its signature
            techniques. We started Thread and Design Art to make these pieces easy to find and easy
            to buy: real handwork, shown honestly, with clear sizes and photos.
          </p>
          <p>
            We work with artisans who stitch each rug, cushion cover and shawl by hand. No two
            pieces are exactly alike, and small differences in colour and pattern are part of what
            makes handmade special.
          </p>
        </div>
        <div>
          <h2>What we make and sell</h2>
          <ul className="ticks">
            <li><b>Chain-stitch rugs</b>: wool and silk embroidery in traditional, Aubusson, kilim and modern designs, from small accent rugs to large area rugs.</li>
            <li><b>Cushion covers</b>: hand-embroidered pairs and singles in wool and silk.</li>
            <li><b>Pashmina</b>: scarves and shawls, including pieces with zari embroidery.</li>
            <li><b>Custom sizes</b>: ask us if you need a different size or colourway.</li>
          </ul>
        </div>
      </section>

      <section className="split soft">
        <div>
          <p className="eyebrow">Meet the maker</p>
          <h2>Hello, I&apos;m behind Thread and Design Art</h2>
          <p>
            I run the shop myself, from choosing designs to packing every order and answering your
            questions. If you are unsure about size, colour or how a rug will look in your room,
            message me on Etsy and I will help you pick.
          </p>
          <p>
            Thank you for supporting handmade work and the artisans behind it.
          </p>
          <a className="btn" href={SHOP_URL} target="_blank" rel="noopener noreferrer">Message us on Etsy ↗</a>
        </div>
        <img src="/images/orange-real.jpg" alt="Handmade chain-stitch rug" loading="lazy" />
      </section>

      <section className="wrap section">
        <h2 className="center">Learn about the craft</h2>
        <div className="tiles two">
          <Link href="/craft/chain-stitch-rugs" className="tile text">
            <span>How chain-stitch rugs are made <small>From drawing to finished rug</small></span>
          </Link>
          <Link href="/craft/pashmina" className="tile text">
            <span>Handcrafted pashmina shawls <small>From mountain goat to shawl</small></span>
          </Link>
        </div>
      </section>
    </>
  );
}
