import './KanjiPage.css'

const previewKanji = ['一', '二', '三', '語', '漢', '字']

export default function KanjiPage() {
  return (
    <div className="feature-page">
      <h1>Kanji</h1>
      <p className="feature-subtitle">Study and review kanji.</p>
      <div className="kanji-grid-placeholder" aria-hidden>
        {previewKanji.map((k) => (
          <div key={k} className="kanji-tile">
            {k}
          </div>
        ))}
      </div>
      <p className="feature-subtitle" style={{ marginTop: '1.25rem' }}>
        Full kanji lists and drills can be added here next.
      </p>
    </div>
  )
}
