"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/content";
import { SectionLabel } from "./ui/SectionHeading";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  const step = (direction: number) =>
    setActive((index) => (index + direction + testimonials.length) % testimonials.length);

  return (
    <section className="section testimonials" id="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <div className="testimonials__grid">
          <div className="testimonials__intro" data-reveal>
            <SectionLabel number="06">In Their Words</SectionLabel>
            <h2 className="display" id="testimonials-title">
              The room, <em>remembered.</em>
            </h2>
            <p className="testimonials__lede">
              A few words from the people who have spent an evening with us. The kind of review we
              hope to earn, one table at a time.
            </p>

            <div className="testimonials__people" role="group" aria-label="Choose a guest impression">
              {testimonials.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={active === index ? "is-active" : ""}
                  aria-pressed={active === index}
                  onClick={() => setActive(index)}
                >
                  <span className="testimonials__person-index">0{index + 1}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          <figure className="testimonials__quote" data-reveal aria-live="polite">
            <span className="testimonials__mark" aria-hidden="true">
              “
            </span>
            <blockquote key={current.id}>
              <p>{current.quote}</p>
            </blockquote>
            <figcaption>
              <span className="testimonials__name">{current.name}</span>
              <span className="testimonials__detail">{current.detail}</span>
            </figcaption>

            <div className="testimonials__controls">
              <button type="button" onClick={() => step(-1)} aria-label="Previous impression">
                <ChevronLeft size={18} strokeWidth={1.3} />
              </button>
              <p>
                {String(active + 1).padStart(2, "0")}
                <span>/</span>
                {String(testimonials.length).padStart(2, "0")}
              </p>
              <button type="button" onClick={() => step(1)} aria-label="Next impression">
                <ChevronRight size={18} strokeWidth={1.3} />
              </button>
            </div>
          </figure>
        </div>

        <p className="testimonials__note" data-reveal>
          <span aria-hidden="true">✦</span>
          Guest impressions are fictional demonstration content created for this portfolio concept.
        </p>
      </div>
    </section>
  );
}
