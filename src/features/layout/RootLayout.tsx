import { NavLink, Outlet } from 'react-router-dom'
import './RootLayout.css'

export default function RootLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink to="/" className="app-brand" end>
          Myanhon
        </NavLink>
        <nav className="app-nav" aria-label="Main">
          <NavLink to="/dictionary">Dictionary</NavLink>
          <NavLink to="/kanji">Kanji</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
