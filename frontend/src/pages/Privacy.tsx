import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'

export default function Privacy() {
  const containerRef = useScrollReveal()

  return (
    <div ref={containerRef} style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Page Hero */}
      <section className="page-hero fade-in-section">
        <h1>
          <span className="gradient-text">Privacy Policy</span>
        </h1>
        <p>Last updated: July 2026. Your privacy and local data control are critically important to us.</p>
      </section>

      {/* Main Content Cards */}
      <section className="section fade-in-section" style={{ marginBottom: 128 }}>
        <div className="content-card glass-card" style={{ marginBottom: 24 }}>
          <h2>Local-First Commitment</h2>
          <p>
            At FormPilot, we believe your data belongs to you. FormPilot is built to be a fully client-side, local-first browser extension. We do not harvest, collect, or transmit any user data, spreadsheet information, or recorded web flows to any external servers.
          </p>
        </div>

        <div className="content-card glass-card" style={{ marginBottom: 24 }}>
          <h2>1. Data Collection & Access</h2>
          <p>To perform its automated form-filling duties, FormPilot accesses and handles the following data locally:</p>
          <ul>
            <li>
              <Icon name="check_circle" className="icon" />
              <div>
                <strong>Recorded Workflows (Steps):</strong> captures input metadata (element IDs, tags, classes, CSS paths, associated labels, and action types) to replay them.
              </div>
            </li>
            <li>
              <Icon name="check_circle" className="icon" />
              <div>
                <strong>Uploaded Spreadsheets:</strong> parses Excel or CSV sheets in-browser to extract cell values and map them to your recorded form steps.
              </div>
            </li>
            <li>
              <Icon name="check_circle" className="icon" />
              <div>
                <strong>Web Form Fields:</strong> interacts with inputs, dropdowns, checkboxes, and buttons on target websites under your direct supervision.
              </div>
            </li>
          </ul>
        </div>

        <div className="content-card glass-card" style={{ marginBottom: 24 }}>
          <h2>2. Storage Infrastructure</h2>
          <p>All sensitive workflow files and records are stored exclusively inside your local browser environment:</p>
          <ul>
            <li>
              <Icon name="database" className="icon" />
              <div>
                <strong>IndexedDB (Storage at Rest):</strong> Saved flows, parsed Excel row data, and activity logs are saved securely inside your private sandboxed database.
              </div>
            </li>
            <li>
              <Icon name="history" className="icon" />
              <div>
                <strong>chrome.storage.session (Volatile Storage):</strong> Active execution progress, current step indices, and page-retry counts are cleared when the tab is closed.
              </div>
            </li>
            <li>
              <Icon name="cloud_off" className="icon" />
              <div>
                <strong>No Cloud Storage:</strong> FormPilot does not use any cloud servers, databases, or third-party storage providers.
              </div>
            </li>
          </ul>
        </div>

        <div className="content-card glass-card" style={{ marginBottom: 24 }}>
          <h2>3. Zero Third-Party Integrations</h2>
          <p>
            FormPilot contains no external analytics scripts, user behavior tracking, cookies, or telemetry software. Spreadsheet parsing is processed natively in-browser using the local <code>SheetJS</code> library, meaning your data files never touch any external server.
          </p>
        </div>

        <div className="content-card glass-card" style={{ marginBottom: 24 }}>
          <h2>4. Data Deletion & Ownership</h2>
          <p>
            You retain absolute ownership of all recordings and mapping structures. You can delete all persistent data at any time via the extension's **Settings Panel** or by uninstalling the extension from your browser.
          </p>
        </div>

        <div className="content-card glass-card">
          <h2>5. Contact Information</h2>
          <p>For any questions regarding our privacy practices or local-first architecture, please contact us at:</p>
          <ul>
            <li>
              <Icon name="mail" className="icon" />
              <div>privacy@formpilot.dev</div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
