import React, { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'
import { getApiUrl, isValidEmail } from '../utils/api'

interface ContactFormState {
  name: string
  email: string
  subject: string
  message: string
  honeypot: string
}

export default function Contact() {
  const containerRef = useScrollReveal()
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
    honeypot: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const copyEmail = () => {
    navigator.clipboard.writeText('sachinrawal473@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const validate = (): boolean => {
    const tempErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required.'
    } else if (formData.name.trim().length < 2) {
      tempErrors.name = 'Name must be at least 2 characters.'
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required.'
    } else if (!isValidEmail(formData.email)) {
      tempErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required.'
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters.'
    }

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    setStatusMessage('')

    const API_URL = getApiUrl('/api/contact')

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok && data.success !== false) {
        setStatus('success')
        setStatusMessage(data.message || 'Thank you! Your message has been received.')
        setFormData({
          name: '',
          email: '',
          subject: 'General Inquiry',
          message: '',
          honeypot: '',
        })
      } else {
        setStatus('error')
        setStatusMessage(data.detail || 'An error occurred. Please try again or email directly.')
      }
    } catch (err) {
      console.error('Contact submit error:', err)
      setStatus('error')
      setStatusMessage('Unable to reach the server. Please verify backend is running or email directly.')
    }
  }

  return (
    <div ref={containerRef}>
      {/* ── Page Hero ── */}
      <section className="hero js-scroll-reveal">
        <div className="hero-pill-tag">
          <span className="pill-badge primary">
            <Icon name="mail" size={14} /> Get in Touch
          </span>
        </div>
        <h1>
          Contact & <br />
          <span className="gradient-text">Developer Support</span>
        </h1>
        <p className="hero-subtitle">
          Have a question, feedback, or need help building a custom adapter for your portal?
          Send a message below or reach out directly.
        </p>
      </section>

      {/* ── Main 2-Column Grid ── */}
      <section className="container js-scroll-reveal" style={{ maxWidth: 1040, marginBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 28, alignItems: 'start' }}>
          
          {/* Left Column: Interactive Contact Form */}
          <div className="glass-card glow-primary">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: 4 }}>Send Us a Message</h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                  Directly dispatched to our support engineering inbox.
                </p>
              </div>
              <span className="pill-badge emerald" style={{ fontSize: '0.75rem' }}>
                <Icon name="schedule" size={12} /> &lt; 24h Response
              </span>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="form-alert success">
                <Icon name="check_circle" size={18} />
                <span>{statusMessage}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="form-alert error">
                <Icon name="error" size={18} />
                <span>{statusMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Invisible Honeypot field for bot protection */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  disabled={status === 'submitting'}
                  required
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. rahul@example.com"
                  disabled={status === 'submitting'}
                  required
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              {/* Subject Field */}
              <div className="form-group">
                <label htmlFor="subject" className="form-label">Topic / Inquiry Type</label>
                <select
                  id="subject"
                  name="subject"
                  className="form-select"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Custom Portal Adapter">Custom Portal Adapter Request</option>
                  <option value="Enterprise Credit Pack">Enterprise Credit Pack / Licensing</option>
                  <option value="Bug Report">Bug Report / Technical Issue</option>
                </select>
              </div>

              {/* Message Field */}
              <div className="form-group">
                <label htmlFor="message" className="form-label">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your portal, form structure, or question in detail..."
                  disabled={status === 'submitting'}
                  required
                />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 8 }}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <Icon name="pending" size={18} /> Sending Message...
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <Icon name="send" size={18} /> Send Message
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Direct Channels & Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Direct Email Card */}
            <div className="glass-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div className="pipeline-icon-circle" style={{ width: 40, height: 40 }}>
                  <Icon name="mail" size={20} />
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>Direct Developer Email</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                    Prefer your own email client?
                  </p>
                </div>
              </div>
              <div className="code-block" style={{ marginTop: 12 }}>
                <code>sachinrawal473@gmail.com</code>
                <button className="copy-btn" onClick={copyEmail} type="button">
                  <Icon name={copiedEmail ? 'check' : 'content_copy'} size={14} />
                  {copiedEmail ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* GitHub Repo */}
            <a
              href="https://github.com/Sachin-Rawal091/FormAnchor"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card"
              style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 20, textDecoration: 'none' }}
            >
              <div className="feature-icon-box" style={{ flexShrink: 0 }}>
                <Icon name="code" size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <h4 style={{ margin: 0 }}>GitHub Repository</h4>
                  <Icon name="open_in_new" size={14} style={{ color: 'var(--text-muted)' }} />
                </div>
                <p style={{ fontSize: '0.82rem', marginTop: 2, color: 'var(--text-secondary)' }}>
                  Sachin-Rawal091/FormAnchor
                </p>
              </div>
            </a>

            {/* GitHub Issues */}
            <a
              href="https://github.com/Sachin-Rawal091/FormAnchor/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card"
              style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 20, textDecoration: 'none' }}
            >
              <div className="feature-icon-box" style={{ flexShrink: 0 }}>
                <Icon name="bug_report" size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <h4 style={{ margin: 0 }}>Bug Tracker & Feedback</h4>
                  <Icon name="open_in_new" size={14} style={{ color: 'var(--text-muted)' }} />
                </div>
                <p style={{ fontSize: '0.82rem', marginTop: 2, color: 'var(--text-secondary)' }}>
                  Submit public bug reports or request portal adapters.
                </p>
              </div>
            </a>

            {/* Self Service Quick Links */}
            <div className="glass-card" style={{ padding: 22 }}>
              <h4 style={{ marginBottom: 12 }}>Check Self-Service First</h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: 14 }}>
                Most portal setup questions and Excel formatting guidelines are covered in detail:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a href="#/docs" className="btn btn-outline btn-sm" style={{ justifyContent: 'flex-start' }}>
                  <Icon name="menu_book" size={16} /> Read Full Documentation
                </a>
                <a href="#/faq" className="btn btn-outline btn-sm" style={{ justifyContent: 'flex-start' }}>
                  <Icon name="help" size={16} /> Browse FAQ Hub
                </a>
                <a href="#/install" className="btn btn-outline btn-sm" style={{ justifyContent: 'flex-start' }}>
                  <Icon name="download" size={16} /> 2-Minute Installation Guide
                </a>
              </div>
            </div>

            {/* Responsible Disclosure */}
            <div 
              className="glass-card" 
              style={{ 
                padding: 22, 
                border: '1px solid var(--amber-subtle)',
                background: 'var(--surface-alt)' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Icon name="shield" size={18} style={{ color: 'var(--accent-amber)' }} />
                <h4 style={{ color: 'var(--accent-amber)', margin: 0 }}>Responsible Security Disclosure</h4>
              </div>
              <p style={{ fontSize: '0.82rem', lineHeight: 1.5, margin: 0, color: 'var(--text-secondary)' }}>
                Found a potential vulnerability? Please do not open a public issue. Email details privately to{' '}
                <strong style={{ color: 'var(--text-primary)' }}>sachinrawal473@gmail.com</strong>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
