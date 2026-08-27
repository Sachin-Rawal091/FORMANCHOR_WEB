import Icon from './Icon'

export default function Footer() {
  const handleNav = (hash: string) => {
    window.location.hash = hash
    window.scrollTo({ top: 0 })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <a href="#/" className="logo" onClick={(e) => { e.preventDefault(); handleNav('#/') }}>
              <div className="logo-icon">
                <img src="/icon-128.png" alt="FormAnchor" />
              </div>
              <span className="logo-text">FormAnchor</span>
            </a>
            <p style={{ maxWidth: 360, fontSize: '0.9rem' }}>
              Record once, run every row. Automate complex multi-page forms
              from Excel spreadsheets — 100% locally in your browser with self-healing selectors.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <span className="pill-badge teal">
                <Icon name="verified_user" size={12} /> CWS Limited Use Compliant
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div className="footer-col">
            <div className="footer-heading">Product</div>
            <ul className="footer-links">
              <li><a href="#/" className="footer-link" onClick={(e) => { e.preventDefault(); handleNav('#/') }}>Home</a></li>
              <li><a href="#/pricing" className="footer-link" onClick={(e) => { e.preventDefault(); handleNav('#/pricing') }}>Pricing & ROI</a></li>
              <li><a href="#/install" className="footer-link" onClick={(e) => { e.preventDefault(); handleNav('#/install') }}>Install Guide</a></li>
              <li><a href="#/changelog" className="footer-link" onClick={(e) => { e.preventDefault(); handleNav('#/changelog') }}>Changelog</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-col">
            <div className="footer-heading">Resources</div>
            <ul className="footer-links">
              <li><a href="#/docs" className="footer-link" onClick={(e) => { e.preventDefault(); handleNav('#/docs') }}>Documentation</a></li>
              <li><a href="#/faq" className="footer-link" onClick={(e) => { e.preventDefault(); handleNav('#/faq') }}>FAQ</a></li>
              <li><a href="#/contact" className="footer-link" onClick={(e) => { e.preventDefault(); handleNav('#/contact') }}>Contact Support</a></li>
              <li>
                <a href="https://github.com/Sachin-Rawal091/FORMANCHOR" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  GitHub <Icon name="open_in_new" size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-col">
            <div className="footer-heading">Legal & Trust</div>
            <ul className="footer-links">
              <li><a href="#/privacy" className="footer-link" onClick={(e) => { e.preventDefault(); handleNav('#/privacy') }}>Privacy Policy</a></li>
              <li><a href="#/terms" className="footer-link" onClick={(e) => { e.preventDefault(); handleNav('#/terms') }}>Terms of Service</a></li>
              <li>
                <span className="pill-badge emerald" style={{ marginTop: 4 }}>
                  <Icon name="lock" size={12} /> AES-256 Encrypted
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} FormAnchor. Built by Sachin Rawal.</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
            Manifest V3 · 100% Local Sandbox · Zero Cloud Telemetry
          </span>
        </div>
      </div>
    </footer>
  )
}
