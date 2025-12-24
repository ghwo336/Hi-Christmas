import { Html } from '@react-three/drei'

export default function ExitButton({ onClick, visible = true }) {
  if (!visible) return null

  return (
    <Html
      position={[0, 6, 4]}
      center
      distanceFactor={8}
      zIndexRange={[100, 0]}
    >
      <div
        onClick={onClick}
        style={{
          cursor: 'pointer',
          userSelect: 'none',
          backgroundColor: 'rgba(255, 100, 100, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '3px solid rgba(255, 255, 255, 0.8)',
          borderRadius: '30px',
          padding: '16px 32px',
          color: 'white',
          fontSize: '20px',
          fontWeight: 'bold',
          textShadow: '2px 2px 8px rgba(0,0,0,0.9)',
          boxShadow: '0 8px 32px rgba(255,0,0,0.5)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 1000,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 150, 150, 1)'
          e.currentTarget.style.transform = 'scale(1.1)'
          e.currentTarget.style.boxShadow = '0 12px 48px rgba(255,0,0,0.8)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 100, 100, 0.9)'
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,0,0,0.5)'
        }}
      >
        <span style={{ fontSize: '24px' }}>🚪</span>
        <span>밖으로 나가기</span>
      </div>
    </Html>
  )
}
