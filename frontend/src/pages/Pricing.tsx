import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'
import { SUPPORT_EMAIL } from '../constants'
import InteractiveCalculator from '../components/InteractiveCalculator'

export default function Pricing() {
  const containerRef = useScrollReveal()

  return (
    <div ref={containerRef}>
      {/* ── Page Hero ── */}
      <section className="hero js-scroll-reveal">
        <div className="hero-pill-tag">
          <span className="pill-badge primary">
            <Icon name="payments" size={14} /> One-Time Credit Packs
          </span>
        </div>
        <h1>
          Pay as you go. <br />
          <span className="gradient-text">No recurring subscriptions.</span>
        </h1>
        <p className="hero-subtitle">
          Start free with 100 rows. Purchase top-up credit packs only when you need them.
          Your purchased credits never expire.
        </p>
      </section>

      {/* ── 3-Tier Pricing Grid ── */}
      <section className="container js-scroll-reveal" style={{ marginBottom: 60 }}>
        <div className="pricing-grid">
          {/* Tier 1: Free */}
          <div className="pricing-card glass-card">
            <div>
              <span className="pill-badge">Starter</span>
              <h3 style={{ marginTop: 12 }}>Free Community</h3>
              <div className="pricing-price">
                ₹0 <span>/ forever</span>
              </div>
              <p style={{ fontSize: '0.88rem' }}>Everything you need to automate your first batches.</p>
              
              <ul className="pricing-features">
                <li className="pricing-feature-item included">
                  <Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} />
                  <span><strong>100 Free Rows included</strong></span>
                </li>
                <li className="pricing-feature-item included">
                  <Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} />
                  <span>Full access to all engine features</span>
                </li>
                <li className="pricing-feature-item included">
                  <Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} />
                  <span>AutoResume crash recovery</span>
                </li>
                <li className="pricing-feature-item included">
                  <Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} />
                  <span>100% local AES-256 encrypted storage</span>
                </li>
                <li className="pricing-feature-item included">
                  <Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} />
                  <span>No payment or card required</span>
                </li>
              </ul>
            </div>
            <a href="#/install" className="btn btn-outline btn-block">Install Extension Free</a>
          </div>

          {/* Tier 2: FormAnchor Go (Featured) */}
          <div className="pricing-card glass-card featured">
            <span className="pill-badge primary pricing-badge-popular">
              <Icon name="star" size={12} /> Most Popular
            </span>
            <div>
              <span className="pill-badge primary">High Volume</span>
              <h3 style={{ marginTop: 12 }}>FormAnchor Go</h3>
              <div className="pricing-price">
                ₹250 <span>/ one-time pack</span>
              </div>
              <p style={{ fontSize: '0.88rem' }}>Ideal for CSC operators, banking KYC, and daily filings.</p>
              
              <ul className="pricing-features">
                <li className="pricing-feature-item included">
                  <Icon name="check" size={16} style={{ color: 'var(--primary)' }} />
                  <span><strong>700 Rows included</strong> (~₹0.35/row)</span>
                </li>
                <li className="pricing-feature-item included">
                  <Icon name="check" size={16} style={{ color: 'var(--primary)' }} />
                  <span><strong>Credits never expire</strong></span>
                </li>
                <li className="pricing-feature-item included">
                  <Icon name="check" size={16} style={{ color: 'var(--primary)' }} />
                  <span>Full access to all engine features</span>
                </li>
                <li className="pricing-feature-item included">
                  <Icon name="check" size={16} style={{ color: 'var(--primary)' }} />
                  <span>AutoResume & Virtual Select adapters</span>
                </li>
                <li className="pricing-feature-item included">
                  <Icon name="check" size={16} style={{ color: 'var(--primary)' }} />
                  <span>Unlimited recorded workflow templates</span>
                </li>
              </ul>
            </div>
            <a href="#/install" className="btn btn-primary btn-block">Add FormAnchor Go</a>
          </div>

          {/* Tier 3: FormAnchor Pro */}
          <div className="pricing-card glass-card">
            <div>
              <span className="pill-badge emerald">Best Value</span>
              <h3 style={{ marginTop: 12 }}>FormAnchor Pro</h3>
              <div className="pricing-price">
                ₹500 <span>/ one-time pack</span>
              </div>
              <p style={{ fontSize: '0.88rem' }}>Maximum savings for enterprise data operators & teams.</p>
              
              <ul className="pricing-features">
                <li className="pricing-feature-item included">
                  <Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} />
                  <span><strong>1,500 Rows included</strong> (~₹0.33/row)</span>
                </li>
                <li className="pricing-feature-item included">
                  <Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} />
                  <span><strong>Lowest per-row rate</strong></span>
                </li>
                <li className="pricing-feature-item included">
                  <Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} />
                  <span><strong>Credits never expire</strong></span>
                </li>
                <li className="pricing-feature-item included">
                  <Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} />
                  <span>Full access to all engine features</span>
                </li>
                <li className="pricing-feature-item included">
                  <Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} />
                  <span>Priority email support & custom adapters</span>
                </li>
              </ul>
            </div>
            <a href="#/install" className="btn btn-outline btn-block">Add FormAnchor Pro</a>
          </div>
        </div>
      </section>

      {/* ── "What is a Row?" Definition Box ── */}
      <section className="container js-scroll-reveal" style={{ marginBottom: 80 }}>
        <div className="definition-box">
          <div className="definition-icon">
            <Icon name="help_outline" size={26} />
          </div>
          <div>
            <h3>What is a "Row" and how is quota deducted?</h3>
            <p style={{ marginTop: 8 }}>
              In FormAnchor, <strong>1 Row = 1 Successful Form Submission</strong> verified by the extension's
              <code style={{ color: 'var(--primary)', margin: '0 4px' }}>SubmitVerifier</code> engine.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 16 }}>
              <div style={{ padding: '12px 16px', background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 600, fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="check_circle" size={14} /> Successful Submit
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginTop: 4 }}>
                  1 Row credit deducted from balance.
                </span>
              </div>

              <div style={{ padding: '12px 16px', background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                <span style={{ color: 'var(--accent-amber)', fontWeight: 600, fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="skip_next" size={14} /> Skipped / Aborted Row
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginTop: 4 }}>
                  Zero credit deducted. Quota stays intact.
                </span>
              </div>

              <div style={{ padding: '12px 16px', background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="all_inclusive" size={14} /> Non-Expiring Balance
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginTop: 4 }}>
                  Unused credits remain valid indefinitely.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive ROI Calculator ── */}
      <section className="container js-scroll-reveal" style={{ marginBottom: 100 }}>
        <InteractiveCalculator />
      </section>

      {/* ── Feature Comparison Table ── */}
      <section className="container js-scroll-reveal" style={{ marginBottom: 80 }}>
        <div className="section-header">
          <h2>Compare Pack Features</h2>
          <p>Every tier gives you full access to the self-healing automation engine.</p>
        </div>

        <div className="table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature / Capability</th>
                <th>Free Community</th>
                <th>FormAnchor Go</th>
                <th>FormAnchor Pro</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Row Credits Included</strong></td>
                <td>100 rows</td>
                <td><strong>700 rows</strong></td>
                <td><strong>1,500 rows</strong></td>
              </tr>
              <tr>
                <td><strong>Effective Price per Row</strong></td>
                <td>₹0.00</td>
                <td>~₹0.35</td>
                <td><strong>~₹0.33</strong></td>
              </tr>
              <tr>
                <td><strong>Credit Expiry</strong></td>
                <td>Never</td>
                <td>Never</td>
                <td>Never</td>
              </tr>
              <tr>
                <td><strong>8-Tier Selector Self-Healing</strong></td>
                <td><Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /></td>
                <td><Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /></td>
                <td><Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /></td>
              </tr>
              <tr>
                <td><strong>100% Local AES-256 Sandbox</strong></td>
                <td><Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /></td>
                <td><Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /></td>
                <td><Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /></td>
              </tr>
              <tr>
                <td><strong>Ant Design & RMDP Adapters</strong></td>
                <td><Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /></td>
                <td><Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /></td>
                <td><Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /></td>
              </tr>
              <tr>
                <td><strong>AutoResume Crash Checkpoints</strong></td>
                <td><Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /></td>
                <td><Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /></td>
                <td><Icon name="check" size={16} style={{ color: 'var(--accent-emerald)' }} /></td>
              </tr>
              <tr>
                <td><strong>Support Channel</strong></td>
                <td>Community GitHub</td>
                <td>Email Support</td>
                <td><strong>Priority Email & Adapter Requests</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Payment & Billing FAQ ── */}
      <section className="container js-scroll-reveal" style={{ marginBottom: 60 }}>
        <div className="section-header">
          <h2>Payment & Credits FAQ</h2>
        </div>

        <div className="faq-list">
          <div className="faq-item">
            <div className="faq-question">
              <span>Which payment methods are supported?</span>
            </div>
            <div className="faq-answer">
              We support all major Indian payment methods through Razorpay, including UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking, Debit Cards, and Credit Cards.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span>Can I buy multiple packs and stack credits?</span>
            </div>
            <div className="faq-answer">
              Yes! Whenever you purchase a pack, the credits are instantly added to your existing balance. They never expire and accumulate safely in your local account.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span>Is there a refund policy?</span>
            </div>
            <div className="faq-answer">
              If FormAnchor does not work on your target portal even after following our guide, reach out to <code style={{ color: 'var(--primary)' }}>{SUPPORT_EMAIL}</code> within 7 days of purchase for support or a full refund.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
