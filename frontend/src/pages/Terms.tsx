import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'

export default function Terms() {
  const containerRef = useScrollReveal()

  return (
    <div ref={containerRef}>
      {/* ── Page Hero ── */}
      <section className="hero js-scroll-reveal">
        <div className="hero-pill-tag">
          <span className="pill-badge primary">
            <Icon name="gavel" size={14} /> Legal Terms
          </span>
        </div>
        <h1>
          Terms of Service & <br />
          <span className="gradient-text">License Agreement</span>
        </h1>
        <p className="hero-subtitle">
          Last updated: August 2026. Clear, fair, and transparent conditions for using
          the FormAnchor browser extension and credit packs.
        </p>
      </section>

      {/* ── Terms Content Sections ── */}
      <section className="container js-scroll-reveal" style={{ maxWidth: 860, marginBottom: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div className="glass-card">
            <h3>1. Acceptance of Terms</h3>
            <p style={{ marginTop: 8 }}>
              By downloading, installing, or executing the FormAnchor Chrome Extension, you agree to these Terms of Service.
              If you do not agree to all terms, please remove the extension from your browser.
            </p>
          </div>

          <div className="glass-card">
            <h3>2. Description of Service</h3>
            <p style={{ marginTop: 8 }}>
              FormAnchor is an in-browser automation tool designed to assist operators in filling complex, multi-page forms
              from structured spreadsheets. All execution occurs on the user's computer under their direct supervision and control.
            </p>
          </div>

          <div className="glass-card">
            <h3>3. Credit Packs & Licensing</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Icon name="check_circle" size={16} style={{ color: 'var(--accent-emerald)', marginTop: 3 }} />
                <div><strong>100 Free Rows:</strong> Every user receives 100 free row submissions upon installation.</div>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Icon name="check_circle" size={16} style={{ color: 'var(--accent-emerald)', marginTop: 3 }} />
                <div><strong>One-Time Packs:</strong> Top-up credits are sold as one-time packs, not recurring subscriptions.</div>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Icon name="check_circle" size={16} style={{ color: 'var(--accent-emerald)', marginTop: 3 }} />
                <div><strong>No Expiration:</strong> Purchased credits never expire and stay in your balance indefinitely.</div>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Icon name="check_circle" size={16} style={{ color: 'var(--accent-emerald)', marginTop: 3 }} />
                <div><strong>Verified Deductions:</strong> Credits are only consumed when a form is successfully confirmed by <code style={{ color: 'var(--primary)' }}>SubmitVerifier</code>.</div>
              </li>
            </ul>
          </div>

          <div className="glass-card">
            <h3>4. Operator Responsibilities</h3>
            <p style={{ marginTop: 8 }}>
              You are responsible for ensuring that your spreadsheet data is accurate and that your automated form submissions comply with the terms of the third-party portal you are interacting with. FormAnchor is a productivity assistant, not an authorization bypass tool.
            </p>
          </div>

          <div className="glass-card">
            <h3>5. Contact Information</h3>
            <p style={{ marginTop: 8 }}>
              For legal inquiries, licensing questions, or commercial deployments, contact{' '}
              <a href="mailto:sachinrawal473@gmail.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                sachinrawal473@gmail.com
              </a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
