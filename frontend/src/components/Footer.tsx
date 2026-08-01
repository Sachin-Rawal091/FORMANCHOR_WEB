
export default function Footer() {
  const handleNav = (hash: string) => {
    window.location.hash = hash
    window.scrollTo({ top: 0 })
  }

  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Brand */}
        <a href="#/" className="logo" onClick={() => handleNav('#/')}>
          <img src="/icon-128.png" alt="FormAnchor Logo" style={{ width: 24, height: 24, objectFit: 'contain' }} />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 18, color: 'var(--text)' }}>
            FormAnchor
          </span>
        </a>

        {/* Links */}
        <div className="footer-links">
          <a href="#/privacy" className="footer-link" onClick={(e) => { e.preventDefault(); handleNav('#/privacy') }}>Privacy Policy</a>
          <a href="#/license" className="footer-link" onClick={(e) => { e.preventDefault(); handleNav('#/license') }}>License</a>
          <a href="#/security" className="footer-link" onClick={(e) => { e.preventDefault(); handleNav('#/security') }}>Security</a>
          <a href="#/contact" className="footer-link" onClick={(e) => { e.preventDefault(); handleNav('#/contact') }}>Contact</a>
        </div>

        {/* Copyright */}
        <div className="footer-copy">
          © {new Date().getFullYear()} FormAnchor. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
