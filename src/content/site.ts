import { ph } from "@/lib/placeholder";

/**
 * Global identity. Everything personal lives here — replace the placeholder
 * name, contact details and socials with the real ones.
 */
export const site = {
  name: "Arsa Mahendra",
  firstName: "Arsa",
  lastName: "Mahendra",
  monogram: "AM",
  role: "UI/UX Designer & Painter",
  tagline: "Interface design × monochromatic paint",
  description:
    "Portfolio of Arsa Mahendra — a UI/UX designer who builds calm, precise digital products, and a painter who drags cold wax and titanium white across raw linen.",
  url: "https://example.com",

  heroTitle: ["Grid", "&", "Gesture"],
  heroIntro:
    "Calm, precise interfaces by day. Thick, weathered monochrome paintings by night. Two disciplines — one obsessive hand.",
  heroImage: ph("arsa-hero-impasto", 2400, 1500),

  location: {
    city: "Bandung",
    country: "Indonesia",
    short: "BDG",
    coords: "6.9175° S · 107.6191° E",
    timeZone: "Asia/Jakarta",
    tzLabel: "WIB",
  },

  availability: {
    open: true,
    label: "Open for projects & commissions — 2027",
  },

  email: "studio@arsamahendra.com",
  resume: { label: "2019–2026 Folio (PDF)", href: "#" },

  socials: [
    {
      label: "Instagram",
      handle: "@arsa.paints",
      href: "https://instagram.com",
    },
    {
      label: "Dribbble",
      handle: "/arsamahendra",
      href: "https://dribbble.com",
    },
    { label: "Behance", handle: "/arsamahendra", href: "https://behance.net" },
    {
      label: "LinkedIn",
      handle: "/in/arsamahendra",
      href: "https://linkedin.com",
    },
  ],
} as const;

export const navLinks = [
  { id: "work", label: "Work", index: "01" },
  { id: "paintings", label: "Paintings", index: "02" },
  { id: "practice", label: "Practice", index: "03" },
  { id: "chronology", label: "Chronology", index: "04" },
  { id: "contact", label: "Contact", index: "05" },
] as const;

export const disciplines = [
  "Product Design",
  "Oil on Linen",
  "Design Systems",
  "Cold Wax & Impasto",
  "Interaction Design",
  "Charcoal Studies",
  "UX Research",
  "Commissions",
];
