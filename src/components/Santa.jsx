import { useRef, useState } from 'react'
import { Html } from '@react-three/drei'

export default function Santa({ position = [0, 0, 0], showWelcome = false }) {
  const [showBubble, setShowBubble] = useState(false)
  const scale = 1.8 // 크기 1.8배 증가

  // 몸통 (빨간 옷)
  const Body = () => (
    <group>
      {/* 하체 */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3 * scale, 0.35 * scale, 1 * scale, 8]} />
        <meshStandardMaterial color="#c41e3a" roughness={0.8} />
      </mesh>
      {/* 상체 */}
      <mesh position={[0, 1.3 * scale, 0]}>
        <cylinderGeometry args={[0.35 * scale, 0.3 * scale, 0.9 * scale, 8]} />
        <meshStandardMaterial color="#c41e3a" roughness={0.8} />
      </mesh>
      {/* 벨트 */}
      <mesh position={[0, 1.0 * scale, 0]}>
        <cylinderGeometry args={[0.32 * scale, 0.32 * scale, 0.15 * scale, 16]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>
      {/* 벨트 버클 */}
      <mesh position={[0, 1.0 * scale, 0.32 * scale]}>
        <boxGeometry args={[0.15 * scale, 0.12 * scale, 0.05 * scale]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )

  // 머리 (살색)
  const Head = () => (
    <mesh position={[0, 2.0 * scale, 0]}>
      <sphereGeometry args={[0.25 * scale, 32, 32]} />
      <meshStandardMaterial color="#ffdbac" roughness={0.6} />
    </mesh>
  )

  // 눈
  const Eye = ({ x }) => (
    <group position={[x * scale, 2.05 * scale, 0.22 * scale]}>
      {/* 눈 흰자 */}
      <mesh>
        <sphereGeometry args={[0.04 * scale, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* 눈동자 */}
      <mesh position={[0.005 * scale, -0.005 * scale, 0.025 * scale]}>
        <sphereGeometry args={[0.025 * scale, 16, 16]} />
        <meshStandardMaterial color="#0066cc" />
      </mesh>
      {/* 하이라이트 */}
      <mesh position={[0.01 * scale, 0.01 * scale, 0.045 * scale]}>
        <sphereGeometry args={[0.012 * scale, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )

  // 코 (빨간 코)
  const Nose = () => (
    <mesh position={[0, 1.95 * scale, 0.23 * scale]} rotation={[Math.PI / 2, 0, 0]}>
      <sphereGeometry args={[0.04 * scale, 16, 16]} />
      <meshStandardMaterial color="#ff6b6b" />
    </mesh>
  )

  // 미소
  const Smile = () => (
    <group position={[0, 1.85 * scale, 0.2 * scale]}>
      {/* 왼쪽 입꼬리 */}
      <mesh position={[-0.05 * scale, 0.02 * scale, 0]} rotation={[0, 0, Math.PI / 5]}>
        <capsuleGeometry args={[0.01 * scale, 0.03 * scale, 4, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      {/* 오른쪽 입꼬리 */}
      <mesh position={[0.05 * scale, 0.02 * scale, 0]} rotation={[0, 0, -Math.PI / 5]}>
        <capsuleGeometry args={[0.01 * scale, 0.03 * scale, 4, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      {/* 입 중앙 */}
      <mesh position={[0, -0.01 * scale, 0]}>
        <capsuleGeometry args={[0.008 * scale, 0.05 * scale, 4, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  )

  // 눈썹
  const Eyebrow = ({ x }) => (
    <mesh position={[x * scale, 2.12 * scale, 0.18 * scale]} rotation={[0, 0, x < 0 ? Math.PI / 10 : -Math.PI / 10]}>
      <boxGeometry args={[0.05 * scale, 0.01 * scale, 0.01 * scale]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  )

  // 산타 모자
  const SantaHat = () => (
    <group position={[0, 2.2 * scale, 0]}>
      {/* 모자 테두리 (하얀 털) */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.26 * scale, 0.05 * scale, 8, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* 모자 본체 (빨간색) */}
      <mesh position={[0, 0.25 * scale, 0]} rotation={[0, 0, Math.PI / 8]}>
        <coneGeometry args={[0.25 * scale, 0.5 * scale, 16]} />
        <meshStandardMaterial color="#c41e3a" roughness={0.8} />
      </mesh>
      {/* 모자 끝 폼폼 */}
      <mesh position={[0.15 * scale, 0.5 * scale, 0]}>
        <sphereGeometry args={[0.08 * scale, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  )

  // 수염
  const Beard = () => (
    <group position={[0, 1.85 * scale, 0]}>
      {/* 수염 왼쪽 */}
      <mesh position={[-0.12 * scale, -0.1 * scale, 0.15 * scale]} rotation={[0, 0, -Math.PI / 6]}>
        <sphereGeometry args={[0.1 * scale, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* 수염 오른쪽 */}
      <mesh position={[0.12 * scale, -0.1 * scale, 0.15 * scale]} rotation={[0, 0, Math.PI / 6]}>
        <sphereGeometry args={[0.1 * scale, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* 수염 중앙 */}
      <mesh position={[0, -0.15 * scale, 0.18 * scale]}>
        <sphereGeometry args={[0.12 * scale, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* 콧수염 왼쪽 */}
      <mesh position={[-0.08 * scale, 0.05 * scale, 0.2 * scale]} rotation={[0, 0, Math.PI / 8]}>
        <sphereGeometry args={[0.06 * scale, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* 콧수염 오른쪽 */}
      <mesh position={[0.08 * scale, 0.05 * scale, 0.2 * scale]} rotation={[0, 0, -Math.PI / 8]}>
        <sphereGeometry args={[0.06 * scale, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  )

  // 팔 (지붕에 매달리는 포즈 - 위로 올림)
  const Arm = ({ side }) => {
    const xPos = side === 'left' ? -0.4 * scale : 0.4 * scale
    const rotation = side === 'left' ? [0, 0, Math.PI / 3] : [0, 0, -Math.PI / 3]

    return (
      <group position={[xPos, 1.8 * scale, 0]} rotation={rotation}>
        {/* 팔뚝 */}
        <mesh>
          <cylinderGeometry args={[0.08 * scale, 0.1 * scale, 0.6 * scale, 8]} />
          <meshStandardMaterial color="#c41e3a" />
        </mesh>
        {/* 손 (검은 장갑) */}
        <mesh position={[0, -0.35 * scale, 0]}>
          <sphereGeometry args={[0.11 * scale, 8, 8]} />
          <meshStandardMaterial color="#2c2c2c" />
        </mesh>
      </group>
    )
  }

  // 다리 (지붕에 매달려서 발이 아래로)
  const Leg = ({ side }) => {
    const xPos = side === 'left' ? -0.15 * scale : 0.15 * scale

    return (
      <group position={[xPos, 0.3 * scale, 0]}>
        {/* 다리 */}
        <mesh>
          <cylinderGeometry args={[0.1 * scale, 0.12 * scale, 0.6 * scale, 8]} />
          <meshStandardMaterial color="#c41e3a" />
        </mesh>
        {/* 부츠 */}
        <mesh position={[0, -0.35 * scale, 0.05 * scale]}>
          <boxGeometry args={[0.15 * scale, 0.15 * scale, 0.25 * scale]} />
          <meshStandardMaterial color="#2c2c2c" />
        </mesh>
      </group>
    )
  }

  const handleClick = (e) => {
    e.stopPropagation()
    setShowBubble(true)

    // 3초 후 말풍선 숨기기
    setTimeout(() => {
      setShowBubble(false)
    }, 3000)
  }

  return (
    <group position={position}>
      {/* 클릭 가능한 투명 영역 */}
      <mesh
        position={[0, 1.3 * scale, 0]}
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
        <cylinderGeometry args={[0.5 * scale, 0.5 * scale, 2.6 * scale, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* 다리 */}
      <Leg side="left" />
      <Leg side="right" />

      {/* 몸통 */}
      <Body />

      {/* 팔 */}
      <Arm side="left" />
      <Arm side="right" />

      {/* 머리 */}
      <Head />

      {/* 얼굴 */}
      <Eyebrow x={-0.08} />
      <Eyebrow x={0.08} />
      <Eye x={-0.08} />
      <Eye x={0.08} />
      <Nose />
      <Smile />

      {/* 수염 */}
      <Beard />

      {/* 산타 모자 */}
      <SantaHat />

      {/* 말풍선 - 머리 위 */}
      {showBubble && (
        <Html position={[0, 2.9 * scale, 0]} center distanceFactor={8}>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '3px solid #c41e3a',
              borderRadius: '20px',
              padding: '16px 28px',
              color: '#c41e3a',
              fontSize: '22px',
              fontWeight: 'bold',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              minWidth: '220px',
              position: 'relative',
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ marginBottom: '4px' }}>호호호! 🎅</div>
            <div>메리 크리스마스!</div>
            {/* 말풍선 꼬리 */}
            <div
              style={{
                position: 'absolute',
                bottom: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '0',
                height: '0',
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderTop: '15px solid rgba(255, 255, 255, 0.95)',
              }}
            />
          </div>
        </Html>
      )}

      {/* 환영 말풍선 - 초기 렌더링 시 */}
      {showWelcome && (
        <Html position={[0, 2.9 * scale, 0]} center distanceFactor={8}>
          <div
            style={{
              background: 'rgba(255, 215, 0, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '3px solid #ff6b6b',
              borderRadius: '20px',
              padding: '18px 32px',
              color: '#c41e3a',
              fontSize: '24px',
              fontWeight: 'bold',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(255, 107, 107, 0.4)',
              minWidth: '280px',
              position: 'relative',
              whiteSpace: 'nowrap',
            }}
          >
            <div>하이아크 오두막에 오신것을 환영하네!!</div>
            {/* 말풍선 꼬리 */}
            <div
              style={{
                position: 'absolute',
                bottom: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '0',
                height: '0',
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderTop: '15px solid rgba(255, 215, 0, 0.95)',
              }}
            />
          </div>
        </Html>
      )}
    </group>
  )
}
