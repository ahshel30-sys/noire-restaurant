import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow eyebrow--champagne">404 — Off the menu</p>
      <h1 className="display">
        This page has <em>left the table.</em>
      </h1>
      <p>The address you followed does not exist. The dining room, however, is still open.</p>
      <Link className="button button--solid" href="/">
        Return to NOIRÉ
      </Link>
    </main>
  );
}
