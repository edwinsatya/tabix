import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseHero } from "@/components/case/case-hero";
import { NextProject } from "@/components/case/next-project";
import { Contact } from "@/components/sections/contact";
import { ArtImage } from "@/components/ui/art-image";
import { CountUp } from "@/components/ui/count-up";
import { Reveal, SplitText } from "@/components/ui/reveal";
import { FrameTag, TiltFrame } from "@/components/ui/tilt-frame";
import { getProject, projects } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.headline}`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const position = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(position + 1) % projects.length];
  const [detailA, detailB, wide] = project.gallery;

  return (
    <article>
      <CaseHero project={project} />

      {/* Challenge */}
      <section className="gutter grid gap-10 py-28 md:grid-cols-12 md:py-40">
        <Reveal className="md:col-span-3">
          <p className="eyebrow text-[10px] text-ash-500">(01) — The challenge</p>
        </Reveal>
        <div className="md:col-span-8 md:col-start-5">
          <SplitText
            as="p"
            text={project.challenge}
            stagger={0.012}
            duration={0.9}
            className="font-serif text-[clamp(1.5rem,2.8vw,2.4rem)] leading-[1.3] text-bone-100"
          />
        </div>
      </section>

      {/* Approach */}
      <section className="border-y border-line bg-ink-900 gutter py-28 md:py-36">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <Reveal>
                <p className="eyebrow text-[10px] text-ash-500">(02) — Approach</p>
              </Reveal>
              <SplitText
                as="h2"
                text="How we got there"
                className="mt-6 block font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.05] text-bone-50"
              />
            </div>
          </div>
          <ol className="md:col-span-7 md:col-start-6">
            {project.approach.map((step, i) => (
              <li key={step.title} className="border-b border-line py-10 first:pt-0 last:border-b-0">
                <Reveal delay={i * 0.05}>
                  <div className="flex gap-8">
                    <span className="font-display text-6xl font-light leading-none text-ash-500">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-serif text-2xl text-bone-50 md:text-3xl">{step.title}</h3>
                      <p className="mt-4 max-w-lg text-sm leading-relaxed text-ash-300 md:text-[15px]">{step.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery */}
      <section className="gutter py-28 md:py-40">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <Reveal>
            <TiltFrame topLeft={<FrameTag>Detail · A</FrameTag>} max={5}>
              <ArtImage src={detailA} alt={`${project.title} detail A`} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3]" parallax={5} />
            </TiltFrame>
          </Reveal>
          <Reveal delay={0.12} className="md:mt-24">
            <TiltFrame topLeft={<FrameTag>Detail · B</FrameTag>} max={5}>
              <ArtImage src={detailB} alt={`${project.title} detail B`} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3]" parallax={5} />
            </TiltFrame>
          </Reveal>
        </div>
        <div className="group mt-6 md:mt-8">
          <ArtImage src={wide} alt={`${project.title} overview`} sizes="100vw" className="aspect-[16/9] md:aspect-[2/1]" parallax={8} />
        </div>
      </section>

      {/* Outcome */}
      <section className="gutter border-t border-line py-28 md:py-36">
        <Reveal>
          <p className="eyebrow text-[10px] text-ash-500">(03) — Outcome</p>
        </Reveal>
        <dl className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          {project.metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.08} className="bg-ink-950 p-8 md:p-10">
              <dt className="eyebrow text-[9px] text-ash-500">{metric.label}</dt>
              <dd>
                <CountUp metric={metric} className="mt-4 block font-display text-[clamp(3.5rem,7vw,6.5rem)] font-light leading-none text-bone-50" />
              </dd>
            </Reveal>
          ))}
        </dl>
        <div className="mx-auto mt-24 max-w-4xl text-center">
          <SplitText
            as="blockquote"
            text={`“${project.reflection}”`}
            stagger={0.03}
            className="font-serif text-[clamp(1.7rem,3.6vw,3rem)] italic leading-[1.25] text-bone-100"
          />
        </div>
      </section>

      <NextProject project={next} />
      <Contact />
    </article>
  );
}
