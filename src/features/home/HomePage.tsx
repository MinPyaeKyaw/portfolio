import { Link } from 'react-router-dom'
import './HomePage.css'

export default function HomePage() {
  return (
    <div className="feature-page">
      <h1>Welcome</h1>
      <p className="feature-lead">
        Look up words in the dictionary or study kanji. Choose a section below
        to get started.
      </p>
      <div className="feature-actions">
        <Link to="/dictionary" className="primary">
          Open dictionary
        </Link>
        <Link to="/kanji">Browse kanji</Link>
      </div>
    </div>
  )
}
