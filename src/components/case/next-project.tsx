import Link from "next/link";
import { ArtImage } from "@/components/ui/art-image";
import { Reveal } from "@/components/ui/reveal";
import type { Project } from "@/content/projects";

/** A full-width "next case" link whose image wakes up in colour on hover. */
export function NextProject({ project }: { project: Project }) {
  return (
    <section aria-label="Next case study" className="gutter pb-10 pt-24 md:pt-36">
      <Reveal>
        <p className="eyebrow mb-8 text-[10px] text-ash-500">Next case — {project.index}</p>
      </Reveal>
      <Link href={`/work/${project.slug}`} data-cursor="Next" className="group relative block overflow-hidden border border-line">
        <ArtImage
          src={project.cover}
          alt=""
          sizes="100vw"
          className="aspect-[16/9] md:aspect-[3/1]"
          imageClassName="scale-105 opacity-40 transition-[filter,transform,opacity] group-hover:scale-100 group-hover:opacity-70"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent p-6 md:p-12">
          <p className="eyebrow text-[10px] text-ash-300">{project.category}</p>
          <div className="mt-3 flex items-end justify-between gap-6">
            <p className="font-display text-[clamp(3rem,9vw,8rem)] font-light leading-[0.9] text-bone-50">
              {project.title}
            </p>
            <span className="mb-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-strong text-xl text-bone-50 transition-all duration-500 group-hover:border-bone-100 group-hover:bg-bone-100 group-hover:text-ink-950 md:h-20 md:w-20">
              →
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
