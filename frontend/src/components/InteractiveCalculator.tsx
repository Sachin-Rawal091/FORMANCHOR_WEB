import { useState, useMemo } from 'react'
import Icon from './Icon'

export default function InteractiveCalculator() {
  const [rowsPerMonth, setRowsPerMonth] = useState(500)
  const [minutesPerForm, setMinutesPerForm] = useState(5)

  const results = useMemo(() => {
    const totalMinutes = rowsPerMonth * minutesPerForm
    const hoursSaved = Math.round((totalMinutes / 60) * 10) / 10
    const laborRate = 150 // ₹ per hour average operator rate
    const costSaved = Math.round(hoursSaved * laborRate)

    let recommendedPack = 'Free Community (100 rows)'
    let packCost = 0
    if (rowsPerMonth <= 100) {
      recommendedPack = 'Free Community (100 rows)'
      packCost = 0
    } else if (rowsPerMonth <= 700) {
      recommendedPack = 'FormAnchor Go (700 rows)'
      packCost = 250
    } else {
      recommendedPack = 'FormAnchor Pro (1,500 rows)'
      packCost = 500
    }

    return { hoursSaved, costSaved, recommendedPack, packCost }
  }, [rowsPerMonth, minutesPerForm])

  return (
    <div className="calculator-card js-scroll-reveal">
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <span className="pill-badge primary" style={{ marginBottom: 12 }}>
          <Icon name="calculate" size={14} /> Interactive ROI Estimator
        </span>
        <h2>Calculate Your Time & Cost Savings</h2>
        <p style={{ marginTop: 8 }}>
          Adjust the sliders below to see your monthly operator savings with FormAnchor.
        </p>
      </div>

      <div className="calc-sliders">
        {/* Slider 1: Rows per month */}
        <div className="calc-slider-group">
          <div className="calc-slider-header">
            <span className="calc-slider-label">Forms Filled per Month</span>
            <span className="calc-slider-val">{rowsPerMonth.toLocaleString()} rows</span>
          </div>
          <input
            type="range"
            min={50}
            max={5000}
            step={50}
            value={rowsPerMonth}
            onChange={(e) => setRowsPerMonth(Number(e.target.value))}
            className="calc-range"
          />
        </div>

        {/* Slider 2: Minutes per manual fill */}
        <div className="calc-slider-group">
          <div className="calc-slider-header">
            <span className="calc-slider-label">Minutes per Manual Form Entry</span>
            <span className="calc-slider-val">{minutesPerForm} mins / form</span>
          </div>
          <input
            type="range"
            min={1}
            max={15}
            step={1}
            value={minutesPerForm}
            onChange={(e) => setMinutesPerForm(Number(e.target.value))}
            className="calc-range"
          />
        </div>
      </div>

      {/* Results Grid */}
      <div className="calc-metrics-grid">
        <div className="calc-metric-card">
          <p style={{ fontSize: '0.84rem' }}>Hours Saved / Month</p>
          <div className="calc-metric-val">{results.hoursSaved}h</div>
        </div>

        <div className="calc-metric-card">
          <p style={{ fontSize: '0.84rem' }}>Estimated Labor Saved</p>
          <div className="calc-metric-val" style={{ color: 'var(--accent-emerald)' }}>
            ₹{results.costSaved.toLocaleString()}
          </div>
        </div>

        <div className="calc-metric-card">
          <p style={{ fontSize: '0.84rem' }}>FormAnchor Pack Cost</p>
          <div className="calc-metric-val" style={{ color: 'var(--accent-teal)' }}>
            ₹{results.packCost}
          </div>
        </div>
      </div>

      {/* Recommendation Banner */}
      <div 
        style={{
          marginTop: 24,
          padding: '14px 20px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--primary-subtle)',
          border: '1px solid var(--primary-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          fontSize: '0.92rem',
          color: 'var(--text-primary)',
          textAlign: 'center'
        }}
      >
        <Icon name="recommend" size={18} style={{ color: 'var(--primary)' }} />
        <span>Recommended for your workload: <strong>{results.recommendedPack}</strong></span>
      </div>
    </div>
  )
}
