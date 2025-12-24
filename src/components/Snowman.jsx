import { useRef, useState } from 'react'
import { Html } from '@react-three/drei'

export default function Snowman({ position = [0, 0, 0], onClick }) {
  const hatRef = useRef()
  const [showBubble, setShowBubble] = useState(false)

  // 눈사람 몸통 (3개 구)
  const BodySphere = ({ y, radius }) => (
    <mesh position={[0, y, 0]}>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial color="#ffffff" roughness={0.8} />
    </mesh>
  )

  // 눈
  const Eye = ({ x, y, z }) => (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial color="#000000" />
    </mesh>
  )

  // 당근 코
  const Nose = () => (
    <mesh position={[0, 1.7, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
      <coneGeometry args={[0.05, 0.25, 8]} />
      <meshStandardMaterial color="#ff6600" />
    </mesh>
  )

  // 미소 (석탄으로)
  const MouthPiece = ({ x, y, z }) => (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshStandardMaterial color="#000000" />
    </mesh>
  )

  // 버튼 (석탄으로)
  const Button = ({ y }) => (
    <mesh position={[0, y, 0.45]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color="#000000" />
    </mesh>
  )

  // 모자
  const Hat = () => (
    <group ref={hatRef} position={[0, 2.15, 0]}>
      {/* 모자 테두리 */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.05, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* 모자 본체 */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.4, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* 모자 띠 */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.08, 16]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
    </group>
  )

  // 팔 (나뭇가지)
  const Arm = ({ side }) => {
    const xPos = side === 'left' ? -0.5 : 0.5
    const rotation = side === 'left' ? [0, 0, -Math.PI / 6] : [0, 0, Math.PI / 6]

    return (
      <group position={[xPos, 1.3, 0]} rotation={rotation}>
        <mesh>
          <cylinderGeometry args={[0.03, 0.04, 0.6, 8]} />
          <meshStandardMaterial color="#4a2511" />
        </mesh>
        {/* 나뭇가지 갈라진 부분 */}
        <mesh position={[side === 'left' ? -0.15 : 0.15, 0.2, 0]} rotation={[0, 0, side === 'left' ? -Math.PI / 4 : Math.PI / 4]}>
          <cylinderGeometry args={[0.02, 0.03, 0.25, 8]} />
          <meshStandardMaterial color="#4a2511" />
        </mesh>
      </group>
    )
  }

  // 스카프
  const Scarf = () => (
    <group position={[0, 1.15, 0]}>
      <mesh>
        <torusGeometry args={[0.38, 0.08, 8, 16]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
      {/* 스카프 끝 */}
      <mesh position={[0.3, -0.15, 0.3]} rotation={[0.3, 0.5, 0.2]}>
        <boxGeometry args={[0.12, 0.35, 0.05]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
    </group>
  )

  const handleClick = (e) => {
    e.stopPropagation()
    setShowBubble(true)
    if (onClick) onClick()

    // 3초 후 말풍선 숨기기
    setTimeout(() => {
      setShowBubble(false)
    }, 3000)
  }

  return (
    <group position={position}>
      {/* 클릭 가능한 투명 영역 */}
      <mesh
        position={[0, 1.2, 0]}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'default'
        }}
      >
        <cylinderGeometry args={[0.6, 0.6, 2.4, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* 몸통 3단 */}
      <BodySphere y={0.45} radius={0.45} />
      <BodySphere y={1.2} radius={0.35} />
      <BodySphere y={1.8} radius={0.28} />

      {/* 얼굴 */}
      <Eye x={-0.12} y={1.85} z={0.25} />
      <Eye x={0.12} y={1.85} z={0.25} />
      <Nose />

      {/* 미소 */}
      <MouthPiece x={-0.12} y={1.62} z={0.26} />
      <MouthPiece x={-0.06} y={1.58} z={0.27} />
      <MouthPiece x={0} y={1.56} z={0.275} />
      <MouthPiece x={0.06} y={1.58} z={0.27} />
      <MouthPiece x={0.12} y={1.62} z={0.26} />

      {/* 버튼 */}
      <Button y={1.3} />
      <Button y={1.1} />
      <Button y={0.9} />

      {/* 모자 */}
      <Hat />

      {/* 팔 */}
      <Arm side="left" />
      <Arm side="right" />

      {/* 스카프 */}
      <Scarf />

      {/* 말풍선 - 화면 하단 고정 */}
      {showBubble && (
        <Html fullscreen>
          <div
            style={{
              position: 'fixed',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '3px solid #4a90e2',
              borderRadius: '20px',
              padding: '20px 32px',
              color: '#333',
              fontSize: '20px',
              fontWeight: 'bold',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              minWidth: '300px',
              zIndex: 100,
              animation: 'slideUp 0.5s ease',
            }}
          >
            <div style={{ marginBottom: '12px', fontSize: '24px' }}>⛄</div>
            <div style={{ marginBottom: '12px' }}>나랑 눈사람 만들래?</div>
            <a
              href="https://www.acmicpc.net/problem/20366"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '8px',
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              🎿 눈사람 만들러 가기
            </a>
          </div>
        </Html>
      )}
    </group>
  )
}
