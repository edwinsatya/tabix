import type { Metric } from "./projects";

export const practice = {
  interface: {
    label: "Interface",
    title: "Designing products",
    intro:
      "End-to-end product design for teams who care about the last 5%. From research to shipped pixels — and the design systems that keep them consistent.",
    services: [
      { name: "Product & UX strategy", detail: "Discovery, research, journey mapping" },
      { name: "UI design", detail: "Mobile, web, dashboards" },
      { name: "Design systems", detail: "Tokens, components, documentation" },
      { name: "Prototyping & motion", detail: "Protopie, Rive, coded prototypes" },
    ],
  },
  pigment: {
    label: "Pigment",
    title: "Making paintings",
    intro:
      "Large-scale monochrome work in oil, cold wax and found minerals. Available for commissions, exhibitions and site-specific pieces.",
    services: [
      { name: "Commissions", detail: "Private & corporate collections" },
      { name: "Exhibitions", detail: "Solo, group & residency work" },
      { name: "Site-specific pieces", detail: "Hospitality, architecture" },
      { name: "Workshops", detail: "Impasto & cold wax technique" },
    ],
  },
};

export const stats: Metric[] = [
  { label: "Years designing", value: 8, suffix: "+" },
  { label: "Products shipped", value: 40, suffix: "+" },
  { label: "Paintings finished", value: 126 },
  { label: "Exhibitions", value: 9 },
];

export const philosophy = {
  eyebrow: "The philosophy of layers",
  quote:
    "I don't separate design from painting. Both are the patient work of removing everything that isn't needed — until only the weather of the idea is left.",
  columns: [
    {
      label: "Selected collaborators",
      items: ["Halden Financial", "Atlas Geo Survey", "Murmur Museum", "Northwind Labs"],
    },
    {
      label: "Exhibited at",
      items: ["Ruang Abu, Yogyakarta", "Kunstraum Grau, Berlin", "Galeri Senyap, Jakarta"],
    },
  ],
};

export type ChronologyItem = {
  period: string;
  title: string;
  place: string;
  kind: "Design" | "Painting" | "Award";
};

export const chronology: ChronologyItem[] = [
  { period: "2024 — Now", title: "Senior Product Designer", place: "Northwind Labs · Remote", kind: "Design" },
  { period: "2025", title: "“Sediment” — Solo exhibition", place: "Ruang Abu · Yogyakarta", kind: "Painting" },
  { period: "2024", title: "Design system of the year — shortlist", place: "Atlas Field OS", kind: "Award" },
  { period: "2021 — 2024", title: "Product Designer", place: "Kanvas Studio · Bandung", kind: "Design" },
  { period: "2023", title: "“Monochrome Weather” — Group show", place: "Kunstraum Grau · Berlin", kind: "Painting" },
  { period: "2022", title: "Artist residency", place: "Highland Studio · Dieng Plateau", kind: "Painting" },
  { period: "2019 — 2021", title: "UI Designer", place: "Freelance · Worldwide", kind: "Design" },
];
