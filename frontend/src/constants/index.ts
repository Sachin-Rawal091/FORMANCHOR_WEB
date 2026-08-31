/**
 * Central configuration and constants for FormAnchor Web
 */

export const SUPPORT_EMAIL = 'sachinrawal473@gmail.com'

export const CANONICAL_URL = 'https://formanchor-web-three.vercel.app'

export const GITHUB_REPO_URL = 'https://github.com/Sachin-Rawal091/FORMANCHOR_WEB'

export const PREVIEW_FAQS = [
  { 
    q: 'What counts as "1 row" / "1 credit"?', 
    a: 'One successfully submitted form counts as 1 row credit. If a row fails validation, is skipped by the user, or encounters an error before final submission, zero credit is deducted.' 
  },
  { 
    q: 'Is my Excel data uploaded to external servers?', 
    a: 'No. Excel parsing, mapping, and execution all run 100% locally in your browser sandbox using IndexedDB with AES-256 encryption. Your form entries are never transmitted.' 
  },
  { 
    q: 'Do purchased credits expire?', 
    a: 'Never. FormAnchor uses one-time credit packs. Your credits stay in your account balance indefinitely with zero recurring subscription charges.' 
  },
  { 
    q: 'Which browsers are supported?', 
    a: 'FormAnchor is built for Google Chrome (Manifest V3) and works seamlessly on all Chromium-based browsers including Microsoft Edge, Brave, and Opera.' 
  },
]
