import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'

export default function Security() {
  const containerRef = useScrollReveal()

  return (
    <div ref={containerRef}>
      {/* Page Hero */}
      <section className="page-hero fade-in-section">
        <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <Icon name="shield" size={48} className="text-primary" />
          <span className="gradient-text">Security Policy</span>
        </h1>
        <p>FormPilot is built with security at its core. Learn about our local sandbox architecture and security practices.</p>
      </section>

      {/* Security Principles Section */}
      <section className="section fade-in-section">
        <div className="security-grid">
          <div className="feature-card glass-card">
            <div className="feature-icon blue">
              <Icon name="gpp_maybe" />
            </div>
            <h3>Zero Data Transmission</h3>
            <p>
              No spreadsheet cells, form steps, or credentials ever leave your browser. All execution logic runs 100% locally.
            </p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon violet">
              <Icon name="lock" />
            </div>
            <h3>AES-256 Encryption</h3>
            <p>
              Sensitive spreadsheet rows and credentials are encrypted using the Web Crypto API (AES-GCM) at rest inside your browser.
            </p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon green">
              <Icon name="visibility_off" />
            </div>
            <h3>No Telemetry or Tracking</h3>
            <p>
              FormPilot includes zero tracking cookies, advertising trackers, user identifiers, or analytics scripts. Your workflows are private.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Security */}
      <section className="section fade-in-section" style={{ maxWidth: 800, margin: '0 auto 64px auto' }}>
        <div className="content-card glass-card">
          <h2>Security Architecture</h2>
          <p>We enforce modern browser sandboxing parameters to ensure extension integrity:</p>
          <ul>
            <li>
              <Icon name="check_circle" className="icon" />
              <div>
                <strong>Content Script Isolation:</strong> Content scripts running in web pages operate in isolated execution contexts, preventing host pages from tampering with the extension's variables.
              </div>
            </li>
            <li>
              <Icon name="check_circle" className="icon" />
              <div>
                <strong>Message Validation:</strong> Internal Chrome API messages are strictly validated before processing to prevent cross-origin script injection.
              </div>
            </li>
            <li>
              <Icon name="check_circle" className="icon" />
              <div>
                <strong>CSP Enforcement:</strong> Our Manifest V3 declaration strictly forbids loading any external remote code, protecting you against supply chain injection.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Responsible Disclosure */}
      <section className="section fade-in-section" style={{ maxWidth: 800, margin: '0 auto 64px auto' }}>
        <div className="content-card glass-card">
          <h2>Report a Vulnerability</h2>
          <p>
            If you discover a security vulnerability in FormPilot, we appreciate your support in disclosing it responsibly. Please do not open a public GitHub issue. Instead, report it privately to our security team.
          </p>
          <div style={{ marginTop: 24, padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <Icon name="mail" className="text-primary" />
            <span style={{ fontFamily: 'monospace', fontSize: 14 }}>sachinrawal473@gmail.com</span>
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: 'var(--text-muted)' }}>
            We will acknowledge receipt of your report within 48 hours and work with you to patch the issue before public disclosure.
          </p>
        </div>
      </section>

      {/* Compliance Badges */}
      <section className="fade-in-section" style={{ textAlign: 'center', marginBottom: 128 }}>
        <div className="compliance-badges">
          <div className="compliance-badge">Manifest V3 Compliant</div>
          <div className="compliance-badge">Chrome Web Store Policy Certified</div>
          <div className="compliance-badge">No Remote Code Execution</div>
        </div>
      </section>
    </div>
  )
}
