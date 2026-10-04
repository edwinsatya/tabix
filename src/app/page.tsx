import { ArchiveIndex } from "@/components/sections/archive-index";
import { Chronology } from "@/components/sections/chronology";
import { Contact } from "@/components/sections/contact";
import { DisciplinesBand } from "@/components/sections/disciplines-band";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Hero } from "@/components/sections/hero";
import { PaintingsGallery } from "@/components/sections/paintings-gallery";
import { Philosophy } from "@/components/sections/philosophy";
import { Practice } from "@/components/sections/practice";

export default function Home() {
  return (
    <>
      <Hero />
      <DisciplinesBand />
      <FeaturedWork />
      <ArchiveIndex />
      <PaintingsGallery />
      <Practice />
      <Philosophy />
      <Chronology />
      <Contact />
    </>
  );
}
