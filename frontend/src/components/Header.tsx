import { useState } from 'react'
import { motion } from 'framer-motion'
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
    { label: 'Pricing', value: 'pricing', hash: '#/pricing' },
    { label: 'Docs', value: 'docs', hash: '#/docs' },
    { label: 'Install', value: 'install', hash: '#/install' },
    { label: 'FAQ', value: 'faq', hash: '#/faq' },
    { label: 'Changelog', value: 'changelog', hash: '#/changelog' },
    { label: 'Contact', value: 'contact', hash: '#/contact' },
  ]

  const handleNav = (hash: string) => {
    window.location.hash = hash
    setMobileOpen(false)
  }

  return (
    <>
      <div className="header-wrapper">
        <header className="header">
          {/* Brand */}
          <a href="#/" className="logo" onClick={(e) => { e.preventDefault(); handleNav('#/') }}>
            <div className="logo-icon">
              <img src="/icon-128.png" alt="FormAnchor" />
            </div>
            <span className="logo-text">FormAnchor</span>
          </a>

          {/* Desktop Nav with Framer Motion Spring Pill */}
          <nav className="nav-links">
            {navItems.map((item) => {
              const isActive = currentRoute === item.value
              return (
                <a
                  key={item.value}
                  href={item.hash}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNav(item.hash)
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="nav-indicator"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="nav-label">{item.label}</span>
                </a>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              type="button"
            >
              <Icon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} size={18} />
            </button>
            <a
              href="#/install"
              className="btn btn-primary btn-sm header-cta"
              onClick={(e) => { e.preventDefault(); handleNav('#/install') }}
            >
              Add to Chrome
            </a>
            <button
              className="mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              type="button"
            >
              <Icon name={mobileOpen ? 'close' : 'menu'} size={24} />
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Nav */}
      <div className={`nav-mobile-overlay ${mobileOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.value}
            href={item.hash}
            className={`nav-link ${currentRoute === item.value ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNav(item.hash) }}
          >
            {item.label}
          </a>
        ))}
        <div style={{ marginTop: 16 }}>
          <a
            href="#/install"
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={(e) => { e.preventDefault(); handleNav('#/install') }}
          >
            Add to Chrome — Free
          </a>
        </div>
      </div>
    </>
  )
}
