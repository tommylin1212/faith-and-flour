export const business = {
  name: "Faith + Flour Creations",
  tagline: "Hand-decorated sugar cookies, baked with love",
  email: "hello@faithandflour.com",
  phone: "(555) 123-4567",
  location: "Serving the greater metro area",
  instagram: "@faithandflourcreations",
};

export const galleryItems = [
  {
    id: "1",
    title: "Floral Wedding Favors",
    category: "Weddings",
    description: "Soft blush florals with gold accents",
    gradient: "from-[#ffeef5] to-[#f4d4e0]",
    emoji: "💐",
  },
  {
    id: "2",
    title: "Baby Shower Set",
    category: "Celebrations",
    description: "Pastel animals and sweet script names",
    gradient: "from-[#e8f6f3] to-[#c9e4de]",
    emoji: "🍼",
  },
  {
    id: "3",
    title: "Corporate Logo Cookies",
    category: "Corporate",
    description: "Clean branding for client gifts",
    gradient: "from-[#fff5e6] to-[#ffeaa7]",
    emoji: "✨",
  },
  {
    id: "4",
    title: "Holiday Gift Boxes",
    category: "Seasonal",
    description: "Festive shapes with custom packaging",
    gradient: "from-[#f3effa] to-[#e8dff5]",
    emoji: "🎁",
  },
  {
    id: "5",
    title: "Birthday Number Set",
    category: "Birthdays",
    description: "Bold numbers with sprinkle borders",
    gradient: "from-[#ffe8e8] to-[#ffd4a8]",
    emoji: "🎂",
  },
  {
    id: "6",
    title: "Teacher Appreciation",
    category: "Gifts",
    description: "Apple, pencil, and book themes",
    gradient: "from-[#eef5ef] to-[#d8e5da]",
    emoji: "📚",
  },
] as const;

export type PricingTier = {
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Dozen Delight",
    price: "$48",
    priceNote: "starting at",
    description: "Perfect for small gatherings and thank-you gifts",
    features: [
      "12 hand-decorated cookies",
      "2–3 design variations",
      "Standard flavors (vanilla/almond)",
      "7-day lead time",
    ],
  },
  {
    name: "Event Collection",
    price: "$95",
    priceNote: "starting at",
    description: "Our most popular option for showers and parties",
    features: [
      "24–36 cookies",
      "Custom color palette",
      "Personalized names or monograms",
      "Gift-style packaging",
      "10–14 day lead time",
    ],
    highlighted: true,
  },
  {
    name: "Wedding & Large Orders",
    price: "Custom",
    description: "Full coordination for your special day",
    features: [
      "50+ cookies",
      "Design consultation",
      "Multiple flavors & dietary notes",
      "Premium packaging options",
      "Timeline planning support",
    ],
  },
];

export const addOns = [
  { name: "Rush order (under 7 days)", price: "+25%" },
  { name: "Gluten-friendly base", price: "+$12/dozen" },
  { name: "Individual favor bags", price: "+$1.50/cookie" },
  { name: "Custom gift tags", price: "+$15 flat" },
];
