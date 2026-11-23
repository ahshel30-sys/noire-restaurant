"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { galleryImages } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggers = useRef<Array<HTMLButtonElement | null>>([]);

  const close = useCallback(() => {
    const trigger = active !== null ? triggers.current[active] : null;
    setActive(null);
    window.setTimeout(() => trigger?.focus(), 20);
  }, [active]);

  const step = useCallback((direction: number) => {
    setActive((current) => {
      if (current === null) return current;
      return (current + direction + galleryImages.length) % galleryImages.length;
    });
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (active === null) {
      if (dialog.open) dialog.close();
      document.body.style.overflow = "";
      return;
    }

    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, [active]);

  const current = active !== null ? galleryImages[active] : null;

  return (
    <section className="section gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <div className="gallery__head">
          <SectionHeading
            number="04"
            label="Gallery"
            id="gallery-title"
            title={
              <>
                Frames from <em>the room.</em>
              </>
            }
          />
          <p className="gallery__note" data-reveal>
            A look inside the dining room, the kitchen and the plate. Select an image to view it
            full-size.
          </p>
        </div>

        <div className="gallery__grid" data-reveal>
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              ref={(node) => {
                triggers.current[index] = node;
              }}
              type="button"
              className={`gallery-card gallery-card--${image.span}`}
              onClick={() => setActive(index)}
              aria-label={`View image: ${image.caption}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 40vw"
                className="gallery-card__image"
              />
              <span className="gallery-card__shade" aria-hidden="true" />
              <span className="gallery-card__caption">
                <span className="gallery-card__category">{image.category}</span>
                <span className="gallery-card__title">{image.caption}</span>
              </span>
              <span className="gallery-card__expand" aria-hidden="true">
                <Expand size={15} strokeWidth={1.3} />
              </span>
            </button>
          ))}
        </div>

        <p className="gallery__foot" data-reveal>
          <span>Photography for this concept</span>
          <span>08 frames · select to enlarge</span>
        </p>
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={current ? `Gallery image: ${current.caption}` : "Gallery"}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
      >
        {current ? (
          <>
            <div className="lightbox__top">
              <p className="lightbox__counter">
                {String((active ?? 0) + 1).padStart(2, "0")}
                <span>/</span>
                {String(galleryImages.length).padStart(2, "0")}
              </p>
              <p className="lightbox__hint">Use ← → to navigate</p>
              <button
                ref={closeRef}
                type="button"
                className="lightbox__close"
                onClick={close}
                aria-label="Close gallery"
              >
                <X size={22} strokeWidth={1.3} />
              </button>
            </div>

            <div className="lightbox__stage">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="lightbox__image"
              />
            </div>

            <div className="lightbox__bottom">
              <div className="lightbox__caption">
                <p className="eyebrow eyebrow--champagne">{current.category}</p>
                <p className="lightbox__title">{current.caption}</p>
              </div>
              <div className="lightbox__nav">
                <button
                  type="button"
                  className="lightbox__arrow"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                >
                  <ArrowLeft size={18} strokeWidth={1.3} />
                </button>
                <button
                  type="button"
                  className="lightbox__arrow"
                  onClick={() => step(1)}
                  aria-label="Next image"
                >
                  <ArrowRight size={18} strokeWidth={1.3} />
                </button>
              </div>
            </div>
          </>
        ) : null}
      </dialog>
    </section>
  );
}
