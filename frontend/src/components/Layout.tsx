import { type ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
  currentRoute: string
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function Layout({ children, currentRoute, theme, onToggleTheme }: LayoutProps) {
  return (
    <>
      <Header currentRoute={currentRoute} theme={theme} onToggleTheme={onToggleTheme} />
      <main className="page-content">
        <div className="container">
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}
