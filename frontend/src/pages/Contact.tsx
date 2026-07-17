import React, { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'

export default function Contact() {
  const containerRef = useScrollReveal()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
    honeypot: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const validate = () => {
    const tempErrors: Record<string, string> = {}
    if (!formData.name.trim()) tempErrors.name = "Name is required."
    else if (formData.name.length < 2) tempErrors.name = "Name must be at least 2 characters."

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) tempErrors.email = "Email is required."
    else if (!emailRegex.test(formData.email)) tempErrors.email = "Please enter a valid email address."

    if (!formData.message.trim()) tempErrors.message = "Message is required."
    else if (formData.message.length < 10) tempErrors.message = "Message must be at least 10 characters."

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    
    // Choose local dev API URL or production relative endpoint
    const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:8000/api/contact'
      : '/api/contact'

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setStatusMessage(data.message || 'Thank you! Your message has been sent.')
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '', honeypot: '' })
      } else {
        setStatus('error')
        setStatusMessage(data.detail || 'An error occurred. Please try again later.')
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
          <span className="gradient-text">Get In Touch</span>
        </h1>
        <p>Have a question, bug report, or partnership inquiry? We'd love to hear from you.</p>
      </section>

      {/* Two-Column Grid */}
      <section className="section fade-in-section" style={{ marginBottom: 128 }}>
        <div className="contact-grid">
          {/* Left Column: Form */}
          <div className="glass-card" style={{ padding: 32 }}>
            {status === 'success' && (
              <div style={{ padding: '12px 16px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: 'var(--radius-sm)', color: 'var(--success)', marginBottom: 20, fontSize: 14 }}>
                {statusMessage}
              </div>
            )}

            {status === 'error' && (
              <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error)', borderRadius: 'var(--radius-sm)', color: 'var(--error)', marginBottom: 20, fontSize: 14 }}>
                {statusMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Honeypot spambot trap */}
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

              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  disabled={status === 'submitting'}
                  required
                />
                {errors.name && <span style={{ color: 'var(--error)', fontSize: 12, marginTop: 4, display: 'block' }}>{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  disabled={status === 'submitting'}
                  required
                />
                {errors.email && <span style={{ color: 'var(--error)', fontSize: 12, marginTop: 4, display: 'block' }}>{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  className="form-select"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Partnership">Partnership</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you need help with..."
                  disabled={status === 'submitting'}
                  required
                />
                {errors.message && <span style={{ color: 'var(--error)', fontSize: 12, marginTop: 4, display: 'block' }}>{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 8 }}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Right Column: Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="glass-card info-card">
              <div className="info-icon">
                <Icon name="mail" size={20} />
              </div>
              <div>
                <h4>Support Email</h4>
                <p>support@formpilot.dev</p>
              </div>
            </div>

            <div className="glass-card info-card">
              <div className="info-icon">
                <Icon name="code" size={20} />
              </div>
              <div>
                <h4>GitHub Repository</h4>
                <p>github.com/Sachin-Rawal091/FormPilot</p>
              </div>
            </div>

            <div className="glass-card info-card">
              <div className="info-icon">
                <Icon name="schedule" size={20} />
              </div>
              <div>
                <h4>Typical Response Time</h4>
                <p>We typically respond within 24 hours.</p>
              </div>
            </div>

            <div className="glass-card" style={{ padding: 24, background: 'var(--gradient-primary)', border: 'none', color: '#ffffff' }}>
              <h3 style={{ color: '#ffffff', fontSize: 18, marginBottom: 8 }}>Need immediate assistance?</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                Please review our comprehensive FAQ section first. Most questions regarding browser permission boundaries, React framework compatibility, and security audits are fully resolved there.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
