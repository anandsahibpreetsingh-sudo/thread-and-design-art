import Link from "next/link";
import { SHOP_URL, CONTACT } from "../catalog";

export const metadata = {
  title: "About us",
  description:
    "Thread and Design Art carries forward Anand Creations, a Kashmiri handicraft exporter since 2000 and one of the leading chain-stitch exporters in India.",
};

export default function About() {
  return (
    <>
      <section className="page-head">
        <p className="eyebrow">About us</p>
        <h1>Handmade Kashmiri textiles, with a legacy since 2000</h1>
        <p className="lede">
          Thread and Design Art is the retail side of Anand Creations, a family business that has
          exported handmade carpets, cushion covers and chain stitch from India for more than two
          decades.
        </p>
      </section>

      <section className="wrap prose two">
        <div>
          <h2>Our story</h2>
          <p>
            Anand Creations was started in 2000 by my father, Mr. Gurpreet Singh Anand, beginning very small as an exporter of
            handmade carpets, cushion covers, chain stitch and other home furnishing items.
          </p>
          <p>
            Over the years it grew into one of the leading exporters of chain stitch, and was
            awarded the highest exports from EEPC in 2007-08 and 2008-09.
          </p>
          <p>
            I took that legacy further by starting the retail business for these products, bringing
            the same craftsmanship directly to homes around the world, with more innovation
            in design along the way.
          </p>
        </div>
        <div>
          <h2>What sets us apart</h2>
          <ul className="ticks">
            <li><b>Exclusive designs</b>: we are known for unique, original patterns you will not find everywhere.</li>
            <li><b>Made to order</b>: we can make almost any design on request, in the size and colours you need.</li>
            <li><b>Chain-stitch expertise</b>: rugs, cushion covers and more, in wool and silk.</li>
            <li><b>Pashmina</b>: scarves and shawls, including pieces with zari embroidery.</li>
            <li><b>Global business</b>: we work with customers and trade partners all over the world.</li>
          </ul>
        </div>
      </section>

      <section className="wrap section">
        <h2 className="center">Our journey</h2>
        <ol className="steps">
          <li>
            <span className="num">2000</span>
            <div>
              <h3>Anand Creations begins</h3>
              <p>A small export business for handmade carpets, cushion covers, chain stitch and home furnishings.</p>
            </div>
          </li>
          <li>
            <span className="num">2007-09</span>
            <div>
              <h3>Recognised for exports</h3>
              <p>Awarded the highest exports from EEPC in 2007-08 and 2008-09, as one of the leading chain-stitch exporters.</p>
            </div>
          </li>
          <li>
            <span className="num">Today</span>
            <div>
              <h3>Thread and Design Art</h3>
              <p>The retail business, offering the full collection and custom designs directly to you.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="split soft">
        <div>
          <p className="eyebrow">Meet the maker</p>
          <h2>Hello, I&apos;m Sahib Anand, the maker behind Thread and Design Art</h2>
          <p>
            I grew up around this craft, and I run the shop myself, from choosing designs to packing
            every order and answering your questions. If you are unsure about size, colour or how a
            rug will look in your room, message me and I will help you choose, or design something
            made just for you.
          </p>
          <p>Thank you for supporting handmade work and the artisans behind it.</p>
          <a className="btn" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
        </div>
        <img
          src="/images/founder.jpg"
          alt="Sahib Anand, founder of Thread and Design Art, seated in front of a Kashmiri embroidered wall hanging"
          style={{ objectPosition: "center 20%" }}
          loading="lazy"
        />
      </section>

      <section className="wrap section" id="contact">
        <h2 className="center">Contact us</h2>
        <p className="lede center">
          Questions, custom designs or trade enquiries? Reach out on whichever suits you best.
        </p>
        <div className="contact-cards">
          <a className="contact-card" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
            <small>WhatsApp</small>
            <span>{CONTACT.phone}</span>
          </a>
          <a className="contact-card" href={`mailto:${CONTACT.email}`}>
            <small>Email</small>
            <span>{CONTACT.email}</span>
          </a>
          <a className="contact-card" href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
            <small>Instagram</small>
            <span>@thread_and_design_art</span>
          </a>
        </div>
        <p className="center mt">
          <a className="btn-line" href={SHOP_URL} target="_blank" rel="noopener noreferrer">Visit our Etsy shop ↗</a>
        </p>
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
