const phrases = [
  "Seasonal kitchen",
  "Nile-side dining room",
  "Chef-led",
  "Contemporary Egyptian",
  "Tuesday — Sunday",
];

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <div className="marquee__group" key={copy}>
            {phrases.map((phrase) => (
              <span className="marquee__item" key={`${copy}-${phrase}`}>
                {phrase}
                <span className="marquee__diamond" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
