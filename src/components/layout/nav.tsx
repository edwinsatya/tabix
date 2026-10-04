"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { useAtmosphere, useScrollLock } from "@/components/providers/atmosphere";
import { LiveDot } from "@/components/ui/tilt-frame";
import { navLinks, site } from "@/content/site";
import { useClock } from "@/lib/hooks";
import { cn } from "@/lib/cn";

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { introDone } = useAtmosphere();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const time = useClock(site.location.timeZone);
  const lenis = useLenis();

  useScrollLock(open);

  // On the home page, glide to the section instead of jumping. The menu
  // closes first so its scroll lock is released before the glide starts.
  const goTo = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (!isHome || !lenis) return;
    event.preventDefault();
    window.setTimeout(() => {
      lenis.scrollTo(`#${id}`, { offset: -72, duration: 1.6 });
      history.replaceState(null, "", `#${id}`);
    }, 60);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 240);
    setScrolled(latest > 40);
  });

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[75]"
        initial={{ y: -100 }}
        animate={{ y: !introDone || (hidden && !open) ? -100 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: introDone && !scrolled ? 0.6 : 0 }}
      >
        <div
          className={cn(
            "gutter flex h-[72px] items-center justify-between gap-6 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
            scrolled && !open ? "border-line bg-ink-950/70 backdrop-blur-xl" : "border-transparent bg-transparent",
          )}
        >
          <Link href="/" className="group flex items-center gap-3" aria-label="tabix — home" onClick={() => setOpen(false)}>
            <span className="eyebrow text-[10px] font-medium leading-[1.25] tracking-[0.28em] text-bone-50">
              tabix
            </span>
            <span className="hidden h-6 w-px bg-line-strong sm:block" />
            <span className="hidden font-serif text-xs italic leading-tight text-ash-400 sm:block">
              Design &amp;
              <br />
              Paint Studio
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link href={hrefFor(link.id)} onClick={goTo(link.id)} className="group eyebrow flex items-start gap-1.5 text-[10px] text-ash-300 transition-colors hover:text-bone-50">
                    <span className="text-[8px] text-ash-500 transition-colors group-hover:text-signal">{link.index}</span>
                    <span className="relative overflow-hidden">
                      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">{link.label}</span>
                      <span aria-hidden className="absolute inset-0 translate-y-full text-bone-50 transition-transform duration-500 ease-out group-hover:translate-y-0">
                        {link.label}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <div className="hidden text-right md:block">
              <p className="eyebrow text-[9px] text-ash-500">
                {site.location.city} · <span className="tabular-nums text-ash-300">{time}</span>
              </p>
              {site.availability.open && (
                <p className="eyebrow mt-0.5 flex items-center justify-end gap-2 text-[9px] text-signal">
                  <LiveDot /> Available
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-ink-900/60 backdrop-blur lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className={cn("absolute h-px w-4 bg-bone-100 transition-transform duration-500", open ? "rotate-45" : "-translate-y-[3px]")} />
              <span aria-hidden className={cn("absolute h-px w-4 bg-bone-100 transition-transform duration-500", open ? "-rotate-45" : "translate-y-[3px]")} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            className="fixed inset-0 z-[74] flex flex-col justify-between bg-ink-950 gutter pb-28 pt-28 lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <li key={link.id} className="overflow-hidden border-b border-line">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.06 }}
                    >
                      <Link href={hrefFor(link.id)} onClick={goTo(link.id)} className="flex items-baseline gap-4 py-3">
                        <span className="eyebrow text-[10px] text-ash-500">{link.index}</span>
                        <span className="font-serif text-5xl text-bone-50">{link.label}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              {site.socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="eyebrow text-ash-300">
                  {social.label} ↗
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
