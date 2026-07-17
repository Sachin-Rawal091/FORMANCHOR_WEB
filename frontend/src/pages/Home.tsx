import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'

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
          and Get More Done Together
        </h1>
        <p className="hero-subtitle">
          Record your workflows once, map data from Excel or CSV, and let FormPilot
          execute tedious data entry tasks with pinpoint accuracy across your entire team.
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

      {/* ── Product Showcase Mockup ── */}
      <section className="fade-in-section" style={{ marginBottom: 128 }}>
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
              <div className="mock-url-bar">chrome-extension://formpilot/dashboard</div>
            </div>
            {/* Fake panels */}
            <div className="mock-panels">
              <div className="mock-sidebar glass-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div className="mock-menu-item active" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'rgba(91, 140, 255, 0.12)', border: '1px solid rgba(91, 140, 255, 0.2)', color: 'var(--primary)', fontSize: 12, fontWeight: 600 }}>
                  <Icon name="dashboard" size={16} />
                  Dashboard
                </div>
                <div className="mock-menu-item" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', fontSize: 12 }}>
                  <Icon name="table_chart" size={16} />
                  Excel Data
                </div>
                <div className="mock-menu-item" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', fontSize: 12 }}>
                  <Icon name="history" size={16} />
                  Execution Logs
                </div>
                <div className="mock-menu-item" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', fontSize: 12 }}>
                  <Icon name="settings" size={16} />
                  Settings
                </div>
              </div>
              <div className="mock-main glass-card" style={{ display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Saved Workflows</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--primary)', color: '#fff', padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                    <Icon name="add" size={14} />
                    Record New
                  </div>
                </div>
                <div style={{ flex: 1, border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.1)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 180px 100px 1fr', padding: '10px 16px', fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', alignItems: 'center', height: 36, borderBottom: '1px solid var(--border-glass)' }}>
                    <div>Status</div>
                    <div>Workflow</div>
                    <div>Source</div>
                    <div>Last Run</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '80px 180px 100px 1fr', padding: '10px 16px', fontSize: 11, alignItems: 'center', borderBottom: '1px solid var(--border-glass)', background: 'rgba(255,255,255,0.01)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--success)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} />
                        Active
                      </div>
                      <div style={{ fontWeight: 600 }}>KRP Loan Registration</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: 10 }}>krp_data.xlsx</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: 10 }}>10m ago (Success)</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '80px 180px 100px 1fr', padding: '10px 16px', fontSize: 11, alignItems: 'center', borderBottom: '1px solid var(--border-glass)', background: 'rgba(255,255,255,0.01)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--success)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} />
                        Active
                      </div>
                      <div style={{ fontWeight: 600 }}>Job Applicant Flow</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: 10 }}>candidates.xlsx</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: 10 }}>2h ago (Success)</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '80px 180px 100px 1fr', padding: '10px 16px', fontSize: 11, alignItems: 'center', background: 'rgba(255,255,255,0.01)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', display: 'inline-block' }} />
                        Idle
                      </div>
                      <div style={{ fontWeight: 600 }}>Scholarship Portal</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: 10 }}>students.xlsx</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: 10 }}>2d ago</div>
                    </div>
                  </div>
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
            <h3>Boost Team Productivity</h3>
            <p>
              Automate repetitive form-filling tasks across your entire organization,
              saving thousands of hours and reducing human error to zero.
            </p>
          </div>
          <div className="feature-card glass-card">
            <div className="feature-icon violet">
              <Icon name="folder_shared" />
            </div>
            <h3>Effortless Document Sharing</h3>
            <p>
              Share recorded flows and mapped datasets securely with team members,
              ensuring consistent data entry standards company-wide.
            </p>
          </div>
          <div className="feature-card glass-card">
            <div className="feature-icon green">
              <Icon name="verified_user" />
            </div>
            <h3>Enhanced Team Accountability</h3>
            <p>
              Track execution logs, monitor success rates, and maintain a clear
              audit trail of every automated submission for compliance.
            </p>
          </div>
        </div>
      </section>

      {/* ── Collaboration Section ── */}
      <section className="section fade-in-section">
        <div className="section-header">
          <h2>
            Work Smarter <span className="gradient-text">Together</span>
          </h2>
        </div>

        {/* Row 1: Text left, Visual right */}
        <div className="collab-row">
          <div className="collab-content">
            <div className="collab-badge blue">
              <Icon name="group" size={14} />
              Collaboration
            </div>
            <h3>Real-Time Collaborative Task Management</h3>
            <p>
              Assign specific forms, datasets, or execution flows to individual team members.
              Track progress in real-time and resolve mapping conflicts collaboratively within the dashboard.
            </p>
            <ul className="collab-list">
              <li>
                <Icon name="check_circle" size={18} className="icon" />
                Role-based access control
              </li>
              <li>
                <Icon name="check_circle" size={18} className="icon" />
                Shared template libraries
              </li>
            </ul>
          </div>
          <div className="collab-visual">
            <div className="glass-card collab-card blue-glow">
              <div className="collab-card-row">
                <div className="collab-avatar">JD</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>John Doe</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.2 }}>Data Operator</div>
                </div>
                <span className="collab-status active">Active</span>
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
              Monitoring
            </div>
            <h3>Customizable Notifications and Alerts</h3>
            <p>
              Stay informed when critical form submissions complete or if mapping errors occur.
              Configure alerts via email, Slack, or in-app notifications based on specific triggers.
            </p>
            <a href="#/about" className="explore-link">
              Explore integrations
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
                  <h4>Batch Submission Complete</h4>
                  <p>Q3 Tax forms (142 records) processed successfully.</p>
                  <span className="alert-time">Just now</span>
                </div>
              </div>
              <div className="alert-item">
                <div className="alert-icon error">
                  <Icon name="error" size={16} />
                </div>
                <div>
                  <h4>Mapping Error Detected</h4>
                  <p>Field 'Company ID' missing in row 42 of client_data.csv.</p>
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
