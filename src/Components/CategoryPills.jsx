import { useState } from 'react'

const categories = ['All', 'Action', 'Sci-Fi', 'Drama', 'Thriller', 'Comedy', 'Horror']

function CategoryPills({ onSelect }) {
  const [active, setActive] = useState('All')

  const handleClick = (cat) => {
    setActive(cat)
    onSelect(cat)
  }

  return (
    <div style={{ display: 'flex', gap: '8px', padding: '16px 32px', overflowX: 'auto' }}>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          style={{
            padding: '6px 16px',
            borderRadius: '20px',
            border: '1px solid',
            borderColor: active === cat ? '#e63946' : 'rgba(255,255,255,0.2)',
            background: active === cat ? '#e63946' : 'transparent',
            color: active === cat ? '#fff' : '#888',
            fontSize: '13px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default CategoryPills