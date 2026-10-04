/**
 * Placeholder imagery.
 *
 * Every image on the site goes through `ph()`, so swapping placeholders for
 * real artwork is a one-line change per entry in `src/content/*`: replace
 * `ph("seed", w, h)` with a local path such as `"/work/halden-cover.jpg"`.
 */
export function ph(seed: string, width: number, height: number) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}
