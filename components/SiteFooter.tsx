"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  Check,
  Facebook,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { navLinks, site } from "@/lib/content";
import { persistDemoRecord, validateNewsletter } from "@/lib/forms";

type Status = "idle" | "submitting" | "success" | "error";

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const subscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = validateNewsletter(email);
    setError(message);
    if (message) return;

    setStatus("submitting");
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 700));
      persistDemoRecord("noire:newsletter", {
        email,
        createdAt: new Date().toISOString(),
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setError("We could not save your email in this browser. Please try again.");
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer__newsletter" data-reveal>
          <div className="footer__newsletter-copy">
            <p className="eyebrow eyebrow--champagne">Letters from the dining room</p>
            <h2 className="display display--small">
              A note from the kitchen, <em>occasionally.</em>
            </h2>
            <p>
              Seasonal menus, private dinners and the odd thought from the pass. No noise, and
              never more than once a month.
            </p>
          </div>

          <form className="newsletter" onSubmit={subscribe} noValidate>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address for the newsletter
            </label>
            <div className="newsletter__row">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Your email address"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError(null);
                  if (status !== "submitting") setStatus("idle");
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "newsletter-error" : undefined}
                required
              />
              <button
                type="submit"
                className="button button--solid newsletter__button"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={14} strokeWidth={1.5} className="spin" aria-hidden="true" />
                    Subscribing
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight size={14} strokeWidth={1.4} aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
            {error ? (
              <p className="field__error" id="newsletter-error">
                {error}
              </p>
            ) : null}
            {status === "success" ? (
              <p className="newsletter__success" role="status" aria-live="polite">
                <Check size={14} strokeWidth={1.5} aria-hidden="true" />
                You are on the list. This is a demo, so no email will be sent.
              </p>
            ) : (
              <p className="newsletter__note">
                Demo newsletter — the address is stored in your browser only.
              </p>
            )}
          </form>
        </div>

        <div className="footer__brand" data-reveal>
          <p className="footer__wordmark">NOIRÉ</p>
          <p className="footer__tagline">Contemporary Dining · Zamalek, Cairo</p>
        </div>

        <div className="footer__grid">
          <nav className="footer__col" aria-label="Footer navigation">
            <p className="eyebrow">Navigate</p>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
              <li>
                <a href="#reserve">Reservations</a>
              </li>
            </ul>
          </nav>

          <div className="footer__col">
            <p className="eyebrow">Contact</p>
            <ul className="footer__contact">
              <li>
                <MapPin size={13} strokeWidth={1.3} aria-hidden="true" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </li>
              <li>
                <Phone size={13} strokeWidth={1.3} aria-hidden="true" />
                <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li>
                <Mail size={13} strokeWidth={1.3} aria-hidden="true" />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <p className="eyebrow">Hours</p>
            <dl className="footer__hours">
              {site.hours.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="footer__col">
            <p className="eyebrow">Elsewhere</p>
            <ul className="footer__social">
              <li>
                <a href={site.socials[0].href} target="_blank" rel="noreferrer">
                  <Instagram size={14} strokeWidth={1.3} aria-hidden="true" />
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.socials[1].href} target="_blank" rel="noreferrer">
                  <Facebook size={14} strokeWidth={1.3} aria-hidden="true" />
                  Facebook
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}?subject=Private%20dining%20enquiry`}>
                  Private dining
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}?subject=Press%20enquiry`}>Press</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 NOIRÉ Contemporary Dining. All rights reserved.</p>
          <p>
            A fictional restaurant concept. Photography via{" "}
            <a href="https://unsplash.com" target="_blank" rel="noreferrer">
              Unsplash
            </a>
            .
          </p>
          <a className="footer__top" href="#home">
            Back to top
            <ArrowUp size={13} strokeWidth={1.4} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
