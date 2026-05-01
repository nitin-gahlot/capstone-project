function HeroBanner({ movie }) {
  const BACKDROP = 'https://image.tmdb.org/t/p/original'
  if (!movie) return null

  return (
    <div style={{
      position: 'relative',
      height: '400px',
      background: movie.backdrop_path
        ? `url(${BACKDROP + movie.backdrop_path}) center/cover`
        : '#1a0010'
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(10,10,15,0.95) 40%, transparent)'
      }} />
      <div style={{ position: 'absolute', bottom: '40px', left: '40px' }}>
        <h1 style={{ color: '#fff', fontSize: '42px', marginBottom: '8px' }}>{movie.title}</h1>
        <p style={{ color: '#aaa', fontSize: '14px', maxWidth: '400px', marginBottom: '16px' }}>
          {movie.overview?.slice(0, 120)}...
        </p>
        <button style={{
          background: '#e63946', color: '#fff',
          border: 'none', padding: '10px 24px',
          borderRadius: '4px', fontSize: '14px', cursor: 'pointer'
        }}>
          ▶ Play Now
        </button>
      </div>
    </div>
  )
}

export default HeroBanner