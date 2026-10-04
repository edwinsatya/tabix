import { ph } from "@/lib/placeholder";

export type Painting = {
  id: string;
  catalog: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  status: "Available" | "Private collection" | "On loan" | "Studio archive";
  note: string;
  image: string;
  /** width / height of the original artwork, used for the frame shape */
  ratio: number;
};

export const paintings: Painting[] = [
  {
    id: "summit-white-lead",
    catalog: "AM-2025-01",
    title: "The Summit in White Lead",
    year: "2025",
    medium: "Oil, cold wax & pumice on linen",
    dimensions: "150 × 110 cm",
    status: "Available",
    note: "Titanium white dragged with a steel spatula at speed; the ridge was carved back with the edge of a palette knife.",
    image: ph("painting-summit", 1200, 1500),
    ratio: 4 / 5,
  },
  {
    id: "frozen-mineral-tundra",
    catalog: "AM-2025-02",
    title: "Frozen Mineral Tundra",
    year: "2025",
    medium: "Cold wax & ground basalt on panel",
    dimensions: "180 × 120 cm",
    status: "Private collection",
    note: "Mixed with ground basalt and left to cure outdoors; the surface cracked overnight.",
    image: ph("painting-tundra", 1800, 1200),
    ratio: 3 / 2,
  },
  {
    id: "valley-basalt-gale",
    catalog: "AM-2024-07",
    title: "Valley of Shadows & Basalt Gale",
    year: "2024",
    medium: "Bitumen & titanium paste on linen",
    dimensions: "210 × 160 cm",
    status: "On loan",
    note: "Thrown, scraped and raked across drying bitumen with flexible trowels.",
    image: ph("painting-basalt", 1500, 1200),
    ratio: 5 / 4,
  },
  {
    id: "merapi-first-ash",
    catalog: "AM-2024-03",
    title: "Merapi at First Ash",
    year: "2024",
    medium: "Charcoal & oil on raw canvas",
    dimensions: "120 × 150 cm",
    status: "Available",
    note: "Drawn on site at dawn; volcanic ash pressed into the wet ground layer.",
    image: ph("painting-merapi", 1200, 1500),
    ratio: 4 / 5,
  },
  {
    id: "sediment-no-4",
    catalog: "AM-2023-11",
    title: "Sediment No. 4",
    year: "2023",
    medium: "Impasto, marble dust & wax",
    dimensions: "100 × 100 cm",
    status: "Studio archive",
    note: "Twelve layers, each sanded back before the next — a slow archaeology of grey.",
    image: ph("painting-sediment", 1400, 1400),
    ratio: 1,
  },
  {
    id: "fog-study-quiet-interface",
    catalog: "AM-2023-06",
    title: "Fog Study for a Quiet Interface",
    year: "2023",
    medium: "Oil on linen",
    dimensions: "90 × 140 cm",
    status: "Private collection",
    note: "Painted between two app launches — a grid dissolving into weather.",
    image: ph("painting-fog", 1800, 1150),
    ratio: 14 / 9,
  },
  {
    id: "tidal-ledger",
    catalog: "AM-2022-02",
    title: "Tidal Ledger",
    year: "2022",
    medium: "Graphite, oil & sand on board",
    dimensions: "160 × 120 cm",
    status: "Available",
    note: "A record of one week of tides, logged as horizontal scrapes.",
    image: ph("painting-tidal", 1200, 1600),
    ratio: 3 / 4,
  },
];
