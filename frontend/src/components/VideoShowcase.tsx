import { useState, useRef } from 'react'

export default function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="video-wrapper">
      <div className="video-container">
        <video
          ref={videoRef}
          src="/media/demo.mp4"
          preload="none"
          controls={isPlaying}
          playsInline
          style={{ objectFit: 'cover' }}
        />
        
        {!isPlaying && (
          <div className="video-overlay" onClick={handlePlayClick}>
            <img 
              src="/media/demo.gif" 
              alt="FormPilot Live Demo Preview" 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.35
              }} 
            />
            <div className="play-button" aria-label="Play Demo Video">
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span style={{
              position: 'absolute',
              bottom: '24px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              fontSize: '0.95rem',
              color: 'white',
              background: 'rgba(0,0,0,0.6)',
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              Watch FormPilot automate a 4-step wizard
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
