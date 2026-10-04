"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { ArtImage } from "@/components/ui/art-image";
import { CountUp } from "@/components/ui/count-up";
import { Reveal, SplitText, EASE_OUT_EXPO } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { FrameTag, LiveDot, TiltFrame } from "@/components/ui/tilt-frame";
import { projects, type Project } from "@/content/projects";

function CaseLink({ project, className }: { project: Project; className?: string }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group/link eyebrow inline-flex items-center gap-3 text-[10px] text-bone-100 ${className ?? ""}`}
    >
      <span className="relative">
        Read the case study
        <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-bone-100 transition-transform duration-500 group-hover/link:origin-left group-hover/link:scale-x-100" />
      </span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong transition-all duration-500 group-hover/link:border-bone-100 group-hover/link:bg-bone-100 group-hover/link:text-ink-950">
        →
      </span>
    </Link>
  );
}

function CaseTitle({ project }: { project: Project }) {
  return (
    <h3 className="font-serif text-[clamp(2.2rem,4.4vw,3.9rem)] leading-[1.02] tracking-[-0.015em] text-bone-50">
      <SplitText text={project.title} />
      <br />
      <SplitText text={project.headline} delay={0.15} className="italic text-ash-300" />
    </h3>
  );
}

function SpecTable({ rows }: { rows: Project["meta"] }) {
  return (
    <dl className="border border-line bg-ink-900/60 px-5 py-2">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-[110px_1fr] gap-4 border-b border-line py-3 last:border-b-0">
          <dt className="eyebrow pt-0.5 text-[9px] text-ash-500">{row.label}</dt>
          <dd className="text-[13px] text-bone-200">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function FramedCover({ project, aspect, sizes }: { project: Project; aspect: string; sizes: string }) {
  return (
    <Link href={`/work/${project.slug}`} data-cursor="View" className="group block" aria-label={`${project.title} case study`}>
      <TiltFrame
        topLeft={<FrameTag live>{`Case ${project.index} · ${project.status}`}</FrameTag>}
        bottomLeft={<FrameTag>{project.category}</FrameTag>}
        bottomRight={<FrameTag>{project.year}</FrameTag>}
      >
        <ArtImage src={project.cover} alt={`${project.title} — ${project.headline}`} sizes={sizes} parallax={6} className={aspect} />
      </TiltFrame>
    </Link>
  );
}

/** Layout A — image left, story + spec sheet right. */
function CaseSplit({ project }: { project: Project }) {
  return (
    <article className="grid items-center gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
      <div className="md:col-span-7">
        <FramedCover project={project} aspect="aspect-[4/3]" sizes="(min-width: 768px) 58vw, 100vw" />
      </div>
      <div className="relative md:col-span-5">
        <span aria-hidden className="pointer-events-none absolute -top-16 right-0 select-none font-display text-[11rem] font-light leading-none text-bone-50/[0.035]">
          {project.index}
        </span>
        <Reveal>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <p className="eyebrow text-[10px] text-ash-500">
              Case {project.index} / {project.category}
            </p>
          </div>
        </Reveal>
        <CaseTitle project={project} />
        <Reveal delay={0.1}>
          <p className="mt-7 font-serif text-lg italic leading-relaxed text-bone-200">“{project.quote}”</p>
        </Reveal>
        <Reveal delay={0.15} className="mt-8">
          <SpecTable rows={project.meta} />
        </Reveal>
        <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center justify-between gap-6 border-b border-line pb-6">
          <p className="eyebrow text-[10px] text-ash-400">
            {project.metrics[0].label}: <CountUp metric={project.metrics[0]} className="text-signal" />
          </p>
          <CaseLink project={project} />
        </Reveal>
      </div>
    </article>
  );
}

/** Layout B — title row, cinematic wide image, three metric columns. */
function CaseWide({ project }: { project: Project }) {
  return (
    <article>
      <div className="mb-12 grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3 text-[10px] text-ash-500">
              Case {project.index} / {project.category}
              <span className="flex items-center gap-2 text-signal">
                <LiveDot /> {project.status}
              </span>
            </p>
          </Reveal>
          <CaseTitle project={project} />
        </div>
        <Reveal delay={0.15} className="md:col-span-4 md:col-start-9">
          <p className="text-sm leading-relaxed text-ash-300 md:text-right">{project.summary}</p>
        </Reveal>
      </div>

      <FramedCover project={project} aspect="aspect-[16/10] md:aspect-[21/9]" sizes="100vw" />

      <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
        {project.metrics.map((metric, i) => (
          <Reveal key={metric.label} delay={i * 0.08} className="bg-ink-950 p-6">
            <p className="eyebrow text-[9px] text-ash-500">{metric.label}</p>
            <CountUp metric={metric} className="mt-3 block font-display text-5xl font-light text-bone-50" />
            <p className="mt-3 text-xs text-ash-400">{project.meta[i]?.label}: {project.meta[i]?.value}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8 flex justify-end">
        <CaseLink project={project} />
      </Reveal>
    </article>
  );
}

function Bar({ label, width, delay, strong }: { label: string; width: number; delay: number; strong?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <div ref={ref} className="grid grid-cols-[64px_1fr] items-center gap-4">
      <span className="eyebrow text-[9px] text-ash-500">{label}</span>
      <div className="h-[3px] w-full bg-line">
        <motion.div
          className={strong ? "h-full origin-left bg-bone-100" : "h-full origin-left bg-ash-500"}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: width } : undefined}
          transition={{ duration: 1.8, ease: EASE_OUT_EXPO, delay }}
        />
      </div>
    </div>
  );
}

/**
 * The headline metric as a before / after comparison (for "+N%" uplifts),
 * with the remaining metrics as plain figures underneath.
 */
function ImpactPanel({ project }: { project: Project }) {
  const [lead, ...rest] = project.metrics;
  const isUplift = lead.prefix === "+" && lead.suffix === "%";
  return (
    <div className="border border-line bg-ink-900/60 p-5">
      <div className="flex items-baseline justify-between">
        <span className="eyebrow text-[9px] text-ash-500">{lead.label}</span>
        <CountUp metric={lead} className="font-mono text-sm text-signal" />
      </div>
      {isUplift && (
        <div className="mt-4 space-y-2.5">
          <Bar label="Before" width={100 / (100 + lead.value)} delay={0.2} />
          <Bar label="After" width={1} delay={0.35} strong />
        </div>
      )}
      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-4">
        {rest.map((metric) => (
          <div key={metric.label}>
            <dt className="eyebrow text-[9px] text-ash-500">{metric.label}</dt>
            <dd>
              <CountUp metric={metric} className="mt-1 block font-display text-3xl font-light text-bone-50" />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Layout C — story with metric bars left, framed image right. */
function CaseSplitReverse({ project }: { project: Project }) {
  return (
    <article className="grid items-center gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
      <div className="order-2 md:order-1 md:col-span-5">
        <Reveal>
          <p className="eyebrow mb-6 text-[10px] text-ash-500">
            Case {project.index} / {project.category}
          </p>
        </Reveal>
        <CaseTitle project={project} />
        <Reveal delay={0.1}>
          <p className="mt-7 text-sm leading-relaxed text-ash-300">{project.summary}</p>
        </Reveal>
        <Reveal delay={0.15} className="mt-9">
          <ImpactPanel project={project} />
        </Reveal>
        <Reveal delay={0.2}>
          <dl className="mt-8 space-y-2">
            {project.meta.slice(0, 3).map((row) => (
              <div key={row.label} className="grid grid-cols-[110px_1fr] gap-4">
                <dt className="eyebrow pt-0.5 text-[9px] text-ash-500">{row.label}</dt>
                <dd className="text-[13px] text-bone-200">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={0.25} className="mt-9">
          <CaseLink project={project} />
        </Reveal>
      </div>
      <div className="order-1 md:order-2 md:col-span-7">
        <FramedCover project={project} aspect="aspect-[4/3]" sizes="(min-width: 768px) 58vw, 100vw" />
      </div>
    </article>
  );
}

const layouts = [CaseSplit, CaseWide, CaseSplitReverse];

export function FeaturedWork() {
  return (
    <section id="work" className="relative gutter py-28 md:py-40">
      <SectionHeading
        index="01"
        eyebrow="Selected work"
        title="Selected Cases (2023—2026)"
        aside={
          <div className="max-w-xs md:text-right">
            <p className="text-sm leading-relaxed text-ash-400">
              Product stories where restraint did the heavy lifting.
            </p>
            <p className="eyebrow mt-4 flex items-center gap-2 text-[9px] text-signal md:justify-end">
              <LiveDot /> {projects.length} case studies · tilt to inspect
            </p>
          </div>
        }
      />
      <div className="mt-20 space-y-36 md:mt-28 md:space-y-52">
        {projects.map((project, i) => {
          const Layout = layouts[i % layouts.length];
          return <Layout key={project.slug} project={project} />;
        })}
      </div>
    </section>
  );
}
