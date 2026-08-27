import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'

export default function Changelog() {
  const containerRef = useScrollReveal()

  const releases = [
    {
      version: 'v1.0.0',
      tag: 'Production Release',
      date: 'August 2026',
      badgeClass: 'primary',
      description: 'First official production release of FormAnchor for Google Chrome Manifest V3.',
      changes: [
        { type: 'Added', text: 'Multi-page form recording engine across domain transitions', tagClass: 'emerald' },
        { type: 'Added', text: '8-strategy self-healing selector engine with Shadow DOM piercing', tagClass: 'emerald' },
        { type: 'Added', text: 'SmartWait engine with dynamic network state detection', tagClass: 'emerald' },
        { type: 'Added', text: 'VirtualSelectHandler for Ant Design, Select2, and Choices.js dropdowns', tagClass: 'emerald' },
        { type: 'Added', text: 'DatePicker adapters: React Multi-DatePicker (RMDP) and AntD Calendar', tagClass: 'emerald' },
        { type: 'Added', text: 'Per-row AutoResume with IndexedDB checkpoint persistence', tagClass: 'emerald' },
        { type: 'Added', text: 'SubmitVerifier engine ensuring quota is only deducted on confirmed submission', tagClass: 'emerald' },
        { type: 'Added', text: 'AES-256-GCM encryption at rest for spreadsheet rows and recording storage', tagClass: 'emerald' },
      ]
    },
    {
      version: 'v0.9.0',
      tag: 'Audit & Hardening',
      date: 'July 2026',
      badgeClass: 'teal',
      description: 'Comprehensive test suite validation and code hardening pass.',
      changes: [
        { type: 'Improved', text: '373 automated Vitest tests across 40 test suites — 100% green pass rate', tagClass: 'primary' },
        { type: 'Improved', text: 'Security audit passed: Strict CSP, local Web Crypto API, zero external dependencies', tagClass: 'primary' },
        { type: 'Fixed', text: 'RowResultAggregator: Fixed USER_SKIPPED status handling for precise quota deduction', tagClass: 'teal' },
        { type: 'Improved', text: 'Renamed extension from FormPilot to FormAnchor for Chrome Web Store brand compliance', tagClass: 'primary' },
      ]
    },
    {
      version: 'v0.8.0',
      tag: 'Engine Architecture',
      date: 'June 2026',
      badgeClass: 'amber',
      description: 'Core execution and spreadsheet parsing architecture redesign.',
      changes: [
        { type: 'Added', text: 'SheetJS integration with 50-row chunking for crash-free large file parsing', tagClass: 'emerald' },
        { type: 'Improved', text: 'Migrated popup state management to lightweight Zustand store', tagClass: 'primary' },
        { type: 'Added', text: 'Rewrote local persistence layer on top of native IndexedDB (idb)', tagClass: 'emerald' },
      ]
    }
  ]

  return (
    <div ref={containerRef}>
      {/* ── Page Hero ── */}
      <section className="hero js-scroll-reveal">
        <div className="hero-pill-tag">
          <span className="pill-badge primary">
            <Icon name="update" size={14} /> Release History
          </span>
        </div>
        <h1>
          FormAnchor <br />
          <span className="gradient-text">Changelog & Releases</span>
        </h1>
        <p className="hero-subtitle">
          Follow the progress, engine improvements, and security hardening updates
          shipped across each release of FormAnchor.
        </p>
      </section>

      {/* ── Vertical Version Timeline ── */}
      <section className="container js-scroll-reveal" style={{ maxWidth: 860, marginBottom: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {releases.map((rel, idx) => (
            <div key={idx} className="glass-card" style={{ padding: 36 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <h2 style={{ fontSize: '1.6rem' }}>{rel.version}</h2>
                  <span className={`pill-badge ${rel.badgeClass}`}>{rel.tag}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {rel.date}
                </span>
              </div>

              <p style={{ marginBottom: 24, fontSize: '0.95rem' }}>{rel.description}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {rel.changes.map((item, cIdx) => (
                  <div 
                    key={cIdx} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'baseline', 
                      gap: 10,
                      padding: '8px 12px',
                      background: 'var(--surface-alt)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--glass-border)',
                      fontSize: '0.88rem'
                    }}
                  >
                    <span className={`pill-badge ${item.tagClass}`} style={{ padding: '2px 8px', fontSize: '0.72rem' }}>
                      {item.type}
                    </span>
                    <span style={{ color: 'var(--text-primary)' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GitHub Releases Card ── */}
      <section className="container js-scroll-reveal" style={{ maxWidth: 860, marginBottom: 80 }}>
        <div className="glass-card glow-primary" style={{ textAlign: 'center', padding: 36 }}>
          <h3>Want to inspect full source diffs or commit history?</h3>
          <p style={{ marginTop: 8, marginBottom: 20 }}>
            FormAnchor is developed openly on GitHub. View commit logs, tags, and automated test reports.
          </p>
          <a
            href="https://github.com/Sachin-Rawal091/FORMANCHOR/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <Icon name="open_in_new" size={16} /> View Releases on GitHub
          </a>
        </div>
      </section>
    </div>
  )
}
