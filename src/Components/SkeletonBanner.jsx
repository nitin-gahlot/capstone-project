function SkeletonBanner() {
  return (
    <div style={{
      height: '400px',
      background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '40px',
    }}>
      <div>
        {/* Badge Skeleton */}
        <div style={{
          height: '20px',
          width: '120px',
          borderRadius: '4px',
          background: 'rgba(255,255,255,0.08)',
          marginBottom: '12px',
        }} />

        {/* Title Skeleton */}
        <div style={{
          height: '48px',
          width: '320px',
          borderRadius: '6px',
          background: 'rgba(255,255,255,0.08)',
          marginBottom: '12px',
        }} />

        {/* Meta Skeleton */}
        <div style={{
          height: '14px',
          width: '200px',
          borderRadius: '4px',
          background: 'rgba(255,255,255,0.08)',
          marginBottom: '16px',
        }} />

        {/* Buttons Skeleton */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{
            height: '40px',
            width: '120px',
            borderRadius: '4px',
            background: 'rgba(255,255,255,0.08)',
          }} />
          <div style={{
            height: '40px',
            width: '120px',
            borderRadius: '4px',
            background: 'rgba(255,255,255,0.08)',
          }} />
        </div>
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

export default SkeletonBanner