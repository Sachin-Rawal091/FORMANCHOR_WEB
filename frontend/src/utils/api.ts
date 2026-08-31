/**
 * Resolves the full API URL for frontend network requests.
 * Uses VITE_API_BASE_URL if configured, or defaults to local dev server (http://localhost:8000) / relative path.
 */
export function getApiUrl(endpoint: string): string {
  const envBase = import.meta.env.VITE_API_BASE_URL
  const isLocal = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname)
  
  // On local dev, point to local FastAPI backend (or Vite proxy).
  // In production (Vercel), using relative '' routes through vercel.json rewrite proxy (/api/* -> Render backend),
  // which makes it SAME-ORIGIN and completely avoids CORS blocks!
  const baseUrl = envBase !== undefined ? envBase : (isLocal ? 'https://formpilot-web.onrender.com' : '')
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  
  return `${baseUrl}${formattedEndpoint}`
}

/**
 * Standard email format validation utility.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}
