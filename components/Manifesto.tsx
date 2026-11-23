import Ornament from "./ui/Ornament";

export default function Manifesto() {
  return (
    <section className="manifesto" aria-label="Our philosophy">
      <div className="container manifesto__inner">
        <Ornament />
        <p className="manifesto__text" data-reveal>
          “A meal is a composition. <em>The room is its frame.</em> Hospitality is the quiet art
          that holds them together.”
        </p>
        <p className="manifesto__sign" data-reveal>
          <span>The NOIRÉ kitchen</span>
          <span className="manifesto__sign-rule" aria-hidden="true" />
          <span>Cairo, MMXXVI</span>
        </p>
      </div>
    </section>
  );
}
