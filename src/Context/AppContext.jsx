import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    const stored = localStorage.getItem('streamify_watchlist')
    return stored ? JSON.parse(stored) : []
  })

  // Dark mode bhi localStorage se lo
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('streamify_darkmode')
    return stored ? JSON.parse(stored) : true
  })

  useEffect(() => {
    localStorage.setItem('streamify_watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  // Dark mode bhi save karo
  useEffect(() => {
    localStorage.setItem('streamify_darkmode', JSON.stringify(darkMode))
  }, [darkMode])

  const addToWatchlist = (movie) => {
    setWatchlist(prev => [...prev, movie])
  }

  const removeFromWatchlist = (id) => {
    setWatchlist(prev => prev.filter(m => m.id !== id))
  }

  const isInWatchlist = (id) => {
    return watchlist.some(m => m.id === id)
  }

  return (
    <AppContext.Provider value={{
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist,
      darkMode,
      setDarkMode
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)