import type { ReactNode } from "react";

export function SectionLabel({
  number,
  children,
  className = "",
}: {
  number: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`section-label ${className}`}>
      <span className="section-label__number">{number}</span>
      <span className="section-label__rule" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

export function SectionHeading({
  number,
  label,
  title,
  lede,
  align = "left",
  id,
}: {
  number: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <header className={`section-head section-head--${align}`} data-reveal>
      <SectionLabel number={number}>{label}</SectionLabel>
      <div className="section-head__body">
        <h2 className="display" id={id}>
          {title}
        </h2>
        {lede ? <p className="section-head__lede">{lede}</p> : null}
      </div>
    </header>
  );
}
