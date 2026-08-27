import Icon from '../components/Icon'

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-code">404</div>
      <h2 style={{ marginBottom: 12 }}>Page not found</h2>
      <p style={{ marginBottom: 28, maxWidth: 400, margin: '0 auto 28px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a href="#/" className="btn btn-primary">
        <Icon name="home" size={16} /> Back to Home
      </a>
    </div>
  )
}
