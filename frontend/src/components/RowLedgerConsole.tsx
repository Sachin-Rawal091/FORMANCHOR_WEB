import { useState, useEffect, useRef, useMemo } from 'react'
import Icon from './Icon'

interface LedgerRow {
  time: string
  rowId: string
  total: number
  portal: string
  step: string
  stepTotal: number
  action: string
  status: 'success' | 'pending' | 'error'
}

const DEMO_ROWS: readonly LedgerRow[] = [
  { time: '14:20:01', rowId: '38', total: 100, portal: 'saral.gov.in', step: '1', stepTotal: 6, action: 'TextField [name]', status: 'success' },
  { time: '14:20:03', rowId: '38', total: 100, portal: 'saral.gov.in', step: '2', stepTotal: 6, action: 'TextField [father_name]', status: 'success' },
  { time: '14:20:05', rowId: '38', total: 100, portal: 'saral.gov.in', step: '3', stepTotal: 6, action: 'VirtualSelect [district]', status: 'success' },
  { time: '14:20:08', rowId: '38', total: 100, portal: 'saral.gov.in', step: '4', stepTotal: 6, action: 'DatePicker [dob]', status: 'success' },
  { time: '14:20:11', rowId: '38', total: 100, portal: 'saral.gov.in', step: '5', stepTotal: 6, action: 'FileUpload [photo]', status: 'success' },
  { time: '14:20:14', rowId: '38', total: 100, portal: 'saral.gov.in', step: '6', stepTotal: 6, action: 'SubmitVerifier', status: 'success' },
  { time: '14:20:17', rowId: '39', total: 100, portal: 'saral.gov.in', step: '1', stepTotal: 6, action: 'TextField [name]', status: 'success' },
  { time: '14:20:19', rowId: '39', total: 100, portal: 'saral.gov.in', step: '2', stepTotal: 6, action: 'TextField [father_name]', status: 'success' },
  { time: '14:20:22', rowId: '39', total: 100, portal: 'saral.gov.in', step: '3', stepTotal: 6, action: 'VirtualSelect [district]', status: 'pending' },
  { time: '14:20:25', rowId: '40', total: 100, portal: 'edistrict.up.gov.in', step: '1', stepTotal: 8, action: 'TextField [applicant]', status: 'success' },
  { time: '14:20:28', rowId: '40', total: 100, portal: 'edistrict.up.gov.in', step: '2', stepTotal: 8, action: 'RadioGroup [gender]', status: 'success' },
  { time: '14:20:31', rowId: '40', total: 100, portal: 'edistrict.up.gov.in', step: '3', stepTotal: 8, action: 'Checkbox [terms]', status: 'pending' },
  { time: '14:20:34', rowId: '41', total: 100, portal: 'pmkisan.gov.in', step: '1', stepTotal: 5, action: 'TextField [aadhaar]', status: 'success' },
  { time: '14:20:37', rowId: '41', total: 100, portal: 'pmkisan.gov.in', step: '2', stepTotal: 5, action: 'TextField [mobile]', status: 'success' },
  { time: '14:20:39', rowId: '42', total: 100, portal: 'pmkisan.gov.in', step: '1', stepTotal: 5, action: 'SmartWait [page_load]', status: 'pending' },
]

const STATUS_ICONS: Record<string, string> = {
  success: 'check_circle',
  pending: 'pending',
  error: 'error',
}

export default function RowLedgerConsole() {
  const [stepIndex, setStepIndex] = useState(4)
  const [isRunning, setIsRunning] = useState(true)
  const bodyRef = useRef<HTMLDivElement>(null)

  // Advance rows predictably on an interval without ref side-effects
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setStepIndex((prev) => (prev >= DEMO_ROWS.length ? 4 : prev + 1))
    }, 1800)

    return () => clearInterval(interval)
  }, [isRunning])

  // Derive visible rows safely (capped at last 5 for a clean fixed-height console)
  const visibleRows = useMemo(() => {
    const safeCount = Math.max(1, Math.min(stepIndex, DEMO_ROWS.length))
    return DEMO_ROWS.slice(0, safeCount).slice(-5)
  }, [stepIndex])

  // Auto-scroll ledger body
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [visibleRows])

  const currentRow = visibleRows.length > 0 ? visibleRows[visibleRows.length - 1] : DEMO_ROWS[0]
  const progress = currentRow ? (parseInt(currentRow.rowId, 10) / (currentRow.total || 100)) * 100 : 0

  return (
    <div className="ledger-console">
      {/* Chrome Bar */}
      <div className="ledger-chrome">
        <div className="ledger-dots">
          <div className="ledger-dot red" />
          <div className="ledger-dot yellow" />
          <div className="ledger-dot green" />
        </div>
        <span className="ledger-title">FormAnchor Execution Engine</span>
        <span className="ledger-status">
          <span className="status-dot" />
          {isRunning ? 'Running' : 'Paused'}
        </span>
      </div>

      {/* Ledger Body */}
      <div className="ledger-body" ref={bodyRef}>
        {visibleRows.map((row, i) => {
          if (!row) return null
          return (
            <div className="ledger-row" key={`${row.rowId}-${row.step}-${i}`}>
              <span className="timestamp">[{row.time}]</span>
              <span className="row-id">ROW {row.rowId}/{row.total}</span>
              <span className="portal">{row.portal}</span>
              <span className="step-info">Step {row.step}/{row.stepTotal} [{row.action}]</span>
              <span className={`status-icon ${row.status}`}>
                <Icon name={STATUS_ICONS[row.status] || 'info'} size={14} />
              </span>
            </div>
          )
        })}
      </div>

      {/* Progress Bar */}
      <div style={{ padding: '0 20px 16px' }}>
        <div className="ledger-progress-bar">
          <div className="ledger-progress-track">
            <div className="ledger-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="ledger-progress-label">
            {currentRow ? `${currentRow.rowId}/${currentRow.total} rows` : '0/0'} · {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="ledger-controls">
        <button
          className={`ledger-ctrl-btn ${isRunning ? 'active' : ''}`}
          onClick={() => setIsRunning(!isRunning)}
          title={isRunning ? 'Pause' : 'Resume'}
          type="button"
        >
          <Icon name={isRunning ? 'pause' : 'play_arrow'} size={18} />
        </button>
        <button
          className="ledger-ctrl-btn"
          title="Skip Row"
          type="button"
          onClick={() => setStepIndex((prev) => (prev >= DEMO_ROWS.length ? 4 : prev + 1))}
        >
          <Icon name="skip_next" size={18} />
        </button>
        <button
          className="ledger-ctrl-btn"
          title="Reset"
          type="button"
          onClick={() => setStepIndex(4)}
        >
          <Icon name="restart_alt" size={18} />
        </button>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-muted)' }}>
          engine v1.0.0 · local sandbox · AES-256
        </span>
      </div>
    </div>
  )
}
