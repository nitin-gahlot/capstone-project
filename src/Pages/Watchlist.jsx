import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useApp()
  const navigate = useNavigate()
  const IMG = 'https://image.tmdb.org/t/p/w300'

  return (
    <div style={{
      background: 'var(--bg-primary)',
      minHeight: '100vh',
      padding: '32px'
    }}>
      <h1 style={{
        color: 'var(--text-primary)',
        marginBottom: '8px',
        fontSize: '28px',
        fontWeight: '700'
      }}>
        ❤️ My Watchlist
      </h1>
      <p style={{
        color: 'var(--text-secondary)',
        marginBottom: '32px',
        fontSize: '14px'
      }}>
        {watchlist.length} movies saved
      </p>

      {watchlist.length === 0 ? (
        <div style={{
          textAlign: 'center',
          marginTop: '80px'
        }}>
          <p style={{ fontSize: '64px', marginBottom: '16px' }}>🎬</p>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '20px',
            marginBottom: '8px',
            fontWeight: '500'
          }}>
            Watchlist khali hai!
          </p>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '14px',
            marginBottom: '24px'
          }}>
            Apni pasandida movies add karo
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              background: '#e63946',
              color: '#fff',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              fontWeight: '500',
              boxShadow: '0 4px 15px rgba(230,57,70,0.4)'
            }}
          >
            Movies Browse karo
          </button>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          {watchlist.map(movie => (
            <div
              key={movie.id}
              style={{
                width: '150px',
                background: 'var(--bg-secondary)',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ position: 'relative' }}>
                <img
                  src={movie.poster_path ? IMG + movie.poster_path : ''}
                  alt={movie.title}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  style={{
                    width: '100%',
                    display: 'block',
                    cursor: 'pointer'
                  }}
                />
                {/* Rating Badge */}
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'rgba(0,0,0,0.75)',
                  color: '#f4c542',
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '3px 7px',
                  borderRadius: '6px',
                  backdropFilter: 'blur(4px)'
                }}>
                  ⭐ {movie.vote_average?.toFixed(1)}
                </div>
              </div>

              <div style={{ padding: '10px' }}>
                <p style={{
                  color: 'var(--text-primary)',
                  fontSize: '12px',
                  fontWeight: '500',
                  marginBottom: '4px',
                  lineHeight: '1.4'
                }}>
                  {movie.title}
                </p>
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '11px',
                  marginBottom: '10px'
                }}>
                  {movie.release_date?.split('-')[0]}
                </p>
                <button
                  onClick={() => removeFromWatchlist(movie.id)}
                  style={{
                    width: '100%',
                    background: 'rgba(230,57,70,0.1)',
                    color: '#e63946',
                    border: '1px solid rgba(230,57,70,0.25)',
                    padding: '7px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = '#e63946'
                    e.target.style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = 'rgba(230,57,70,0.1)'
                    e.target.style.color = '#e63946'
                  }}
                >
                  🗑 Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Watchlist