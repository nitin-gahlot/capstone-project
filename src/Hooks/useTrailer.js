import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export function useTrailer(movieId) {
  const [trailerKey, setTrailerKey] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!movieId) return

    setLoading(true)
    fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
      .then(res => res.json())
      .then(data => {
        // YouTube pe jo official trailer ho woh lo
        const trailer = data.results?.find(
          v => v.type === 'Trailer' && v.site === 'YouTube'
        )
        // Trailer nahi mila toh koi bhi video lo
        const fallback = data.results?.find(v => v.site === 'YouTube')
        setTrailerKey(trailer?.key || fallback?.key || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [movieId])

  return { trailerKey, loading }
}