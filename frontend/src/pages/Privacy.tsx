import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'

export default function Privacy() {
  const containerRef = useScrollReveal()

  return (
    <div ref={containerRef}>
      {/* ── Page Hero ── */}
      <section className="hero js-scroll-reveal">
        <div className="hero-pill-tag">
          <span className="pill-badge emerald">
            <Icon name="verified_user" size={14} /> Security & Compliance
          </span>
        </div>
        <h1>
          Privacy Policy & <br />
          <span className="gradient-text">Data Architecture</span>
        </h1>
        <p className="hero-subtitle">
          Last updated: August 2026. Zero cloud telemetry, 100% local client-side processing,
          and strict compliance with Chrome Web Store Limited Use policies.
        </p>
      </section>

      {/* ── Local-First Commitment Card ── */}
      <section className="container js-scroll-reveal" style={{ maxWidth: 860, marginBottom: 40 }}>
        <div className="glass-card glow-primary" style={{ padding: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div className="pipeline-icon-circle" style={{ width: 44, height: 44, flexShrink: 0 }}>
              <Icon name="shield" size={22} />
            </div>
            <div>
              <h3>Local-First Architecture Guarantee</h3>
              <p style={{ fontSize: '0.88rem' }}>FormAnchor operates completely inside your browser sandbox.</p>
            </div>
          </div>
          <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
            We do not collect, transmit, or synchronize any user form data, personal identifiable information (PII),
            passwords, or uploaded spreadsheet contents to external servers. All form execution logic runs locally on your machine.
          </p>
        </div>
      </section>

      {/* ── Structured Sections ── */}
      <section className="container js-scroll-reveal" style={{ maxWidth: 860, marginBottom: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* Section 1 */}
          <div className="glass-card">
            <h3>1. Data Access & Local Processing</h3>
            <p style={{ marginTop: 8, marginBottom: 16 }}>
              To perform automated form filling, FormAnchor accesses and stores the following assets exclusively on your device:
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Icon name="check_circle" size={16} style={{ color: 'var(--accent-emerald)', marginTop: 3 }} />
                <div>
                  <strong>Recorded Workflow Steps:</strong> Element IDs, tags, class names, CSS paths, label text, and action types needed to replay form sequences.
                </div>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Icon name="check_circle" size={16} style={{ color: 'var(--accent-emerald)', marginTop: 3 }} />
                <div>
                  <strong>Uploaded Spreadsheets:</strong> Excel (<code style={{ color: 'var(--primary)' }}>.xlsx</code>) and CSV files parsed in-memory using SheetJS.
                </div>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Icon name="check_circle" size={16} style={{ color: 'var(--accent-emerald)', marginTop: 3 }} />
                <div>
                  <strong>Web Form Fields:</strong> Targeted input DOM elements on portal URLs you explicitly choose to automate.
                </div>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="glass-card">
            <h3>2. Local Storage & AES-256 Encryption</h3>
            <p style={{ marginTop: 8, marginBottom: 16 }}>
              Data persistence relies on browser-native, sandboxed storage mechanisms:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              <div style={{ padding: 18, background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                <strong>IndexedDB at Rest</strong>
                <p style={{ fontSize: '0.82rem', marginTop: 6, color: 'var(--text-secondary)' }}>
                  Workflows and spreadsheet rows are encrypted using AES-GCM 256-bit keys via the standard Web Crypto API.
                </p>
              </div>

              <div style={{ padding: 18, background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                <strong>chrome.storage.session</strong>
                <p style={{ fontSize: '0.82rem', marginTop: 6, color: 'var(--text-secondary)' }}>
                  Volatile runtime state (current row index, execution timers) is cleared automatically when the browser window closes.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="glass-card">
            <h3>3. Chrome Web Store Limited Use Compliance</h3>
            <p style={{ marginTop: 8, marginBottom: 16 }}>
              FormAnchor adheres strictly to the Chrome Web Store Developer Program Policies:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              <div style={{ padding: 16, background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)' }}>
                <span className="pill-badge emerald" style={{ marginBottom: 8 }}>Zero Sale</span>
                <p style={{ fontSize: '0.85rem' }}>We never sell user data or browser information to third parties or brokers.</p>
              </div>

              <div style={{ padding: 16, background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)' }}>
                <span className="pill-badge emerald" style={{ marginBottom: 8 }}>No Advertising</span>
                <p style={{ fontSize: '0.85rem' }}>We never use form data for ad targeting, marketing, or credit scoring.</p>
              </div>

              <div style={{ padding: 16, background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)' }}>
                <span className="pill-badge emerald" style={{ marginBottom: 8 }}>No Remote Code</span>
                <p style={{ fontSize: '0.85rem' }}>The extension contains zero remotely hosted scripts, complying with MV3 CSP rules.</p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="glass-card">
            <h3>4. Contact & Inquiries</h3>
            <p style={{ marginTop: 8 }}>
              If you have any questions regarding FormAnchor's privacy practices or security model, contact the developer directly at{' '}
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
