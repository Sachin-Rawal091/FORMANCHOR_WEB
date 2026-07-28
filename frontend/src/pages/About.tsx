import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'
import sachinAvatar from '../assets/sachin_avatar.png'

const techStack = [
  { name: 'Chrome MV3', icon: 'extension', color: 'rgba(255, 255, 255, 0.7)' },
  { name: 'TypeScript', icon: 'code', color: '#3178C6' },
  { name: 'React', icon: 'terminal', color: '#61DAFB' },
  { name: 'Vite', icon: 'bolt', color: '#BD34FE' },
  { name: 'Zustand', icon: 'memory', color: '#e0a96d' },
  { name: 'IndexedDB', icon: 'database', color: '#22D3EE' },
  { name: 'SheetJS', icon: 'table_chart', color: '#10B981' },
  { name: 'Vitest', icon: 'science', color: '#FCC72B' },
]

export default function About() {
  const containerRef = useScrollReveal()

  return (
    <div ref={containerRef}>
      <section className="page-hero fade-in-section">
        <h1><span className="gradient-text">About FormAnchor</span></h1>
        <p>Learn how FormAnchor revolutionizes form automation for teams of all sizes.</p>
      </section>

      {/* Mission */}
      <section className="section fade-in-section">
        <div className="content-card glass-card">
          <h2>Our Mission</h2>
          <p>
            FormAnchor exists to eliminate the tedious, error-prone process of manual form filling.
            We believe that no team should waste hours entering repetitive data when technology can
            do it perfectly — faster, safer, and at any scale.
          </p>
        </div>
      </section>

      {/* How It Works Pipeline */}
      <section className="section fade-in-section">
        <div className="section-header">
          <h2>How FormAnchor Works</h2>
          <p>A simple 4-step pipeline from recording to automated execution.</p>
        </div>
        <div className="pipeline">
          {[
            { icon: 'radio_button_checked', color: 'red' as const, step: '1', title: 'Record', desc: 'Record your form flow once using the built-in visual recorder.' },
            { icon: 'upload_file', color: 'blue' as const, step: '2', title: 'Upload', desc: 'Upload an Excel or CSV file with your structured data.' },
            { icon: 'play_arrow', color: 'green' as const, step: '3', title: 'Execute', desc: 'FormAnchor fills hundreds of forms automatically with zero errors.' },
            { icon: 'refresh', color: 'violet' as const, step: '4', title: 'Recover', desc: 'Smart retry handles failures, dynamic content, and page reloads.' },
          ].map((s) => (
            <div key={s.step} className="pipeline-step glass-card">
              <div className={`pipeline-icon ${s.color}`}>
                <Icon name={s.icon} size={28} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section fade-in-section">
        <div className="section-header">
          <h2>Built with Modern Technology</h2>
          <p>Production-grade tools for a production-grade extension.</p>
        </div>
        <div className="tech-grid">
          {techStack.map((tech) => (
            <div key={tech.name} className="tech-badge glass-card">
              <Icon name={tech.icon} size={18} style={{ color: tech.color }} />
              {tech.name}
            </div>
          ))}
        </div>
      </section>

      {/* Creator */}
      <section className="section fade-in-section">
        <div className="creator-card glass-card">
          <img src={sachinAvatar} alt="Sachin Rawal" className="creator-avatar" />
          <div className="creator-info">
            <span className="creator-subtitle">Created By</span>
            <h3 className="creator-name">Sachin Rawal</h3>
            <p className="creator-desc">
              Building production-grade developer tools solo. Focused on creating efficient,
              reliable software that solves real-world workflow bottlenecks through intelligent automation.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

