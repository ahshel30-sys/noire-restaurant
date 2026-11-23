import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";

export default function Story() {
  return (
    <section className="section story" id="story" aria-labelledby="story-title">
      <div className="container">
        <SectionHeading
          number="01"
          label="Our Story"
          id="story-title"
          title={
            <>
              The art of dining, <em>considered.</em>
            </>
          }
          lede="A contemporary room with a long memory — built around the plate, the river and the pleasure of an unhurried evening."
        />

        <div className="story__grid">
          <div className="story__visual" data-reveal>
            <figure className="story__portrait">
              <div className="story__arch">
                <Image
                  src="/images/chef-portrait.webp"
                  alt="Chef Karim El-Sayed plating a dish in the NOIRÉ kitchen"
                  fill
                  sizes="(max-width: 900px) 88vw, 42vw"
                  className="story__image"
                />
                <span className="story__image-shade" aria-hidden="true" />
              </div>
              <figcaption>
                <span>Karim El-Sayed</span>
                <span>Executive Chef &amp; Founder</span>
              </figcaption>
            </figure>

            <figure className="story__inset">
              <Image
                src="/images/story-room.webp"
                alt="The warm, low-lit dining room at NOIRÉ"
                fill
                sizes="(max-width: 900px) 52vw, 20vw"
                className="story__image"
              />
            </figure>

            <span className="story__seal" aria-hidden="true">
              N
            </span>
          </div>

          <div className="story__copy" data-reveal>
            <p className="story__lead">
              NOIRÉ began with a room, a river, and the conviction that dinner should be the most
              considered part of the day.
            </p>

            <p>
              Our kitchen looks to the Eastern Mediterranean for memory and to the contemporary
              table for language. Ingredients arrive from small farms and the morning market; the
              menu is written each day, cooked with restraint, and served without ceremony.
            </p>
            <p>
              The dining room is deliberately quiet: dark wood, warm stone, linen, and light that
              falls exactly where it should. Service is present when needed and invisible when not.
              The evening belongs to you.
            </p>

            <div className="story__chef">
              <div>
                <p className="eyebrow eyebrow--champagne">The kitchen</p>
                <h3>Karim El-Sayed</h3>
              </div>
              <p>
                Cairo-born, Lyon-trained, and quietly obsessed with the space between tradition and
                the new. Karim cooks the final course of every tasting menu himself.
              </p>
              <p className="story__signature" aria-label="Chef Karim El-Sayed's signature">
                Karim El-Sayed
              </p>
            </div>

            <blockquote className="story__quote">
              <p>
                “Luxury, to us, is being looked after without being noticed.”
              </p>
              <cite>— The NOIRÉ philosophy</cite>
            </blockquote>

            <dl className="story__facts">
              <div>
                <dt>Established</dt>
                <dd>2019</dd>
              </div>
              <div>
                <dt>Covers</dt>
                <dd>68</dd>
              </div>
              <div>
                <dt>Tasting menu</dt>
                <dd>7 courses</dd>
              </div>
            </dl>

            <a className="text-link" href="#reserve">
              Join us for dinner
              <ArrowRight size={14} strokeWidth={1.4} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
