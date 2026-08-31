import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'
import { SUPPORT_EMAIL } from '../constants'

const TABS = [
  { id: 'quickstart', label: 'Quickstart Guide', icon: 'rocket_launch', keywords: 'quickstart install pin setup 5-minute recording run' },
  { id: 'recording', label: 'Recording Flows', icon: 'radio_button_checked', keywords: 'record recording red button step sequence click input select submit' },
  { id: 'excel', label: 'Excel & CSV Setup', icon: 'table_chart', keywords: 'excel csv sheetjs column mapping headers serial dates values' },
  { id: 'adapters', label: 'Dynamic UI Adapters', icon: 'widgets', keywords: 'adapters rmdp antd material select2 datepicker dropdown dynamic shadow dom' },
  { id: 'resume', label: 'AutoResume & Recovery', icon: 'history', keywords: 'resume autoresume crash recovery indexeddb session timeout offline error checkpoint' },
  { id: 'troubleshoot', label: 'Troubleshooting', icon: 'build', keywords: 'troubleshoot fix problem error failed slow portal delay slider timeout' },
]

export default function Docs() {
  const containerRef = useScrollReveal()
  const [activeTab, setActiveTab] = useState('quickstart')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTabs = TABS.filter(tab => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase().trim()
    return tab.label.toLowerCase().includes(q) || tab.keywords.includes(q)
  })

  return (
    <div ref={containerRef}>
      {/* ── Page Hero ── */}
      <section className="hero js-scroll-reveal">
        <div className="hero-pill-tag">
          <span className="pill-badge primary">
            <Icon name="menu_book" size={14} /> Help & Documentation
          </span>
        </div>
        <h1>
          Master FormAnchor <br />
          <span className="gradient-text">Automation Guides</span>
        </h1>
        <p className="hero-subtitle">
          Everything you need to record complex forms, format Excel spreadsheets,
          and run reliable unattended batch submissions.
        </p>

        {/* Quick Finder Search Bar */}
        <div 
          style={{ 
            width: '100%', 
            maxWidth: 600, 
            display: 'flex', 
            alignItems: 'center', 
            background: 'var(--glass-bg)', 
            border: '1px solid var(--primary-border)', 
            borderRadius: 'var(--radius-full)', 
            padding: '8px 20px',
            boxShadow: 'var(--primary-glow)',
            backdropFilter: 'var(--glass-blur)'
          }}
        >
          <Icon name="search" size={20} style={{ color: 'var(--primary)', marginRight: 12 }} />
          <input 
            type="text"
            placeholder="Search guides (e.g., datepickers, column mapping, resume)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-family)',
              fontSize: '0.95rem'
            }}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <Icon name="close" size={18} />
            </button>
          )}
        </div>
      </section>

      {/* ── Documentation Tabs & Main Guide Container ── */}
      <section className="container js-scroll-reveal" style={{ maxWidth: 960, marginBottom: 80 }}>
        {/* Horizontal Pill Tabs */}
        <div 
          style={{ 
            display: 'flex', 
            gap: 8, 
            overflowX: 'auto', 
            paddingBottom: 16, 
            marginBottom: 32,
            scrollbarWidth: 'none'
          }}
        >
          {filteredTabs.length > 0 ? (
            filteredTabs.map(tab => (
              <button
                key={tab.id}
                className={`pill-badge ${activeTab === tab.id ? 'primary active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                style={{ 
                  padding: '10px 18px', 
                  fontSize: '0.88rem', 
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all var(--duration) var(--ease)'
                }}
              >
                <Icon name={tab.icon} size={16} />
                {tab.label}
              </button>
            ))
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '8px 0' }}>
              No guides match "{searchQuery}". Try searching for <em>datepickers</em>, <em>excel</em>, or <em>resume</em>.
            </div>
          )}
        </div>

        {/* Tab Content Display */}
        <div className="glass-card" style={{ padding: '36px 40px' }}>
          {activeTab === 'quickstart' && <QuickstartTab />}
          {activeTab === 'recording' && <RecordingTab />}
          {activeTab === 'excel' && <ExcelTab />}
          {activeTab === 'adapters' && <AdaptersTab />}
          {activeTab === 'resume' && <ResumeTab />}
          {activeTab === 'troubleshoot' && <TroubleshootTab />}
        </div>
      </section>

      {/* ── Bottom Support Card ── */}
      <section className="container js-scroll-reveal" style={{ maxWidth: 960, marginBottom: 80 }}>
        <div 
          className="glass-card glow-primary"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
            padding: 32
          }}
        >
          <div>
            <h3>Still have questions or need custom portal help?</h3>
            <p style={{ marginTop: 6, fontSize: '0.92rem' }}>
              We assist CSC operators and enterprise teams in building custom adapters for specialized portals.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="btn btn-primary">
              <Icon name="mail" size={16} /> Email Support
            </a>
            <a href="https://github.com/Sachin-Rawal091/FORMANCHOR/issues" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <Icon name="bug_report" size={16} /> GitHub Issues
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

function QuickstartTab() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span className="pill-badge primary">5-Minute Walkthrough</span>
      </div>
      <h2>Getting Started with FormAnchor</h2>
      <p style={{ marginTop: 8, marginBottom: 28 }}>
        FormAnchor is a Google Chrome Manifest V3 extension that automates repetitive web forms from your spreadsheet.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <div className="pipeline-icon-circle" style={{ width: 40, height: 40, flexShrink: 0 }}>
            1
          </div>
          <div>
            <h4>1. Install and Pin the Extension</h4>
            <p style={{ fontSize: '0.92rem', marginTop: 4 }}>
              Follow our <a href="#/install" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Install Guide</a> to add FormAnchor to Chrome. Pin the extension to your browser toolbar for easy 1-click access.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <div className="pipeline-icon-circle" style={{ width: 40, height: 40, flexShrink: 0 }}>
            2
          </div>
          <div>
            <h4>2. Record Your First Workflow</h4>
            <p style={{ fontSize: '0.92rem', marginTop: 4 }}>
              Navigate to the target portal form. Open the FormAnchor popup, click <strong>Start Recording</strong>, and fill the form out once. FormAnchor captures input IDs, dynamic selectors, dropdowns, and button clicks.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <div className="pipeline-icon-circle" style={{ width: 40, height: 40, flexShrink: 0 }}>
            3
          </div>
          <div>
            <h4>3. Load Your Excel Spreadsheet</h4>
            <p style={{ fontSize: '0.92rem', marginTop: 4 }}>
              Upload your <code style={{ color: 'var(--primary)' }}>.xlsx</code> or <code style={{ color: 'var(--primary)' }}>.csv</code> data file. FormAnchor auto-maps column headers to recorded form inputs.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <div className="pipeline-icon-circle" style={{ width: 40, height: 40, flexShrink: 0 }}>
            4
          </div>
          <div>
            <h4>4. Execute & Monitor Row-by-Row</h4>
            <p style={{ fontSize: '0.92rem', marginTop: 4 }}>
              Click <strong>Start Execution</strong>. Watch FormAnchor fill each record with SmartWait timing and self-healing resilience.
            </p>
          </div>
        </div>
      </div>

      <div 
        style={{
          marginTop: 32,
          padding: '16px 20px',
          background: 'var(--primary-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.88rem'
        }}
      >
        <strong style={{ color: 'var(--primary)' }}>Pro Tip:</strong> Your first 100 successful rows are included free. Credits are only deducted when a submission is successfully completed.
      </div>
    </div>
  )
}

function RecordingTab() {
  return (
    <div>
      <span className="pill-badge teal" style={{ marginBottom: 16 }}>Selector Engine</span>
      <h2>Recording Best Practices</h2>
      <p style={{ marginTop: 8, marginBottom: 24 }}>
        FormAnchor captures an 8-strategy selector snapshot for every form field to survive website updates.
      </p>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <li style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Icon name="check_circle" size={18} style={{ color: 'var(--accent-emerald)', marginTop: 2 }} />
          <div>
            <strong>Fill Every Field During Recording:</strong> FormAnchor records exact interaction steps. Make sure to interact with every dropdown, checkbox, and text field you need populated.
          </div>
        </li>
        <li style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Icon name="check_circle" size={18} style={{ color: 'var(--accent-emerald)', marginTop: 2 }} />
          <div>
            <strong>Record Multi-Page Navigation End-to-End:</strong> If a portal has "Next Step" or "Save & Continue" buttons, click through all pages until the final submit button.
          </div>
        </li>
        <li style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Icon name="check_circle" size={18} style={{ color: 'var(--accent-emerald)', marginTop: 2 }} />
          <div>
            <strong>Allow Dynamic Elements to Load:</strong> When selecting dropdowns that fetch asynchronous options, wait for the options to render before clicking.
          </div>
        </li>
      </ul>
    </div>
  )
}

function ExcelTab() {
  return (
    <div>
      <span className="pill-badge emerald" style={{ marginBottom: 16 }}>Data Ingestion</span>
      <h2>Excel & CSV Formatting</h2>
      <p style={{ marginTop: 8, marginBottom: 24 }}>
        FormAnchor uses SheetJS with 50-row chunking to parse large spreadsheets without freezing your browser tab.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="code-block">
          <code>Name | AadharNumber | Mobile | SchemeType | BankAccount | IFSC</code>
        </div>
        <p style={{ fontSize: '0.92rem' }}>
          Keep the first row as column header titles. Header names that closely match field labels will be automatically mapped with 1-click auto-detect.
        </p>
      </div>
    </div>
  )
}

function AdaptersTab() {
  return (
    <div>
      <span className="pill-badge primary" style={{ marginBottom: 16 }}>Complex Frameworks</span>
      <h2>Dynamic UI & Component Adapters</h2>
      <p style={{ marginTop: 8, marginBottom: 24 }}>
        Modern portals built on React, Vue, or Angular often use custom dropdowns and calendars that ignore standard HTML input events. FormAnchor includes native adapters for:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <div style={{ padding: 16, background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
          <strong>Ant Design (Select & Date)</strong>
          <p style={{ fontSize: '0.82rem', marginTop: 6, color: 'var(--text-secondary)' }}>Virtual scroll list matching & portal click events.</p>
        </div>
        <div style={{ padding: 16, background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
          <strong>Select2 & Choices.js</strong>
          <p style={{ fontSize: '0.82rem', marginTop: 6, color: 'var(--text-secondary)' }}>Searchable select triggers & option indexing.</p>
        </div>
        <div style={{ padding: 16, background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
          <strong>React Multi-DatePicker (RMDP)</strong>
          <p style={{ fontSize: '0.82rem', marginTop: 6, color: 'var(--text-secondary)' }}>Calendar month/year switching & day selection.</p>
        </div>
      </div>
    </div>
  )
}

function ResumeTab() {
  return (
    <div>
      <span className="pill-badge amber" style={{ marginBottom: 16 }}>Fault Tolerance</span>
      <h2>AutoResume & Crash Recovery</h2>
      <p style={{ marginTop: 8, marginBottom: 20 }}>
        Government portals frequently experience session timeouts and network errors. FormAnchor's <code style={{ color: 'var(--accent-amber)' }}>AutoResumeManager</code> writes execution state to IndexedDB after every single completed row.
      </p>
      <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
        If your browser tab closes or crashes, reopening FormAnchor will prompt you to resume the batch from the exact unsubmitted row index without re-running completed rows.
      </p>
    </div>
  )
}

function TroubleshootTab() {
  return (
    <div>
      <span className="pill-badge" style={{ marginBottom: 16 }}>Self-Help</span>
      <h2>Troubleshooting Common Issues</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
        <div style={{ padding: 16, background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)' }}>
          <strong>Field was not filled during execution:</strong>
          <p style={{ fontSize: '0.88rem', marginTop: 4, color: 'var(--text-secondary)' }}>
            Check if the column name in Excel is mapped to the field in the mapping modal. You can also re-record the specific step to refresh selector fallbacks.
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)' }}>
          <strong>Slow portal load causes step timeout:</strong>
          <p style={{ fontSize: '0.88rem', marginTop: 4, color: 'var(--text-secondary)' }}>
            Increase the step delay slider in FormAnchor Settings (e.g. from 500ms to 1200ms) to accommodate slow server responses.
          </p>
        </div>
      </div>
    </div>
  )
}
