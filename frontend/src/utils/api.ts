/**
 * Resolves the full API URL for frontend network requests.
 * Uses VITE_API_BASE_URL if configured, or defaults to local dev server (http://localhost:8000) / relative path.
 */
export function getApiUrl(endpoint: string): string {
  const envBase = import.meta.env.VITE_API_BASE_URL
  const isLocal = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname)
  
  const baseUrl = envBase || (isLocal ? 'http://localhost:8000' : '')
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  
  return `${baseUrl}${formattedEndpoint}`
}

/**
 * Standard email format validation utility.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}
