import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'
import autofillVideo from '../assets/autofill_demo.mp4'

export default function Home() {
  const containerRef = useScrollReveal()

  return (
    <div ref={containerRef}>
      {/* ── Hero Section ── */}
      <section className="hero fade-in-section">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          <span className="hero-badge-text">Automated Form Filling</span>
        </div>
        <h1>
          <span className="gradient-text">Automate Form Filling</span>
          <br />
          and Get More Done at Scale
        </h1>
        <p className="hero-subtitle">
          Record your workflow once, map data from Excel or CSV, and let FormAnchor
          push it through hundreds of government-grade, multi-page forms — accurately,
          and entirely on your machine.
        </p>
        <div className="hero-ctas">
          <a href="#/install" className="btn btn-primary">
            Get Started for Free
            <Icon name="arrow_forward" size={16} />
          </a>
          <a href="#/about" className="btn btn-ghost">
            <Icon name="play_circle" size={16} />
            Watch Demo
          </a>
        </div>
      </section>

      {/* ── Product Showcase Demo ── */}
      <section className="fade-in-section" style={{ marginBottom: 128, padding: '0 16px' }}>
        <div className="product-showcase">
          <div className="product-showcase-gradient" />
          <div className="product-showcase-inner">
            {/* Fake browser chrome */}
            <div className="mock-browser-bar">
              <div className="mock-dots">
                <div className="mock-dot red" />
                <div className="mock-dot yellow" />
                <div className="mock-dot green" />
              </div>
              <div className="mock-url-bar">
                <Icon name="lock" size={12} style={{ opacity: 0.7 }} />
                <span>chrome-extension://formanchor/autofill-demo</span>
              </div>
              <div className="mock-badge">
                <span className="live-dot" />
                Autofill Live Demo
              </div>
            </div>
            {/* Live Recording Video Showcase */}
            <div className="showcase-video-wrapper">
              <video
                src={autofillVideo}
                autoPlay
                loop
                muted
                playsInline
                className="showcase-video"
              />
              <div className="showcase-video-overlay">
                <div className="showcase-status-tag">
                  <Icon name="bolt" size={14} style={{ color: '#60a5fa' }} />
                  <strong style={{ color: '#60a5fa', fontWeight: 600 }}>FormAnchor Engine Active</strong> — KRP Multi-Step Registration
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar (Commented out until trusted companies are added) ── */}
      {/*
      <section className="trust-bar fade-in-section">
        <div className="container">
          <p>Trusted by over 40,000 teams and companies worldwide</p>
          <div className="trust-logos">
            <span className="trust-logo">StellarTech</span>
            <span className="trust-logo">CascadeStyle</span>
            <span className="trust-logo">Braincraze</span>
            <span className="trust-logo">StackFlow</span>
            <span className="trust-logo">Biomark</span>
          </div>
        </div>
      </section>
      */}

      {/* ── Features Grid ── */}
      <section className="section fade-in-section">
        <div className="section-header">
          <h2>
            Empower Your Workflow with{' '}
            <span className="text-primary">Seamless Automation</span>
          </h2>
          <p>Stop manual data entry. Start focusing on what matters.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card glass-card">
            <div className="feature-icon blue">
              <Icon name="bolt" />
            </div>
            <h3>Self-Healing Selectors</h3>
            <p>
              An 8-strategy fallback pipeline with Shadow DOM piercing means a single DOM tweak on the target site doesn't break your whole run.
            </p>
          </div>
          <div className="feature-card glass-card">
            <div className="feature-icon violet">
              <Icon name="lock" />
            </div>
            <h3>100% Local & Encrypted</h3>
            <p>
              Every recording and spreadsheet row is AES-256 encrypted at rest in your browser's IndexedDB. Nothing is ever transmitted anywhere.
            </p>
          </div>
          <div className="feature-card glass-card">
            <div className="feature-icon green">
              <Icon name="history" />
            </div>
            <h3>Resumable Multi-Page Flows</h3>
            <p>
              If a run stalls or a tab closes mid-flow, FormAnchor's State Manager resumes from the last confirmed step instead of starting over.
            </p>
          </div>
        </div>
      </section>

      {/* ── Built for Reliability Section ── */}
      <section className="section fade-in-section">
        <div className="section-header">
          <h2>
            Built for <span className="gradient-text">Reliability</span>
          </h2>
        </div>

        {/* Row 1: Text left, Visual right */}
        <div className="collab-row">
          <div className="collab-content">
            <div className="collab-badge blue">
              <Icon name="auto_stories" size={14} />
              Workflows
            </div>
            <h3>Recordings You Can Reuse</h3>
            <p>
              Record a form sequence once and save it locally as a named workflow.
              Switch seamlessly between different form templates without re-recording.
            </p>
            <ul className="collab-list">
              <li>
                <Icon name="check_circle" size={18} className="icon" />
                Local workflow switcher & step editor
              </li>
              <li>
                <Icon name="check_circle" size={18} className="icon" />
                Automatic element & selector deduplication
              </li>
            </ul>
          </div>
          <div className="collab-visual">
            <div className="glass-card collab-card blue-glow">
              <div className="collab-card-row">
                <div className="collab-avatar">FA</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>Local Operator</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.2 }}>Offline Sandbox</div>
                </div>
                <span className="collab-status active">Ready</span>
              </div>
              <div className="collab-item">
                <Icon name="description" size={18} style={{ color: 'var(--primary)' }} />
                <span style={{ fontSize: 12, flex: 1, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>krp_registration_flow.json</span>
                <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', background: 'rgba(91, 140, 255, 0.12)', color: 'var(--primary)', padding: '2px 8px', borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap' }}>Workflow</span>
              </div>
              <div className="collab-item" style={{ marginBottom: 0 }}>
                <Icon name="table_chart" size={18} style={{ color: 'var(--success)' }} />
                <span style={{ fontSize: 12, flex: 1, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>krp_applicants.xlsx</span>
                <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--success)', padding: '2px 8px', borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap' }}>Excel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Visual left, Text right (reversed) */}
        <div className="collab-row reverse">
          <div className="collab-content">
            <div className="collab-badge violet">
              <Icon name="notifications_active" size={14} />
              Resilience
            </div>
            <h3>CAPTCHA-Aware Execution</h3>
            <p>
              When a CAPTCHA or bot challenge is detected, execution pauses automatically and fires a Chrome desktop notification.
              Solve the challenge manually and resume execution with one click.
            </p>
            <a href="#/security" className="explore-link">
              View Security Policy
              <Icon name="arrow_forward" size={16} />
            </a>
          </div>
          <div className="collab-visual">
            <div className="glass-card collab-card violet-glow">
              <div className="alert-item">
                <div className="alert-icon success">
                  <Icon name="done_all" size={16} />
                </div>
                <div>
                  <h4>Execution Checkpoint Saved</h4>
                  <p>Row 42 of 100 state snapshot persisted to IndexedDB.</p>
                  <span className="alert-time">Just now</span>
                </div>
              </div>
              <div className="alert-item">
                <div className="alert-icon error">
                  <Icon name="error" size={16} />
                </div>
                <div>
                  <h4>CAPTCHA Challenge Paused</h4>
                  <p>Solve reCAPTCHA in active tab to resume automation loop.</p>
                  <span className="alert-time">2 mins ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
