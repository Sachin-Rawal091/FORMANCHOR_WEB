import React, { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'
import { getApiUrl, isValidEmail } from '../utils/api'

export default function Install() {
  const containerRef = useScrollReveal()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !isValidEmail(email)) {
      setStatus('error')
      setStatusMessage('Please enter a valid email address.')
      return
    }

    setStatus('submitting')
    const API_URL = getApiUrl('/api/subscribe')

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  const faqItems = [
    {
      q: 'Extension not loading or appearing in toolbar?',
      a: 'Make sure Developer Mode remains enabled in Chrome. If you move or rename the unpacked folder on your machine, Chrome loses track of it and you will need to click "Load unpacked" again to select the folder.'
    },
    {
      q: '"Manifest file is missing or unreadable" error?',
      a: 'Ensure you extracted the downloaded ZIP file first and selected the inner unzipped folder containing manifest.json, rather than selecting the compressed ZIP file directly.'
    },
    {
      q: 'Does it work in Incognito windows?',
      a: 'By default, Chrome disables extensions in Incognito mode. Open chrome://extensions, locate FormPilot, click "Details", and toggle the "Allow in Incognito" switch on.'
    }
  ]

  return (
    <div ref={containerRef}>
      {/* Page Hero */}
      <section className="page-hero fade-in-section">
        <h1>
          <span className="gradient-text">Install FormPilot</span>
        </h1>
        <p>Follow this quick guide to manually install the FormPilot Chrome Extension while we prepare our official Web Store release.</p>
      </section>

      {/* Chrome Web Store Coming Soon Banner */}
      <section className="fade-in-section" style={{ maxWidth: 860, margin: '0 auto 64px auto', padding: '0 16px' }}>
        <div className="coming-soon-banner-compact glass-card">
          <div className="banner-left">
            <div className="banner-icon-badge">
              <Icon name="install_desktop" size={24} className="text-primary" />
            </div>
            <div>
              <h3>Coming Soon to Chrome Web Store</h3>
              <p>Join the waitlist to get notified the moment we launch.</p>
            </div>
          </div>
          <div className="banner-right">
            {status === 'success' && (
              <div className="banner-status-msg success">{statusMessage}</div>
            )}
            {status === 'error' && (
              <div className="banner-status-msg error">{statusMessage}</div>
            )}
            <form onSubmit={handleSubscribe} className="banner-subscribe-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="banner-input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'submitting'}
                required
              />
              <button 
                type="submit" 
                className="btn btn-primary banner-btn" 
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Submitting...' : 'Get Notified'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Manual Installation Guide Section */}
      <section className="section fade-in-section" style={{ maxWidth: 960, margin: '0 auto 128px auto', padding: '0 16px' }}>
        <div className="section-header" style={{ marginBottom: 64 }}>
          <h2>Manual Installation Guide</h2>
        </div>

        <div className="install-timeline">
          {/* Central Vertical Line */}
          <div className="timeline-line" />

          {/* Step 1: Download Release (Right card, Left badge) */}
          <div className="timeline-item right">
            <div className="timeline-badge">1</div>
            <div className="timeline-content glass-card">
              <div className="step-card-header">
                <Icon name="download" size={20} className="text-primary" />
                <h3>Download Release</h3>
              </div>
              <p>Get the latest ".zip" release file directly from our secure GitHub repository.</p>
              <a 
                href="https://github.com/Sachin-Rawal091/FormPilot/releases" 
                target="_blank" 
                rel="noopener noreferrer"
                className="timeline-action-link"
              >
                Download from GitHub <Icon name="arrow_forward" size={14} />
              </a>
            </div>
          </div>

          {/* Step 2: Unzip File (Left card, Right badge) */}
          <div className="timeline-item left">
            <div className="timeline-badge">2</div>
            <div className="timeline-content glass-card">
              <div className="step-card-header">
                <Icon name="folder_zip" size={20} className="text-primary" />
                <h3>Unzip File</h3>
              </div>
              <p>Extract the downloaded zip file into a folder on your computer. Remember this location.</p>
            </div>
          </div>

          {/* Step 3: Open Extensions (Right card, Left badge) */}
          <div className="timeline-item right">
            <div className="timeline-badge">3</div>
            <div className="timeline-content glass-card">
              <div className="step-card-header">
                <Icon name="extension" size={20} className="text-primary" />
                <h3>Open Extensions</h3>
              </div>
              <p>Open a new tab in Chrome and navigate to the extensions management page.</p>
              <div className="code-badge">
                <span>chrome://extensions</span>
              </div>
            </div>
          </div>

          {/* Step 4: Enable Developer Mode (Left card, Right badge) */}
          <div className="timeline-item left">
            <div className="timeline-badge">4</div>
            <div className="timeline-content glass-card">
              <div className="step-card-header">
                <Icon name="toggle_on" size={20} className="text-primary" />
                <h3>Enable Developer Mode</h3>
              </div>
              <p>Locate the "Developer mode" toggle in the top right corner of the page and turn it on.</p>
            </div>
          </div>

          {/* Step 5: Load Unpacked (Right card, Left badge) */}
          <div className="timeline-item right">
            <div className="timeline-badge">5</div>
            <div className="timeline-content glass-card">
              <div className="step-card-header">
                <Icon name="publish" size={20} className="text-primary" />
                <h3>Load Unpacked</h3>
              </div>
              <p>Click the 'Load unpacked' button that appears in the top left and select the folder you extracted in Step 2.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Required Permissions Section */}
      <section className="section fade-in-section" style={{ maxWidth: 1040, margin: '0 auto 128px auto', padding: '0 16px' }}>
        <div className="section-header">
          <h2>Required Permissions</h2>
          <p>We value your privacy. Here's exactly why FormPilot needs these standard permissions to function.</p>
        </div>

        <div className="permissions-grid three-col">
          <div className="permission-card glass-card text-center">
            <div className="permission-icon-wrapper blue">
              <Icon name="tab" size={24} />
            </div>
            <h3>Active Tab</h3>
            <p>Required to scan and inject data only into the specific form you are currently viewing and interacting with.</p>
          </div>

          <div className="permission-card glass-card text-center">
            <div className="permission-icon-wrapper violet">
              <Icon name="database" size={24} />
            </div>
            <h3>Storage</h3>
            <p>Used locally on your device to securely save your profile data, settings, and form-filling preferences.</p>
          </div>

          <div className="permission-card glass-card text-center">
            <div className="permission-icon-wrapper green">
              <Icon name="code" size={24} />
            </div>
            <h3>Scripting</h3>
            <p>Allows the extension to execute the automated filling logic directly within the context of complex web forms.</p>
          </div>
        </div>
      </section>

      {/* Troubleshooting Accordion Section */}
      <section className="section fade-in-section" style={{ maxWidth: 860, margin: '0 auto 128px auto', padding: '0 16px' }}>
        <div className="section-header" style={{ marginBottom: 36 }}>
          <h2 style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <Icon name="build" size={28} className="text-primary" />
            Troubleshooting
          </h2>
        </div>

        <div className="accordion-list">
          {faqItems.map((item, index) => (
            <div key={index} className={`accordion-item glass-card ${openFaq === index ? 'open' : ''}`}>
              <button 
                className="accordion-header" 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span>{item.q}</span>
                <Icon name={openFaq === index ? 'expand_less' : 'expand_more'} size={20} />
              </button>
              {openFaq === index && (
                <div className="accordion-body">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
