import Image from "next/image";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <Image
          src="/images/hero-room.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero__image"
        />
        <div className="hero__wash" />
        <div className="hero__vignette" />
      </div>

      <div className="hero__frame">
        <p className="hero__kicker">
          <span className="hero__kicker-line" aria-hidden="true" />
          Contemporary Dining · Zamalek, Cairo
        </p>

        <h1 className="hero__title" id="hero-title">
          <span className="hero__title-line hero__title-line--one">An experience</span>
          <span className="hero__title-line hero__title-line--two">
            <em>beyond</em> dining.
          </span>
        </h1>

        <div className="hero__lower">
          <div className="hero__intro">
            <p className="hero__lede">
              Where contemporary culinary artistry meets timeless hospitality.
            </p>
            <div className="hero__actions">
              <a className="button button--solid" href="#menu">
                Explore Our Menu
                <ArrowRight size={15} strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a className="button button--ghost" href="#reserve">
                Reserve Your Table
              </a>
            </div>
          </div>

          <aside className="hero__aside" aria-label="Restaurant details">
            <p className="hero__aside-label">Dinner</p>
            <p className="hero__aside-value">Tuesday — Sunday<br />18:00 — 23:30</p>
            <p className="hero__aside-place">
              <MapPin size={12} strokeWidth={1.4} aria-hidden="true" />
              12 Corniche El Nil, Zamalek
            </p>
          </aside>
        </div>

        <div className="hero__foot">
          <p className="hero__foot-item">
            <span className="hero__foot-number">01</span>
            <span>Seasonal kitchen · Nile-side dining room</span>
          </p>
          <a className="hero__scroll" href="#story">
            <span>Scroll to discover</span>
            <ArrowDown size={14} strokeWidth={1.3} aria-hidden="true" />
          </a>
          <p className="hero__foot-item hero__foot-item--end">
            <span className="hero__foot-number">30.0601° N</span>
            <span>31.2204° E</span>
          </p>
        </div>
      </div>

      <p className="hero__side-note" aria-hidden="true">
        <span>Est. MMXIX</span>
        <span className="hero__side-rule" />
        <span>Cairo · Egypt</span>
      </p>
    </section>
  );
}
