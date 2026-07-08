import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, BookOpen } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        <BookOpen size={20} className="navbar__logo-accent" />
        <span>AI<span className="navbar__logo-accent">Dictionary</span></span>
      </Link>

      <div className="navbar__right">
        {!isHome && (
          <Link to="/" className="navbar__link">
            Dashboard
          </Link>
        )}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Ganti ke mode ${theme === 'light' ? 'gelap' : 'terang'}`}
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>
    </nav>
  )
}
