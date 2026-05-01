import SkeletonCard from './SkeletonCard'

function SkeletonRow() {
  return (
    <div style={{ padding: '0 32px 32px' }}>
      {/* Title Skeleton */}
      <div style={{
        height: '20px',
        width: '200px',
        borderRadius: '4px',
        background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        marginBottom: '16px',
      }} />

      {/* Cards Row */}
      <div style={{ display: 'flex', gap: '12px', overflow: 'hidden' }}>
        {[...Array(7)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
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

export default SkeletonRow