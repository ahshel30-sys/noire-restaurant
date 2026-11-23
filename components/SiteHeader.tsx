"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/content";

const SECTION_IDS = ["home", "story", "menu", "experience", "gallery", "contact"];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (section): section is HTMLElement => Boolean(section),
    );
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 10);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;

      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((node) => node.offsetParent !== null);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
        <div className="site-header__inner">
          <a className="wordmark" href="#home" aria-label="NOIRÉ, back to top" onClick={close}>
            <span className="wordmark__name">NOIRÉ</span>
            <span className="wordmark__sub">Contemporary Dining</span>
          </a>

          <nav className="desktop-nav" aria-label="Primary">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={isActive ? "is-active" : ""}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="site-header__actions">
            <a className="button button--header" href="#reserve">
              <span>Reserve a Table</span>
              <ArrowUpRight size={13} strokeWidth={1.4} aria-hidden="true" />
            </a>
            <button
              ref={triggerRef}
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => (open ? close() : setOpen(true))}
            >
              {open ? <X size={22} strokeWidth={1.4} /> : <Menu size={22} strokeWidth={1.4} />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="mobile-menu__inner">
            <p className="eyebrow eyebrow--champagne">Menu</p>
            <nav className="mobile-menu__nav" aria-label="Mobile primary">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  style={{ "--i": index } as React.CSSProperties}
                >
                  <span className="mobile-menu__index">0{index + 1}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </nav>
            <div className="mobile-menu__foot">
              <a className="button button--solid" href="#reserve" onClick={close}>
                Reserve a Table
                <ArrowUpRight size={14} strokeWidth={1.4} aria-hidden="true" />
              </a>
              <div className="mobile-menu__contact">
                <p>{site.address.line1}, {site.address.line2}</p>
                <a href={site.phoneHref}>{site.phone}</a>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
