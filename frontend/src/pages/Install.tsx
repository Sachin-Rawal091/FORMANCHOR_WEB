import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'

export default function Install() {
  const containerRef = useScrollReveal()
  const [copied, setCopied] = useState(false)

  const copyExtensionsUrl = () => {
    navigator.clipboard.writeText('chrome://extensions')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div ref={containerRef}>
      {/* ── Page Hero ── */}
      <section className="hero js-scroll-reveal">
        <div className="hero-pill-tag">
          <span className="pill-badge primary">
            <Icon name="download" size={14} /> Installation Guide
          </span>
        </div>
        <h1>
          Install FormAnchor <br />
          <span className="gradient-text">In Under 2 Minutes</span>
        </h1>
        <p className="hero-subtitle">
          Follow this step-by-step walkthrough to load the verified developer build
          or install directly from the Chrome Web Store.
        </p>
      </section>

      {/* ── Chrome Web Store Status Card ── */}
      <section className="container js-scroll-reveal" style={{ maxWidth: 860, marginBottom: 48 }}>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div className="pipeline-icon-circle" style={{ width: 50, height: 50, flexShrink: 0 }}>
            <Icon name="verified_user" size={24} />
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h4>Chrome Web Store Official Listing</h4>
              <span className="pill-badge primary" style={{ fontSize: '0.75rem' }}>Coming Soon</span>
            </div>
            <p style={{ fontSize: '0.88rem', marginTop: 4 }}>
              The packaged store version is currently under final review. You can install the verified developer build immediately below.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5-Step Vertical Timeline ── */}
      <section className="container js-scroll-reveal" style={{ maxWidth: 860, marginBottom: 80 }}>
        <div className="section-header">
          <h2>Step-by-Step Installation</h2>
          <p>Works on Google Chrome, Microsoft Edge, Brave, and all Chromium browsers.</p>
        </div>

        <div className="timeline">
          {/* Step 1 */}
          <div className="timeline-step">
            <div className="timeline-number">1</div>
            <div className="timeline-content glass-card">
              <h3>Download FormAnchor Release (.zip)</h3>
              <p style={{ marginTop: 6, fontSize: '0.92rem' }}>
                Download the production-ready build archive from our GitHub releases page.
              </p>
              <div style={{ marginTop: 14 }}>
                <a
                  href="https://github.com/Sachin-Rawal091/FORMANCHOR/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <Icon name="download" size={16} />
                  Download formanchor-release.zip
                </a>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="timeline-step">
            <div className="timeline-number">2</div>
            <div className="timeline-content glass-card">
              <h3>Extract the Archive</h3>
              <p style={{ marginTop: 6, fontSize: '0.92rem' }}>
                Right-click the downloaded <code style={{ color: 'var(--primary)' }}>formanchor-release.zip</code> file and click <strong>Extract All...</strong> to a dedicated folder on your disk (e.g. <code>C:\Extensions\FormAnchor</code>).
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="timeline-step">
            <div className="timeline-number">3</div>
            <div className="timeline-content glass-card">
              <h3>Open Chrome Extensions Manager</h3>
              <p style={{ marginTop: 6, fontSize: '0.92rem' }}>
                Open a new browser tab and navigate to Chrome's extension manager, or copy the URL below:
              </p>
              <div className="code-block" style={{ marginTop: 12 }}>
                <code>chrome://extensions</code>
                <button className="copy-btn" onClick={copyExtensionsUrl}>
                  <Icon name={copied ? 'check' : 'content_copy'} size={14} />
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="timeline-step">
            <div className="timeline-number">4</div>
            <div className="timeline-content glass-card">
              <h3>Enable "Developer mode"</h3>
              <p style={{ marginTop: 6, fontSize: '0.92rem' }}>
                In the top-right corner of the Extensions page, toggle the <strong>Developer mode</strong> switch to <strong>ON</strong>.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="timeline-step">
            <div className="timeline-number">5</div>
            <div className="timeline-content glass-card">
              <h3>Click "Load unpacked"</h3>
              <p style={{ marginTop: 6, fontSize: '0.92rem' }}>
                Click the <strong>Load unpacked</strong> button in the top-left toolbar and select the unzipped folder from Step 2. FormAnchor will immediately appear in your browser toolbar!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Permissions Transparency Grid ── */}
      <section className="container js-scroll-reveal" style={{ maxWidth: 960, marginBottom: 80 }}>
        <div className="section-header">
          <span className="pill-badge emerald">
            <Icon name="lock" size={14} /> Privacy & Permissions
          </span>
          <h2>Why FormAnchor Needs These Permissions</h2>
          <p>We believe in 100% transparency. Here is exactly why each browser permission is requested.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card glass-card">
            <div className="feature-icon-box">
              <Icon name="tab" size={22} />
            </div>
            <h4>Active Tab</h4>
            <p style={{ fontSize: '0.88rem' }}>
              Allows FormAnchor to inspect and fill form fields on the specific portal tab you are actively working in.
            </p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon-box">
              <Icon name="storage" size={22} />
            </div>
            <h4>Local Storage (IndexedDB)</h4>
            <p style={{ fontSize: '0.88rem' }}>
              Stores your recorded workflows, column mappings, and execution logs 100% locally with AES-256 encryption.
            </p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon-box">
              <Icon name="code" size={22} />
            </div>
            <h4>Scripting</h4>
            <p style={{ fontSize: '0.88rem' }}>
              Injects the self-healing selector engine and custom adapters (Select2, RMDP, AntD) into the portal DOM.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
