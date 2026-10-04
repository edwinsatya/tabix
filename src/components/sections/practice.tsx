import { ArtImage } from "@/components/ui/art-image";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { practice, stats } from "@/content/practice";
import { ph } from "@/lib/placeholder";
import { cn } from "@/lib/cn";

type Discipline = (typeof practice)["interface"];

function DisciplineCard({ discipline, variant }: { discipline: Discipline; variant: "grid" | "paint" }) {
  return (
    <article className="group relative overflow-hidden border border-line bg-ink-900 p-7 md:p-10">
      {/* Hover texture: a design grid for Interface, a painted surface for Pigment */}
      {variant === "grid" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 [background-image:linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(80%_70%_at_70%_20%,black,transparent)]"
        />
      ) : (
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-25 [mask-image:radial-gradient(80%_70%_at_70%_20%,black,transparent)]">
          <ArtImage src={ph("practice-pigment-texture", 1200, 900)} alt="" sizes="50vw" reveal={false} colorOnHover={false} className="h-full w-full bg-transparent" />
        </div>
      )}

      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="eyebrow text-[10px] text-signal">{discipline.label}</p>
          <span
            aria-hidden
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ash-300 transition-transform duration-700 group-hover:rotate-90",
            )}
          >
            {variant === "grid" ? "⌗" : "◐"}
          </span>
        </div>
        <h3 className="mt-10 font-serif text-4xl leading-tight text-bone-50 md:text-5xl">{discipline.title}</h3>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-ash-300">{discipline.intro}</p>
        <ul className="mt-10 border-t border-line">
          {discipline.services.map((service, i) => (
            <li key={service.name} className="group/row flex items-baseline justify-between gap-4 border-b border-line py-4">
              <span className="flex items-baseline gap-4">
                <span className="font-mono text-[10px] text-ash-500">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[15px] text-bone-100 transition-transform duration-500 group-hover/row:translate-x-1.5">{service.name}</span>
              </span>
              <span className="text-right text-xs text-ash-400">{service.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function Practice() {
  return (
    <section id="practice" className="relative gutter py-28 md:py-40">
      <SectionHeading
        index="03"
        eyebrow="Practice"
        title="Two disciplines, one hand"
        aside={
          <p className="max-w-xs text-sm leading-relaxed text-ash-400 md:text-right">
            The precision of a design system and the accident of a palette knife — each one keeps the other honest.
          </p>
        }
      />

      <div className="relative mt-16 grid gap-5 md:grid-cols-2 md:gap-6">
        <Reveal>
          <DisciplineCard discipline={practice.interface} variant="grid" />
        </Reveal>
        <Reveal delay={0.12}>
          <DisciplineCard discipline={practice.pigment} variant="paint" />
        </Reveal>
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-ink-950 font-serif text-xl italic text-bone-100 md:flex"
        >
          ×
        </span>
      </div>

      <dl className="mt-20 grid grid-cols-2 gap-y-12 border-t border-line pt-12 md:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className={cn("md:px-6", i > 0 && "md:border-l md:border-line")}>
            <dt className="eyebrow text-[9px] text-ash-500">{stat.label}</dt>
            <dd>
              <CountUp metric={stat} className="mt-3 block font-display text-[clamp(3.5rem,7vw,6rem)] font-light leading-none text-bone-50" />
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
