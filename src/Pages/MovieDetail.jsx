import { useParams, useNavigate } from 'react-router-dom'
import { useFetch } from '../Hooks/useFetch'
import { useApp } from '../context/AppContext'
import { useTrailer } from '../Hooks/useTrailer'
import { useState } from 'react'

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useApp()
  const { data: movie, loading, error } = useFetch(`/movie/${id}`)
  const { trailerKey } = useTrailer(Number(id))
  const [showTrailer, setShowTrailer] = useState(false)

  const IMG = 'https://image.tmdb.org/t/p/w500'
  const BACKDROP = 'https://image.tmdb.org/t/p/original'

  const toggleWatchlist = () => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie)
    }
  }

  if (loading) return (
    <div style={{
      background: '#0a0a0f', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexDirection: 'column', gap: '16px',
    }}>
      <div style={{
        width: '48px', height: '48px',
        border: '3px solid rgba(230,57,70,0.2)',
        borderTop: '3px solid #e63946',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{ color: '#888', fontSize: '14px' }}>Loading movie...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  if (error) return (
    <div style={{
      background: '#0a0a0f', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexDirection: 'column', gap: '16px',
    }}>
      <p style={{ color: '#e63946', fontSize: '18px' }}>Kuch galat ho gaya!</p>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: '#e63946', color: '#fff',
          border: 'none', padding: '10px 24px',
          borderRadius: '4px', cursor: 'pointer', fontSize: '14px',
        }}
      >
        Wapas jao
      </button>
    </div>
  )

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>

      <div style={{
        height: '420px',
        background: movie.backdrop_path
          ? `url(${BACKDROP + movie.backdrop_path}) center/cover no-repeat`
          : '#1a1a2e',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, #0a0a0f 0%, rgba(10,10,15,0.5) 60%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(10,10,15,0.8) 0%, transparent 60%)',
        }} />
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute', top: '20px', left: '24px',
            background: 'rgba(0,0,0,0.5)', color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '8px 16px', borderRadius: '4px',
            cursor: 'pointer', fontSize: '13px',
            display: 'flex', alignItems: 'center', gap: '6px',
            zIndex: 10,
          }}
        >
          Back
        </button>
      </div>

      <div style={{
        display: 'flex', gap: '36px',
        padding: '0 40px 60px',
        marginTop: '-140px', position: 'relative', zIndex: 5,
        flexWrap: 'wrap',
      }}>

        <div style={{ flexShrink: 0 }}>
          <img
            src={movie.poster_path ? IMG + movie.poster_path : ''}
            alt={movie.title}
            style={{
              width: '200px', borderRadius: '10px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)', display: 'block',
            }}
          />
        </div>

        <div style={{ flex: 1, minWidth: '280px', paddingTop: '60px' }}>

          <h1 style={{
            color: '#fff', fontSize: '36px',
            fontWeight: '700', marginBottom: '10px', lineHeight: 1.2,
          }}>
            {movie.title}
          </h1>

          {movie.tagline ? (
            <p style={{
              color: '#e63946', fontSize: '14px',
              fontStyle: 'italic', marginBottom: '14px',
            }}>
              {movie.tagline}
            </p>
          ) : null}

          <div style={{
            display: 'flex', gap: '12px',
            marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center',
          }}>
            <span style={{
              background: 'rgba(244,197,66,0.15)', color: '#f4c542',
              padding: '4px 10px', borderRadius: '4px',
              fontSize: '13px', fontWeight: '600',
            }}>
              {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
            </span>
            <span style={{ color: '#888', fontSize: '13px' }}>
              {movie.release_date ? movie.release_date.split('-')[0] : ''}
            </span>
            <span style={{ color: '#888', fontSize: '13px' }}>
              {movie.runtime ? movie.runtime + ' min' : ''}
            </span>
            <span style={{
              background: 'rgba(74,222,128,0.1)', color: '#4ade80',
              fontSize: '11px', padding: '3px 8px',
              borderRadius: '4px', fontWeight: '600',
            }}>
              HD
            </span>
          </div>

          <div style={{
            display: 'flex', gap: '8px',
            marginBottom: '20px', flexWrap: 'wrap',
          }}>
            {movie.genres ? movie.genres.map(g => (
              <span key={g.id} style={{
                background: 'rgba(230,57,70,0.12)', color: '#e63946',
                padding: '5px 14px', borderRadius: '20px',
                fontSize: '12px', border: '1px solid rgba(230,57,70,0.25)',
              }}>
                {g.name}
              </span>
            )) : null}
          </div>

          <p style={{
            color: '#bbb', lineHeight: '1.8',
            maxWidth: '600px', marginBottom: '28px', fontSize: '14px',
          }}>
            {movie.overview}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => trailerKey && setShowTrailer(true)}
              style={{
                background: '#e63946', color: '#fff',
                border: 'none', padding: '12px 28px',
                borderRadius: '4px', fontSize: '14px',
                cursor: 'pointer', fontWeight: '600',
                display: 'flex', alignItems: 'center', gap: '8px',
                opacity: trailerKey ? 1 : 0.6,
              }}
            >
              Play Now
            </button>

            <button
              onClick={() => trailerKey && setShowTrailer(true)}
              style={{
                background: 'rgba(255,255,255,0.1)', color: '#fff',
                border: '1px solid rgba(255,255,255,0.25)',
                padding: '12px 24px', borderRadius: '4px',
                fontSize: '14px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              Watch Trailer
            </button>

            <button
              onClick={toggleWatchlist}
              style={{
                background: isInWatchlist(movie.id)
                  ? 'rgba(230,57,70,0.2)' : 'rgba(255,255,255,0.08)',
                color: isInWatchlist(movie.id) ? '#e63946' : '#fff',
                border: '1px solid',
                borderColor: isInWatchlist(movie.id)
                  ? '#e63946' : 'rgba(255,255,255,0.2)',
                padding: '12px 24px', borderRadius: '4px',
                fontSize: '14px', cursor: 'pointer',
              }}
            >
              {isInWatchlist(movie.id) ? 'Saved' : 'Watchlist'}
            </button>
          </div>

          <div style={{
            marginTop: '32px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px', maxWidth: '560px',
          }}>
            {movie.budget > 0 ? (
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px', padding: '12px',
              }}>
                <p style={{ color: '#666', fontSize: '11px', marginBottom: '4px' }}>BUDGET</p>
                <p style={{ color: '#f0eee8', fontSize: '14px', fontWeight: '500' }}>
                  {'$' + (movie.budget / 1000000).toFixed(0) + 'M'}
                </p>
              </div>
            ) : null}

            {movie.revenue > 0 ? (
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px', padding: '12px',
              }}>
                <p style={{ color: '#666', fontSize: '11px', marginBottom: '4px' }}>REVENUE</p>
                <p style={{ color: '#f0eee8', fontSize: '14px', fontWeight: '500' }}>
                  {'$' + (movie.revenue / 1000000).toFixed(0) + 'M'}
                </p>
              </div>
            ) : null}

            {movie.vote_count > 0 ? (
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px', padding: '12px',
              }}>
                <p style={{ color: '#666', fontSize: '11px', marginBottom: '4px' }}>VOTES</p>
                <p style={{ color: '#f0eee8', fontSize: '14px', fontWeight: '500' }}>
                  {movie.vote_count ? movie.vote_count.toLocaleString() : '0'}
                </p>
              </div>
            ) : null}

            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px', padding: '12px',
            }}>
              <p style={{ color: '#666', fontSize: '11px', marginBottom: '4px' }}>STATUS</p>
              <p style={{ color: '#4ade80', fontSize: '14px', fontWeight: '500' }}>
                {movie.status}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showTrailer && trailerKey ? (
        <div
          onClick={() => setShowTrailer(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.95)',
            zIndex: 1000, display: 'flex',
            alignItems: 'center', justifyContent: 'center', padding: '20px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: '900px',
              background: '#0a0a0f', borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '16px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div>
                <p style={{ color: '#888', fontSize: '11px', marginBottom: '2px' }}>
                  Official Trailer
                </p>
                <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>
                  {movie.title}
                </h3>
              </div>
              <button
                onClick={() => setShowTrailer(false)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff', width: '32px', height: '32px',
                  borderRadius: '50%', cursor: 'pointer', fontSize: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                X
              </button>
            </div>

            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={'https://www.youtube.com/embed/' + trailerKey + '?autoplay=1&rel=0'}
                title={movie.title + ' Trailer'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '100%', border: 'none',
                }}
              />
            </div>

            <div style={{
              padding: '12px 20px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <p style={{ color: '#555', fontSize: '12px' }}>
                Bahar click karo band karne ke liye
              </p>
              <p style={{ color: '#e63946', fontSize: '12px' }}>
                youtube.com/watch?v={trailerKey}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  )
}

export default MovieDetail