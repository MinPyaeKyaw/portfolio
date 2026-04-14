const previewKanji = ['一', '二', '三', '語', '漢', '字']

export default function KanjiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-left">
      <h1 className="font-heading text-3xl font-medium tracking-tight text-foreground md:text-4xl">
        Kanji
      </h1>
      <p className="mt-2 text-muted-foreground text-sm">Study and review kanji.</p>
      <div
        className="mt-8 grid max-w-md grid-cols-[repeat(auto-fill,minmax(3.5rem,1fr))] gap-2.5"
        aria-hidden
      >
        {previewKanji.map((k) => (
          <div
            key={k}
            className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-border bg-card font-sans text-2xl text-foreground"
          >
            {k}
          </div>
        ))}
      </div>
      <p className="mt-8 text-muted-foreground text-sm">
        Full kanji lists and drills can be added here next.
      </p>
    </div>
  )
}
