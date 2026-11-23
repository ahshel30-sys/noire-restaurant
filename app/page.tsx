import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Marquee from "@/components/Marquee";
import MenuSection from "@/components/MenuSection";
import Reservation from "@/components/Reservation";
import RevealRoot from "@/components/RevealRoot";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Story from "@/components/Story";
import Testimonials from "@/components/Testimonials";
import { site } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "NOIRÉ",
  description:
    "A fictional contemporary dining room in Zamalek, Cairo, created as a premium portfolio demonstration.",
  servesCuisine: ["Contemporary", "Mediterranean", "Egyptian"],
  priceRange: "EGP 320–980",
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: "Zamalek, Cairo",
    postalCode: "11211",
    addressCountry: "EG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.coordinates.lat,
    longitude: site.coordinates.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "18:00",
      closes: "23:30",
    },
  ],
  acceptsReservations: "True",
  image: "/images/hero-room.webp",
  sameAs: site.socials.map((social) => social.href),
};

export default function Home() {
  return (
    <RevealRoot>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Marquee />
        <Story />
        <Manifesto />
        <MenuSection />
        <Experience />
        <Gallery />
        <Reservation />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </RevealRoot>
  );
}
