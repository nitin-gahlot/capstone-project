import { useState, useEffect } from 'react'
import { useFetch } from '../Hooks/useFetch'
import HeroBanner from '../Components/HeroBanner'
import MovieCard from '../Components/MovieCard'
import SkeletonBanner from '../Components/SkeletonBanner'
import SkeletonRow from '../Components/SkeletonRow'

const GENRES = [
  { name: 'All', id: null },
  { name: 'Action', id: 28 },
  { name: 'Sci-Fi', id: 878 },
  { name: 'Drama', id: 18 },
  { name: 'Thriller', id: 53 },
  { name: 'Comedy', id: 35 },
  { name: 'Horror', id: 27 },
]

function Home() {
  const [activeGenre, setActiveGenre] = useState({ name: 'All', id: null })
  const [genreMovies, setGenreMovies] = useState([])
  const [genreLoading, setGenreLoading] = useState(false)

  const { data: trendingData, loading: trendingLoading } = useFetch('/trending/movie/week')
  const { data: popularData, loading: popularLoading } = useFetch('/movie/popular')

  const trending = trendingData?.results || []
  const popular = popularData?.results || []
  const heroMovie = trending[0]

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY

  useEffect(() => {
    if (activeGenre.id === null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setGenreMovies([])
      return
    }
    setGenreLoading(true)
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${activeGenre.id}&sort_by=popularity.desc`
    )
      .then(res => res.json())
      .then(data => {
        setGenreMovies(data.results || [])
        setGenreLoading(false)
      })
      .catch(() => setGenreLoading(false))
  }, [activeGenre, API_KEY])

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* Hero Banner */}
      {trendingLoading ? <SkeletonBanner /> : <HeroBanner movie={heroMovie} />}

      {/* Genre Pills */}
      <div style={{
        display: 'flex',
        gap: '8px',
        padding: '20px 32px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        {GENRES.map(genre => (
          <button
            key={genre.name}
            onClick={() => setActiveGenre(genre)}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: activeGenre.name === genre.name
                ? '#e63946' : 'rgba(255,255,255,0.15)',
              background: activeGenre.name === genre.name
                ? '#e63946' : 'transparent',
              color: activeGenre.name === genre.name
                ? '#fff' : 'var(--text-secondary)',
              fontSize: '13px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Genre Movies */}
      {activeGenre.id !== null && (
        <div style={{ padding: '0 32px 32px' }}>
          <h2 style={{
            color: 'var(--text-primary)',
            marginBottom: '16px',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            {activeGenre.name} Movies
            <span style={{
              background: 'rgba(230,57,70,0.15)',
              color: '#e63946',
              fontSize: '12px',
              padding: '2px 10px',
              borderRadius: '20px',
            }}>
              {genreMovies.length} movies
            </span>
          </h2>

          {/* Genre Skeleton */}
          {genreLoading ? (
            <div style={{ display: 'flex', gap: '12px', overflow: 'hidden' }}>
              {[...Array(7)].map((_, i) => (
                <div key={i} style={{
                  width: '150px',
                  height: '220px',
                  flexShrink: 0,
                  borderRadius: '8px',
                  background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite',
                }} />
              ))}
            </div>
          ) : (
            <div style={{
              display: 'flex',
              gap: '12px',
              overflowX: 'auto',
              paddingBottom: '8px',
              scrollbarWidth: 'none',
            }}>
              {genreMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Trending — sirf All mein */}
      {activeGenre.id === null && (
        <>
          {trendingLoading
            ? <SkeletonRow />
            : (
              <div style={{ padding: '0 32px 32px' }}>
                <h2 style={{
                  color: 'var(--text-primary)',
                  marginBottom: '16px',
                  fontSize: '18px',
                }}>
                  🔥 Trending This Week
                </h2>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  overflowX: 'auto',
                  paddingBottom: '8px',
                  scrollbarWidth: 'none',
                }}>
                  {trending.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            )}

          {popularLoading
            ? <SkeletonRow />
            : (
              <div style={{ padding: '0 32px 32px' }}>
                <h2 style={{
                  color: 'var(--text-primary)',
                  marginBottom: '16px',
                  fontSize: '18px',
                }}>
                  ⭐ Popular Movies
                </h2>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  overflowX: 'auto',
                  paddingBottom: '8px',
                  scrollbarWidth: 'none',
                }}>
                  {popular.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            )}
        </>
      )}

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

    </div>
  )
}

export default Home