import { Marquee } from "@/components/ui/marquee";
import { disciplines } from "@/content/site";

function Star() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="mx-[0.45em] h-[0.32em] w-[0.32em] shrink-0 fill-signal">
      <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0Z" />
    </svg>
  );
}

export function DisciplinesBand() {
  return (
    <section aria-label="Disciplines" className="relative border-y border-line bg-ink-950 py-7 md:py-9">
      <Marquee baseVelocity={-1.6}>
        {disciplines.map((item, i) => (
          <span key={item} className="flex items-center">
            <span
              className={
                i % 2 === 0
                  ? "font-display text-[clamp(2.4rem,6vw,5.4rem)] font-light italic leading-none text-bone-100"
                  : "font-display text-[clamp(2.4rem,6vw,5.4rem)] font-light leading-none text-transparent [-webkit-text-stroke:1px_rgb(235_232_225/0.45)]"
              }
            >
              {item}
            </span>
            <Star />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
