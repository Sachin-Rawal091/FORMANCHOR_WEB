import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'

export default function NotFound() {
  const containerRef = useScrollReveal()

  const handleNav = (hash: string) => {
    window.location.hash = hash
    window.scrollTo({ top: 0 })
  }

  return (
    <div ref={containerRef} className="not-found fade-in-section">
      <div className="not-found-code gradient-text">404</div>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist, has been removed, or has been temporarily moved.</p>
      
      <div className="hero-ctas">
        <a 
          href="#/" 
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault()
            handleNav('#/')
          }}
        >
          <Icon name="home" size={18} />
          Go Home
        </a>
        <a 
          href="#/contact" 
          className="btn btn-ghost"
          onClick={(e) => {
            e.preventDefault()
            handleNav('#/contact')
          }}
        >
          <Icon name="mail" size={18} />
          Contact Support
        </a>
      </div>
    </div>
  )
}
