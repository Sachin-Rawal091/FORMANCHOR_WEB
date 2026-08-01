import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'

export default function Faq() {
  const containerRef = useScrollReveal()
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const faqData = [
    {
      q: "Does FormAnchor send my Excel data to external servers?",
      a: "No. FormAnchor operates entirely client-side inside your browser sandbox. All Excel parsing (via SheetJS) and form execution are processed locally. Your spreadsheet rows are stored in a local IndexedDB instance on your machine and never transmitted over the internet."
    },
    {
      q: "Does it work with React, Vue, and Angular applications?",
      a: "Yes. Traditional form fillers fail on modern JavaScript frameworks because virtual DOMs expect specific event bindings. FormAnchor's execution layer is designed to bypass standard property setters, dispatching custom Input events, Checkbox ticks, and click indicators that trigger React state updates successfully."
    },
    {
      q: "How does it handle Shadow DOM and custom web components?",
      a: "The SelectorEngine features a recursively piercing query system. When traversing the DOM, it identifies custom elements, drills into their shadowRoot, and scores elements inside the Shadow DOM using visual weights (labels, attributes, names) for resilient matching."
    },
    {
      q: "Does it support custom calendars and date pickers?",
      a: "Yes. FormAnchor contains a dedicated DatePicker Adapter layer. It includes a native adapter for complex widgets like React Multi-DatePicker, navigating calendars month-by-month and simulating coordinate clicks, as well as a generic adapter that maps visible grid boundaries for standard date interfaces."
    },
    {
      q: "Which browsers are supported?",
      a: "FormAnchor is designed for Google Chrome (Manifest V3) and fully supports Chromium-based browsers like Microsoft Edge, Brave, and Opera. It can be installed as an unpacked developer extension on any of these browsers."
    },
    {
      q: "How does it handle CAPTCHAs and bot protection systems?",
      a: "FormAnchor includes a real-time ResponseDetectionEngine. When it encounters a CAPTCHA challenge (like Cloudflare Turnstile or Google reCAPTCHA), it pauses the run and surfaces a resume prompt in the FormAnchor dashboard, along with a Chrome desktop notification so you don't have to keep the tab in view. Once you solve the CAPTCHA, resume execution with one click."
    },
    {
      q: "Is there a row limit for Excel uploads?",
      a: "There is no hard limit built into FormAnchor. The extension uses client-side pagination chunks of 50 rows, loading only what is active into storage. Designed to handle large datasets via 50-row client-side chunking, so memory stays flat no matter how big your spreadsheet is."
    },
    {
      q: "What happens if a single form field fails to load?",
      a: "Our smart retry loop automatically kicks in. It attempts to find the field using alternate selectors (fuzzy labels, proximity headers) up to a configurable maximum retry limit (default: 3 retries, with exponential backoff) before registering a row fault and continuing, ensuring your run is never stuck."
    }
  ]

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx)
  }

  return (
    <div ref={containerRef} style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Page Hero */}
      <section className="page-hero fade-in-section">
        <h1>
          <span className="gradient-text">Frequently Asked Questions</span>
        </h1>
        <p>Everything you need to know about FormAnchor's local automation capabilities, safety, and runtime support.</p>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section fade-in-section">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {faqData.map((faq, idx) => (
            <div 
              key={idx} 
              className={`faq-item ${activeFaq === idx ? 'open' : ''}`}
            >
              <button 
                className="faq-question" 
                onClick={() => toggleFaq(idx)}
                aria-expanded={activeFaq === idx}
              >
                <span>{faq.q}</span>
                <span className="faq-chevron">
                  <Icon name="expand_more" size={20} />
                </span>
              </button>
              <div className="faq-answer">
                <p style={{ margin: 0, paddingBottom: 16 }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="fade-in-section" style={{ marginBottom: 128 }}>
        <div className="coming-soon-banner glass-card" style={{ borderStyle: 'dashed' }}>
          <Icon name="help_outline" size={40} className="text-primary" style={{ marginBottom: 12, display: 'inline-block' }} />
          <h3>Still Have Questions?</h3>
          <p>We are here to help. Reach out to our technical support team for assistance with complex form flows.</p>
          <a href="#/contact" className="btn btn-ghost" style={{ marginTop: 8 }}>
            Contact Support
            <Icon name="arrow_forward" size={16} />
          </a>
        </div>
      </section>
    </div>
  )
}
