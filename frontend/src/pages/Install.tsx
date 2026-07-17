import React, { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'

export default function Install() {
  const containerRef = useScrollReveal()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setStatusMessage('Please enter a valid email address.')
      return
    }

    setStatus('submitting')

    const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:8000/api/subscribe'
      : '/api/subscribe'

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setStatusMessage(data.message || 'Subscribed successfully!')
        setEmail('')
      } else {
        setStatus('error')
        setStatusMessage(data.detail || 'An error occurred. Please try again.')
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
      setStatusMessage('Unable to connect to the server. Please verify the backend is running.')
    }
  }

  return (
    <div ref={containerRef}>
      {/* Page Hero */}
      <section className="page-hero fade-in-section">
        <h1>
          <span className="gradient-text">Install FormPilot</span>
        </h1>
        <p>Get up and running in under 2 minutes with our simple installation guide.</p>
      </section>

      {/* Chrome Web Store Coming Soon Banner */}
      <section className="fade-in-section">
        <div className="coming-soon-banner glass-card">
          <Icon name="install_desktop" size={48} className="text-primary" style={{ marginBottom: 16, display: 'inline-block' }} />
          <h3>Coming Soon to Chrome Web Store</h3>
          <p>We are currently finalizing our v1.0 listing on the official Chrome Web Store. Sign up below to get notified the second it drops.</p>
          
          {status === 'success' && (
            <div style={{ maxWidth: 440, margin: '0 auto 16px auto', padding: '10px 16px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: 'var(--radius-full)', color: 'var(--success)', fontSize: 13 }}>
              {statusMessage}
            </div>
          )}

          {status === 'error' && (
            <div style={{ maxWidth: 440, margin: '0 auto 16px auto', padding: '10px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error)', borderRadius: 'var(--radius-full)', color: 'var(--error)', fontSize: 13 }}>
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleSubscribe} style={{ maxWidth: 440, margin: '0 auto', display: 'flex', gap: 12 }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="form-input" 
              style={{ borderRadius: 'var(--radius-full)', border: '1px solid var(--border-glass)' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'submitting'}
              required
            />
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ flexShrink: 0, borderRadius: 'var(--radius-full)' }} 
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Submitting...' : 'Notify Me'}
            </button>
          </form>
        </div>
      </section>
      {/* Developer Mode Installation Steps */}
      <section className="section fade-in-section">
        <div className="section-header">
          <h2>Install from Source (Developer Mode)</h2>
          <p>You can run the extension locally by loading the build output directory into Chrome.</p>
        </div>

        <div className="install-steps">
          {[
            { step: '1', title: 'Download & Unzip', desc: 'Download the compiled extension bundle zip file from your GitHub release panel and extract it to a local folder.' },
            { step: '2', title: 'Open Extensions Panel', desc: 'Open your Google Chrome browser and navigate to chrome://extensions/ in your address bar.' },
            { step: '3', title: 'Enable Developer Mode', desc: 'Locate and click the "Developer mode" toggle switch in the top right corner of the extension list dashboard.' },
            { step: '4', title: 'Load Unpacked', desc: 'Click the "Load unpacked" button in the top left header, then navigate to and select your extracted directory.' },
            { step: '5', title: 'Confirm & Pin', desc: 'FormPilot is now installed! Pin it to your extension toolbar for immediate visual flow recording access.' },
          ].map((item) => (
            <div key={item.step} className="install-step glass-card">
              <div className="step-number">{item.step}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Permissions Section */}
      <section className="section fade-in-section">
        <div className="section-header">
          <h2>Permissions Explained</h2>
          <p>We respect your privacy. FormPilot only asks for the bare minimum permissions needed to automate forms local-first.</p>
        </div>

        <div className="permissions-grid">
          <div className="permission-card glass-card">
            <div className="feature-icon blue">
              <Icon name="link" />
            </div>
            <h3>activeTab / &lt;all_urls&gt;</h3>
            <p>Allows the extension content scripts to inject form filling loops into the active web application tab you select.</p>
          </div>

          <div className="permission-card glass-card">
            <div className="feature-icon violet">
              <Icon name="database" />
            </div>
            <h3>storage</h3>
            <p>Saves your recorded macros, column maps, and progress logs locally in the sandboxed browser IndexedDB.</p>
          </div>

          <div className="permission-card glass-card">
            <div className="feature-icon green">
              <Icon name="code" />
            </div>
            <h3>scripting</h3>
            <p>Triggers focus and change events directly inside target form elements, including elements nested in the Shadow DOM.</p>
          </div>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="section fade-in-section" style={{ maxWidth: 800, margin: '0 auto 128px auto' }}>
        <div className="section-header">
          <h2>Troubleshooting</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="glass-card" style={{ padding: 24 }}>
            <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="error" className="text-accent" size={18} />
              Extension is not showing up or loading?
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>
              Make sure that Developer Mode remains enabled in Chrome. If you move or rename the unpacked folder on your machine, Chrome will lose track of it and you will need to re-click "Load unpacked" to select the folder again.
            </p>
          </div>

          <div className="glass-card" style={{ padding: 24 }}>
            <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="error" className="text-accent" size={18} />
              Does it work in Incognito windows?
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>
              By default, Chrome disables extensions in Incognito mode. You must manually open chrome://extensions, locate FormPilot, click "Details", and toggle the "Allow in Incognito" switch on.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
