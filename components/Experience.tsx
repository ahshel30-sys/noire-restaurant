"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { experiences } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";

export default function Experience() {
  const [active, setActive] = useState(0);
  const current = experiences[active];

  return (
    <section className="section experience" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading
          number="03"
          label="Signature Experience"
          id="experience-title"
          title={
            <>
              More than a meal. <em>A moment.</em>
            </>
          }
          lede="Four ways to spend an evening with us — from the theatre of the pass to a private room of your own."
        />

        <div className="experience__grid">
          <figure className="experience__visual" data-reveal>
            <div className="experience__frame">
              <Image
                key={current.image}
                src={current.image}
                alt={current.alt}
                fill
                sizes="(max-width: 900px) 92vw, 46vw"
                className="experience__image"
              />
              <div className="experience__shade" aria-hidden="true" />
              <figcaption className="experience__caption">
                <span className="experience__caption-number">{current.number}</span>
                <span className="experience__caption-title">{current.title}</span>
                <span className="experience__caption-note">{current.eyebrow}</span>
              </figcaption>
            </div>
          </figure>

          <div className="experience__list" data-reveal>
            {experiences.map((item, index) => {
              const open = active === index;
              return (
                <div className={`experience__item ${open ? "is-open" : ""}`} key={item.id}>
                  <h3>
                    <button
                      type="button"
                      id={`experience-button-${item.id}`}
                      aria-expanded={open}
                      aria-controls={`experience-panel-${item.id}`}
                      onClick={() => setActive(index)}
                    >
                      <span className="experience__number">{item.number}</span>
                      <span className="experience__title">{item.title}</span>
                      <span className="experience__icon" aria-hidden="true">
                        {open ? (
                          <Minus size={16} strokeWidth={1.3} />
                        ) : (
                          <Plus size={16} strokeWidth={1.3} />
                        )}
                      </span>
                    </button>
                  </h3>
                  <div
                    className="experience__panel"
                    id={`experience-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`experience-button-${item.id}`}
                    aria-hidden={!open}
                  >
                    <div className="experience__panel-inner">
                      <p className="eyebrow eyebrow--champagne">{item.eyebrow}</p>
                      <p className="experience__description">{item.description}</p>
                      <ul className="experience__details">
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}

            <a className="text-link experience__link" href="#reserve">
              Enquire about a private table
              <ArrowRight size={14} strokeWidth={1.4} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
