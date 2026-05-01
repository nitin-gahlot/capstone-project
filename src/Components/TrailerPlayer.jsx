import { useState } from 'react'
import { useTrailer } from '../hooks/useTrailer'

function TrailerPlayer({ movieId, movieTitle, buttonStyle }) {
  const { trailerKey, loading } = useTrailer(movieId)
  const [isOpen, setIsOpen] = useState(false)

  if (!loading && !trailerKey) return null

  const isPrimary = buttonStyle === 'primary'

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: isPrimary ? '#e63946' : 'rgba(255,255,255,0.12)',
          color: '#fff',
          border: isPrimary ? 'none' : '1px solid rgba(255,255,255,0.25)',
          padding: '12px 28px',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: isPrimary ? '600' : '400',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        {loading ? (
          <span>Loading...</span>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="white">
              <path d="M2 2l12 6-12 6V2z" />
            </svg>
            {isPrimary ? 'Play Now' : 'Watch Trailer'}
          </>
        )}
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.95)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '960px',
              background: '#0a0a0f',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div>
                <p
                  style={{
                    color: '#e63946',
                    fontSize: '11px',
                    marginBottom: '2px',
                    letterSpacing: '1px',
                  }}
                >
                  Official Trailer
                </p>
                <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>
                  {movieTitle}
                </h3>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
                title={movieTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </div>

            <div
              style={{
                padding: '12px 20px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <p style={{ color: '#555', fontSize: '12px' }}>
                Bahar click karo ya ✕ dabao band karne ke liye
              </p>

              {/* ✅ FIXED PART */}
              <a
                href={`https://www.youtube.com/watch?v=${trailerKey}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#e63946',
                  fontSize: '12px',
                  textDecoration: 'none',
                }}
              >
                YouTube pe dekho ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TrailerPlayer