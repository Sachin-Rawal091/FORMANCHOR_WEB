import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'

const FAQ_DATA = [
  {
    category: 'Credits & Quotas',
    items: [
      { q: 'What counts as "1 row" / "1 credit"?', a: 'One successfully submitted form fills one row credit. The SubmitVerifier engine confirms completion before deducting. Skipped rows, paused runs, and aborted executions do NOT consume credits.' },
      { q: 'Do unused credits expire?', a: 'No. Credits from any purchased pack remain in your balance indefinitely. There are no recurring charges, subscription fees, or time-limited validity windows.' },
      { q: 'What happens when I hit quota_exceeded?', a: 'Execution pauses gracefully. No data is lost — your recordings, spreadsheet rows, and execution progress are preserved. Purchase a credit pack to continue from where you left off.' },
      { q: 'Can I stack multiple credit packs?', a: 'Yes. Credits are additive. If you buy two Go packs, you get 1,400 total row credits.' },
    ]
  },
  {
    category: 'Data & Privacy',
    items: [
      { q: 'Does FormAnchor send my Excel data to external servers?', a: 'No. All Excel parsing (via SheetJS) and form execution happen 100% locally in your browser. Spreadsheet rows are stored in IndexedDB on your device and never transmitted over the internet.' },
      { q: 'What data leaves my browser?', a: 'Only a lightweight session token for credit balance tracking (if you have a paid plan). Your form data, recordings, spreadsheet contents, and execution logs never leave your device.' },
      { q: 'How is my data encrypted?', a: 'Sensitive spreadsheet rows are encrypted using AES-GCM 256-bit encryption via the Web Crypto API. The cryptographic key is generated as a non-extractable CryptoKey handle and stored locally in IndexedDB, separate from the encrypted data.' },
    ]
  },
  {
    category: 'Technical Compatibility',
    items: [
      { q: 'Does it work with React, Vue, and Angular applications?', a: 'Yes. FormAnchor bypasses standard property setters and dispatches synthetic Input events that trigger React/Vue/Angular state updates correctly. This is why generic autofill tools fail on modern frameworks but FormAnchor succeeds.' },
      { q: 'How does it handle Shadow DOM and custom web components?', a: 'The SelectorEngine recursively pierces shadowRoot boundaries, scores elements inside Shadow DOM using visual weights (labels, attributes, names), and resolves the correct target even when deeply nested.' },
      { q: 'Does it support custom calendars and date pickers?', a: 'Yes. FormAnchor ships dedicated adapters for React Multi-DatePicker (RMDP), Ant Design DatePicker, and a generic adapter that maps visible calendar grid boundaries for standard date interfaces.' },
      { q: 'Which browsers are supported?', a: 'FormAnchor is designed for Google Chrome (Manifest V3) and fully supports Chromium-based browsers: Microsoft Edge, Brave, and Opera.' },
      { q: 'What happens if a target site changes its form layout after recording?', a: 'FormAnchor\'s 8-strategy self-healing selector pipeline tries alternate strategies (fuzzy label matching, proximity scoring, CSS path variants) before failing. Most minor layout changes are handled automatically. For major redesigns, re-record the affected steps.' },
    ]
  },
  {
    category: 'Payments & Refunds',
    items: [
      { q: 'What payment methods are accepted?', a: 'Payments are processed via Razorpay, supporting UPI, credit/debit cards, net banking, and popular wallets.' },
      { q: 'Is there a refund policy?', a: 'Credit packs are non-refundable once activated. Since credits never expire, there is no risk of losing unused credits to time-based expiry.' },
    ]
  }
]

export default function Faq() {
  const containerRef = useScrollReveal()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ '0-0': true })

  const categories = ['All', ...FAQ_DATA.map(c => c.category)]

  const toggle = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const filteredCategories = selectedCategory === 'All' 
    ? FAQ_DATA 
    : FAQ_DATA.filter(c => c.category === selectedCategory)

  return (
    <div ref={containerRef}>
      {/* ── Page Hero ── */}
      <section className="hero js-scroll-reveal">
        <div className="hero-pill-tag">
          <span className="pill-badge primary">
            <Icon name="help" size={14} /> Frequently Asked Questions
          </span>
        </div>
        <h1>
          Answers to Common <br />
          <span className="gradient-text">FormAnchor Questions</span>
        </h1>
        <p className="hero-subtitle">
          Everything you need to know about row quotas, offline data privacy,
          custom portal adapters, and payment processing.
        </p>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 12 }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`pill-badge ${selectedCategory === cat ? 'primary active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
              style={{ cursor: 'pointer', padding: '8px 16px', fontSize: '0.86rem' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── FAQ Categories & Accordions ── */}
      <section className="container js-scroll-reveal" style={{ maxWidth: 860, marginBottom: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {filteredCategories.map((category, ci) => (
            <div key={ci}>
              <h3 style={{ marginBottom: 16, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="pill-badge primary" style={{ width: 8, height: 8, padding: 0, borderRadius: '50%' }} />
                {category.category}
              </h3>

              <div className="faq-list">
                {category.items.map((faq, fi) => {
                  const key = `${ci}-${fi}`
                  const isOpen = !!openItems[key]
                  return (
                    <div key={key} className="faq-item">
                      <button className="faq-question" onClick={() => toggle(key)}>
                        <span>{faq.q}</span>
                        <Icon 
                          name={isOpen ? 'expand_less' : 'expand_more'} 
                          size={20} 
                          style={{ color: 'var(--primary)', flexShrink: 0 }} 
                        />
                      </button>
                      {isOpen && (
                        <div className="faq-answer">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Still Have Questions Card ── */}
      <section className="container js-scroll-reveal" style={{ maxWidth: 860, marginBottom: 80 }}>
        <div className="glass-card glow-primary" style={{ textAlign: 'center', padding: 40 }}>
          <div className="pipeline-icon-circle" style={{ margin: '0 auto 16px' }}>
            <Icon name="support_agent" size={26} />
          </div>
          <h3>Still have a question or need technical guidance?</h3>
          <p style={{ marginTop: 8, maxWidth: 540, margin: '8px auto 24px' }}>
            Our team responds directly to operator questions, portal issues, and custom adapter requests within 24 hours.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <a href="mailto:sachinrawal473@gmail.com" className="btn btn-primary">
              <Icon name="mail" size={16} /> Email Support
            </a>
            <a href="#/contact" className="btn btn-outline">
              <Icon name="contact_support" size={16} /> Contact Hub
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
