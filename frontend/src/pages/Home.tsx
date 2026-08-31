import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'
import RowLedgerConsole from '../components/RowLedgerConsole'
import autofillVideo from '../assets/autofill_demo.mp4'
import { PREVIEW_FAQS } from '../constants'

export default function Home() {
  const containerRef = useScrollReveal()

  // Note: Portals section reserved for future additions once tested live on portals

  return (
    <div ref={containerRef}>
      {/* ── Hero Section ── */}
      <section className="hero js-scroll-reveal">
        <div className="hero-pill-tag">
          <span className="pill-badge primary">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />
            FormAnchor v1.0.0 — Chrome MV3 Ready
          </span>
        </div>

        <h1>
          <span className="gradient-text">Record once,</span>
          <br />
          run every row.
        </h1>

        <p className="hero-subtitle">
          Automate hundreds of multi-page government and banking forms from Excel — 
          100% locally in your browser with self-healing selectors and per-row crash recovery.
        </p>

        <div className="hero-actions">
          <a href="#/install" className="btn btn-primary btn-lg">
            Install Extension — 100 Free Rows
            <Icon name="arrow_forward" size={18} />
          </a>
          <a href="#/pricing" className="btn btn-outline btn-lg">
            <Icon name="payments" size={18} />
            View Pricing & ROI
          </a>
        </div>

        <div className="hero-badges-row">
          <span className="hero-stat-pill">
            <Icon name="lock" size={14} /> 100% Local Sandbox (AES-256)
          </span>
          <span className="hero-stat-pill">
            <Icon name="verified_user" size={14} /> 8-Tier Fallback Selectors
          </span>
          <span className="hero-stat-pill">
            <Icon name="redeem" size={14} /> 100 Free Rows Forever
          </span>
        </div>
      </section>

      {/* ── Signature Row Ledger Console Preview ── */}
      <section className="container js-scroll-reveal" style={{ marginBottom: 60, maxWidth: 840 }}>
        <RowLedgerConsole />
      </section>

      {/* ── Demo Video Showcase ── */}
      <section className="container js-scroll-reveal" style={{ marginBottom: 80, maxWidth: 840 }}>
        <div className="demo-showcase">
          <div className="demo-chrome">
            <div className="ledger-dots">
              <div className="ledger-dot red" />
              <div className="ledger-dot yellow" />
              <div className="ledger-dot green" />
            </div>
            <div className="demo-url-bar">
              <Icon name="lock" size={12} />
              <span>chrome-extension://formanchor/autofill-demo</span>
            </div>
            <span className="ledger-status">
              <span className="status-dot" />
              Live Recorded Execution
            </span>
          </div>
          <video
            src={autofillVideo}
            autoPlay loop muted playsInline
            className="demo-video"
          />
        </div>
      </section>

      {/* ── 3-Step Pipeline ── */}
      <section className="section">
        <div className="container">
          <div className="section-header js-scroll-reveal">
            <span className="pill-badge primary">
              <Icon name="play_circle" size={14} /> 3-Step Pipeline
            </span>
            <h2>Three steps. Zero manual data entry.</h2>
            <p>From one-time form recording to hundreds of verified submissions in minutes.</p>
          </div>

          <div className="pipeline-grid">
            <div className="pipeline-card glass-card js-scroll-reveal">
              <div className="pipeline-step-badge">Step 01</div>
              <div className="pipeline-icon-circle">
                <Icon name="radio_button_checked" size={26} />
              </div>
              <h3>Record Once</h3>
              <p>
                Click through your form naturally. FormAnchor records inputs, multi-page navigations,
                custom dropdowns, and datepickers with 8-strategy self-healing selectors.
              </p>
            </div>

            <div className="pipeline-card glass-card js-scroll-reveal">
              <div className="pipeline-step-badge">Step 02</div>
              <div className="pipeline-icon-circle" style={{ background: 'var(--teal-subtle)', color: 'var(--accent-teal)', borderColor: 'rgba(6, 182, 212, 0.3)' }}>
                <Icon name="upload_file" size={26} />
              </div>
              <h3>Load Excel Spreadsheet</h3>
              <p>
                Upload any <code style={{ color: 'var(--accent-teal)' }}>.xlsx</code> or <code style={{ color: 'var(--accent-teal)' }}>.csv</code> file.
                FormAnchor automatically maps columns to form fields with intelligent fuzzy header detection.
              </p>
            </div>

            <div className="pipeline-card glass-card js-scroll-reveal">
              <div className="pipeline-step-badge">Step 03</div>
              <div className="pipeline-icon-circle" style={{ background: 'var(--emerald-subtle)', color: 'var(--accent-emerald)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                <Icon name="play_arrow" size={26} />
              </div>
              <h3>Execute & Auto-Recover</h3>
              <p>
                Hit Run. FormAnchor fills row by row, waits for page transitions, checks submission confirmations,
                and checkpoints progress so you can resume anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Engine Features Grid ── */}
      <section className="section">
        <div className="container">
          <div className="section-header js-scroll-reveal">
            <span className="pill-badge teal">
              <Icon name="precision_manufacturing" size={14} /> Production Engine
            </span>
            <h2>Engineered for complex, real-world portals.</h2>
            <p>FormAnchor handles the dynamic DOM challenges where generic autofill tools fail.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card glass-card js-scroll-reveal">
              <div className="feature-icon-box">
                <Icon name="bolt" size={22} />
              </div>
              <h3>SmartWait Navigation</h3>
              <p>
                Intelligently waits for slow government portals, multi-page redirects, and SPA asynchronous
                rendering before executing subsequent actions.
              </p>
            </div>

            <div className="feature-card glass-card js-scroll-reveal">
              <div className="feature-icon-box">
                <Icon name="hub" size={22} />
              </div>
              <h3>8-Strategy Self-Healing</h3>
              <p>
                Deep DOM traversal with Shadow DOM piercing, fuzzy label matching, aria attributes,
                and proximity scoring that survives portal layout updates.
              </p>
            </div>

            <div className="feature-card glass-card js-scroll-reveal">
              <div className="feature-icon-box">
                <Icon name="calendar_month" size={22} />
              </div>
              <h3>Virtual Selects & Calendars</h3>
              <p>
                Custom adapters for Ant Design, Select2, Choices.js, and React Multi-DatePicker
                widgets without requiring brittle pixel coordinates.
              </p>
            </div>

            <div className="feature-card glass-card js-scroll-reveal">
              <div className="feature-icon-box">
                <Icon name="history" size={22} />
              </div>
              <h3>Per-Row AutoResume</h3>
              <p>
                Crashed tab or connection drop? FormAnchor saves per-row checkpoints in IndexedDB
                and seamlessly resumes right where you left off.
              </p>
            </div>

            <div className="feature-card glass-card js-scroll-reveal">
              <div className="feature-icon-box">
                <Icon name="lock" size={22} />
              </div>
              <h3>100% Local Sandbox</h3>
              <p>
                Spreadsheet data and recording configurations are AES-256 encrypted in IndexedDB.
                Zero form data ever leaves your computer.
              </p>
            </div>

            <div className="feature-card glass-card js-scroll-reveal">
              <div className="feature-icon-box">
                <Icon name="notifications_active" size={22} />
              </div>
              <h3>CAPTCHA-Aware Execution</h3>
              <p>
                Automatically detects CAPTCHA prompts, pauses execution, sounds a notification,
                and resumes automatically after you solve it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Supported Portals & Frameworks (Reserved for future live additions) ── */}

      {/* ── Pricing Preview ── */}
      <section className="section">
        <div className="container">
          <div className="section-header js-scroll-reveal">
            <span className="pill-badge primary">
              <Icon name="payments" size={14} /> Transparent Pricing
            </span>
            <h2>One-time credit packs. No subscriptions.</h2>
            <p>Start free with 100 rows. Buy more only when you need them. Credits never expire.</p>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card glass-card js-scroll-reveal">
              <div>
                <span className="pill-badge">Starter</span>
                <h3 style={{ marginTop: 12 }}>Free Community</h3>
                <div className="pricing-price">
                  ₹0 <span>/ forever</span>
                </div>
                <p style={{ fontSize: '0.88rem' }}>Perfect for testing FormAnchor on your portal workflows.</p>
                <ul className="pricing-features">
                  <li className="pricing-feature-item included">
                    <Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /> 100 Free Rows included
                  </li>
                  <li className="pricing-feature-item included">
                    <Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /> Full 8-tier selector engine
                  </li>
                  <li className="pricing-feature-item included">
                    <Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /> Local IndexedDB AES-256 storage
                  </li>
                  <li className="pricing-feature-item included">
                    <Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /> Unlimited spreadsheet uploads
                  </li>
                </ul>
              </div>
              <a href="#/install" className="btn btn-outline btn-block">Get Started Free</a>
            </div>

            <div className="pricing-card glass-card featured js-scroll-reveal">
              <span className="pill-badge primary pricing-badge-popular">
                <Icon name="star" size={12} /> Most Popular
              </span>
              <div>
                <span className="pill-badge primary">High Volume</span>
                <h3 style={{ marginTop: 12 }}>FormAnchor Go</h3>
                <div className="pricing-price">
                  ₹250 <span>/ one-time</span>
                </div>
                <p style={{ fontSize: '0.88rem' }}>Ideal for CSC operators and high-volume data entry tasks.</p>
                <ul className="pricing-features">
                  <li className="pricing-feature-item included">
                    <Icon name="check" size={16} style={{ color: 'var(--primary)' }} /> <strong>700 Rows included</strong> (~₹0.35/row)
                  </li>
                  <li className="pricing-feature-item included">
                    <Icon name="check" size={16} style={{ color: 'var(--primary)' }} /> Credits never expire
                  </li>
                  <li className="pricing-feature-item included">
                    <Icon name="check" size={16} style={{ color: 'var(--primary)' }} /> All Dynamic UI adapters (RMDP, AntD)
                  </li>
                  <li className="pricing-feature-item included">
                    <Icon name="check" size={16} style={{ color: 'var(--primary)' }} /> AutoResume crash checkpoints
                  </li>
                </ul>
              </div>
              <a href="#/pricing" className="btn btn-primary btn-block">View Pack Details</a>
            </div>

            <div className="pricing-card glass-card js-scroll-reveal">
              <div>
                <span className="pill-badge emerald">Best Value</span>
                <h3 style={{ marginTop: 12 }}>FormAnchor Pro</h3>
                <div className="pricing-price">
                  ₹500 <span>/ one-time</span>
                </div>
                <p style={{ fontSize: '0.88rem' }}>For enterprise operators and agencies filling thousands of rows.</p>
                <ul className="pricing-features">
                  <li className="pricing-feature-item included">
                    <Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /> <strong>1,500 Rows included</strong> (~₹0.33/row)
                  </li>
                  <li className="pricing-feature-item included">
                    <Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /> Lowest per-row cost
                  </li>
                  <li className="pricing-feature-item included">
                    <Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /> Priority portal adapter support
                  </li>
                  <li className="pricing-feature-item included">
                    <Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /> All Pro engine capabilities
                  </li>
                </ul>
              </div>
              <a href="#/pricing" className="btn btn-outline btn-block">View Pack Details</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mini FAQ Preview ── */}
      <section className="section">
        <div className="container">
          <div className="section-header js-scroll-reveal">
            <h2>Frequently Asked Questions</h2>
            <p>Clear answers about how FormAnchor operates.</p>
          </div>

          <div className="faq-list">
            {PREVIEW_FAQS.map((faq, i) => (
              <FaqPreviewItem key={i} q={faq.q} a={faq.a} defaultOpen={i === 0} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <a href="#/faq" className="btn btn-outline">
              View Full FAQ & Help Center <Icon name="arrow_forward" size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

function FaqPreviewItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <Icon name={open ? 'expand_less' : 'expand_more'} size={20} style={{ color: 'var(--primary)' }} />
      </button>
      {open && (
        <div className="faq-answer">
          {a}
        </div>
      )}
    </div>
  )
}
