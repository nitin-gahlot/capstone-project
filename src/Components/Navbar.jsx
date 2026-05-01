import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useEffect } from 'react'

function Navbar() {
  const { darkMode, setDarkMode, watchlist } = useApp()
  const location = useLocation()

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    )
  }, [darkMode])

  const navLinks = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Movies', path: '/movies', icon: '🎬' },
    { name: 'Watchlist', path: '/watchlist', icon: '❤️' },
  ]

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 32px',
      height: '64px',
      background: darkMode
        ? 'rgba(10, 10, 15, 0.85)'
        : 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid',
      borderColor: darkMode
        ? 'rgba(255,255,255,0.07)'
        : 'rgba(0,0,0,0.07)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>

      {/* Logo */}
      <Link to="/" style={{
        color: '#e63946',
        fontSize: '22px',
        fontWeight: '800',
        letterSpacing: '4px',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span style={{
          background: '#e63946',
          color: '#fff',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: '700',
          letterSpacing: '2px'
        }}>
          STREAM
        </span>
        <span style={{
          color: darkMode ? '#f0eee8' : '#111',
          letterSpacing: '2px'
        }}>
          IFY
        </span>
      </Link>

      {/* Nav Links */}
      <div style={{
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        background: darkMode
          ? 'rgba(255,255,255,0.05)'
          : 'rgba(0,0,0,0.05)',
        padding: '4px',
        borderRadius: '12px',
        border: '1px solid',
        borderColor: darkMode
          ? 'rgba(255,255,255,0.08)'
          : 'rgba(0,0,0,0.08)',
      }}>
        {navLinks.map(link => {
          const isActive = location.pathname === link.path
          return (
            <Link
              key={link.name}
              to={link.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: isActive ? '600' : '400',
                textDecoration: 'none',
                position: 'relative',
                transition: 'all 0.2s ease',
                background: isActive ? '#e63946' : 'transparent',
                color: isActive
                  ? '#ffffff'
                  : darkMode ? '#aaaaaa' : '#666666',
                boxShadow: isActive
                  ? '0 4px 15px rgba(230, 57, 70, 0.4)'
                  : 'none',
              }}
            >
              <span style={{ fontSize: '14px' }}>{link.icon}</span>
              {link.name}

              {/* Watchlist Badge */}
              {link.name === 'Watchlist' && watchlist.length > 0 && (
                <span style={{
                  background: isActive ? '#fff' : '#e63946',
                  color: isActive ? '#e63946' : '#fff',
                  fontSize: '10px',
                  fontWeight: '700',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '2px'
                }}>
                  {watchlist.length}
                </span>
              )}
            </Link>
          )
        })}
      </div>

      {/* Right Side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: darkMode
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(0,0,0,0.06)',
            border: '1px solid',
            borderColor: darkMode
              ? 'rgba(255,255,255,0.12)'
              : 'rgba(0,0,0,0.1)',
            borderRadius: '10px',
            padding: '8px 14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: darkMode ? '#f0eee8' : '#111',
            fontSize: '12px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
          }}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>

        {/* Avatar */}
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #e63946, #c1121f)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '14px',
          fontWeight: '700',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(230, 57, 70, 0.4)',
          border: '2px solid rgba(230,57,70,0.3)'
        }}>
          N
        </div>

      </div>
    </nav>
  )
}

export default Navbar