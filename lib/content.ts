export type MenuCategory = "starters" | "mains" | "desserts" | "beverages";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  alt: string;
  labels: string[];
};

export type Experience = {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  details: string[];
  image: string;
  alt: string;
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  span: "wide" | "tall" | "square" | "panorama";
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  detail: string;
};

export const site = {
  name: "NOIRÉ",
  tagline: "Contemporary Dining",
  description:
    "NOIRÉ is a contemporary dining room on the Nile in Zamalek, Cairo — a place of seasonal cooking, quiet service and long evenings.",
  address: {
    line1: "12 Corniche El Nil",
    line2: "Zamalek, Cairo 11211",
    country: "Egypt",
  },
  phone: "+20 2 5550 0198",
  phoneHref: "tel:+20255500198",
  email: "hello@noire-demo.com",
  coordinates: { lat: 30.0601, lng: 31.2204 },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
  hours: [
    { label: "Dinner", value: "Tue – Sun · 18:00 – 23:30" },
    { label: "Bar", value: "Tue – Sun · 17:00 – 00:30" },
    { label: "Closed", value: "Mondays" },
  ],
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Experience", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const menuCategories: { id: MenuCategory; label: string; short: string }[] = [
  { id: "starters", label: "Starters", short: "01" },
  { id: "mains", label: "Main Courses", short: "02" },
  { id: "desserts", label: "Desserts", short: "03" },
  { id: "beverages", label: "Beverages", short: "04" },
];

export const menuItems: MenuItem[] = [
  {
    id: "grain-bowl",
    name: "Heritage Grain Bowl, Soft Egg & Herbs",
    description: "Ancient grains, seasonal greens, soft egg, lemon-tahini.",
    price: 420,
    category: "starters",
    image: "/images/menu-carpaccio.webp",
    alt: "A colorful grain bowl with greens, vegetables and a soft egg",
    labels: ["Vegetarian"],
  },
  {
    id: "garden-greens",
    name: "Garden Greens, Citrus & Pistachio",
    description: "Young leaves, avocado, citrus, toasted pistachio, green herb dressing.",
    price: 390,
    category: "starters",
    image: "/images/menu-burrata.webp",
    alt: "A fresh salad of greens, avocado and vegetables in a ceramic bowl",
    labels: ["Vegetarian", "Gluten-free", "Contains nuts"],
  },
  {
    id: "mezze",
    name: "Mezze of the House",
    description: "Charred flatbread, smoked aubergine, labneh, dukkah, olive oil.",
    price: 390,
    category: "starters",
    image: "/images/menu-mezze.webp",
    alt: "A shared mezze board with flatbread, dips and grilled vegetables",
    labels: ["Vegetarian"],
  },
  {
    id: "salmon",
    name: "Nile Salmon, Spring Greens & Citrus",
    description: "Pan-seared salmon, green asparagus, citrus beurre blanc, dill.",
    price: 720,
    category: "mains",
    image: "/images/menu-salmon.webp",
    alt: "Pan-seared salmon fillet with asparagus and citrus on a dark plate",
    labels: ["Gluten-free"],
  },
  {
    id: "lamb",
    name: "Charcoal Lamb Skewers, Mint & Sumac",
    description: "Charcoal-grilled lamb, mint gremolata, sumac onions, roasted garlic.",
    price: 890,
    category: "mains",
    image: "/images/menu-lamb.webp",
    alt: "Grilled meat skewers with herbs and dipping sauces",
    labels: ["Gluten-free"],
  },
  {
    id: "ribeye",
    name: "Aged Ribeye, Bone Marrow Butter",
    description: "32-day aged ribeye, bone marrow butter, watercress, burnt onion.",
    price: 980,
    category: "mains",
    image: "/images/menu-ribeye.webp",
    alt: "Sliced aged ribeye steak on a wooden board with grilled vegetables",
    labels: ["Gluten-free"],
  },
  {
    id: "linguine",
    name: "Seafood Linguine, Saffron & Chilli",
    description: "Tiger prawns, clams, saffron, chilli, white wine, fresh linguine.",
    price: 760,
    category: "mains",
    image: "/images/menu-linguine.webp",
    alt: "Seafood linguine with prawns and herbs in a black pan",
    labels: ["Shellfish"],
  },
  {
    id: "chocolate",
    name: "Valrhona Chocolate, Salted Caramel",
    description: "Warm chocolate ganache, salted caramel, cocoa nib, vanilla ice cream.",
    price: 360,
    category: "desserts",
    image: "/images/menu-chocolate.webp",
    alt: "Warm chocolate dessert with salted caramel being poured over it",
    labels: ["Vegetarian"],
  },
  {
    id: "cherry",
    name: "Cherry & Almond Cake",
    description: "Roasted cherries, almond frangipane, crème fraîche.",
    price: 340,
    category: "desserts",
    image: "/images/menu-cherry.webp",
    alt: "A slice of cherry and almond cake with fresh cherries",
    labels: ["Vegetarian", "Contains nuts"],
  },
  {
    id: "panna-cotta",
    name: "Vanilla Panna Cotta, Seasonal Berries",
    description: "Madagascan vanilla, macerated berries, basil.",
    price: 320,
    category: "desserts",
    image: "/images/menu-panna.webp",
    alt: "Vanilla panna cotta topped with fresh berries",
    labels: ["Vegetarian", "Gluten-free"],
  },
  {
    id: "old-fashioned",
    name: "NOIRÉ Old Fashioned",
    description: "Bourbon, smoked date syrup, orange bitters, aged oak.",
    price: 280,
    category: "beverages",
    image: "/images/menu-oldfashioned.webp",
    alt: "A smoked old fashioned cocktail in a crystal glass",
    labels: ["Contains alcohol"],
  },
  {
    id: "champagne",
    name: "Champagne & Citrus",
    description: "Champagne, bergamot, thyme, cane sugar.",
    price: 340,
    category: "beverages",
    image: "/images/menu-cocktails.webp",
    alt: "Three champagne cocktails with citrus garnishes on a warm-lit bar",
    labels: ["Contains alcohol"],
  },
  {
    id: "wine-pairing",
    name: "Sommelier's Wine Pairing",
    description: "Five glasses selected to accompany the tasting menu.",
    price: 950,
    category: "beverages",
    image: "/images/menu-wine.webp",
    alt: "Guests raising glasses of red wine at a restaurant table",
    labels: ["Contains alcohol"],
  },
];

export const experiences: Experience[] = [
  {
    id: "chefs-special",
    number: "01",
    title: "Chef's Special",
    eyebrow: "The pass, after hours",
    description:
      "A five-course menu that follows the market, written each morning and finished at the pass. Chef Karim cooks the final course himself.",
    details: ["Five courses · 2.5 hours", "Limited to 12 guests", "Tuesday – Thursday"],
    image: "/images/experience-chef.webp",
    alt: "A chef working with a flame in a dark professional kitchen",
  },
  {
    id: "seasonal",
    number: "02",
    title: "Seasonal Ingredients",
    eyebrow: "The morning market",
    description:
      "We build the menu backwards from the ingredient. Whatever is at its best that morning decides what leaves the kitchen that night.",
    details: ["Daily market sourcing", "Vegetable-forward", "Menu changes weekly"],
    image: "/images/experience-seasonal.webp",
    alt: "Hands preparing fresh herbs on a wooden kitchen board",
  },
  {
    id: "private",
    number: "03",
    title: "Private Dining",
    eyebrow: "The library room",
    description:
      "A quiet, wood-panelled room for eight to fourteen guests, with its own service team and a menu written for the occasion.",
    details: ["8 – 14 guests", "Private service", "Bespoke menus"],
    image: "/images/experience-private.webp",
    alt: "A warm, dimly lit private dining room with wooden tables",
  },
  {
    id: "exclusive",
    number: "04",
    title: "Exclusive Dining",
    eyebrow: "The chef's counter",
    description:
      "Six seats at the pass for a close-up view of the kitchen, with an extended tasting menu and paired pours.",
    details: ["Six seats", "Extended tasting", "Sommelier pairing"],
    image: "/images/experience-exclusive.webp",
    alt: "A dark restaurant bar with warm pendant lighting and bottles",
  },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "room",
    src: "/images/gallery-room.webp",
    alt: "The NOIRÉ dining room with set tables and large windows",
    caption: "The dining room, after sunset",
    category: "Interior",
    span: "tall",
  },
  {
    id: "table",
    src: "/images/gallery-table.webp",
    alt: "An overhead view of a table set for a long dinner",
    caption: "A table laid for eight",
    category: "Details",
    span: "wide",
  },
  {
    id: "plate",
    src: "/images/gallery-plate.webp",
    alt: "A finely plated seafood dish with sauce and herbs",
    caption: "A plate from the winter menu",
    category: "Cuisine",
    span: "square",
  },
  {
    id: "market",
    src: "/images/gallery-market.webp",
    alt: "A market display of fresh vegetables and ingredients",
    caption: "The morning market",
    category: "Ingredients",
    span: "square",
  },
  {
    id: "soup",
    src: "/images/gallery-soup.webp",
    alt: "Three plates of fresh pasta with tomatoes and herbs on a white table",
    caption: "Pasta, three ways",
    category: "Cuisine",
    span: "square",
  },
  {
    id: "guests",
    src: "/images/gallery-guests.webp",
    alt: "Guests dining together at a long communal table",
    caption: "The long table",
    category: "Atmosphere",
    span: "wide",
  },
  {
    id: "garden",
    src: "/images/gallery-garden.webp",
    alt: "A plate of seasonal greens, tomatoes and grains",
    caption: "A garden plate",
    category: "Cuisine",
    span: "tall",
  },
  {
    id: "tasting",
    src: "/images/gallery-tasting.webp",
    alt: "A fine dining plate with salmon, greens and a delicate sauce",
    caption: "A plate from the tasting menu",
    category: "Cuisine",
    span: "panorama",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "laila",
    quote:
      "The room is dark, the service is invisible, and the food does all the talking. We came for an anniversary and left planning the next one before dessert.",
    name: "Laila M.",
    detail: "Dinner guest · March 2026",
  },
  {
    id: "omar",
    quote:
      "The lamb arrived with a depth I did not expect from a restaurant this young. What stayed with me, though, was how unhurried the evening felt.",
    name: "Omar H.",
    detail: "Dinner guest · January 2026",
  },
  {
    id: "sophie",
    quote:
      "A beautifully judged tasting menu — precise without being cold, generous without being heavy. The chef's counter is the seat to book.",
    name: "Sophie R.",
    detail: "Visiting critic · February 2026",
  },
];

export const reservationTimes = [
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

export const guestOptions = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const contactSubjects = ["General enquiry", "Private dining", "Press", "Careers"];
