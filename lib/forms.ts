import { reservationTimes } from "./content";

export type Errors = Record<string, string>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\d][\d\s().-]{6,}$/;

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

export function todayISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDateLong(value: string) {
  if (!value) return "";
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatDateShort(value: string) {
  if (!value) return "";
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export type ReservationValues = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  requests: string;
};

export function validateReservation(values: ReservationValues): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = "Please enter a valid phone number, including country code.";
  }

  if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.date) {
    errors.date = "Please choose a date for your reservation.";
  } else if (values.date < todayISO()) {
    errors.date = "Please choose today or a future date.";
  }

  if (!values.time) {
    errors.time = "Please choose a seating time.";
  } else if (!reservationTimes.includes(values.time)) {
    errors.time = "Please choose one of the available seating times.";
  }

  const guestCount = Number(values.guests);
  if (!values.guests || Number.isNaN(guestCount) || guestCount < 1 || guestCount > 8) {
    errors.guests = "Please choose between 1 and 8 guests.";
  }

  if (values.requests.length > 500) {
    errors.requests = "Please keep special requests under 500 characters.";
  }

  return errors;
}

export type ContactValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function validateContact(values: ContactValues): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.subject) {
    errors.subject = "Please choose a subject.";
  }

  if (values.message.trim().length < 10) {
    errors.message = "Please tell us a little more — at least 10 characters.";
  } else if (values.message.length > 1000) {
    errors.message = "Please keep your message under 1,000 characters.";
  }

  return errors;
}

export function validateNewsletter(email: string): string | null {
  if (!isValidEmail(email)) return "Please enter a valid email address.";
  return null;
}

export function reservationReference() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const random = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `NR-${stamp}${random}`;
}

function icsDate(value: string, time: string) {
  const [year, month, day] = value.split("-");
  const [hour, minute] = time.split(":");
  return `${year}${month}${day}T${hour}${minute}00`;
}

function addHours(dateTime: string, hours: number) {
  const date = dateTime.slice(0, 8);
  const time = dateTime.slice(9, 13);
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(4, 6));
  const day = Number(date.slice(6, 8));
  const hour = Number(time.slice(0, 2));
  const minute = Number(time.slice(2, 4));
  const value = new Date(year, month - 1, day, hour + hours, minute);
  const y = value.getFullYear();
  const m = String(value.getMonth() + 1).padStart(2, "0");
  const d = String(value.getDate()).padStart(2, "0");
  const h = String(value.getHours()).padStart(2, "0");
  const min = String(value.getMinutes()).padStart(2, "0");
  return `${y}${m}${d}T${h}${min}00`;
}

export function buildCalendarFile(
  values: ReservationValues,
  reference: string,
): { filename: string; content: string } {
  const start = icsDate(values.date, values.time);
  const end = addHours(start, 2);
  const description = [
    "Reservation at NOIRÉ — Contemporary Dining.",
    `Reference: ${reference}`,
    `Guests: ${values.guests}`,
    values.requests ? `Requests: ${values.requests}` : "",
    "This is a portfolio demo reservation, not a confirmed booking.",
  ]
    .filter(Boolean)
    .join("\\n");

  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NOIRE//Reservation Demo//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${reference.toLowerCase()}@noire-demo.local`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    "SUMMARY:Dinner at NOIRÉ — Contemporary Dining",
    `DESCRIPTION:${description}`,
    "LOCATION:12 Corniche El Nil\\, Zamalek\\, Cairo 11211\\, Egypt",
    "STATUS:TENTATIVE",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return { filename: `noire-reservation-${reference}.ics`, content };
}

export function downloadCalendarFile(values: ReservationValues, reference: string) {
  const { filename, content } = buildCalendarFile(values, reference);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function persistDemoRecord(key: string, record: unknown) {
  const existing = localStorage.getItem(key);
  const parsed = existing ? (JSON.parse(existing) as unknown[]) : [];
  const next = Array.isArray(parsed) ? parsed : [];
  next.push(record);
  localStorage.setItem(key, JSON.stringify(next));
}
