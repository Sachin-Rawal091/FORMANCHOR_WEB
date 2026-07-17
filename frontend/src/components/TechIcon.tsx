interface TechIconProps {
  name: string
  size?: number
  className?: string
}

export default function TechIcon({ name, size = 28, className = '' }: TechIconProps) {
  const style = { width: size, height: size }

  switch (name.toLowerCase()) {
    case 'chrome mv3':
      return (
        <svg viewBox="0 0 24 24" style={style} className={className} aria-label="Chrome">
          <path fill="#EA4335" d="M12 0a12 12 0 0 0-9.82 5.09l4.89 8.47A6 6 0 0 1 12 6h9.78A12 12 0 0 0 12 0z"/>
          <path fill="#34A853" d="M2.18 5.09A12 12 0 0 0 12 24l4.89-8.47a6 6 0 0 1-8.21-2.2L2.18 5.09z"/>
          <path fill="#FBBC05" d="M16.89 15.53A12 12 0 0 0 21.82 5.09H12a6 6 0 0 1 4.89 10.44z"/>
          <circle cx="12" cy="12" r="5.5" fill="#FFFFFF"/>
          <circle cx="12" cy="12" r="4.25" fill="#4285F4"/>
        </svg>
      )
    case 'typescript':
      return (
        <svg viewBox="0 0 256 256" style={style} className={className} aria-label="TypeScript">
          <path fill="#3178C6" d="M0 0h256v256H0z"/>
          <path fill="#FFF" d="M132.8 128.85h-33.32v94.68H75.91v-94.68h-33.32v-10.28h90.49v10.28zm83.77-10.74c6.5 1.63 11.46 4.51 16.01 9.22 2.36 2.52 5.85 7.11 6.14 8.21.08.33-11.05 7.8-17.8 11.99-.24.16-1.22-.89-2.32-2.52-3.29-4.8-6.75-6.87-12.03-7.23-7.76-.53-12.76 3.54-12.72 10.32 0 1.99.28 3.17 1.1 4.8 1.71 3.54 4.88 5.65 14.83 9.96 18.33 7.88 26.17 13.08 31.05 20.48 5.45 8.25 6.66 21.42 2.97 31.21-4.06 10.65-14.14 17.88-28.32 20.28-4.39.77-14.79.65-19.5-.2-10.28-1.83-20.03-6.91-26.05-13.57-2.36-2.6-6.95-9.39-6.66-9.87.12-.16 1.18-.81 2.36-1.5 1.14-.65 5.45-3.13 9.51-5.49l7.36-4.27 1.54 2.28c2.15 3.29 6.87 7.8 9.71 9.31 8.17 4.31 19.38 3.7 24.91-1.26 2.36-2.15 3.33-4.39 3.33-7.68 0-2.97-.37-4.27-1.91-6.5-1.99-2.85-6.05-5.24-17.6-10.24-13.21-5.69-18.9-9.22-24.1-14.83-3.01-3.25-5.85-8.45-7.03-12.8-.98-3.62-1.22-12.68-.45-16.34 2.72-12.76 12.35-21.66 26.25-24.3 4.51-.85 14.99-.53 19.42.57z"/>
        </svg>
      )
    case 'react':
      return (
        <svg viewBox="-11.5 -10.23 23 20.46" style={style} className={className} aria-label="React">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      )
    case 'vite + crxjs':
      return (
        <svg viewBox="0 0 77 47" style={style} className={className} aria-label="Vite + CRXJS">
          <path fill="#9135ff" d="M40.151 45.71c-.663.844-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.493c-.92 0-1.457-1.04-.92-1.788l7.479-10.471c1.07-1.498 0-3.578-1.842-3.578H15.443c-.92 0-1.456-1.04-.92-1.788l9.696-13.576c.213-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.472c-1.07 1.497 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.087.89 1.83L40.153 45.712z"/>
          <path fill="#ffc800" d="M24.389 16.61L40.049 45.712l7.321-32.682h-11.376c-1.842 0-2.912-2.08-1.842-3.578l7.48-10.472H23.864c-.364 0-.707.177-.92.474L13.248 13.03c-.536.748 0 1.788.92 1.788h12.063c1.842 0 2.912 2.081 1.842 3.578L24.389 16.61z" opacity="0.8"/>
        </svg>
      )
    case 'zustand':
      return (
        <svg viewBox="0 0 24 24" style={style} className={className} fill="none" stroke="#e0a96d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-label="Zustand">
          <path d="M12 18c-3.314 0-6-2.686-6-6 0-1.657.672-3.157 1.757-4.243.243-.243.243-.639 0-.882L6.343 5.46a2 2 0 0 1 0-2.828c.78-.78 2.047-.78 2.828 0l1.415 1.414c.243.243.639.243.882 0A5.962 5.962 0 0 1 12 4c.345 0 .686.03 1.018.087.338.058.66-.148.78-.475l.59-1.61c.42-.14.86-.21 1.312-.21 1.105 0 2 1.105 2 2.5 0 .5-.18.96-.48 1.31l-1.07 1.07c-.24.24-.24.64 0 .88A5.975 5.975 0 0 1 18 12c0 3.314-2.686 6-6 6z" />
          <circle cx="9.5" cy="10.5" r="1" fill="#e0a96d" />
          <circle cx="14.5" cy="10.5" r="1" fill="#e0a96d" />
          <path d="M11 13h2a1 1 0 0 1 1 1c0 .55-.45 1-1 1h-2a1 1 0 0 1-1-1c0-.55.45-1 1-1z" fill="#e0a96d" />
        </svg>
      )
    case 'indexeddb':
      return (
        <svg viewBox="0 0 24 24" style={style} className={className} fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="IndexedDB">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      )
    case 'sheetjs':
      return (
        <svg viewBox="0 0 24 24" style={style} className={className} fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="SheetJS">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
        </svg>
      )
    case 'vitest':
      return (
        <svg viewBox="0 0 32 32" style={style} className={className} aria-label="Vitest">
          <path fill="#FCC72B" d="M18.8 3L4.8 17.5h8.8L11 29l16.2-15h-9.8L18.8 3z"/>
          <path fill="#4ECB71" d="M13.2 3L27.2 17.5h-8.8L21 29L4.8 14h9.8L13.2 3z"/>
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" style={style} className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      )
  }
}
