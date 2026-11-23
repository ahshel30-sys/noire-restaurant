"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Loader2,
  Phone,
  Users,
} from "lucide-react";
import {
  formatDateLong,
  persistDemoRecord,
  reservationReference,
  todayISO,
  validateReservation,
  downloadCalendarFile,
  type Errors,
  type ReservationValues,
} from "@/lib/forms";
import { guestOptions, reservationTimes, site } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";

const emptyValues: ReservationValues = {
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  guests: "2",
  requests: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export default function Reservation() {
  const [values, setValues] = useState<ReservationValues>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");
  const [saved, setSaved] = useState<ReservationValues | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set after hydration so server and client markup stay identical.
    if (dateRef.current) dateRef.current.min = todayISO();
  }, []);

  const update = (field: keyof ReservationValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (status === "error") setStatus("idle");
  };

  const blurValidate = (field: keyof ReservationValues) => {
    const nextErrors = validateReservation(values);
    if (nextErrors[field]) {
      setErrors((current) => ({ ...current, [field]: nextErrors[field] }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateReservation(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      const field = document.getElementById(`reservation-${firstField}`);
      field?.focus();
      return;
    }

    setStatus("submitting");
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 900));
      const nextReference = reservationReference();
      persistDemoRecord("noire:reservations", {
        ...values,
        reference: nextReference,
        createdAt: new Date().toISOString(),
      });
      setSaved(values);
      setReference(nextReference);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(emptyValues);
    setErrors({});
    setReference("");
    setSaved(null);
    setStatus("idle");
    window.setTimeout(() => document.getElementById("reservation-name")?.focus(), 50);
  };

  const fieldError = (field: keyof ReservationValues) =>
    errors[field] ? (
      <p className="field__error" id={`reservation-${field}-error`}>
        {errors[field]}
      </p>
    ) : null;

  return (
    <section className="section reservation" id="reserve" aria-labelledby="reserve-title">
      <div className="container">
        <SectionHeading
          number="05"
          label="Reservations"
          id="reserve-title"
          title={
            <>
              Your table <em>awaits.</em>
            </>
          }
          lede="Dinner is served Tuesday to Sunday. Tell us when you would like to join us, and we will take care of the rest."
        />

        <div className="reservation__grid">
          <aside className="reservation__aside" data-reveal>
            <div className="reservation__visual">
              <Image
                src="/images/reservation-bar.webp"
                alt="Amber light catching a crystal glass at the NOIRÉ bar"
                fill
                sizes="(max-width: 900px) 92vw, 38vw"
                className="reservation__image"
              />
              <div className="reservation__shade" aria-hidden="true" />
              <blockquote className="reservation__quote">
                <p>“Evenings at NOIRÉ are paced, not rushed.”</p>
                <cite>The dining room</cite>
              </blockquote>
            </div>
            <div className="reservation__details">
              <div>
                <span className="reservation__detail-icon" aria-hidden="true">
                  <Clock size={14} strokeWidth={1.3} />
                </span>
                <div>
                  <p className="eyebrow">Seatings</p>
                  <p>18:00 — 22:00 · Tuesday to Sunday</p>
                </div>
              </div>
              <div>
                <span className="reservation__detail-icon" aria-hidden="true">
                  <Users size={14} strokeWidth={1.3} />
                </span>
                <div>
                  <p className="eyebrow">Larger parties</p>
                  <p>
                    For nine or more guests,{" "}
                    <a href="#contact">speak with us directly</a>.
                  </p>
                </div>
              </div>
              <div>
                <span className="reservation__detail-icon" aria-hidden="true">
                  <Phone size={14} strokeWidth={1.3} />
                </span>
                <div>
                  <p className="eyebrow">Prefer to call</p>
                  <p>
                    <a href={site.phoneHref}>{site.phone}</a>{" "}
                    <span className="reservation__sample">(sample)</span>
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <div className="reservation__card" data-reveal>
            {status === "success" && saved ? (
              <div className="reservation__success" role="status" aria-live="polite">
                <span className="reservation__success-icon" aria-hidden="true">
                  <Check size={24} strokeWidth={1.4} />
                </span>
                <p className="eyebrow eyebrow--champagne">Request recorded</p>
                <h3 className="reservation__success-title">Your table is noted.</h3>
                <p className="reservation__success-lede">
                  Thank you, {saved.name.split(" ")[0]}. Your request has been saved locally for
                  this demonstration. A real restaurant would confirm by email within a few hours.
                </p>

                <dl className="reservation__summary">
                  <div>
                    <dt>Date</dt>
                    <dd>{formatDateLong(saved.date)}</dd>
                  </div>
                  <div>
                    <dt>Time</dt>
                    <dd>{saved.time}</dd>
                  </div>
                  <div>
                    <dt>Guests</dt>
                    <dd>{saved.guests}</dd>
                  </div>
                  <div>
                    <dt>Reference</dt>
                    <dd>{reference}</dd>
                  </div>
                </dl>

                {saved.requests ? (
                  <p className="reservation__success-note">
                    <strong>Your note:</strong> {saved.requests}
                  </p>
                ) : null}

                <p className="demo-note">
                  <AlertCircle size={13} strokeWidth={1.4} aria-hidden="true" />
                  Demo only — no table has been booked and no data was sent to a restaurant.
                </p>

                <div className="reservation__success-actions">
                  <button
                    type="button"
                    className="button button--solid"
                    onClick={() => downloadCalendarFile(saved, reference)}
                  >
                    Add to calendar
                    <Calendar size={14} strokeWidth={1.4} aria-hidden="true" />
                  </button>
                  <button type="button" className="button button--ghost" onClick={reset}>
                    Make another request
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="reservation__card-head">
                  <p className="eyebrow">Book a table</p>
                  <h3>Reserve your evening</h3>
                  <p>Fields marked <span aria-hidden="true">*</span> are required.</p>
                </div>

                {status === "error" ? (
                  <p className="form-alert" role="alert">
                    <AlertCircle size={15} strokeWidth={1.4} aria-hidden="true" />
                    We could not save your request in this browser. Please try again, or call us on{" "}
                    <a href={site.phoneHref}>{site.phone}</a>.
                  </p>
                ) : null}

                <form
                  ref={formRef}
                  className="form reservation__form"
                  onSubmit={handleSubmit}
                  noValidate
                  aria-busy={status === "submitting"}
                >
                  <div className={`field field--full ${errors.name ? "has-error" : ""}`}>
                    <label htmlFor="reservation-name">
                      Full name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="reservation-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      value={values.name}
                      onChange={(event) => update("name", event.target.value)}
                      onBlur={() => blurValidate("name")}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "reservation-name-error" : undefined}
                      required
                    />
                    {fieldError("name")}
                  </div>

                  <div className={`field ${errors.phone ? "has-error" : ""}`}>
                    <label htmlFor="reservation-phone">
                      Phone number <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="reservation-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+20 100 000 0000"
                      value={values.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      onBlur={() => blurValidate("phone")}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "reservation-phone-error" : undefined}
                      required
                    />
                    {fieldError("phone")}
                  </div>

                  <div className={`field ${errors.email ? "has-error" : ""}`}>
                    <label htmlFor="reservation-email">
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="reservation-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={(event) => update("email", event.target.value)}
                      onBlur={() => blurValidate("email")}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "reservation-email-error" : undefined}
                      required
                    />
                    {fieldError("email")}
                  </div>

                  <div className={`field ${errors.date ? "has-error" : ""}`}>
                    <label htmlFor="reservation-date">
                      Date <span aria-hidden="true">*</span>
                    </label>
                    <input
                      ref={dateRef}
                      id="reservation-date"
                      name="date"
                      type="date"
                      value={values.date}
                      onChange={(event) => update("date", event.target.value)}
                      onBlur={() => blurValidate("date")}
                      aria-invalid={Boolean(errors.date)}
                      aria-describedby={errors.date ? "reservation-date-error" : undefined}
                      required
                    />
                    {fieldError("date")}
                  </div>

                  <div className={`field ${errors.time ? "has-error" : ""}`}>
                    <label htmlFor="reservation-time">
                      Time <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="reservation-time"
                      name="time"
                      value={values.time}
                      onChange={(event) => update("time", event.target.value)}
                      onBlur={() => blurValidate("time")}
                      aria-invalid={Boolean(errors.time)}
                      aria-describedby={errors.time ? "reservation-time-error" : undefined}
                      required
                    >
                      <option value="">Select a seating</option>
                      {reservationTimes.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {fieldError("time")}
                  </div>

                  <div className={`field ${errors.guests ? "has-error" : ""}`}>
                    <label htmlFor="reservation-guests">
                      Guests <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="reservation-guests"
                      name="guests"
                      value={values.guests}
                      onChange={(event) => update("guests", event.target.value)}
                      onBlur={() => blurValidate("guests")}
                      aria-invalid={Boolean(errors.guests)}
                      aria-describedby={errors.guests ? "reservation-guests-error" : undefined}
                      required
                    >
                      {guestOptions.map((guest) => (
                        <option key={guest} value={guest}>
                          {guest} {guest === "1" ? "guest" : "guests"}
                        </option>
                      ))}
                    </select>
                    {fieldError("guests")}
                  </div>

                  <div className="field field--note">
                    <p className="field__hint">
                      <Clock size={13} strokeWidth={1.3} aria-hidden="true" />
                      Seatings are held for 15 minutes.
                    </p>
                    <p className="field__hint">
                      <Users size={13} strokeWidth={1.3} aria-hidden="true" />
                      Parties of 9+ — please <a href="#contact">contact us</a>.
                    </p>
                  </div>

                  <div className={`field field--full ${errors.requests ? "has-error" : ""}`}>
                    <label htmlFor="reservation-requests">Special requests</label>
                    <textarea
                      id="reservation-requests"
                      name="requests"
                      rows={3}
                      maxLength={500}
                      placeholder="Allergies, celebrations, a favourite table…"
                      value={values.requests}
                      onChange={(event) => update("requests", event.target.value)}
                      aria-invalid={Boolean(errors.requests)}
                      aria-describedby={
                        errors.requests ? "reservation-requests-error" : "reservation-requests-hint"
                      }
                    />
                    <div className="field__meta">
                      <span id="reservation-requests-hint">Optional · up to 500 characters</span>
                      <span>{values.requests.length}/500</span>
                    </div>
                    {fieldError("requests")}
                  </div>

                  <div className="form__foot field--full">
                    <button
                      type="submit"
                      className="button button--solid button--wide"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2
                            size={15}
                            strokeWidth={1.5}
                            className="spin"
                            aria-hidden="true"
                          />
                          Confirming request…
                        </>
                      ) : (
                        <>
                          Request a table
                          <ArrowRight size={15} strokeWidth={1.4} aria-hidden="true" />
                        </>
                      )}
                    </button>
                    <p className="demo-note">
                      <AlertCircle size={13} strokeWidth={1.4} aria-hidden="true" />
                      Portfolio demo — requests are stored in your browser only, never sent.
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
