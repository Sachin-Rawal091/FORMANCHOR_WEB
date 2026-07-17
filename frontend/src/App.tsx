import { useState, useEffect } from 'react'
import Layout from './components/Layout'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Install from './pages/Install'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Security from './pages/Security'
import License from './pages/License'
import NotFound from './pages/NotFound'

export type PageRoute = 'home' | 'about' | 'install' | 'faq' | 'contact' | 'privacy' | 'security' | 'license' | '404'

export default function App() {
  const [route, setRoute] = useState<PageRoute>('home')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('fp-theme')
    return (saved === 'light' || saved === 'dark') ? saved : 'dark'
  })

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('fp-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  // Hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      const routeMap: Record<string, PageRoute> = {
        '#/': 'home',
        '': 'home',
        '#/about': 'about',
        '#/install': 'install',
        '#/faq': 'faq',
        '#/contact': 'contact',
        '#/privacy': 'privacy',
        '#/security': 'security',
        '#/license': 'license',
      }

      const targetRoute = routeMap[hash] ?? '404'
      setRoute(targetRoute)

      // SEO: update tab title
      const titles: Record<PageRoute, string> = {
        home: 'FormPilot — Automate Form Filling at Scale',
        about: 'About — FormPilot',
        install: 'Install — FormPilot',
        faq: 'FAQ — FormPilot',
        contact: 'Contact — FormPilot',
        privacy: 'Privacy Policy — FormPilot',
        security: 'Security — FormPilot',
        license: 'License — FormPilot',
        '404': 'Page Not Found — FormPilot',
      }
      document.title = titles[targetRoute]
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const renderPage = () => {
    switch (route) {
      case 'home': return <Home />
      case 'about': return <About />
      case 'install': return <Install />
      case 'faq': return <Faq />
      case 'contact': return <Contact />
      case 'privacy': return <Privacy />
      case 'security': return <Security />
      case 'license': return <License />
      case '404': default: return <NotFound />
    }
  }

  return (
    <Layout currentRoute={route} theme={theme} onToggleTheme={toggleTheme}>
      {renderPage()}
    </Layout>
  )
}
