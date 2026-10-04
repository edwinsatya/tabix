import { ph } from "@/lib/placeholder";

export type Metric = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  headline: string;
  category: string;
  year: string;
  summary: string;
  quote: string;
  status: string;
  cover: string;
  meta: { label: string; value: string }[];
  metrics: Metric[];
  challenge: string;
  approach: { title: string; body: string }[];
  gallery: string[];
  reflection: string;
};

export const projects: Project[] = [
  {
    slug: "halden",
    index: "01",
    title: "Halden",
    headline: "Banking for slow money",
    category: "Fintech · Mobile app",
    year: "2025",
    summary:
      "A savings app for people who find finance apps anxious. We stripped out the dashboards, the red numbers and the dopamine — and built a quiet ritual around putting money away.",
    quote:
      "Money apps shout. We designed one that whispers — and people stayed longer.",
    status: "Shipped · iOS & Android",
    cover: ph("halden-cover", 1800, 1350),
    meta: [
      { label: "Role", value: "Lead Product Designer" },
      { label: "Timeline", value: "14 weeks · 2025" },
      { label: "Platform", value: "iOS, Android" },
      { label: "Team", value: "2 designers, 5 engineers" },
      { label: "Tools", value: "Figma, Protopie, Rive" },
    ],
    metrics: [
      { label: "Activation", value: 38, prefix: "+", suffix: "%" },
      { label: "App Store rating", value: 4.8, decimals: 1 },
      { label: "Weekly savers", value: 120, suffix: "k" },
    ],
    challenge:
      "Research with 40 first-time savers showed the same thing again and again: opening a banking app felt like opening a bill. Graphs, alerts and colour-coded losses created avoidance — people simply stopped looking. The brief was to make saving feel like a calm habit rather than a performance review.",
    approach: [
      {
        title: "Remove the noise",
        body: "We audited every number on screen and kept only the ones a person could act on. The home screen shrank from 14 data points to 3.",
      },
      {
        title: "Ritual over dashboard",
        body: "Saving became a weekly two-tap ritual with soft haptics and a slow, tactile progress fill borrowed from wet paint drying on canvas.",
      },
      {
        title: "Design the quiet states",
        body: "Empty, paused and missed-week states were treated as first-class screens with warm, non-judgemental copy.",
      },
    ],
    gallery: [
      ph("halden-detail-a", 1600, 1200),
      ph("halden-detail-b", 1600, 1200),
      ph("halden-detail-c", 2400, 1200),
    ],
    reflection:
      "The most important design decision was what we refused to show. Restraint turned out to be the feature.",
  },
  {
    slug: "atlas-field-os",
    index: "02",
    title: "Atlas Field OS",
    headline: "A design system for people in the mud",
    category: "Enterprise · Design system",
    year: "2024",
    summary:
      "A rugged design system and survey dashboard for geologists working in volcanic terrain — glove-friendly, glare-proof, and readable in fog at 3,000 metres.",
    quote:
      "Every component was tested outdoors, in rain, with gloves on. If it failed there, it failed.",
    status: "In use · 9 field teams",
    cover: ph("atlas-cover", 2400, 1300),
    meta: [
      { label: "Role", value: "Design Systems Lead" },
      { label: "Timeline", value: "8 months · 2024" },
      { label: "Platform", value: "Rugged tablet, Web" },
      { label: "Team", value: "4 designers, 12 engineers" },
      { label: "Tools", value: "Figma, Storybook, Tokens Studio" },
    ],
    metrics: [
      { label: "Components", value: 124 },
      { label: "Faster handoff", value: 42, suffix: "%" },
      { label: "Field error rate", value: 61, prefix: "−", suffix: "%" },
    ],
    challenge:
      "Field teams were using four different tools with four different visual languages, on tablets that were unreadable in direct sun. Mistyped readings cost days of re-survey work.",
    approach: [
      {
        title: "Field-first tokens",
        body: "A token set built for contrast in harsh light: a high-luminance mode, 56px minimum touch targets and a type scale tuned for arm's-length reading.",
      },
      {
        title: "Components in the wild",
        body: "Each component shipped only after an outdoor test session. Steppers replaced keyboards wherever a reading had a known range.",
      },
      {
        title: "One source of truth",
        body: "Figma variables synced to code through Tokens Studio, so design and engineering never drifted again.",
      },
    ],
    gallery: [
      ph("atlas-detail-a", 1600, 1200),
      ph("atlas-detail-b", 1600, 1200),
      ph("atlas-detail-c", 2400, 1200),
    ],
    reflection:
      "Designing for extreme conditions made the system better for everyone — the office team adopted the field mode by choice.",
  },
  {
    slug: "murmur",
    index: "03",
    title: "Murmur",
    headline: "A museum guide that knows when to stay silent",
    category: "Culture · Mobile & installation",
    year: "2023",
    summary:
      "An audio-first companion for a contemporary art museum that senses where you are and lets the artwork speak first — no screens to stare at, just a gentle voice when you linger.",
    quote:
      "The best interface in a gallery is the one you forget you're holding.",
    status: "Live · 210k visitors",
    cover: ph("murmur-cover", 1600, 1200),
    meta: [
      { label: "Role", value: "UX/UI & Art Direction" },
      { label: "Timeline", value: "6 months · 2023" },
      { label: "Platform", value: "iOS, Android, BLE beacons" },
      { label: "Team", value: "Studio of 7" },
      { label: "Tools", value: "Figma, Origami, After Effects" },
    ],
    metrics: [
      { label: "Dwell time", value: 27, prefix: "+", suffix: "%" },
      { label: "Visitors guided", value: 210, suffix: "k" },
      { label: "Screen time per visit", value: 4, suffix: " min" },
    ],
    challenge:
      "The museum's old app turned visitors into people staring at phones in front of paintings. The curators wanted the opposite: more looking, less scrolling.",
    approach: [
      {
        title: "Proximity, not menus",
        body: "BLE beacons trigger short audio notes only after a visitor lingers for eight seconds — attention is the input.",
      },
      {
        title: "A screen that fades",
        body: "The interface dims itself to near-black while audio plays, so the artwork stays the brightest thing in the room.",
      },
      {
        title: "Curators as authors",
        body: "A lightweight CMS let curators write and record notes themselves, keeping the voice personal.",
      },
    ],
    gallery: [
      ph("murmur-detail-a", 1600, 1200),
      ph("murmur-detail-b", 1600, 1200),
      ph("murmur-detail-c", 2400, 1200),
    ],
    reflection:
      "Painting taught me that negative space carries meaning. Murmur is that idea, applied to an app.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Smaller pieces listed in the "Index" under the featured case studies. */
export const archive = [
  { year: "2025", title: "Sawah Weather", type: "Product · Agritech dashboard", image: ph("archive-sawah", 900, 1100) },
  { year: "2024", title: "Kopi Lokal", type: "Brand & e-commerce", image: ph("archive-kopi", 900, 1100) },
  { year: "2024", title: "Lumen Health", type: "UX research · Patient portal", image: ph("archive-lumen", 900, 1100) },
  { year: "2023", title: "Tidewater Type", type: "Variable typeface specimen site", image: ph("archive-tidewater", 900, 1100) },
  { year: "2022", title: "Rupa Gallery", type: "Online exhibition platform", image: ph("archive-rupa", 900, 1100) },
];
