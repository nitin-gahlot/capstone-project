function SkeletonCard() {
  return (
    <div style={{
      width: '150px',
      flexShrink: 0,
      borderRadius: '8px',
      overflow: 'hidden',
      background: 'var(--bg-secondary)',
    }}>
      {/* Poster Skeleton */}
      <div style={{
        width: '150px',
        height: '220px',
        background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }} />

      {/* Title Skeleton */}
      <div style={{ padding: '8px' }}>
        <div style={{
          height: '12px',
          width: '80%',
          borderRadius: '4px',
          background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
          marginBottom: '6px',
        }} />
        <div style={{
          height: '10px',
          width: '50%',
          borderRadius: '4px',
          background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }} />
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  )
}

export default SkeletonCard