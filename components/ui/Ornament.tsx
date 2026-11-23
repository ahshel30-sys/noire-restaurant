export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`ornament ${className}`}
      viewBox="0 0 120 16"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 8 H46 M74 8 H120" stroke="currentColor" strokeWidth="0.75" />
      <path
        d="M60 1.5 L66.5 8 L60 14.5 L53.5 8 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <circle cx="60" cy="8" r="1.4" fill="currentColor" />
    </svg>
  );
}
