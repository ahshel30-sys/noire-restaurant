"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { menuCategories, menuItems, type MenuCategory } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";

type Filter = "all" | MenuCategory;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...menuCategories.map((category) => ({ id: category.id as Filter, label: category.label })),
];

export default function MenuSection() {
  const [active, setActive] = useState<Filter>("all");

  const items = useMemo(
    () => (active === "all" ? menuItems : menuItems.filter((item) => item.category === active)),
    [active],
  );

  const countFor = (filter: Filter) =>
    filter === "all" ? menuItems.length : menuItems.filter((item) => item.category === filter).length;

  return (
    <section className="section menu-section" id="menu" aria-labelledby="menu-title">
      <div className="container">
        <SectionHeading
          number="02"
          label="The Menu"
          id="menu-title"
          title={
            <>
              Written each morning, <em>served after dark.</em>
            </>
          }
          lede="A seasonal menu that follows the market. Four chapters, one kitchen — and always a reason to stay for one more course."
        />

        <div className="menu-toolbar" data-reveal>
          <div className="menu-tabs" role="group" aria-label="Filter the menu by course">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`menu-tab ${active === filter.id ? "is-active" : ""}`}
                aria-pressed={active === filter.id}
                onClick={() => setActive(filter.id)}
              >
                <span>{filter.label}</span>
                <sup>{String(countFor(filter.id)).padStart(2, "0")}</sup>
              </button>
            ))}
          </div>
          <p className="menu-toolbar__note">
            <span>Sample menu</span>
            <span>Prices in EGP</span>
          </p>
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {items.length} {items.length === 1 ? "dish" : "dishes"}
          {active === "all" ? " across all courses" : ""}.
        </p>

        <div className="menu-grid" key={active}>
          {items.map((item) => (
            <article className="menu-item" key={item.id}>
              <div className="menu-item__image">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 88px, 112px"
                  className="menu-item__img"
                />
              </div>
              <div className="menu-item__body">
                {active === "all" ? (
                  <p className="menu-item__course">
                    {menuCategories.find((category) => category.id === item.category)?.label}
                  </p>
                ) : null}
                <h3 className="menu-item__name">{item.name}</h3>
                <p className="menu-item__description">{item.description}</p>
                {item.labels.length ? (
                  <ul className="menu-item__labels" aria-label="Dietary information">
                    {item.labels.map((label) => (
                      <li key={label}>{label}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <p className="menu-item__price">
                <span>EGP</span>
                {item.price.toLocaleString("en-EG")}
              </p>
            </article>
          ))}
        </div>

        <div className="menu-foot" data-reveal>
          <p>
            <span className="menu-foot__mark" aria-hidden="true">
              ✦
            </span>
            Please tell us about any allergies or dietary requirements when you reserve. The kitchen
            will write around them.
          </p>
          <a className="text-link" href="#reserve">
            Reserve a table
            <ArrowRight size={14} strokeWidth={1.4} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
