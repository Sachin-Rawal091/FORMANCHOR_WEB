import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'
import { SUPPORT_EMAIL } from '../constants'

export default function Terms() {
  const containerRef = useScrollReveal()

  return (
    <div ref={containerRef}>
      {/* ── Page Hero ── */}
      <section className="hero js-scroll-reveal">
        <div className="hero-pill-tag">
          <span className="pill-badge primary">
            <Icon name="gavel" size={14} /> Legal Agreement
          </span>
        </div>
        <h1>
          Terms of <span className="gradient-text">Service</span>
        </h1>
        <p className="hero-subtitle">
          Plain language guidelines for using FormAnchor's local-first Chrome extension and credit packs.
        </p>
      </section>

      <section className="container js-scroll-reveal" style={{ maxWidth: 860, marginBottom: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          <div className="glass-card">
            <h3>1. Local Execution & License</h3>
            <p style={{ marginTop: 8 }}>
              FormAnchor grants you a personal, non-exclusive license to run form automation workflows on your personal or business computer. The software runs entirely on your local machine using Chrome's extension runtime.
            </p>
          </div>

          <div className="glass-card">
            <h3>2. User Ownership of Data</h3>
            <p style={{ marginTop: 8 }}>
              You retain 100% ownership of your Excel/CSV spreadsheets, recording steps, and form entries. FormAnchor does not claim any rights over data processed through the software.
            </p>
          </div>

          <div className="glass-card">
            <h3>3. Credit Packs & Deductions</h3>
            <ul style={{ marginTop: 8, listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Icon name="check_circle" size={16} style={{ color: 'var(--accent-emerald)', marginTop: 3 }} />
                <div><strong>One-Time Purchases:</strong> All credit packs are one-time payments. No recurring monthly subscriptions or hidden renewal fees.</div>
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
              <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>
                {SUPPORT_EMAIL}
              </a>.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}
