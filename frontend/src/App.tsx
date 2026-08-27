import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import { useLenis } from './hooks/useLenis'

// Pages
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Docs from './pages/Docs'
import Install from './pages/Install'
import Faq from './pages/Faq'
import Changelog from './pages/Changelog'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export type PageRoute =
  | 'home' | 'pricing' | 'docs' | 'install' | 'faq'
  | 'changelog' | 'privacy' | 'terms' | 'contact' | '404'

export default function App() {
  const [route, setRoute] = useState<PageRoute>('home')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('fa-theme')
    return (saved === 'light' || saved === 'dark') ? saved : 'dark'
  })

  // Initialize Lenis luxury smooth scrolling
  useLenis()

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('fa-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  // Hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      const routeMap: Record<string, PageRoute> = {
        '#/': 'home',
        '': 'home',
        '#/pricing': 'pricing',
        '#/docs': 'docs',
        '#/install': 'install',
        '#/faq': 'faq',
        '#/changelog': 'changelog',
        '#/privacy': 'privacy',
        '#/terms': 'terms',
        '#/contact': 'contact',
      }

      const targetRoute = routeMap[hash] ?? '404'
      setRoute(targetRoute)

      // Update page title per route
      const titles: Record<PageRoute, string> = {
        home: 'FormAnchor — Record Once, Run Every Row',
        pricing: 'Pricing — FormAnchor',
        docs: 'Documentation — FormAnchor',
        install: 'Install — FormAnchor',
        faq: 'FAQ — FormAnchor',
        changelog: 'Changelog — FormAnchor',
        privacy: 'Privacy Policy — FormAnchor',
        terms: 'Terms of Service — FormAnchor',
        contact: 'Contact — FormAnchor',
        '404': 'Page Not Found — FormAnchor',
      }
      document.title = titles[targetRoute]

      // Scroll to top on route change
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo({ top: 0 })
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const renderPage = () => {
    switch (route) {
      case 'home': return <Home />
      case 'pricing': return <Pricing />
      case 'docs': return <Docs />
      case 'install': return <Install />
      case 'faq': return <Faq />
      case 'changelog': return <Changelog />
      case 'privacy': return <Privacy />
      case 'terms': return <Terms />
      case 'contact': return <Contact />
      case '404': default: return <NotFound />
    }
  }

  return (
    <ErrorBoundary>
      <Layout currentRoute={route} theme={theme} onToggleTheme={toggleTheme}>
        {renderPage()}
      </Layout>
    </ErrorBoundary>
  )
}
