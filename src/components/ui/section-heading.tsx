import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal, SplitText } from "./reveal";

/** "(02) — Paintings" eyebrow, a big serif title and optional right-hand meta. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  aside,
  className,
}: {
  index: string;
  eyebrow: string;
  title: string;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-8 border-b border-line pb-10 md:flex-row md:items-end md:justify-between", className)}>
      <div>
        <Reveal>
          <p className="eyebrow mb-5 text-ash-400">
            ({index}) — {eyebrow}
          </p>
        </Reveal>
        <SplitText
          as="h2"
          text={title}
          className="font-serif text-[clamp(2.4rem,5.6vw,5rem)] leading-[1.02] tracking-[-0.02em] text-bone-50"
        />
      </div>
      {aside && <Reveal delay={0.2} className="md:shrink-0 md:pb-3">{aside}</Reveal>}
    </div>
  );
}
