import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'

export default function License() {
  const containerRef = useScrollReveal()

  return (
    <div ref={containerRef} style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Page Hero */}
      <section className="page-hero fade-in-section">
        <h1>
          <span className="gradient-text">License Terms</span>
        </h1>
        <p>FormPilot is released under the permissive open-source MIT License. Read the full terms below.</p>
      </section>

      {/* Main License Card */}
      <section className="section fade-in-section" style={{ marginBottom: 128 }}>
        <div className="content-card glass-card" style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="gavel" className="text-primary" />
            MIT License (MIT)
          </h3>
          <pre className="code-block">
{`Copyright (c) ${new Date().getFullYear()} Sachin Rawal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
          </pre>
        </div>

        {/* Simplification Explanation */}
        <div className="content-card glass-card">
          <h2>What This Means</h2>
          <p>The MIT License is a short, simple permissive open-source license. In plain English, you are allowed to:</p>
          <ul>
            <li>
              <Icon name="check_circle" className="icon" />
              <div>
                <strong>Commercial Use:</strong> You can run FormPilot for any personal or company-wide form automation task.
              </div>
            </li>
            <li>
              <Icon name="check_circle" className="icon" />
              <div>
                <strong>Modification & Distribution:</strong> You can fork the repository, modify the recorder or executor engine, and distribute your modified version.
              </div>
            </li>
            <li>
              <Icon name="check_circle" className="icon" />
              <div>
                <strong>Attribution Required:</strong> You must retain the original copyright and permission notice in any copies or substantial portions of the software.
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
