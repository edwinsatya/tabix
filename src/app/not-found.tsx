import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center gutter text-center">
      <p className="eyebrow text-[10px] text-ash-500">Error 404 · Uncharted terrain</p>
      <h1 className="mt-8 font-display text-[clamp(5rem,20vw,16rem)] font-light leading-none text-bone-50">
        Lost <span className="font-serif text-[0.5em] italic text-ash-300">in</span> fog
      </h1>
      <p className="mt-8 max-w-sm text-sm leading-relaxed text-ash-400">
        This page was painted over. The rest of the studio is still where you left it.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full border border-line-strong px-6 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-100 transition-colors hover:border-bone-100 hover:bg-bone-100 hover:text-ink-950"
      >
        ← Return to the index
      </Link>
    </section>
  );
}
