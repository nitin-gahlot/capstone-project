import { useState } from 'react'
import { useFetch } from '../Hooks/useFetch'
import MovieCard from '../Components/MovieCard'

function Movies() {
  const [search, setSearch] = useState('')
  const { data, loading } = useFetch('/movie/popular')
  const movies = data?.results || []

  const filtered = movies.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase())
  )

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
        🎬 All Movies
      </h1>
      <p style={{
        color: 'var(--text-secondary)',
        marginBottom: '24px',
        fontSize: '14px'
      }}>
        {filtered.length} movies available
      </p>

      {/* Search Bar */}
      <div style={{
        position: 'relative',
        maxWidth: '400px',
        marginBottom: '32px'
      }}>
        <span style={{
          position: 'absolute',
          left: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '16px'
        }}>
          🔍
        </span>
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '12px 16px 12px 42px',
            color: 'var(--text-primary)',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.2s ease'
          }}
        />
      </div>

      {/* Movies Grid */}
      {loading ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {[...Array(12)].map((_, i) => (
            <div key={i} style={{
              width: '150px',
              height: '220px',
              background: 'var(--bg-secondary)',
              borderRadius: '8px',
              animation: 'pulse 1.5s infinite'
            }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign: 'center',
          marginTop: '80px'
        }}>
          <p style={{ fontSize: '48px', marginBottom: '16px' }}>🎬</p>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '18px',
            marginBottom: '8px'
          }}>
            Koi movie nahi mili
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            "{search}" ke liye koi result nahi
          </p>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {filtered.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        input::placeholder {
          color: var(--text-muted);
        }
      `}</style>
    </div>
  )
}

export default Movies