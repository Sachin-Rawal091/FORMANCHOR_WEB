import { useState } from 'react'
import Icon from './Icon'

interface HeaderProps {
  currentRoute: string
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function Header({ currentRoute, theme, onToggleTheme }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { label: 'Home', value: 'home', hash: '#/' },
    { label: 'About', value: 'about', hash: '#/about' },
    { label: 'Install', value: 'install', hash: '#/install' },
    { label: 'FAQ', value: 'faq', hash: '#/faq' },
    { label: 'Contact', value: 'contact', hash: '#/contact' },
  ]

  const handleNav = (hash: string) => {
    window.location.hash = hash
    setMobileOpen(false)
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <header className="header">
        <div className="container header-container">
          {/* Brand */}
          <a href="#/" className="logo" onClick={() => handleNav('#/')}>
            <div className="logo-icon" style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 10, padding: 3, width: 34, height: 34, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/icon-128.png" alt="FormAnchor Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span className="logo-text">FormAnchor</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.value}
                href={item.hash}
                className={`nav-link ${currentRoute === item.value ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNav(item.hash)
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <Icon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} size={20} />
            </button>
            <a
              href="#/install"
              className="btn btn-primary"
              style={{ padding: '10px 20px', fontSize: '14px' }}
              onClick={(e) => {
                e.preventDefault()
                handleNav('#/install')
              }}
            >
              Start for Free
            </a>

            {/* Mobile Toggle */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <Icon name={mobileOpen ? 'close' : 'menu'} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div className={`nav-mobile-overlay ${mobileOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.value}
            href={item.hash}
            className={`nav-link ${currentRoute === item.value ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              handleNav(item.hash)
            }}
          >
            {item.label}
          </a>
        ))}
        <div style={{ marginTop: '16px' }}>
          <a
            href="#/install"
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={(e) => {
              e.preventDefault()
              handleNav('#/install')
            }}
          >
            Start for Free
          </a>
        </div>
      </div>
    </>
  )
}
