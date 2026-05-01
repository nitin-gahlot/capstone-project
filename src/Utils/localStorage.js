export const saveWatchlist = (list) => {
  localStorage.setItem('streamify_watchlist', JSON.stringify(list))
}

export const getWatchlist = () => {
  const stored = localStorage.getItem('streamify_watchlist')
  return stored ? JSON.parse(stored) : []
}