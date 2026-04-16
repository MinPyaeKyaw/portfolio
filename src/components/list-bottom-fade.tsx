/** Fades scrollable list content at the bottom edge (same as dictionary word list). */
export function ListBottomFade() {
  return (
    <div
      className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-linear-to-t from-background via-background/80 to-transparent"
      aria-hidden
    />
  );
}
