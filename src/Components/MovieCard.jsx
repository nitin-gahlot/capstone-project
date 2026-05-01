import { useNavigate } from 'react-router-dom'

function MovieCard({ movie }) {
  const navigate = useNavigate()
  const IMG = 'https://image.tmdb.org/t/p/w300'

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      style={{
        cursor: 'pointer',
        borderRadius: '10px',
        overflow: 'hidden',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        width: '150px',
        flexShrink: 0,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={movie.poster_path ? IMG + movie.poster_path : ''}
          alt={movie.title}
          style={{ width: '100%', display: 'block' }}
        />
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
          lineHeight: '1.4',
          marginBottom: '4px'
        }}>
          {movie.title}
        </p>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '11px'
        }}>
          {movie.release_date?.split('-')[0]}
        </p>
      </div>
    </div>
  )
}

export default MovieCard