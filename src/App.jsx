import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetail from './pages/MovieDetail'
import Watchlist from './pages/Watchlist'

function App() {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App