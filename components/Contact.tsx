"use client";

import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Facebook,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { contactSubjects, site } from "@/lib/content";
import {
  persistDemoRecord,
  validateContact,
  type ContactValues,
  type Errors,
} from "@/lib/forms";
import { SectionHeading } from "./ui/SectionHeading";
import MapPanel from "./MapPanel";

const emptyValues: ContactValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [values, setValues] = useState<ContactValues>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sentName, setSentName] = useState("");

  const update = (field: keyof ContactValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 850));
      persistDemoRecord("noire:messages", {
        ...values,
        createdAt: new Date().toISOString(),
      });
      setSentName(values.name);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(emptyValues);
    setErrors({});
    setSentName("");
    setStatus("idle");
    window.setTimeout(() => document.getElementById("contact-name")?.focus(), 50);
  };

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          number="07"
          label="Visit"
          id="contact-title"
          title={
            <>
              Find us <em>after dark.</em>
            </>
          }
          lede="On the Corniche in Zamalek, with the Nile on one side and a long evening on the other. We would love to hear from you."
        />

        <div className="contact__grid">
          <aside className="contact__details" data-reveal>
            <div className="contact__detail">
              <span className="contact__icon" aria-hidden="true">
                <MapPin size={16} strokeWidth={1.3} />
              </span>
              <div>
                <p className="eyebrow">Address</p>
                <address>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.country}
                </address>
                <p className="contact__sample">Demo location — fictional address</p>
              </div>
            </div>

            <div className="contact__detail">
              <span className="contact__icon" aria-hidden="true">
                <Phone size={16} strokeWidth={1.3} />
              </span>
              <div>
                <p className="eyebrow">Telephone</p>
                <p>
                  <a href={site.phoneHref}>{site.phone}</a>
                </p>
                <p className="contact__sample">Sample number</p>
              </div>
            </div>

            <div className="contact__detail">
              <span className="contact__icon" aria-hidden="true">
                <Mail size={16} strokeWidth={1.3} />
              </span>
              <div>
                <p className="eyebrow">Email</p>
                <p>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
                <p className="contact__sample">Demo address</p>
              </div>
            </div>

            <div className="contact__detail">
              <span className="contact__icon" aria-hidden="true">
                <Clock size={16} strokeWidth={1.3} />
              </span>
              <div>
                <p className="eyebrow">Opening hours</p>
                <dl className="contact__hours">
                  {site.hours.map((item) => (
                    <div key={item.label}>
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="contact__socials">
              <p className="eyebrow">Follow the room</p>
              <div>
                <a href={site.socials[0].href} target="_blank" rel="noreferrer">
                  <Instagram size={15} strokeWidth={1.3} aria-hidden="true" />
                  Instagram
                  <ArrowUpRight size={12} strokeWidth={1.4} aria-hidden="true" />
                </a>
                <a href={site.socials[1].href} target="_blank" rel="noreferrer">
                  <Facebook size={15} strokeWidth={1.3} aria-hidden="true" />
                  Facebook
                  <ArrowUpRight size={12} strokeWidth={1.4} aria-hidden="true" />
                </a>
              </div>
            </div>
          </aside>

          <div className="contact__form-wrap" data-reveal>
            {status === "success" ? (
              <div className="contact__success" role="status" aria-live="polite">
                <span className="reservation__success-icon" aria-hidden="true">
                  <Check size={24} strokeWidth={1.4} />
                </span>
                <p className="eyebrow eyebrow--champagne">Message recorded</p>
                <h3>Thank you, {sentName.split(" ")[0]}.</h3>
                <p>
                  Your note has been saved locally for this demonstration. In production, it would
                  reach the NOIRÉ team by email and be answered within one working day.
                </p>
                <p className="demo-note">
                  <AlertCircle size={13} strokeWidth={1.4} aria-hidden="true" />
                  Demo only — no message was sent.
                </p>
                <button type="button" className="button button--ghost" onClick={reset}>
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="contact__form-head">
                  <p className="eyebrow">Write to us</p>
                  <h3>Start a conversation</h3>
                </div>

                {status === "error" ? (
                  <p className="form-alert" role="alert">
                    <AlertCircle size={15} strokeWidth={1.4} aria-hidden="true" />
                    Your message could not be saved in this browser. Please try again or email{" "}
                    <a href={`mailto:${site.email}`}>{site.email}</a>.
                  </p>
                ) : null}

                <form
                  className="form contact__form"
                  onSubmit={handleSubmit}
                  noValidate
                  aria-busy={status === "submitting"}
                >
                  <div className={`field ${errors.name ? "has-error" : ""}`}>
                    <label htmlFor="contact-name">
                      Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={values.name}
                      onChange={(event) => update("name", event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      required
                    />
                    {errors.name ? (
                      <p className="field__error" id="contact-name-error">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div className={`field ${errors.email ? "has-error" : ""}`}>
                    <label htmlFor="contact-email">
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={(event) => update("email", event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      required
                    />
                    {errors.email ? (
                      <p className="field__error" id="contact-email-error">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div className={`field field--full ${errors.subject ? "has-error" : ""}`}>
                    <label htmlFor="contact-subject">
                      Subject <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={values.subject}
                      onChange={(event) => update("subject", event.target.value)}
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                      required
                    >
                      <option value="">Choose a subject</option>
                      {contactSubjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                    {errors.subject ? (
                      <p className="field__error" id="contact-subject-error">
                        {errors.subject}
                      </p>
                    ) : null}
                  </div>

                  <div className={`field field--full ${errors.message ? "has-error" : ""}`}>
                    <label htmlFor="contact-message">
                      Message <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      maxLength={1000}
                      placeholder="Tell us what is on your mind…"
                      value={values.message}
                      onChange={(event) => update("message", event.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? "contact-message-error" : "contact-message-hint"
                      }
                      required
                    />
                    <div className="field__meta">
                      <span id="contact-message-hint">At least 10 characters</span>
                      <span>{values.message.length}/1000</span>
                    </div>
                    {errors.message ? (
                      <p className="field__error" id="contact-message-error">
                        {errors.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="form__foot field--full">
                    <button
                      type="submit"
                      className="button button--solid button--wide"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 size={15} strokeWidth={1.5} className="spin" aria-hidden="true" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <ArrowRight size={15} strokeWidth={1.4} aria-hidden="true" />
                        </>
                      )}
                    </button>
                    <p className="demo-note">
                      <AlertCircle size={13} strokeWidth={1.4} aria-hidden="true" />
                      Demo only — messages are stored in your browser and never sent.
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        <MapPanel />
      </div>
    </section>
  );
}
